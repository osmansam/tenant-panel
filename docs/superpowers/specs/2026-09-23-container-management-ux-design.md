# Container Management UX Design

**Date:** 2026-09-23

**Status:** Proposed for user review

**Representative workflow:** Open project → find container → inspect or manage it → find and edit a field → inspect container data

## 1. Purpose

Make the existing developer-facing container workflow easier to navigate without replacing its APIs or moving container management into a new information architecture.

This is the corrected representative tenant-panel slice. It builds on the shared design tokens and UI primitives already implemented, but it targets the screens developers actually use in `ProjectManagementPage`:

1. the container collection on the project-management page;
2. container row actions;
3. the container details/management dialog;
4. field discovery inside that dialog;
5. the add/edit field dialog; and
6. a read-only container-data viewer.

The work does not redesign Page Designer, Pages, Audit Logs, authentication, or unrelated tenant-panel routes.

## 2. Confirmed current problems

- `ContainersSection` renders every container in one unpaginated vertical list. Forty containers produce an unnecessarily long page.
- There is no container search.
- The row-level **Edit** and **View Data** actions contain only `console.log` placeholders, so only **Details** performs an action.
- `ContainerDetailsModal` is wide but does not use a stable viewport-height layout with separately controlled header, body, and footer regions.
- The field list inside the container dialog has no search.
- `AddFieldModal` is constrained to `sm:max-w-2xl`, and its scrolling form region is constrained to `max-h-96`.
- `TextInput` copies its initial `value` into local state and does not synchronize later prop changes. When `editField` populates after the input mounts, the field-name prop changes but the visible input can remain empty.
- Field configuration is presented as one long stream instead of clear basic, validation, relationship, nested-field, and advanced sections.

## 3. User and usability principles

The primary user is a developer. The interface keeps accurate terminology such as container, schema, field, route, pipeline, workflow, Object ID, and population settings.

The panel should reduce navigation and visual friction rather than hide technical capability:

- searchable collections instead of scanning long lists;
- stable pagination instead of an indefinitely growing page;
- explicit working actions instead of inert controls;
- large work surfaces for dense technical configuration;
- grouped settings with clear headings;
- visible context, especially the container and field currently being edited;
- responsive layouts that remain usable on laptop-sized screens; and
- preservation of existing values, validation, API payloads, and update behavior.

## 4. Container list design

### 4.1 Search

The Containers header gains a search group containing:

- a search input labeled accessibly as **Search containers**;
- an explicit **Search** button;
- Enter-key submission; and
- a clear action when a query is active.

Matching is case-insensitive and checks:

- schema name;
- collection name; and
- container ID.

Search is client-side because the current `useContainers` contract loads the project's complete container array. No backend API change is introduced in this slice.

The applied search term, not every keystroke, controls the result set. Applying or clearing a search resets pagination to page 1.

### 4.2 Pagination

Filtered containers are paginated client-side with:

- 10 containers per page by default;
- page-size options of 10, 20, and 50;
- Previous and Next controls;
- compact numbered-page controls when useful;
- a result summary such as “Showing 11–20 of 37 containers”; and
- automatic page correction when filtering or refreshed data makes the current page invalid.

Statistics continue to describe the complete project container set rather than only the visible page.

### 4.3 Empty states

The list distinguishes:

- no containers exist: preserve the create-container call to action;
- no search results: show the active query, a clear-search action, and no create prompt; and
- load failure: preserve the existing project-context error presentation.

### 4.4 Row actions

Every visible container retains three explicit actions:

- **Details** opens the expanded container dialog at its overview/structured content.
- **Edit** opens the same expanded management dialog directly at the Fields section, where the developer can add, reorder, edit, or remove fields. The dialog title uses “Manage {schemaName}” so this action is no longer inert or ambiguous.
- **View Data** opens a large, read-only data dialog for the selected schema using the existing paginated table/data-fetching path. Container schema actions are disabled in this viewer so viewing data cannot accidentally mutate rows.

Clicking the non-action area of a row continues to open Details. Action clicks do not bubble to the row.

## 5. Expanded container dialog

`ContainerDetailsModal` becomes a viewport-based work surface:

- desktop width: `min(96vw, 1600px)`;
- desktop height: `92vh`;
- mobile width and height: full viewport with no outer rounded corners;
- header, tab navigation, and footer remain visible;
- only the main content region scrolls;
- the close action remains available in the header;
- Escape and backdrop behavior remain compatible with the existing dialog; and
- nested dialogs render above the parent without losing the selected container.

The dialog accepts an initial destination so Details and Edit can open the correct content without duplicating state or business logic.

```ts
type ContainerDialogIntent = "details" | "manage";
type ContainerDialogSection =
  | "structured"
  | "pipelines"
  | "workflows"
  | "apis"
  | "permissions"
  | "routes"
  | "json";

interface ContainerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  container: ContainerModel | null;
  intent?: ContainerDialogIntent;
  initialSection?: ContainerDialogSection;
  focusArea?: "summary" | "fields";
}
```

The component resets its visible section and focus area when a different container or opening intent is selected.

## 6. Field search inside a container

The Fields heading gains an inline search control with:

- accessible label **Search fields**;
- immediate client-side filtering because field collections are already local;
- matching against field name, type, tag, and object schema name;
- a visible result count;
- a clear action; and
- an empty result state that does not hide the Add Field action.

Searching changes presentation only. It does not change field order, update payloads, move-field indexes, or the underlying `container.fields` array.

Move Up and Move Down are disabled while a field search is active because moving within a filtered subset would otherwise produce ambiguous ordering. The UI explains this in the control tooltip. Editing and deleting remain available.

## 7. Detailed field editor

### 7.1 Size and structure

`AddFieldModal` becomes a larger technical editor:

- desktop width: `min(92vw, 1120px)`;
- maximum height: `90vh`;
- sticky header and footer;
- scrollable body using the available height instead of `max-h-96`;
- one column below `md`; and
- two-column section layouts where fields are related and space permits.

The header always carries editing context:

- create: **Add field to {containerName}**;
- edit: **Edit field: {fieldName}**;
- a secondary line shows the field type and owning container when available.

The form is grouped into five visual sections without changing its data model:

1. **Basic information** — field name, type, object schema selection, enum values.
2. **Validation** — validation rules, messages, required behavior, and tag output.
3. **Relationship and population** — population field name, populated fields, display fields, selection field, and display label.
4. **Nested fields** — child-field creation, editing, ordering, and removal for object/array fields.
5. **Advanced properties** — unique, searchable, login credential, audit identity, hashed, force delete, equation, authorization, and other existing advanced flags.

Sections whose settings do not apply to the selected type remain hidden using the current field-type rules.

### 7.2 Field-name correctness

The visible field-name input must always reflect the selected `editField.name` when the editor opens or switches fields.

The fix is made at the shared legacy input boundary: `TextInput` synchronizes its internal value whenever its controlled `value` prop changes, without changing its existing debounce or number-input behavior. A regression test covers opening the field editor with a populated field.

The original field name remains available separately from the draft name so updating or renaming a field still replaces the correct entry in `container.fields`.

### 7.3 Compatibility

The editor preserves the current `Field` shape and submission callback:

```ts
interface AddFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddField: (field: Field) => boolean | Promise<boolean>;
  containerFields?: Field[];
  containerName?: string;
  editField?: Field | null;
}
```

No form-state library is added. The current state, tag serialization, population settings, child fields, and `onAddField` update path remain authoritative.

## 8. Container data viewer

A focused `ContainerDataModal` provides the missing View Data behavior.

```ts
interface ContainerDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  container: ContainerModel | null;
}
```

It uses the existing schema-backed paginated table path with:

- `schemaName={container.schemaName}`;
- `actionsEnabled={false}`;
- `isHeader={false}`; and
- a title identifying the selected container.

The dialog uses the same large viewport geometry as Container Details. It includes loading, empty, and request-error presentation from the existing table path. This slice does not add record creation, record editing, record deletion, or a new data API.

## 9. Component boundaries and files

Expected product files:

```text
src/components/panelComponents/common/
  ContainersSection.tsx
  ContainersSection.test.tsx

src/components/panelComponents/Modals/
  ContainerDetailsModal.tsx
  ContainerDetailsModal.test.tsx
  ContainerDataModal.tsx
  ContainerDataModal.test.tsx
  AddFieldModal.tsx
  AddFieldModal.test.tsx

src/components/panelComponents/FormElements/
  TextInput.tsx
  TextInput.test.tsx

src/utils/
  containerCollectionView.ts
  containerCollectionView.test.ts
  containerFieldView.ts
  containerFieldView.test.ts
```

Pure filtering and pagination rules live in utilities so UI components do not duplicate collection logic and can be tested without API/context setup.

The existing token and shared primitive files remain the visual source of truth. No new product dependency is required, so no third-party license change is expected.

## 10. Responsive and accessibility acceptance criteria

### Desktop

- At 1440×900, the container dialog occupies most of the viewport without touching its edges.
- Header, tabs, and footer stay visible while long structured content scrolls.
- The field editor exposes materially more information than the current `max-w-2xl` dialog and does not confine the body to 384px.
- Search, primary actions, and pagination have a clear visual hierarchy.
- Keyboard focus order follows search → list/actions → pagination.

### Mobile and narrow laptop

- At 390×844, dialogs use the viewport, fields stack to one column, and no horizontal scrolling is introduced.
- Header actions wrap or collapse without covering titles.
- Pagination remains operable with Previous/Next and a compact page indicator.
- Field action buttons remain reachable without requiring horizontal page scrolling.

### Accessibility

- Search inputs have persistent accessible names.
- Search buttons submit with Enter and are reachable by keyboard.
- Pagination exposes current-page state and disabled boundaries.
- Dialogs have an accessible title and restore focus to the invoking action.
- Icon-only actions have accessible names.
- Empty and no-results states are announced as status content without repeatedly interrupting the user.

## 11. Test strategy

### Unit tests

- case-insensitive container matching by schema, collection, and ID;
- pagination boundaries, page-size changes, and out-of-range correction;
- field matching by name, type, tag, and object schema;
- filtered-field ordering rules; and
- controlled `TextInput` synchronization.

### Component tests

- container search submit, clear, no-results state, pagination, and page-size selection;
- Details, Edit, and View Data invoke distinct working dialogs;
- Edit opens the container manager focused on Fields;
- field search filters presentation without mutating the source array;
- move controls are disabled while filtering;
- edit-field dialog displays the existing field name in both heading and input;
- field updates preserve the existing callback payload; and
- data viewer disables record actions.

### Browser verification

- visual review at 1440×900, 1024×768, 390×844, and 320×568;
- keyboard-only search, pagination, dialog open/close, tabs, and field editing;
- nested field editor layering over the container dialog;
- long container and field names;
- 40-container fixture to confirm the page no longer grows through the entire collection; and
- reduced-motion behavior for any retained transitions.

### Regression verification

- full Vitest suite;
- TypeScript typechecking through the existing test/build commands;
- production build;
- lint;
- `git diff --check`; and
- no change to container update payload structure or field normalization.

## 12. Implementation boundaries

Included:

- container search and client-side pagination;
- functional Details, Edit, and View Data actions;
- large container management dialog;
- field search;
- expanded, organized field editor;
- field-name synchronization fix;
- accessibility, responsive behavior, and tests for this workflow.

Excluded:

- Page Designer redesign;
- Pages and Audit Logs redesign;
- record mutation inside View Data;
- server-side container pagination or search;
- container schema rename semantics;
- new form-state or validation libraries;
- new UI dependencies; and
- migration of unrelated legacy dialogs.

## 13. Decisions fixed by this specification

- Keep the current modal-based container workflow.
- Make Container Details a substantially larger work surface rather than moving it to a new route.
- Use client-side search and pagination against the existing container response.
- Default container page size to 10 with 10/20/50 options.
- Reuse the container-management dialog for Edit, opening it directly at Fields.
- Implement View Data as read-only using the existing paginated table path.
- Keep existing field state and payload contracts while reorganizing presentation.
- Introduce no third-party dependency.
