# Changelog: refactor v1.0.0 → v2.0.0

**Date**: 2026-03-26
**Skill**: `workflows:refactor`

## User Feedback Summary
Workflow too verbose - 10 steps excessive. Prefer: understand → spec → coding → test, with optional cr/secure/commit/pr.

## Changes Applied
1. **Simplified core flow**: 4 required phases (understand/spec/coding/test)
2. **Removed duplicate CR**: Eliminated initial + final code review redundancy
3. **Made most steps optional**: cr/validate/secure/commit/pr now user-triggered
4. **Merged validate into test**: Test already verifies behavior unchanged
5. **Streamlined docs**: Removed verbose phase details, completion checklists

## Impact
Faster refactoring cycles, less overhead, user controls when to review/commit.
