> Historical verification of cell/tab insertion. Sources now come from the standalone library; see `docs/visual-builder.md` and `docs/visual-library-progress.md`.

# Visual cell insertion progress

Baseline: existing feature branches and prior visual-builder relocation working changes retained. Original tracked patch is /private/tmp/visual-cell-insertion/baseline.patch. Continuing in the same workspace because this is the requested insertion workflow on top of the existing port.

User decision: independent copy per page. Implementation follows the native cell Add action in the supplied screenshot, plus consistent Tab Panel child support. Sources are already-persisted visual blocks from current project pages, not a new linked backend library.

Task1 complete: adapter and native picker. Observed RED for missing module/option, then GREEN for independent deep copy, theme preservation, menu targets and nested saved designs.
Task2 complete: existing Add Component supports custom visual designs; no schema required. Tab children use the same picker and retain local parent draft persistence. Existing-copy save regression observed RED (regenerated document/removed props), then GREEN with current-copy preservation.

Final review: two Important findings, no Critical or Minor. Both fixed with RED -> GREEN regression tests: source selections surviving successful removal/content refresh; slider anchor links not remapping. A further regression verified two visual tab drafts get different state keys; new placements derive their default runtime key from their unique component identity. Current-copy saves preserve existing identities and props.

Task3 complete, 2026-11-03:
- 129 test files / 699 tests passed. Fourteen new focused checks cover copy validation and actual native cell/tab behavior, failed saves, empty/error/retry reads, scope changes, successful removal/change refreshes, current-copy preservation and two-tab identity.
- TypeScript --noEmit passed. ESLint 0 errors / 92 warnings (91 pre-task; one additional shared input warning for the radio picker). Production Vite build passed in /private/tmp/visual-cell-insertion/panel-build-final. No tracked dist artifact regenerated.
- Browser fixture verified source selection from the native cell Add button, no schema control, insertion into the correct right cell, persisted page reload, neighboring native content retained, source unchanged, subsequent source edit not propagating, and runtime rendering. External traffic was blocked and API data stayed in memory. No live project records were mutated.
- Screenshots inspected and copied to output/playwright/visual-cell-insertion: component-picker.png, page-cell.png, runtime-cell.png. The first fixture used unsupported legacy text as a neighbor; final fixture uses supported static Information Blocks and verifies both cells render correctly.
- Backend and react-template were not changed for this insertion task; the existing runtime envelope renderer already supports cells/tabs.

Scope decisions: use saved project page visual blocks as reusable sources, keep authoring in the separate builder, and leave linked/shared propagation out per the user's explicit choice. Fresh node identities prevent DOM collisions; schema menu, direct anchor and slider anchor references are remapped together. The independent source review excluded prior relocation/vendor internals and live backend evidence; this task's source tests and isolated browser verification supply its evidence. No deferred minors.
