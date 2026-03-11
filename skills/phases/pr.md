# /pr

/pr creates and manages pull requests with proper title, description, and review process. Works standalone or within SDLC workflows.

**Purpose**: Create and manage pull requests for code integration

## Usage

```
/pr [base-branch]
```

**Arguments:**
- `base-branch` (optional): The base branch to compare against (default: `main`)

**Actions:**
- No argument: Create a new PR
- `status` - Check PR status
- `merge` - Merge PR (when ready)

**Examples:**
- `/pr` - Create a new pull request against main
- `/pr develop` - Create PR against develop branch
- `/pr status` - Check current PR status
- `/pr merge` - Merge the PR when approved

**Standalone Use:**
```bash
# Use anytime without SDLC workflow
/pr
/pr develop
```

**SDLC Workflow Use:**
```bash
# Part of SDLC workflow - includes review requirements
/sdlc pr
/sdlc pr status
/sdlc pr merge
```

## Commit Style Pattern

The project uses conventional commits with lowercase prefixes:

- `bugfix:` - Bug fixes
- `feat:` - New features
- `command:` - Command-related changes
- `chore:` - Chores/maintenance
- `mv:` - File/directory moves
- `doc:` - Documentation changes
- `perf:` - Performance improvements

## PR Generation Process

### 1. Analyze Branch Changes
```bash
git log <base-branch>..HEAD --oneline    # Get commit history
git diff <base-branch>..HEAD --stat      # See changed files
```
Identify the main theme and scope of changes.

### 2. Write PR Title
- Follow commit message style: `[prefix]: [brief description]`
- Use lowercase for prefix and description
- Keep it concise (under 72 characters)
- If multiple commits with different prefixes, use the dominant one or `feat:` for features

### 3. Write PR Description
- Start with a brief summary (1-2 sentences)
- Categorize changes into **Major** and **Minor** sections
- **Major**: Core functionality, significant features, important bugfixes
- **Minor**: Small improvements, refactors, docs, trivial changes
- Use `-` for bullet points, keep descriptions concise
- Optionally include commit title in parentheses if it adds useful context
- No fluff or generic statements

### 4. Test Plan (Optional but Recommended)
- Add a checklist of testing items if applicable
- Use `- [ ]` for unchecked items
- Focus on critical paths and edge cases

## PR Output Format

```markdown
## Summary
[1-2 sentence summary of what this PR does and why]

### Major: *(optional: major title)*
- [Change description]
- [Change description]

### Minor: *(optional: minor title)*
- [Change description]
- [Change description]

## Test Plan
- [ ] [Test case 1]
- [ ] [Test case 2]
```

## PR Examples

**Input commits:**
```
feat: add user authentication
feat: add login form with validation
bugfix: fix token validation edge cases
chore: update dependencies
```

**Output PR:**
```
feat: add user authentication

## Summary
Add complete user authentication flow with JWT token management.

### Major: Authentication
- Add login form component with validation *(feat: add login form with validation)*
- Implement JWT token generation and validation
- Fix token validation edge cases *(bugfix: fix token validation)*

### Minor: Cleanup
- Update dependencies to latest versions
```

## PR Creation Steps

### 1. Prepare PR Content

**Title:**
Follow conventional commit format:
```
<type>(<scope>): <subject>
```

**Description Template:**
```markdown
## Summary
[Brief description of the change]

## Changes
- [Change 1]
- [Change 2]

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change
- [ ] Refactor (code quality improvement)
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] All tests passing
```

### 2. Create PR
Using GitHub CLI:
```bash
gh pr create --title "feat(auth): add JWT authentication" --body "..."
```

## SDLC Integration

When used in SDLC workflow (`/sdlc pr`), additional features apply:

### PR Review Process

**Review Categories:**

1. **Code Review**
   - Implementation correctness
   - Code quality and style
   - Best practices adherence
   - Performance considerations

2. **Testing Review**
   - Test coverage adequate
   - Tests are meaningful
   - Edge cases covered
   - Integration tests included

3. **Documentation Review**
   - Code is documented
   - API docs updated
   - README updated (if needed)
   - Changelog updated

4. **Design Review**
   - Architecture appropriate
   - Design patterns consistent
   - No breaking changes (unless intentional)
   - Migration path for breaking changes

### Enhanced PR Status Check (SDLC Mode)

```
━━━ Pull Request Status ━━━

PR: #45 - feat(auth): add JWT authentication
Branch: feature/user-auth → main
Status: Ready for review

━━━ Checks ━━━
✓ CI/CD Pipeline: Passing
  - Lint: ✓
  - Type Check: ✓
  - Unit Tests: ✓ (45/45)
  - Integration Tests: ✓ (12/12)
  - E2E Tests: ✓ (8/8)

✓ Code Coverage: 87% (target: 80%)
✓ Security Scan: No vulnerabilities

━━━ Review Status ━━━
Required reviewers: 2
✓ @alice - Approved
  ⚠ "Consider adding rate limiting per IP"
✓ @bob - Approved
  ✓ "Looks good to me"

━━━ Files Changed ━━━
12 files changed, +277 lines, -15 lines
  src/auth/          (+195 lines)
  tests/             (+82 lines)

━━━ Merge Readiness ━━━
✓ All checks passed
✓ Required approvals received
✓ No merge conflicts
✓ Up to date with main

━━━ Action ━━━
Ready to merge! Use `/sdlc pr merge` to complete.
```

### Merge Requirements (SDLC Mode)

**Required Checks:**
- [ ] All CI/CD checks passing
- [ ] Code coverage threshold met
- [ ] Security scan clean
- [ ] No merge conflicts

**Required Approvals:**
- [ ] Minimum number of approvals received
- [ ] No outstanding review objections
- [ ] Reviewer feedback addressed

**Final Checks:**
- [ ] PR description complete
- [ ] Related spec linked
- [ ] Test reports linked
- [ ] Breaking changes documented

### Enhanced Description Template (SDLC Mode)

```markdown
## Overview
[Brief description of the change]

## Changes
- [Change 1]
- [Change 2]
- [Change 3]

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work)
- [ ] Refactor (code quality improvement)
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] All tests passing

## Documentation
- [ ] Spec document linked
- [ ] API documentation updated
- [ ] README updated (if applicable)
- [ ] Changelog updated

## Checklists
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Code is self-contained (no incomplete features)
- [ ] No unnecessary files included
- [ ] Comments added to complex code

## Related
- Spec: `docs/spec/YYYYMMDD-title.md`
- Test Report: `docs/test/YYYYMMDD-title-test-report.md`
- Verification: `docs/verify/YYYYMMDD-title-verification.md`
- Security: `docs/secure/YYYYMMDD-title-security.md`
- Code Review: `docs/cr/YYYYMMDD-title-review.md`

Closes #[issue_number]
```

## Merge Process

### 1. Final Review
Review all:
- Conversation threads
- Review comments
- Suggested changes

### 2. Update if Needed
Apply any final changes based on feedback

### 3. Merge
```bash
gh pr merge --merge --delete-branch
```

### 4. Post-Merge
- [ ] Verify deployment
- [ ] Update project tracking
- [ ] Notify stakeholders
- [ ] Close related issues

## Best Practices

### PR Hygiene
- **Keep PRs focused**: One feature or fix per PR
- **Keep PRs small**: Easier to review and merge
- **Use draft PRs**: For work in progress
- **Reference issues**: Link to related issue numbers

### PR Communication
- **Be responsive**: Address review comments promptly
- **Be descriptive**: Explain why changes were made
- **Be respectful**: Consider all feedback
- **Document decisions**: Explain non-obvious choices

### Review Tips
- **Be thorough**: Review all changed files
- **Be constructive**: Provide helpful feedback
- **Be timely**: Review PRs promptly
- **Be clear**: Explain suggestions

### Tips
- Group related commits logically in the description
- If the branch has many unrelated commits, suggest splitting it
- Use file paths from `git diff --stat` to be specific
- Reference related issues if applicable

## Completion Conditions

### For PR Creation
- [ ] PR title follows format
- [ ] PR description complete with template
- [ ] All related documents linked (SDLC only)
- [ ] PR created successfully

### For PR Merge
- [ ] All required approvals received (SDLC only)
- [ ] All checks passing (SDLC only)
- [ ] No merge conflicts
- [ ] PR merged successfully
- [ ] Branch deleted (if applicable)
- [ ] PR logged to documentation (SDLC only)

## State Integration

- **Updates**: `sdlc.phase` = `pr`
- **Creates**: Pull request
- **Creates**: PR log in `docs/pr/` (SDLC only)
- **Requires**: `commit` phase completed (SDLC only)
- **Next**: After merge, workflow complete (SDLC only)

## Related Skills

- `/commit` - Prerequisite: commits must exist to create PR
- `/git` - Low-level git operations (branch, checkout, merge)
- `/sdlc cr` - (SDLC only) Code review that happens before PR review
- `/sdlc test` - (SDLC only) Tests that must pass for PR checks
