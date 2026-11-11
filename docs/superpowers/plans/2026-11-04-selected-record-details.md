# Selected Record Details Implementation Plan

> Execute inline using superpowers:executing-plans; preserve existing checkouts.

**Goal:** Selecting one table record updates an independently designed visual detail panel.
**Architecture:** Add an output-only record value to the existing page-runtime output/parameter flow. Place the selected record in VisualRenderer publicContext.item.
**Tech stack:** React, TypeScript, TanStack Query, Vitest, Go.
**Spec:** ../specs/2026-11-04-selected-record-details-design.md

## Global constraints
No additional per-selection fetch/store. Reuse selectedRows and current authorized table data. Strict immutable bounded JSON; no inherited properties. Preserve library/page isolation. No commits, staging or server changes to the user's running apps.

## Review focus
Stale selected snapshots after edit/delete/page changes; unavailable producers and scope switches; selection UI without bulk permission; hidden ID action propagation; unrelated scalar bindings/visual documents and safe connection saves.

## Task 1 — Selected record output
- [x] RED: adapter returns latest matching row only for exactly one selection; rejects malformed IDs/multiple/missing; store validates/freezes record and preserves source ownership; backend accepts table record output and rejects invalid source/type and record filters/variables.
- [x] GREEN: extend both frontend page type definitions, runtime adapter/store/resolver/compiler, panel output editor/page validator and backend models/validator. Publish from both paginated and unpaginated tables using current rows; expose selection controls independently from bulk actions.
- [x] Verify focused Vitest + Go model tests.

## Task 2 — Visual detail consumer and connection authoring
- [x] RED: mounted provider/publisher/VisualBlock test switches selected records; fresh fields/hidden IDs, unavailable prompt, unmount; static SSR unaffected. Connection save persists existing item parameter, preserves unrelated config and rejects conflicts.
- [x] GREEN: add a connected VisualBlock wrapper using useResolvedComponentParameters only for configured item bindings. Add connection selector to placed authoring page and persist outer item binding with baseline checking.
- [x] Verify runtime and panel focused tests.

## Task 3 — Verification and review
- [x] Full frontend suites, standalone TypeScript checks, focused lint, production builds; backend targeted tests. Fresh focused code review and necessary regression fixes.
- [x] Update guides/audit and record evidence/remaining browser QA limits.

## Ledger
Pre-flight: Task 1 produces type record + tableSelectedRecord output; Task 2 consumes existing ParameterResolutionResult.values.item with no new engine document fields. Current dirty checkouts contain the working builder; remain inline as previously authorized. Supersedes generic conditions as the next increment per user steering.

Task 1 evidence: runtime adapter/store/typed resolver RED → GREEN, 94 focused test entries passed; backend new output rejected RED then accepted GREEN (2 Go model cases). Record-output-only guard additionally RED → implemented guard. Existing scalar-output tests unchanged.
Task 2 evidence: visual connection repository test RED (item parameter discarded) → GREEN; mounted two-panel test RED (unresolved templates) → GREEN, switches customer, refreshed fields, hidden ID action and producer cleanup. Connection editor authoring tests pass.

Final review: fresh read-only reviewer identified off-page selection and UI-decorated record rejection. Fixed together: GenericTable reports actual visible IDs; both table variants resolve from original normalized/array-source data before nested presentation. RED tests used real applyTableNestedRows and a mounted GenericTable; GREEN focused 20 entries. Stable visibility hook deduplicates repeated reports (lookup decorators recreate arrays) and invalidates visibility when source data changes; hook regression RED→GREEN. No new network/store introduced.
Additional fix: Go omits empty parameter maps on disconnect; saved item binding is confirmed directly. Repository regression RED→GREEN.
Final: minor (deferred): an existing non-componentOutput item binding displays as no table connection and must first be connected to a valid table before direct disconnection. Normal UI-authored connections are unaffected.

Final verification (current source): Tenant Panel full suite 146 files / 776 tests; React Template 164 file entries / 980 test entries (includes Vitest typecheck copies); standalone TypeScript both exit 0; focused runtime lint exit 0; panel focused lint 0 errors/one native-select warning; backend `GOCACHE=/private/tmp/autotable-selected-record-go-cache go test ./models` exit 0; both Vite production builds in /private/tmp exit 0 (existing large-chunk warnings). All three git diff --check checks pass. Logs: /private/tmp/selected-record-{panel,runtime}-final.log and *-final-types.log; builds /private/tmp/selected-record-panel-build.log and selected-record-runtime-final-build.log. Browser QA not run: earlier isolated-server approval service failure remains a limitation; no attempt to bypass it or modify user servers. No staging, commits, push or merge.
Task 1: complete. Task 2: complete. Task 3: local verification/review/docs complete; browser verification pending.
