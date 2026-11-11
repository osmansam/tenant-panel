# Visual components and page sections

Create reusable designs in **Tenant Panel → select project → Visual components**.
The builder works without any page and has no page selector. Click **New design**,
enter a design name, add elements through the canvas/component library, and use
**Save** to store the document and theme in the project's backend library.

The landing page is a visual gallery of **Saved designs**, **Built-in admin
templates**, and **Browser templates**. Saved and browser designs belong to the
current project; built-ins are available in every project. Each card shows the actual design. Search by name, filter
by category, or click its preview for a larger view. **Open design** edits the saved
library design; **Use design** on a browser template starts an independent draft.
While editing, **Browse designs** reopens the gallery and asks before discarding
unsaved changes. This gallery contains your Tenant Panel content, with no imported
ozmishow designs.

## Start from a built-in admin layout

Open **Visual components → Built-in admin templates** (next to Saved designs).
Fourteen visual-only starters are included:

- **Dashboard KPI cards:** four statistics with example trends.
- **Record card grid:** responsive cards with image, status and action buttons.
- **Compact record list:** records with secondary text, status and actions.
- **Customer profile:** identity, contact information and account status.
- **Record details:** labeled values arranged in a responsive detail panel.
- **Order summary:** line items, amounts, status and action footer.
- **Activity feed:** a timestamped timeline of example updates.
- **Empty state:** an explanation and a primary action for an empty workspace.
- **Breadcrumbs and page header:** breadcrumb trail with current page badge, title and primary actions.
- **Quick actions and shortcuts:** four shortcut cards with icons, keyboard shortcut badges (`kbd`) and action buttons.
- **Analytics and quota breakdown:** a channel comparison bar chart paired with workspace quota progress bars.
- **Workflow and onboarding stepper:** multi-step progress tracker (`steps`), checklist items, tags and step actions.
- **System alerts and status banners:** operational callout banners (`info`, `warning`, `success`) with environment tags.
- **Filter and active tags toolbar:** a compact view header displaying active filter tags, matching record counts and view actions.

Search names/descriptions or filter by category. Click the thumbnail for a larger
preview, then **Use design** to open a fresh editable draft. **Save** stores your
customized copy in the project's library. Nothing is written just by browsing.
Built-ins remain usable when the server library is empty or unavailable.

The same **Built-in admin templates** tab is available when adding a visual
section, cell component or manual tab. **Choose design**, then confirm insertion
and **Save Page**. Every placement owns fresh identities; two insertions are
independent and editing a copy cannot change the built-in starter.

All figures, records and activity are example content. Built-ins contain no live
schema queries, configured actions or submit forms. Select a Card/Stack/Flex and
use **Repeat with data**, then enter your own field bindings. Select a Button and
use **Configure button action** to connect it to your own forms, schemas or
workflows. Buttons have no behavior until configured. KPI figures and charts are
visual examples, not automatic aggregate queries.

## Add a full visual section

1. Open **Pages → Edit** for the target page.
2. In **Structure**, click **+ Add → Visual section**.
3. Choose a design from the visual gallery and click **Add section**. You can
   enlarge a preview before selecting; previewing alone does not select it.
4. The section appears alongside grids in Structure, with its own preview.
5. Click **Save Page**. The design is displayed by react-template.

The new section remains a page draft until Save Page. Its Edit action becomes
available after it has been persisted, so it cannot open a nonexistent target.
Grid and visual entries follow the same explicit section order as the runtime.
Grid edits retain visual sections, their identities and placement.

Published react-template pages always use the light palette. Saved dark/system
preferences and OS dark mode do not change page appearance, and authored theme
switch controls are hidden on published pages. Section and gallery previews use
the same light palette, including code blocks. This is a rendering policy; stored
documents and palettes are preserved.

## Repeat a design using AutoTable records

To arrange the generated items, select **Repeater** in Layers (not the Card).
The **Repeated items layout** section provides:

- **Responsive grid:** starts with 3 desktop / 2 tablet / 1 mobile columns.
- **Vertical list:** one column on all devices.
- Separate column counts (1–6) and gaps in pixels (0–128) for each device.
- **Item alignment:** stretch, start, center or end within each column.
- **Original parent layout:** restores the earlier parent-driven arrangement.

New repeaters start with the responsive grid and 16px gaps. Existing saved
repeaters keep their previous arrangement until you choose a layout. The canvas
shows one editable item at the chosen device's track width; **Sample records →
Preview data** shows the whole collection. Tablet starts at 768px and desktop at
1024px in the published page.

Select the **Card** to style backgrounds, padding, borders, typography or width.
Grid gaps separate records; Card spacing separates content inside each card.
An authored fixed Card width is preserved. To fill a column, change **Sizing →
Width → Full**, and clear any conflicting custom width/maximum width. Save the
placed page copy to update that page; library and existing page copies remain
independent.

You can type templates directly into the ordinary Content fields of components
inside a repeater:

| Property | Example |
| --- | --- |
| Heading/text | `{{item.name}}` |
| Mixed text | `Price: {{item.price}}` |
| Multiple fields | `{{item.name}} — {{item.price}}` |
| Nested field | `{{item.category.name}}` |
| Image source | `{{item.imageUrl}}` |
| Image alt text | `Photo of {{item.name}}` |
| Link URL | `/items/{{item.id}}` |

Select the repeater's schema first. Use **Sample records → Preview data** to see
the values; the design canvas keeps the authored tokens visible for editing.
Save the design and insert/save an independent page copy to use live records.
Existing page copies can be edited separately; changing the library design does
not update previously inserted copies.

Templates always use `item`, regardless of the repeater alias. Existing field
selectors still work and take precedence: choose **Static** for that property's
source under **Data binding** when entering a template instead. Missing/null or
non-scalar values appear blank; zero and false remain visible. Only field paths
are supported, without calculations, HTML or formatting functions. Use the exact
field spelling and case. Invalid/missing image URLs are cleared; invalid/missing
link URLs become `#`.

The heading, text, badge, button/link label, image/avatar, accessible label, stat,
and quote properties supported by data binding also accept this syntax.

1. In **Visual components**, open a design and create one **Card** or group.
2. Select it in Layers, then click **Repeat with data** under the editor toolbar.
3. Select the **Repeater** in Layers. In **Data**, choose the current project's
   **Schema**, or enter its name in **Source**. Set the limit (1–100, default 20).
4. Select a child heading or text. Expand **Data binding**, then choose its
   **Text item field**. For images, choose **Image source item field** and an alt
   field if available. Manual binding paths remain available. Field names retain
   their original casing; missing/null values use the static design fallback.
5. Click **Sample records → Load five example products → Preview data**, or paste
   a JSON array using your own field names. Samples stay in editor memory and do
   not enter saved designs, exports, versions or pages.
6. Save the design and insert a copy into a page section, cell or manual tab as
   above. Save the page. react-template fetches the schema list with the visitor's
   application session and repeats the design for each returned record.

Wrapping is one undoable operation. Parent flow-grid span/start settings move to
the repeater; responsive starts advance repeated cards without overlapping them.
Nested repeaters, forms inside repeaters and positioning-grid placement are not
supported by this milestone. Existing document validation still applies.

The first milestone reads the **first page only**, up to the configured limit;
the published list reports the returned/total count and limit. Static equality, list and numeric/date comparison filters plus one sort are
supported where the backend grammar can represent them exactly. Unsupported filter combinations are diagnosed rather than ignored.
Pipeline/workflow/configured API sources, interactive pagination, page-filter/
selection inputs and formatting expressions are later increments. Visual button
record actions are described below.

Each distinct effective collection query is fetched once and shared across
matching placements. The renderer never requests data per card. Loading, empty,
access failures, malformed responses and timeout/network failures show local
states with retry. Failed schema metadata can also be retried. No collection
requests run in the authoring canvas, sample preview, gallery or page-designer
template preview. Published pages continue enforcing backend record/field access.

Release note (2026-11-04): existing saved repeaters with supported schema sources
now execute those sources in react-template. Inaccessible or unsupported sources
show local errors; no schema, product records or page placements are created or
migrated automatically.

## Conditional colors

Color a repeated item by its own data, for example price: below 20 green, 20 to
below 100 amber, 100 or more red.

1. Select a styled component inside a repeater (Card, Stack, Flex, text, button
   or another supported child). Runtime-owned containers (slots, disclosures,
   accordion, tabs, sidebar, scroll story/scene and the repeater itself) cannot
   hold rules; wrap the content in a Card or Stack instead.
2. Open **Conditional colors** in the properties and choose **Add color rule**.
3. Under **Field**, choose a schema field or enter an **Item path** such as
   `price` or `category.level` (nested paths work).
4. Choose a **Comparison**: Less than, Less than or equal, Greater than, Greater
   than or equal, **Between (lower included, upper excluded)**, Equals or Does
   not equal. Set the **Value type** (Number, Text, True/False) and the value.
5. Pick the **text**, **background** and/or **border** color with the usual
   theme-token or custom color controls. Leave a color unset to keep the normal one.

The first matching rule wins; rules are never combined. Reorder with the arrow
buttons, remove with **Remove**; up to 20 rules per component. If no rule matches,
or a field is missing/null/non-numeric for a numeric comparison, the component
keeps its authored style. Background overrides replace that component's
background paints with a solid color and text overrides replace its text paint.
Border rules change color only, so give the component a visible border width
first. There are no formulas or scripts, and evaluated colors are never saved.

The design canvas always shows the normal style. **Sample records → Preview data**
and published pages color each item from its own record. Rules are saved with the
design, copy independently with it, follow normal undo/redo, and cause no extra
data requests.

## Add inside a cell or tab

In a page cell, click **+ Add**, choose **Component Type → Visual component**,
select a saved library design, and click **Add Component**. No table schema is
required. A Tab Panel's empty tab offers **Add Visual component**; the child
remains in the parent component draft until that parent is saved. The existing
one-component-per-tab rule applies.

Each placement is an independent copy of its source document and theme. Editing
a library design does not change existing pages. Fresh component/document/node
identities and remapped menu/anchor targets allow multiple independent copies.

## Edit an existing placement

Select a saved visual section in Structure and click **Edit visual section**,
or use Edit on a visual component in a grid. This opens a fixed page/component
target. Its header identifies the page; it has no page selector and cannot add
unrelated page content. Save updates that placed copy only.

Previously saved visual blocks remain intact. To reuse one in the new library,
open its fixed-target editor, save any changes, then click **Save copy to library**.
Existing placements are not migrated or changed automatically.

## Storage, access and recovery

Standalone designs use the project-scoped AutoTable visual-components API;
placed copies use the existing page API. Both require a management session with
project page-write permission (project admin, developer or editor). Runtime
users receive the saved page content through the existing page access rules.

Library saves use optimistic revisions. If another editor changed a design,
your save reports a conflict and retains the draft. Reload asks before discarding
changes, blocks editing while fetching, and remounts only after a successful fresh
read. Failed reads/saves keep active drafts. Page-copy persistence retains the
backend's existing latest-read/merge/PATCH behavior; it has no atomic page revision.

Management requests and refreshes time out after 15 seconds. Errors provide a
retry path, including when the browser reports offline; standalone local drafting
can start before the library read completes. If the new endpoint returns 404,
restart/update the AutoTable backend. Current source registers it at startup.

Templates, custom style kits and versions remain browser-local and namespaced
by project; versions also identify the document/placement. They are separate
from the shared server library. Clearing browser storage does not delete saved
library designs or page copies. Library definitions follow project cloning and
project cleanup.

## Routes and setup

- `/pages/visual-builder`: standalone library authoring, optionally `?design=ID`.
- `/pages/visual-builder?page=PAGE_ID&component=COMPONENT_ID`: edit one placed copy.

Set `VITE_API_URL` to the backend `/api/v1` base. `VITE_RUNTIME_APP_URL` remains
the end-user application origin for runtime setup. The runtime does not fetch
library records to render placements; it renders the copied custom envelope.
Supported schema collections and record actions use the existing runtime APIs.

The port retains responsive previews, canvas/layers/inspector, drag/drop, effects,
motion, themes, JSON import/export and local version snapshots. Keep upstream
React Bits notices, assets and font licenses when syncing the engine. Generated
default-scale Tailwind classes are scoped under `.ve-utilities`; regenerate them
with `corepack yarn build:visual-css` after changing engine classes.

## Verification

Run `corepack yarn test`, `corepack yarn lint` and `./node_modules/.bin/tsc --noEmit`.
Direct Vite output to a temporary folder to avoid changing tracked dist artifacts.
Backend verification uses `go test -short ./...`.

Current isolated browser scripts are `scripts/visual-library-browser-fixture.js`
and `scripts/verify-visual-library.js`, with panel3016/runtime3015 and a fixture API
base ending `/api/v1`. They intercept all API data in memory and block external
traffic. Older visual-builder scripts describe superseded page-backed authoring.
See `docs/visual-library-progress.md` for the final review and verification record.

## Buttons, modal forms and passed record values

A repeated item's full record is available to its buttons. You can display only
`{{item.name}}` and `{{item.price}}` while keeping `item._id` and other fields for
actions; hidden text elements are unnecessary.

1. Add a **Button** inside the repeated Card and select that Button in Layers.
2. Click **Configure button action** below the toolbar.
3. Choose **Edit**, **Create**, **Update**, **Delete** or **Link**, a target schema,
   and a form modal, confirmation or immediate operation. Edit/update/delete
   target the clicked record's original `_id`. For a related new record, choose
   Create and the destination schema.
4. Under **Pass values from the clicked record**, click **Add passed value**.
   Set a destination such as `productId` and a source such as `item._id` (or
   `{{item._id}}`). The source picker always includes `_id`; you can also enter a
   nested path manually. Values retain their types, including zero and false.
5. In **Form → Fields**, use **Load schema fields**, add/remove inputs, and adjust
   their labels, types, options and validation. **Form → Layout** controls columns.
   Passed values whose destinations are form fields become editable prefills;
   other destinations are submitted hidden. **Default / hidden values** configure
   constants, which take precedence over mappings. Edit prefills follow field
   defaults → clicked record → passed values → constants.
6. Optional: configure the same conditions as table actions, a workflow schema
   and name, or a link template such as `/items/{{item._id}}`. No custom script is
   required. A workflow receives the original record plus the configured payload;
   Create sends only its configured values.
7. Click **Apply action**, then **Save** the design or placed page copy. Applying
   is one undoable change. Cancel discards the dialog draft. **Remove action**
   leaves an ordinary non-navigating button.

The canvas, gallery and Sample records previews never execute these actions.
Test the saved page in react-template. Forms wait for a successful request before
closing; failed requests keep entered values available for retry. Existing table
forms, authenticated project requests and backend access rules are reused.
Successful visual actions refresh matching cards and tables directly. Schema
change events continue refreshing data changed elsewhere.
Unsupported/malformed actions or missing record values disable the affected
button with an explanation. Separate component state variables and counters are
not part of this increment.


Built-in admin regression scripts: run `scripts/visual-library-browser-fixture.js`
then `scripts/verify-admin-templates.js` through an isolated playwright-cli session
on panel3016. The latter checks all previews, filtering, copying/saving, mobile
width and authored canvas button colors. All API records and saves stay in memory.

## Conditional text, background and border colors

Select a styled component **inside a Repeater**, open **Design → Conditional
colors**, and click **Add color rule**. Choose a schema field or enter a path such
as `item.price` or `item.details.price`. Set the comparison/value, then enable the
text, background and/or border colors you want and use their color pickers or
presets. Save the design or placed copy as usual.

For price bands, add these rules:

| Rule | Comparison | Values | Example colors |
| --- | --- | --- | --- |
| 1 | Less than | 20 | Green text/background/border |
| 2 | Between | From 20, To 100 | Amber text/background/border |
| 3 | Greater than or equal | 100 | Red text/background/border |

Between includes From and excludes To: 20 matches the middle band, 100 matches the
last band. Use the arrows to change priority. **The first match wins**, without
merging later rules. Unselected color targets keep their normal styling. No match
or missing data keeps the original style. Remove all rules to return to static
colors. Up to 20 rules can be configured on each styled component.

Numeric fields commit when leaving the input or pressing Enter. Negative and
decimal values are supported. Invalid numbers/ranges are rejected visibly and the
last saved value is restored. To move a whole range above its previous upper bound,
raise To first, then change From. Each rule must retain at least one color.

Numeric comparisons require actual finite numbers, without converting strings,
blanks, null or missing fields to zero. Equals/not-equals also support typed text
and true/false values, for example a status or availability field. Comparisons
use field paths, not expressions or JavaScript.

The normal design canvas shows default colors without a record. Use **Sample
records → Preview data** to see matches. Published records use the same rules,
without any extra API requests. A matching text color replaces that component's
text paint; a matching background replaces its background paints with one solid
paint, including transparency. Explicitly styled descendants keep their own
colors. Border color requires a visible width in **Border and shadow**. Containers
which do not own their styles (such as the Repeater or tab container) use a styled
Card/Stack/Flex or child component for conditional coloring.


## Connect a visual details panel to table selection

1. In **Pages**, edit the source table. In **Component Outputs**, click **Expose selected record**, then save the table and page.
2. Add your visual design to the page, or select an existing visual section and click **Edit visual section**. Save any pending design changes.
3. In the placed editor's header, click **Data connection**. Choose the table's selected-record output and click **Save connection**. The dialog is optional; choose **No connection** to remove a connection.
4. Design the details panel with ordinary fields such as `{{item.name}}`, `{{item.email}}`, or `{{item.address.city}}` outside a Repeater. Save the design. Repeaters retain their own collection/item data.
5. Open the project page in React Template. The first visible valid row automatically fills the connected panel. Click a normal table row, or focus it and press Enter/Space, to display another record. No bulk-selection activation or checkboxes are needed. If the active row is filtered out, deleted or paged away, details fall back to the first visible valid row. Empty results or removing the source table clear the details. Bulk-selection checkboxes remain independent.

The table must return a unique `_id` (string or number). The selected record includes fields returned by the authorized table request even when they aren't displayed as columns; existing visual action buttons can use `item._id`. The panel uses the current data record, so a table refresh updates details without another selection request. UI-only nested-row renderers are excluded. Normal repeaters inside the visual design retain their own item scope.

The connection is stored on this page placement as `dataBinding.parameters.item` referencing stable component/output IDs. Saving a design to the visual library doesn't include its page-specific connection. Independently placed copies can connect to different tables. Source output: `{type: "record", source: {kind: "tableSelectedRecord"}}`; record values are output-only, not new page filter or variable types. Existing outputs and request bindings continue to work.

The frontend and backend changes must both be loaded. These connections reuse the existing page-runtime store/compiler/resolver and existing table data; they introduce no second state store or record fetch.


## Reorder page sections

Open **Pages → Edit → Content**. In **Structure**, use the up/down arrows beside a section to move it in the page order. Grid sections, visual sections and existing top-level component/tab sections share this list. The first section cannot move up; the last cannot move down.

The selected section stays selected as it moves, so further edits apply to that same section. Click **Save Page** to publish the new order; **Cancel** can discard unsaved ordering changes. Section IDs, component data connections and nested content are retained. Sections inside a tab keep their own internal order.


### Collection filter comparisons (2026-11-05)

Select the **Repeater** in Layers, then open **Data → Add filter**. The operator
menu offers **Equals (`eq`)**, **One of (`in`)**, **Greater than (`gt`)**,
**Greater than or equal (`gte`)**, **Less than (`lt`)**, and **Less than or equal (`lte`)**.
Number fields support all six; text/enum/boolean fields use Equals or One of.
Date fields support Equals and the four comparisons, with `YYYY-MM-DD` values.
Dates are compared against **midnight UTC**: Equals matches that timestamp;
to include an entire day, use `gte` on that date and `lt` on the next date.

For a range, add two filters with the same field, such as `price gte 10` and
`price lt 100`. Both bounds must match. Lower and upper bounds are sent as
repeated parameters (`price=gte-10&price=lt-100`); neither is overwritten.
Commit a value with Tab, Enter or a click elsewhere before saving. Negative
and decimal values keep their numeric type. Runtime validation reports invalid
values, incompatible operators, duplicate lower/upper bounds, and empty/reversed
ranges. Keep one Equals/One of clause per field, or one lower plus one upper bound.
Schema metadata is required for filtered requests. Existing Equals/One of designs
remain compatible. Other workflow/Mongo operators are not supported by the list
endpoint and are not exposed here.

Verification: both frontend suites, standalone TypeScript checks, targeted lint
and production builds; backend utility tests include narrow decimal ranges and
native integers above float64's exact range. Browser checks author/save paired
numeric bounds and a date filter in Tenant Panel, then render only matching
cards in React Template using in-memory API fixtures. Actual Go filter tests
verify the backend query parser; browser fixtures do not replace a deployed
Mongo integration test.


### Fill a page cell (2026-11-05)

Open a placed visual design from **Pages → its cell → Edit visual component**,
then choose **Cell sizing → Fill page cell → Save sizing** in the placed
editor's top bar. **Design size** restores the authored outer dimensions.
Save any pending design changes before saving a different sizing setting.

Fill page cell adapts the whole design's outer root to the cell's available
width and height. Text and internal cards/images retain their authored sizes;
use their Sizing controls to change them. Height follows the grid row and
shares remaining space with cell filters and other components. Mobile cells
that stack vertically use their natural content height. A constrained design
with overflowing content scrolls. Root animation and background/overlay effect
wrappers preserve the fill behavior.

The option belongs only to this placement (`props.visualCellSizing: "fill"`),
so independent copies and the reusable library design keep their own sizing.
Ordinary design, theme and connection saves preserve it. Saves use the existing
page conflict check and confirm the setting in the canonical readback.

Verified with frontend tests/types/lint/builds and isolated browser fixtures:
desktop root matched its 640 × 420px cell; with a filter/header/footer it filled
the remaining 640 × 238px; on mobile the root followed its content height;
constrained overflow scrolled, and Design size restored 320 × 160px. Both root
animation and background effect were active in the shared-space case. Fixture
API data stayed in memory; no existing user pages were edited.
