# Boolean Column Presentation Toggle Design

## Goal

Add an independent table-local toggle binding that changes a Boolean Switch column between an interactive switch and readonly check/cross marks. Existing column visibility, Boolean editability, and request-effect bindings remain unchanged.

## Configuration

Each Boolean Switch column may define `booleanDisplayToggle` with the existing toggle-binding shape:

```json
{
  "toggleId": "manageBooleanSwitches",
  "when": true
}
```

The tenant designer exposes this as **Boolean display toggle** and **Show switch when: On/Off**. The controls appear only for columns whose configured type is `booleanSwitch`.

## Runtime Rules

Evaluation order is:

1. Apply the existing visibility binding. A hidden column is not rendered.
2. Evaluate `booleanDisplayToggle`.
   - Matching state: use switch presentation.
   - Opposite state: show readonly `✓` or `✕` marks.
   - Missing binding or missing referenced toggle: preserve current behavior and use switch presentation.
3. In switch presentation, apply the existing `booleanEditToggle` behavior.
   - Editable: render the interactive switch.
   - Readonly: render the existing check/cross marks.

Therefore either the display binding or the editability binding may cause check/cross presentation. Request effects and column visibility stay independent and may use the same or different table toggle.

## Persistence and Validation

The backend page model persists the optional `booleanDisplayToggle` binding. Validation requires its `toggleId` to reference a toggle defined in the same table, matching the rules already used for visibility and editability bindings.

The tenant configuration cleaner preserves both `when: true` and `when: false`, and removes invalid empty bindings.

## Testing

- Backend round-trip coverage for the new binding.
- Backend validation coverage for missing toggle references.
- Shared helper coverage for switch/check presentation, including fail-open behavior.
- Tenant cleaner coverage for preserving the binding.
- Full Go and frontend test suites plus both production builds.
