# Visual authoring belongs in Tenant Panel

User correction, 2026-11-03: developers design pages in Tenant Panel; react-template only renders them. This supersedes the original runtime editor route.

1. Port the tested authoring engine and management save adapter into Tenant Panel. Add protected `/pages/visual-builder?page=ID`, a visible page action, project scope and page-write permission gates.
2. Preserve visual sections through ordinary native grid edits and preserve authored JSON through API normalization.
3. Remove authoring routes, management client and editor workspace from react-template. Keep the renderer, validation, themes and effects needed by saved documents.
4. Verify unit suites, type checking, lint, production builds and a browser round trip from panel save to runtime rendering; review the relocation.

Observed RED: pageLinks/gridSections missing; panel normalizer rewrote theme keys; runtime fallback messages exposed editor details. Baseline panel: 118 files / 656 tests, lint 0 errors / 10 warnings.

## Completed correction and evidence

- Tenant Panel owns the complete editor at `/pages/visual-builder?page=ID`, behind existing private routes and page-write roles. Pages list and native editor provide entry links. Requests/drafts stay pinned to the entry project if context changes.
- Native grid saves preserve opaque visual/tab sections. Review found that positional merging moved later grids when an earlier grid was deleted; a failing PagesSection integration test reproduced this, and symbol-tagged grid source slots now retain wrapper identity and placement without storing internal tags.
- The panel normalizer preserves visual envelopes, including case-sensitive and hyphenated keys; native workflow behavior remains intact.
- react-template retains validation, renderer, theme and effects, with no authoring route, workspace, management client, templates or local authoring persistence.
- API-driven repeating cards remain phase two as requested; the backend's existing non-atomic page writes are unchanged. Copied engine internals retain their prior tested behavior and licenses. No live project records were accessed or modified.

Validation on 2026-11-03:

- Tenant Panel: 127 test files / 685 tests passed. TypeScript check passed. Production Vite build passed, directed outside tracked artifacts. ESLint: 0 errors / 91 warnings (baseline 10, additional upstream engine/shared-control warnings).
- react-template: 128 reported test files / 713 tests passed (includes duplicate Vitest type suites). TypeScript check and production Vite build passed. ESLint: 0 errors / 46 warnings.
- Browser fixtures exercised the actual Pages action, failed-save retry, cancelled target switch/browser Back, new sections, JSON import/export, edits during an in-flight save, background read failure without draft loss, fresh Reload, scoped effect CSS, and save/reload -> runtime rendering. The runtime request trace loaded no editor/workspace modules. Runtime fixtures use project-scoped user storage, separate from panel management storage.
- Screenshots visually inspected: `output/playwright/visual-builder-relocation/panel-builder.png` and `runtime-page.png`.
- All 18 unrelated pre-existing runtime diff sections are unchanged from the relocation baseline; README retains the user's earlier content. Backend/reference repositories were left unchanged.
- One independent final source review reported the grid deletion issue; the regression was verified RED -> GREEN. No Critical or Minor findings remained. The review deliberately excluded a full re-audit of copied vendor internals, backend revision guarantees, phase-two live data, and unrelated user changes; these are existing scope boundaries. Browser verification was performed separately by the implementer.

Reproduce browser checks with the cached Playwright CLI, after starting local panel port3016 and runtime port3015 with a fixture API base ending `/api/v1`: load `scripts/visual-builder-browser-fixture.js`, open the Inventory page's Visual builder link, then run `verify-visual-builder-core.js` followed by `verify-visual-builder-relocation.js`. Requests are intercepted in memory; external traffic is blocked.
