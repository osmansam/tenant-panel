# Workflow Cache Controls Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Control workflow result caching from the collection's Workflows tab, following the existing pipeline editor as explicitly requested by the user.

**Architecture:** Preserve `isRedisCached` and `cacheTime` in the workflow API type/normalizer. Add a switch and duration field to the existing workflow modal and a configuration badge to workflow rows. Reuse current form components and persistence callbacks.

**Tech Stack:** React, TypeScript, existing CheckSwitch/TextInput, Vitest and Testing Library.

**Spec:** User instruction: add controls under collection edit → Workflows, following the pipeline implementation. Backend contract: opt-in public read-only result caching, `cacheTime` in minutes, zero uses backend default.

## Global Constraints

- Preserve existing dirty axiosClient files; authentication behavior is outside this UI change.
- New workflows default to cache disabled; stored preferences survive edits and save failures.
- Duration is a non-negative whole number of minutes. Zero means backend default.
- Explain that backend eligibility applies to public read-only manual workflows; do not alter authentication flags when caching changes.
- Keep changes local; deployment is separate.

## Review Focus

- Legacy workflows without cache fields must stay uncached.
- PascalCase and camelCase API responses must retain explicit false and zero values.
- Editing another field must not discard saved cache preferences.
- Invalid duration must not be silently truncated or saved.
- A configured badge must not imply a live cache hit or override backend eligibility.

### Task 1: Configuration round trip

**Files:** `src/utils/api/container.ts`, `src/utils/api/container.test.ts`.
**Interfaces:** `DynamicWorkflow.isRedisCached?: boolean`, `DynamicWorkflow.cacheTime?: number`; `normalizeDynamicWorkflow` returns disabled/zero defaults.

- [x] Add failing tests for normalized settings and mutation payload persistence.
- [x] Add optional fields and normalization without modifying the transport or auth code.
- [x] Verify targeted API tests pass.

### Task 2: Existing workflow editor and list

**Files:** `src/components/panelComponents/Modals/AddWorkflowModal.tsx`, `AddWorkflowModal.test.tsx`, `ContainerDetailsModal.tsx`, `ContainerDetailsModal.test.tsx`.
**Interfaces:** Existing `onAddWorkflow` and `updateWorkflowsAsync` persist both cache fields.

- [x] Add failing UI tests for enable, duration, edit/disable, failed save, invalid duration, and row display.
- [x] Add Cache Results control and Cache Duration (minutes), preserve values, and display configured status in workflow rows.
- [x] Run targeted tests, full `npm test`, and `npm run build`.
- [x] Perform independent review and address material findings with regression tests.

## Verification

- `npm test`: 113 test files, 620 tests passed; no type errors.
- `npm run build`: passed.
- `git diff --check`: passed.
- Independent review: no critical or important issues.
- Deferred minor: clearing the duration input selects zero (server default); help text currently documents explicit zero only.
- Review scope: new panel controls and persistence. Existing axios changes were preserved; the backend cache implementation was reviewed separately in the preceding task.
- Changes remain local; neither panel nor backend has been deployed by this task.
