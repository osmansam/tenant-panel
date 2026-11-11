# Table selection → visual record details

User priority: implement inter-component selection/details before generic conditions.
A table's existing page-runtime outputs gain `tableSelectedRecord` of type `record`.
Exactly one selected row publishes the matching current row, including undisplayed fields returned by the existing authorized table request. Zero/multiple selections, deleted/off-page rows and unmounted producers make it unavailable. Updates use current rows, never stale selection snapshots. No additional request or parallel state store.

A placed visual component connects its existing `dataBinding.parameters.item` to this output through an explicit connection selector. The visual renderer receives the resolved record as its root item context; existing `{{item.name}}`, nested fields, images, colors and button actions work without a repeater. Local repeaters still override their own item context. No selection shows “Select one row in the connected table to view its details.” Invalid configuration shows an error. Static visuals keep their existing provider-free rendering.

Approaches: publish IDs and fetch again (extra requests/projections); add a private visual selection store (duplicates page state); extend existing typed component outputs (chosen implementation, preserves stable IDs/dependencies). Reuse the current typed parameter compiler/resolver and page store. Add bounded, immutable JSON record validation. No new backend access policy, arbitrary expressions or editing engine.

Authoring: expose Selected record on the table's Component Outputs; in the placed visual editor choose that output and save the connection. Connection belongs to the page placement, not the library design. Save must preserve unrelated page data and detect changed placement baselines. Existing library copies remain independent. Selection controls must work without bulk actions.

Backend validates the new table output source/type and existing bindings; record is output-only (not a page filter/variable type). Tests cover zero/one/multiple selections, fresh edited data, deletion/off-page, producer unmount, independent panels/pages, hidden ID, existing scalar outputs, connection save and malformed configuration. Existing dirty checkouts are intentionally retained; no git mutations or new dependencies. Browser QA is attempted only through approved tools; previous automatic approval service failure must not be bypassed.
