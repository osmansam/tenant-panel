# Relation Matrix Component Design

## Goal

Add a standalone `relationMatrix` page component for editing inverse array membership without changing normal table behavior. The first use case renders `product` records as rows, `countList` records as columns, and toggles membership in each count list's `products` array.

## Configuration

The component stores a dedicated `relationMatrix` configuration:

```ts
interface RelationMatrixConfig {
  rowSchemaName: string;
  rowIdField: string;
  rowLabelField: string;
  columnSchemaName: string;
  columnIdField: string;
  columnLabelField: string;
  targetArrayField: string;
  targetItemMatchField: string;
  columnLimit?: number;
  toggles?: TableToggleConfig[];
  visibilityToggle?: ToggleBinding;
  editToggle?: ToggleBinding;
}
```

For the initial use case:

- `rowSchemaName`: `product`
- `rowIdField`: `_id`
- `rowLabelField`: `name`
- `columnSchemaName`: `countList`
- `columnIdField`: `_id`
- `columnLabelField`: `name`
- `targetArrayField`: `products`
- `targetItemMatchField`: `product`

The component's normal `dataBinding` is not reused as a table binding. Both schemas are explicit in `relationMatrix`, keeping the component independent from table semantics.

## TenantPanel Designer

`Relation Matrix` appears as a separate component type. Its editor provides schema and field selectors for every configuration value, a maximum column count from 1 to 100, and optional visibility/edit toggle selectors. It validates that all required schema and field values are present before Add Component or Save Changes is enabled.

The component preview card identifies the row and column schemas. TenantPanel page preview renders the same matrix behavior as the runtime where its existing preview architecture permits; otherwise it presents an accurate configuration summary rather than treating it as a table.

## Runtime Rendering and Data Flow

The runtime adds a focused `RelationMatrix` component. It fetches row and column records independently using existing dynamic all-items/selection infrastructure and caps columns at the configured limit.

The first fixed column displays `row[rowLabelField]`, falling back to the row ID. Each generated column displays `column[columnLabelField]`, falling back to the column ID.

A cell is checked when the column record's `targetArrayField` contains an object whose `targetItemMatchField` normalizes to the current row ID. ObjectId-like values normalize from strings or objects containing `_id`, `id`, or `$oid`.

## Mutation Behavior

Turning a cell on calls the existing dynamic-array add endpoint against the column record:

```json
{
  "schemaName": "countList",
  "parentId": "<count-list-id>",
  "arrayField": "products",
  "rowIdentityField": "product",
  "item": { "product": "<product-id>" }
}
```

Turning it off calls the existing dynamic-array delete endpoint with `rowIdentityField: "product"` and `rowIdentity: "<product-id>"`.

The UI applies an optimistic per-cell state, disables that cell while its request is pending, rolls back on error, and refreshes the column records after success. Duplicate additions are prevented in the client and remain protected by the backend array identity semantics.

## Toggles

`visibilityToggle` hides or shows the complete generated count-list column group. `editToggle` switches cells between editable switches and read-only check/cross indicators. These bindings use the same table-toggle state conventions already used by generated relation columns, but are owned by the relation matrix configuration.

## Validation and Compatibility

TenantPanel validates the dedicated configuration before persistence. The runtime shows a warning panel for incomplete configuration instead of issuing requests. Existing `table` components and `generatedRelationColumns` retain their current behavior and data contracts.

The backend page model requires only the new optional component configuration field; array mutation routes are reused unchanged.

## Testing

- Pure tests cover ObjectId normalization, membership detection, and add/delete mutation target construction.
- TenantPanel tests cover configuration cleaning and required-field validation.
- Runtime component tests cover row/column labels, checked state, read-only state, optimistic transitions, and rollback.
- Full tenantPanel, react-template, and backend test/build suites verify cross-project compatibility.
