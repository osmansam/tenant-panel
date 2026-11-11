# Page Section Order Implementation Plan

> Inline execution with superpowers:executing-plans and test-driven-development; preserve current dirty checkouts.

**Goal:** Reorder top-level page sections in Structure and persist via Save Page.
**Architecture:** Existing full Section[] is authoritative; reorder sorted sections and normalize order. PageDesigner reports the complete reordered array to PagesSection, which retains normal draft/save behavior. No backend/runtime change.
**Spec:** ../specs/2026-11-05-page-section-order-design.md

## Review focus
Mixed grid/visual/tab/other section preservation, display order differs from array order, active selection after crossing another grid, subsequent grid source-slot merges, invalid move no-ops and existing save/cancel behavior.

## Task 1 — Order and authoring flow
- [x] RED: mixed/legacy section move utility preserves configuration and normalizes runtime order; UI retains selected grid and edits correct section after moving; PagesSection saves full reordered sections and marks draft dirty.
- [x] GREEN: movePageSection utility, optional full-page reorder callback, Structure controls/all-section listing, parent draft wiring. Standalone native grid array fallback.
- [x] Focused section/grid/designer/page save tests pass.

## Task 2 — Verify and review
- [x] Full panel tests, standalone types, focused lint/build, fresh focused review with necessary RED→GREEN fixes; real browser fixture reorders and saves.
- [x] Update user guide and record evidence; clean up isolated tools.

## Ledger
Pre-flight: native grid sections carry enumerable Symbol source-slot tags removed before persistence; reordering must update full page and rederive grids, not reorder tagged grids against old slots. User explicitly requested section ordering; Move up/down is a small UI choice implementing that request. Preserve inline working copy containing prior milestones. No git mutation.

Task 1 evidence: mixed-section utility and Structure controls initially RED (missing movePageSection/controls; opaque sections omitted). Parent save test RED (no reorder callback wired). GREEN focused tests cover normalized order, retained visual bindings/tabs, retagged native edits, staged Save Page payload and no automatic write.
Fresh review found one Important integration bug: existing moveArrayItem takes direction, not absolute target index. Actual browser reproduced active-grid swap; new second-grid-up and standalone-up/down tests failed RED. Both calls now use direction; 16 focused tests pass including active section, subsequent edit target and keyboard focus assertions. Initial TypeScript check also exposed an API/domain GridSection DTO mismatch in the new test harness; explicit boundary cast matches the existing parent adapter without changing runtime data. Final checks rerun after fixes.
Browser fixture initially assumed Save Page sent variables in its payload. The existing save path omits unchanged variables and backend applies $set to present BSON fields; fixture changed from replacement semantics to PATCH merge and assertion checks retained fixture metadata. No product/backend change for this fixture correction.

Final verification: 147 panel test files / 783 tests passed (/private/tmp/page-section-order-full-final.log). Standalone TypeScript exit 0; focused ESLint exit 0 with the existing PageDesigner Fast Refresh warning; Vite build exit 0 with existing large-chunk warnings, output in /private/tmp/page-section-order-build. Current diff whitespace check passes. Browser fixture save/reopen/mobile checks passed (/private/tmp/page-section-order-browser-final.log): order hero/grid-b/grid-a/tabs normalized to 0..3, active grid retained across both directions, later gap edit applied to grid-b, visual IDs/tab content/other retained page metadata unchanged, no writes until Save Page. Desktop/mobile screenshots visually inspected. Dedicated browser closed and isolated server stopped; user servers untouched. No backend/runtime modifications, dependencies, staging, commits, push or merge for this increment. Tasks 1 and 2 complete.
