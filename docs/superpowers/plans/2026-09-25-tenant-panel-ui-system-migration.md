# TenantPanel UI System Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate TenantPanel's major screens to one quiet, dense, accessible admin UI system without changing application behavior or `GenericTable`.

**Architecture:** Extend the existing tokenized `src/components/ui` layer only when a concrete screen needs a primitive, then migrate screen groups as independent vertical slices. Feature components retain their current hooks, callbacks, permissions, route behavior, query keys, and payload shapes; the shared layer owns presentation and accessibility only.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS 3, Vitest, Testing Library, existing Headless UI and React Select integrations, shadcn MCP as a read-only reference source.

**Spec:** `docs/superpowers/specs/2026-09-25-tenant-panel-ui-system-migration-design.md`

## Global Constraints

- Do not modify `src/components/panelComponents/Tables/GenericTable.tsx`, its CSS, behavior, configuration contracts, or data/action interfaces.
- Do not change API contracts, query keys, permissions, routes, state ownership, mutation behavior, or backend functionality.
- Preserve all existing working-tree changes, especially `WorkspaceDialog` nested-Escape behavior and its tests.
- Reuse and extend `src/components/ui`; feature files must not import shadcn registry code directly.
- Do not add a form-state system or remove existing UI dependencies.
- Do not install a shadcn component until its source, dependency cost, existing local alternatives, and first consumer have been reviewed.
- Use semantic tokens; do not introduce a new raw color, radius, control-height, or focus-ring system.
- Every task must pass its focused tests before the full suite is run.
- Each task is independently reviewable and shippable.

## Review Focus

- **Long and translated content:** page headers, actions, badges, tabs, and rows must wrap or truncate without overlap; Tasks 1, 4, 6, 8, and 9 contain coverage.
- **Narrow screens from 320–390px:** no page-level horizontal scrolling and primary actions remain reachable; Tasks 1, 3, 5, 8, 10, and 11 contain coverage.
- **Keyboard overlay stacking:** only the top overlay closes, focus returns to the invoker, and tabs/menus remain operable; Tasks 3, 5, 7, and 11 contain coverage.
- **Permission-restricted actions:** visual migration must neither reveal nor enable actions the user cannot perform; Tasks 2, 5, 7, and 10 contain coverage.
- **Async and dirty states:** loading, saving, empty, error, disabled, and unsaved states remain perceivable and block duplicate actions where they do today; Tasks 4, 6, 7, 8, 9, and 11 contain coverage.

---

### Task 1: Shared page, section, status, and action primitives

**Files:**
- Create: `src/components/ui/page-shell.tsx`
- Create: `src/components/ui/section.tsx`
- Create: `src/components/ui/badge.tsx`
- Create: `src/components/ui/empty-state.tsx`
- Create: `src/components/ui/action-bar.tsx`
- Create: `src/components/ui/admin-layout.test.tsx`
- Modify: `src/components/ui/index.ts`
- Modify: `src/styles/tokens.css`

**Interfaces:**
- Produces: `PageShell`, `PageHeader`, `PageActions`, `Section`, `SectionHeader`, `Badge`, `EmptyState`, and `ResponsiveActionBar` exported from `src/components/ui`.
- `PageShell` accepts `children`, optional `className`, and `width: "content" | "wide" | "workspace"` with default `"wide"`.
- `PageHeader` accepts `title: ReactNode`, optional `description`, `context`, and `actions` slots.
- `Badge` accepts `variant: "neutral" | "info" | "success" | "warning" | "danger"`.
- `EmptyState` accepts `title`, optional `description`, `icon`, and `action` slots and renders a named status region.
- `ResponsiveActionBar` accepts `children`, optional `className`, and `align: "start" | "between" | "end"`.

- [ ] **Step 1: Write failing shared-layout tests**

Add tests named `renders_page_heading_and_context_in_landmark_order`, `exposes_empty_state_as_named_status`, `uses_semantic_badge_variants`, and `keeps_long_actions_in_a_wrapping_action_region`. Assert headings/landmarks and stable semantic classes or data attributes, not pixel output.

- [ ] **Step 2: Run the focused test and verify failure**

Run: `yarn test src/components/ui/admin-layout.test.tsx`

Expected: FAIL because the new exports do not exist.

- [ ] **Step 3: Implement the primitives and only the missing semantic tokens**

Use the established token scale and `cn`; keep layout primitives schema- and route-agnostic. `Section` must not apply a shadow or border unless its `surface` prop is explicitly `"outlined"`.

- [ ] **Step 4: Export primitives and run UI tests**

Run: `yarn test src/components/ui/admin-layout.test.tsx src/components/ui/ui-primitives.test.tsx src/components/ui/workspace-dialog.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui src/styles/tokens.css
git commit -m "feat: add tenant admin layout primitives"
```

### Task 2: Application shell and sidebar presentation

**Files:**
- Create: `src/common/Sidebar.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/common/Sidebar.tsx`

**Interfaces:**
- Consumes: Task 1 layout and badge exports where appropriate.
- Preserves: `getVisibleRoutes`, project/tenant switching, collapse state, logout, role checks, route navigation, and existing context hooks.

- [ ] **Step 1: Add sidebar characterization tests**

Cover tenant versus project route visibility, a user lacking required roles, project-context switching, collapse/expand accessible names, and logout. Assert the active route exposes `aria-current="page"`.

- [ ] **Step 2: Run the sidebar tests and record the baseline**

Run: `yarn test src/common/Sidebar.test.tsx`

Expected: new `aria-current` assertion FAILS while behavior characterization passes.

- [ ] **Step 3: Apply the quiet shell styling**

Keep event handlers and filtering intact. Reduce project-context card emphasis, normalize navigation density and active state, add `aria-current`, retain the mobile scrim, and let `App` provide the semantic main region and shared page background.

- [ ] **Step 4: Verify shell behavior**

Run: `yarn test src/common/Sidebar.test.tsx src/test/dom-smoke.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/common/Sidebar.tsx src/common/Sidebar.test.tsx
git commit -m "feat: align tenant application shell"
```

### Task 3: Container workflow visual pilot

**Files:**
- Modify: `src/pages/ProjectManagementPage.tsx`
- Modify: `src/components/panelComponents/common/ContainersSection.tsx`
- Modify: `src/components/panelComponents/Modals/ContainerDetailsModal.tsx`
- Modify: `src/components/panelComponents/Modals/AddFieldModal.tsx`
- Modify: `src/components/panelComponents/Modals/ContainerDataModal.tsx`
- Modify: existing focused tests beside those components

**Interfaces:**
- Consumes: Tasks 1–2 primitives and the existing `WorkspaceDialog` API.
- Preserves: container search/pagination, Details/Edit/View Data intents, auth switches, field search and ordering, mutation callbacks, read-only data mode, nested-dialog layering, and all types from the approved container-management spec.
- Excludes: all `GenericTable` changes; `ContainerDataModal` continues to treat it as an embedded legacy surface.

- [ ] **Step 1: Extend container component tests with visual-contract semantics**

Assert one page heading, one primary create action, named container and field toolbars, semantic auth/status labels, a reachable primary nested-editor action at 320px class conditions, and unchanged read-only table props. Retain the current topmost-Escape test unchanged.

- [ ] **Step 2: Run focused tests and verify the new assertions fail**

Run: `yarn test src/components/panelComponents/common/ContainersSection.test.tsx src/components/panelComponents/Modals/ContainerDetailsModal.test.tsx src/components/panelComponents/Modals/ContainerDataModal.test.tsx src/components/panelComponents/Modals/AddFieldModal.test.tsx src/components/ui/workspace-dialog.test.tsx`

Expected: FAIL only on newly required structural semantics.

- [ ] **Step 3: Migrate Project Management and container chrome**

Use `PageShell`, `PageHeader`, `Section`, `Badge`, and action primitives. Replace nested bordered/tinted containers with spacing and separators, retain explicit row actions, and preserve all existing handlers and conditional rendering.

- [ ] **Step 4: Refine workspace and nested field editor presentation**

Keep `WorkspaceDialog` geometry and behavior. Simplify container information, authentication settings, field rows, and editor sections; ensure one primary footer action and responsive stacking without touching field state or update payloads.

- [ ] **Step 5: Verify the pilot and existing utility contracts**

Run: `yarn test src/components/panelComponents/common/ContainersSection.test.tsx src/components/panelComponents/Modals/ContainerDetailsModal.test.tsx src/components/panelComponents/Modals/ContainerDataModal.test.tsx src/components/panelComponents/Modals/AddFieldModal.test.tsx src/components/ui/workspace-dialog.test.tsx src/utils/containerCollectionView.test.ts src/utils/containerFieldView.test.ts`

Expected: PASS.

- [ ] **Step 6: Capture browser baselines**

Verify 1440×900, 1024×768, 390×844, and 320×568 for container list, no-results, workspace, nested editor, and read-only data states. Confirm no page-level horizontal scroll and correct keyboard focus return.

- [ ] **Step 7: Commit**

```bash
git add src/pages/ProjectManagementPage.tsx src/components/panelComponents/common/ContainersSection.tsx src/components/panelComponents/Modals/ContainerDetailsModal.tsx src/components/panelComponents/Modals/AddFieldModal.tsx src/components/panelComponents/Modals/ContainerDataModal.tsx src/components/panelComponents/common/ContainersSection.test.tsx src/components/panelComponents/Modals/ContainerDetailsModal.test.tsx src/components/panelComponents/Modals/ContainerDataModal.test.tsx src/components/panelComponents/Modals/AddFieldModal.test.tsx
git commit -m "feat: refine container management workspace"
```

### Task 4: Dashboard migration

**Files:**
- Create: `src/pages/Dashboard.test.tsx`
- Modify: `src/pages/Dashboard.tsx`

**Interfaces:**
- Consumes: Task 1 primitives and Task 2 shell.
- Preserves: tenant/project context, displayed user and role information, translations, navigation destinations, and availability of current quick actions.

- [ ] **Step 1: Add Dashboard behavior and state tests**

Cover tenant context, project context, long tenant/project names, unavailable quick actions, and loading/context absence. Assert one page heading, semantic status text, and no enabled control without a working handler.

- [ ] **Step 2: Run the focused test and verify new hierarchy assertions fail**

Run: `yarn test src/pages/Dashboard.test.tsx`

Expected: FAIL on the new shared hierarchy.

- [ ] **Step 3: Recompose Dashboard**

Use a compact context summary and meaningful sections rather than equally weighted tinted cards. Keep existing values and navigation intact, choose one primary quick action when a working destination exists, and present unavailable actions as non-interactive information.

- [ ] **Step 4: Verify Dashboard**

Run: `yarn test src/pages/Dashboard.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Dashboard.tsx src/pages/Dashboard.test.tsx
git commit -m "feat: redesign tenant dashboard hierarchy"
```

### Task 5: Projects migration

**Files:**
- Create: `src/pages/ProjectsPage.test.tsx`
- Modify: `src/pages/ProjectsPage.tsx`

**Interfaces:**
- Consumes: shared layout, badge, empty-state, field, button, and `WorkspaceDialog` primitives.
- Preserves: project creation, slug validation, template choice, tenant-setting conditional fields, project switching, statuses, role-based controls, and all API callbacks.

- [ ] **Step 1: Characterize project workflows**

Test empty/populated states, create form validation and submission payload, template-choice branching, role-restricted actions, Escape/focus return, and a 390px action layout marker.

- [ ] **Step 2: Run tests and confirm shared-dialog assertions fail**

Run: `yarn test src/pages/ProjectsPage.test.tsx`

Expected: FAIL on new accessible dialog and hierarchy assertions.

- [ ] **Step 3: Migrate the Projects page and dialogs**

Remove ornamental gradients, use shared status and action semantics, and replace bespoke overlay shells with the existing accessible dialog layer without moving form state or callbacks.

- [ ] **Step 4: Verify Projects behavior**

Run: `yarn test src/pages/ProjectsPage.test.tsx src/components/ui/workspace-dialog.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/ProjectsPage.tsx src/pages/ProjectsPage.test.tsx
git commit -m "feat: align projects workspace"
```

### Task 6: Configuration form, switch, and tab primitives

**Files:**
- Create: `src/components/ui/switch.tsx`
- Create: `src/components/ui/tabs.tsx`
- Create: `src/components/ui/configuration-ui.test.tsx`
- Modify: `src/components/ui/index.ts`
- Modify: `src/components/form-fields/field-shell.tsx`
- Modify: `src/components/form-fields/form-fields.test.tsx`

**Interfaces:**
- Produces: controlled `Switch` with `checked`, `onCheckedChange`, `disabled`, and label/description slots.
- Produces: controlled `Tabs`, `TabsList`, `TabsTrigger`, and `TabsContent` with roving keyboard focus and controlled value changes.
- Extends: `FieldShell` only for reusable section-level description/error IDs; it must retain all existing form-field contracts.

- [ ] **Step 1: Add failing keyboard and field-contract tests**

Test ArrowLeft/ArrowRight/Home/End tab navigation, selected-tab semantics, disabled switches, long labels, deterministic field descriptions, and unchanged existing error wiring.

- [ ] **Step 2: Run configuration UI tests**

Run: `yarn test src/components/ui/configuration-ui.test.tsx src/components/form-fields/form-fields.test.tsx`

Expected: FAIL because the new controlled primitives are missing.

- [ ] **Step 3: Inspect shadcn references without installing**

Use MCP to inspect `tabs`, `switch`, and `field` examples. Record any dependency requirement in the task notes; implement with existing dependencies/native controls unless an installation is separately justified and approved.

- [ ] **Step 4: Implement and export the controlled primitives**

Keep presentation token-driven and application logic outside the primitives.

- [ ] **Step 5: Verify configuration UI and existing forms**

Run: `yarn test src/components/ui/configuration-ui.test.tsx src/components/form-fields/form-fields.test.tsx src/components/forms/DynamicForm.integration.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui src/components/form-fields/field-shell.tsx src/components/form-fields/form-fields.test.tsx
git commit -m "feat: add configuration UI primitives"
```

### Task 7: Integrations migration

**Files:**
- Create: `src/pages/IntegrationsPage.test.tsx`
- Modify: `src/pages/IntegrationsPage.tsx`

**Interfaces:**
- Consumes: Tasks 1 and 6 primitives.
- Preserves: integration queries/mutations, credentials, generated values, container selection, workflows, dynamic APIs, pipelines, permission gates, and notifications.

- [ ] **Step 1: Characterize integration states and permissions**

Test loading, error, empty, configured, and saving states; restricted roles; credential visibility controls; duplicate-submit prevention; and long generated values.

- [ ] **Step 2: Run the focused test and verify structural assertions fail**

Run: `yarn test src/pages/IntegrationsPage.test.tsx src/utils/api/integration.test.ts`

Expected: FAIL only on the new hierarchy and accessible-control assertions.

- [ ] **Step 3: Migrate the Integrations presentation**

Use shared sections, fields, switches, badges, and action bars. Keep hook calls, derived names, mutation inputs, permission branches, and toast behavior unchanged.

- [ ] **Step 4: Verify behavior and keyboard operation**

Run: `yarn test src/pages/IntegrationsPage.test.tsx src/utils/api/integration.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/IntegrationsPage.tsx src/pages/IntegrationsPage.test.tsx
git commit -m "feat: align integrations settings"
```

### Task 8: Localization migration

**Files:**
- Create: `src/components/localization/ProjectLocalizationSection.test.tsx`
- Modify: `src/pages/LocalizationPage.tsx`
- Modify: `src/components/localization/ProjectLocalizationSection.tsx`

**Interfaces:**
- Consumes: layout, section, field, badge, empty-state, and action primitives.
- Preserves: locale setting values, generated translations, selected locale, on-blur translation updates, origin/status values, and API calls.

- [ ] **Step 1: Add localization state and payload tests**

Cover settings load/error, save payload, empty translations, manual/generated origins, on-blur update payload, long translated content, and stacked narrow-screen row semantics.

- [ ] **Step 2: Run focused tests and verify hierarchy assertions fail**

Run: `yarn test src/components/localization/ProjectLocalizationSection.test.tsx src/components/localization/localeSettings.test.ts src/utils/api/localization.test.ts`

Expected: FAIL on new shared presentation assertions.

- [ ] **Step 3: Migrate Localization**

Use compact settings fields and a dense translation editor with explicit state feedback. Do not change when or how translations are saved.

- [ ] **Step 4: Verify Localization**

Run: `yarn test src/components/localization/ProjectLocalizationSection.test.tsx src/components/localization/localeSettings.test.ts src/utils/api/localization.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/LocalizationPage.tsx src/components/localization/ProjectLocalizationSection.tsx src/components/localization/ProjectLocalizationSection.test.tsx
git commit -m "feat: redesign localization settings"
```

### Task 9: Branding and settings migration

**Files:**
- Modify: `src/pages/TenantBrandingPage.tsx`
- Modify: `src/pages/TenantBrandingPage.test.ts`
- Modify: `src/components/branding/BrandingEditor.tsx`
- Modify: `src/components/branding/BrandingPreview.tsx`
- Modify: `src/components/branding/BrandingAssetField.tsx`
- Create: `src/components/branding/BrandingEditor.test.tsx`

**Interfaces:**
- Consumes: Tasks 1 and 6 primitives.
- Preserves: scope, inheritance, validation, dirty-state warning, preview values, asset behavior, mutation payload, and save state.

- [ ] **Step 1: Add editor contract tests**

Test inheritance, invalid color/error association, dirty navigation warning, save payload, pending-save disabling, failed load, and long branding names.

- [ ] **Step 2: Run branding tests and verify presentation assertions fail**

Run: `yarn test src/pages/TenantBrandingPage.test.ts src/components/branding/BrandingEditor.test.tsx src/components/branding/brandingState.test.ts src/utils/api/branding.test.ts`

Expected: FAIL only on new shared-field and hierarchy assertions.

- [ ] **Step 3: Migrate Branding and Settings**

Use shared fields, switches, sections, and action bars; retain the distinct live preview without wrapping each editor group in another card.

- [ ] **Step 4: Verify Branding**

Run: `yarn test src/pages/TenantBrandingPage.test.ts src/components/branding/BrandingEditor.test.tsx src/components/branding/brandingState.test.ts src/utils/api/branding.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/TenantBrandingPage.tsx src/pages/TenantBrandingPage.test.ts src/components/branding
git commit -m "feat: align tenant branding settings"
```

### Task 10: Page Designer shell migration

**Files:**
- Create: `src/components/PageDesigner/PageDesigner.shell.test.tsx`
- Modify: `src/pages/PageDesignerPage.tsx`
- Modify: `src/components/PageDesigner/PageDesigner.tsx`
- Modify: focused Page Designer editor tests only when their rendered shell changes

**Interfaces:**
- Consumes: shared page, section, badge, empty-state, and action primitives.
- Preserves: all configuration types, state transitions, component ordering, serialization, filters, actions, bindings, calculations, modal behavior, preview behavior, and save callbacks.
- Restricts edits in `PageDesigner.tsx` to the top-level shell, component navigator, empty state, and visual wrappers; no behavioral extraction is included.

- [ ] **Step 1: Add shell characterization tests**

Test empty and populated navigator states, selected component, add/delete actions, permission-disabled actions if present, save invocation, long component names, and a 390px shell with reachable navigation and primary action.

- [ ] **Step 2: Run shell and existing Page Designer tests**

Run: `yarn test src/components/PageDesigner/PageDesigner.shell.test.tsx src/components/PageDesigner/PageDesigner.formSave.test.ts src/components/PageDesigner/componentCommit.test.ts`

Expected: new shell assertions FAIL; existing behavior tests PASS.

- [ ] **Step 3: Migrate only the Page Designer shell**

Replace page-level and navigator visual wrappers with shared primitives. Do not alter editor state blocks, configuration cleaning, or commit logic.

- [ ] **Step 4: Run the focused Page Designer suite**

Run: `yarn test src/components/PageDesigner src/utils/pageDesignerTableConfig.test.ts src/utils/pageBindings.test.ts src/utils/pageOrdering.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/PageDesignerPage.tsx src/components/PageDesigner/PageDesigner.tsx src/components/PageDesigner/PageDesigner.shell.test.tsx
git commit -m "feat: align page designer shell"
```

### Task 11: Authentication screens and final overlay consistency

**Files:**
- Create: `src/components/auth/TenantAuthForms.test.tsx`
- Modify: `src/pages/LoginPage.tsx`
- Modify: `src/pages/RegisterPage.tsx`
- Modify: `src/components/auth/TenantLoginForm.tsx`
- Modify: `src/components/auth/TenantRegisterForm.tsx`

**Interfaces:**
- Consumes: existing shared fields/buttons and Task 1 state primitives.
- Preserves: authentication API calls, validation, tenant branding, Google flow, callbacks, storage changes, and redirects.

- [ ] **Step 1: Characterize login and registration**

Test validation errors, pending disabled states, server errors, successful callback invocation, tenant branding enabled/disabled, keyboard submission, long branding text, and 320px semantic layout.

- [ ] **Step 2: Run auth tests and verify shared-presentation assertions fail**

Run: `yarn test src/components/auth/TenantAuthForms.test.tsx`

Expected: FAIL on new field/error/layout assertions.

- [ ] **Step 3: Migrate auth presentation**

Adopt shared controls, typography, error states, and responsive spacing without moving authentication logic or changing redirect behavior.

- [ ] **Step 4: Verify authentication behavior**

Run: `yarn test src/components/auth/TenantAuthForms.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/LoginPage.tsx src/pages/RegisterPage.tsx src/components/auth
git commit -m "feat: align tenant authentication screens"
```

### Task 12: Full regression, responsive, and accessibility verification

**Files:**
- Modify: affected tests only when verification exposes a real omission
- Create or update: `output/playwright/` screenshots as local verification artifacts only; do not commit generated output unless repository policy explicitly requires it

**Interfaces:**
- Consumes: all earlier tasks.
- Produces: a verified migration with no `GenericTable` diff.

- [ ] **Step 1: Prove the GenericTable boundary**

Run: `git diff --exit-code 6c3fb80 -- src/components/panelComponents/Tables/GenericTable.tsx src/components/panelComponents/Tables/table.css`

Expected: no diff.

- [ ] **Step 2: Run the full automated suite**

Run: `yarn test`

Expected: PASS with no skipped migration regressions.

- [ ] **Step 3: Run static verification**

Run: `yarn lint`

Expected: PASS, or only explicitly documented pre-existing failures proven against the pre-migration commit.

Run: `yarn build`

Expected: PASS.

- [ ] **Step 4: Run browser verification**

At 1440×900, 1024×768, 390×844, and 320×568, verify the application shell, Dashboard, Projects, Project Management/container overlays, Integrations, Localization, Branding, Page Designer shell, Login, and Register. Exercise keyboard navigation, topmost Escape, focus return, long content, empty/error/loading states, permission-restricted actions, and reduced motion.

- [ ] **Step 5: Review the final diff for contract drift**

Confirm no altered query keys, API arguments, mutation payloads, permission predicates, route destinations, callback signatures, or `GenericTable` files. Confirm no feature file imports registry code directly.

- [ ] **Step 6: Resolve verification failures in their owning task**

Expected: verification creates no new commit. If a failure requires code changes, return to the task that owns those files, add the missing regression test there, repeat that task's focused checks, and commit the fix with that task rather than creating an unscoped cleanup commit.
