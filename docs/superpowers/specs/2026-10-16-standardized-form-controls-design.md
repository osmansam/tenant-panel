# Standardized Form Controls Design

## Purpose

Create one reusable form-control system for the entire `tenantPanel` application so controls look and behave consistently in administrative configuration screens and customer-facing generated forms. In particular, every select must use the same shared select implementation rather than a mixture of native selects and independently styled `react-select` instances.

Success means:

- all application form controls share the same dimensions, typography, color tokens, focus treatment, validation treatment, and disabled/read-only behavior;
- simple, searchable, rich-option, and multi-select experiences are configurations of one shared `Select` primitive;
- labels, help text, required state, errors, and ARIA relationships follow one field contract;
- existing value shapes, saved page configuration, and backend request payloads remain unchanged;
- new raw form controls cannot be introduced outside the primitive implementation layer.

## Scope

This refactor covers the complete `tenantPanel/src` application:

- Page Designer and its component, form, filter, navigation, relation-matrix, and parameter-binding editors;
- integration, localization, branding, project, page, route-policy, collection, and dashboard screens;
- modal and table controls;
- generated dynamic forms, table filters, and their specialized date, time, month/year, number, color, and file fields;
- compatibility components currently named `SelectInput`, `TextInput`, and related legacy form elements.

The unrelated chi-square screenshot supplied with the request is not product guidance and has no bearing on this design.

## Non-goals

- changing API schemas, page configuration documents, or backend behavior;
- redesigning page layout, navigation, cards, tables, or buttons beyond adjustments needed to align form controls;
- changing the meaning of existing options, defaults, debounce behavior, autofill behavior, or validation rules;
- adopting an additional component-library dependency solely for visual styling.

## Current State

The codebase already has useful foundations in `src/components/ui`, `src/styles/tokens.css`, and `src/styles/forms.css`, including `Input`, `Textarea`, `Checkbox`, `Switch`, and `Field`. It also has two separate select implementations: the generated-form `SelectField` and the legacy `SelectInput`, both based on `react-select`. Alongside them are approximately 157 raw `<select>` elements, 297 raw `<input>` elements, and 17 raw `<textarea>` elements with many one-off Tailwind class combinations.

This duplication causes visible differences in height, radius, focus rings, labels, error presentation, option behavior, menu layering, and disabled states. It also makes future screens likely to introduce another variation.

## Chosen Approach

Extend the existing UI primitive layer and use the already-installed `react-select` package as the engine for every select. This avoids a new dependency and, unlike a native or Radix-only select, supports the required searchable and multi-select variants through the same implementation.

The design follows shadcn-style composition—small primitives, token-driven styling, forwarded refs, and explicit variants—without installing shadcn/Radix packages that would leave searchable and multi-select cases on a second implementation.

## Component Architecture

### Shared low-level primitives

`src/components/ui` owns the only low-level form elements:

- `Input`: native text, number, email, password, date, time, file, and color input behavior with shared visual states;
- `Textarea`: native textarea behavior with shared visual states;
- `Checkbox`: native checkbox semantics and shared focus, checked, invalid, and disabled treatment;
- `Switch`: accessible boolean switch for settings that describe an enabled/disabled state;
- `Select`: the only select implementation, backed by `react-select`;
- `Field`: the single presentation contract for label, required marker, optional marker, description, error, IDs, and ARIA relationships;
- `FieldGroup`: responsive layout only; it does not restyle child controls.

Raw `<input>`, `<select>`, and `<textarea>` elements are allowed only inside the corresponding primitive implementation files. Application components consume primitives instead.

### Shared Select contract

The new `Select` primitive uses a generic option object so numeric values and rich metadata are not coerced:

```ts
export interface SelectOption<Value = string | number> {
  value: Value;
  label: string;
  disabled?: boolean;
  leftLabel?: string;
  rightLabel?: string;
  imageUrl?: string;
}
```

Its public contract supports:

- a selected option or selected option array;
- single and multiple modes;
- searchable and non-searchable presentation;
- clearable and required behavior;
- loading, disabled, read-only, and invalid states;
- placeholder and empty-result text;
- option sorting and Turkish-character-normalized matching;
- rich option content already used by generated forms;
- modal-safe menu rendering, automatic placement, and keyboard navigation;
- stable IDs and ARIA attributes supplied by `Field` or directly by the caller.

`Select` returns the original option object or objects. This preserves numeric values and rich metadata. Administrative screens define option arrays beside their existing constants and derive the selected option from their scalar state. Thin helpers may be introduced to reduce this mapping, but they must not create a second select component.

### Field-level components

`src/components/form-fields` remains the behavior-rich layer for generated forms. Components such as `SelectField`, `TextField`, `NumberField`, `DateField`, `TimeField`, `MonthYearField`, `ColorField`, and `FileField` compose `Field` plus the appropriate UI primitive. They retain domain behavior such as masks, calendars, previews, increment/decrement buttons, autofill, and upload handling.

Specialized controls may render additional buttons, calendars, or pickers, but their editable surface and state presentation come from the shared primitives and tokens. A third-party picker may render its own internal DOM; application code must not create a parallel base input style around it.

### Compatibility adapters

Legacy `SelectInput` and `TextInput` stay temporarily available so the migration does not require simultaneous changes to every call signature. They become thin adapters that:

- translate legacy props and callback shapes;
- preserve debounce, clear, suggestion, sorting, number-stepper, and one-option autofill behavior;
- delegate rendering to `Field`, `Select`, `Input`, `Checkbox`, or the appropriate specialized field;
- contain no independent colors, spacing, focus styles, or select behavior.

An adapter counts as using the shared component because its rendered control is the shared primitive. New application code must import from `components/ui` or `components/form-fields`, not from the legacy directory.

## Visual and Interaction Contract

The existing UI tokens remain authoritative:

- standard control height: `--ui-control-md` (`2.5rem` / 40px);
- compact and large contexts may explicitly use the existing small and large control tokens;
- standard radius: `--ui-radius-md`;
- 14px control text and tokenized foreground/placeholder colors;
- tokenized surface, border, hover border, and disabled background;
- a 3px translucent focus ring using `--ui-focus`;
- danger border and danger focus ring when invalid;
- visible, consistent cursor and opacity changes when disabled or read-only.

Controls fill their container by default. Caller `className` values may control layout width, grid placement, typography specialization such as monospace, or an explicitly documented size. They may not replace the standard border, radius, background, focus, invalid, or disabled styling.

Select menus render above dialogs and scroll containers, choose placement automatically, and keep the focused option visible. Keyboard behavior includes Tab focus, Enter/Space opening and selection, arrow-key navigation, Escape closing, and Backspace removal only where clearable or multi-select behavior permits it.

## Data Flow and Compatibility

This work changes presentation and component APIs, not persisted data:

1. Existing state remains the source of truth in each screen.
2. A screen maps its current scalar or array value to the corresponding `SelectOption` object or objects.
3. The shared `Select` emits the original selected option object or objects.
4. The screen or compatibility adapter maps the selection back to the exact state shape used before the migration.
5. Existing save, request, and validation code receives the same values as before.

Inputs and textareas continue forwarding standard DOM change events at the primitive level. Behavior-rich field components may expose value-oriented callbacks where they already do so, but they must translate through the shared primitive without changing consumer-visible output.

## Validation, Errors, and Accessibility

`Field` owns the accessible relationship between a label and control. It generates stable IDs when one is not supplied and combines description and error IDs into `aria-describedby`. Required fields include both a visible marker and screen-reader text. Errors set `aria-invalid` and use an `aria-live="polite"` message.

Every migrated control must retain or improve its accessible name. Icon-only clear, reveal-password, calendar, upload, and stepper buttons require an `aria-label`. Disabled controls use actual disabled semantics. Read-only controls cannot be changed and expose read-only state where the underlying widget supports it.

Validation logic remains in its current owner. The shared primitives only render the `invalid` state and associated accessible attributes; they do not invent validation rules.

## Migration Strategy

The migration proceeds in independently verifiable slices:

1. Add and test the shared `Select`, control sizing/state support, and form-control lint restriction in warning mode while migration is incomplete.
2. Refactor generated form fields and legacy adapters to render the shared primitives.
3. Migrate the Page Designer family, beginning with the modal shell and the table-setting tabs shown in the supplied screenshots, then its extracted editors.
4. Migrate remaining pages, panels, modals, and table controls.
5. Remove duplicated styling helpers and switch the raw-element restriction to an error.
6. Confirm that the only remaining raw form tags are inside approved primitive files or third-party library internals.

Files already modified by unrelated in-progress work must be preserved. Changes in those files will be limited to control imports and markup directly required by this migration, and existing edits will not be reverted.

## Enforcement

ESLint `no-restricted-syntax` selectors will reject raw JSX `<input>`, `<select>`, and `<textarea>` elements across application source. File-specific overrides permit the elements only in `src/components/ui/input.tsx`, `src/components/ui/checkbox.tsx`, and `src/components/ui/textarea.tsx` as appropriate.

The rule message directs contributors to the shared primitive. Tests use the primitives too, except tests specifically exercising the primitive implementation. This makes the architectural requirement executable rather than relying on convention.

## Testing Strategy

Development follows test-driven cycles. Tests exercise user-visible behavior rather than source text or mocked components.

### Primitive tests

- preserve string and numeric option values;
- emit correct single and multiple selection shapes;
- support searchable, non-searchable, clearable, disabled, read-only, loading, empty, and invalid states;
- normalize Turkish characters during search;
- link labels, descriptions, errors, and required state correctly;
- open, navigate, select, and close from the keyboard;
- keep menu content usable inside a dialog;
- forward refs and standard input attributes;
- apply the standardized size and semantic state classes.

### Adapter and field tests

- verify legacy adapters preserve callback shapes, autofill, debounce, clearing, suggestions, and number bounds;
- verify generated fields preserve values and specialized interactions;
- verify date, time, file, and color fields render a shared control state and accessible labeling.

### Integration tests

- verify representative Page Designer controls update their existing configuration state;
- verify generated dynamic forms submit unchanged payload shapes;
- verify representative admin pages continue creating, editing, filtering, and saving data;
- retain all existing focused tests for affected screens.

### Full verification

- run the complete Vitest suite;
- run ESLint with the raw-control restriction enabled;
- run TypeScript and the Vite production build;
- run browser checks for the Page Designer dialog, generated forms, select menus inside scrollable modals, validation, keyboard use, and narrow layouts.

## Acceptance Criteria

- Every application select renders through `components/ui/Select`.
- Every application text, numeric, date, time, password, email, file, and color input renders through `components/ui/Input` directly or through a behavior-rich component that composes it.
- Every textarea and checkbox renders through its corresponding shared primitive; boolean setting switches use the shared `Switch`.
- No migrated control defines an independent visual state system.
- The screenshots' Page Designer controls have consistent height, labels, borders, focus rings, disabled states, and select behavior across every tab.
- Existing saved configuration and request payload shapes do not change.
- Accessibility behavior is covered by tests.
- ESLint prevents raw form elements from being reintroduced.
- The full test suite, lint, TypeScript check, production build, and browser verification complete successfully, or any pre-existing failure is reported explicitly.
