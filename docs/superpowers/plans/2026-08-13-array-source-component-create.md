# Array Source Component Creation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let users select schema rows or an embedded array while creating a table component, with automatic array CRUD generation.

**Architecture:** A pure quick-start helper derives safe array defaults from the chosen container field. The component modal exposes data-source and array-field controls directly below Schema Name and applies those defaults while preserving the existing advanced customization controls.

**Tech Stack:** React, TypeScript, Tailwind CSS, Vitest

## Global Constraints

- Parent ID defaults to `{{route.id}}`.
- Generate columns and Add/Edit/Delete only when an eligible row identity exists.
- Existing Table Settings controls remain available.

---

### Task 1: Array source quick start

**Files:**
- Modify: `src/utils/pageDesignerArraySource.ts`
- Test: `src/utils/pageDesignerArraySource.test.ts`
- Modify: `src/components/PageDesigner/PageDesigner.tsx`

**Interfaces:**
- Produces: `quickStartArrayTable(arrayField: Field): TableComponentConfig`

- [ ] **Step 1: Write failing tests for automatic defaults and missing identity behavior.**
- [ ] **Step 2: Run `yarn test src/utils/pageDesignerArraySource.test.ts` and verify failure.**
- [ ] **Step 3: Implement the helper and creation-modal controls.**
- [ ] **Step 4: Run focused tests, full tests, and `yarn build`.**
- [ ] **Step 5: Commit the focused files.**
