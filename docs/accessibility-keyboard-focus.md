# Keyboard & Focus Behavior: Dialogs and Page Designer

This document specifies the expected keyboard navigation, focus containment, and screen-reader semantics for modal dialogs and the Page Designer workspace in `tenantPanel`.

## 1. Modal Dialogs (`useModalFocus` and `WorkspaceDialog`)

Source:
- `src/hooks/useModalFocus.ts`
- `src/components/ui/workspace-dialog.tsx`
- `src/components/PageDesigner/ComponentModal.tsx`

### Semantics & Layering
- Every modal renders into `document.body` via `createPortal` with `role="dialog"`, `aria-modal="true"`, `tabIndex={-1}`, and `aria-labelledby` pointing to its heading (`aria-describedby` when a description is present).
- Nested dialogs declare `data-modal-layer` (`"50"` for base dialogs, `"60"` for nested dialogs). `useModalFocus` maintains a registry of open dialogs and assigns monotonically increasing `z-index` values so the topmost dialog always receives keyboard and pointer priority.
- Background isolation: when any dialog is open, `document.body.style.overflow` is locked to `"hidden"` and all sibling branches outside the topmost dialog receive the `inert` attribute (excluding a drawer's own `[data-modal-backdrop-for]` element). Existing `inert` attributes are tracked and preserved on restore.

### Focus Lifecycle
1. **On open:** `useModalFocus` captures `document.activeElement` as the opener. On the next animation frame, if focus is not already inside the topmost dialog, focus moves with `{ preventScroll: true }` to:
   - `initialFocusRef.current` (if provided; `WorkspaceDialog` defaults to its close button), otherwise
   - the first tabbable element inside the dialog, otherwise
   - the dialog container itself (`tabIndex={-1}`).
2. **While open (focus trap):**
   - `Tab` from the last focusable element wraps to the first focusable element.
   - `Shift+Tab` from the first focusable element wraps to the last focusable element.
   - If focus somehow lands outside the dialog, `Tab` / `Shift+Tab` pulls it back to the first or last control.
   - If the dialog contains no focusable controls, `Tab` keeps focus on the dialog container.
   - Focusable elements exclude disabled controls, `hidden`/`inert`/`aria-hidden="true"` subtrees, `input[type="hidden"]`, and `display: none` / `visibility: hidden` elements.
3. **Dismissal:**
   - `Escape` closes **only** the topmost dialog (`topDialog() === dialog`), calling `event.preventDefault()` and `event.stopPropagation()`.
   - Clicking the backdrop (`event.target === event.currentTarget` on `onMouseDown`) closes `WorkspaceDialog`.
4. **On close (focus restoration):**
   - Isolation (`inert`) and body scroll lock are recomputed for the next dialog in the stack (or cleared if none remain).
   - If the captured opener is still connected, not `inert`, and belongs to the now-active dialog (or no dialog is active), focus returns to the opener with `{ preventScroll: true }`.
   - Otherwise, if another dialog remains open beneath it and focus is outside that dialog, focus moves to the first focusable control in the underlying dialog.

## 2. Page Designer (`PageDesigner`, `SectionEditor`, `CellEditor`, `ComponentModal`)

Source:
- `src/components/PageDesigner/PageDesigner.tsx`
- `src/components/PageDesigner/SectionEditor.tsx`
- `src/components/PageDesigner/SectionOrderControls.tsx`
- `src/components/PageDesigner/CellEditor.tsx`
- `src/components/PageDesigner/ComponentModal.tsx`
- `src/components/PageDesigner/EditorSectionTabs.tsx`

### Section Reordering (Keyboard-Accessible Alternative to Drag-and-Drop)
- Every grid and visual section exposes `SectionOrderControls` inside a `role="group"` (`aria-label="Section N order"`):
  - **Move section N up** (`<button type="button">`, disabled at index `0`).
  - **Move section N down** (`<button type="button">`, disabled at the last index).
- Buttons render visible `focus-visible:ring-2` indicators and operate purely via `Enter` / `Space`, ensuring full parity with pointer-based reordering.

### Section & Cell Editing
- Expanding/collapsing sections, changing column spans, adding/removing cells, and opening the component editor or page filter modal all use native `<button type="button">` elements so `Tab`, `Enter`, and `Space` work predictably.
- Editing a component in a cell opens `ComponentModal`, which uses `useModalFocus` for full focus trapping, `inert` background isolation, `Escape` dismissal, and opener focus restoration.
- Opening the nested Excel upload modal from inside `ComponentModal` stacks as a nested dialog; closing it returns focus to the triggering control inside `ComponentModal`.

### Configuration Tabs (`EditorSectionTabs` / `Tabs`)
- Component and field configuration panels group controls using the shared `Tabs` primitive (`role="tablist"`, `role="tab"`, `role="tabpanel"` with `aria-label`).
- Switching tabs preserves keyboard focus on the tablist and updates the associated `TabsContent` panel.

### Accessibility Rules & Ongoing Remediation
- Form labels must be programmatically associated with their controls (`htmlFor`/`id` or wrapping a single control) to satisfy `jsx-a11y/label-has-associated-control` and axe `label` checks.
- Interactive elements must use native `<button>` / `<a>` rather than clickable `<div>` / `<span>` (`jsx-a11y/no-static-element-interactions`, `jsx-a11y/click-events-have-key-events`).
- Custom inputs should use the shared primitives in `src/components/ui` (`Input`, `Select`, `Textarea`, `Checkbox`), enforced by ESLint's `no-restricted-syntax` rule.
