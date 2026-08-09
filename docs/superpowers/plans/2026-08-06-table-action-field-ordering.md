# Table Action Field Ordering Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add accessible up/down controls that reorder form fields in every Table Actions editor.

**Architecture:** A pure bounded reorder helper returns an immutable reordered array. Page Designer action-specific handlers apply it to add, row, and bulk-edit `formFields`; icon buttons invoke those handlers and disable invalid boundary moves.

**Tech Stack:** React 18, TypeScript, Vitest, react-icons

## Global Constraints

- Preserve the existing persisted `formFields` array schema.
- Apply controls to add, per-row, and bulk-edit action fields.
- Preserve complete field objects and disable invalid boundary moves.

---

### Task 1: Bounded reorder helper

**Files:**
- Modify: `src/utils/pageDesignerTableConfig.ts`
- Test: `src/utils/pageDesignerTableConfig.test.ts`

**Interfaces:**
- Produces: `moveArrayItem<T>(items: T[], index: number, direction: -1 | 1): T[]`

- [ ] Add failing tests proving upward/downward swaps, unchanged boundaries, immutable input, and object identity preservation.
- [ ] Run `yarn test src/utils/pageDesignerTableConfig.test.ts` and confirm behavior assertions fail.
- [ ] Implement a bounded adjacent swap that returns the original array for invalid moves and a copied array for valid moves.
- [ ] Rerun the focused test and confirm it passes with no type errors.

### Task 2: Page Designer handlers and controls

**Files:**
- Modify: `src/components/PageDesigner/PageDesigner.tsx`

**Interfaces:**
- Consumes: `moveArrayItem`
- Produces: handlers for add-button, row-action, and bulk-edit field arrays.

- [ ] Add immutable move handlers beside each existing update/remove handler.
- [ ] Import up/down icons and render accessible buttons in all three field lists.
- [ ] Disable Up at index `0` and Down at `fields.length - 1`; retain existing remove controls.
- [ ] Run the focused utility test and `yarn build`.

### Task 3: Full verification

**Files:**
- Verify all modified source and test files.

**Interfaces:**
- Confirms saved array order remains the runtime field order.

- [ ] Run `yarn test`.
- [ ] Run `yarn build`.
- [ ] Run `git diff --check` and inspect the scoped diff for unrelated changes.
