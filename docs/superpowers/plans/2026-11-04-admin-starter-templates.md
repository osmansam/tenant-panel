# Built-in admin templates implementation plan

> Implement inline with executing-plans and TDD; preserve the user's existing uncommitted work.

**Goal:** Eight editable visual-only admin starters accessible from both authoring and page insertion.
**Architecture:** A small local catalog of ordinary v2 visual documents and metadata. Add a third source to the shared gallery; existing validation and copyVisualDesign produce fresh copies. No runtime/backend changes.
**Tech stack:** Existing React/TypeScript, visual engine, shared gallery and Vitest.
**Spec:** ../specs/2026-11-04-admin-starter-templates-design.md

## Constraints

- Exactly the proposed eight starter layouts; example content, no repeater sources or active actions.
- Consistent responsive light previews, independent inserted copies, no real data or external assets/requests.
- Existing saved/browser sources and namespacing remain intact; built-ins work with an unavailable server library.
- Preserve existing checkouts; no commits/dependencies/backend/runtime migrations.

## Review focus

1. Invalid node/style/layout settings must fail parser tests before delivery.
2. Picking and library authoring must both offer built-ins and copy identities.
3. Editing a built-in copy must not mutate the source catalog or later copies.
4. A library error/refresh must not clear a built-in selection.
5. Mobile layout must not overflow or overlap; buttons remain inert until configured.

## Task 1 — Native catalog

Files: create src/visualBuilder/adminTemplates.ts and adminTemplates.test.ts.
Interface: ADMIN_TEMPLATES readonly records {id, name, description, category, value:VisualBlockValue}.
- [x] RED parser/copy/render assertions for the eight named templates, no sources/actions/external assets.
- [x] Implement native documents with reusable local layout helpers and catalog metadata.
- [x] GREEN focused tests; verify original snapshot unchanged across two independent copies.

## Task 2 — Shared gallery integration

Files: modify VisualDesignGallery.tsx and componentLibrary.ts source union; integration tests in VisualDesignGallery.integration.test.tsx.
Interface: GalleryDesign source now saved|browser|builtin; category/description optional, existing copy/picker consumers retain their behavior.
- [x] RED real gallery/picker tests for built-in browse/search/filter/preview, draft copy, selection surviving library error.
- [x] Add Built-in admin templates source, admin category filtering, brief descriptions and example-content hint. Reuse existing Use/Choose flows.
- [x] GREEN tests and verify saved/browser behavior still passes.

## Task 3 — QA and handoff

Files: docs/visual-builder.md plus this execution record.
- [x] Full panel suite, tsc, focused lint, temporary production build, diff whitespace check.
- [x] Isolated browser: built-in gallery thumbnails, large preview, Use/edit/save, page-picker insertion; mobile/desktop layouts.
- [x] Fresh focused code review, fix important findings with RED→GREEN, document results; clean up own browser/servers.

## Ledger

User chose visual layouts and will configure data/actions. Execute in this session using the established inline preference; no second business-case or execution-method question.
Ruling: reuse the current checkout because this catalog extends the user's uncommitted gallery/engine. Git metadata is read-only; no staging/committing or unrelated tree changes.
Pre-flight: task 2 consumes task 1 metadata/value; copyVisualDesign already validates and regenerates identities. Only sourceType union must expand; existing saved-source guards exclude non-saved sources.


Task 1: complete — RED missing catalog → GREEN all eight actual parser/render
checks and independent-copy mutation test. Parser caught unsupported avatar width
and empty source; corrected to valid custom width and bundled placeholder.
Task 2: complete — RED missing built-in source → GREEN real gallery search,
category, preview/draft and picker selection surviving library failure/retry.
Library fixture retry was corrected to toggle a captured adapter state, because
Axios clients capture defaults when created; production behavior was unchanged.
Task 3: in verification — initial full panel 142 files / 756 tests, tsc and build
passed; lint 0 errors, 3 existing native gallery-control warnings. Fresh focused
review found no Critical/Important issues. Browser validated all eight previews,
search/category, independent save, mobile 390px width/no overflow and no data
requests. Inserted two built-in Empty state sections into a fixture page, saved,
verified unique document/root IDs, preserved the original grid and no library write.
Ruling: QA exposed the existing editor reset overriding authored button styling.
Narrow the reset away from canvas controls so built-ins match previews. Browser
RED transparent/black/0px → GREEN primary blue/white/1px. Persistent verification
script includes this assertion. Focused reviewer found no Important regressions.
Final full suite/types/lint/build rerun after this CSS fix; final counts below.

Task 3: complete — final panel suite 142 files / 756 tests passed after CSS fix;
standalone TypeScript and focused lint exited 0 (three existing gallery native
control warnings), temporary-output production build exited 0 (existing large
chunk/Browserslist warnings). Fresh review and CSS follow-up found no Critical or
Important issues. Final saved QA script passed all eight previews, category and
description search, independent save, zero dynamic requests and corrected button
styles. All eight templates fit the 390px mobile canvas without horizontal
overflow. Two-copy insertion into a fixture page passed with unique identities,
preserved grid and no implicit library write. Existing unsaved-draft prompts were
observed during mobile QA and accepted only for fixture drafts; final mobile sweep
used the in-app gallery. No user records or services were changed.

Evidence: /private/tmp/admin-templates-{final-full,final-tsc,final-lint,final-build,
final-browser,mobile-browser}.log; /private/tmp/admin-template-insertion-browser.log;
admin-template-styles-{red,green}.log; gallery and preview PNGs in /private/tmp.
Own browser and port 3016 dev server are cleaned up after QA. Changes remain
uncommitted alongside the existing workspace work.
