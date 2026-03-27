# Changelog: feedback v1.0.0 → v1.1.0

**Date**: 2026-03-26
**Skill**: `feedback` (global command)

## User Feedback Summary
Incorrectly referenced project paths (actions/discuss.md) instead of global commands (~/.claude/commands/). Causes Claude to edit wrong files.

## Changes Applied
1. **Enforce global-only scope**: Only edit `~/.claude/commands/*.md`
2. **Always show absolute paths**: `/Users/username/.claude/commands/feedback.md` not `feedback.md`
3. **Clear scope limitation**: Added "Scope Limitation" section
4. **Updated examples**: Use absolute paths throughout documentation

## Impact
Prevents path confusion between global commands and project-local skills.
