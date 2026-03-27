# /pr

Generate pull request content that explains **why** the change exists and **what** it achieves.

**Core Principle**: A good PR describes the purpose and impact, not a laundry list of changes.

## Usage

```
/pr [base-branch]
```

| Priority | Method | Example |
|----------|--------|---------|
| 1 (highest) | Command arg | `/pr develop` |
| 2 | state.json `pr.base_branch` | See config below |
| 3 (lowest) | Default | `origin/main` |

### Configuration (state.json)

```json
{
  "pr": {
    "base_branch": "origin/main",
    "remote": "origin",
    "auto_push": false
  }
}
```

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `base_branch` | string | `origin/main` | Target branch for the PR |
| `remote` | string | `origin` | Git remote to use |
| `auto_push` | boolean | `false` | Automatically create PR via `gh pr create` |

**Behavior**:
- **`auto_push: false`** (default) - Return PR title, description, and command to user. User decides when to push.
- **`auto_push: true`** - Automatically execute `gh pr create` with generated content.

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

### 1. Fetch & Diff

```bash
git fetch origin <branch>           # Get latest remote
git diff origin/<branch>..HEAD       # What changed
git diff origin/<branch>..HEAD --stat  # File overview
```

### 2. Understand the Change

Ask yourself:
- What problem is being solved?
- Who benefits? How?
- What was broken/missing before?
- What is the user-facing change?

### 3. Write Title

- Format: `[prefix]: [description]`
- Lowercase, under 72 chars
- Describe the **outcome**, not the action

| Bad | Good |
|-----|------|
| `feat: add login function` | `feat: implement user authentication` |
| `refactor: rename files` | `refactor: unify provider command interface` |
| `fix: bug in auth` | `fix: resolve authentication timeout issue` |

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

**Title**: feat: implement user authentication

**Description**:
[Generated PR description]

**Command to create PR**:
```bash
gh pr create --title "feat: implement user authentication" --body "..." --base origin/main
```
```

**With `auto_push: true`**:
- Automatically executes `gh pr create` with generated content
- Returns the created PR URL
- Logs the PR creation to `.sdlc/docs/*.pr.md`

## Examples

### Example 1: Bug Fix

**Title:** `fix: resolve authentication timeout during file uploads`

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

**Title:** `feat: add project templates for quick setup`

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

**Title:** `refactor: unified provider command with interactive mode`

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

## State Integration

- **Updates**: `sdlc.phase` = `pr`
- **Creates**: PR log in `.sdlc/docs/*.pr.md` (SDLC only)
- **Reads**: `state.json` for `pr.base_branch`, `pr.remote`, and `pr.auto_push`

**Auto-Push Behavior**:
- `auto_push: false` (default) - Returns PR information to user, does not push
- `auto_push: true` - Automatically executes `gh pr create`

## Related Skills

- `/commit` - Commits must exist before creating PR
- `/sdlc cr` - Code review before PR review
- `/sdlc test` - Tests that must pass
