# Container Management UX Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the project-management container workflow searchable, paginated, fully actionable, and comfortable for detailed field management without changing container or field API contracts.

**Architecture:** Keep `ProjectManagementPage`, `useContainers`, `ContainerDetailsModal`, `AddFieldModal`, and the current mutation hooks authoritative. Add pure collection-view utilities for filtering/pagination, a project-owned large dialog shell, a read-only data viewer backed by `GenericPaginatedPage`, and presentation-only state in the existing container components. Fix controlled-value synchronization at the legacy `TextInput` boundary so edit forms reliably display asynchronously selected values.

**Tech Stack:** React 18, TypeScript 5, Tailwind CSS 3, React Query, React Select 5, Vitest 2, Testing Library, jsdom

**Spec:** `docs/superpowers/specs/2026-09-23-container-management-ux-design.md`

## Global Constraints

- Preserve the existing `ContainerModel`, `Field`, `useContainers`, `useUpdateContainer`, normalization, mutation, and payload contracts.
- Keep the current modal-based workflow; do not introduce container-detail routes.
- Container search and pagination are client-side over the existing project container array.
- Default container page size is 10; supported sizes are exactly 10, 20, and 50.
- View Data is read-only and reuses `GenericPaginatedPage` with record actions disabled.
- Do not introduce React Hook Form or another form-state/validation system.
- Do not redesign Page Designer, Pages, Audit Logs, authentication, or unrelated routes.
- Do not add a third-party dependency.
- Reuse semantic tokens and the current shared UI foundation; new component styles must not introduce a competing design-token source.
- Preserve field tag serialization, population settings, child fields, validation, relation values, callbacks, and update payloads.
- Keep the visual-companion `.superpowers/` directory and `output/` screenshots uncommitted.

## Review Focus

- **Forty or more containers:** only the first 10 render initially, statistics still use the full collection, and later pages remain reachable; covered by Task 6 component tests.
- **Filtering while on a later page:** applying/clearing search and changing page size reset or clamp the current page instead of showing a false empty state; covered by Tasks 1 and 6.
- **Changing selected edit fields:** the heading and visible input update from `product` to `quantity` without remounting the whole application; covered by Tasks 2 and 4.
- **Filtered field ordering:** Edit/Delete continue to target source fields while Move Up/Down are disabled, preventing corruption of the underlying order; covered by Tasks 1 and 5.
- **Nested modal lifecycle:** closing Add/Edit Field returns to the still-open container dialog and restores focus without closing the parent; covered by Tasks 3, 4, and 5.

---

## File structure

```text
src/components/ui/
  workspace-dialog.tsx                 # Reusable large dialog geometry/lifecycle
  workspace-dialog.test.tsx
  index.ts

src/utils/
  containerCollectionView.ts           # Pure container filtering/pagination
  containerCollectionView.test.ts
  containerFieldView.ts                # Pure field filtering/reorder availability
  containerFieldView.test.ts

src/components/panelComponents/common/
  ContainersSection.tsx                # Search, pagination, action orchestration
  ContainersSection.test.tsx

src/components/panelComponents/Modals/
  ContainerDetailsModal.tsx            # Large manager and field search
  ContainerDetailsModal.test.tsx
  ContainerDataModal.tsx               # Read-only schema-data surface
  ContainerDataModal.test.tsx
  AddFieldModal.tsx                    # Expanded sectioned field editor
  AddFieldModal.test.tsx

src/components/panelComponents/FormElements/
  TextInput.tsx                         # Controlled-value synchronization
  TextInput.test.tsx

docs/
  tenant-container-ux-review.md         # Manual and visual acceptance record
```

---

### Task 1: Add pure container and field collection view models

**Files:**
- Create: `src/utils/containerCollectionView.ts`
- Create: `src/utils/containerCollectionView.test.ts`
- Create: `src/utils/containerFieldView.ts`
- Create: `src/utils/containerFieldView.test.ts`

**Interfaces:**
- Consumes: `ContainerModel` and `Field` from `src/utils/api/container.ts`.
- Produces: `CONTAINER_PAGE_SIZES`, `DEFAULT_CONTAINER_PAGE_SIZE`, `filterContainers`, `getContainerCollectionPage`, `filterContainerFields`, and `canReorderFilteredFields`.

- [ ] **Step 1: Write failing container collection tests**

Create cases that pin matching, pagination, and correction:

```ts
import { describe, expect, it } from "vitest";
import type { ContainerModel } from "./api/container";
import {
  DEFAULT_CONTAINER_PAGE_SIZE,
  filterContainers,
  getContainerCollectionPage,
} from "./containerCollectionView";

const container = (index: number): ContainerModel => ({
  id: `container-${index}`,
  schemaName: index === 12 ? "InventoryStock" : `schema${index}`,
  collectionName: index === 18 ? "tenant_orders" : `collection_${index}`,
  fields: [], routes: {}, redis: { isRedisCached: false, cacheTime: 10, triggeredRedisCaches: [] },
  pipelines: [], dynamicFunctions: [], dynamicApis: [],
});

describe("container collection view", () => {
  const containers = Array.from({ length: 40 }, (_, index) => container(index + 1));

  it("matches schema, collection, and id without case sensitivity", () => {
    expect(filterContainers(containers, "inventorystock")).toHaveLength(1);
    expect(filterContainers(containers, "TENANT_ORDERS")).toHaveLength(1);
    expect(filterContainers(containers, "CONTAINER-7")[0].id).toBe("container-7");
  });

  it("defaults to ten results and clamps an invalid page", () => {
    expect(DEFAULT_CONTAINER_PAGE_SIZE).toBe(10);
    expect(getContainerCollectionPage(containers, "", 1, 10).items).toHaveLength(10);
    expect(getContainerCollectionPage(containers, "Inventory", 4, 10)).toMatchObject({
      page: 1,
      totalItems: 1,
      totalPages: 1,
    });
  });
});
```

- [ ] **Step 2: Run the container utility test and confirm the red state**

Run: `corepack yarn test src/utils/containerCollectionView.test.ts --run`

Expected: FAIL because `containerCollectionView.ts` does not exist.

- [ ] **Step 3: Implement the container collection view**

Create these exact exports:

```ts
import type { ContainerModel } from "./api/container";

export const CONTAINER_PAGE_SIZES = [10, 20, 50] as const;
export const DEFAULT_CONTAINER_PAGE_SIZE = 10;

const searchableContainerText = (container: ContainerModel) =>
  [container.schemaName, container.collectionName, container.id]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase();

export const filterContainers = (containers: ContainerModel[], query: string) => {
  const normalized = query.trim().toLocaleLowerCase();
  return normalized
    ? containers.filter((container) => searchableContainerText(container).includes(normalized))
    : containers;
};

export const getContainerCollectionPage = (
  containers: ContainerModel[], query: string, requestedPage: number, pageSize: number,
) => {
  const filtered = filterContainers(containers, query);
  const safePageSize = CONTAINER_PAGE_SIZES.includes(pageSize as 10 | 20 | 50)
    ? pageSize
    : DEFAULT_CONTAINER_PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(filtered.length / safePageSize));
  const page = Math.min(Math.max(1, requestedPage), totalPages);
  const startIndex = (page - 1) * safePageSize;
  return {
    items: filtered.slice(startIndex, startIndex + safePageSize),
    page,
    pageSize: safePageSize,
    totalItems: filtered.length,
    totalPages,
    startNumber: filtered.length ? startIndex + 1 : 0,
    endNumber: Math.min(startIndex + safePageSize, filtered.length),
  };
};
```

- [ ] **Step 4: Write failing field filter tests**

```ts
import { describe, expect, it } from "vitest";
import { canReorderFilteredFields, filterContainerFields } from "./containerFieldView";

const fields = [
  { name: "product", type: "objectId", objectSchemaName: "catalog", tag: "required" },
  { name: "quantity", type: "int", tag: "required,min=1" },
];

it("matches field metadata and disables reorder for an active query", () => {
  expect(filterContainerFields(fields, "CATALOG").map((field) => field.name)).toEqual(["product"]);
  expect(filterContainerFields(fields, "min=1").map((field) => field.name)).toEqual(["quantity"]);
  expect(canReorderFilteredFields(" quantity ")).toBe(false);
  expect(canReorderFilteredFields("  ")).toBe(true);
});
```

- [ ] **Step 5: Run the field utility test and confirm the red state**

Run: `corepack yarn test src/utils/containerFieldView.test.ts --run`

Expected: FAIL because `containerFieldView.ts` does not exist.

- [ ] **Step 6: Implement the field collection view**

```ts
import type { Field } from "./api/container";

export const filterContainerFields = (fields: Field[], query: string) => {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return fields;
  return fields.filter((field) =>
    [field.name, field.type, field.tag, field.objectSchemaName]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase()
      .includes(normalized),
  );
};

export const canReorderFilteredFields = (query: string) => !query.trim();
```

- [ ] **Step 7: Run both utility suites**

Run: `corepack yarn test src/utils/containerCollectionView.test.ts src/utils/containerFieldView.test.ts --run`

Expected: PASS.

- [ ] **Step 8: Commit the collection view models**

```bash
git add src/utils/containerCollectionView.ts src/utils/containerCollectionView.test.ts src/utils/containerFieldView.ts src/utils/containerFieldView.test.ts
git commit -m "feat: add container collection view models"
```

---

### Task 2: Fix controlled legacy input synchronization

**Files:**
- Modify: `src/components/panelComponents/FormElements/TextInput.tsx`
- Create: `src/components/panelComponents/FormElements/TextInput.test.tsx`

**Interfaces:**
- Consumes: existing `TextInputProps.value` and `TextInputProps.isDebounce` behavior.
- Produces: the guarantee that the rendered input reflects a changed `value` prop while preserving user edits, debounce timing, number bounds, password reveal, and checkbox behavior.

- [ ] **Step 1: Write the failing synchronization test**

```tsx
// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TextInput from "./TextInput";

it("updates the visible value when its controlled value prop changes", () => {
  const onChange = vi.fn();
  const { rerender } = render(
    <TextInput label="Field Name" type="text" value="" onChange={onChange} />,
  );
  rerender(<TextInput label="Field Name" type="text" value="product" onChange={onChange} />);
  expect(screen.getByRole("textbox", { name: /field name/i })).toHaveValue("product");
});
```

- [ ] **Step 2: Run the focused test and confirm the regression**

Run: `corepack yarn test src/components/panelComponents/FormElements/TextInput.test.tsx --run`

Expected: FAIL because the input retains the original empty `localValue`.

- [ ] **Step 3: Synchronize local state and make the label association accessible**

Add `useEffect`, generate a stable input ID with `useId`, synchronize on `value`, and connect the existing label to the input. Do not call `onChange` from the synchronization effect.

```tsx
const inputId = useId();
useEffect(() => setLocalValue(value), [value]);

<H6 as="label" htmlFor={inputId}>...</H6>
<input id={inputId} ... />
```

If `H6` cannot render a label element, wrap its contents in a native `<label htmlFor={inputId}>` without changing visual classes.

- [ ] **Step 4: Add debounce and numeric regression cases**

Test that a prop update does not invoke `onChange`, and that a user-entered number still invokes `onChange` with the normalized numeric value.

- [ ] **Step 5: Run focused and shared form tests**

Run: `corepack yarn test src/components/panelComponents/FormElements/TextInput.test.tsx src/components/form-fields/form-fields.test.tsx --run`

Expected: PASS.

- [ ] **Step 6: Commit the input fix**

```bash
git add src/components/panelComponents/FormElements/TextInput.tsx src/components/panelComponents/FormElements/TextInput.test.tsx
git commit -m "fix: synchronize controlled legacy text inputs"
```

---

### Task 3: Add the reusable workspace dialog shell

**Files:**
- Create: `src/components/ui/workspace-dialog.tsx`
- Create: `src/components/ui/workspace-dialog.test.tsx`
- Modify: `src/components/ui/index.ts`

**Interfaces:**
- Produces:

```ts
export interface WorkspaceDialogProps {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "large" | "workspace";
  closeLabel?: string;
  layer?: "base" | "nested";
  bodyClassName?: string;
}
```

- Guarantees: accessible dialog name, Escape close, backdrop close, close button, focus restoration, fixed header/footer, scrollable body, `min(96vw, 1600px) × 92vh` workspace geometry, and full-screen mobile geometry.

- [ ] **Step 1: Write failing dialog lifecycle tests**

Test the following in `workspace-dialog.test.tsx`:

```tsx
it("names the dialog and closes by button, backdrop, and Escape", async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();
  render(<WorkspaceDialog open onClose={onClose} title="Manage stock">Body</WorkspaceDialog>);
  expect(screen.getByRole("dialog", { name: "Manage stock" })).toBeInTheDocument();
  await user.keyboard("{Escape}");
  expect(onClose).toHaveBeenCalledTimes(1);
});
```

Also test that rendering with `open={false}` returns no dialog and closing restores focus to the button that was active before opening.

- [ ] **Step 2: Run the dialog test and confirm the red state**

Run: `corepack yarn test src/components/ui/workspace-dialog.test.tsx --run`

Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement the project-owned shell**

Use a native accessible dialog container without adding dependencies. Capture `document.activeElement` when `open` becomes true, attach a document keydown listener for Escape, and restore focus during cleanup. Stop propagation from the surface so only actual backdrop clicks close it.

Use token-backed Tailwind classes or existing CSS variables for the overlay, border, radius, surface, and shadow. Apply:

```tsx
size === "workspace"
  ? "h-dvh w-screen rounded-none sm:h-[92vh] sm:w-[96vw] sm:max-w-[1600px] sm:rounded-[var(--ui-radius-lg)]"
  : "max-h-[90vh] w-[calc(100vw-2rem)] max-w-[1120px]"
```

Structure the surface as `grid grid-rows-[auto_minmax(0,1fr)_auto]`; put `overflow-y-auto` only on the body.

- [ ] **Step 4: Export the shell and run primitive tests**

Run: `corepack yarn test src/components/ui/workspace-dialog.test.tsx src/components/ui/ui-primitives.test.tsx --run`

Expected: PASS.

- [ ] **Step 5: Commit the dialog primitive**

```bash
git add src/components/ui/workspace-dialog.tsx src/components/ui/workspace-dialog.test.tsx src/components/ui/index.ts
git commit -m "feat: add workspace dialog shell"
```

---

### Task 4: Expand and organize the add/edit field editor

**Files:**
- Modify: `src/components/panelComponents/Modals/AddFieldModal.tsx`
- Create: `src/components/panelComponents/Modals/AddFieldModal.test.tsx`

**Interfaces:**
- Consumes: `WorkspaceDialog`, the fixed controlled `TextInput`, and existing `Field` state/serialization.
- Extends `AddFieldModalProps` with `containerName?: string`.
- Preserves: `onAddField(field): boolean | Promise<boolean>` and every existing `Field` property.

- [ ] **Step 1: Write failing edit-context tests**

Mock `useGetContainers` with stable relation options and render an existing field:

```tsx
render(
  <AddFieldModal
    isOpen
    onClose={vi.fn()}
    onAddField={vi.fn().mockResolvedValue(true)}
    containerName="stock"
    editField={{ name: "product", type: "objectId", objectSchemaName: "product", isSearchable: true }}
  />,
);
expect(screen.getByRole("dialog", { name: "Edit field: product" })).toBeInTheDocument();
expect(screen.getByRole("textbox", { name: /field name/i })).toHaveValue("product");
expect(screen.getByText(/stock/i)).toBeInTheDocument();
```

Rerender with `editField={{ name: "quantity", type: "int" }}` and assert both heading and input update to `quantity`.

- [ ] **Step 2: Run the AddFieldModal test and confirm the red state**

Run: `corepack yarn test src/components/panelComponents/Modals/AddFieldModal.test.tsx --run`

Expected: FAIL because the existing modal has a generic heading and small geometry.

- [ ] **Step 3: Replace the outer modal geometry with `WorkspaceDialog`**

Render with `size="large"`, `layer="nested"`, a dynamic title, contextual description, scrollable body, and sticky footer supplied through the shell.

```tsx
const dialogTitle = editField
  ? t("Edit field: {{fieldName}}", { fieldName: editField.name })
  : t("Add field to {{containerName}}", { containerName: containerName || t("container") });
```

Remove `sm:max-w-2xl` and `max-h-96`. The surface max width must be 1120px and max height 90vh.

- [ ] **Step 4: Group the existing controls without changing state logic**

Keep all current handlers and conditional checks, but move their JSX into five labelled `<section>` elements:

```tsx
<section aria-labelledby="field-basic-heading">...</section>
<section aria-labelledby="field-validation-heading">...</section>
<section aria-labelledby="field-relationship-heading">...</section>
<section aria-labelledby="field-nested-heading">...</section>
<section aria-labelledby="field-advanced-heading">...</section>
```

Basic information is always visible. Render relationship settings only for reference-capable types, nested settings only for object/array, and retain all existing validation/type conditions.

- [ ] **Step 5: Add callback compatibility tests**

Edit `quantity`, submit, and assert `onAddField` receives the existing normalized `Field` object including `name`, `type`, `tag`, flags, enum values, children, equation, object schema, and population settings. The test must not expect wrapper metadata or a changed payload shape.

- [ ] **Step 6: Run field editor, input, and population tests**

Run: `corepack yarn test src/components/panelComponents/Modals/AddFieldModal.test.tsx src/components/panelComponents/FormElements/TextInput.test.tsx src/utils/populationSettingsValidation.test.ts --run`

Expected: PASS.

- [ ] **Step 7: Commit the detailed field editor**

```bash
git add src/components/panelComponents/Modals/AddFieldModal.tsx src/components/panelComponents/Modals/AddFieldModal.test.tsx
git commit -m "feat: expand container field editor"
```

---

### Task 5: Expand container management and add field search

**Files:**
- Modify: `src/components/panelComponents/Modals/ContainerDetailsModal.tsx`
- Create: `src/components/panelComponents/Modals/ContainerDetailsModal.test.tsx`

**Interfaces:**
- Consumes: `WorkspaceDialog`, `filterContainerFields`, `canReorderFilteredFields`, and the expanded `AddFieldModal`.
- Produces `type ContainerDialogSection = "structured" | "pipelines" | "workflows" | "apis" | "permissions" | "routes" | "json"`.
- Extends props with `intent?: "details" | "manage"`, `initialSection?: ContainerDialogSection`, and `focusArea?: "summary" | "fields"`.
- Preserves: existing field, pipeline, workflow, API, permissions, route, JSON, auth-user, timestamp, and mutation logic.

- [ ] **Step 1: Write failing geometry and initial-destination tests**

Render a container with two fields and assert:

```tsx
expect(screen.getByRole("dialog", { name: "Manage stock" })).toBeInTheDocument();
expect(screen.getByRole("heading", { name: "Fields" })).toBeInTheDocument();
expect(screen.getByRole("searchbox", { name: "Search fields" })).toBeInTheDocument();
```

Rerender from a details opening to `{ intent: "manage", focusArea: "fields" }` and verify the Fields section receives focus or is scrolled into view through a mocked `scrollIntoView`.

- [ ] **Step 2: Run the focused modal test and confirm the red state**

Run: `corepack yarn test src/components/panelComponents/Modals/ContainerDetailsModal.test.tsx --run`

Expected: FAIL because the props and field search do not exist.

- [ ] **Step 3: Migrate the outer shell and reset opening state**

Replace the fixed/max-width wrapper with `WorkspaceDialog size="workspace"`. When `isOpen`, `container.id`, `initialSection`, `intent`, or `focusArea` changes, reset the active view and field query deterministically. Details uses the existing container title; manage uses `Manage ${container.schemaName}`.

- [ ] **Step 4: Add field search presentation**

Add `fieldQuery` state and derive:

```ts
const visibleFields = useMemo(
  () => filterContainerFields(container.fields || [], fieldQuery),
  [container.fields, fieldQuery],
);
const reorderEnabled = canReorderFilteredFields(fieldQuery);
```

Render an accessible search input, clear control, and result count. Map `visibleFields`, but locate each visible field's source index by identity/name before invoking existing move handlers. Disable move controls whenever `reorderEnabled` is false and set the title to “Clear field search to reorder fields.”

- [ ] **Step 5: Add filtering and mutation-safety tests**

Verify search by field name/type/tag/object schema, clear behavior, no-results copy, Add Field remaining visible, Edit receiving the original `Field`, Delete receiving the original name, and move controls disabled during filtering.

- [ ] **Step 6: Pass container context to the field editor**

Set `containerName={container.schemaName}` on `AddFieldModal`. Test that closing the nested field editor leaves the parent dialog rendered and clears only `editingField`/nested open state.

- [ ] **Step 7: Run container modal and container-update tests**

Run: `corepack yarn test src/components/panelComponents/Modals/ContainerDetailsModal.test.tsx src/components/panelComponents/Modals/AddFieldModal.test.tsx src/utils/containerTimestamps.test.ts --run`

Expected: PASS.

- [ ] **Step 8: Commit expanded container management**

```bash
git add src/components/panelComponents/Modals/ContainerDetailsModal.tsx src/components/panelComponents/Modals/ContainerDetailsModal.test.tsx
git commit -m "feat: expand searchable container management"
```

---

### Task 6: Implement read-only View Data and container-list orchestration

**Files:**
- Create: `src/components/panelComponents/Modals/ContainerDataModal.tsx`
- Create: `src/components/panelComponents/Modals/ContainerDataModal.test.tsx`
- Modify: `src/components/panelComponents/common/ContainersSection.tsx`
- Create: `src/components/panelComponents/common/ContainersSection.test.tsx`

**Interfaces:**
- `ContainerDataModalProps`: `{ isOpen: boolean; onClose: () => void; container: ContainerModel | null }`.
- Consumes: `WorkspaceDialog`, `GenericPaginatedPage`, `getContainerCollectionPage`, and the extended `ContainerDetailsModal`.
- Produces: working Details, Edit, and View Data actions.

- [ ] **Step 1: Write the failing data-viewer contract test**

Mock `GenericPaginatedPage`, open the viewer for `stock`, and assert its props:

```tsx
expect(mockGenericPaginatedPage).toHaveBeenCalledWith(
  expect.objectContaining({ schemaName: "stock", actionsEnabled: false, isHeader: false }),
  expect.anything(),
);
expect(screen.getByRole("dialog", { name: "stock data" })).toBeInTheDocument();
```

- [ ] **Step 2: Run the data-viewer test and confirm the red state**

Run: `corepack yarn test src/components/panelComponents/Modals/ContainerDataModal.test.tsx --run`

Expected: FAIL because `ContainerDataModal` does not exist.

- [ ] **Step 3: Implement the read-only data viewer**

Render `WorkspaceDialog size="workspace"` and, only when `container` exists, render:

```tsx
<GenericPaginatedPage
  schemaName={container.schemaName}
  actionsEnabled={false}
  isHeader={false}
  customTitle={t("{{schemaName}} data", { schemaName: container.schemaName })}
/>
```

Do not add record mutation actions or a new API hook.

- [ ] **Step 4: Write failing container-list interaction tests**

Mock `useContainers` with 40 containers and assert:

- only 10 container rows render initially;
- the summary says “Showing 1–10 of 40 containers”;
- Next renders containers 11–20;
- page size 20 renders 20;
- submitting schema/collection/ID search resets to page 1;
- clearing search restores the full list;
- no-results differs from no-containers;
- total statistics still show 40;
- Details opens `ContainerDetailsModal` with `intent="details"` and `focusArea="summary"`;
- Edit opens it with `intent="manage"` and `focusArea="fields"`; and
- View Data opens `ContainerDataModal` for the correct container.

- [ ] **Step 5: Run the list test and confirm the red state**

Run: `corepack yarn test src/components/panelComponents/common/ContainersSection.test.tsx --run`

Expected: FAIL because the list has no search/pagination and two actions have no implementation.

- [ ] **Step 6: Implement search and pagination state**

Add:

```ts
const [draftQuery, setDraftQuery] = useState("");
const [appliedQuery, setAppliedQuery] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(DEFAULT_CONTAINER_PAGE_SIZE);
const collectionPage = getContainerCollectionPage(containers, appliedQuery, currentPage, pageSize);
```

Submit applies `draftQuery.trim()` and resets page 1. Clear resets both queries and page 1. A page-size change validates against `CONTAINER_PAGE_SIZES`, updates size, and resets page 1. An effect synchronizes `currentPage` to `collectionPage.page` after data shrinkage.

- [ ] **Step 7: Render the search, paged list, and pagination controls**

Use a semantic `<form role="search">`, accessible input, explicit Search button, clear action, result summary, page-size select, Previous/Next, and numbered buttons. Mark the active page with `aria-current="page"` and disable boundaries.

Use `collectionPage.items.map` instead of `containers.map`. Preserve the existing full-list statistics.

- [ ] **Step 8: Replace inert action handlers**

Track selected container plus dialog intent/focus and data-view state. Remove both `console.log` handlers. Details, Edit, and View Data must each set explicit state and open the intended dialog. Closing either dialog clears only its related state.

- [ ] **Step 9: Run container-list and data-view tests**

Run: `corepack yarn test src/components/panelComponents/common/ContainersSection.test.tsx src/components/panelComponents/Modals/ContainerDataModal.test.tsx --run`

Expected: PASS.

- [ ] **Step 10: Commit the complete container list flow**

```bash
git add src/components/panelComponents/common/ContainersSection.tsx src/components/panelComponents/common/ContainersSection.test.tsx src/components/panelComponents/Modals/ContainerDataModal.tsx src/components/panelComponents/Modals/ContainerDataModal.test.tsx
git commit -m "feat: add searchable paginated container workflow"
```

---

### Task 7: Integrated verification and visual acceptance

**Files:**
- Create: `docs/tenant-container-ux-review.md`
- Modify only if verification finds a scoped defect: files from Tasks 1–6 and their tests

**Interfaces:**
- Consumes the completed container workflow.
- Produces evidence that the approved desktop/mobile and compatibility criteria hold.

- [ ] **Step 1: Run the focused workflow suite**

Run:

```bash
corepack yarn test \
  src/utils/containerCollectionView.test.ts \
  src/utils/containerFieldView.test.ts \
  src/components/ui/workspace-dialog.test.tsx \
  src/components/panelComponents/FormElements/TextInput.test.tsx \
  src/components/panelComponents/Modals/AddFieldModal.test.tsx \
  src/components/panelComponents/Modals/ContainerDetailsModal.test.tsx \
  src/components/panelComponents/Modals/ContainerDataModal.test.tsx \
  src/components/panelComponents/common/ContainersSection.test.tsx \
  --run
```

Expected: PASS.

- [ ] **Step 2: Run full static and regression verification**

Run:

```bash
corepack yarn test --reporter=dot
corepack yarn build
corepack yarn lint
git diff --check
```

Expected: tests and build pass; lint exits 0 with no new warning classes; diff check emits no output. Record pre-existing warnings separately.

- [ ] **Step 3: Start the application and use the existing project-management route**

Run: `corepack yarn dev`

Use the Playwright skill and the real `/project-management` surface. If backend data is unavailable locally, intercept only the existing container/data requests with a 40-container fixture; do not commit fixture routes or demo data.

- [ ] **Step 4: Verify desktop behavior at 1440×900 and 1024×768**

Confirm and capture screenshots for:

- 10-container initial page and result summary;
- schema/collection/ID search, no-results, clear, page-size, and later pages;
- Details opening the large summary surface;
- Edit opening the large dialog at Fields;
- field search and disabled reorder while filtered;
- field editor showing the existing field name in heading and input;
- View Data rendering a read-only paginated table; and
- fixed dialog header/footer with independently scrolling content.

- [ ] **Step 5: Verify narrow behavior at 390×844 and 320×568**

Confirm no horizontal page scroll, full-viewport dialogs, stacked field-editor sections, reachable actions, compact pagination, nested-dialog layering, visible focus, Escape close, and focus restoration.

- [ ] **Step 6: Document the acceptance result**

Create `docs/tenant-container-ux-review.md` containing:

- commit/branch reviewed;
- commands and exact results;
- viewport checklist;
- action/search/pagination/field-edit outcomes;
- screenshot paths under `output/playwright/`; and
- pre-existing warnings or explicitly deferred items.

- [ ] **Step 7: Commit verification evidence**

```bash
git add docs/tenant-container-ux-review.md
git commit -m "docs: record container UX verification"
```

- [ ] **Step 8: Verify repository state**

Run:

```bash
git status --short --branch
git log --oneline -10
```

Expected: only intentionally uncommitted `.superpowers/` and `output/` artifacts remain; all product and documentation changes are committed on `feat-tenant-auth-register`.
