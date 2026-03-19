# Refactor Workflow

**Purpose**: Improve code structure without changing functionality.

> **Critical**: Always start with `/sdlc understand` before refactoring. Understanding the existing architecture and relationships is essential to avoid breaking functionality during refactoring.

## When to Use

Use this workflow when:
- Improving code quality
- Reducing technical debt
- Optimizing performance
- Restructuring for maintainability
- Updating to new patterns/architecture

## Workflow Sequence

```
START
  │
  ▼
understand → cr → spec → coding → test → validate → secure → cr → commit → pr → MERGE
```

**First Step is Non-Negotiable:**
1. `understand` - Know the current architecture before changing it

## Phase Details

### 0. Understand (Required First Step)
```bash
/sdlc understand [scope]
```
- Map current architecture and dependencies
- Identify integration points
- Understand data flow and relationships
- **Critical for refactoring - you must know what you're changing**

### 1. Initial Code Review
```bash
/sdlc cr
```
**What it checks:**
- Current code quality issues
- Technical debt areas
- Refactoring opportunities
- Architecture improvements

**Output**: Refactoring plan and priorities

### 2. Spec
```bash
/sdlc spec "Design refactoring approach"
```
- Define refactoring goals
- Document new structure
- Plan migration strategy
- Identify breaking changes
- Create test coverage plan

### 3. Coding
```
[Manual coding phase]
```
- Implement refactoring
- Maintain existing behavior
- Add tests for edge cases
- Update documentation

### 4. Test
```bash
/sdlc test
```
**What it checks:**
- lint (code style)
- typecheck (type validation)
- format (code formatting)
- unit (unit tests)
- integ (integration tests)
- e2e (end-to-end tests)
- coverage (test coverage)

**Critical**: Ensure no behavior changes

### 5. Validate
```bash
/sdlc validate [target] [criteria]
```
**What it checks:**
- Behavior preserved (active testing)
- No breaking changes (unless intentional)
- Performance improvements verified
- Related harness invariants still hold

**Question answered**: "Is functionality unchanged?"

### 6. Secure
```bash
/sdlc secure
```
**What it checks:**
- No new vulnerabilities introduced
- Dependencies still secure
- No secrets exposed during refactor

### 7. Final Code Review
```bash
/sdlc cr
```
**What it checks:**
- Refactoring goals achieved
- Code quality improved
- Tests adequate
- Migration successful

### 8. Commit
```bash
/sdlc commit
```
- Document refactoring changes
- Reference original issues
- Note migration steps
- Highlight breaking changes

### 9. Pull Request
```bash
/sdlc pr
```
- Create PR with before/after comparison
- Include performance metrics
- Document migration guide
- Request review

### 10. Merge
```
[Merge PR after approval]
```
- Merge to main branch
- Update documentation
- Communicate changes to team

## Usage Example

```bash
# Start refactor workflow
/sdlc start refactor "Extract service layer from controllers"

# Step 1: Understand current architecture (MANDATORY)
/sdlc understand controllers
# → Map current dependencies, data flow, integration points

# Step 2: Initial CR - identify issues
/sdlc cr
# → Found: Tight coupling, 500+ line controllers, no testability

# Step 3: Create refactoring spec
/sdlc spec "Design service layer architecture with dependency injection"

# Step 4: [Manual coding - implement refactoring]

# Step 5: Run tests
/sdlc test

# Step 6: Validate behavior unchanged
/sdlc validate auth "Behavior preserved after refactoring"

# Step 7: Security check
/sdlc secure

# Step 8: Final code review
/sdlc cr

# Step 9: Commit refactoring
/sdlc commit

# Step 10: Create PR
/sdlc pr

# [Merge after review]
```

## Anti-Pattern: What NOT to Do

```bash
# ❌ BAD: Refactoring without understanding
/sdlc cr
# → Start refactoring immediately
# → Breaks hidden dependencies
# → Introduces subtle bugs

# ✅ GOOD: Understand first, then refactor
/sdlc understand controllers  # Know the current system
/sdlc cr                      # Then plan changes
# → Safer refactoring, fewer bugs, better results
```

## Refactoring Categories

### 1. Code Quality
- Reduce complexity
- Improve naming
- Extract methods
- Remove duplication

### 2. Architecture
- Separate concerns
- Introduce patterns
- Restructure modules
- Update dependencies

### 3. Performance
- Optimize algorithms
- Reduce memory usage
- Improve caching
- Database optimization

### 4. Maintainability
- Add type safety
- Improve testing
- Update documentation
- Standardize patterns

## Navigation Commands

```bash
# Move to next phase
/sdlc next

# Skip phase (with reason)
/sdlc skip "No spec needed for simple cleanup"

# Check current status
/sdlc status

# Jump to specific phase
/sdlc goto <phase>
```

## Completion Checklist

- [ ] **Understand phase completed** (current architecture mapped)
- [ ] Initial issues documented
- [ ] Refactoring spec created
- [ ] Code refactored
- [ ] All tests passing
- [ ] Behavior verified unchanged
- [ ] Performance improved (if applicable)
- [ ] Security scan clean
- [ ] Final review approved
- [ ] Migration documented
- [ ] PR created and merged

## Key Differences from Feature Workflow

| Feature | Refactor |
|---------|----------|
| research → spec | cr → spec |
| Add new behavior | Preserve behavior |
| User-facing changes | Internal changes |
| Test new functionality | Test regression |
| Verify spec met | Verify behavior unchanged |

## Refactoring Principles

1. **Preserve Behavior**: Refactoring should not change external behavior
2. **Small Steps**: Make incremental changes that can be tested
3. **Test Coverage**: Ensure comprehensive tests before refactoring
4. **Document**: Explain why the refactoring was needed
5. **Measure**: Use metrics to demonstrate improvement

## Notes

- Refactoring has **two CR phases** - initial and final
- Test coverage is critical - ensure tests pass before and after
- Consider feature flags for large refactors
- May need deprecation period for breaking changes
- Use `/doc`, `/pencil`, `/cache` for documentation
- Always validate performance doesn't regress
