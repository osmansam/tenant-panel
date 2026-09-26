# TenantPanel UI System Migration Design

**Date:** 2026-09-25

**Status:** Approved direction; written specification pending user review

**Goal:** Redesign the major TenantPanel screens into a quiet, dense, consistent SaaS administration interface without changing business logic, API contracts, permissions, state behavior, or backend functionality.

**Explicitly out of scope:** `GenericTable` internals and styling, table data behavior, API/backend changes, state-management rewrites, permission changes, route changes, and a wholesale replacement of existing UI libraries.

## 1. Intent and success criteria

TenantPanel is a developer- and administrator-facing productivity application. Its visual system should prioritize clarity, speed, predictable interaction, and information density rather than decorative presentation.

The migration succeeds when:

- major screens share one page shell, hierarchy, spacing scale, typography system, and action model;
- forms, tabs, dialogs, drawers, empty states, badges, and feedback states behave and look consistent;
- borders and card surfaces are used only to communicate a real boundary;
- each area has one visually dominant primary action;
- desktop layouts are compact without becoming cramped;
- narrow layouts remain usable without page-level horizontal scrolling;
- keyboard focus, dialog layering, Escape behavior, accessible names, and focus return remain reliable;
- existing callbacks, payloads, query behavior, permissions, state ownership, and navigation semantics remain unchanged; and
- the current work in progress is preserved and adapted instead of overwritten.

## 2. Current architecture

TenantPanel is a React 18, TypeScript, Vite, Tailwind application. It also contains Headless UI, MUI, Material Tailwind, Emotion, React Select, and feature-local native controls.

Three visual generations currently coexist:

1. older gray, shadowed, card-heavy screens such as Dashboard, Project Management, and Localization;
2. newer neutral/violet screens such as Projects, Integrations, and portions of Page Designer; and
3. the tokenized shared layer in `src/components/ui`, currently covering buttons, inputs, labels, textareas, checkboxes, and `WorkspaceDialog`.

The shared token and form foundation established by `2026-09-22-tenant-panel-form-ui-modernization-design.md` remains authoritative. The container-management work in `2026-09-23-container-management-ux-design.md` is an active representative slice and must be preserved.

Current uncommitted work includes nested-dialog Escape handling, focus behavior tests, and updated container fixtures. The migration must not revert or replace these changes.

## 3. Design direction

### 3.1 Visual character

The interface uses quiet neutral surfaces, restrained typography, compact controls, and subtle separators. Color is reserved for primary actions, selection, semantic status, focus, and destructive actions.

- Page background: semantic page token.
- Primary surface: white or semantic surface token.
- Default section separation: spacing or a single divider.
- Bordered surface: only when content needs a meaningful container.
- Shadows: dialogs, menus, and rare elevated content only.
- Radius: shared semantic values; avoid mixing large decorative radii with compact admin controls.
- Gradients and ornamental glow: removed from administrative screens unless they communicate product branding rather than decoration.

### 3.2 Density and typography

- Default body and control text: 14px.
- Supporting metadata: 12px.
- Page titles: approximately 24px, semibold.
- Section titles: 14–16px, semibold.
- Default controls: 40px; compact toolbar controls: 32px where touch use is not primary.
- Page spacing uses the existing 4px-based scale, with 24px desktop gutters and 16px narrow-screen gutters unless a workspace requires otherwise.
- Long technical values may use monospace typography, but labels and general content do not.

### 3.3 Action hierarchy

Each page or section has one primary action. Secondary actions use outline or neutral treatment. Tertiary actions use ghost treatment or a menu. Destructive actions remain visually distinct and require the existing confirmation behavior where applicable.

Repeated row actions may move into a dropdown only when this does not reduce discoverability for a high-frequency action. Existing callbacks and permission checks remain attached to the same user intent.

## 4. Shared application layer

The migration extends `src/components/ui` instead of importing registry components directly throughout feature code.

Expected shared concepts:

- `PageShell`, `PageHeader`, and `PageActions` for width, gutters, title, context, and primary actions;
- `Section` and `SectionHeader` for meaningful content groups without default nested-card styling;
- `Toolbar` for search, filters, view controls, and compact actions;
- `Badge` with neutral, success, warning, danger, and informational semantics;
- `Field` and `FieldGroup` for label, help, required, disabled, and error presentation;
- shared `Select` and `Switch` presentation compatible with existing value behavior;
- `Tabs` with keyboard navigation and scrollable narrow-screen behavior;
- standard, workspace, nested, and confirmation dialog conventions built on the current dialog behavior;
- `Sheet` for contextual editing only where maintaining page context is preferable to a centered dialog;
- `EmptyState`, `Skeleton`, and inline error presentation;
- `DropdownMenu` for low-priority action groups; and
- `ResponsiveActionBar` for wrapping or stacking actions predictably.

Names are conceptual until the implementation plan maps them to exact files and interfaces. Existing primitives should be extended rather than duplicated when their current API can support the requirement safely.

## 5. shadcn MCP usage

The shadcn MCP server is connected and can access the `@shadcn` registry. TenantPanel does not currently have a `components.json`, so no registry installation is implied by this design.

The implementation may inspect shadcn source and examples for:

- `dialog`, `alert-dialog`, `sheet`, and drawer/dialog responsive patterns;
- `tabs` keyboard and focus behavior;
- `field`, `select`, `switch`, `checkbox`, and form composition;
- `empty`, `skeleton`, `badge`, and feedback presentation;
- `dropdown-menu`, `command`, `combobox`, `popover`, and `tooltip` behavior;
- `sidebar` responsive conventions; and
- table-adjacent toolbars or pagination only when used outside `GenericTable`.

No component is installed solely because it appears in the registry. Before adding registry code or a new dependency, implementation must verify that the existing local primitive, native HTML, or installed Headless UI behavior cannot satisfy the requirement with lower migration risk. Approved registry patterns must be adapted behind `src/components/ui`.

## 6. Screen audit and target treatment

### 6.1 Application shell and sidebar

The current sidebar is behaviorally important and permission-aware. Preserve route filtering, tenant/project context, collapse state, logout, tooltips, and project switching.

Visually, reduce the emphasis of the project-context card, normalize navigation row height and active states, and align mobile overlay behavior with the shared focus and motion system. The main content region gains consistent page gutters and background treatment through the page shell rather than per-screen wrappers.

### 6.2 Dashboard

Replace the collection of equally weighted white and tinted cards with a clear page header, a compact context summary, and a small number of meaningful sections. Quick actions should have one clear primary choice; disabled or unavailable actions must not look interactive.

### 6.3 Projects

Preserve project creation, template choice, project switching, statuses, and role-based actions. Remove ornamental gradients and bespoke modal styling. Use the shared header, project item/card treatment, badge semantics, dialog shell, form fields, and empty state.

### 6.4 Project Management and container workflows

This is the first migration pilot because it already has component tests and desktop/mobile Playwright screenshots.

Preserve the current container search, pagination, Details/Edit/View Data intents, workspace geometry, field search, nested editor, and read-only data behavior. Refine the summary, authentication settings, field rows, tabs, and action hierarchy with fewer nested bordered regions. Continue using and improving `WorkspaceDialog`; do not replace the current uncommitted dialog-layering work.

### 6.5 Integrations

Preserve integration fetching, credentials, generated values, container selection, workflows, dynamic APIs, pipelines, mutation behavior, and permissions. Consolidate the page around a shared header, restrained sections, consistent status badges, and shared form/action components.

### 6.6 Localization

Preserve locale settings, translation loading, blur/save behavior, origin/status values, and API calls. Replace raw native presentation with shared field groups, toolbar controls, dense translation rows, explicit loading/error/empty states, and responsive stacking.

### 6.7 Branding and settings

Preserve inheritance, validation, dirty-state protection, preview behavior, mutation payloads, and scope switching. Use shared fields, switches, sections, status feedback, and a stable save action. The preview remains visually distinct but should not force every editor group into a separate card.

### 6.8 Page Designer

`PageDesigner.tsx` is a large, behavior-dense component and must not be rewritten as one change. Migration is limited to visual boundaries and should be split into small slices: designer shell, component navigator, canvas/empty state, settings sections, and editor dialogs.

All component configuration, serialization, calculations, bindings, filters, actions, modal types, ordering, and preview behavior remain untouched unless a separately identified visual extraction can preserve the exact interface and has targeted tests.

### 6.9 Authentication screens

Login and registration retain all authentication, validation, redirect, tenant branding, and callback behavior. They adopt shared fields, buttons, error states, typography, and responsive spacing after the protected admin surfaces are stable.

## 7. GenericTable boundary

`GenericTable` is explicitly excluded from this migration.

Do not modify:

- `src/components/panelComponents/Tables/GenericTable.tsx`;
- its internal markup or CSS;
- sorting, filtering, pagination, selection, expansion, reordering, or bulk-action behavior;
- table configuration types or contracts; or
- the data-fetching and action interfaces it consumes.

A page containing `GenericTable` may receive the shared page shell, header, surrounding spacing, or an external page action area only when that change does not alter the table component or duplicate its internal toolbar. The existing table is treated as an embedded legacy surface.

## 8. Responsive and accessibility requirements

- No major screen introduces page-level horizontal scrolling at 320px width.
- Page headers wrap context and actions predictably; the primary action remains discoverable.
- Dense desktop layouts collapse to one column before controls become unusably narrow.
- Tabs remain keyboard operable and horizontally scrollable when necessary.
- Dialogs expose accessible titles, contain focus, close only the top layer on Escape, and restore focus to their trigger.
- Sheets and menus follow the same focus-return and top-layer rules.
- Icon-only controls have accessible names and adequate hit targets.
- Focus uses the shared visible `focus-visible` treatment.
- Disabled, loading, empty, error, success, and read-only states are not communicated by color alone.
- Motion respects reduced-motion preferences.
- Existing permission-based hiding and disabling behavior is preserved.

## 9. Migration phases

### Phase 1: Foundation and application shell

Audit and normalize tokens, page gutters, content widths, typography roles, focus rules, action hierarchy, shared section/toolbar patterns, and responsive page headers. Extend shared primitives only when a concrete first consumer requires them.

### Phase 2: Container workflow pilot

Apply the system to Project Management, container collection chrome, container details, field rows, authentication configuration, nested field editing, and read-only container-data workspace while preserving current work and screenshots.

### Phase 3: Core tenant screens

Migrate Dashboard and Projects. These screens establish the reusable summary, item/card, status, page action, empty-state, and standard-dialog patterns.

### Phase 4: Configuration screens

Migrate Integrations, Localization, and Branding/Settings. Consolidate field, switch, save-state, section, tabs, and feedback behavior.

### Phase 5: Page Designer slices

Migrate the Page Designer shell and its visual subregions incrementally. Each slice requires focused characterization tests and must avoid behavioral refactoring.

### Phase 6: Authentication and consistency pass

Align authentication screens and run an application-wide accessibility, responsive, terminology, action-hierarchy, and visual-regression pass.

`GenericTable` modernization is not a phase and is not deferred work under this specification; it is excluded.

## 10. Verification strategy

### Automated verification

- Preserve the full Vitest suite as the primary behavior regression guard.
- Add or update component tests for shared primitive contracts, keyboard interaction, accessible naming, responsive action behavior, and dialog layering.
- Add focused characterization tests before changing behavior-dense legacy screen markup.
- Keep API and utility tests unchanged unless type-safe fixture maintenance is necessary.

### Browser verification

For each migrated screen, verify representative states at 1440×900, 1024×768, 390×844, and 320×568 where practical:

- default, loading, error, empty, and populated states;
- keyboard-only navigation and focus visibility;
- open/close/focus-return behavior for overlays;
- long names, technical values, translated copy, and wrapped actions;
- permission-restricted states; and
- reduced-motion behavior.

Existing container screenshots are the baseline for the pilot. New screenshots should be added only as verification artifacts and must not replace product behavior tests.

### Contract verification

Diff review must confirm that migrated feature components retain the same hooks, query keys, mutation calls, callback parameters, route destinations, permission checks, and submitted data shapes. Visual migration is not authorization to refactor those contracts.

## 11. Implementation constraints

- Preserve unrelated working-tree changes and generated artifacts.
- Do not perform broad dependency removal during the migration.
- Do not add a new form-state system.
- Do not migrate every possible primitive before a screen needs it.
- Do not create feature-local replacements for approved shared primitives.
- Do not combine visual migration with business-logic cleanup.
- Keep phases independently reviewable and shippable.
- Stop and request approval if implementation reveals a required contract or behavior change.

## 12. Completion criteria

The migration is complete when the named major screens use the shared page and interaction language, the application meets the responsive and accessibility requirements above, all affected automated tests and builds pass, representative browser states are visually verified, and no scoped business/API/permission/state behavior has changed.

Completion does not require changes to `GenericTable` or its internal ecosystem.
