# Visual record actions implementation plan

> Execute inline with executing-plans and test-driven-development. The user requested generic table-like actions and explicitly asked to continue without a specific workflow. Preserve all current uncommitted work.

**Goal:** Configure visual buttons to open existing modal forms or run record actions using the full clicked record, including undisplayed `_id` and mapped values.

**Spec:** ../specs/2026-11-04-visual-record-actions-design.md

**Architecture:** Optional generic host action on existing ButtonNode; renderer emits clicked item context to an optional host callback. Panel configures existing TableActionConfig within that action; runtime reuses form/CRUD helpers. No new endpoints/dependencies or envelope/version change.

## Constraints / review focus

- No live records in saved designs, no editor/sample mutations, no arbitrary requests/scripts; project auth stays in existing APIs.
- Keep typed mappings, own-property safety, correct hidden `_id`, original mutation target, immutable source records, correct clicked card and independent placements.
- Preserve ordinary button/link/form behavior, table actions, save/copy/history, responsive grid and single collection query.
- Bound and validate host configuration; malformed/missing record values are local errors. Async form submission retains values on failure and closes only after success.

### Task 1: Generic engine action bridge

Both engines: model/nodes.ts, model/validation.ts, renderer/VisualRenderer.tsx, components/renderers/types.ts, native/content.tsx. Panel operations/updateNode.ts allowlist. Tests: visualBuilder/buttonActions.test.ts (shared renderer/round-trip/malformed/copy behavior).

- [x] Write and run failing tests for action preservation, click-to-host record context, old href/submit behavior and inert canvas/sample actions.
- [x] Add bounded generic host action parsing and callback propagation. Render configured actions as buttons with no navigation, invoke only preview host callback, and retain complete record context.
- [x] Verify focused suites, types and model/renderer compatibility.

### Task 2: Record action configuration and runtime

Shared host module visualBuilder/recordActions.ts in both frontends: parse/validate config, build typed mapping and payload helpers. Runtime VisualRecordActions.tsx, VisualBlock.tsx and async GenericAddEditPanel support. Tests: recordActions.test.ts and mounted runtime modal/async submit tests.

- [x] Write and run RED tests for hidden id, typed mappings, constants, missing/unsafe paths, create/edit payloads, multiple card isolation, failed/pending async form submit.
- [x] Implement bounded config helpers and host runtime using TableActionConfig, existing inputs/selection/layout/constants/conditions and scoped mutateAsync hooks. Close after success only; preserve original id.
- [x] Add async Promise awaiting to existing panel with regression tests; keep synchronous callers unchanged.
- [x] Verify full runtime suite and typecheck.

### Task 3: Authoring and final verification

Panel VisualActionTools.tsx integrated into VisualDataBuilder's host tools; reusable existing form/action editors and source metadata. Tests: action authoring apply/cancel/history/round-trip. Docs: visual-builder.md and runtime visual-data-binding.md.

- [x] Write and run RED authoring tests for configuring action/mappings, cancel and document preservation.
- [x] Implement configuration dialog, schema/form field helpers, constants/mappings, normal history update and removal.
- [x] Run both full suites, TypeScript, focused lint, temporary production builds and isolated browser edit/modal/payload flow.
- [x] Fresh focused final review; fix important findings with RED→GREEN, record evidence and leave changes uncommitted.

## Execution record

Ruling: reuse current working trees because the feature extends their uncommitted visual engine. The user delegated generic action behavior to existing table semantics and requested continuation; no further business-case or repeated approval questions.


Completed 2026-11-04, uncommitted in the existing checkouts.

- RED→GREEN engine bridge: round-trip config, full clicked-record snapshot,
  inert author/sample actions and ordinary links. Typed mapping/payload regressions
  cover missing/unsafe IDs, precedence, create isolation, zero/false and hidden ID.
- RED→GREEN async modal: previously closed before the Promise settled; now awaits
  submit and additional callbacks, guards duplicates and retains failed drafts.
- Authoring apply/cancel/history tests pass. Runtime mounted tests exercise the
  real modal and Axios adapter for edit, create into another schema, workflow,
  confirmation/delete, duplicate blocking and failure retention. Fields literally
  named `id` and `updates` are submitted as ordinary fields.
- Fresh focused review found two Important issues: consumed field settings needed
  deeper validation, and populated multi-select arrays bypassed table edit
  normalization. Added failing regressions and fixed both. Reviewer follow-up found
  no remaining Critical/Important issues. No implementation work was delegated.
- Full panel: 141 files / 752 tests passed. Full runtime: 152 file entries / 936
  test entries passed (runtime totals include Vitest's typecheck copies). Both
  standalone TypeScript checks exited 0. Focused lint exited 0 (one existing panel
  Fast Refresh export warning). Both final production builds exited 0 using
  /private/tmp output; existing chunk-size/Browserslist warnings remain.
- Isolated real-browser fixture verified selecting Button→Configure action,
  mapping `productId ← item._id`, saving/reopening the page copy, and no editor
  collection/mutation requests. Published second-card edit prefills its own values,
  denied request retains the draft, retry sends original ID p2 and hidden productId,
  other cards remain unchanged, and one schema event refreshes the collection.
  Fixture imageUrl was changed to an absolute URL to satisfy existing form URL
  validation. All API records and saves stayed in memory; no user project data
  changed. Browser and own 3015/3016 dev servers are cleaned up after QA.
- Rulings: visual form actions explicitly store their fields; authoring can seed
  them from schema metadata. Existing table fallback rules are unchanged. Full
  record context is retained in memory; persistent state variables/counters remain
  outside this increment. No endpoints/dependencies/document-version change.

Evidence: /private/tmp/visual-actions-{panel,runtime}-final.log,
visual-actions-*-final-tsc.log, visual-actions-*-final-lint.log,
visual-actions-*-final-build.log; /private/tmp/visual-record-actions-{author,runtime}-browser.log,
visual-record-actions-dialog-browser.log and matching PNG screenshots.


Follow-up — visual action refresh (2026-11-04): user reported visual Edit did not
refresh page data although table edits did. Traced table optimistic keys versus
separate visual collection keys. Added RED→GREEN mounted integration proving a
successful visual edit refreshes an active table and two deduplicated card copies
without any socket event; unrelated schema/project caches stay untouched. Host
now invalidates matching dynamic/visual queries after successful CRUD/workflow,
with active-scope guard for old completions. Focused review identified joining a
pre-write in-flight read as a stale-data race. Added RED→GREEN race regression and
kept default cancellation to guarantee a post-write read. Review follow-up: no
Critical/Important findings. Runtime full 152/940 passed (typecheck copies included),
standalone tsc and focused lint exited 0, temporary-output build exited 0. Isolated
browser fixture deliberately omitted mutation socket notifications and confirmed
hidden-ID edit, denied-request draft retention, success retry and one local
collection refresh. Evidence /private/tmp/visual-action-refresh-*.log. Own browser
and 3015 server cleaned up; user data/services untouched. Changes uncommitted.
