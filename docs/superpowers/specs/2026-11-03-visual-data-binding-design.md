# Visual AutoTable data binding: first catalog milestone

Date: 2026-11-03. Status: implementation continued at the user’s request on 2026-11-04; first milestone completed and verified.

## Intent and agreed direction

Design an interface once in Tenant Panel and render it with authenticated AutoTable records in react-template. The first acceptance example is five products rendered as five different cards from one card definition, without writing code.

The user chose extending the existing Ozmishow-derived engine and repeaters, reusing the existing AutoTable request infrastructure. The illustrative named-data-source JSON in the discussion is not a replacement document format. Tenant Panel owns authoring; react-template owns end-user rendering. Existing independent placement copies and light-only page output remain requirements.

This is a project across the two frontends, not another card widget. This document specifies the first working milestone; the broader API/action capabilities remain follow-up work.

## Approaches

| Approach | Tradeoff | Decision |
|---|---|---|
| Extend current repeaters and item bindings; isolate query execution behind a collection adapter | Existing documents stay readable, and the first catalog can use the established table request contract | Selected by user |
| Introduce named document-level data sources immediately | Explicit sharing across several regions, but more document migration, query authoring and editor work | Deferred; the collection adapter must permit this later |
| Build a new renderer or dedicated product-card component | Duplicates working renderer/bindings and does not generalize to other layouts | Rejected |

## Repository evidence

- Both frontends contain the ported `visual-engine` model, validator, item bindings and repeater renderer. They are separate code copies, not a shared package.
- `RepeaterNode.source` already supports `{kind:"autotable", schemaName, limit, filters?, sort?}`. Its child is one `slot` named `item`; `FieldBinding` currently supports `{source:"item", path:string[]}`.
- `VisualRenderer` takes `resolvedCollections`. `renderer/repeaters.ts` defines a full source key and bounds lists to 100 records. Rendering does not fetch.
- `react-template/src/visualBuilder/VisualBlock.tsx` currently never supplies records and emits a blanket placeholder whenever any repeater exists. This is the missing runtime connection.
- Runtime tables call `useGetTableSourceItems` in `utils/dynamic.ts`, using request serialization from `utils/dynamicQueryKeys.ts` and the scoped runtime Axios client. `useGet` only returns data, losing query status at its public boundary.
- AutoTable `GET /api/v1/:tenantSlug/:projectSlug/dynamic/table-source` delegates to `DynamicService.GetTableSource`; schema/pipeline/workflow are actual backend branches. A separate configured-API route exists, with a different response contract.
- Runtime `ComponentRequestBoundary` resolves supported page filters/component outputs for existing components. Visual `custom` blocks are not currently registered as request consumers. Declared page-variable/system sources are not all implemented by the compiler; do not imply they already work.
- The runtime response interceptor camel-cases arbitrary record keys. Visual bindings require exact authored keys, so simply calling the current table hook can break `ProductSKU` or `image_url` bindings.
- Tenant Panel management credentials and runtime application credentials are distinct. The visual management client intentionally accepts only page/library management resources. Do not widen it to fetch runtime records under management credentials.

## First milestone scope

Builder calls proposed for approval:

1. Start with **AutoTable schema lists**. Existing table-query utilities are the transport foundation. Pipeline/workflow/configured-API sources follow after this acceptance flow; they are not shown as functioning options in this milestone. No backend route is needed for the schema-list connection.
2. Read the first page with a configurable limit of 1–100 (default 20). Execute existing static filters/sorting only where the current table-source grammar can represent them exactly; show unsupported cases explicitly. Interactive search, pagination/load-more and page-filter/selection wiring follow separately. Display that the preview/runtime list is limited; never claim all records were loaded.
3. Bind existing supported scalar fields and image properties; the acceptance example uses `name`, `imageUrl`, `price`. Provide safe fallbacks, not arbitrary JS expressions. Currency formatting, link interpolation and record actions are later work.
4. Loading, empty, validation and error states have accessible default messages and a retry action. Custom visual state designs are later work.
5. Authoring uses representative sample records; live records are requested only by published react-template. No automatic production-data request from an editor drag or property change.

Out of scope: external URLs/credentials in documents, mutation/workflow execution on render, nested repeaters, cross-record joins, condition builders, arbitrary code, named document queries, new backend data permissions, changing Ozmishow, automatically creating real product records, and moving to a shared package in this milestone.

## Authoring behavior

### Create the repeated design

1. Open a reusable design or a saved page copy in Tenant Panel.
2. Design one card or stack/group using normal visual controls.
3. Choose **Repeat with data** on that compatible selection. The operation wraps it in the existing repeater + item-slot structure and is undoable in one step. Preserve child identities; add fresh wrapper/slot IDs. Transfer parent grid placement to the repeater and normalize child layout so the result remains valid. Disallow unsupported selections with an explanation.
4. The repeater's Data inspector lets the developer choose a schema from current-project metadata, set the item alias and limit, and configure static filters/sorting. Existing source text remains usable for unavailable metadata/imported documents; an unknown schema becomes an explicit configuration warning/error rather than silently choosing another source.
5. For a heading, choose **Text source → Item field → name**. For an image, choose its source/alt fields. For price text, choose `price`. Show actual field names and nested paths; do not infer keys by lowercasing labels. Keep manual paths available when metadata cannot describe a nested field.

The selected card remains one editable template on the authoring canvas. It does not become five independently editable copies. Bound properties retain the existing static fallback for designing and for missing/null values.

### Representative data preview

- Provide **Sample records** for the selected repeater: load an explicitly labelled five-product example or paste an array of record objects. Validate JSON, record objects, size (maximum 100 records/256KiB), and blocked property path segments.
- Sample records live in editor session memory, not the saved document, shared library, version snapshot or page payload. Switching document/project clears them. No confidential samples are silently persisted.
- Metadata can suggest fields; sample keys can supplement nested paths and show one example value. Sample values must never become saved bindings or overwrite field-name casing.
- **Preview data** opens a read-only light-mode rendered preview using the actual renderer and sample `resolvedCollections`; five sample objects produce five cards. Layout/binding edits update this local preview without network requests. No sample means an explicit instruction to add samples, not a fake successful live response.
- Mark this view **Sample data**. Published runtime records may differ or be restricted by the visitor's permissions.
- Native Page Designer and gallery thumbnails stay network-free. Show a labelled template preview of one repeated item using static fallbacks. They must not claim to show live records. Opening them never requests a collection.

## Saved format and compatibility

Keep current ComponentDocument version 2 and `VisualBlockValue = {document, theme?}`. Do not add a top-level `dataSources`, rename node types, or change the page/library envelope for this milestone.

Illustrative fragment in the existing format (not a standalone document):

```json
{
  "id": "product-list",
  "type": "repeater",
  "source": { "kind": "autotable", "schemaName": "products", "limit": 20 },
  "itemAlias": "product",
  "children": [{
    "id": "product-item", "type": "slot", "name": "item",
    "children": [{
      "id": "product-card", "type": "card", "element": "article",
      "children": [{
        "id": "product-name", "type": "heading", "level": 3,
        "text": "Product name",
        "bindings": { "text": { "source": "item", "path": ["name"] } }
      }]
    }]
  }]
}
```

Grid/stack parent nodes continue controlling repeated layout. Do not add an incompatible repeater `layout.columns` shape. Existing flow grids are supported; the current ban on positioning-grid repeaters remains.

Source configuration is saved with each design and copied independently on page insertion, just like styles and bindings. Rendered record data and query state are never saved. Existing static documents remain byte-equivalent through save/load unless explicitly edited. Legacy v1 documents continue migrating through the current engine path.

No unsupported binding scopes are persisted for future use. `item` means the current record in the nearest repeat context. Future page/selection request inputs must map to existing typed page parameter bindings, not overload the meaning of `item`. Nested repeaters are not accepted by new repeat operations; existing imported nested cases get an explicit unsupported-configuration message and no data execution, with the draft retained for repair.

## Runtime query architecture

### Planning and transport

`VisualBlock` validates its document, traverses supported repeaters, and builds a deduplicated list of query descriptors. Use React Query `useQueries` or equivalent fixed descriptor orchestration; never call hooks recursively inside the renderer or once per item.

Extract/reuse the table request URL/parameter construction and authorized Axios transport. Add a status-bearing collection query layer that returns records plus query status/refetch. Leave existing table hook return contracts unchanged. Existing table tests must prove table filtering/pagination still work; this change must not refactor table presentation.

For schema lists use the existing table-source endpoint with `sourceType=schema`, schema name, page=1, configured limit, filters and sort. Translate typed visual filters with the existing backend filter grammar and metadata types; preserve false/zero/null/arrays. Do not ignore unsupported filter/sort combinations or silently reinterpret literals as backend operators. Reserved transport parameters cannot be overridden through record filters. Cover serialized requests against the backend parser contract. Retain existing imported valid source shapes or report an actionable error for combinations that cannot be expressed; never drop clauses silently.

The current parser has concrete limits: `ParseSort` accepts one field and boolean `asc`; list filters use comma separation; null has no faithful query-string representation. Therefore v1 supports zero/one sort, non-null typed scalar `eq`, and nonempty homogeneous non-null `in` lists only when metadata and the grammar preserve their meaning. Reject ambiguous comma-containing literal strings, leading/trailing whitespace or quotes that the parser would strip, unsupported date exact matches, null/empty lists, conflicting duplicate field clauses, reserved names, and multiple sort fields before sending a request. The existing document validator may still accept/preserve these shapes for compatibility, but the data inspector/runtime must explain why they cannot execute. Do not expand backend semantics or silently drop null to make this milestone pass. Missing runtime field-type metadata blocks only a filter that requires it; unfiltered schema lists do not depend on metadata access.

Use canonical normalized request descriptors for deduplication, not schema name alone. Two repeaters with equal schema but different filters/sort/limit are distinct; equivalent descriptors share one request while mounted. Do not use the renderer's schema-name fallback for executed queries.

### Lossless response and states

Keep the runtime Axios auth/refresh/scope behavior. Add an explicit response-policy option for this supported collection endpoint so records remain opaque and their keys/values stay exact while envelope metadata is decoded. Preserve default normalization for existing consumers. This must not create a second unauthenticated Axios client or allow documents to supply URLs/headers.

The adapter accepts the known table-source envelope (`items`, `totalItems`, `totalPages`, `currentPage`) and yields `{items, total, page, pageSize}` after validation, using the effective requested limit for pageSize. Empty array is successful empty data; malformed envelopes or non-object rows are errors, not an empty success. No arbitrary `itemsPath` execution/guessing in v1 because there is one endpoint contract. Null/missing bound scalar values use the authored fallback; valid false and zero display correctly. Objects/arrays are not stringified into labels. Image/link values retain existing URL validation; record text is never interpreted as HTML.

The adapter exposes `loading`, `success`, `empty`, `error`, and `fetching` (background refresh). Source changes render the new source's loading state, not the previous source's records. Failed initial reads/401/403/malformed responses show no record cards and offer appropriate retry/sign-in guidance. A failed background refresh shows an explicit refresh error and hides data for that query until retry; never silently retain unauthorized data. Other successful query regions remain visible.

Supply records by full source key and statuses by repeater/query identity to the pure renderer. The renderer contains no networking. Status messaging is local to each repeater, not a blanket page-level “No items” whenever any repeater exists. Retry refreshes that query once, not once per rendered card. Default status text uses `role=status` or `role=alert` as appropriate.

### Scope, cache and lifecycle

- URL scope is fixed from the active `/t/:tenant/p/:project` context at request dispatch. Include tenant/project plus current application-user identity (or anonymous marker) in visual collection cache identity along with the canonical request. Resolve the runtime session state before starting a user-scoped query; unresolved identity is not the same as confirmed anonymous access. Never share management/sample/runtime caches.
- Use the existing login/logout/project-switch cache clearing; verify late results cannot repopulate another identity's active cache. Auth changes cancel/remove visual queries. Do not key caches on secret cookies/tokens.
- Reuse 30-second stale time, five-minute collection GC, no focus refetch and current reconnect behavior; explicitly bound requests to 15 seconds with AbortSignal cancellation on unmount/source/scope changes. No automatic retries for 401/403 or invalid configuration; one retry for transient network/server errors, plus explicit user retry. Existing runtime session refresh remains the sole auth retry mechanism.
- A source unchanged by styling edits never refetches due to node/document identity, layout changes, selection, or theme. At most one initial collection request per distinct effective query, excluding explicitly counted auth/transient retries and later invalidation/refetch.
- Authenticated and configured-public schemas retain backend access rules and record/field restrictions. Schema selection is not a permission grant. Product fixture creation happens only in isolated test data for verification, not the user's live project.

## Repeated instance identity

Current rendering uses record `_id` or index for React keys but reuses authored DOM node IDs. Before enabling live repeaters, give every rendered instance a deterministic namespace derived from the repeater and record key, without mutating the authored template.

Prefer primitive `_id`, then primitive `id`, otherwise source-relative index; disambiguate duplicate keys with an occurrence suffix. Maintain namespaces across stable records and refreshes. Index fallback has no reorder identity guarantee and is acceptable for this read-only milestone. Remap DOM IDs, internal anchor/menu targets and related ARIA references consistently, and keep responsive style selectors/effect attachment ownership working for the instance. Saved IDs and field bindings do not change. Verify multiple placements of the same saved design cannot collide.

No nested live requests per record. No actions that can mutate records execute while rendering or previewing.

## Boundaries and integration

Tenant Panel engine changes add host-provided schema metadata, field choices and sample-preview inputs; generic engine components do not import Tenant Panel Axios or management auth. react-template engine remains rendering-only. Shared model/renderer edits must be synchronized between the two engine copies; tests cover compatible documents. Ozmishow is unchanged.

The standalone library and fixed page-copy editor must both expose authoring controls. Existing save/revision/draft guards remain. Native sections, cells and supported native tab placements all render the same visual block. Verify the native TabPanel host actually mounts visual children rather than routing every child through its table-only content path; adapt the visual branch narrowly if necessary and retain existing table/tab behavior.

Runtime collection queries operate within `VisualBlock` in this milestone. Do not register the entire custom block with `ComponentRequestBoundary` and imply multiple repeater sources have page-level parameter bindings already. Later page/selection support will need explicit per-query binding identity and compiler validation.

## Acceptance and validation

1. Create five isolated products with distinct `_id`, name, price and imageUrl. Design one card, wrap it, select products, bind name/imageUrl/price, save, add it as a page section and save the page. Runtime shows five distinct cards from one collection request.
2. Change the card design once; all five rendered instances reflect it. A separately placed copy remains independent of its library source.
3. Same flow works for a visual component in a cell and a supported native tab. Existing table pagination, filters and tab contents retain behavior.
4. Sample preview shows five locally supplied rows without a runtime request. Empty/missing samples and inaccessible metadata remain usable with manual fields. Samples never enter API save payloads, exports or version snapshots.
5. Table-source contract tests cover filter/sort/limit encoding; zero, false, null, arrays, reserved names and response envelopes; PascalCase, underscore, hyphen and nested record keys remain exact. Existing table client behavior remains unchanged.
6. Initial loading, empty, network failure, malformed data, 401/403, timeout, retry and failed refresh show the correct local state. Static siblings and other successful repeaters remain visible. No fallback/example cards masquerade as live records on errors.
7. Two identical source descriptors deduplicate; two filtered versions of one schema do not share records. Styling, binding selection and drag operations create no extra requests. Source changes and project/user/logout races do not display stale records. Limits are enforced before rendering.
8. DOM IDs and internal links remain unique/correct across repeated items and multiple placements. No unsafe URL/HTML execution. Unsupported nested repeaters are diagnosed before request execution.
9. Both frontends' relevant and full test suites, TypeScript, production builds and an isolated browser check pass. Browser check includes light-only output and source documents not being mutated by rendering. Backend parser/service tests run if request-contract assumptions require backend changes; do not change backend auth to make editor previews easier.

## Rollout and remaining work

No data migration or auto-creation of schemas/records. Deploy compatible frontend engine changes together. Existing repeater documents start executing their saved supported schema-list source in published runtime after this feature; invalid/inaccessible sources fail locally with a clear message. This activation behavior must be stated in release notes.

Next increments, in order proposed by the discussion: interactive pagination/filtering; adapters for pipeline and configured read APIs (workflow side effects require separate policy); explicit page-filter/selection inputs; button/record actions; richer formatters and state templates. Named document queries and nested repeaters remain separate design decisions.

The implementer may choose module names and control composition, but may not broaden data access, persist preview records, introduce arbitrary scripts/URLs, silently alter the saved document format, or claim later capabilities are supported.

## Design check

A fresh read-only builder reviewed this design against the repositories and reported “nothing important left.” Final author clarification records the existing parser/envelope limits explicitly above. No implementation files were changed during this design step; implementation planning begins after approval of this document.
