# Standardized Form Controls Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the application's parallel form-control implementations with one accessible, token-driven primitive system used by every administrative and generated-form control.

**Architecture:** `src/components/ui` owns the only low-level inputs and the only `react-select` integration. Generated form fields and temporary legacy adapters compose those primitives, while application screens map their existing state into the shared APIs without changing persisted values or request payloads.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, `react-select` 5, Vitest, Testing Library, ESLint, Vite

**Spec:** `docs/superpowers/specs/2026-10-16-standardized-form-controls-design.md`

## Global Constraints

- Cover the complete `tenantPanel/src` application, including admin/configuration screens and customer-facing generated forms.
- Use the existing `react-select` dependency for the single shared `Select`; do not add shadcn, Radix, or another form-control dependency.
- Preserve saved page configuration, backend request payloads, option values, defaults, validation rules, debounce behavior, suggestions, clearing, and one-option autofill.
- Use `--ui-control-md` (40px), `--ui-radius-md`, and the existing UI color/focus tokens as the default visual contract.
- Permit caller classes for layout, width, grid placement, monospace text, or an explicit shared size only; callers must not replace control borders, radius, background, focus, invalid, or disabled styling.
- Preserve all unrelated work already present in the dirty worktree. Before editing or staging a pre-modified file, inspect its diff; stage only this migration's hunks with `git add -p`, and leave ambiguous overlapping hunks uncommitted for the user.
- Follow strict red-green-refactor cycles and run the complete test suite before reporting completion.

## Review Focus

- Falsy option values (`0` and the empty string) must remain selectable and must not be mistaken for “no selection”; Task 1 adds explicit tests.
- Select menus inside the Page Designer's clipped, scrollable dialog must portal above the dialog and remain keyboard-accessible; Tasks 1 and 5 add coverage.
- Async option replacement must not create repeated autofill callbacks or retain a selection that no longer exists; Task 2 adds coverage.
- Read-only and disabled controls must expose an accessible state and must never invoke change callbacks; Tasks 1 and 3 add coverage.
- Migrated generated forms must submit the same scalar, numeric, array, date/time, file, and boolean payload shapes as before; Task 2 extends the representative integration test.

---

### Task 1: Build the shared control foundation

**Files:**
- Create: `src/components/ui/select.tsx`
- Create: `src/components/ui/select.test.tsx`
- Modify: `src/components/ui/input.tsx`
- Modify: `src/components/ui/textarea.tsx`
- Modify: `src/components/ui/checkbox.tsx`
- Modify: `src/components/ui/index.ts`
- Modify: `src/components/ui/ui-primitives.test.tsx`
- Modify: `src/styles/forms.css`
- Modify: `eslint.config.js`

**Interfaces:**
- Consumes: existing `OptionType`-compatible objects and UI tokens.
- Produces: `SelectOption<Value>`, `SelectChangeMeta<Option>`, `SelectProps<Option>`, `Select`, `normalizeSelectSearch(text: string): string`, and the existing `Input`, `Textarea`, and `Checkbox` with a shared `controlSize?: "sm" | "md" | "lg"` prop.

- [ ] **Step 1: Write failing primitive tests**

Add tests named:

- `preserves string, numeric zero, and empty-string option values`;
- `emits arrays in multiple mode without duplicating selections`;
- `matches Turkish characters during search`;
- `supports keyboard open, navigation, selection, and Escape close`;
- `portals its menu outside a clipped dialog container`;
- `renders invalid, disabled, read-only, loading, and empty states accessibly`;
- `uses the shared small, medium, and large control heights`.

Assert on visible options, callback values, roles/ARIA state, portal parentage, and shared state classes—not implementation mocks.

- [ ] **Step 2: Run the primitive tests and verify RED**

Run: `yarn test src/components/ui/select.test.tsx src/components/ui/ui-primitives.test.tsx`

Expected: FAIL because `Select` and the size contract do not exist.

- [ ] **Step 3: Implement the shared APIs**

In `select.tsx`, export:

```ts
export interface SelectOption<Value = string | number> {
  value: Value;
  label: string;
  disabled?: boolean;
  leftLabel?: string;
  rightLabel?: string;
  imageUrl?: string;
}

export type SelectChangeMeta<Option extends SelectOption = SelectOption> =
  import("react-select").ActionMeta<Option>;

export interface SelectProps<Option extends SelectOption = SelectOption> {
  id?: string;
  name?: string;
  value: Option | readonly Option[] | null;
  options: readonly Option[];
  onChange: (
    value: Option | readonly Option[] | null,
    actionMeta: SelectChangeMeta<Option>,
  ) => void;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  loading?: boolean;
  required?: boolean;
  placeholder?: string;
  noOptionsMessage?: string;
  controlSize?: "sm" | "md" | "lg";
  sortOptions?: boolean;
  menuPortalTarget?: HTMLElement | null;
  className?: string;
  "aria-describedby"?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}
```

Use `react-select` only in this file. Default `menuPortalTarget` to `document.body` when available, use fixed menu positioning, preserve original option objects, and render existing rich option metadata. Extend the native primitives and `.ui-control` styles with the same explicit size mapping and semantic states.

Add the raw-element ESLint selectors at warning severity for the migration; exempt only the UI primitive implementation files.

- [ ] **Step 4: Run primitive tests and verify GREEN**

Run: `yarn test src/components/ui/select.test.tsx src/components/ui/ui-primitives.test.tsx`

Expected: all selected tests PASS with no React accessibility warnings.

- [ ] **Step 5: Commit the foundation**

```bash
git add src/components/ui src/styles/forms.css eslint.config.js
git commit -m "feat: add shared select control"
```

### Task 2: Route generated-form fields through the primitives

**Files:**
- Modify: `src/components/form-fields/select-field.tsx`
- Delete: `src/components/form-fields/selectStyles.ts`
- Modify: `src/components/form-fields/index.ts`
- Modify: `src/components/form-fields/select-field.test.tsx`
- Modify: `src/components/form-fields/form-fields.test.tsx`
- Modify: `src/components/form-fields/temporal-color-fields.test.tsx`
- Modify: `src/components/forms/DynamicForm.integration.test.tsx`
- Modify: `src/components/forms/DynamicFormField.test.tsx`

**Interfaces:**
- Consumes: Task 1 `Select`, `Input`, `Textarea`, `Checkbox`, and `Field` contracts.
- Produces: the existing public field component APIs unchanged; `SelectField` delegates all selection behavior to `ui/Select`.

- [ ] **Step 1: Add failing generated-form regression tests**

Extend the existing tests to prove:

- `SelectField` uses the shared single/multiple selection shapes, including numeric zero;
- replacing async options clears a now-invalid visual selection and one-option autofill fires once per eligible option set;
- dependent selects still reset when their parent changes;
- the representative form submits the same scalar, array, date/time, boolean, and numeric values before and after migration;
- required, error, description, disabled, and read-only presentation comes from one field contract.

- [ ] **Step 2: Run the generated-form tests and verify RED**

Run: `yarn test src/components/form-fields src/components/forms/DynamicFormField.test.tsx src/components/forms/DynamicForm.integration.test.tsx`

Expected: new assertions FAIL because `SelectField` still owns a separate `react-select` implementation and async invalidation is not centralized.

- [ ] **Step 3: Refactor `SelectField` to compose `ui/Select`**

Remove direct `react-select` and `getSelectStyles` use from `select-field.tsx`. Keep its current props and suggestion buttons, map them into the Task 1 component, and preserve its object-valued callbacks. Remove `selectStyles.ts` and its export after no consumers remain.

- [ ] **Step 4: Run the generated-form tests and verify GREEN**

Run: `yarn test src/components/form-fields src/components/forms/DynamicFormField.test.tsx src/components/forms/DynamicForm.integration.test.tsx`

Expected: all selected tests PASS and submission assertions retain the previous payload shapes.

- [ ] **Step 5: Commit the generated-form migration**

```bash
git add src/components/form-fields src/components/forms/DynamicForm.integration.test.tsx src/components/forms/DynamicFormField.test.tsx
git commit -m "refactor: unify generated form controls"
```

### Task 3: Convert legacy and specialized controls into adapters

**Files:**
- Modify: `src/components/panelComponents/FormElements/SelectInput.tsx`
- Modify: `src/components/panelComponents/FormElements/SelectOptionContent.tsx`
- Modify: `src/components/panelComponents/FormElements/SelectOptionContent.test.ts`
- Create: `src/components/panelComponents/FormElements/SelectInput.test.tsx`
- Modify: `src/components/panelComponents/FormElements/TextInput.tsx`
- Modify: `src/components/panelComponents/FormElements/TextInput.test.tsx`
- Modify: `src/components/panelComponents/FormElements/DateInput.tsx`
- Modify: `src/components/panelComponents/FormElements/HourInput.tsx`
- Modify: `src/components/panelComponents/FormElements/MonthYearInput.tsx`
- Modify: `src/components/panelComponents/FormElements/TabInput.tsx`
- Modify: `src/components/panelComponents/FormElements/TabInputScreen.tsx`
- Modify: `src/components/form-fields/temporal-color-fields.test.tsx`

**Interfaces:**
- Consumes: Task 1 primitives and the existing legacy props.
- Produces: unchanged legacy callback signatures, implemented only as adapters over shared controls; no direct `react-select` or MUI `TextField` imports remain outside `components/ui`.

- [ ] **Step 1: Write failing adapter compatibility tests**

Test legacy single/multi callbacks and `ActionMeta`, one-option autofill, clear callbacks, Turkish search, suggestions, debounced text input, number min/max buttons, password visibility, date mask/calendar selection, hour/month-year option selection, and disabled/read-only non-interaction. Assert that all editable surfaces have the shared control sizing and accessible labels.

- [ ] **Step 2: Run adapter and temporal tests and verify RED**

Run: `yarn test src/components/panelComponents/FormElements/SelectInput.test.tsx src/components/panelComponents/FormElements/TextInput.test.tsx src/components/form-fields/temporal-color-fields.test.tsx`

Expected: new shared-rendering and compatibility assertions FAIL.

- [ ] **Step 3: Implement thin adapters**

Make `SelectInput`, `HourInput`, and `MonthYearInput` use `ui/Select`; make `TextInput`, `DateInput`, and `TabInputScreen` use `Input`/`Checkbox`; keep calendars, masks, steppers, and suggestion UI as composition around those primitives. Remove direct style objects and direct `react-select`/MUI input rendering from these files.

- [ ] **Step 4: Run adapter and generated-field tests and verify GREEN**

Run: `yarn test src/components/panelComponents/FormElements src/components/form-fields src/components/forms/DynamicFormField.test.tsx`

Expected: all selected tests PASS.

- [ ] **Step 5: Commit the adapters**

```bash
git add src/components/panelComponents/FormElements src/components/form-fields/temporal-color-fields.test.tsx
git commit -m "refactor: route legacy inputs through shared controls"
```

### Task 4: Migrate the extracted Page Designer editors

**Files:**
- Modify: `src/components/PageDesigner/ActionConstantValuesEditor.tsx`
- Modify: `src/components/PageDesigner/CellExcelUploadModal.tsx`
- Modify: `src/components/PageDesigner/ComponentOutputsEditor.tsx`
- Modify: `src/components/PageDesigner/ExcelUploadModal.tsx`
- Modify: `src/components/PageDesigner/FormComponentEditor.tsx`
- Modify: `src/components/PageDesigner/FormFieldEditor.tsx`
- Modify: `src/components/PageDesigner/PageFilterModal.tsx`
- Modify: `src/components/PageDesigner/PageNavigatorEditor.tsx`
- Modify: `src/components/PageDesigner/ParameterBindingsEditor.tsx`
- Modify: `src/components/PageDesigner/RelationMatrixRowFilterEditor.tsx`
- Create: `src/components/PageDesigner/PageDesignerControls.test.tsx`
- Modify: `src/components/PageDesigner/PageNavigatorEditor.layout.test.tsx`

**Interfaces:**
- Consumes: Task 1 primitives; value mapping remains local to each editor.
- Produces: no raw form tags in extracted Page Designer components and unchanged editor `onChange` payloads.

- [ ] **Step 1: Write failing representative editor tests**

Render `PageFilterModal`, `PageNavigatorEditor`, `ParameterBindingsEditor`, `FormComponentEditor`, and `RelationMatrixRowFilterEditor`. Change at least one select, text/number input, checkbox, and textarea; assert each existing callback receives the same value shape and that errors/descriptions retain accessible linkage.

- [ ] **Step 2: Run Page Designer editor tests and verify RED**

Run: `yarn test src/components/PageDesigner/PageDesignerControls.test.tsx src/components/PageDesigner/PageNavigatorEditor.layout.test.tsx`

Expected: shared-combobox and shared-state assertions FAIL against the raw controls.

- [ ] **Step 3: Replace raw editor controls**

Import controls from `../ui`, replace every raw input/select/textarea in the listed files, and replace checkbox settings with `Checkbox` or `Switch` according to whether the label describes a boolean setting. Delete local `inputClass` constants that duplicate the token contract.

- [ ] **Step 4: Run editor tests and verify GREEN**

Run: `yarn test src/components/PageDesigner/PageDesignerControls.test.tsx src/components/PageDesigner/PageNavigatorEditor.layout.test.tsx src/components/PageDesigner/PageFilterModal.test.ts`

Expected: all selected tests PASS.

- [ ] **Step 5: Commit the extracted-editor migration**

```bash
git add src/components/PageDesigner
git commit -m "refactor: standardize page designer editors"
```

### Task 5: Migrate Page Designer component setup and table configuration

**Files:**
- Modify: `src/components/PageDesigner/PageDesigner.tsx` (component setup plus table Display, Request, Columns, Links, Cell Classes, Row Classes, Nested Rows, Generated Relation Columns, and Display Toggles regions)
- Create: `src/components/PageDesigner/PageDesigner.formControls.test.tsx`
- Modify: `src/components/PageDesigner/PageDesigner.shell.test.tsx`

**Interfaces:**
- Consumes: Task 1 primitives and existing table/page types.
- Produces: shared controls for the screenshot-visible modal and unchanged committed component configuration.

- [ ] **Step 1: Add failing modal integration tests**

Use a table component fixture and mocked container metadata. Open Edit Component and verify that changing Component Type/Schema, Data loading, a column type/visibility value, link type, cell and row class rules, relation-column settings, and a display toggle survives `Save Changes` with the existing configuration shape. Open a select within the scrollable table settings pane and assert its menu is attached outside the clipped modal body.

- [ ] **Step 2: Run modal tests and verify RED**

Run: `yarn test src/components/PageDesigner/PageDesigner.formControls.test.tsx src/components/PageDesigner/PageDesigner.shell.test.tsx`

Expected: shared-combobox and portal assertions FAIL while the raw table controls remain.

- [ ] **Step 3: Replace controls in the defined Page Designer regions**

Use `Field` where the modal currently hand-builds labels/descriptions/errors. Convert scalar values to/from `SelectOption` objects without changing `TableComponentConfig`. Use `Input`, `Textarea`, `Checkbox`, and `Switch` for the remaining controls. Preserve max/min coercion and default-value logic exactly.

- [ ] **Step 4: Run modal and table utility tests and verify GREEN**

Run: `yarn test src/components/PageDesigner/PageDesigner.formControls.test.tsx src/components/PageDesigner/PageDesigner.shell.test.tsx src/utils/tableConfig.test.ts src/utils/pageDesignerTableConfig.test.ts src/utils/generatedRelationColumns.test.ts`

Expected: all selected tests PASS.

- [ ] **Step 5: Commit the primary Page Designer migration**

```bash
git add src/components/PageDesigner/PageDesigner.tsx src/components/PageDesigner/PageDesigner.formControls.test.tsx src/components/PageDesigner/PageDesigner.shell.test.tsx
git commit -m "refactor: unify page designer table controls"
```

### Task 6: Migrate Page Designer actions, filters, and remaining component modes

**Files:**
- Modify: `src/components/PageDesigner/PageDesigner.tsx` (Filter Inputs, add/edit/bulk actions, chart, form, tab, information/distribution block, relation-matrix, and remaining component-mode regions)
- Modify: `src/components/PageDesigner/PageDesigner.formControls.test.tsx`
- Modify: `src/components/PageDesigner/PageDesigner.formSave.test.ts`

**Interfaces:**
- Consumes: Task 5's partially migrated modal and Task 1 primitives.
- Produces: no raw form tags in `PageDesigner.tsx`; unchanged action/filter/component payloads.

- [ ] **Step 1: Add failing action and alternate-mode tests**

Add representative tests for an action form field, filter-panel field, bulk edit field, chart option, form field, relation-matrix option, and distribution-block textarea. Interact through roles and assert `Save Changes` commits the exact prior scalar, boolean, numeric, and JSON values.

- [ ] **Step 2: Run Page Designer form-control tests and verify RED**

Run: `yarn test src/components/PageDesigner/PageDesigner.formControls.test.tsx src/components/PageDesigner/PageDesigner.formSave.test.ts`

Expected: new role/behavior assertions FAIL against remaining raw controls.

- [ ] **Step 3: Replace the remaining Page Designer controls**

Use the shared primitives directly, retain the existing `SelectInput` adapter only where a legacy object-valued callback is still required, and do not introduce Page-Designer-specific base controls. Remove duplicated control class strings after their final use.

- [ ] **Step 4: Run the complete Page Designer test set and verify GREEN**

Run: `yarn test src/components/PageDesigner src/utils/pageDesignerArraySource.test.ts src/utils/tableActionFormLayout.test.ts src/utils/tableConstantValues.test.ts src/utils/tableToggles.test.ts`

Expected: all selected tests PASS.

- [ ] **Step 5: Commit the remaining Page Designer migration**

```bash
git add src/components/PageDesigner/PageDesigner.tsx src/components/PageDesigner/PageDesigner.formControls.test.tsx src/components/PageDesigner/PageDesigner.formSave.test.ts
git commit -m "refactor: standardize page designer action controls"
```

### Task 7: Migrate modern pages and domain editors

**Files:**
- Modify: `src/pages/IntegrationsPage.tsx`
- Modify: `src/pages/IntegrationsPage.test.tsx`
- Modify: `src/pages/ProjectsPage.tsx`
- Modify: `src/pages/PageDesignerPage.tsx`
- Modify: `src/components/route-access/RouteAccessPolicyEditor.tsx`
- Modify: `src/components/route-access/RouteAccessPolicyEditor.test.tsx`
- Modify: `src/components/localization/ProjectLocalizationSection.tsx`
- Modify: `src/components/localization/ProjectLocalizationSection.test.tsx`
- Modify: `src/components/branding/BrandingAssetField.tsx`
- Modify: `src/components/branding/BrandingEditor.tsx`
- Modify: `src/components/branding/BrandingEditor.test.tsx`
- Modify: `src/components/panelComponents/common/ContainersSection.tsx`
- Modify: `src/components/panelComponents/common/PagesSection.tsx`

**Interfaces:**
- Consumes: Task 1 primitives.
- Produces: unchanged integration, project, policy, locale, branding, container, and page-management request values.

- [ ] **Step 1: Extend existing behavior tests before migration**

Cover a representative select and input in each domain: integration authentication/method, project template selection, route-policy source/operator, source/default locale plus locale checkbox, branding color/asset, and container/page filters. Assert existing callbacks or submitted API payloads, including disabled/read-only states.

- [ ] **Step 2: Run domain tests and verify RED**

Run: `yarn test src/pages/IntegrationsPage.test.tsx src/pages/ProjectsPage.test.tsx src/components/route-access/RouteAccessPolicyEditor.test.tsx src/components/localization/ProjectLocalizationSection.test.tsx src/components/branding/BrandingEditor.test.tsx src/pages/PagesPage.test.tsx`

Expected: shared-control role/state assertions FAIL before migration.

- [ ] **Step 3: Migrate the listed screens carefully around dirty files**

Inspect each pre-existing diff first. Replace raw controls only, preserve unrelated authorization/localization/branding edits, and map shared select option objects back to the exact existing scalar values. Use `Input type="file"` for hidden import/upload controls and `Checkbox` for native checkbox semantics.

- [ ] **Step 4: Run domain tests and verify GREEN**

Run the Step 2 command again.

Expected: all selected tests PASS and existing request assertions remain unchanged.

- [ ] **Step 5: Commit only separable migration hunks**

Use `git add -p` for every file that was dirty before this task. Commit only when the staged diff contains no unrelated work:

```bash
git commit -m "refactor: standardize management form controls"
```

### Task 8: Migrate legacy panels, modals, and tables

**Files:**
- Modify: `src/components/panelComponents/FormElements/GenericAddComponent.tsx`
- Modify: `src/components/panelComponents/FormElements/GenericAddEditPanel.tsx`
- Modify: `src/components/panelComponents/Modals/AddDynamicApiModal.tsx`
- Modify: `src/components/panelComponents/Modals/AddPipelineModal.tsx`
- Modify: `src/components/panelComponents/Modals/AddWorkflowModal.tsx`
- Modify: `src/components/panelComponents/Modals/ContainerDetailsModal.tsx`
- Modify: `src/components/panelComponents/Modals/CreatePageModal.tsx`
- Modify: `src/components/panelComponents/Modals/CreateWithJsonModal.tsx`
- Modify: `src/components/panelComponents/Modals/ExportModal.tsx`
- Modify: `src/components/panelComponents/Tables/EnterpriseCheckbox.tsx`
- Modify: `src/components/panelComponents/Tables/FilterPanel.tsx`
- Modify: `src/components/panelComponents/Tables/GenericTable.tsx`
- Create: `src/components/panelComponents/FormElements/LegacyControlMigration.test.tsx`

**Interfaces:**
- Consumes: Tasks 1 and 3 primitives/adapters.
- Produces: no raw form tags in legacy panels, modals, or tables; unchanged modal submit and filter values.

- [ ] **Step 1: Write failing representative legacy-flow tests**

Render representative generic add/edit inputs, a create-page type/schema selection, JSON textarea, export checkbox/date input, table page-size select, and filter-panel select/textarea. Assert their current submit/filter callback values and shared accessible roles.

- [ ] **Step 2: Run legacy-flow tests and verify RED**

Run: `yarn test src/components/panelComponents/FormElements/LegacyControlMigration.test.tsx src/components/PageDesigner/ExcelUploadModal.test.tsx`

Expected: shared-control assertions FAIL while direct elements remain.

- [ ] **Step 3: Replace remaining legacy raw controls**

Use Task 1 primitives for DOM-shaped callbacks and Task 3 adapters only for existing value-shaped legacy callbacks. Replace direct `react-select` type dependencies with types exported by `ui/Select`. Preserve JSON parsing, file acceptance, paging coercion, and filter serialization.

- [ ] **Step 4: Run legacy and table tests and verify GREEN**

Run: `yarn test src/components/panelComponents src/components/PageDesigner/ExcelUploadModal.test.tsx`

Expected: all selected tests PASS.

- [ ] **Step 5: Commit the legacy-surface migration**

```bash
git add src/components/panelComponents
git commit -m "refactor: unify legacy panel form controls"
```

### Task 9: Enforce the architecture and verify the full application

**Files:**
- Modify: `eslint.config.js`
- Modify as needed after evidence: only files already touched by Tasks 1–8

**Interfaces:**
- Consumes: all previous tasks.
- Produces: an error-level lint boundary and a verified application with no raw form controls outside approved primitives.

- [ ] **Step 1: Switch raw-element lint restrictions from warning to error**

Configure file overrides so raw `input`, `select`, and `textarea` JSX is allowed only in its corresponding primitive implementation. Do not exempt application directories or compatibility adapters.

- [ ] **Step 2: Run ESLint and fix every in-scope violation**

Run: `yarn lint`

Expected: exit 0 with no raw-form-element errors. Report any unrelated pre-existing lint failure by file and rule rather than suppressing it.

- [ ] **Step 3: Prove direct third-party control ownership is centralized**

Run: `rg -n 'from ["'"']react-select["'"']|@mui/material|<(input|select|textarea)\b' src -g '*.tsx' -g '*.ts'`

Expected: direct `react-select` imports appear only in `src/components/ui/select.tsx`; raw elements appear only in the approved primitive files; no MUI `TextField` remains as an application input.

- [ ] **Step 4: Run the complete automated verification suite**

Run: `yarn test`

Expected: all Vitest tests PASS with zero failures.

Run: `yarn build`

Expected: TypeScript and Vite production build exit 0.

- [ ] **Step 5: Perform browser verification**

Use the `playwright` skill. Start the app with `yarn dev --host 127.0.0.1`, then verify desktop and narrow viewports for:

- Page Designer Edit Component modal across component setup, Request, Columns, Links, class rules, actions, and filter inputs;
- select menus inside the modal opening above scroll/clipping boundaries;
- keyboard selection and Escape close;
- validation, disabled, read-only, and required states;
- a generated form containing text, number, select, multi-select, checkbox, date/time, color, file, and textarea controls.

Capture screenshots for comparison and record any environment limitation such as unavailable backend data or authentication.

- [ ] **Step 6: Review the final diff against the specification**

Check every acceptance criterion in the spec, inspect `git diff --check`, and confirm unrelated pre-existing changes are not staged. Run `git status --short` and name any intentionally uncommitted migration hunks that overlap user work.

- [ ] **Step 7: Commit enforcement and final fixes**

```bash
git add eslint.config.js
git add -p
git commit -m "chore: enforce shared form controls"
```
