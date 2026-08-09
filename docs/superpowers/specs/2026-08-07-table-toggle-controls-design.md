# Table Toggle Controls Design

## Goal

Add configurable table toolbar toggles that can independently or jointly control column visibility, boolean-cell editability, and backend request filters. Toggle state is local to the rendered table and resets to the configured default whenever the table remounts or the page reloads.

## Configuration Model

`TableComponentConfig` gains `toggles`, an ordered array of toggle definitions. The TypeScript model uses explicit reusable shapes:

```ts
type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

type ToggleRequestEffect =
  | { type: "set"; field: string; value: JsonValue }
  | { type: "omit" };

type ToggleBinding = {
  toggleId: string;
  when: boolean;
};

type TableToggleConfig = {
  id: string;
  label: string;
  defaultValue: boolean;
  request?: {
    on?: ToggleRequestEffect;
    off?: ToggleRequestEffect;
  };
};
```

Each toggle contains:

- `id`: stable identifier used by column bindings.
- `label`: text shown in the table controls.
- `defaultValue`: initial boolean state.
- `request`: optional ON/OFF request behavior.

The request effect is a discriminated union. Each state supports either:

- `set`: add a configured field and JSON-compatible value to the table request.
- `omit`: contribute no request property for that toggle state.

This explicitly supports “Show inactive”: OFF sets `deleted=false`; ON omits `deleted`.

An `omit` effect contributes no value and does not delete or override a value supplied by an earlier source such as the filter panel. `TableColumnConfig` gains two independent optional `ToggleBinding` properties:

- `visibilityToggle`: the column is visible when the referenced toggle equals `when`.
- `booleanEditToggle`: a `booleanSwitch` cell is editable when the referenced toggle equals `when`.

The same toggle may be selected for both bindings, different toggles may be selected, or either binding may be omitted.

## Tenant Panel

The table settings UI gains a Display Toggles section. Users can add, remove, order, label, and set the default state of toggles. The ID is edited independently and is never regenerated when the label changes. For each ON/OFF request state, users choose Set or Omit; Set exposes a request field and JSON-compatible value.

Each column editor exposes a visibility-toggle selector and visible-when selector. Boolean Switch columns additionally expose an edit-toggle selector and editable-when selector. Selectors only reference toggles defined on that table.

The save cleaner retains the toggle definitions and column bindings. Empty optional bindings are omitted. The API-facing page types and Go page model persist the configuration unchanged.

## Runtime Behavior

Paginated and unpaginated table components initialize a state map from configured toggle defaults. Toggle controls appear with the other table controls but are not automatically treated as query filters.

For every toggle state change:

1. Resolve all configured request effects through one shared pure `resolveToggleRequestEffects(toggles, toggleState)` function used by paginated and unpaginated tables.
2. Merge them with ordinary filter-panel values and existing constant filters using the table’s established precedence rules.
3. Omit effects contribute nothing and leave earlier filter-panel values unchanged; Set effects contribute their configured field/value.
4. The existing query-key flow detects the merged-filter change and refreshes paginated data. Unpaginated schema-backed data uses the corresponding request-filter path available to that component.

Before rendering columns, remove any column whose visibility binding does not match the current toggle state. For a Boolean Switch column, render the existing editable switch when its edit binding matches. When it does not match, render a non-interactive check or cross icon with an accessible value label such as `Active: Yes`. Boolean Switch columns without an edit binding remain editable for backward compatibility.

Unknown or deleted toggle IDs fail open: columns remain visible, Boolean Switch columns retain current editable behavior, and no request effect is sent. Backend reference validation protects newly saved configurations, while fail-open runtime handling protects older persisted data, malformed responses, partial migrations, and temporary client-side editing state.

## Data Precedence

Table-toggle request effects are merged after filter-panel values but before explicit component `constantFilter` values:

```ts
const requestFilter = {
  ...filterPanelValues,
  ...resolveToggleRequestEffects(toggles, toggleState),
  ...constantFilter,
};
```

This lets a Set effect override an ordinary filter-panel value while preserving the existing guarantee that a caller-provided constant filter cannot be overridden by local UI. An Omit effect contributes no property, so any filter-panel value for that field remains present.

If multiple toggles set the same request field, the later toggle in configured order wins. The tenant editor displays this ordering and allows it to be changed.

## Validation

The backend validates that toggle IDs are non-empty and unique, request Set behavior has a non-empty field, and column bindings reference a configured toggle ID. Request values remain JSON-compatible values supported by the existing page model.

## Testing

Tests cover:

- Cleaning and persistence of toggles and column bindings.
- Default-state initialization and reset behavior.
- OFF Set / ON Omit request resolution.
- Request precedence and duplicate-field ordering.
- Toggle interaction with filter-panel and constant-filter values using the same field.
- Reordering toggles reverses which duplicate-field Set effect wins.
- Visibility-only, edit-only, and combined bindings.
- Missing toggle references failing open.
- Paginated and unpaginated runtime parity.
- Backend JSON/BSON round trips and validation.
