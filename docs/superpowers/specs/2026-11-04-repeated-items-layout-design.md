# Repeated items layout

The user approved controls on the Repeater for columns, spacing, alignment and mobile layout, choosing the responsive grid preset: 3 desktop columns, 2 tablet columns, 1 mobile column. The existing Card inspector continues to style each item. This extends the existing visual data feature in the current working trees.

## Approach

Use an optional `itemsLayout` on the existing v2 Repeater node. A configured repeater owns one responsive grid region, with one cell per record; its summary appears below the region. Preserve existing parent placement on that region. Existing repeaters without this field retain the current parent-driven flow until the author selects Responsive grid or Vertical list. New Repeat with data/new library repeaters start with the selected 3/2/1 preset, 16px gap and stretch alignment.

Changing a parent Grid instead was considered, but affects siblings and ties the collection to its surrounding page. A separate card widget would duplicate the existing engine and exclude Stack/Flex templates. An optional layout on the Repeater is the compatible reusable choice.

## Controls and behavior

Add a visible `Repeated items layout` inspector section on a selected Repeater, before its Data controls. Arrangement: Original parent layout, Responsive grid, Vertical list. Preset columns are mobile 1, tablet 2, desktop 3. Authors can change each breakpoint's columns (1–6) and gap in pixels (0–128), plus horizontal item alignment: stretch, start, center or end. Vertical list is the one-column preset at every breakpoint. Switching to Original removes the optional configuration.

The canvas shows one editable item at the width of its grid track for the selected device. Sample records preview shows all records in the configured layout. Published pages use 768px tablet and 1024px desktop viewport breakpoints, matching existing renderer conventions. The same layout must survive saving, copying a design onto a page, reopening, undo and redo. Queries, bindings and fetch counts are unaffected.

Each record's template remains grouped into one cell, even if the item slot contains several components. Respect authored Card width/height/max-width and other styling. Tell authors to select the Card's Sizing controls when a fixed width leaves room in a column. Do not silently override dimensions or add equal-height forcing. Grid spacing separates generated records; Card spacing still separates content inside a card.

Validate all layout keys and breakpoint maps, reject malformed/fractional/out-of-range numbers, preserve old documents without adding a field. CSS uses scoped classes/custom properties rather than generating utility classes. Keep loading, empty, errors, status captions, IDs, sibling content, safe template interpolation and light-only runtime behavior intact.

No backend changes, new dependencies, record actions, arbitrary APIs, automatic updates of independent page copies, carousels or drag ordering are included.
