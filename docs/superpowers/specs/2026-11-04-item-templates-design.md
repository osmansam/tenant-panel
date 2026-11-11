# Item templates in the visual designer

The user approved the proposed `{{item.name}}` and mixed `Price: {{item.price}}` syntax and requested implementation in the existing designer. This is a small extension of the approved data-binding milestone.

Use the current v2 document and existing record-binding renderer. Store templates in the existing text/URL properties so editing, undo, saving, exporting, and independent page copies preserve the exact authored text. No new data fetching, dependencies, backend changes, or document version are needed. Explicit field-selector bindings keep their existing precedence; choose Static to enter a template instead.

Alternatives: converting tokens into the existing single-path binding would lose mixed text; a new expression/document format would add migration and evaluation complexity. Interpolating existing string properties is the smallest compatible approach.

Within repeater records, interpolate `{{item.field}}`, whitespace around tokens, and nested dot paths. Keep the canonical `item` scope even when the repeater display alias differs. Resolve only own properties; block prototype-related segments. Strings, numbers (including zero), and booleans become text. Missing/null/object/array values become empty strings. Unsupported expressions stay literal; never execute code or re-expand values obtained from a record. Outside a record context the authored text remains unchanged.

Support properties already covered by the binding system: heading/text/badge text; button/link labels and URLs; image/avatar sources and alt text; avatar fallback; icon accessible label; stat values/labels/prefix/suffix; quote content/author/role/avatar. Apply existing URL validation after interpolation, with an empty image source or `#` link for an invalid/unresolved URL template. Never fall back to a raw URL template containing braces.

Designer hints explain the syntax, its record scope, and the existing source selector. The sample-record preview and react-template runtime use the same resolver. Text is rendered through React's existing escaped output. No HTML interpolation, expressions, formatting helpers, external APIs, or nested repeater support are introduced.
