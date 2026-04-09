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

Then use `AskUserQuestion` to present the top branches as options for the user to select the base. Include `main`/`develop` if not already in the list.

**When building options**, include the upstream info in the description if available:
- Label: `main`
- Description: `[origin/main] upstream branch` or `no upstream` if not tracked

**Optionally deduplicate**: If multiple branches point to the same commit hash, group them as one option (e.g. label `main` with note "same as origin/main").

Once user selects, proceed immediately — no confidence analysis needed.

---

**After base is confirmed**, run the diff (local refs only by default):

```bash
# Verify base exists locally
git rev-parse refs/heads/<base> || { echo "Base '<base>' not found locally. Run /pr --fetch or specify branch."; exit 1; }

# Diff against confirmed base
git log <base>..HEAD --oneline        # Commits unique to this branch
git diff <base>..HEAD --stat          # File overview
git diff <base>..HEAD                 # Full diff

# If --fetch is passed:
git fetch origin <base>
BASE_COMMIT=$(git rev-parse origin/<base>)
git diff $BASE_COMMIT..HEAD --stat
```

**Important**: Strip any `origin/` prefix from input. Base must resolve to a local ref (`refs/heads/main`), not a remote tracking ref (`origin/main`).

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

The skill returns PR information based on `auto_push` setting:

**Default (`auto_push: false`)**:
```markdown
## Pull Request Ready

**Base**: main (a1b2c3d) → **HEAD**: bugfix/bot0328 (f7e8d9c)
**Commits**: 3

**Title**: feat(auth): implement user authentication

**Description**:
[Generated PR description]

---

**Choose how to create PR:**

1. **GitHub web** (create manually with prefilled title/body):
   https://github.com/[owner]/[repo]/compare/main...bugfix/bot0328

2. **GitHub CLI**:
   ```bash
   gh pr create --title "feat(auth): implement user authentication" --body "..." --base main
   ```

3. **Push & create manually**:
   ```bash
   git push -u origin bugfix/bot0328
   # Then visit the compare link above
   ```
```

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

**Version**: 1.8.0 | **Updated**: 2026-04-09
