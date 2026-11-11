# Page Requests

Open **Pages → Edit → Page Requests** in Tenant Panel.

1. Add a named request and choose an existing data source and schema.
2. Configure shared filters, parameters, sorting, page size and returned fields. Optional bindings connect these values to page filters or component outputs.
3. Under **Component connections**, select that request for each component input. A matrix has separate row and column inputs; forms, table actions and filters expose their dropdown inputs individually.
4. Save Page. The runtime fetches once for matching effective requests, including matching requests with different names. Filters, sorting, pagination, server projections or parameters that change the actual request create a separate read. Returning to matching inputs reuses fresh cached data.

**Local overrides** inherit unspecified values. Use **Reset to shared defaults** to remove overrides. Table search/sort/page changes are local; shared page-filter bindings update all inheriting consumers. Transports that do not support server pagination or sorting use the table's client-side presentation controls; those controls do not change the underlying data request.

Choose **Records** for tables, repeaters, options and matrix feeds. Choose **Value / summary** for summary consumers. Result field paths select fields from the response; total paths identify the full record count where needed. Selecting fields for display does not make a second request. Server returned-field projections do distinguish requests.

For a visual collection, connect its collection input in Page Requests, or open the placed visual and choose **Page request connections**. Reusable library designs retain collection slot names. Each page supplies its own request mapping; actual records and page request IDs are not stored in the reusable visual document. Sample previews remain local.

Requests in use cannot be deleted until their inputs are disconnected or reassigned. Missing references, incompatible results and circular output dependencies block saves. Definition and connection changes are included in page saves, including nested pages; visual saves preserve unrelated page definitions.

Existing pages continue to use their inline sources. Compatible reads on a rendered page use the same request layer. Session/schema metadata are separate prerequisites, and requests stay isolated by tenant, project, verified actor and page. Fresh data uses the existing 30-second stale period. Errors hide failed results and expose a retry action.

Create, edit, delete, form submissions and action workflows retain their existing mutation execution. Configure workflow-data sources only for workflows intended to read data; action executions are never deduplicated.

## Dependent select request filters

For any schema-backed `select` field (standalone forms, table Add/Edit/Row/Bulk actions, table filter panels, relation matrix row filters, and visual button record-action forms), use **Request filters** (`sourceRequestFilters`) to filter the option query dynamically or statically:

1. Write equation rules or JSON directly in **Request filters**:
   - **Equation syntax**: `{{product.item._id}}=item._id` (or `item._id={{product.item._id}}`, `_id={{product.item._id}}`, `{{location._id}}=location`, `active=true`). Multiple rules can be separated by newlines or commas.
   - **JSON syntax**: `{"_id": "{{product.item._id}}", "active": true}`.
2. How `{{...}}` references resolve:
   - `{{product.item._id}}` reads `item._id` (or scalar `item` foreign key) from the `product` input's selected record, while `item._id` targets the `_id` field on the `item` source schema. Nested paths on a parent select record (such as `product.item._id` or `location.region.code`) are automatically added to the parent select's requested `dataFields`.
   - `{{fieldKey}}` reads the current input value of another field in the same form or filter panel.
3. While any referenced input is empty, the dependent select stays disabled and sends no unfiltered request. Changing or clearing a parent input clears dependent descendant values.

## Verification fixtures

The files in `scripts/fixtures/pageRequests*.tsx` are isolated browser fixtures that mount real components with in-memory Axios responses. They do not call a live backend or change live records.

Start the repository's Vite server on a temporary port. Open `/scripts/page-requests-qa.html` with an isolated Playwright CLI session, snapshot the page, then run `scripts/verify-page-requests.js` using `playwright-cli run-code --filename`. The runtime fixture verifies shared reads, filter divergence, sorting, cache reuse and reset. The Tenant Panel fixture verifies request creation, table/visual connections, saved slot mappings and save/reload preservation.
