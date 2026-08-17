# Single-Component Tabs Design

## Goal

Allow a tab-panel tab to contain either one Table component or one Relation Matrix component. A tab must never contain more than one child component through the page designer.

## Editor behavior

- An empty tab shows two choices: **Add Table** and **Add Relation Matrix**.
- Choosing either option opens the existing component editor preselected to that component type.
- Saving inserts the configured component as the tab's only child.
- A populated tab shows its component type, title, and summary plus Edit and Remove actions.
- The add choices are hidden while the tab contains a component.
- Removing the component returns the tab to its empty state.
- Editing a tab child cannot change the tab into a multi-component tab.

## Data model and compatibility

The persisted `TabPanelTab.components` array remains unchanged for API compatibility. New editor operations write zero or one element. Existing pages containing exactly one table continue to work without migration.

If an older page contains multiple child components in a tab, the editor continues to display them so data is not silently deleted. It does not offer another Add action. Editing or removing existing children remains possible; once reduced to zero or one child, the single-component rule applies normally.

## Component editing

The current table-only nested editor will become a tab-child component editor. It will support:

- Table configuration through the existing table editor controls.
- Relation Matrix configuration through the existing standalone relation-matrix controls.

The editor receives the target tab and optional child component ID. On save it either replaces that child or inserts the sole child into an empty tab.

## Runtime and preview

Runtime tab rendering dispatches the sole child through the same component renderer used outside tabs. Table behavior remains unchanged. Relation Matrix uses the existing runtime Relation Matrix component, including display/edit toggles and dynamic-array membership mutations.

The tenant preview renders the child according to its component type. An empty tab displays an empty-state message.

## Validation

- Table children retain existing table validation.
- Relation Matrix children use `isRelationMatrixConfigComplete` and do not require the legacy top-level `schemaName`.
- The save action remains disabled until the selected child type is valid.

## Testing

Add focused tests for the single-child tab helper behavior:

- Empty tabs accept a Table.
- Empty tabs accept a Relation Matrix.
- Populated tabs reject an additional child.
- Editing replaces the existing child without appending.
- Removing restores the empty state.

Run the complete tenant-panel and react-template test suites and production builds.
