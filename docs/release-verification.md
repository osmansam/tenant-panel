# Release verification — 2026-11-19

The release work is tracked in [PR #41](https://github.com/osmansam/tenant-panel/pull/41).
Use its exact head SHA and check links when assessing a release. Earlier results
for `a9bc3dcc926b3b7b9137c6839e496c1fe06f7af0` were green, but the corrections
below require their own checks and deployment.

## Corrections from the follow-up audit

- Lowered the enforced gzip budgets from 350,000/11,000,000 to
  250,000/8,500,000 bytes. No lint or coverage allowance increased.
- Fixed WebSocket construction for relative API bases and added nginx upgrade
  forwarding. Container CI checks API paths, cookies, forwarded protocol and the
  HTTP 101 handshake against a disposable upstream.
- Strengthened Lighthouse evidence checks to reject absent or inapplicable
  metrics, runtime failures, redirects and equality at the strict boundaries.
- Verified direct SPA caching, immutable assets, robots and report-only CSP
  collection. Protected-preview credentials stay out of output and redirects.
- Added checksum verification for Gitleaks and PR/push commit-range scans, so
  committing a secret and removing it before the tip does not evade the check.
- Extracted eight typed, stateless editor components. ComponentModal decreased
  from 4,862 to 4,076 lines, TableActionsTab from 2,211 to 763, and
  ContainerDetailsModal from 1,711 to 1,319. Parent state, IDs and callbacks remain
  in place. Independent AST comparison confirmed the moved JSX and prop wiring.

## Local verification

- `corepack yarn release:check`: passed; 1,108 Vitest tests across 190 files,
  lint ratchet 448 findings across 187 files, TypeScript and production build.
- Coverage: lines/statements 72.78059%, functions 55.98235%, branches 75.07001%.
  Initial-plus-two-point floors remain unchanged. See [coverage scope](coverage.md).
- Bundle: 393 JS chunks; largest 190,922 gzip bytes; total 8,407,128 gzip bytes.
  Totals include every lazy icon, template and effect chunk.
- `corepack yarn test:e2e`: 11/11 real-backend journeys; all seven axe scans had
  zero violations. Backend SHA: `9d297229a248200040229ac9c7b83de4fc602f6d`.
- `corepack yarn test:performance`: passed, with the measurements below.
- `corepack yarn audit:high` and immutable installation: passed.
- Gitleaks source checkout and full history: zero findings. A separate disposable
  repository proved the new range scan catches a synthetic committed-then-deleted secret.

| Route | Median LCP | CLS (all three runs) | Measured interaction INP |
| --- | ---: | ---: | ---: |
| Login | 754 ms | 0 | 42.5 ms |
| Projects | 1,597 ms | 0 | 51.3 ms |
| Collections | 1,904 ms | 0 | 57.1 ms |
| Pages | 1,938 ms | 0 | 47.2 ms |

These are lab budgets, not production field percentiles. Navigation uses three
Lighthouse runs with median LCP/CLS assertions; interactions use real Lighthouse
timespans with provided throttling. Individual cold LCP runs reached 2,653 ms for
collections and 3,311 ms for pages, so those routes still need cold-load work.

## External release requirements

- Confirm **Release checks**, **browser-smoke**, CodeQL, secret scan and staging
  container smoke on the final PR SHA. Container smoke supplies the actual nginx
  runtime proof; the local Docker daemon was stopped during this audit.
- Verify the final Vercel deployment with `yarn verify:live <https://preview-url>`.
  Authentication redirects do not prove application headers. Use the documented
  automation bypass for a protected preview, and revoke temporary test access.
- The Vercel project currently has no Sentry DSN or source-map upload settings.
  An operator must choose/create the Sentry project, configure the public DSN and
  build-only upload credentials, then verify a synthetic scrubbed error and its
  resolved source map. Local privacy tests cannot prove external ingestion.
- CSP remains report-only. Observe staging reports and exercise legitimate
  embeds/effects before reviewing an enforcing policy; a synthetic collector POST
  is not a substitute for that observation.
- No `v0.1.0` release tag is claimed here. Tag the exact verified committed SHA
  after the outstanding release evidence is recorded in the PR/runbook.
