# Relation Matrix Component Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a standalone relation-matrix page component whose product rows and count-list columns edit `countList.products[].product` membership.

**Architecture:** Persist a dedicated `relationMatrix` configuration on page components. TenantPanel owns configuration and preview; react-template owns runtime data loading, matrix rendering, optimistic cell state, and dynamic-array mutations. Existing table and generated-relation behavior stays unchanged.

**Tech Stack:** Go/Fiber/MongoDB models, React 18, TypeScript, TanStack Query, Tailwind CSS, Vitest

## Global Constraints

- Component type is exactly `relationMatrix`.
- Adding membership sends only `{ product: rowId }` for the example configuration.
- Removing membership matches `products[].product` against the row ID.
- Existing `/dynamic/:schema/:parentId/array/:field` mutation routes are reused unchanged.
- ObjectId-like values normalize from strings or objects containing `_id`, `id`, or `$oid`.
- Normal `table` components and `generatedRelationColumns` are not modified.

---

### Task 1: Persist and validate relation-matrix configuration in autotable-Go

**Files:**
- Modify: `/Users/osmansamilerdogan/Desktop/autotable-Go/models/pageModel.go`
- Modify: `/Users/osmansamilerdogan/Desktop/autotable-Go/models/frontendValidation.go`
- Test: `/Users/osmansamilerdogan/Desktop/autotable-Go/models/models_test.go`

**Interfaces:**
- Produces: `RelationMatrixConfig` and `ComponentBlock.RelationMatrix *RelationMatrixConfig`.
- Validation requires all schema/field properties and enforces `1 <= columnLimit <= 100` when supplied.

- [ ] **Step 1: Write failing model round-trip and validation tests**

Create a component fixture:

```go
ComponentBlock{
    ID:   "product-countlists",
    Type: ComponentType("relationMatrix"),
    RelationMatrix: &RelationMatrixConfig{
        RowSchemaName:       "product",
        RowIDField:          "_id",
        RowLabelField:       "name",
        ColumnSchemaName:    "countList",
        ColumnIDField:       "_id",
        ColumnLabelField:    "name",
        TargetArrayField:    "products",
        TargetItemMatchField:"product",
        ColumnLimit:         100,
    },
}
```

Assert BSON/JSON round-trip preservation, valid page acceptance, missing `targetItemMatchField` rejection, and `columnLimit: 101` rejection.

- [ ] **Step 2: Run the focused failing tests**

Run: `go test ./models -run 'RelationMatrix|ValidatePageTableConfig'`

Expected: FAIL because `RelationMatrixConfig` and validation do not exist.

- [ ] **Step 3: Add the Go model and validation**

Add exact JSON/BSON names:

```go
type RelationMatrixConfig struct {
    RowSchemaName        string         `bson:"rowSchemaName" json:"rowSchemaName"`
    RowIDField           string         `bson:"rowIdField" json:"rowIdField"`
    RowLabelField        string         `bson:"rowLabelField" json:"rowLabelField"`
    ColumnSchemaName     string         `bson:"columnSchemaName" json:"columnSchemaName"`
    ColumnIDField        string         `bson:"columnIdField" json:"columnIdField"`
    ColumnLabelField     string         `bson:"columnLabelField" json:"columnLabelField"`
    TargetArrayField     string         `bson:"targetArrayField" json:"targetArrayField"`
    TargetItemMatchField string         `bson:"targetItemMatchField" json:"targetItemMatchField"`
    ColumnLimit          int            `bson:"columnLimit,omitempty" json:"columnLimit,omitempty"`
    Toggles              []TableToggleConfig `bson:"toggles,omitempty" json:"toggles,omitempty"`
    VisibilityToggle     *ToggleBinding `bson:"visibilityToggle,omitempty" json:"visibilityToggle,omitempty"`
    EditToggle           *ToggleBinding `bson:"editToggle,omitempty" json:"editToggle,omitempty"`
}
```

Traverse relation-matrix components through the same nested page/tab/grid paths already handled by `ValidatePageTableConfig`.

- [ ] **Step 4: Verify backend behavior**

Run: `gofmt -w models/pageModel.go models/frontendValidation.go models/models_test.go`

Run: `go test ./models` and `go test ./...`

- [ ] **Step 5: Commit backend support**

```bash
git add models/pageModel.go models/frontendValidation.go models/models_test.go
git commit -m "feat: persist relation matrix page components"
```

---

### Task 2: Add shared tenantPanel relation-matrix configuration helpers

**Files:**
- Modify: `/Users/osmansamilerdogan/Desktop/tenantPanel/src/types/page.ts`
- Create: `/Users/osmansamilerdogan/Desktop/tenantPanel/src/utils/relationMatrixConfig.ts`
- Test: `/Users/osmansamilerdogan/Desktop/tenantPanel/src/utils/relationMatrixConfig.test.ts`

**Interfaces:**
- Produces: `RelationMatrixConfig`, `cleanRelationMatrixConfig(config)`, and `isRelationMatrixConfigComplete(config)`.
- Extends `ComponentType` with `"relationMatrix"` and `ComponentBlock` with `relationMatrix?: RelationMatrixConfig`.

- [ ] **Step 1: Write failing cleaner and completeness tests**

Use the approved product/count-list fixture and assert trimming, default `_id` fields, default limit `100`, and rejection of a blank target match field:

```ts
expect(cleanRelationMatrixConfig(input)).toEqual({
  rowSchemaName: "product",
  rowIdField: "_id",
  rowLabelField: "name",
  columnSchemaName: "countList",
  columnIdField: "_id",
  columnLabelField: "name",
  targetArrayField: "products",
  targetItemMatchField: "product",
  columnLimit: 100,
});
```

- [ ] **Step 2: Run the focused failing test**

Run: `yarn test src/utils/relationMatrixConfig.test.ts`

Expected: FAIL because the module and type do not exist.

- [ ] **Step 3: Implement types and pure helpers**

Return `undefined` from `cleanRelationMatrixConfig` unless every required property is non-empty. Clamp a supplied limit to `1..100`; preserve valid toggle bindings.

- [ ] **Step 4: Run focused tests**

Run: `yarn test src/utils/relationMatrixConfig.test.ts`

- [ ] **Step 5: Commit tenantPanel types/helpers**

```bash
git add src/types/page.ts src/utils/relationMatrixConfig.ts src/utils/relationMatrixConfig.test.ts
git commit -m "feat: define relation matrix configuration"
```

---

### Task 3: Build the tenantPanel Relation Matrix designer

**Files:**
- Modify: `/Users/osmansamilerdogan/Desktop/tenantPanel/src/components/PageDesigner/PageDesigner.tsx`
- Modify: `/Users/osmansamilerdogan/Desktop/tenantPanel/src/pages/PagePreviewPage.tsx`
- Test: `/Users/osmansamilerdogan/Desktop/tenantPanel/src/utils/relationMatrixConfig.test.ts`

**Interfaces:**
- Consumes: `RelationMatrixConfig`, `cleanRelationMatrixConfig`, `isRelationMatrixConfigComplete`.
- Produces persisted `ComponentBlock { type: "relationMatrix", relationMatrix: config }`.

- [ ] **Step 1: Add failing configuration-construction coverage**

Add a helper test proving the exact designer draft becomes the approved cleaned configuration and that Add Component remains invalid until `targetArrayField` and `targetItemMatchField` are selected.

- [ ] **Step 2: Run the focused test and observe failure**

Run: `yarn test src/utils/relationMatrixConfig.test.ts`

- [ ] **Step 3: Add the standalone component option and editor**

Add `<option value="relationMatrix">Relation Matrix</option>`. Show dedicated selectors for row schema/ID/label, column schema/ID/label, target array field, target item match field, limit, visibility toggle, and edit toggle. Field choices must derive from the selected schemas; target array choices must be embedded arrays on the column schema, and match choices must be children of the chosen target array.

Initialize the product/count-list workflow through user selection rather than hard-coded schema names. Disable Add/Save with:

```ts
componentType === "relationMatrix" &&
!isRelationMatrixConfigComplete(relationMatrixConfig)
```

Clean the configuration before `onAdd`, hydrate it when editing, and show `product × countList`-style schema information on the designer card.

- [ ] **Step 4: Add preview handling**

Add a relation-matrix preview branch that renders a clear configuration summary until the shared runtime matrix UI is copied or extracted into tenantPanel. It must not fall through to table rendering or an unknown-component warning.

- [ ] **Step 5: Verify tenantPanel**

Run: `yarn test` and `yarn build`

- [ ] **Step 6: Commit the designer**

```bash
git add src/components/PageDesigner/PageDesigner.tsx src/pages/PagePreviewPage.tsx src/utils/relationMatrixConfig.test.ts
git commit -m "feat: design relation matrix components"
```

---

### Task 4: Implement pure relation-matrix membership logic in react-template

**Files:**
- Modify: `/Users/osmansamilerdogan/Desktop/react-template/src/types/page.ts`
- Create: `/Users/osmansamilerdogan/Desktop/react-template/src/utils/relationMatrix.ts`
- Test: `/Users/osmansamilerdogan/Desktop/react-template/src/utils/relationMatrix.test.ts`

**Interfaces:**
- Produces: `normalizeRelationMatrixId`, `isRelationMatrixMember`, `buildRelationMatrixAddTarget`, and `buildRelationMatrixDeleteTarget`.
- Mutation builders return arguments accepted by `addDynamicArrayRow` and `deleteDynamicArrayRow`.

- [ ] **Step 1: Write failing membership and mutation tests**

Cover string IDs, populated `{ _id, name }`, Mongo `{ $oid }`, membership in `products: [{ product: id }]`, and exact targets:

```ts
expect(buildRelationMatrixAddTarget(config, product, countList)).toEqual({
  schemaName: "countList",
  parentId: "list-1",
  arrayField: "products",
  rowIdentityField: "product",
  item: { product: "product-1" },
});
```

The delete target must use `rowIdentity: "product-1"`.

- [ ] **Step 2: Run the focused failing test**

Run: `yarn test src/utils/relationMatrix.test.ts`

- [ ] **Step 3: Implement the pure logic and runtime types**

Extend runtime `ComponentType`/`ComponentBlock` with the same config contract. Do not import table generated-relation helpers; the new module owns inverse membership semantics.

- [ ] **Step 4: Run focused tests**

Run: `yarn test src/utils/relationMatrix.test.ts`

- [ ] **Step 5: Commit runtime primitives**

```bash
git add src/types/page.ts src/utils/relationMatrix.ts src/utils/relationMatrix.test.ts
git commit -m "feat: add relation matrix membership logic"
```

---

### Task 5: Render and mutate the Relation Matrix in react-template

**Files:**
- Create: `/Users/osmansamilerdogan/Desktop/react-template/src/components/RelationMatrix.tsx`
- Create: `/Users/osmansamilerdogan/Desktop/react-template/src/components/RelationMatrix.test.tsx`
- Modify: `/Users/osmansamilerdogan/Desktop/react-template/src/components/DynamicPageSections.tsx`
- Modify: `/Users/osmansamilerdogan/Desktop/react-template/src/utils/dynamic.ts`

**Interfaces:**
- Consumes: `RelationMatrixConfig`, pure mutation builders, `addDynamicArrayRow`, and `deleteDynamicArrayRow`.
- Produces: `<RelationMatrix config={...} resolvedParams={...} />`.

- [ ] **Step 1: Write failing component behavior tests**

Render two product rows and two count-list columns. Assert row/column labels, checked membership, fallback labels, visibility toggle hiding the generated group, edit toggle switching between switches and read-only icons, per-cell pending disablement, optimistic check/uncheck, and rollback on a rejected mutation.

- [ ] **Step 2: Run the focused failing component test**

Run: `yarn test src/components/RelationMatrix.test.tsx`

- [ ] **Step 3: Add row/column fetching**

Expose or add a focused all-items query hook returning records for a schema with resolved params and source revision. Fetch row and column schemas independently. Column requests must honor `columnLimit`; row requests may use the existing all-items boundary.

- [ ] **Step 4: Implement the matrix UI and mutations**

Use a horizontally scrollable table with a sticky first column. Keep optimistic membership in a map keyed by `columnId::rowId`, disable only the pending cell, call add/delete targets from Task 4, invalidate/refetch the column schema after success, and restore the server-derived state plus show an error toast on failure.

- [ ] **Step 5: Register the runtime component**

Add `case "relationMatrix"` to `RenderReadyComponent`. Render a warning notice when configuration is absent/incomplete. Add `relationMatrix` to request-aware component types so route/resolved parameter changes refresh its sources.

- [ ] **Step 6: Verify runtime**

Run: `yarn test src/components/RelationMatrix.test.tsx src/utils/relationMatrix.test.ts`, then `yarn test`, then `yarn build`.

- [ ] **Step 7: Commit runtime rendering**

```bash
git add src/components/RelationMatrix.tsx src/components/RelationMatrix.test.tsx src/components/DynamicPageSections.tsx src/utils/dynamic.ts
git commit -m "feat: render inverse relation matrices"
```

---

### Task 6: Cross-project verification

**Files:**
- Verify only; modify files only if a test exposes a defect within the approved design.

**Interfaces:**
- Confirms the persisted tenantPanel payload matches the Go and react-template contracts exactly.

- [ ] **Step 1: Verify autotable-Go**

Run: `go test ./...` and `go test -race ./...`

- [ ] **Step 2: Verify tenantPanel**

Run: `yarn test` and `yarn build`

- [ ] **Step 3: Verify react-template**

Run: `yarn test` and `yarn build`

- [ ] **Step 4: Inspect repository state**

Run `git status --short` in all three repositories. Preserve unrelated user changes, especially generated runtime `dist/index.html` if it predates this work.

- [ ] **Step 5: Report commits and manual verification path**

Document how to create the component with `product`, `name`, `countList`, `name`, `products`, and `product`, then verify toggling adds/removes membership.
