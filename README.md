# SDLC-SKill

My prompt for ai coding with intent, harness and feedback

# Install

## Plugin / Skill
```
# For claude 
claude plugin marketplace add ffengill/sdlc
claude plugin install sdlc@sdlc-marketplace

# or in claude
/plugin marketplace add ffengill/sdlc
/plugin install sdlc@sdlc-marketplace

# use
/sdlc your command  
```

## Command
```
# For claude 
git clone https://github.com/FFengIll/sdlc.git

# /sdlc:sdlc
cp -R sdlc ~/.claude/commands/
# or flatten /sdlc
cp -R sdlc/* ~/.claude/commands/
```

# Overview

## 1. Intent Detection & Auto Routing

```
  /sdlc "fix login bug" | "add user auth" | "review my changes"
        │
        ▼
  Intent Detection Engine
        │
        ├─ fix|bug    → bugfix workflow   ─┐
        ├─ add|new    → feature workflow   │
        ├─ refactor   → refactor workflow  ├─→ Execute Skill → .sdlc/docs/category-feature-date.type.md
        ├─ review|cr  → action:cr          │
        ├─ understand → understand(cache) ─┘
        └─ commit|pr  → action:commit
```

## 2. Direct Action Invocation

```
  /actions:<action>: understand | spec | coding | test | commit | cr | pr | regression
        │
        ▼
  Action Map
        │
        ├─ understand → .sdlc/arch/overview-*.arch.md
        ├─ spec       → .sdlc/docs/*.spec.md
        ├─ coding     → .sdlc/docs/*.coding.md
        ├─ test       → .sdlc/docs/*.test.md
        ├─ commit     → .sdlc/docs/*.commit.md
        └─ pr         → .sdlc/docs/*.pr.md
```

## 3. Workflow Example: Feature Development

```
  /sdlc add user authentication
        │
        ▼
  Feature Workflow:
  understand → research → spec → coding → test → commit → pr
      │            │        │       │       │       │       │
   .sdlc/       .sdlc/   .sdlc/  .sdlc/  .sdlc/  .sdlc/  .sdlc/
   arch/         docs/    docs/   docs/   docs/   docs/   docs/
  overview-    auth-*   auth-*  auth-*  auth-*  auth-*  auth-*
  *.arch.md   .research  .spec  .coding  .test  .commit   .pr
               .md       .md     .md     .md     .md      .md
```

  Interactive Flow:
  继续 / 下一步  → Next phase
  跳过测试       → Skip phase
  到哪了？       → Check status


# SDLC with Harness


* **Specifications matter.**
* Trust in the power of process.

  The Software Development Life Cycle (SDLC) may be classical, but it still has much to teach us.

* Do not attempt to keep every specification constantly updated as the code evolves.

  High-level specifications will inevitably lag behind.

* **Validation specifications are critical.**
  
  We refer to this layer as the `Harness`.

* Embrace the practice of maintaining and sharing the `Harness`:
  * It strengthens code reviews
  * It accelerates debugging
  * It supports safe refactoring
  * ……

* **REMEMBER** There is no silver bullet.

  The only constant is change.

---

* **规范（SPEC）很重要。**

* 相信流程的力量。

  Software Development Life Cycle (SDLC) 虽然古典，甚至略显传统，但它能教会我们的，远不止流程本身。

* 不要试图让所有 SPEC 随代码实时同步。

  一般性的 SPEC，天然会滞后，这是常态，而非问题。

* **验证型 SPEC 更关键。**
  
  我们可以称之为 `Harness`。

* 主动建设并沉淀 `Harness`：
  * 让 Code Review 更有依据
  * 让 Debug 更高效
  * 让 Refactoring 更安全
  * ……

* 不存在银弹。

  变化常在。

---

## Harness Showcase

![showcase-oauth](resource/showcase-oauth.png)


# SDLC with Feedback

* **反馈驱动演进。**

* 工作流结束，学习才刚开始。

  每一次通过 `/sdlc` 完成的任务，都会产生新的洞察。

* 不要满足于静态流程。

  今天有效的方法，明天可能需要改进。

* **打分、反思、迭代。**

* 持续改进：
  * 评估哪些有效，哪些无效
  * 基于真实经验更新工作流
  * 让每次迭代为下次提供依据
  * ……

* 不存在银弹。

  系统在每一次反馈循环中自我完善，人的反馈非常重要且简单。

---

* **Feedback drives evolution.**

* The workflow completes, but the learning continues.

  Every task executed through `/sdlc` generates insights.

* Do not settle for static processes.

  What works today may need refinement tomorrow.

* **Score, reflect, and iterate.**

```
# tasks done with /sdlc

# now we score them and update them
/feedback
```

* Embrace continuous improvement:
  * Evaluate what worked and what didn't
  * Update workflows based on real experience
  * Let each iteration inform the next
  * ……

* **REMEMBER** There is no silver bullet.

  The system improves itself, but feedback loop is important at a time.

---

- Inspiration from https://github.com/karpathy/autoresearch
- Implemented as `/feedback`


# Appendix

- A markdown writing plugin (support *.md) for coding task spec writing - https://github.com/FFengIll/vscode-tingly-spec.git
- AI Orchestrator - https://github.com/tingly-dev/tingly-box