# /sdlc

Software Development Lifecycle management with intelligent intent detection and harness.

## Usage

```bash
/sdlc [natural language request]  # Smart mode - AI detects intent
/sdlc [command] [args]             # Explicit command
```

## Quick Examples

```bash
# Smart mode - just describe what you want
/sdlc understand the codebase       # → actions:understand
/sdlc fix the login bug             # → workflows:bugfix
/sdlc add user authentication       # → workflows:feature
/sdlc review my changes             # → actions:cr
/sdlc commit my changes             # → actions:commit

# Explicit commands
/sdlc understand
/sdlc spec "Add OAuth"
/sdlc coding
/sdlc test
/sdlc commit
/sdlc pr
```

## Core Commands

| Command | Description | Skill Reference |
|---------|-------------|-----------------|
| `/sdlc guard [task]` | Safety guardrails before work | `actions:guard` |
| `/sdlc understand` | Build architecture cache | `actions:understand` |
| `/sdlc cr [scope]` | Code review - find issues | `actions:cr` |
| `/sdlc spec [title]` | Write specification | `actions:spec` |
| `/sdlc coding [desc]` | Write code | `actions:coding` |
| `/sdlc test [type]` | Run tests | `actions:test` |
| `/sdlc commit [msg]` | Commit changes | `actions:commit` |
| `/sdlc pr [action]` | Create/manage PR | `actions:pr` |
| `/sdlc simplify [scope]` | Simplify changed code | `actions:simplify` |
| `/sdlc debug [issue]` | Debug bugs | `actions:debug` |
| `/sdlc discuss [topic]` | Technical discussion | `actions:discuss` |
| `/sdlc handoff [task]` | Delegate to subagent | `actions:handoff` |
| `/sdlc feedback [skill]` | Collect skill feedback | `feedback` |
| `/sdlc status` | Show workflow progress | `flow:status` |
| `/sdlc resume` | Browse recent work | `flow:resume` |

## Workflows

| Type | Workflow | Skill Reference |
|------|----------|-----------------|
| Minor changes | coding → test → commit | `workflows:minor` |
| New feature | understand → research → spec → coding → test → commit → pr | `workflows:feature` |
| Bug fix | understand → debug → coding → test → commit → pr | `workflows:bugfix` |
| Refactor | understand → spec → coding → test → commit → pr | `workflows:refactor` |
| Research | understand → research → doc → END | `workflows:research` |

## Natural Language Flow

```bash
/sdlc 做个登录功能          # Start feature workflow
继续 / 下一步                # Proceed to next phase
跳过测试                     # Skip current phase
到哪了？                     # Check status
```

## Output Structure

```
.sdlc/
├── state.json             # Workflow state
├── docs/                  # Working documents (flat)
│   ├── auth-user-login-20240115.spec.md
│   ├── auth-user-login-20240116.coding.md
│   └── payment-stripe-checkout-20240201.cr.md
├── harness/               # Verification harnesses
│   └── auth-flow-invariants-20240115.harness.md
└── arch/                  # Architecture cache
    ├── overview-20240115.arch.md
    └── auth-20240115.arch.md
```

### File Naming: `category-feature-date.type.md`

**Document Types**: `spec`, `coding`, `test`, `cr`, `debug`, `research`, `validate`, `secure`, `commit`, `pr`, `guard`, `harness`, `arch`, `feedback`

---

# Internal: Intent Detection & Routing

> This section is for AI execution only.

## Intent Detection

When `/sdlc` receives input:

1. **Check explicit commands first**
   ```
   guard|understand|cr|spec|harness|coding|test|validate|commit|pr|debug|research|secure|discuss|handoff|feedback|status|resume|simplify
   ```
   → Execute corresponding skill directly

2. **Detect workflow intents**
   - Bug fix: `fix|bug|issue|error|修复` → `workflows:bugfix`
   - Feature: `add|new feature|implement|添加|新功能` → `workflows:feature`
   - Refactor: `refactor|clean up|重构` → `workflows:refactor`

3. **Detect action intents**
   - Understand (creates cache): `understand|analyze architecture|build context`
   - Explore (lightweight): `explore|show me|how does|explain|what is`
   - Review: `review|check|audit|find issues|检查`
   - Spec: `spec|specification|write spec|规范`
   - Research: `research|investigate|compare|研究`
   - Coding: `implement|code|write|build|实现`
   - Test: `test|run tests|测试`
   - Commit: `commit|save changes|提交`
   - PR: `pull request|pr|提交pr`
   - Simplify: `simplify|clean up code|简化`

4. **Flow control (natural language)**
   - Continue: `continue|next|proceed|继续|下一步`
   - Skip: `skip|bypass|跳过`
   - Status: `status|progress|where am i|状态|到哪了`

## Skill Invocation Map

### Action Skills
```
/sdlc guard     → actions:guard
/sdlc understand → actions:understand
/sdlc cr        → actions:cr
/sdlc spec      → actions:spec
/sdlc harness   → actions:harness
/sdlc coding    → actions:coding
/sdlc test      → actions:test
/sdlc validate  → actions:validate
/sdlc commit    → actions:commit
/sdlc pr        → actions:pr
/sdlc debug     → actions:debug
/sdlc research  → actions:research
/sdlc secure    → actions:secure
/sdlc discuss   → actions:discuss
/sdlc handoff   → actions:handoff
/sdlc simplify  → actions:simplify
/sdlc feedback  → feedback
```

### Workflow Skills
```
bugfix workflow   → workflows:bugfix
feature workflow  → workflows:feature
refactor workflow → workflows:refactor
research workflow → workflows:research
minor workflow    → workflows:minor
```

### Flow Control
```
/sdlc status → flow:status
/sdlc resume → flow:resume
```

### Utility Skills
```
utils:archive     - Archive documentation
utils:cache       - Manage architecture cache
utils:doc         - Documentation management
utils:git         - Git operations
utils:git-resolve - Resolve git conflicts
utils:pencil      - Quick note-taking
```

## Routing Logic

```python
# Pseudo-code
if is_explicit_command(input):
    execute_skill(command_to_skill_map[input])
elif has_flow_control_intent(input):
    if wants_to_continue(): advance_to_next_phase()
    elif wants_to_skip(): skip_current_phase()
    elif wants_status(): execute_skill('flow:status')
elif has_bugfix_intent(input):
    execute_skill('workflows:bugfix', extract_description(input))
elif has_feature_intent(input):
    execute_skill('workflows:feature', extract_description(input))
elif has_refactor_intent(input):
    execute_skill('workflows:refactor', extract_description(input))
else:
    intent = detect_phase_intent(input)
    if intent: execute_skill(f'phases:{intent}')
    else: ask_for_clarification()
```

## Execution Feedback

Always show detected intent:
```
🎯 Detected: <intent>
📋 Scope: <scope>
→ Executing: <skill_reference>
```

## Key Behaviors

| Intent | Creates Files | Purpose |
|--------|--------------|---------|
| `understand` | ✅ `.sdlc/arch/`, `*.understand.md` | Reusable architecture cache |
| `cr` | ✅ `*.cr.md` | Code review with findings |
| `explore` | ❌ No files | Quick inspection only |

**When to use:**
- User says "explore/explain/how does" → Just read and explain (no skill)
- User says "understand/analyze architecture" → Execute `actions:understand`
- User says "review/check/find issues" → Execute `actions:cr`
