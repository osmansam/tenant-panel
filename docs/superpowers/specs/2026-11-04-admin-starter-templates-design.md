# Built-in admin visual templates

## Intent

Add common, ready-to-use admin interface designs to Tenant Panel's visual builder.
Developers should be able to see previews, choose a starter, customize it, and
insert an independent copy into a page section, cell or manual tab.

## Proposed first set

1. Dashboard KPI strip: four statistic cards with labels, values and trend hints.
2. Record card grid: image, name, secondary value, status and action buttons.
3. Compact record list: aligned rows with primary/secondary text and actions.
4. Customer/user profile: avatar, identity, contact details, status and actions.
5. Record details panel: responsive labeled values with an action footer.
6. Order/invoice summary: reference, status, line items and amount breakdown.
7. Activity feed: timestamped events with clear descriptions and status markers.
8. Empty state: title, explanation and a primary action.

All use a consistent light admin style: neutral surfaces, readable typography,
subtle borders, restrained color, and responsive layouts. Every element remains
editable through the existing visual engine. Existing table/stat/avatar/chart/
timeline nodes can be used where appropriate; no replacement renderer is needed.

## Data and action scope

User selected: visual starters with clearly identified example content.
No project-specific schema names, real records, active mutations, or external API
requests are embedded. Users connect their own collections through Repeat with
data and bind content using {{item.name}} and other exact field paths. Buttons
are customized through Configure button action, including hidden item._id maps.
The user explicitly chose to configure their own data and actions.

## Approaches

- Built-in catalog in the existing gallery (recommended): works immediately in
  every project, needs no backend migration, and gives each insertion a fresh
  editable copy. Add a distinct Built-in admin templates source.
- Seed each project's saved library: would create managed database records,
  complicate upgrades/deletion and duplicate the built-in catalog. Not needed.
- Import the existing marketing starter catalog: does not match this admin use
  case or the user's earlier request to keep Ozmishow designs out of this gallery.

Selected implementation: a native admin-only catalog. All starters are visual-only;
the user configures data and actions.

## Integration and behavior

- Show Built-in admin templates alongside Saved designs and Browser templates,
  with thumbnails, enlarged previews, search and useful admin categories.
- Reuse the same gallery in library authoring and page insertion pickers.
- Use design starts a new draft; Choose design selects an insertable copy.
- Use existing copyVisualDesign to validate and regenerate all identities.
- Built-ins remain available if the server library is empty or unavailable.
- Existing saved/browser designs, independent page copies, and light-only runtime
  behavior remain unchanged. Built-ins do not write until the user saves.
- No backend schema/endpoints, runtime format changes, dependencies, arbitrary
  scripts or new query engine are required.

## Verification

Validate every starter with the actual document parser. Exercise the actual
existing gallery and picker for preview, search/category, independent-copy
creation and use when saved designs fail to load. Check responsive light previews
and real insertion/save in an isolated browser using in-memory API fixtures.
Run panel tests, TypeScript, relevant lint and a temporary-output production build.
Do not modify real project records or commit unrelated workspace changes.
