# Container Details Scroll Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make overflowing Routes and Permissions content vertically scrollable inside the container-details modal.

**Architecture:** Centralize the modal content wrapper class selection in a pure helper. Fixed-height management views receive vertical overflow scrolling, while other views preserve the existing max-height behavior.

**Tech Stack:** React, TypeScript, Tailwind CSS, Vitest

## Global Constraints

- Keep the modal header and tabs outside the scroll region.
- Do not change table behavior globally.
- Preserve the existing `70vh` content boundary.

---

### Task 1: Scrollable container-details content

**Files:**
- Create: `src/utils/containerDetailsModalLayout.ts`
- Test: `src/utils/containerDetailsModalLayout.test.ts`
- Modify: `src/components/panelComponents/Modals/ContainerDetailsModal.tsx`

**Interfaces:**
- Produces: `getContainerDetailsContentClass(viewMode: string): string`

- [ ] **Step 1: Write the failing test**

Assert that `routes` and `permissions` return `h-[70vh] overflow-y-auto`, and `json` retains `max-h-[70vh] overflow-y-auto`.

- [ ] **Step 2: Run test to verify it fails**

Run: `yarn test src/utils/containerDetailsModalLayout.test.ts`

Expected: FAIL because the helper module does not exist.

- [ ] **Step 3: Write minimal implementation**

Implement the pure class selector and replace the modal's inline conditional with it.

- [ ] **Step 4: Run verification**

Run: `yarn test src/utils/containerDetailsModalLayout.test.ts`, `yarn test`, and `yarn build`.

- [ ] **Step 5: Commit**

Commit the focused modal, helper, test, design, and plan files.
