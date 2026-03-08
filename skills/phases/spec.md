# Specification Phase Skill

Creates detailed technical specification documents based on research findings and requirements.

## Usage

```
/sdlc spec [title]
```

## Description

Creates comprehensive technical specification documents that define what will be built, how it will work, and how components interact. Specs serve as the blueprint for implementation.

### When to Use

- After completing research and selecting an approach
- Before starting implementation work
- When requirements need to be formally documented
- For features requiring coordination across multiple developers
- To document API contracts and data structures

## Process

1. **Review Research and Requirements**
   - Review research findings
   - Clarify functional and non-functional requirements
   - Identify dependencies and constraints

2. **Check Architecture Cache**
   - Look for existing cache in `docs/arch/*-arch.md`
   - Read most specific cache available (component → module → project)
   - Use cached architecture info for design decisions
   - Generate new cache if needed

3. **Structure the Specification**
   - Define feature/system scope
   - Document user stories and use cases
   - Specify APIs and data structures
   - Define component interactions

4. **Add Technical Details**
   - Data models and schemas
   - API endpoints and contracts
   - State management approach
   - Error handling strategy
   - Security and performance considerations

5. **Save to Documentation**
   - Save to `docs/spec/YYYYMMDD-[title]-spec.md`
   - Include version and status

## Architecture Cache Integration

### Reading Cache

Priority order (most specific first):
```bash
docs/arch/[module]/[sub]/[comp]-arch.md  # Component (~3 days)
docs/arch/[module]/[sub]-arch.md          # Sub-module (~7 days)
docs/arch/[module]-arch.md                # Module (~14 days)
docs/arch/overview-arch.md                # Project (~30 days)
```

> **Note**: TTL values are reference guidelines only. Actual freshness depends on code changes.

### Writing Cache

If analyzing new area:
1. Generate appropriate cache level
2. Save to `docs/arch/[YYYYMMDD]-[scope]-arch.md`
3. Include hash for change detection

**See also**: `docs/arch/ARCH_CACHE_SYSTEM.md` for full documentation

## Specification Template

```markdown
# [Spec Title]

**Status:** Draft | In Review | Approved
**Last Updated:** YYYY-MM-DD

## Overview

**Purpose:** [What this spec defines]
**Scope:** [What's included and out of scope]
**Background:** [Context and research references]

## Requirements

### Functional Requirements
- [Requirement 1]
- [Requirement 2]

### Non-Functional Requirements
- Performance, security, accessibility, etc.

## User Stories / Use Cases

### Use Case 1: [Title]
- **Actor:** [User role]
- **Goal:** [What they want to accomplish]
- **Steps:** 1. [Step 1] 2. [Step 2] 3. [Step 3]
- **Success Criteria:** [How we know it works]

## Architecture and Design

### System Overview
[High-level description]

### Components
- **[Component A]:** [Purpose and responsibilities]
- **[Component B]:** [Purpose and responsibilities]

### Data Flow
[How data flows through the system]

## Data Structures

```typescript
interface ModelName {
  field: Type;  // Description
}
```

## API Specification

### GET /api/resource
**Description:** [What it does]
**Request:** [Request structure]
**Response:** [Response structure]
**Status Codes:** 200, 400, 401, 500

## Component Interfaces

```typescript
interface ComponentAProps {
  // props
}

interface ComponentAActions {
  // methods
}
```

## State Management

```typescript
interface GlobalState {
  // state shape
}
```

## Error Handling

- [Scenario 1]: [Handling approach]
- [Scenario 2]: [Handling approach]

## Security Considerations

- Authentication, authorization, validation, etc.

## Testing Strategy

- Unit tests: [What to test]
- Integration tests: [Test scenarios]
- E2E tests: [Critical flows]

## Dependencies

### Internal
- [Dependency 1] - [How it's used]

### External
- [Library 1] - [Purpose]

## Implementation Phases

### Phase 1: [Title]
- [Tasks and deliverables]

### Phase 2: [Title]
- [Tasks and deliverables]

## Open Questions

- [Question 1]
- [Question 2]

## Alternatives Considered

1. **[Alternative 1]**
   - Why not chosen: [Reason]

2. **[Alternative 2]**
   - Why not chosen: [Reason]

## References

- [Research documents]
- [External documentation]
- [Architecture cache]: `docs/arch/[relevant]-arch.md`
```

## Output Location

```
docs/spec/YYYYMMDD-[title]-spec.md
```

Examples:
- `docs/spec/20260308-user-auth-spec.md`
- `docs/spec/20260308-payment-api-spec.md`

## Completion Checklist

- [ ] Overview and scope clearly defined
- [ ] Requirements documented (functional and non-functional)
- [ ] User stories/use cases included
- [ ] Data structures specified with validation
- [ ] API endpoints documented
- [ ] Component interfaces defined
- [ ] State management specified
- [ ] Error handling documented
- [ ] Security considerations addressed
- [ ] Testing strategy outlined
- [ ] Dependencies identified
- [ ] Architecture cache checked/referenced
- [ ] Saved to docs/spec/ with date prefix

## Examples

### Example 1: Feature Specification

```bash
/sdlc spec User Profile Management
```

Creates spec with:
- User profile data models
- API endpoints for CRUD operations
- Profile image upload handling
- Privacy settings and validation

### Example 2: System Component

```bash
/sdlc spec Real-time Notification System
```

Creates spec with:
- WebSocket connection management
- Notification types and formats
- Subscription mechanisms
- Delivery guarantees

### Example 3: API Design

```bash
/sdlc spec Payment Processing API
```

Creates spec with:
- Payment intent creation
- Webhook handling
- Refund processing
- Security requirements (PCI compliance)

## Integration

**Workflow Position:** Research → **Spec** → Coding

The spec phase translates research findings into a concrete implementation plan, ensuring all technical details are thought through before coding begins.

## Related Skills

- **doc.md** - Create and save specification documents
- **pencil.md** - Create diagrams for specifications
- **cache.md** - Architecture caching for context
- **research.md** - Previous phase: provides foundation
- **coding.md** - Next phase: implements based on spec

## Tips

- Be detailed - ambiguity leads to implementation questions
- Use TypeScript interfaces for all data structures
- Think about edge cases and error scenarios
- Consider how the feature will be tested
- Reference research findings for key decisions
- Use pencil.md for complex interaction diagrams
- **Check architecture cache first** - don't re-analyze well-known code
- **Update cache if needed** - help future specs work faster
