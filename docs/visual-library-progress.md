# Visual library execution ledger

User correction supersedes prior source-library choice: standalone designs, no page selection, direct Structure +Add visual section. Independent placement copies retained. Baseline tracked patches are in /private/tmp/visual-library. Continuing existing feature workspaces because prior uncommitted port/insertion code is the necessary baseline.

Ruling: use a dedicated project-scoped backend library rather than hidden pages or browser-only templates — designs must not be page content and should survive browser changes — requires backend restart/deployment alongside panel changes.

Task1 complete: backend model/repository/HTTP/routes with strict existing management contracts, scoped index, optimistic revisions and opaque JSON. Envelope/storage/auth/scope/revision tests observed RED then GREEN. Lifecycle checks observed RED for missing template copy and cleanup, then passed with independent clone identities and exact tenant/project cleanup.

Task2 complete: standalone library repository/workspace and fixed-target copy editor; no page dependency or page selector. Existing placed copies can be explicitly saved to the library. Management calls/refreshes now have 15s timeouts. Fixed-target navigation regression observed RED, then GREEN after keying the copy editor by complete target.

Task3 complete: native Structure now contains grids and visual component sections, with Add menu, source picker, independent draft insertion, scoped preview, edit/delete, and save of mixed structures. Unsaved targets cannot open their copy editor. Existing cell/tab pickers use the standalone library. Tests observed RED for missing visual entry/menu and passed after wiring.

Final review: two Important findings, no Critical or Minor. Fixed reload draft-loss race with a busy guard, disabled creation/selection/metadata and inert editor during reload; delayed-reload regression RED -> GREEN. Fixed ordering semantics by sorting tagged source slots and Structure by explicit runtime order before merge/reindex; unsorted mixed-section regression RED -> GREEN. Grid settings labels now use the displayed section position. Offline scheduling regression RED -> GREEN: local management queries always attempt their bounded request rather than remaining paused by browser online status.

Final validation, 2026-11-03:
- `go test -short ./...`: all backend packages passed, exit0.
- Tenant Panel:131 test files /706 tests passed, exit0; TypeScript --noEmit passed; ESLint0 errors/94 warnings (ported engine/shared-control warnings); temporary-output production build passed, exit0.
- Isolated browser exit0: create/save design with zero pages and no page API; forbidden save retains draft and retry succeeds; canonical saved design URL; delayed reload locks editor; Structure Add visual section; preview and persistence alongside original grid; unsaved edit disabled until saved; fixed-target editor without page selector; editing copy leaves library unchanged; runtime output; delayed request becomes a timeout/retry error after15s.
- Screenshots visually inspected and copied to `output/playwright/visual-library`: library.png, page-sections.png, runtime-sections.png, timeout-recovery.png.
- Local running backend protected library route401 and nonexistent route404 confirm registration. No authenticated live writes were used. User Chrome inspection was unavailable because computer-use permissions were not granted; the original live network cause is not asserted.
- Source review deliberately excluded unrelated baseline edits/vendor internals, production deployment, automatic placement migration/library deletion, and adding atomic revisions to the existing whole-page PATCH API. Those remain existing scope boundaries; new library revisions are atomic. No deferred minors.

Current usage is in docs/visual-builder.md; earlier page-backed library docs/plans are superseded by this correction. Runtime renderer needed no changes for this task. Existing page content remains intact and can be explicitly copied to the shared library.
