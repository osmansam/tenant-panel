# Per-Action Form Layout Design

Each table action that opens an add/edit form owns an optional `formLayout` configuration. It supports a reliable 1–4 column preset, an overflow-visible toggle, and advanced `topClassName` and `generalClassName` overrides.

The tenant panel exposes these controls separately for the Add Button, every row action that uses a form modal, and Bulk Edit. Both runtime frontends resolve the saved configuration identically. Unconfigured actions retain the existing single-column flex layout, while Bulk Edit retains visible overflow.

Column presets map to statically declared Tailwind class strings so production builds include them. Advanced class strings are appended after preset classes, allowing intentional overrides while preserving the existing defaults.

