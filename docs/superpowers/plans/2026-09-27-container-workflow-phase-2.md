# Container Workflow Phase 2 Compatibility Pass

> **Execution:** Use `superpowers:executing-plans` and `superpowers:test-driven-development` in the current feature workspace.

**Goal:** Apply the Phase 1 token, button, badge, focus, and density contracts to the approved Collections and Container workspace baseline without changing feature behavior.

**Architecture:** Treat the existing container workflow as a completed, behavior-characterized vertical slice. This pass changes presentation contracts only: shared page/section/toolbar composition, token-backed row density, shared button geometry through `GenericButton`, semantic badges, and narrow-screen overflow. Feature state, handlers, permissions, payloads, query keys, modal layering, and `GenericTable` remain authoritative and untouched.

**Spec:** `docs/superpowers/specs/2026-09-25-tenant-panel-ui-system-migration-design.md`

## Constraints

- Preserve the public `GenericButton` API and delegate all button geometry, variants, disabled/loading behavior, icons, and focus treatment through its Phase 1 shared `Button` wrapper.
- Keep `Badge` semantic. Do not add container-, authentication-, field-, or HTTP-specific variants.
- Use only the row-density vocabulary `dense` and `standard`, backed by `--ui-row-dense` and `--ui-row-standard`.
- Preserve every feature behavior and compatibility contract; do not combine this visual pass with feature refactoring.
- Do not modify `GenericTable`, shared primitive APIs, API/query code, route behavior, state ownership, callbacks, payload shapes, or permission conditions.
- Preserve `WorkspaceDialog` geometry, focus trapping, top-layer Escape handling, and focus restoration.
- Use the current Collections and Container workspace screenshots as baselines and write new captures with a `-phase2` suffix.

---

### Task 1: Align the container workflow with Phase 1 foundations

**Files:**

- Modify: `src/pages/CollectionsPage.tsx`
- Modify: `src/pages/ProjectManagementPage.test.tsx`
- Modify: `src/components/panelComponents/common/ContainersSection.tsx`
- Modify: `src/components/panelComponents/Modals/ContainerDetailsModal.tsx`
- Modify: `src/components/panelComponents/Modals/AddFieldModal.tsx`
- Modify: `src/components/panelComponents/Modals/ContainerDataModal.tsx` only if surrounding workspace presentation needs adjustment
- Modify: `src/components/panelComponents/common/ContainersSection.test.tsx`
- Modify: `src/components/panelComponents/Modals/ContainerDetailsModal.test.tsx`
- Modify: `src/components/panelComponents/Modals/AddFieldModal.test.tsx`
- Modify: `src/components/panelComponents/Modals/ContainerDataModal.test.tsx` only if its surrounding presentation changes

**Interfaces:**

- Consumes: `PageShell`, `PageHeader`, `Section`, `SectionHeader`, `Toolbar`, `Badge`, `GenericButton`, `WorkspaceDialog`, and the Phase 1 semantic tokens.
- Preserves: container search and pagination; create, Details, Edit, and View Data intents; permission checks; auth switches; field search/order/actions; editor validation and payloads; mutations; nested-dialog layering; read-only data props; and all approved container types.
- Density: collection rows and field rows are `dense`; controls and form/editor composition remain `standard` unless content naturally requires more height.

- [ ] **Step 1: Add failing visual-contract tests**

Retain all behavior characterization. Add focused assertions that catch these regressions:

- container and field controls lose their accessible toolbar names;
- the Collections heading stops using the shared page-header landmark;
- a collection or field row stops declaring `data-density="dense"` or stops resolving minimum height through `--ui-row-dense`;
- authentication controls lose standard shared control geometry or their accessible labels;
- workspace tabs become unreachable rather than horizontally scrollable on narrow screens;
- long technical identifiers lose their wrapping/truncation boundary;
- the nested editor primary action is no longer reachable in the 320px stacked footer;
- `ContainerDataModal` changes any read-only `GenericPaginatedPage` prop.

- [ ] **Step 2: Verify RED**

Run:

```bash
yarn test src/pages/ProjectManagementPage.test.tsx src/components/panelComponents/common/ContainersSection.test.tsx src/components/panelComponents/Modals/ContainerDetailsModal.test.tsx src/components/panelComponents/Modals/AddFieldModal.test.tsx src/components/panelComponents/Modals/ContainerDataModal.test.tsx src/components/ui/workspace-dialog.test.tsx
```

Expected: existing behavior tests pass; at least the new density, toolbar, and narrow-overflow assertions fail for the missing Phase 2 contracts.

- [ ] **Step 3: Implement the minimum presentation alignment**

In `CollectionsPage`, retain project context, role information, and the audit section while using the shared page hierarchy. In `ContainersSection`, use the shared `Toolbar`, semantic `Badge`, and `GenericButton` wrapper without replacing its API; keep one meaningful list boundary and explicit row actions. Mark container rows as dense and size them with the density token.

In `ContainerDetailsModal`, leave dialog behavior and feature state untouched. Keep tabs horizontally scrollable, use standard geometry for authentication controls, use a named shared toolbar for fields, and make field rows dense and token-sized. Simplify only redundant nested presentation where the existing state and callbacks remain byte-for-byte equivalent in behavior.

In `AddFieldModal`, preserve all fields, validation, state transitions, and update payloads. Reduce redundant nested presentation only where safe, and keep the responsive footer ordered so the primary action stays reachable. Treat `ContainerDataModal` and `GenericTable` as an embedded legacy boundary.

- [ ] **Step 4: Verify focused behavior and utilities**

Run:

```bash
yarn test src/pages/ProjectManagementPage.test.tsx src/components/panelComponents/common/ContainersSection.test.tsx src/components/panelComponents/Modals/ContainerDetailsModal.test.tsx src/components/panelComponents/Modals/AddFieldModal.test.tsx src/components/panelComponents/Modals/ContainerDataModal.test.tsx src/components/ui/workspace-dialog.test.tsx src/utils/containerCollectionView.test.ts src/utils/containerFieldView.test.ts
```

Expected: PASS with no new warnings attributable to the changed files.

- [ ] **Step 5: Capture and compare browser baselines**

Compare against the approved Collections and Container workspace captures. Save `-phase2` captures at 1440×900, 1024×768, 390×844, and 320×568 for the populated list, no-results state, details workspace, nested field editor, and read-only data view. Confirm no page-level horizontal scrolling, every tab and primary action remains reachable, long identifiers do not collide, and focus returns to the invoking control.

- [ ] **Step 6: Run repository verification**

Run changed-file lint, the complete test suite, and the production build.

Expected: lint passes for changed source/test files; the full Vitest suite and Vite build pass. Record any pre-existing warnings separately.

- [ ] **Step 7: Commit**

```bash
git add docs/superpowers/plans/2026-09-27-container-workflow-phase-2.md src/pages/CollectionsPage.tsx src/pages/ProjectManagementPage.test.tsx src/components/panelComponents/common/ContainersSection.tsx src/components/panelComponents/Modals/ContainerDetailsModal.tsx src/components/panelComponents/Modals/AddFieldModal.tsx src/components/panelComponents/Modals/ContainerDataModal.tsx src/components/panelComponents/common/ContainersSection.test.tsx src/components/panelComponents/Modals/ContainerDetailsModal.test.tsx src/components/panelComponents/Modals/AddFieldModal.test.tsx src/components/panelComponents/Modals/ContainerDataModal.test.tsx
git commit -m "refactor: align container workflow foundations"
```
