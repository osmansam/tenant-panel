# Insert designed visual components into native page cells

The user wants to design components on a separate Tenant Panel screen, then add them through the cell's existing Add action in the native page editor shown in their screenshot. They explicitly chose an independent copy per page, so later source-design changes must not update existing placements.

Approaches: independent snapshots (chosen by user) reuse the existing custom visual envelope and renderer. Linked components would require runtime reference resolution and were declined. A browser-local template-only picker would hide saved designs from other browsers, so use the project's saved page visual blocks as sources; no new backend resource is required.

Native Add Component gains a Visual component option, a project-scoped design picker labelled with source page and design name, and an independent-copy explanation. A selected design is validated and deeply copied into the selected cell with fresh component/document identity. Its theme is preserved; fresh node IDs avoid DOM collisions when reusing designs, with internal menu/anchor references remapped. No table schema is required. Source read errors, empty libraries and invalid documents are explicit and cannot be added. Already-saved copies can be edited in the separate visual builder.

The same picker is available for a Tab Panel child, preserving the native single-child rule. An existing visual child can be retained or replaced without stripping its JSON. Page/component persistence uses the existing save flow and retains draft/error behavior. The runtime already renders these blocks in cells and tabs; no authoring code or new request is added there.

Developer choices: use saved project visual blocks as the reusable library, keep the existing separate builder as their authoring screen, regenerate component/document/node identities and remap the schema-defined internal references so navigation controls remain valid. Backend remains unchanged.
