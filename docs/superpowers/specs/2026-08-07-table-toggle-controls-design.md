# Table Toggle Controls Design

## Goal

Add configurable table toolbar toggles that can independently or jointly control column visibility, boolean-cell editability, and backend request filters. Toggle state is local to the rendered table and resets to the configured default whenever the table remounts or the page reloads.

## Configuration Model

`TableComponentConfig` gains `toggles`, an ordered array of toggle definitions. Each definition contains:

- `id`: stable identifier used by column bindings.
- `label`: text shown in the table controls.
- `defaultValue`: initial boolean state.
- `request`: optional ON/OFF request behavior.

Each request state supports either:

- `set`: add a configured field and JSON-compatible value to the table request.
- `omit`: do not send that configured field in the table request.

This explicitly supports “Show inactive”: OFF sets `deleted=false`; ON omits `deleted`.

`TableColumnConfig` gains two independent optional bindings:

- `visibilityToggle`: toggle ID plus the boolean state in which the column is visible.
- `booleanEditToggle`: toggle ID plus the boolean state in which a `booleanSwitch` cell is editable.

The same toggle may be selected for both bindings, different toggles may be selected, or either binding may be omitted.

## Tenant Panel

The table settings UI gains a Display Toggles section. Users can add, remove, order, label, and set the default state of toggles. For each ON/OFF request state, users choose Set or Omit; Set exposes a request field and JSON-compatible value.

Each column editor exposes a visibility-toggle selector and visible-when selector. Boolean Switch columns additionally expose an edit-toggle selector and editable-when selector. Selectors only reference toggles defined on that table.

The save cleaner retains the toggle definitions and column bindings. Empty optional bindings are omitted. The API-facing page types and Go page model persist the configuration unchanged.

## Runtime Behavior

Paginated and unpaginated table components initialize a state map from configured toggle defaults. Toggle controls appear with the other table controls but are not automatically treated as query filters.

For every toggle state change:

1. Resolve all configured request effects.
2. Merge them with ordinary filter-panel values and existing constant filters using the table’s established precedence rules.
3. Omitted request effects contribute no field; set effects contribute their configured field/value.
4. The existing query-key flow detects the merged-filter change and refreshes paginated data. Unpaginated schema-backed data uses the corresponding request-filter path available to that component.

Before rendering columns, remove any column whose visibility binding does not match the current toggle state. For a Boolean Switch column, render the existing editable switch when its edit binding matches. When it does not match, render a non-interactive check or cross icon. Boolean Switch columns without an edit binding remain editable for backward compatibility.

Unknown or deleted toggle IDs fail open: columns remain visible, Boolean Switch columns retain current editable behavior, and no request effect is sent.

## Data Precedence

Table-toggle request effects are merged after filter-panel values but before explicit component `constantFilter` values. This lets a table toggle control ordinary request fields while preserving the existing guarantee that a caller-provided constant filter cannot be overridden by local UI.

If multiple toggles set the same request field, the later toggle in configured order wins. The tenant editor displays this ordering and allows it to be changed.

## Validation

The backend validates that toggle IDs are non-empty and unique, request Set behavior has a non-empty field, and column bindings reference a configured toggle ID. Request values remain JSON-compatible values supported by the existing page model.

## Testing

Tests cover:

- Cleaning and persistence of toggles and column bindings.
- Default-state initialization and reset behavior.
- OFF Set / ON Omit request resolution.
- Request precedence and duplicate-field ordering.
- Visibility-only, edit-only, and combined bindings.
- Missing toggle references failing open.
- Paginated and unpaginated runtime parity.
- Backend JSON/BSON round trips and validation.

