# Row-aware Cell Class Templates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve top-level row placeholders in table cell class rules, supporting both complete Tailwind classes and raw runtime background colors in tenantPanel and react-template.

**Architecture:** Each frontend receives the same pure cell-presentation resolver in `genericPageHelpers.ts`. The existing rule matcher calls it after selecting conditional or fallback rules, while `GenericTable` accepts an optional row-key style function so runtime arbitrary background colors are rendered inline and all other resolved tokens remain classes.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Vitest, Vite

## Global Constraints

- Support `{{field}}` only for top-level scalar row values.
- Support complete class values and raw colors inside `bg-[{{field}}]`.
- Preserve static classes, conditional rules, fallback rules, and legacy configurations.
- Missing, null, object, and array values resolve to an empty string.
- Keep tenantPanel preview and react-template runtime behavior equivalent.

---

### Task 1: Pure row-aware cell presentation resolver

**Files:**
- Create: `tenantPanel/src/utils/genericPageHelpers.test.ts`
- Modify: `tenantPanel/src/utils/genericPageHelpers.ts`
- Create: `react-template/src/utils/genericPageHelpers.test.ts`
- Modify: `react-template/src/utils/genericPageHelpers.ts`

**Interfaces:**
- Produces: `resolveRowClassPresentation(row, className): { className: string; style: React.CSSProperties }`
- Updates: `getMatchingRowClassNames` to interpolate matched/fallback rule class strings.

- [ ] Write failing table-driven tests asserting `{{backgroundClass}}` becomes `bg-red-500`, `bg-[{{backgroundColor}}]` becomes `style.backgroundColor = "#ff0000"`, mixed static tokens survive, missing/non-scalar values become empty, and condition/fallback selection remains unchanged.
- [ ] Run each focused Vitest file and confirm failures are caused by the absent resolver behavior.
- [ ] Implement scalar placeholder interpolation, arbitrary `bg-[value]` extraction, whitespace normalization, and matched-rule aggregation identically in both helpers.
- [ ] Run both focused test files and confirm they pass with no type errors.

### Task 2: Render resolved inline cell styles

**Files:**
- Modify: `tenantPanel/src/components/panelComponents/shared/types.ts`
- Modify: `tenantPanel/src/components/panelComponents/Tables/GenericTable.tsx`
- Modify: `tenantPanel/src/components/panelComponents/FormElements/GenericPaginatedPage.tsx`
- Modify: `tenantPanel/src/components/panelComponents/FormElements/GenericUnpaginatedPage.tsx`
- Modify equivalent files under `react-template/src/components/panelComponents/`

**Interfaces:**
- Consumes: `resolveRowClassPresentation(row, getMatchingRowClassNames(...))`
- Produces: `RowKeyType<T>.style?: React.CSSProperties | ((row: T) => React.CSSProperties)`

- [ ] Add a failing resolver/integration assertion demonstrating raw background colors are exposed as row-key style rather than an uncompiled arbitrary Tailwind class.
- [ ] Extend `RowKeyType`, compute class and style once per rendered cell, and apply the resolved style wherever the computed cell class is rendered.
- [ ] Update paginated, unpaginated, and computed-label row-key builders in both frontends to provide class and style from the same row-aware presentation.
- [ ] Run focused tests and TypeScript builds for both projects.

### Task 3: Designer guidance and full verification

**Files:**
- Modify: `tenantPanel/src/components/PageDesigner/PageDesigner.tsx`

**Interfaces:**
- Documents: `{{backgroundClass}}` and `bg-[{{backgroundColor}}]` in the existing Cell Classes editor.

- [ ] Add concise examples below the class-name input without changing the saved schema.
- [ ] Run `yarn test` and `yarn build` in tenantPanel.
- [ ] Run `yarn test` and `yarn build` in react-template.
- [ ] Run `git diff --check` and inspect both repository diffs for unrelated changes.
