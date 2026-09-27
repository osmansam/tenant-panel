# Tenant Panel Form UI Modernization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the shared tenant-panel form design foundation and migrate the schema-driven `DynamicForm` vertical slice without changing the existing form engine, customer-created form behavior, or submission contracts.

**Architecture:** Add semantic CSS tokens, schema-free UI primitives, reusable field components, and a pure dynamic-field adapter beneath the existing `DynamicForm`. Keep `DynamicForm`, `formConfig`, selection queries, calculations, validation, and mutation utilities authoritative for state and business behavior; retain React Select and the current date/color behavior behind new field wrappers.

**Tech Stack:** React 18, TypeScript 5, Tailwind CSS 3, React Select 5, React Day Picker 8, Vitest 2, Testing Library, jsdom

**Spec:** `docs/superpowers/specs/2026-09-22-tenant-panel-form-ui-modernization-design.md`

## Global Constraints

- Do not introduce React Hook Form or another form-state/validation system.
- Do not migrate `GenericAddEditPanel`, `GenericAddComponent`, table filters, Page Designer controls, authentication forms, or unrelated tenant-panel pages.
- Do not remove MUI, Material Tailwind, Emotion, Headless UI, React Select, React Color, or any other existing UI dependency in this phase.
- Existing `FormComponentConfig`, `FormElementsState`, callback signatures, field values, validation behavior, calculation behavior, object-list behavior, and API request bodies remain compatible.
- For existing customer-created forms, `isDisabled: true` and a matching `disabledCondition` continue to hide the field; they do not become visible disabled controls.
- Hidden fields retain their current values, validation participation, and payload participation.
- React Select remains the implementation for single/multiple selects, relation fields, source items, suggestions, search normalization, sorting, clear behavior, and single-option auto-fill.
- Dates remain `YYYY-MM-DD` in form state; hour/month-year formats remain exactly as the current controls emit; uploads remain `File | null`.
- Low-level `src/components/ui` components must not import AutoTable schema types, query/mutation hooks, route parameters, tenant/project identifiers, or API services.
- Shared field components own label, description, required marker, error presentation, IDs, and ARIA wiring through `FieldShell`.
- New styling consumes semantic CSS variables; new component files do not introduce hard-coded hex colors, control heights, field spacing, or focus-ring recipes.
- Tailwind remains on major version 3. Use `tailwind-merge@2.6.1`, not version 3.
- No Radix dependency is added in this phase.
- The implementation stops after the `DynamicForm` slice and its visual/functional review artifacts.

## Review Focus

- **Legacy conditional field:** `isDisabled` or a matching `disabledCondition` hides the field while retaining its state, validation, and payload behavior; covered by Task 2 and Task 8 tests.
- **External state reset:** a field whose parent selection invalidates it immediately reflects the new external value without a key-remount workaround; covered by Task 5 and Task 8 tests.
- **Mixed select values:** string, number, string-array, and number-array selections round-trip without type coercion; covered by Task 7 tests.
- **Overlay edge cases:** React Select menus and date popovers remain usable inside section overflow and at 390px width; covered by Task 9 browser/manual checks.
- **Duplicate submission:** pending create, create-many, or workflow mutations disable the submit action and expose busy state; covered by Task 8 tests.

---

### Task 1: Add DOM test infrastructure and third-party notices

**Files:**
- Modify: `package.json`
- Modify: `yarn.lock`
- Modify: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/test/dom-smoke.test.tsx`
- Create: `THIRD_PARTY_NOTICES.md`
- Create: `third-party/licenses/shadcn-ui-MIT.txt`
- Create: `third-party/licenses/clsx-MIT.txt`
- Create: `third-party/licenses/tailwind-merge-MIT.txt`
- Create: `third-party/licenses/plus-jakarta-sans-OFL-1.1.txt`

**Interfaces:**
- Produces: Vitest support for both existing Node tests and `*.test.tsx` jsdom tests.
- Produces: direct runtime dependencies `clsx@2.1.1` and `tailwind-merge@2.6.1`.
- Produces: DOM test dependencies `@testing-library/dom@10.4.2`, `@testing-library/react@16.3.3`, `@testing-library/user-event@14.6.7`, `@testing-library/jest-dom@7.0.1`, and `jsdom@30.0.1`.
- Produces: repository notices for all copied/adapted source and font licensing relevant to the new foundation.

- [ ] **Step 1: Record the pre-change dependency and test baseline**

Run:

```bash
node --version
yarn test
yarn build
```

Expected: Node is at least 22, 54 existing test files and 270 existing tests pass, and the Vite build exits 0. Record any changed baseline numbers in the task notes before editing.

- [ ] **Step 2: Add the exact dependencies**

Run:

```bash
yarn add clsx@2.1.1 tailwind-merge@2.6.1
yarn add --dev @testing-library/dom@10.4.2 @testing-library/react@16.3.3 @testing-library/user-event@14.6.7 @testing-library/jest-dom@7.0.1 jsdom@30.0.1
```

Review `package.json` and `yarn.lock`. Reject any unexpected framework, Radix, form-state, or UI dependency.

- [ ] **Step 3: Write the failing DOM smoke test**

Create `src/test/dom-smoke.test.tsx`:

```tsx
// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("DOM test environment", () => {
  it("renders accessible React content", () => {
    render(<button type="button">Save</button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });
});
```

Run: `yarn test src/test/dom-smoke.test.tsx`

Expected: FAIL because `jest-dom` has not been loaded and the current Vitest include pattern excludes TSX.

- [ ] **Step 4: Configure the setup file and TSX discovery**

Create `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Update `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./src/test/setup.ts"],
    typecheck: {
      enabled: true,
    },
  },
});
```

Run: `yarn test src/test/dom-smoke.test.tsx`

Expected: PASS.

- [ ] **Step 5: Add complete license notices**

Create `THIRD_PARTY_NOTICES.md` with this inventory and upstream links:

```markdown
# Third-Party Notices

This project uses or adapts the following software and assets in its shared UI foundation.

- shadcn/ui — MIT — Copyright (c) 2023 shadcn
- clsx — MIT — Copyright (c) Luke Edwards
- tailwind-merge — MIT — Copyright (c) Dany Castillo
- Plus Jakarta Sans — SIL Open Font License 1.1 — Copyright holders listed in the upstream OFL file

Complete license texts are stored in `third-party/licenses/`. Package dependencies retain their own notices in the installed package distribution and lockfile.
```

Fetch the complete, unmodified upstream texts with explicit output paths:

```bash
curl --fail --location https://raw.githubusercontent.com/shadcn-ui/ui/main/LICENSE.md --output third-party/licenses/shadcn-ui-MIT.txt
curl --fail --location https://raw.githubusercontent.com/lukeed/clsx/master/license --output third-party/licenses/clsx-MIT.txt
curl --fail --location https://raw.githubusercontent.com/dcastil/tailwind-merge/v2.6.1/LICENSE.md --output third-party/licenses/tailwind-merge-MIT.txt
curl --fail --location https://raw.githubusercontent.com/tokotype/PlusJakartaSans/master/OFL.txt --output third-party/licenses/plus-jakarta-sans-OFL-1.1.txt
```

Open each downloaded file and confirm it names the expected project/license before committing. If an upstream path has moved, obtain the license from that project's official repository at the pinned tag and record the final source URL in `THIRD_PARTY_NOTICES.md`; do not substitute a third-party summary. Keep the shadcn notice because the project explicitly documents shadcn-derived conventions. The font notice documents the existing CSS intent even though Task 3 initially uses the system fallback while the missing assets remain unresolved.

- [ ] **Step 6: Verify the infrastructure**

Run:

```bash
yarn test
yarn build
git diff --check
```

Expected: all tests and the build pass; the pre-existing unresolved font warnings may remain until Task 3.

- [ ] **Step 7: Commit the test/license foundation**

```bash
git add package.json yarn.lock vitest.config.ts src/test/setup.ts src/test/dom-smoke.test.tsx THIRD_PARTY_NOTICES.md third-party/licenses
git commit -m "test: add form component test foundation"
```

---

### Task 2: Characterize legacy conditions and dynamic-form contracts

**Files:**
- Create: `src/components/forms/dynamicFieldAdapter.ts`
- Create: `src/components/forms/dynamicFieldAdapter.test.ts`
- Modify: `src/utils/formConfig.test.ts`

**Interfaces:**
- Consumes: `GenericInputType`, `InputTypes`, `FormElementValue`, `FormElementsState`, `OptionType`, and `isFormConditionMet`.
- Produces: `ResolvedDynamicFieldState`, `resolveDynamicFieldState(input, values)`, `getDynamicFieldValue(input, values)`, `getSelectedOptions(input, value)`, and `getSelectFormValue(input, selected)`.
- Later tasks may rely only on these exact exported names for dynamic-field state and select conversion.

- [ ] **Step 1: Write failing legacy-state tests**

Create `dynamicFieldAdapter.test.ts` with these cases:

```ts
import { describe, expect, it } from "vitest";
import { InputTypes } from "../panelComponents/shared/types";
import {
  getDynamicFieldValue,
  getSelectFormValue,
  getSelectedOptions,
  resolveDynamicFieldState,
} from "./dynamicFieldAdapter";

const input = {
  type: InputTypes.TEXT,
  formKey: "notes",
  label: "Notes",
  required: false,
};

describe("resolveDynamicFieldState", () => {
  it("preserves static isDisabled as legacy hidden behavior", () => {
    expect(resolveDynamicFieldState({ ...input, isDisabled: true }, {})).toEqual({
      hidden: true,
      disabled: false,
      readOnly: false,
      required: false,
    });
  });

  it("preserves a matching disabledCondition as legacy hidden behavior", () => {
    expect(resolveDynamicFieldState(
      { ...input, disabledCondition: 'status = "closed"' },
      { status: "closed", notes: "retained" },
    ).hidden).toBe(true);
  });

  it("resolves conditional required without changing visibility", () => {
    expect(resolveDynamicFieldState(
      { ...input, requiredCondition: 'status = "open"' },
      { status: "open" },
    )).toMatchObject({ hidden: false, required: true });
  });
});
```

Run: `yarn test src/components/forms/dynamicFieldAdapter.test.ts`

Expected: FAIL because the adapter does not exist.

- [ ] **Step 2: Implement the minimal compatibility resolver**

Implement:

```ts
export interface ResolvedDynamicFieldState {
  hidden: boolean;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
}

export const resolveDynamicFieldState = (
  input: GenericInputType,
  values: FormElementsState,
): ResolvedDynamicFieldState => ({
  hidden:
    Boolean(input.isDisabled) ||
    isFormConditionMet(input.disabledCondition, values),
  disabled: false,
  readOnly: false,
  required:
    Boolean(input.required) ||
    isFormConditionMet(input.requiredCondition, values),
});
```

Also implement value normalization currently embedded in `DynamicFormField`:

```ts
export const getDynamicFieldValue = (
  input: GenericInputType,
  values: FormElementsState,
): FormElementValue =>
  values[input.formKey] ??
  (input.type === InputTypes.CHECKBOX ? false : "");
```

Implement select conversions without coercing `OptionType.value`:

```ts
export const getSelectedOptions = (
  input: GenericInputType,
  value: FormElementValue,
): OptionType | OptionType[] | null =>
  input.isMultiple
    ? (input.options || []).filter((option) =>
        Array.isArray(value) ? value.includes(option.value as never) : false,
      )
    : (input.options || []).find((option) => option.value === value) || null;

export const getSelectFormValue = (
  input: GenericInputType,
  selected: OptionType | readonly OptionType[] | null,
): string | number | string[] | number[] =>
  Array.isArray(selected)
    ? selected.map((option) => option.value) as string[] | number[]
    : selected
      ? (selected as OptionType).value
      : input.isMultiple
        ? []
        : "";
```

- [ ] **Step 3: Add value and payload characterization tests**

Extend the adapter tests to cover false checkbox values, null numbers, scalar string/number options, and string/number arrays.

Extend `formConfig.test.ts` with one fixture proving a legacy-hidden field remains in the existing payload:

```ts
it("retains legacy-hidden fields in the submission payload", () => {
  const form: FormComponentConfig = {
    schemaName: "orders",
    fields: [{
      formKey: "internalNote",
      type: "text",
      isDisabled: true,
    }],
  };

  expect(buildFormSubmitRequestBody(form, {
    internalNote: "retained",
  })).toEqual({ internalNote: "retained" });
});
```

- [ ] **Step 4: Verify compatibility helpers**

Run:

```bash
yarn test src/components/forms/dynamicFieldAdapter.test.ts src/utils/formConfig.test.ts
yarn build
```

Expected: PASS with no schema or payload change.

- [ ] **Step 5: Commit compatibility characterization**

```bash
git add src/components/forms/dynamicFieldAdapter.ts src/components/forms/dynamicFieldAdapter.test.ts src/utils/formConfig.test.ts
git commit -m "test: lock dynamic form compatibility semantics"
```

---

### Task 3: Establish semantic design tokens and class composition

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/forms.css`
- Create: `src/utils/cn.ts`
- Create: `src/utils/cn.test.ts`
- Modify: `src/index.css`
- Modify: `tailwind.config.js`

**Interfaces:**
- Produces: `cn(...inputs: ClassValue[]): string`.
- Produces: semantic Tailwind colors `ui-page`, `ui-surface`, `ui-surface-subtle`, `ui-foreground`, `ui-muted`, `ui-placeholder`, `ui-border`, `ui-border-hover`, `ui-primary`, `ui-primary-hover`, `ui-focus`, `ui-danger`, `ui-danger-subtle`, `ui-success`, and `ui-disabled`.
- Produces: CSS variables and reusable `.ui-control`, `.ui-control-invalid`, and `.ui-focus-ring` component-layer recipes.

- [ ] **Step 1: Write the failing `cn` test**

Create `src/utils/cn.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("joins conditional classes and lets the last Tailwind class win", () => {
    expect(cn("px-2 text-sm", false && "hidden", "px-4")).toBe(
      "text-sm px-4",
    );
  });
});
```

Run: `yarn test src/utils/cn.test.ts`

Expected: FAIL because `cn` does not exist.

- [ ] **Step 2: Implement `cn`**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

Run: `yarn test src/utils/cn.test.ts`

Expected: PASS.

- [ ] **Step 3: Add the approved semantic token file**

Create `src/styles/tokens.css` with the complete spec values:

```css
:root {
  --ui-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  --ui-page: 0 0% 98%;
  --ui-surface: 0 0% 100%;
  --ui-surface-subtle: 210 20% 98%;
  --ui-foreground: 222 47% 11%;
  --ui-muted-foreground: 215 16% 40%;
  --ui-placeholder: 215 14% 58%;
  --ui-border: 214 24% 88%;
  --ui-border-hover: 215 20% 72%;
  --ui-primary: 201 90% 40%;
  --ui-primary-hover: 201 90% 34%;
  --ui-focus: 201 96% 45%;
  --ui-danger: 0 72% 51%;
  --ui-danger-subtle: 0 86% 97%;
  --ui-success: 158 64% 36%;
  --ui-disabled: 210 20% 97%;
  --ui-overlay: 222 47% 11%;
  --ui-radius-sm: 0.375rem;
  --ui-radius-md: 0.5rem;
  --ui-radius-lg: 0.75rem;
  --ui-control-sm: 2rem;
  --ui-control-md: 2.5rem;
  --ui-control-lg: 2.75rem;
  --ui-shadow-sm: 0 1px 2px rgb(15 23 42 / 0.05);
  --ui-shadow-dialog: 0 24px 64px rgb(15 23 42 / 0.18);
}
```

The repository does not contain the WOFF2 files referenced by the current generated `@font-face` CSS. For this phase, use the approved system fallback in `--ui-font-sans`, remove only the broken generated `@font-face` rules and `.__className_a182b8` rule from `src/index.css`, and retain the OFL notice for future verified font assets. Do not download or add unverified font binaries.

- [ ] **Step 4: Map tokens into Tailwind and shared form CSS**

Extend `tailwind.config.js` using this mapping and preserve existing names used by unrelated pages:

Add these exact entries inside the existing `theme.extend.colors` object:

```js
  "ui-page": "hsl(var(--ui-page) / <alpha-value>)",
  "ui-surface": "hsl(var(--ui-surface) / <alpha-value>)",
  "ui-surface-subtle": "hsl(var(--ui-surface-subtle) / <alpha-value>)",
  "ui-foreground": "hsl(var(--ui-foreground) / <alpha-value>)",
  "ui-muted": "hsl(var(--ui-muted-foreground) / <alpha-value>)",
  "ui-placeholder": "hsl(var(--ui-placeholder) / <alpha-value>)",
  "ui-border": "hsl(var(--ui-border) / <alpha-value>)",
  "ui-border-hover": "hsl(var(--ui-border-hover) / <alpha-value>)",
  "ui-primary": "hsl(var(--ui-primary) / <alpha-value>)",
  "ui-primary-hover": "hsl(var(--ui-primary-hover) / <alpha-value>)",
  "ui-focus": "hsl(var(--ui-focus) / <alpha-value>)",
  "ui-danger": "hsl(var(--ui-danger) / <alpha-value>)",
  "ui-danger-subtle": "hsl(var(--ui-danger-subtle) / <alpha-value>)",
  "ui-success": "hsl(var(--ui-success) / <alpha-value>)",
  "ui-disabled": "hsl(var(--ui-disabled) / <alpha-value>)",
```

Add these exact entries to the corresponding existing `theme.extend` objects:

```js
fontFamily: {
  ui: ["var(--ui-font-sans)"],
},
borderRadius: {
  "ui-sm": "var(--ui-radius-sm)",
  "ui-md": "var(--ui-radius-md)",
  "ui-lg": "var(--ui-radius-lg)",
},
height: {
  "ui-sm": "var(--ui-control-sm)",
  "ui-md": "var(--ui-control-md)",
  "ui-lg": "var(--ui-control-lg)",
},
boxShadow: {
  "ui-sm": "var(--ui-shadow-sm)",
  "ui-dialog": "var(--ui-shadow-dialog)",
},
```

Create `src/styles/forms.css`:

```css
@layer components {
  .ui-control {
    @apply h-ui-md w-full rounded-ui-md border border-ui-border bg-ui-surface
      px-3 text-sm text-ui-foreground outline-none transition-colors
      placeholder:text-ui-placeholder hover:border-ui-border-hover
      focus-visible:border-ui-focus focus-visible:ring-[3px]
      focus-visible:ring-ui-focus/20 disabled:cursor-not-allowed
      disabled:bg-ui-disabled disabled:text-ui-muted;
  }

  .ui-control-invalid {
    @apply border-ui-danger focus-visible:border-ui-danger
      focus-visible:ring-ui-danger/20;
  }

  .ui-focus-ring {
    @apply outline-none focus-visible:ring-[3px] focus-visible:ring-ui-focus/20;
  }
}
```

Import `tokens.css` and `forms.css` from `src/index.css`. Replace the deprecated `@variants responsive` wrapper with normal rules inside `@layer utilities` without changing utility behavior.

- [ ] **Step 5: Verify tokens are scoped and builds remain stable**

Run:

```bash
yarn test src/utils/cn.test.ts
yarn build
git diff --check
```

Expected: PASS; unresolved font warnings are gone; unrelated component classes remain available.

- [ ] **Step 6: Commit the token foundation**

```bash
git add src/styles src/utils/cn.ts src/utils/cn.test.ts src/index.css tailwind.config.js
git commit -m "feat: establish tenant form design tokens"
```

---

### Task 4: Build schema-free UI primitives and public exports

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/checkbox.tsx`
- Create: `src/components/ui/input.tsx`
- Create: `src/components/ui/label.tsx`
- Create: `src/components/ui/textarea.tsx`
- Create: `src/components/ui/ui-primitives.test.tsx`
- Create: `src/components/ui/index.ts`
- Modify: `src/components/index.ts`

**Interfaces:**
- Produces: `Button`, `ButtonProps`, `ButtonVariant`, `ButtonSize`, `Input`, `InputProps`, `Textarea`, `TextareaProps`, `Checkbox`, `CheckboxProps`, and `Label`.
- All primitives forward refs and native attributes.
- No primitive renders field presentation or imports AutoTable-specific modules.

- [ ] **Step 1: Write failing primitive accessibility tests**

Create `ui-primitives.test.tsx` with `// @vitest-environment jsdom` and assertions for:

```tsx
it("forwards input state and refs", () => {
  const ref = createRef<HTMLInputElement>();
  render(<Input ref={ref} aria-label="Name" invalid disabled />);
  expect(screen.getByRole("textbox", { name: "Name" })).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  expect(ref.current).toBe(screen.getByRole("textbox"));
});

it("makes a loading button busy and non-interactive", () => {
  render(<Button loading>Save</Button>);
  expect(screen.getByRole("button", { name: /save/i })).toBeDisabled();
  expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
});

it("keeps checkbox semantics native", () => {
  render(<Checkbox aria-label="Enabled" checked readOnly />);
  expect(screen.getByRole("checkbox", { name: "Enabled" })).toBeChecked();
});
```

Run: `yarn test src/components/ui/ui-primitives.test.tsx`

Expected: FAIL because the primitives do not exist.

- [ ] **Step 2: Implement Input, Textarea, Checkbox, and Label**

Each component uses `forwardRef`, `cn`, and the shared `.ui-control` recipe. `invalid` maps to `aria-invalid` and `.ui-control-invalid`. Use this exact pattern for Input and the equivalent native-element pattern for Textarea, Checkbox, and Label:

```tsx
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid = false, ...props }, ref) => (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn("ui-control", invalid && "ui-control-invalid", className)}
      {...props}
    />
  ),
);
Input.displayName = "Input";
```

Checkbox renders `<input type="checkbox">`; Label renders `<label>` and forwards `htmlFor`. Do not add wrapper markup to UI primitives.

Do not implement clear buttons, labels, descriptions, schema validation, or value conversion in these files.

- [ ] **Step 3: Implement Button**

Use the exact shared contract from the spec. Preserve button width while loading, render a decorative spinner with `aria-hidden`, set `aria-busy`, and leave the text content present for the accessible name. Variants are `primary`, `secondary`, `outline`, `ghost`, `destructive`, and `icon`; sizes are `sm`, `md`, and `lg`. Keep the variant/size maps data-only:

```tsx
const variants: Record<ButtonVariant, string> = {
  primary: "border-transparent bg-ui-primary text-white hover:bg-ui-primary-hover",
  secondary: "border-transparent bg-ui-surface-subtle text-ui-foreground hover:bg-ui-disabled",
  outline: "border-ui-border bg-ui-surface text-ui-foreground hover:border-ui-border-hover",
  ghost: "border-transparent bg-transparent text-ui-foreground hover:bg-ui-surface-subtle",
  destructive: "border-transparent bg-ui-danger text-white hover:bg-ui-danger/90",
  icon: "border-transparent bg-transparent text-ui-muted hover:bg-ui-surface-subtle hover:text-ui-foreground",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-ui-sm rounded-ui-sm px-3 text-sm",
  md: "h-ui-md rounded-ui-md px-4 text-sm",
  lg: "h-ui-lg rounded-ui-md px-5 text-sm",
};
```

- [ ] **Step 4: Add centralized exports**

Create `src/components/ui/index.ts` and add `export * from "./ui";` to `src/components/index.ts`. Do not export test helpers.

- [ ] **Step 5: Verify primitives**

Run:

```bash
yarn test src/components/ui/ui-primitives.test.tsx
yarn build
```

Expected: PASS.

- [ ] **Step 6: Commit primitives**

```bash
git add src/components/ui src/components/index.ts
git commit -m "feat: add shared form UI primitives"
```

---

### Task 5: Build FieldShell and controlled native field components

**Files:**
- Create: `src/components/form-fields/field.types.ts`
- Create: `src/components/form-fields/field-shell.tsx`
- Create: `src/components/form-fields/text-field.tsx`
- Create: `src/components/form-fields/number-field.tsx`
- Create: `src/components/form-fields/checkbox-field.tsx`
- Create: `src/components/form-fields/textarea-field.tsx`
- Create: `src/components/form-fields/file-field.tsx`
- Create: `src/components/form-fields/form-fields.test.tsx`
- Create: `src/components/form-fields/index.ts`
- Modify: `src/components/index.ts`

**Interfaces:**
- Produces: `FieldPresentationProps`, `FieldControlAccessibility`, `FieldShell`, `TextField`, `NumberField`, `CheckboxField`, `TextareaField`, and `FileField`.
- `FieldShell` render prop signature is `(accessibility: FieldControlAccessibility) => React.ReactNode`.
- All value-bearing fields are controlled and immediately reflect external `value` changes.

- [ ] **Step 1: Write failing FieldShell accessibility tests**

Cover stable explicit IDs, generated IDs, required text, description/error composition, and invalid announcements:

```tsx
render(
  <TextField
    id="customer-name"
    name="name"
    label="Customer name"
    description="Shown on the invoice"
    error="Name is required"
    required
    value=""
    onChange={() => undefined}
  />,
);

const control = screen.getByRole("textbox", { name: /customer name/i });
expect(control).toHaveAttribute("id", "customer-name");
expect(control).toHaveAttribute("aria-invalid", "true");
expect(control.getAttribute("aria-describedby")).toBe(
  "customer-name-description customer-name-error",
);
expect(screen.getByText("Name is required")).toHaveAttribute(
  "id",
  "customer-name-error",
);
```

Run: `yarn test src/components/form-fields/form-fields.test.tsx`

Expected: FAIL because the field layer does not exist.

- [ ] **Step 2: Implement the shared field contract and FieldShell**

Use the exact spec interfaces and this render-prop boundary:

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

export interface FieldShellProps extends FieldPresentationProps {
  children: (accessibility: FieldControlAccessibility) => React.ReactNode;
}
```

Sanitize `useId()` only for DOM IDs, not for schema names. `FieldShell` renders label, visually marked required state plus screen-reader text, description, error, and control slot. Use `aria-live="polite"` for persistent errors; do not set `role="alert"` on initial render.

- [ ] **Step 3: Implement controlled text, textarea, and checkbox fields**

Text/password fields may own only password-visibility display state. They must never copy `value` into unsynchronized local state. Checkbox uses the native primitive and makes the label row clickable.

Add a rerender regression test:

```tsx
const { rerender } = render(
  <TextField name="name" label="Name" value="before" onChange={onChange} />,
);
rerender(
  <TextField name="name" label="Name" value="after" onChange={onChange} />,
);
expect(screen.getByRole("textbox", { name: "Name" })).toHaveValue("after");
```

- [ ] **Step 4: Implement number behavior without changing values**

Preserve empty-string editing, min/max clamping, optional step buttons, wheel blur behavior, and `number | "" | null` presentation. Step buttons have explicit accessible names (`Decrease <label>` and `Increase <label>`) and are disabled for read-only/disabled fields.

- [ ] **Step 5: Implement FileField**

Keep the actual `<input type="file">` keyboard reachable. Show accepted type guidance, selected filename, and a remove button. Emit the selected `File` or `null`; never convert to Base64 or URL in the field component.

Test with:

```tsx
const file = new File(["image"], "avatar.png", { type: "image/png" });
await user.upload(screen.getByLabelText("Image"), file);
expect(onChange).toHaveBeenCalledWith(file);
```

- [ ] **Step 6: Add exports and verify**

Export the field contract/components from `src/components/form-fields/index.ts` and add `export * from "./form-fields";` to the central component index.

Run:

```bash
yarn test src/components/form-fields/form-fields.test.tsx
yarn build
```

Expected: PASS.

- [ ] **Step 7: Commit native fields**

```bash
git add src/components/form-fields src/components/index.ts
git commit -m "feat: add accessible shared form fields"
```

---

### Task 6: Wrap color and date/time fields without changing formats

**Files:**
- Create: `src/components/form-fields/color-field.tsx`
- Create: `src/components/form-fields/date-field.tsx`
- Create: `src/components/form-fields/time-field.tsx`
- Create: `src/components/form-fields/month-year-field.tsx`
- Create: `src/components/form-fields/temporal-color-fields.test.tsx`
- Modify: `src/components/form-fields/index.ts`
- Modify: `src/components/panelComponents/FormElements/DateInput.tsx`
- Modify: `src/components/panelComponents/FormElements/HourInput.tsx`
- Modify: `src/components/panelComponents/FormElements/MonthYearInput.tsx`

**Interfaces:**
- Produces: `ColorField`, `DateField`, `TimeField`, and `MonthYearField` using `FieldPresentationProps`.
- Date emits `string | null` in `YYYY-MM-DD`; dynamic adapter later converts clear to the existing empty string.
- `TimeField` accepts `variant?: "native" | "segmented"`; `InputTypes.TIME` uses `native` and `InputTypes.HOUR` uses `segmented` through the existing hour/minute selectors.
- Native time, segmented hour, and month-year wrappers emit exactly the current control strings.
- Color emits the existing hex string and retains the SketchPicker interaction.

- [ ] **Step 1: Write failing format and error-wiring tests**

Use jsdom tests to assert:

- external date value `2026-09-22` renders `09/22/2026`;
- entering/selecting a valid date emits `2026-09-22`;
- clearing emits `null`;
- the date input receives the FieldShell ID and `aria-describedby`;
- hour/month-year callbacks preserve current string output; and
- color selection/clear callbacks preserve hex-string/empty-string output.

Run: `yarn test src/components/form-fields/temporal-color-fields.test.tsx`

Expected: FAIL because wrappers and accessibility passthrough props do not exist.

- [ ] **Step 2: Add accessibility passthrough to existing temporal controls**

Add optional `id`, `name`, `aria-describedby`, `aria-invalid`, `className`, and `hideLabel` props to DateInput/HourInput/MonthYearInput. When `hideLabel` is true, render only the control portion so `FieldShell` is the sole label/error owner. Preserve all parsing, portal, arrow, clear, read-only, and debounce behavior.

Replace `HourInput`'s unsynchronized `useState(value)` copies with values derived from the current prop:

```ts
const [selectedHour = "00", selectedMinute = "00"] =
  typeof value === "string" ? value.split(":") : [];

const handleHourChange = (hour: string) =>
  onChange(`${hour}:${selectedMinute}`);
const handleMinuteChange = (minute: string) =>
  onChange(`${selectedHour}:${minute}`);
```

This is required for dependent-field invalidation to update the visible segmented time without remounting.

Do not migrate unrelated legacy call sites; defaults reproduce existing rendering.

- [ ] **Step 3: Implement FieldShell wrappers**

The wrappers pass FieldShell IDs and ARIA values to the existing specialized controls. They translate only the clear callback needed by their public contract; they do not change stored formats.

`ColorField` may reuse `SketchPicker` directly but must place it behind a focusable trigger/popover region, render the current hex value, and expose an accessible clear action. Do not add a new color dependency.

- [ ] **Step 4: Verify specialized fields**

Run:

```bash
yarn test src/components/form-fields/temporal-color-fields.test.tsx
yarn test src/utils/datePickerPosition.test.ts
yarn build
```

Expected: PASS and legacy props still type-check.

- [ ] **Step 5: Commit specialized fields**

```bash
git add src/components/form-fields src/components/panelComponents/FormElements/DateInput.tsx src/components/panelComponents/FormElements/HourInput.tsx src/components/panelComponents/FormElements/MonthYearInput.tsx
git commit -m "feat: add shared date time and color fields"
```

---

### Task 7: Build the React Select field adapter and tokenized styles

**Files:**
- Create: `src/components/form-fields/select-field.tsx`
- Create: `src/components/form-fields/select-field.test.tsx`
- Create: `src/components/form-fields/selectStyles.ts`
- Modify: `src/components/form-fields/index.ts`
- Modify: `src/components/panelComponents/FormElements/SelectOptionContent.tsx`

**Interfaces:**
- Produces: `SelectField` and `getSelectStyles(invalid: boolean)`.
- Consumes and emits `OptionType | readonly OptionType[] | null`; the dynamic adapter owns scalar/array conversion.
- Preserves single/multiple selection, suggestions, normalized search, sorting, clear behavior, source-item/custom display, and single-option auto-fill.

- [ ] **Step 1: Write failing select interaction tests**

Cover:

```tsx
it("emits the original numeric option value without coercion", async () => {
  const onChange = vi.fn();
  render(
    <SelectField
      name="quantity"
      label="Quantity"
      value={null}
      options={[{ value: 1, label: "One" }]}
      onChange={onChange}
      autoFillSingleOption={false}
    />,
  );
  await user.click(screen.getByRole("combobox", { name: "Quantity" }));
  await user.click(screen.getByText("One"));
  expect(onChange).toHaveBeenCalledWith({ value: 1, label: "One" });
});
```

Also test multiple values, clear, one-option auto-fill, Turkish-character normalized search, disabled/read-only state, description/error IDs, suggestion selection, and custom left/right option labels.

Run: `yarn test src/components/form-fields/select-field.test.tsx`

Expected: FAIL because `SelectField` does not exist.

- [ ] **Step 2: Extract tokenized React Select styles**

Build `getSelectStyles` with React Select's typed `StylesConfig<OptionType, boolean>`. Use CSS variable values, not hex literals:

```ts
export const getSelectStyles = (
  invalid: boolean,
): StylesConfig<OptionType, boolean> => ({
  control: (base, state) => ({
    ...base,
    minHeight: "var(--ui-control-md)",
    borderColor: invalid
      ? "hsl(var(--ui-danger))"
      : state.isFocused
        ? "hsl(var(--ui-focus))"
        : "hsl(var(--ui-border))",
    borderRadius: "var(--ui-radius-md)",
    boxShadow: state.isFocused
      ? `0 0 0 3px hsl(var(${invalid ? "--ui-danger" : "--ui-focus"}) / 0.2)`
      : "none",
    fontSize: "0.875rem",
  }),
  menu: (base) => ({ ...base, zIndex: 60 }),
  menuPortal: (base) => ({ ...base, zIndex: 60 }),
});
```

- [ ] **Step 3: Implement SelectField**

Move reusable behavior from the legacy `SelectInput` into the new focused component without deleting or redirecting the legacy component. Reuse `SelectOptionContent`. FieldShell owns label/error presentation; React Select receives `inputId`, `aria-describedby`, `aria-invalid`, and the accessible name association.

The new component must not know schema names, relation query paths, invalidation keys, or form-state storage formats.

- [ ] **Step 4: Verify select behavior**

Run:

```bash
yarn test src/components/form-fields/select-field.test.tsx src/components/panelComponents/FormElements/SelectOptionContent.test.ts
yarn build
```

Expected: PASS.

- [ ] **Step 5: Commit SelectField**

```bash
git add src/components/form-fields/select-field.tsx src/components/form-fields/select-field.test.tsx src/components/form-fields/selectStyles.ts src/components/form-fields/index.ts src/components/panelComponents/FormElements/SelectOptionContent.tsx
git commit -m "feat: add shared relation select field"
```

---

### Task 8: Integrate shared fields into DynamicForm without engine changes

**Files:**
- Modify: `src/components/forms/DynamicFormField.tsx`
- Modify: `src/components/forms/DynamicForm.tsx`
- Modify: `src/components/forms/DynamicFormObjectList.tsx`
- Modify: `src/components/forms/DynamicFormSummary.tsx`
- Create: `src/components/forms/DynamicFormField.test.tsx`
- Create: `src/components/forms/DynamicForm.integration.test.tsx`
- Create: `src/components/forms/index.ts`
- Modify: `src/components/index.ts`
- Modify: `src/pages/PagePreviewPage.tsx`

**Interfaces:**
- Consumes: all `form-fields` public exports and Task 2 adapter helpers.
- Produces: the existing `DynamicForm` public props unchanged: `{ form, title?, componentId? }`.
- Produces: `DynamicForm` exported from `src/components/forms/index.ts` and `src/components/index.ts`.
- Does not change `FormComponentConfig`, `useFormSelectionData`, `useDynamicCrud`, form calculation helpers, or payload builders.

- [ ] **Step 1: Write failing DynamicFormField dispatch tests**

Create a jsdom parameterized test that renders `DynamicFormField` for every supported `InputTypes` value used by `FormFieldConfig`: text, password, number, color, checkbox, textarea, image, date, time/hour, month-year, select single, and select multiple.

Assert each control has the supplied label, error association, required state, current value, and exact callback value. Include an external rerender after dependent invalidation and verify the displayed value changes without changing the React `key`.

Run: `yarn test src/components/forms/DynamicFormField.test.tsx`

Expected: FAIL because the current renderer still uses legacy controls and inline branches.

- [ ] **Step 2: Rewrite DynamicFormField as narrow dispatch**

Use `getDynamicFieldValue`, `getSelectedOptions`, and `getSelectFormValue`. Each branch renders one focused field component. Keep callback shape `(key, value)` unchanged.

Examples:

```tsx
if (input.type === InputTypes.SELECT) {
  return (
    <SelectField
      name={input.formKey}
      label={label}
      value={getSelectedOptions(input, value)}
      options={input.options || []}
      multiple={Boolean(input.isMultiple)}
      required={input.required}
      error={error}
      onChange={(selected) =>
        onChange(input.formKey, getSelectFormValue(input, selected))
      }
    />
  );
}
```

Remove the inline textarea and file markup. Do not import legacy `TextInput` or `SelectInput` from `DynamicFormField` after this step.

- [ ] **Step 3: Write failing DynamicForm integration tests**

Mock only external boundaries:

- `useFormSelectionData` returns deterministic relation source items;
- `useDynamicCrud` returns `vi.fn()` mutation methods and controllable `isPending` values;
- `react-toastify` records success/error calls; and
- translation returns the input key.

Use a representative fixture with all field types, `requiredCondition`, `disabledCondition`, relation filtering/invalidation, object-list mapping/calculation, summary, and submit configuration.

Test:

1. a matching legacy disabled condition hides its field;
2. hidden values remain in the create payload;
3. validation produces inline errors and the summary toast;
4. changing the parent relation resets and visually clears the dependent select;
5. adding/editing/removing an object-list item preserves calculations;
6. create submission receives the existing object payload;
7. create-many receives the existing array body;
8. workflow receives the existing envelope and `formConfigRef`;
9. successful submission resets visible state; and
10. pending mutation disables submit with `aria-busy="true"`.

Run: `yarn test src/components/forms/DynamicForm.integration.test.tsx`

Expected: FAIL on the new accessibility and shared-field assertions before integration changes.

- [ ] **Step 4: Replace visibility/required duplication with the resolver**

In `DynamicForm`, compute resolved state from Task 2. Preserve current hidden behavior:

```ts
const resolvedFieldStates = useMemo(
  () => new Map(
    inputs.map((input) => [
      input.formKey,
      resolveDynamicFieldState(input, formElements),
    ]),
  ),
  [inputs, formElements],
);

const isInputVisible = (input: GenericInputType) =>
  !resolvedFieldStates.get(input.formKey)?.hidden;
```

Pass only the resolved `required` property to `DynamicFormField`. Do not clear hidden values or remove them from validation/submission.

- [ ] **Step 5: Apply the approved section and responsive design**

Update `DynamicForm`, object-list, and summary markup to consume semantic tokens:

- max-width 1200px container;
- 24px desktop / 16px mobile section padding;
- 12px section radius and token border;
- 20px desktop / 16px mobile grid gaps;
- one column below `md`, half widths at `md`, thirds/layout columns at `lg`;
- subtle action footer surface; and
- tokenized focus/empty/error states.

Keep every area/action placement decision and object-list callback unchanged.

- [ ] **Step 6: Centralize imports**

Create `src/components/forms/index.ts`, export it from `src/components/index.ts`, and change `PagePreviewPage` to import `DynamicForm` from the public component API. Internal form files may use the nearest package index only when it does not create an import cycle.

- [ ] **Step 7: Verify the complete representative form**

Run:

```bash
yarn test src/components/forms/DynamicFormField.test.tsx src/components/forms/DynamicForm.integration.test.tsx src/components/forms/DynamicFormObjectList.test.ts src/utils/formConfig.test.ts src/utils/formCalculations.test.ts
yarn test
yarn build
```

Expected: all focused and repository tests pass; build exits 0; payload assertions match pre-change behavior.

- [ ] **Step 8: Commit the representative integration**

```bash
git add src/components/forms src/components/index.ts src/pages/PagePreviewPage.tsx
git commit -m "feat: modernize schema driven tenant forms"
```

---

### Task 9: Perform visual, accessibility, license, and scope verification

**Files:**
- Create: `docs/tenant-form-ui-review.md`
- Modify: files introduced or changed by Tasks 1–8 only when a recorded verification failure identifies an in-scope defect

**Interfaces:**
- Produces: a review record with desktop/mobile screenshots, test commands, keyboard results, known warnings, dependency/license inventory, and an explicit approval checklist.
- Does not authorize or begin legacy form migration.

- [ ] **Step 1: Start the tenant panel and open a representative configured form**

Run: `yarn dev`

Use the existing customer-created `DynamicForm` page that contains the broadest field coverage. Exercise missing field/state combinations through the Task 8 integration fixture; do not add a fixture route, persist demo schemas, or create production data solely for review.

- [ ] **Step 2: Capture desktop and mobile evidence**

Capture screenshots at:

- 1440×900 desktop;
- 1024×768 tablet/desktop;
- 390×844 mobile; and
- 320×568 narrow mobile.

Record paths in `docs/tenant-form-ui-review.md`. Verify section geometry, 40px controls, label/error spacing, focus rings, React Select parity, object-list layout, footer actions, wrapping, and absence of horizontal scrolling.

- [ ] **Step 3: Perform keyboard and state checks**

Document pass/fail for:

- sequential Tab/Shift+Tab order;
- label activation;
- checkbox toggle;
- select open/search/select/clear;
- date open/select/clear;
- password reveal;
- number step buttons;
- file choose/remove;
- inline validation announcement;
- visible focus at every step;
- pending submit behavior; and
- `prefers-reduced-motion` behavior.

- [ ] **Step 4: Verify responsive and compatibility acceptance**

Check every desktop/mobile/state criterion in spec sections 11 and 12. Compare create, create-many, and workflow request bodies against integration-test snapshots or intercepted request data. Confirm `isDisabled` and matching `disabledCondition` still hide current customer fields.

- [ ] **Step 5: Audit dependency and license scope**

Run:

```bash
yarn why clsx
yarn why tailwind-merge
yarn why @testing-library/react
yarn why jsdom
git diff 982c8d1..HEAD -- package.json yarn.lock
```

Confirm no Radix, form-state framework, or unrelated UI framework was introduced. Verify each declared notice file contains the complete upstream text and that application code imports only declared dependencies.

- [ ] **Step 6: Run final automated verification**

Run:

```bash
yarn test
yarn build
yarn lint
git diff --check
git status --short
```

Expected: tests and build pass, lint exits 0 with no new warnings beyond the six recorded baseline `react-refresh/only-export-components` warnings, and the whitespace check passes. The worktree may contain only the review document and deliberately uncommitted screenshot artifacts before the final commit.

- [ ] **Step 7: Write the review record**

`docs/tenant-form-ui-review.md` must contain:

```markdown
# Tenant Form UI Representative Review

## Build and test evidence
## Desktop acceptance
## Mobile acceptance
## Keyboard and accessibility checks
## Compatibility and payload checks
## Dependency and license audit
## Known warnings outside this scope
## Approval gate

Legacy form migration has not started. Approval of this representative result is required before a separate legacy migration plan is written.
```

- [ ] **Step 8: Commit verification evidence**

```bash
git add docs/tenant-form-ui-review.md
git commit -m "docs: record tenant form UI verification"
```

Do not begin `GenericAddEditPanel` migration after this commit. Present the representative result for user review.
