# Visual AutoTable data binding: implementation plan

Spec: `docs/superpowers/specs/2026-11-03-visual-data-binding-design.md` (implementation continued by user request 2026-11-04).
Repos: `react-template` (runtime, built first) and `tenantPanel` (editor). Ozmishow is not touched.
Method: TDD per task, small logical changes kept uncommitted, run the repo's test suite and `tsc` after each phase.

## Code facts the plan relies on (react-template)

- `src/visualBuilder/VisualBlock.tsx` renders `VisualRenderer` without `resolvedCollections` and shows a blanket "No items to display." whenever any repeater exists.
- `renderer/repeaters.ts` has `collectionSourceKey(source)` and `boundedCollection(records, limit)`. `VisualRenderer.tsx` (~L248) reads `resolvedCollections` by source key, with a schema-name fallback that executed queries must not use.
- `utils/dynamic.ts` `useGetTableSourceItems` builds `/dynamic/table-source` through `getTableSourceQueryEntries` and `serializeQueryEntries`. It calls `useGet` (`utils/api/factory.ts`), which returns only `data` and drops status.
- `utils/api/axiosClient.ts` has a response interceptor that camel-cases payloads, so exact record keys are lost.

## Phase 0: Baseline

- [x] 0.1 Run the existing tests and `tsc` in both repos and record failures that exist before any change.
- [x] 0.2 Confirm the working tree is dirty from earlier port work. Make changes in new files where possible and do not touch unrelated edits.

## Phase 1: Runtime transport (react-template)

- [x] 1.1 `src/visualBuilder/data/collectionQuery.ts`: pure planner.
  - Input: a repeater source. Output: a canonical descriptor `{schemaName, limit(1..100, default 20), filters, sort}` plus a stable `descriptorKey`.
  - Validation rules from the spec:
    - at most one sort;
    - non-null typed scalar `eq`, and non-empty homogeneous `in`;
    - reject commas in `in` values, strings the parser would trim or unquote, null, empty lists, duplicate or conflicting clauses, reserved transport names, and unsupported date exact matches.
  - Return `{ok:false, reason}` and never drop a clause silently.
  - Tests: encoding and rejection table.
- [x] 1.2 `collectionRequest.ts`: build query entries with `getTableSourceQueryEntries` and `serializeQueryEntries` (`sourceType=schema`, page=1, limit, filters, sort). Reserved parameters cannot be overridden by a filter. Contract tests against backend parser expectations, including zero, false and hyphen/underscore field names.
- [x] 1.3 Axios response policy: add a per-request option, for example `config.rawRecords`, so the interceptor decodes only the envelope (`items`, `totalItems`, `totalPages`, `currentPage`) and leaves record keys and values untouched. The default behavior is unchanged. Tests in `axiosClient.test.ts`: exact `ProductSKU`, `image_url`, `a-b` and nested keys survive; default calls still normalize.
- [x] 1.4 `collectionFetch.ts`: fetch through the existing scoped client.
  - 15 s timeout and `AbortSignal`.
  - Validate the envelope: `items` must be an array of plain objects. A malformed envelope is an error, not an empty success.
  - Return `{items, total, page, pageSize}`, with `pageSize` equal to the effective limit.
- [x] 1.5 `useVisualCollections.ts`: `useQueries` over the deduplicated descriptors.
  - Cache key: tenant, project, user identity or an anonymous marker, plus `descriptorKey`.
  - Wait for session resolution before starting a user-scoped query.
  - 30 s stale time, 5 min gc, no focus refetch, no retry on 401/403 or invalid configuration, one retry on transient errors.
  - Expose per-descriptor status `loading | success | empty | error | fetching`, an error kind (`auth`, `network`, `malformed`, `timeout`, `config`) and `retry()`.
  - A failed background refresh hides that query's data.
  - Verify that logout, login and project switch cancel and remove the visual queries, and that late results do not repopulate another identity's cache.
- [x] 1.6 Tests for the hook:
  - Identical descriptors make one request. The same schema with different filters makes two. Style, selection and layout changes make zero extra requests. Source change shows loading, not the old records.
  - Auth race and stale-result tests.

## Phase 2: Rendering and states (react-template)

- [x] 2.1 Engine change (synced into tenantPanel in Phase 3): `VisualRenderer` accepts `collectionStates?: Record<sourceKey, {status, message, retry}>`.
  - A repeater renders its own local status: `role=status` for loading and empty, `role=alert` for error with a Retry button.
  - Records render only when status is `success`.
  - Remove the schema-name fallback for executed queries (keep it for sample or legacy preview where intended).
  - Static siblings and other repeaters stay visible.
- [x] 2.2 Unique instance ids: each rendered repeater item gets a namespace from the repeater id and the record key (primitive `_id`, then `id`, then index; duplicates get an occurrence suffix).
  - Remap DOM ids, anchor and menu targets and ARIA references, and keep style selectors and effect attachment working.
  - The authored template is not mutated.
  - Tests: two placements of the same design do not collide.
- [x] 2.3 Reject nested repeaters before any request, with a diagnostic and no data execution.
- [x] 2.4 Item bindings: null or missing values use the authored fallback, and false and 0 render. Objects and arrays are not stringified. Existing URL validation is kept and record text is never rendered as HTML (verify the current binding resolver).
- [x] 2.5 `VisualBlock.tsx`: validate the document, plan descriptors, call `useVisualCollections`, pass `resolvedCollections` (keyed by full source key) and `collectionStates`, and delete the blanket placeholder. Keep `VisualBoundary`. Do not register with `ComponentRequestBoundary`.
- [x] 2.6 Check that the native TabPanel host mounts visual children (`UnifiedTabPanel.tsx`), and adapt the visual branch narrowly if needed.
- [x] 2.7 Phase gate: react-template tests, `tsc` and build pass. Existing table pagination and filter tests pass unchanged.

## Phase 3: Editor (tenantPanel)

- [x] 3.1 Sync the Phase 2 engine edits into tenantPanel's `src/visual-engine/`, with a compatibility test (documents render the same in both copies).
- [x] 3.2 Host schema metadata provider. A schema list and field list (name, type, nested paths) come from the existing tenantPanel project metadata (not management credentials), through a context interface so the engine does not import Axios or auth. Metadata failure leaves manual entry usable.
- [x] 3.3 "Repeat with data" operation:
  - Wrap a compatible selection in repeater + `item` slot.
  - Keep child ids, create fresh wrapper and slot ids, and move parent grid placement to the repeater.
  - Disallow unsupported selections (nested repeaters, positioning-grid parents) with an explanation.
  - One undo step.
  - Tests for the transform and for undo.
- [x] 3.4 Data inspector for a repeater: schema picker (an unknown schema shows an explicit error), item alias, limit 1–100, a static filter and sort editor limited to what Phase 1 can execute (show why a combination cannot run), and a manual source text fallback.
- [x] 3.5 Binding controls: "Text source → Item field" and image src/alt pickers, driven by metadata with manual path entry. Keys are never inferred from labels, and the static fallback is kept.
- [x] 3.6 Sample records, held in editor session memory only: a labelled five-product example or a pasted JSON array. Validate JSON, objects, at most 100 records and 256 KiB, and blocked path segments. Clear on document or project switch. Samples never enter save payloads, exports, version snapshots or the shared library.
- [x] 3.7 "Preview data": read-only, light-mode, uses the real renderer with sample `resolvedCollections`, labelled "Sample data". With no samples it shows an instruction, not a fake success. Page Designer and gallery thumbnails stay network-free and show one labelled template item.
- [x] 3.8 Expose the controls in both the standalone library editor and the page-copy editor. Existing save, revision and draft guards stay as they are.
- [x] 3.9 Phase gate: tenantPanel tests, `tsc` and build pass.

## Phase 4: Verification

- [x] 4.1 Isolated test project with five products (distinct `_id`, name, price, imageUrl). Do not use live project data.
- [x] 4.2 Browser run of the acceptance flow:
  - design one card, wrap it, bind fields, save, add it as a page section, save the page;
  - runtime shows five cards from one collection request;
  - edit the template once and all five update, while a placed copy stays independent;
  - repeat in a cell and in a native tab;
  - states: loading, empty, offline, 401/403, malformed response, timeout, retry, failed refresh;
  - light-only output, unique DOM ids, no extra requests on styling.
- [x] 4.3 Full suites, `tsc` and production builds in both repos. Backend tests only if a request-contract assumption turns out wrong (do not change backend auth).
- [x] 4.4 Docs: update the visual-builder port docs, and add release notes saying existing saved repeater documents start fetching their schema list in published runtime.

## Order and risks

Phase 1 → 2 → 3 → 4. Phase 1 is the riskiest: the raw-record response policy and the filter grammar limits. If the parser cannot represent a needed filter exactly, report it in the inspector and do not change backend semantics in this milestone.


Execution details, inherited baseline fixes, test evidence and adapted module boundaries: `docs/visual-data-progress.md`. All work remains uncommitted in the authorized feature checkouts; unrelated edits are preserved. Verification used isolated in-memory API products, not live project records.
