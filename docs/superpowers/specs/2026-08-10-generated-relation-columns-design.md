# Generated Relation Columns Design

## Goal

Allow a table configured in tenantPanel to fetch records from a selected reference schema and generate one Boolean membership column per referenced record. Each generated cell represents whether the referenced record's ID exists in an explicitly selected array field on the table row.

## Configuration

`TableComponentConfig` gains an optional `generatedRelationColumns` array so a table can define one or more independent generated column groups.

```json
{
  "arrayField": "locations",
  "sourceSchemaName": "location",
  "sourceIdField": "_id",
  "sourceLabelField": "name",
  "booleanDisplayToggle": {
    "toggleId": "locationEdit",
    "when": true
  }
}
```

- `arrayField` is the destination array on each table row. tenantPanel labels this **Row array field** and offers compatible array fields from the table row schema.
- `sourceSchemaName` is the schema whose records become generated columns.
- `sourceIdField` supplies the membership value added to or removed from `arrayField`; it defaults to `_id`.
- `sourceLabelField` supplies each generated column heading.
- `booleanDisplayToggle` uses an existing table-local display toggle. Matching state renders editable switches; the opposite state renders readonly check/cross icons. With no binding, generated columns use editable switches.

## Runtime Data Flow

Both paginated and unpaginated runtimes fetch all records from each configured source schema through the existing dynamic-item query layer. One runtime column is generated for every source record with a non-empty ID.

For a table row and source record:

1. Read `row[arrayField]`, treating a missing or non-array value as an empty array.
2. Compare its members with `source[sourceIdField]` using normalized string identity so strings, numbers, and serialized ObjectIDs match consistently.
3. In readonly presentation, render `IoCheckmark` when present or `IoCloseOutline` when absent.
4. In switch presentation, toggling on appends the source ID only if it is not already present. Toggling off removes matching IDs.
5. Send an update containing only `{ [arrayField]: nextArray }` through the existing `updateDynamicItem` mutation.

The original source ID value is preserved when appending; normalization is used only for comparison.

## Tenant Designer

Add a **Generated Relation Columns** section to table settings. Each group supports add, reorder, and delete controls plus dropdowns for:

- Row array field
- Source schema
- Source ID field
- Source label field
- Boolean display toggle
- Show switch when On/Off

Changing the table row schema refreshes the row-field options. Changing the source schema refreshes source ID and label options and clears selections that do not exist in the new source schema.

## Validation and Failure Handling

Backend validation requires:

- non-empty `arrayField`, `sourceSchemaName`, and `sourceLabelField`;
- a non-empty `sourceIdField` when supplied;
- any `booleanDisplayToggle.toggleId` to reference a toggle defined in the same table.

Runtime behavior fails safely:

- unavailable source data generates no columns;
- records missing the configured ID are skipped;
- missing labels fall back to the normalized ID;
- a missing toggle reference fails open to switch presentation;
- mutation errors use the existing dynamic-update error handling.

## Compatibility

The feature is generic and contains no location-specific code. Existing static columns, visibility bindings, Boolean editability bindings, request effects, and generated table behavior remain unchanged. Saved tables without `generatedRelationColumns` behave exactly as before.

## Testing

- Backend BSON/JSON round-trip and validation tests.
- Pure frontend tests for column expansion, normalized membership, add/remove behavior, missing data, and display-toggle evaluation.
- tenantPanel cleaner tests for preserving valid groups and false toggle states.
- Paginated and unpaginated runtime integration through the shared pure helpers.
- Full backend/frontend test suites and both frontend production builds.
