# Record Connection Interaction Implementation Plan

> Execute inline using superpowers:executing-plans and TDD. Preserve current dirty checkouts; no commits or staging.

**Goal:** Optional connection settings stay out of the canvas, and linked tables immediately populate details and support ordinary row activation.
**Architecture:** Reuse WorkspaceDialog and the existing page-runtime output. Local active record identity is independent of bulk selectedRows; data snapshots still come from current raw rows gated by visible IDs.
**Stack:** React, TypeScript, Vitest.
**Spec:** ../specs/2026-11-05-record-connection-interaction-design.md

## Review focus
Row controls must not trigger activation; retained IDs resolve fresh values after refresh; filtered/deleted/off-page records fall back to the first visible row; empty/unmounted sources clear; ordinary tables/bulk behavior unchanged; dialog errors/cancel/disconnect/dirty-design handling.

## Task 1 — Compact optional connection settings
- [x] RED: editor has only header button until opened; cancel/disconnect/failed save behave predictably; placed route renders trigger inside header.
- [x] GREEN: WorkspaceDialog in RecordConnectionEditor, shared controls, neutral styles, optional none, local errors. Mount trigger in placed header.
- [x] Verify panel focused tests.

## Task 2 — Immediate record details and normal row activation
- [x] RED: hook picks first visible, click switches ID, refresh preserves ID/fresh fields, page/search/delete falls back, empty clears. Actual GenericTable mouse/keyboard activates, nested buttons/links/checks don't.
- [x] GREEN: active-record hook independent of bulk selection; GenericTable optional activation callbacks/highlight; both table variants wire it only for declared selected-record outputs.
- [x] Verify focused runtime tests and existing record action/output tests.

## Task 3 — Verify and review
- [x] Full frontend tests, TypeScript, focused lint and builds. Fresh focused review with critical/important fixes covered RED→GREEN.
- [x] Update guides and evidence. Isolated fixture browser QA completed after the approval service succeeded; user servers and project records were not modified.

## Ledger
Pre-flight: no backend/document-schema changes needed. Both tasks reuse existing selected-record output/binding. User explicitly selected first-row initialization plus normal row click; generic conditional work stays deferred. Current working copies contain all prior uncommitted implementation and are retained as authorized.

Task 1: complete — prior banner tests RED then new dialog/optional/cancel/local-error/disconnect tests GREEN. Mounted placed route/actual browser confirm header trigger and no persistent notice; desktop/mobile dialog inspected. Old malformed-binding removal edge case is now covered and fixed.
Task 2: complete — hook RED (no initial record) and row UI RED (no activation props/aria-selected), then GREEN. Bulk selection remains independent. Actual browser confirms automatic first row, normal click, Enter activation and no extra collection read; existing table edit targets Bob while details stay on Carol, then cancels with no write.
Review: fresh focused reviewer found one Important issue: all-or-nothing visible ID extraction let an invalid row disable valid records. Actual GenericTable mixed-invalid/duplicate-ID regression RED→GREEN; IDs now collected individually, duplicates retained so ambiguous identities still fail record resolution.
Final: Ruling: reviewer flagged action-cell whitespace activation as Minor; ordinary cell whitespace intentionally counts as a normal row click. Buttons, legacy action wrappers, links, form controls, checkbox and expand cells are excluded. Cost if users expect the entire action cell inert: clicking blank cell space changes the details record; no action/mutation executes. This matches the requested normal row interaction.
Browser QA: approval service succeeded on Nov 5. Both isolated localhost test servers and a dedicated Playwright session use in-memory API fixtures only. Header dialog save/disconnect/mobile 390px checks pass (/private/tmp/record-settings-browser.log); runtime initial/direct/keyboard/no-fetch pass (/private/tmp/record-runtime-browser.log); existing edit action guarded/no mutation (/private/tmp/record-row-action-browser.log); unpaginated client search, local pagination fallback and empty clearing pass (/private/tmp/record-unpaginated-browser.log). The action browser script initially timed out because it used lowercase placeholder 'name'; snapshot showed actual accessible field 'Name', script corrected and passed. No product issue or change was needed.

Final verification: Tenant Panel 146 files / 778 tests; React Template 164 file entries / 984 test entries (includes Vitest typecheck copies). Standalone tsc both exit 0; focused ESLint both exit 0; both Vite production builds in /private/tmp exit 0 with existing chunk-size warnings. Latest runtime mixed-ID fix included in final suite/build/type checks. Diff whitespace checks pass. Logs: /private/tmp/record-interaction-panel-full.log, record-interaction-runtime-final.log, record-interaction-*-types.log, record-interaction-*-build.log. No backend changes or dependencies; no staging/commit/push/merge. Task 3 complete.
