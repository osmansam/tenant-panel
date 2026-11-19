# Tenant panel production readiness implementation plan

> Execute inline, task by task, using the supplied six-move brief as the specification.

**Goal:** Make regression checks meaningful and add browser coverage, runtime feedback, security boundaries, and release documentation.

**Architecture:** Extend the existing Vite/React application and release workflow. Preserve live visual-engine integrations. Run browser journeys against the real Go API and an isolated Mongo replica set; fault injection is limited to expiry/unavailability scenarios.

**Tech stack:** React 18, TypeScript, ESLint flat config, Yarn 4.5.0, Node 22.22.0, Vitest, Playwright, Sentry-compatible monitoring, Go API, MongoDB.

## Constraints and decisions

- Work in the existing feature checkout; do not push or deploy. Configure the explicitly requested required checks while preserving existing remote protections.
- Retain dependencies with actual source imports, including bundled visual effects.
- Prefer date-fns (already required by the date picker) and motion (used by bundled effects).
- Hooks violations are errors. Ratchet legacy warnings without disabling rules globally; document the measured count rather than invent a passing count.
- Enable compiler unused checks and repair the existing unused declarations.
- Optional monitoring must require a DSN, scrub payloads, and use the build's git SHA. Never expose source-map upload credentials.
- CSP starts report-only; iframe scheme validation and sandbox are enforced immediately.
- A release tag must identify verified committed content. Prepare release tooling and document any unavailable external step.

## Review focus

- Conditional hooks and effects that accidentally loop after dependency fixes.
- Invalid dates, leap days, and calendar-day arithmetic across daylight savings.
- Secrets in invitation fragments, URLs, error messages, breadcrumbs, and source maps.
- Anonymous deep links, expired sessions, unavailable verification, and other browser tabs.
- CI checkout of a private backend and fixture isolation from developer databases.

## Task 1: Enforced lint and compiler checks

- [x] Enable recommended TypeScript, hooks, accessibility, and no-console rules; add a logger exception.
- [x] Measure findings, fix hooks errors and unused compiler declarations, then enforce a documented warning ratchet.
- [x] Verify ESLint catches synthetic conditional hooks and compiler/build passes.

## Task 2: Dependencies and compressed budgets

- [x] Remove verified unused direct dependencies and update the immutable lockfile.
- [x] Consolidate date/animation imports; verify date behavior with existing and focused regression tests.
- [x] Replace raw chunk budgets with gzip/brotli per-chunk and total budgets; test incompressible and compressible fixtures.
- [x] Add an opt-in bundle visualizer and reduce the eagerly loaded icon registry while retaining stored icon names.
- [x] Run production build, budgets, and relevant tests.

## Task 3: Browser smoke journeys

- [x] Add Playwright configuration, isolated fixtures, and the ten requested journeys against the Go backend.
- [x] Add CI with a Mongo replica set and backend checkout; do not silently skip missing fixtures.
- [x] Run locally when dependencies/services are available; retain trace/report artifacts on failures.

## Task 4: Observability

- [x] Test PII scrubbing before implementing it, covering URLs, messages, user data and breadcrumbs.
- [x] Add opt-in Sentry-compatible errors and LCP/INP/CLS reporting with git SHA release.
- [x] Configure private source-map upload and deletion; verify a credential-free build works.

## Task 5: Security

- [x] Add failing iframe scheme/sandbox regression tests, then implement the minimum sandbox.
- [x] Add report-only CSP and other headers to hosting/reverse-proxy configuration.
- [x] Add high-severity dependency audit and Dependabot; inspect audit results.

## Task 6: Documentation and release hygiene

- [x] Replace README, expand environment example, pin Node, add five ADRs, changelog and PR template.
- [x] Document required checks, monitoring setup, deployment, security report rollout, E2E fixtures and troubleshooting.
- [x] Run release checks, browser smoke checks, audit and diff review; record remaining external requirements accurately.


## Verification record and remaining external work

- Real Chromium journeys: 10/10 passed against backend `9d297229a248200040229ac9c7b83de4fc602f6d`, disposable Mongo replica set and Redis. Follow-up logout test verified graceful shutdown and fixture-secret removal.
- First integrated release check: 919 tests, five ratchet tests, TypeScript, build and compressed budgets passed. Final combined check also passed after the source-map metadata privacy regression and concurrent extraction: 919/919 tests, 5/5 lint-ratchet tests, TypeScript, Vite build and both compression budgets. Final legacy lint count: 1,038 findings across 249 files, no new debt.
- High/critical dependency audit: no findings; immutable install verified. Vite/Vitest upgraded and patched transitive resolutions applied.
- Icon shared chunk decreased from 561,870 raw bytes to approximately 25,760 raw bytes (about 7,680 gzip bytes); optional analyzer artifact generated successfully.
- Review caught stripped source-map debug metadata. A failing privacy test reproduced it; validated debug UUIDs and asset URLs now survive while arbitrary metadata is discarded.
- GitHub `main` protection verified on 2026-11-18: strict `Release checks` and `browser-smoke`, existing admin/review/force-push/deletion protections preserved.
- Concurrent work extracted 13 source-inference helpers. TypeScript AST comparison against HEAD proved every helper identical (ignoring export/formatting/comments). Transferred their 11 existing `no-explicit-any` allowances from PageDesigner to the extracted file; total allowance did not increase. Other concurrent refactor content is preserved and is not attributed to this task.
- Monitoring account/DSN and source-map upload credentials still need deployment configuration; external event ingestion and deployed response headers cannot be verified from local builds.
- No release tag: the Wave 1 change set is being recorded as one coherent feature-branch commit, preserving the approved concurrent refactors. A semver tag remains pending first GitHub CI/PR validation and a reviewed release version. No push/deployment was performed.


## Wave 1 review closure

- Fixed the two lint regressions without increasing allowances: PageDesigner only exports its React component, cleaner tests import the extracted module directly, and the moved collaborator-role test supplies a complete typed fixture.
- Reduced the baseline to current findings with the decrease-only command; removed stale file/rule entries from the approved extractions and feature moves. Current legacy debt is 823 findings across 213 files; this is a growth gate, not a lint-clean claim.
- Stop tracking `.yarn/install-state.gz`, keep the local generated file, and ignore it so immutable installs do not dirty future commits.
- Review verified helper serialization/default extraction and collaboration moves preserve existing behavior. It also found a non-Error diagnostic losing all useful information after privacy filtering. A real SDK transport regression reproduced the failure, and production diagnostics now retain a synthetic safe stack without the original payload.
- Fresh release and real-backend browser verification are recorded in the task response; release checks are rerun against the resulting commit. GitHub workflow execution, staging CSP enforcement, production monitoring setup and a semver release remain explicitly outside this local verification claim.
