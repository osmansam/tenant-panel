# Repeated items layout implementation plan

> Execute inline using superpowers:executing-plans and test-driven-development. User approved the proposed controls and chose the 3 desktop / 2 tablet / 1 mobile grid in this session. Preserve existing uncommitted work; do not stage, commit or create a clean checkout that omits the visual engine.

**Goal:** Arrange data-generated item templates in configurable responsive grids or lists in the designer, sample preview and published runtime.

**Architecture:** Optional v2 Repeater `itemsLayout`; a configured repeater owns one grid container while legacy repeaters retain parent-driven flow. Shared model/renderer copies in tenantPanel and react-template stay synchronized; host UI lives only in tenantPanel.

**Tech stack:** Existing TypeScript/React/Vitest engine and CSS.

**Spec:** ../specs/2026-11-04-repeated-items-layout-design.md

## Constraints and review focus

- Defaults: desktop 3 / tablet 2 / mobile 1; gap 16px; alignment stretch. Old documents without layout retain behavior.
- Bounds: columns integers 1–6; gaps integers 0–128; maps require mobile/tablet/desktop. Alignment stretch/start/center/end. No dependencies/backend/network changes.
- Preserve authored card dimensions, template grouping, source immutability, query deduplication, IDs, independent page copies, runtime light policy and parent placement.
- Cover original layout and static siblings; multiple children in one record; per-device sizing; invalid layouts; save/copy/reopen and undo/redo.

### Task 1: Persist and render collection layout

Files: model/nodes.ts, model/repeaterLayout.ts, model/index.ts, model/validation.ts; renderer/repeaterLayout.ts, renderer/VisualRenderer.tsx, renderer/visual-renderer.css; components/renderers/ozmishow/compound.tsx in both frontends. Tests: src/visualBuilder/repeaterLayout.test.ts in both frontends.

- [x] Write failing tests for layout round-trip/bounds and real renderer grid grouping, canvas device width, legacy parent flow, local statuses and caption placement.
- [x] Run tests and observe expected failures before implementation.
- [x] Define `RepeaterItemsLayout` and `createDefaultRepeaterLayout()`. Parse optional configuration strictly; share grid presentation helper between canvas and runtime. Preserve legacy renderer path without configuration.
- [x] Run focused tests and both full suites; inspect results.

### Task 2: Authoring controls and lifecycle

Files: panel editor/RepeaterLayoutInspector.tsx, editor/PropertiesInspector.tsx, operations/updateNode.ts, components/editor/registry.ts, visualBuilder/visualData.ts, docs/visual-builder.md; runtime docs/visual-data-binding.md. Tests: panel visualBuilder/repeaterLayoutInspector.test.tsx using real inspector/operations/history and sample renderer.

- [x] Write and run failing tests for applying presets, changing device settings, removing configuration, persisted updates, undo/redo, and new repeater defaults.
- [x] Implement the content-category layout section, patch allowlist and default factory use on new repeaters. Explain card styling/dimension controls and sample preview.
- [x] Verify actual browser columns at desktop/tablet/mobile, spacing/alignment, saves/page copies and one collection request; run TypeScript, focused lint, both builds and final suites.
- [x] Request one fresh focused code review and resolve important findings with regression coverage. Record evidence below and leave all changes uncommitted.

## Execution record

Ruling: continue in the existing working trees because the prior engine/host work is largely uncommitted. This small extension implements the user's selected layout, without another approval round.


## Completed verification — 2026-11-04

- Task 1 RED: 5 renderer/model failures demonstrated missing persistence, validation, grouping, device sizing and alignment. Task 2 RED: 3 authoring failures demonstrated missing inspector/defaults. Focused suites passed after implementation.
- Full final suites: panel 138 files / 740 tests passed; runtime 144 files / 894 tests passed (runtime count includes its existing typecheck test runs). Both final TypeScript checks passed with empty logs.
- Both final Vite production builds passed to `/private/tmp/repeater-layout-*-build-final`, with existing large-chunk warnings. Focused lint: zero errors (existing renderer/inspector warnings remain). Shared model/renderer copies match; git diff whitespace checks pass.
- `scripts/verify-repeater-layout.js`, following the existing fixture script, verified new defaults, legacy opt-in, undo/redo, per-device controls, sample records, save, independent page placement, exact 3/2/1 browser grid columns, 24/16/12px configured gaps, center alignment, light output under dark OS preference, and one request across resizing.
- Fresh focused reviewer `repeater_layout_review` found one Important issue: the new configured runtime surface omitted responsive outer spacing classes. Regression failed with an emitted CSS rule that decorated no preview element, then passed after the class construction matched canvas behavior. Both full suites/builds/types were rerun after that fix. No Critical or other Important findings.
- Final real-browser check confirmed 32px desktop /16px tablet /8px mobile outer padding with 3/2/1 columns and one collection request. Screenshots in `output/playwright/repeater-layout/` were inspected. All API responses and saves used in-memory fixtures, no live records changed.
- One final browser command's automatic approval review timed out before execution. The allowed retry exposed that the isolated browser had closed; it was reopened and final checks completed successfully. No task remains blocked.
- Changes remain uncommitted; existing work and user servers untouched. Isolated browser and test servers closed after verification.
