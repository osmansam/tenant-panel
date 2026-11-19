# Changelog

User-facing changes awaiting a release are recorded below. Release headings are
added only when a version and its verified commit are actually released.

## Unreleased

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
  pinned Node/Yarn engines, MIT license, pull request checklist and automated
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
