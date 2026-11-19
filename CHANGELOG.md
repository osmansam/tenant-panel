# Changelog

User-facing changes awaiting a release are recorded below. Release headings are
added only when a version and its verified commit are actually released.

## Unreleased

## 0.1.0 — 2026-11-19

### Added

- Browser smoke coverage against the Go API and an isolated MongoDB replica set,
  including `@axe-core/playwright` accessibility scans across core routes.
- V8 coverage measurement, CI `lcov.info` artifact upload, initial floor +2% gate,
  monthly ratchet tooling and focused `src/visual-engine` unit/renderer tests.
- Lighthouse CI navigation and interaction performance budgets (LCP, CLS, INP) for
  `/login`, `/projects`, `/collections` and `/pages`.
- Optional Sentry-compatible error and web-vitals reporting tied to the build SHA.
- Compressed JavaScript bundle budgets, lazy starter template catalog splitting and
  an opt-in bundle analysis report.
- Hosting security headers (`X-Frame-Options: DENY`, `X-Robots-Tag: noindex, nofollow`),
  report-only CSP with a bounded `/csp-report` collector, CodeQL analysis,
  staging container smoke workflow and safer iframe/link URL allowlisting.
- Architecture decisions, release/troubleshooting/coverage/accessibility guidance,
  pinned Node and Yarn, MIT license, pull request checklist and automated
  dependency update configuration.

### Changed

- Release checks enforce lint rules (baseline reduced from 823 to 448 findings),
  coverage floors, server collector tests, performance-gate tests, TypeScript/Vite
  build, starter catalog verification and compressed bundle budgets.
- Refactored Page Designer editors and Projects workspace for keyboard accessibility
  and stable layout loading; removed dead `linkSupport.tsx` and tracked tool artifacts.
- Hardened WebSocket visibility reconnects, query staleness invalidation, runtime
  URL configuration and dev-only i18n debug logging.
- Upgraded Vite/Vitest and patched audited transitive dependencies.
- Excluded Yarn's generated installation state and runtime/tool artifacts from version control.
- Enforced the requested 250 KB per-chunk / 8.5 MB aggregate gzip limits.
- Fixed relative API WebSocket URLs and reverse-proxy upgrades; container checks
  now verify API forwarding and actual WebSocket handshakes.
- Required measured LCP, CLS and INP results, including strict budget boundaries,
  and strengthened deployment header checks and PR commit-history secret scans.
- Extracted typed table and collection tabs while preserving parent-owned editor drafts.

### Release limitations

- Sentry ingestion and source-map resolution require an operator-owned project and credentials.
- CSP remains report-only pending review of staging reports and supported embeds/effects.
- Performance budgets use three-run lab medians; individual cold-load outliers remain.
