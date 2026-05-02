# /pr

Generate pull request content that explains **why** the change exists and **what** it achieves.

**Core Principle**: A good PR describes the purpose and impact, not a laundry list of changes.

## Usage

```
/pr [base-branch] [--fetch]
```

**Flags**:
- `--fetch` — Fetch base branch from remote before diffing (default: local-only)

## What Makes a Good PR?

**Answer these three questions:**

1. **Why?** - What problem motivated this change?
2. **What?** - What is the user-facing impact?
3. **How?** - Technical details (only if necessary for understanding)

**Bad PR Example:**
```
- Added function A
- Modified file B
- Updated class C
- Refactored module D
```
← This tells me nothing about the purpose.

**Good PR Example:**
```
## Summary
Fix authentication timeout that caused users to be logged out after 5 minutes of inactivity.

### Changes
- Increased JWT token expiry to 24 hours
- Added refresh token mechanism for seamless session renewal
- Users stay logged in across browser sessions
```
← Clear purpose, clear impact.

## Process

### 1. Resolve Base & Diff

**MANDATORY: Resolve base branch before running any git commands.**

Follow this priority order and STOP at the first match:

#### Priority 1 — Command arg
If user provided a base (e.g. `/pr develop`), use it directly. Skip detection.

#### Priority 2 — Interactive branch selection (REQUIRED when no arg)

Run this command to get recent branches with upstream tracking info:
```bash
git branch -vv --sort=-committerdate | head -10
```

This shows each branch with its upstream (e.g. `[origin/main: ahead 2]`), helping identify the right base.

**When building the candidate list:**

1. **Show local and remote tracking branches separately** — always include both local and remote as distinct options:
   - `main` (local) — diff against local HEAD
   - `origin/main` (remote tracking) — diff against remote HEAD (must have fetched locally first)

2. **Include common bases** — always add `main` and `develop` (and their `origin/` tracking refs) if they exist.

3. **Show upstream tracking status** in every option's description:
   - Local: `main (local) · behind 1`
   - Remote: `origin/main · tracks origin/main`
   - No upstream: `feature-branch · no upstream`

4. **Deduplicate by commit hash** — if multiple branches point to the same commit, group them as one option with a note listing the aliases.

5. **IMPORTANT** — When user selects a remote tracking ref like `origin/main`, keep it as-is and diff against that ref directly. DO NOT strip the `origin/` prefix — the user explicitly chose the remote ref.

Then use `AskUserQuestion` to present the candidates. Once user selects, proceed immediately — no confidence analysis needed.

---

**After base is confirmed**, run the diff:

```bash
# For local branch refs (refs/heads/main):
git rev-parse refs/heads/<base> || { echo "Base '<base>' not found locally."; exit 1; }
git log <base>..HEAD --oneline        # Commits unique to this branch
git diff <base>..HEAD --stat          # File overview
git diff <base>..HEAD                 # Full diff

# For remote tracking refs (origin/main):
git rev-parse <base> || { echo "Base '<base>' not found. Run 'git fetch' first."; exit 1; }
git log <base>..HEAD --oneline        # Commits unique to this branch
git diff <base>..HEAD --stat          # File overview
git diff <base>..HEAD                 # Full diff
```

### 2. Understand the Change

Ask yourself:
- What problem is being solved?
- Who benefits? How?
- What was broken/missing before?
- What is the user-facing change?

### 3. Write Title

- Format: `[prefix](scope): [description]`
- Prefixes: `bugfix`, `feat`, `refactor`, `doc`, `build`, `test`, `chore`
- Scope: module/area affected (e.g., `server`, `protocol`, `bot`, `frontend`). Use comma for multiple: `bot,smart_guide`
- Lowercase, under 72 chars
- Describe the **outcome**, not the action

| Bad | Good |
|-----|------|
| `feat: add login function` | `feat(auth): implement user authentication` |
| `refactor: rename files` | `refactor(command): unify provider command interface` |
| `fix: bug in auth` | `bugfix(server): resolve authentication timeout issue` |

### 4. Write Description

**Structure:**
```markdown
## Summary
[1-2 sentences: Why did we do this? What problem did it solve?]

### Major
[Core changes that define this PR - the main purpose and impact]

### Minor
[Supporting changes - refactoring, cleanup, internal improvements]
```

**Major** = The "main thing" this PR accomplishes
- What problem did we solve?
- What is the user-facing impact?
- What behavior changed?

**Minor** = Supporting work
- Code cleanup, refactoring
- Internal optimizations
- Non-user-facing changes

**Tips:**
- Focus on **outcomes**, not activities
- Bad: "Added function A, renamed file B"
- Good: "Simplified provider management with unified interface"

### 5. Output Behavior

Output the PR content as **separate plain blocks** — do NOT inline the body into a shell command. This avoids line-wrap issues and makes the output easy to copy.

**Format:**

```
## Pull Request Ready

**Base**: main → **HEAD**: feat/foo  |  3 commits

**Title**
feat(auth): implement user authentication

**Description**
## Summary
...

### Major
- ...

### Minor
- ...

---

**Create PR:**
- GitHub web: https://github.com/[owner]/[repo]/compare/[base]...[head]
- CLI: `gh pr create --title "[full title here]" --base [base]`  (use Description block above as body)
```

**Key rules:**
- Title on its own line (no inline shell quoting)
- Description as a clean unescaped block — user copies it directly
- **GitHub compare URL must be complete and clickable** — resolve `[owner]`, `[repo]`, `[base]`, `[head]` from `git remote get-url origin` and actual branch names
- **CLI command must be complete** — include the full `--title` value; body is separate (user pastes from Description block)
- Never embed the full body inline in the shell command — keep body as its own copy block

**With `auto_push: true`**:
- Automatically executes `gh pr create` with generated content
- Returns the created PR URL
- Logs the PR creation to `.sdlc.docs/*.pr.md`

## Examples

### Example 1: Bug Fix

**Title:** `bugfix(upload): resolve authentication timeout during file uploads`

**Description:**
```markdown
## Summary
File uploads were failing for files larger than 10MB because the JWT token expired during upload. This caused users to lose work and retry uploads.

### Major
- Uploads now complete successfully regardless of file size
- Token refresh happens automatically in the background
- No more "authentication failed" errors during long uploads

### Minor
- Updated token expiry check logic
- Added retry handler for transient network errors
```

### Example 2: Feature

**Title:** `feat(project): add project templates for quick setup`

**Description:**
```markdown
## Summary
Users had to manually configure each new project with the same settings. Now they can create and reuse project templates.

### Major
- Create projects from templates in one click
- Templates include all settings, dependencies, and configurations
- Reduces setup time from ~10 minutes to ~30 seconds

### Minor
- Extracted common config patterns into template schema
- Added template validation on save
```

### Example 3: Refactor

**Title:** `refactor(command): unified provider command with interactive mode`

**Description:**
```markdown
## Summary
Provider management was scattered across 4 separate commands with inconsistent UX. Consolidated into a single interactive command.

### Major
- Single command handles all provider operations (add, list, get, update, delete)
- Interactive mode guides users through available actions
- UUID-based lookups prevent errors from duplicate provider names

### Minor
- Renamed add.go to provider_add.go for consistency
- Removed unused shell command code
- Cleaned up terminal output formatting
```

## Related Skills

- `/commit` - Commits must exist before creating PR
- `/sdlc cr` - Code review before PR review
- `/sdlc test` - Tests that must pass

---

**Version**: 1.10.0 | **Updated**: 2026-04-12
