# Per-Action Form Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let every table add/edit form configure its own grid, overflow behavior, and advanced panel/form classes from tenantPanel.

**Architecture:** Add an optional nested layout object to `TableActionConfig`, resolve it through a small pure helper shared by each frontend, and pass the result to `GenericAddEditPanel`. Add one reusable designer control rendered for create, form row actions, and bulk edit.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Vitest.

## Global Constraints

- Existing saved page configurations must render unchanged.
- Column classes must be statically discoverable by Tailwind.
- Layout configuration is owned separately by each action.

---

### Task 1: Layout resolver and persisted type

**Files:**
- Modify: `src/types/page.ts`
- Create: `src/utils/tableActionFormLayout.ts`
- Test: `src/utils/tableActionFormLayout.test.ts`

**Interfaces:**
- Produces: `resolveTableActionFormLayout(action, defaults)` returning `topClassName` and `generalClassName`.

- [ ] Write tests for defaults, column presets, overflow, and advanced class composition.
- [ ] Run the focused test and verify it fails because the resolver is missing.
- [ ] Add the layout type and minimal resolver.
- [ ] Run the focused test and verify it passes.

### Task 2: Tenant designer controls and runtime wiring

**Files:**
- Modify: `src/components/PageDesigner/PageDesigner.tsx`
- Modify: `src/components/panelComponents/FormElements/GenericPaginatedPage.tsx`
- Modify: `src/components/panelComponents/FormElements/GenericUnpaginatedPage.tsx`

**Interfaces:**
- Consumes: `TableActionConfig.formLayout` and `resolveTableActionFormLayout`.
- Produces: independent controls and resolved props for Add, row form actions, and Bulk Edit.

- [ ] Add a reusable action layout editor.
- [ ] Render it for each form-producing action.
- [ ] Replace hardcoded panel layout props with resolver output.
- [ ] Run focused tests and the tenantPanel build.

### Task 3: Runtime template parity

**Files:**
- Modify: `react-template/src/types/page.ts`
- Create: `react-template/src/utils/tableActionFormLayout.ts`
- Test: `react-template/src/utils/tableActionFormLayout.test.ts`
- Modify: `react-template/src/components/panelComponents/FormElements/GenericPaginatedPage.tsx`
- Modify: `react-template/src/components/panelComponents/FormElements/GenericUnpaginatedPage.tsx`

**Interfaces:**
- Consumes: saved per-action `formLayout` configuration.
- Produces: identical add/edit modal layout behavior in generated tenant applications.

- [ ] Add the failing resolver tests.
- [ ] Mirror the type and resolver.
- [ ] Wire every corresponding form modal.
- [ ] Run focused tests and the react-template build.

