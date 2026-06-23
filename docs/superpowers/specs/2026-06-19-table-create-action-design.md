# Table Create Action Design

## Goal

Make the table Add button configurable through the same action model used for Edit, Delete, Update, and Link actions. A configured create action should control the add button label, modal submit button text, visible form fields, defaults, constants, validation behavior, and styling.

## Current Behavior

`GenericPaginatedPage` always builds a hard-coded `addButton` with:

- label `Add`
- default schema-derived inputs and form keys
- default `GenericAddEditPanel` submit behavior
- fixed button styling

Row actions are already configurable through `table.actions` and `TableActionConfig`. PageDesigner exposes action form fields, labels, icons, constants, modal type, conditions, and submit settings for those row actions.

## Proposed Model

Extend `TableActionKind` with `create`.

Create actions live in `table.actions` beside existing action entries:

```json
{
  "kind": "create",
  "label": "Add",
  "buttonName": "Create",
  "modalType": "form",
  "formFields": [],
  "constantValues": {}
}
```

The first enabled `create` action is used as the table Add button configuration. Other row actions continue to render in the Actions column.

## Runtime Behavior

When a table has an enabled create action:

- `label` controls the visible add button text.
- `buttonName` controls the submit button inside the add modal.
- `formFields`, when defined, replace the default schema-derived create form.
- If `formFields` is omitted, the add modal keeps using the existing generated inputs and form keys.
- `defaultValue` values from form fields initialize the add form.
- `constantValues` or `constantValuesJson` merge into the create payload.
- `buttonClassName` or `className` can override the current add button style.
- `enabled: false` disables that create action.

If no enabled create action exists, `GenericPaginatedPage` keeps the current hard-coded Add button behavior for backward compatibility.

## PageDesigner Behavior

PageDesigner should let users choose `Create` as an action kind. The create action editor should reuse the existing action settings UI rather than introduce a separate add-button editor.

For schema-sourced table components, the default generated action set should include:

1. Create
2. Edit
3. Delete

The default create action should use form fields generated from schema fields, matching edit field generation where appropriate.

## Data Compatibility

Existing saved pages remain valid:

- Existing `table.actions` without create actions continue rendering the old Add button.
- Existing edit/delete/update/link actions keep their current behavior.
- Backend validation must allow action kind `create` if the page model is validated by `autotable-Go`.

## Scope

Implement in tenantPanel first:

- Type updates in `src/types/page.ts`.
- Runtime create-action support in `GenericPaginatedPage`.
- Shared helper reuse or extension in `src/utils/tableActions.tsx`.
- PageDesigner defaults, kind selection, and cleanup support in `PageDesigner.tsx`.

Cross-project follow-up:

- Align `autotable-Go` action validation to accept `create`.
- Align `react-template` action types/runtime if it consumes the same page JSON.

## Testing

Verification should cover:

- TypeScript/build success.
- Default tables still show and submit the old Add button when no create action exists.
- A configured create action changes the add label and submit button text.
- A configured create action can limit fields and apply defaults/constants.
- Existing edit/delete actions still render as row actions.
