# Table Create Action Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `create` table actions so PageDesigner can configure the table Add button with the same action model used by Edit.

**Architecture:** Keep create configuration inside `table.actions` and teach runtime helpers to split top-level create actions from row actions. `GenericPaginatedPage` will build `addButton` from the first enabled create action and preserve the current default add behavior when no create action exists. PageDesigner will generate and edit create actions through the existing actions UI.

**Tech Stack:** React 18, TypeScript, Vite, Yarn 4, existing `GenericAddEditPanel`, existing `TableActionConfig` helpers.

---

## File Structure

- Modify `src/types/page.ts`: add `create` to `TableActionKind`.
- Modify `src/utils/tableActions.tsx`: add helpers for top-level create action selection and row action filtering.
- Modify `src/components/panelComponents/FormElements/GenericPaginatedPage.tsx`: build the Add button from a configured create action and exclude create actions from row actions.
- Modify `src/components/PageDesigner/PageDesigner.tsx`: add create defaults, expose action kind selection, and preserve create actions during cleanup.

### Task 1: Extend Action Types And Helpers

**Files:**
- Modify: `src/types/page.ts`
- Modify: `src/utils/tableActions.tsx`

- [ ] **Step 1: Add the create action kind type**

Change `src/types/page.ts`:

```ts
export type TableActionKind = "create" | "edit" | "delete" | "update" | "link";
```

- [ ] **Step 2: Add helper functions**

Add to `src/utils/tableActions.tsx` after `getConfiguredTableActions`:

```ts
export const getConfiguredCreateAction = (
  tableConfig: TableComponentConfig | undefined,
  schemaActions?: TableActionConfig[],
): TableActionConfig | undefined =>
  getConfiguredTableActions(tableConfig, schemaActions)?.find(
    (action) => action.kind === "create",
  );

export const getConfiguredRowActions = (
  tableConfig: TableComponentConfig | undefined,
  schemaActions?: TableActionConfig[],
): TableActionConfig[] | undefined => {
  const actions = getConfiguredTableActions(tableConfig, schemaActions)?.filter(
    (action) => action.kind !== "create",
  );
  return actions && actions.length > 0 ? actions : undefined;
};
```

- [ ] **Step 3: Run TypeScript build**

Run: `yarn build`

Expected: the build may still fail until later tasks are complete if call sites have not been updated.

### Task 2: Use Create Action For Add Button

**Files:**
- Modify: `src/components/panelComponents/FormElements/GenericPaginatedPage.tsx`

- [ ] **Step 1: Import helpers**

Update the `src/utils/tableActions` import:

```ts
  getConfiguredCreateAction,
  getConfiguredRowActions,
```

- [ ] **Step 2: Split configured actions**

Replace the current `configuredActionDefinitions` memo with:

```ts
  const configuredCreateAction = useMemo(
    () => getConfiguredCreateAction(tableConfig, container?.frontend?.actions),
    [container?.frontend?.actions, tableConfig],
  );

  const configuredActionDefinitions = useMemo(
    () => getConfiguredRowActions(tableConfig, container?.frontend?.actions),
    [container?.frontend?.actions, tableConfig],
  );
```

- [ ] **Step 3: Build configured create inputs and constants**

Before `addButton`, add:

```ts
  const createActionId = configuredCreateAction
    ? getActionId(configuredCreateAction, 0)
    : "create";
  const createActionInputs = configuredCreateAction
    ? getActionInputs(configuredCreateAction, createActionId, null)
    : inputs;
  const createActionFormKeys = configuredCreateAction
    ? getActionFormKeys(configuredCreateAction, createActionInputs)
    : formKeys;
  const createActionConstants = configuredCreateAction
    ? getActionConstantValues(configuredCreateAction)
    : {};
  const createActionDefaults = configuredCreateAction
    ? getActionDefaultValues(configuredCreateAction)
    : {};
```

- [ ] **Step 4: Update submit handling**

In create submission behavior, merge constants and defaults into non-update payloads:

```ts
        const configuredCreateValues = {
          ...createActionDefaults,
          ...(item as Record<string, unknown>),
          ...createActionConstants,
        };
        const mergedItem = constantFilter
          ? { ...configuredCreateValues, ...constantFilter }
          : configuredCreateValues;
        createDynamicItem(mergedItem as GenericItem);
```

- [ ] **Step 5: Update addButton memo**

Use configured labels, fields, and styling:

```tsx
      name: configuredCreateAction?.label || t("Add"),
      modal: (
        <GenericAddEditPanel
          isOpen={isAddOpen}
          close={() => setIsAddOpen(false)}
          inputs={createActionInputs}
          formKeys={createActionFormKeys}
          submitItem={handleSubmitItem}
          buttonName={
            configuredCreateAction?.buttonName ||
            configuredCreateAction?.label ||
            undefined
          }
          topClassName="flex flex-col gap-2"
          itemToEdit={
            constantFilter ||
            Object.keys(createActionDefaults).length > 0 ||
            Object.keys(createActionConstants).length > 0
              ? {
                  id: "",
                  updates: {
                    ...createActionDefaults,
                    ...createActionConstants,
                    ...(constantFilter || {}),
                    _id: "",
                  } as GenericItem,
                }
              : undefined
          }
        />
      ),
      className:
        configuredCreateAction?.buttonClassName ||
        configuredCreateAction?.className ||
        "bg-blue-500 hover:text-blue-500 hover:border-blue-500",
```

- [ ] **Step 6: Run TypeScript build**

Run: `yarn build`

Expected: PASS after all references are correct.

### Task 3: Add PageDesigner Create Defaults And Editor Kind Selection

**Files:**
- Modify: `src/components/PageDesigner/PageDesigner.tsx`

- [ ] **Step 1: Add action kind options**

Near action constants, add:

```ts
const ACTION_KIND_OPTIONS: { value: TableActionConfig["kind"]; label: string }[] = [
  { value: "create", label: "Create" },
  { value: "edit", label: "Edit" },
  { value: "delete", label: "Delete" },
  { value: "update", label: "Update" },
  { value: "link", label: "Link" },
];
```

- [ ] **Step 2: Add default create action**

Update `buildDefaultSchemaActions` to return create, edit, delete:

```ts
  {
    id: "default-create",
    kind: "create",
    label: "Add",
    buttonName: "Create",
    icon: "FiPlus",
    order: 1,
    enabled: true,
    modalType: "form",
    formFields: buildActionFormFieldsFromFields(fields),
  },
```

Update edit order to `2` and delete order to `3`.

- [ ] **Step 3: Hydrate create fields**

Update `hydrateSchemaEditActionFields` condition:

```ts
    (action.kind === "edit" || action.kind === "create") &&
    action.formFields === undefined
```

- [ ] **Step 4: Update add action default**

In `addTableAction`, create a `create` action when users add an action only if no create action exists; otherwise keep `update`:

```ts
      const hasCreateAction = actions.some((action) => action.kind === "create");
      const kind: TableActionConfig["kind"] = hasCreateAction ? "update" : "create";
```

Set default label/icon/modal based on that kind.

- [ ] **Step 5: Add kind select UI**

In the actions grid, add a `Kind` select using `ACTION_KIND_OPTIONS` and update `kind`, default modal, icon, and label when changed.

- [ ] **Step 6: Run TypeScript build**

Run: `yarn build`

Expected: PASS.

### Task 4: Final Verification

**Files:**
- Verify whole repo.

- [ ] **Step 1: Run build**

Run: `yarn build`

Expected: PASS.

- [ ] **Step 2: Run lint**

Run: `yarn lint`

Expected: PASS or existing unrelated lint findings. If lint fails, record exact first relevant failures and fix changes caused by this feature.

- [ ] **Step 3: Inspect diff**

Run: `git diff -- src/types/page.ts src/utils/tableActions.tsx src/components/panelComponents/FormElements/GenericPaginatedPage.tsx src/components/PageDesigner/PageDesigner.tsx`

Expected: Diff only contains create-action related changes.
