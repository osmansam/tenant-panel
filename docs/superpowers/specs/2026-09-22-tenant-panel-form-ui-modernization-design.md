# Tenant Panel Form UI Modernization Design

**Date:** 2026-09-22

**Status:** Proposed for user review

**Scope:** Shared visual foundation and one schema-driven `DynamicForm` vertical slice
**Out of scope:** Legacy form migration, unrelated page redesigns, form-engine replacement, and dependency removal

## 1. Purpose

Modernize AutoTable tenant-panel forms so they look and behave like a polished commercial SaaS admin interface while preserving the existing form engine and every customer-visible data contract.

The first implementation phase will:

1. establish a concrete token-driven visual system;
2. add project-owned, schema-free UI primitives;
3. add reusable form-field components with one shared presentation contract;
4. expose UI, form-field, and dynamic-form components through centralized public exports; and
5. migrate the schema-driven `DynamicForm` rendered by `PagePreviewPage` as one complete representative form.

The first phase will not introduce React Hook Form or any other competing form-state system. It will not migrate `GenericAddEditPanel`, redesign unrelated pages, remove existing UI libraries, or alter API payloads.

## 2. Goals and success criteria

### 2.1 Visual goals

- Forms have a restrained, professional SaaS appearance: clear hierarchy, quiet surfaces, consistent geometry, and minimal shadow.
- Every control uses the same typography, height, border, radius, focus ring, disabled state, and validation treatment.
- Labels, descriptions, optional/required indicators, and errors are aligned and spaced consistently.
- Sections and action areas remain legible from 320-pixel mobile layouts through wide desktop layouts.
- Loading, empty, disabled, read-only, and error states are visually distinct without relying on color alone.

### 2.2 Architecture goals

- CSS custom properties are the single source of truth for semantic design tokens.
- Low-level UI primitives know nothing about AutoTable schemas, tenant/project identifiers, API clients, validation rules, or submission behavior.
- Reusable form-field components own all field chrome and accessibility wiring.
- The dynamic renderer remains responsible for interpreting schema fields and selecting a form-field component.
- The existing form engine remains responsible for state, conditions, calculations, validation, object lists, and submission.
- Consumers import shared components from public `index.ts` entry points instead of deep internal paths.

### 2.3 Compatibility goals

The following must be byte-for-byte or semantically equivalent at the form-engine boundary:

- initial/default values;
- string, number, boolean, array, date/time, `File`, and null/empty representations;
- validation rule evaluation and custom validation messages;
- relation option values and source-item metadata;
- dependent selection invalidation;
- source request filters and source option filters;
- object-list add, edit, remove, merge, mapping, and calculation behavior;
- summary calculations;
- create, create-many, and workflow request bodies;
- `formConfigRef` behavior;
- callbacks and mutation selection; and
- success/error notification behavior.

## 3. Current architecture and constraints

The repository contains two overlapping form paths:

- `src/components/forms/DynamicForm.tsx` is the schema-driven customer-created form runtime. It is rendered from `PagePreviewPage` and owns runtime state, validation, calculations, object lists, and submission selection.
- `src/components/panelComponents/FormElements/GenericAddEditPanel.tsx` is the legacy generic CRUD form. It is widely reused by paginated and unpaginated table pages and combines state, validation, filtering, rendering, uploads, confirmation, and submission behavior.

Both paths use controls from `panelComponents/FormElements`, especially `TextInput`, `SelectInput`, and `DateInput`. Those controls combine low-level input behavior with field labels, layout, required indicators, clear actions, and specialized variants. `DynamicFormField` additionally implements textarea and image fields inline, creating a second visual implementation inside the same form.

The project already uses Tailwind CSS 3 and has partial semantic variables in `src/index.css`, but components frequently bypass them with hard-coded neutral, gray, blue, red, size, and radius values. The project also contains Tailwind, Headless UI, MUI, Material Tailwind, Emotion, React Select, and hand-built native controls. The first phase must not add a broad UI framework or remove these dependencies.

## 4. Design principles

1. **Semantic tokens before component styling.** Components consume names such as `--ui-border`, `--ui-danger`, and `--ui-control-height`, not raw palette values.
2. **One field shell.** A field's label, required/optional text, description, error, and ARIA relationships are rendered in one component.
3. **Native controls first.** Use native input, textarea, checkbox, and file controls when they meet the behavior and accessibility requirements.
4. **Preserve specialized behavior.** Keep React Select for current relation, multi-select, custom option, sort, filter, suggestion, clear, and auto-fill behavior during this migration.
5. **Compatibility over naming purity.** Existing misleading schema semantics are preserved until a separately approved, opt-in migration exists.
6. **No business logic in primitives.** Schema evaluation, value conversion, selection fetching, calculations, mutations, and toast decisions stay outside `components/ui` and `components/form-fields`.
7. **Incremental replacement.** New and legacy components coexist behind stable public entry points until usage is migrated and verified.

## 5. Concrete visual design system

### 5.1 Token source of truth

Semantic CSS custom properties will live in `src/styles/tokens.css`. Tailwind will reference those properties from `tailwind.config.js`. Component files may use Tailwind utilities mapped to tokens, but may not introduce new hard-coded color values, control heights, field gaps, radii, or focus-ring recipes.

`src/index.css` will import the token file before Tailwind component and utility layers. Existing global styles remain in place unless they directly conflict with the representative form.

Initial light-theme tokens:

| Category | Token | Value | Intended use |
| --- | --- | --- | --- |
| Typography | `--ui-font-sans` | Plus Jakarta Sans, system fallback | All tenant-panel UI |
| Page | `--ui-page` | `0 0% 98%` | Page background |
| Surface | `--ui-surface` | `0 0% 100%` | Cards, fields, dialogs |
| Subtle surface | `--ui-surface-subtle` | `210 20% 98%` | Section footers, muted panels |
| Foreground | `--ui-foreground` | `222 47% 11%` | Primary text |
| Muted text | `--ui-muted-foreground` | `215 16% 40%` | Descriptions, secondary text |
| Placeholder | `--ui-placeholder` | `215 14% 58%` | Placeholder text |
| Border | `--ui-border` | `214 24% 88%` | Cards and controls |
| Border hover | `--ui-border-hover` | `215 20% 72%` | Hovered editable controls |
| Primary | `--ui-primary` | `201 90% 40%` | Primary actions and accents |
| Primary hover | `--ui-primary-hover` | `201 90% 34%` | Primary action hover |
| Focus | `--ui-focus` | `201 96% 45%` | Focus ring |
| Danger | `--ui-danger` | `0 72% 51%` | Error text and destructive actions |
| Danger subtle | `--ui-danger-subtle` | `0 86% 97%` | Invalid background/accent |
| Success | `--ui-success` | `158 64% 36%` | Success status |
| Disabled surface | `--ui-disabled` | `210 20% 97%` | Disabled control background |
| Overlay | `--ui-overlay` | `222 47% 11% / 0.48` | Dialog scrim |
| Radius | `--ui-radius-sm` | `0.375rem` | Compact elements |
| Radius | `--ui-radius-md` | `0.5rem` | Controls and buttons |
| Radius | `--ui-radius-lg` | `0.75rem` | Sections and dialogs |
| Height | `--ui-control-sm` | `2rem` | Dense/compact controls |
| Height | `--ui-control-md` | `2.5rem` | Default form controls |
| Height | `--ui-control-lg` | `2.75rem` | Prominent actions |
| Shadow | `--ui-shadow-sm` | `0 1px 2px rgb(15 23 42 / 0.05)` | Menus and cards when needed |
| Shadow | `--ui-shadow-dialog` | `0 24px 64px rgb(15 23 42 / 0.18)` | Dialog only |

Dark-theme tokens are not part of the first implementation. Token names must nevertheless be semantic so a future dark theme can override values without changing components.

### 5.2 Typography

The canonical family is the already bundled Plus Jakarta Sans, licensed under SIL Open Font License 1.1. The implementation must first fix or verify the current font asset paths; if the asset provenance cannot be verified, the build must use the declared system fallback until approved assets are added.

Type roles:

| Role | Size / line height | Weight | Use |
| --- | --- | --- | --- |
| Page title | 24px / 32px | 600 | Representative form title |
| Section title | 16px / 24px | 600 | Form section headers |
| Body | 14px / 20px | 400 | Inputs, dialog text, general content |
| Label | 14px / 20px | 500 | Field labels |
| Supporting | 12px / 16px | 400 | Descriptions, validation, counts |
| Button | 14px / 20px | 500 | Default actions |

Labels use sentence case. Required fields append a red asterisk with screen-reader text equivalent to “required.” Optional fields do not show “optional” unless a form explicitly requests it; this avoids unnecessary noise when most fields are optional.

### 5.3 Spacing and layout

The base spacing unit is 4px. Approved field/layout steps are 4, 6, 8, 12, 16, 20, 24, and 32px.

- Label to control: 6px.
- Control to description or error: 6px.
- Fields within a grid: 20px horizontal and 20px vertical on desktop; 16px vertical on mobile.
- Section header padding: 20px desktop, 16px mobile.
- Section body padding: 24px desktop, 16px mobile.
- Section footer padding: 16px 24px desktop, 12px 16px mobile.
- Space between sections: 20px desktop, 16px mobile.
- Page content maximum width: 1200px, centered when the hosting page does not impose a narrower region.

Form sections use a white surface, 1px semantic border, 12px radius, and no default shadow. A subtle shadow is permitted only when the section must separate from a same-color background.

### 5.4 Inputs and controls

Default text-like controls:

- 40px height; textarea has a minimum height of 96px.
- 12px horizontal padding.
- 8px radius.
- 1px semantic border.
- 14px text with 20px line height.
- White editable background.
- Border-hover token on pointer hover.
- No movement, scale, or shadow on focus.

Focus uses a two-part treatment: focus border color plus a 3px outer ring at approximately 20% focus-color opacity. It is applied with `:focus-visible` where supported and must remain visible against both page and section surfaces.

Disabled controls remain visible, use the disabled surface, muted text, reduced contrast, and `not-allowed` cursor. Read-only controls remain visible, retain normal text contrast, use a subtle surface, do not expose clear/increment actions, and include a read-only indication in their accessible description when the semantic contract supports it.

Checkboxes use a native checkbox input styled as a 16px square with a 6px visual radius, a minimum 40px interactive row height, and the label as the click target. A native control is preferred over a new primitive dependency in phase one.

File upload uses a native file input behind a styled, keyboard-accessible trigger. It presents accepted file type guidance, the selected filename, and an explicit remove action. It continues to store the selected `File` object or `null` exactly as today.

React Select receives a shared style adapter derived from the same tokens. It must match the 40px control height, radius, border, typography, focus ring, invalid state, and disabled/read-only presentation of native controls. Existing option rendering and value behavior remain unchanged.

### 5.5 Validation presentation

- Invalid controls use the danger border and a subtle danger ring on focus.
- Error text appears directly below the control in 12px/16px typography with a small error icon only if the icon adds meaning; color is not the sole indicator because the text is always present.
- `aria-invalid="true"` is applied to the interactive control.
- The error element has a stable ID and `role="alert"` only when a newly produced submission error needs immediate announcement. Persistent errors use `aria-live="polite"` to avoid repeated interruption.
- Descriptions and errors are combined into `aria-describedby` in deterministic order.
- A form-level toast may remain as a summary, but it never replaces inline field errors.
- Server/mutation errors remain under the current mutation/toast behavior in phase one; adding a form-level server-error panel is a future decision.

### 5.6 Buttons

Button variants for the shared foundation are `primary`, `secondary`, `outline`, `ghost`, `destructive`, and `icon`. `success`, `warning`, `black`, and absolute-positioned `clear` remain legacy-only until a demonstrated shared use exists.

- Small: 32px; default: 40px; large: 44px.
- Text buttons use at least 12px horizontal padding; icon-only controls use a square hit area of at least 40px in form contexts.
- Loading disables the button, preserves its width, exposes `aria-busy`, and changes accessible text without relying only on a spinner.
- Destructive actions are red; cancel is neutral rather than destructive.
- Action rows place the primary action at the end in left-to-right layouts and stack full-width on narrow mobile layouts when needed.

### 5.7 Form sections

Each `DynamicForm` area is a section with optional header, body, and footer:

- Header: section title and optional supporting description.
- Body: responsive field grid plus object lists and summaries.
- Footer: neutral subtle surface with actions aligned to the end.
- Empty sections are not rendered, preserving current behavior.
- Object-list empty state uses at least 64px vertical space, concise text, and no decorative illustration in phase one.

### 5.8 Dialogs

Dialogs are specified for system consistency but are not migrated in the representative-form phase because `DynamicForm` does not require one.

- Overlay uses the semantic overlay token with no blur by default.
- Dialog width is `min(32rem, calc(100vw - 2rem))` for standard forms and `min(48rem, calc(100vw - 2rem))` for complex forms.
- Radius is 12px; shadow uses the dialog token.
- Header/body/footer are separate regions with 20–24px padding.
- Close, Escape, focus containment, initial focus, and focus return must be handled by an accessible behavior primitive.
- Until dialog migration is approved, existing Headless UI dialogs remain unchanged. A future dialog migration may use the already installed Headless UI or an individually approved Radix Dialog dependency; no Radix Dialog package is added in phase one.

### 5.9 Responsive behavior

Breakpoints follow the existing Tailwind configuration.

- Below `md` (768px), all form fields are one column regardless of schema width.
- At `md`, half-width fields may form two columns.
- At `lg`, schema layout columns and third-width fields become active.
- Sections never cause horizontal page scrolling at 320px viewport width.
- Action footers wrap; at 320–479px, submit actions may become full width while secondary actions remain logically ordered.
- React Select menus must stay within the viewport and above section overflow boundaries.
- Date popovers must use the existing viewport-positioning behavior until separately replaced.
- Touch targets are at least 40px, with 44px preferred for primary mobile actions.

## 6. Proposed directory and public API

```text
src/
  components/
    ui/
      button.tsx
      checkbox.tsx
      input.tsx
      label.tsx
      textarea.tsx
      index.ts
    form-fields/
      field-shell.tsx
      field.types.ts
      text-field.tsx
      number-field.tsx
      color-field.tsx
      checkbox-field.tsx
      textarea-field.tsx
      select-field.tsx
      date-field.tsx
      time-field.tsx
      month-year-field.tsx
      file-field.tsx
      index.ts
    forms/
      DynamicForm.tsx
      DynamicFormField.tsx
      DynamicFormObjectList.tsx
      DynamicFormSummary.tsx
      dynamicFieldAdapter.ts
      useFormSelectionData.ts
      index.ts
    index.ts
  styles/
    tokens.css
    forms.css
  utils/
    cn.ts
  third-party/
    licenses/
      shadcn-ui-MIT.txt
      clsx-MIT.txt
      tailwind-merge-MIT.txt
      plus-jakarta-sans-OFL-1.1.txt
THIRD_PARTY_NOTICES.md
```

Existing dynamic-form filenames remain capitalized in the first phase to minimize unrelated import churn. New low-level and form-field filenames use the repository's chosen convention consistently within their new directories.

Public imports:

```ts
// src/components/ui/index.ts
export { Button, buttonVariants } from "./button";
export { Checkbox } from "./checkbox";
export { Input } from "./input";
export { Label } from "./label";
export { Textarea } from "./textarea";

// src/components/form-fields/index.ts
export { FieldShell } from "./field-shell";
export { TextField } from "./text-field";
export { NumberField } from "./number-field";
export { ColorField } from "./color-field";
export { CheckboxField } from "./checkbox-field";
export { TextareaField } from "./textarea-field";
export { SelectField } from "./select-field";
export { DateField } from "./date-field";
export { TimeField } from "./time-field";
export { MonthYearField } from "./month-year-field";
export { FileField } from "./file-field";
export type { FieldPresentationProps } from "./field.types";

// src/components/forms/index.ts
export { default as DynamicForm } from "./DynamicForm";

// src/components/index.ts
export * from "./ui";
export * from "./form-fields";
export * from "./forms";
```

Internal helpers that are not supported public contracts are not exported from the top-level component index.

## 7. Component contracts

### 7.1 Utility class composition

```ts
export function cn(...inputs: ClassValue[]): string;
```

`cn` combines conditional classes and resolves Tailwind conflicts. It contains no theme or business logic.

### 7.2 UI primitives

```ts
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  invalid?: boolean;
}

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "icon";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}
```

All primitives use `forwardRef`, pass native attributes through, accept `className`, and expose no schema or validation-library types. `Input` does not render a label or an error; those belong to `FieldShell`.

### 7.3 Shared field presentation

```ts
export interface FieldPresentationProps {
  id?: string;
  name: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  optionalLabel?: React.ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
}

export interface FieldControlAccessibility {
  controlId: string;
  descriptionId?: string;
  errorId?: string;
  describedBy?: string;
  invalid: boolean;
}
```

`FieldShell` generates stable IDs with `useId` when an explicit ID is absent. It renders the label, indicator, description, error, and a control slot. The control slot receives `FieldControlAccessibility`, which prevents each field implementation from re-creating ARIA logic.

### 7.4 Value-bearing form fields

Each form field is controlled. It must render the supplied `value` and call `onChange` without maintaining an unsynchronized copy. Temporary display state is allowed only when the control requires it, such as masked date text, and must synchronize when the external value changes.

Representative contracts:

```ts
export interface TextFieldProps extends FieldPresentationProps {
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "password" | "url" | "tel";
  placeholder?: string;
  autoComplete?: string;
  onClear?: () => void;
}

export interface NumberFieldProps extends FieldPresentationProps {
  value: number | "" | null;
  onChange: (value: number | "") => void;
  min?: number;
  max?: number;
  step?: number;
  showStepButtons?: boolean;
  onClear?: () => void;
}

export interface CheckboxFieldProps extends FieldPresentationProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export interface ColorFieldProps extends FieldPresentationProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
}

export interface TextareaFieldProps extends FieldPresentationProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export interface TimeFieldProps extends FieldPresentationProps {
  value: string;
  onChange: (value: string) => void;
  variant?: "native" | "segmented";
  onClear?: () => void;
}

export interface FileFieldProps extends FieldPresentationProps {
  value: File | null;
  onChange: (value: File | null) => void;
  accept?: string;
}
```

Select remains an adapter over React Select:

```ts
export interface SelectFieldProps extends FieldPresentationProps {
  value: OptionType | readonly OptionType[] | null;
  options: readonly OptionType[];
  onChange: (value: OptionType | readonly OptionType[] | null) => void;
  multiple?: boolean;
  placeholder?: string;
  clearable?: boolean;
  autoFillSingleOption?: boolean;
  sortOptions?: boolean;
  suggestedOptions?: readonly OptionType[];
}
```

The implementation preserves custom option content, source items, normalized Turkish-character search, sorting, suggestion actions, auto-fill, multi-select, and current clear behavior. The dynamic adapter remains responsible for converting selected option objects to the existing scalar/array form-state representation.

Date, time, and month-year components preserve their existing string formats. `InputTypes.TIME` uses the native time variant and `InputTypes.HOUR` uses the existing segmented hour/minute behavior. No `Date` object replaces serialized form-state values.

## 8. Dynamic field adapter and data flow

`DynamicFormField` becomes a narrow dispatch component. A pure `dynamicFieldAdapter.ts` module translates `GenericInputType`, current form value, and current error into the appropriate reusable field props.

```text
FormComponentConfig
  -> buildFormInputs(form, selectionDataMap)
  -> DynamicForm owns FormElementsState and errors
  -> resolveDynamicFieldState preserves legacy visibility semantics
  -> DynamicFormField chooses a form-field component
  -> form-field converts UI events to existing callbacks
  -> DynamicForm.updateField updates state and invalidates dependencies
  -> existing validation/calculation/payload utilities run unchanged
  -> existing mutation path submits unchanged payload
```

The adapter may know AutoTable field types. The form-field components and UI primitives may not.

## 9. Compatibility strategy

### 9.1 Current conditional semantics

The present code uses names that do not match conventional UI semantics:

| Path | Current property | Current behavior |
| --- | --- | --- |
| Dynamic customer form | `isDisabled: true` | Field is not rendered |
| Dynamic customer form | matching `disabledCondition` | Field is not rendered |
| Dynamic customer form | read-only | No schema property exists |
| Legacy generic form | `isDisabled: true` | Field is not rendered because its render branch is skipped |
| Legacy generic form | `isReadOnly: true` | Field remains visible and cannot be edited/cleared |
| Table actions | `hiddenCondition` | Action is not rendered |
| Table actions | `disabledCondition` | Action remains visible but cannot run |

These semantics must not be normalized silently.

### 9.2 Phase-one rule

For every existing `FormComponentConfig`, phase one preserves current behavior exactly:

```ts
export interface ResolvedDynamicFieldState {
  hidden: boolean;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
}

// Existing schemas remain in legacy mode.
hidden = Boolean(field.isDisabled) || isFormConditionMet(field.disabledCondition, values);
disabled = false;
readOnly = false;
```

The resolver makes this behavior explicit and testable, but it does not change it. Hidden fields keep their current state values and remain subject to the same current validation/payload behavior; phase one does not clear them, skip them during validation, or remove them from submission.

### 9.3 Future opt-in semantics

A future, separately approved schema revision may add explicit `hiddenCondition`, `disabledCondition`, and `readOnlyCondition` meanings behind a version or behavior-mode field, for example:

```ts
type FormFieldBehaviorMode = "legacy" | "explicit-v1";
```

That future work must define editor UX, storage/versioning, validation of hidden fields, payload treatment, and migration of existing customer forms. It is not part of the first implementation plan.

### 9.4 Value and submission compatibility

The following modules remain authoritative and are not rewritten in phase one:

- `buildInitialFormState`
- `filterFormInputOptions`
- `isFormConditionMet`
- `copySourceFieldsToObject`
- object-list normalization and mutation helpers
- `recalculateFormState` and calculation helpers
- `validateField`
- `buildFormSubmitPayload`
- `buildFormSubmitRequestBody`
- `buildFormConfigReference`
- `useFormSelectionData`
- `useDynamicCrud`

The new UI layer consumes and emits their current value types. Any mismatch is a regression, not an opportunity to “clean up” the format.

## 10. Representative form scope

The representative form is `DynamicForm` as rendered by `PagePreviewPage`.

### 10.1 Included

- Page title and form-section surfaces.
- Text, password, number, color, checkbox, textarea, image/file, date, time/hour, month-year, single-select, and multi-select presentation.
- Shared labels, required markers, descriptions when supported, and errors.
- Conditional required and current legacy-hidden behavior.
- Relation-backed selection loading and filtering.
- Dependent selection invalidation.
- Object-list display and actions.
- Summary display.
- Add-object and submit actions, including pending state.
- Create, create-many, and workflow submission flows.
- Responsive desktop and mobile layouts.

### 10.2 Excluded

- `GenericAddEditPanel` and `GenericAddComponent` migration.
- Table filters and table action forms.
- Page Designer editor restyling.
- Authentication, branding, project, or localization page redesigns.
- Dialog component replacement.
- MUI, Material Tailwind, Emotion, Headless UI, React Select, or icon-library removal.
- New dark theme.
- New form schema behavior mode.
- Global navigation or table redesign.

## 11. Visual acceptance criteria

### 11.1 Desktop, 1440px reference viewport

- Form content is centered or fills its host region up to a 1200px maximum without appearing stretched.
- Page title uses the page-title role and has 24px separation from the first section.
- Section cards share identical 12px radii, 1px borders, and header/body/footer alignment.
- Two- and three-column schema layouts align cleanly; full-width fields span all active columns.
- Every default control is 40px high and aligns on a shared baseline.
- Labels, descriptions, and errors use the specified type roles and spacing.
- React Select is visually indistinguishable from native text controls at rest, hover, focus, invalid, and disabled states.
- Focus rings are never clipped by section containers.
- Object-list rows remain legible with long primary/secondary values and action buttons retain 40px targets.
- Action footers have a subtle background, clear primary/secondary hierarchy, and no excessive shadow.

### 11.2 Mobile, 390px reference viewport

- The page has 16px horizontal padding and no horizontal scroll.
- All fields are a single column, including fields configured as half or third width.
- Section body/header/footer padding reduces to 16px without crowding.
- Labels and error messages wrap without overlapping controls.
- Controls and interactive actions have at least 40px targets.
- Select and date overlays remain inside the viewport and above the current section.
- Object-list content truncates or wraps intentionally; prices and actions do not cover the primary content.
- Footer actions wrap in logical order; the primary submit action is full width when needed.
- Keyboard focus remains visible when a hardware keyboard is used.

### 11.3 State acceptance

For text, select, date, checkbox, and file controls, review normal, hover, focus, populated, invalid, disabled, read-only where supported, and pending states. Empty object lists, missing schema configuration, and submission pending states must use the same visual language.

## 12. Accessibility requirements

- Every control has a unique stable ID and a programmatically associated label.
- Description and error IDs are included in `aria-describedby`.
- Required and invalid state is exposed through native attributes/ARIA.
- All actions are keyboard reachable and have meaningful accessible names.
- Icon-only actions provide `aria-label`; decorative icons are hidden from assistive technology.
- Tab order follows visual order and is not altered with positive `tabIndex`.
- Focus is not removed unless focus is transferred to a visible interactive element.
- Color contrast targets WCAG 2.2 AA for text and interactive component boundaries.
- Error identification does not rely on color alone.
- React Select keyboard and screen-reader behavior must remain functional after style adaptation.
- Reduced-motion preferences disable nonessential transitions.

Automated checks support but do not replace keyboard and screen-reader-oriented manual verification.

## 13. Test strategy

### 13.1 Existing baseline

Before this design, the repository baseline was:

- `yarn test`: 54 test files and 270 tests passed with no type errors.
- `yarn build`: passed.

Known warnings include deprecated Tailwind `@variants`, unresolved font asset paths, stale Browserslist data, and a large production chunk. Only warnings directly affected by the scoped token/form work are addressed in phase one.

### 13.2 Test tooling decision

Current Vitest uses a Node environment and does not include Testing Library or a DOM environment. The implementation plan should add:

- `@testing-library/react` (MIT),
- `@testing-library/user-event` (MIT),
- `@testing-library/jest-dom` (MIT), and
- `jsdom` (MIT),

as development-only dependencies, unless an equivalent already-approved repository test standard is introduced before implementation. DOM tests can opt into `jsdom` per file or via a dedicated Vitest project/config so existing pure tests remain fast.

### 13.3 Unit tests

- `cn` merges conditional and conflicting Tailwind classes.
- The field-state resolver locks current `isDisabled` and `disabledCondition` hiding semantics.
- The adapter maps every existing field type and preserves value representations.
- Select option-object conversion preserves scalar, string-array, and number-array values.
- Field IDs and `aria-describedby` composition remain stable.

### 13.4 Component interaction tests

- Labels focus or toggle their controls.
- Required, description, invalid, error, disabled, and read-only states expose the correct attributes.
- External value updates are reflected without key-remount workarounds.
- Clear, password reveal, number increment/decrement, checkbox toggle, and file removal are keyboard operable.
- Select single/multiple changes, clear, suggestion, filtering, and auto-fill preserve current callbacks.
- Date/time/month-year changes preserve current serialized formats.
- Submit pending disables duplicate submission and communicates busy state.

### 13.5 Dynamic form integration tests

Use a representative schema fixture containing every relevant field type, a required condition, a legacy disabled condition, relation options, invalidation keys, an object list, mappings, calculations, summaries, and each submit mode.

Verify:

- initial state and defaults;
- current hidden-field behavior;
- validation rules and custom messages;
- dependent-select reset values;
- relation value/source-item behavior;
- object-list add/edit/remove and calculation results;
- image/file values;
- create payload;
- create-many array body;
- workflow envelope and `formConfigRef`; and
- state reset after successful submission.

### 13.6 Visual and manual checks

- Capture representative desktop and mobile screenshots before and after.
- Review normal, focus, error, disabled, pending, and empty states.
- Perform keyboard-only traversal and operation.
- Verify at 320px, 390px, 768px, 1024px, and 1440px widths.
- Test Chromium and one additional browser engine before approval.
- Run `yarn test`, `yarn build`, and targeted lint on every touched file.

The first slice is not approved for broader migration until both the visual acceptance criteria and compatibility integration tests pass.

## 14. Third-party components, dependencies, and notices

### 14.1 Runtime dependencies proposed for phase one

| Package/source | Proposed use | License | Notice action |
| --- | --- | --- | --- |
| `clsx@^2.1.1` | Conditional class composition | MIT, Luke Edwards | Declare directly; retain MIT notice in third-party notices/license file |
| `tailwind-merge@^2.6.0` | Resolve Tailwind 3 class conflicts in `cn` | MIT, Dany Castillo | Declare directly; retain MIT notice in third-party notices/license file |
| shadcn/ui source patterns | Reference or selectively adapted source for project-owned primitives | MIT | If any source is copied or substantially adapted, retain shadcn MIT copyright/license notice |
| Plus Jakarta Sans font files | Existing UI typeface | SIL Open Font License 1.1 | Verify asset provenance; include OFL text and required copyright notice |

`clsx` and `tailwind-merge` currently appear transitively in the lockfile. Application code must not depend on undeclared transitive packages, so the implementation adds compatible direct declarations. `tailwind-merge` must remain on the Tailwind-3-compatible major line for this phase.

### 14.2 Radix decision

No Radix runtime dependency is necessary for the representative-form phase:

- native controls cover input, textarea, checkbox, and upload;
- React Select remains for complex selects;
- the existing date implementation remains behaviorally intact; and
- dialogs are outside the representative-form implementation.

This follows the requirement to add only necessary primitives. If a later dialog migration is approved, `@radix-ui/react-dialog` may be evaluated as a separate MIT-licensed dependency against the already installed Headless UI implementation. It is not preinstalled now.

### 14.3 Development dependencies proposed for phase one

| Package | Purpose | License |
| --- | --- | --- |
| `@testing-library/react` | DOM component rendering and queries | MIT |
| `@testing-library/user-event` | Realistic keyboard/pointer interaction | MIT |
| `@testing-library/jest-dom` | Accessible DOM assertions | MIT |
| `jsdom` | Vitest browser-like environment | MIT |

Exact versions will be pinned by the implementation plan after checking current compatible releases and peer requirements. Dependency installation requires a lockfile diff review and a license check before merge.

### 14.4 Notice policy

Add `THIRD_PARTY_NOTICES.md` plus complete license texts under `third-party/licenses/`. Retain notices in source files where upstream code already contains them. Do not copy third-party premium blocks, paid templates, registry components with non-MIT terms, or assets without verified redistribution rights.

## 15. Implementation boundaries and sequencing

The implementation plan must divide the first phase into these independently reviewable outcomes:

1. **Compatibility characterization:** tests that pin current schema, value, condition, object-list, and payload behavior.
2. **Token foundation:** semantic token file, Tailwind mapping, font verification, and scoped form styles.
3. **UI primitives:** project-owned input, textarea, checkbox, label, and button plus `cn`.
4. **Field presentation:** `FieldShell` and focused field components with accessibility tests.
5. **Dynamic adapter:** pure mapping/state-resolution logic and tests.
6. **Representative integration:** `DynamicForm` uses the new field layer while engine utilities remain unchanged.
7. **Visual/functional verification:** desktop/mobile review, interaction checks, full tests, build, and dependency/license audit.

The implementation stops after step 7. Migration of `GenericAddEditPanel` requires explicit approval of the representative result and a new implementation scope.

## 16. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Misinterpreting `disabledCondition` changes customer forms | Lock current hidden semantics in tests and an explicit resolver; do not add new semantics in phase one |
| New controls change values or payloads | Keep engine utilities unchanged and assert all value/payload formats in integration tests |
| React Select styling breaks behavior | Wrap/style the current component; retain option/value/callback logic and interaction tests |
| Date display state diverges from external value | Require controlled synchronization tests; retain current serialized format and parsing rules |
| Broad CSS changes affect unrelated pages | Scope new component styles through semantic primitives; avoid global element restyling beyond tokens |
| New test stack slows existing tests | Use a dedicated DOM environment only for component/integration tests |
| Font assets have unclear provenance or broken paths | Verify against OFL source and asset hashes/metadata; otherwise use system fallback until resolved |
| Dependency growth recreates framework sprawl | Add only two small runtime utilities and DOM test tooling; add no Radix package in phase one |

## 17. Decisions requiring user approval before implementation

The architecture direction is approved. The following concrete decisions remain approval gates:

1. **Typography:** adopt the existing Plus Jakarta Sans as the canonical UI font after verifying its OFL provenance and repairing its asset path; fall back to the specified system stack if provenance cannot be established.
2. **Color direction:** use the restrained sky-blue primary with neutral surfaces defined in this spec, rather than the current mixture of neutral-black and several unrelated blues.
3. **Compatibility behavior:** preserve existing `isDisabled` and `disabledCondition` as hidden-field behavior for all current customer-created forms; introduce no explicit disabled/read-only schema semantics in phase one.
4. **Dependencies:** add direct `clsx` and Tailwind-3-compatible `tailwind-merge`, add DOM testing tools as development dependencies, and add no Radix dependency in phase one.
5. **Representative boundary:** stop after the `DynamicForm` vertical slice and require visual/functional approval before planning the legacy form migration.

Approval of this specification authorizes creation of an implementation plan only. It does not authorize product-code changes or dependency installation.
