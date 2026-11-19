# Changelog

User-facing changes awaiting a release are recorded below. Release headings are
added only when a version and its verified commit are actually released.

## Unreleased

### Added

- Browser smoke coverage against the Go API and an isolated MongoDB replica set.
- Optional Sentry-compatible error and web-vitals reporting tied to the build SHA.
- Compressed JavaScript bundle budgets and an opt-in bundle analysis report.
- Hosting security headers, report-only CSP and safer iframe rendering.
- Architecture decisions, release/troubleshooting guidance, pinned Node version,
  pull request checklist and automated dependency update configuration.

### Changed

- Release checks enforce lint rules, a legacy warning ratchet and compiler unused checks.
- Upgraded Vite/Vitest and patched audited transitive dependencies.
- Excluded Yarn's generated installation state from version control.
