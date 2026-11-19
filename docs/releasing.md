# Release runbook

## Reproducible verification

Use Node 22.22.0 and Yarn 4.5.0, matching `.nvmrc`, `package.json` and CI:

```sh
nvm use
corepack enable
yarn install --immutable
yarn release:check
```

The release command runs `yarn test:lint`, `yarn test:coverage-gate`,
`yarn test:server`, `yarn test:performance-gate`, `yarn lint`,
`yarn test:coverage`, `yarn build`, `yarn templates:check` and
`yarn check:bundle` in sequence: lint-ratchet, coverage-ratchet, CSP collector
and performance-gate regression tests, lint, Vitest with V8 coverage floors,
TypeScript/Vite production build, starter template catalog verification and
compressed JavaScript budgets. The CI **Release checks** job also runs
`yarn audit:high` and uploads `coverage/lcov.info` and
`coverage/coverage-summary.json`. The release command does not replace the
real-backend browser smoke job (`yarn test:e2e`) or Lighthouse CI performance
budgets (`yarn test:performance`). `yarn lint` permits only the measured legacy
findings recorded in `scripts/lint-baseline.json`; new debt fails. Follow
[the ratchet policy](../scripts/lint-ratchet.md) when reducing that baseline.

Run `yarn analyze` to inspect `output/bundle-stats.html` when a budget fails.
`scripts/check-bundle-size.mjs` is the source of truth for per-chunk and aggregate
limits. It compresses emitted JavaScript with gzip level 9 and brotli quality 5:

| Encoding | Per JavaScript chunk | All JavaScript chunks |
| --- | ---: | ---: |
| gzip | 350,000 bytes | 11,000,000 bytes |
| brotli | 300,000 bytes | 10,000,000 bytes |

Aggregate totals include lazy chunks: they do not represent one page's initial
transfer. A higher limit requires an explicit reviewed explanation, not a change
made solely to make CI green. The analyzer report is a local diagnostic artifact.

## Browser smoke and fixtures

The **Browser smoke** workflow's **browser-smoke** job must run against the real
`autotable-Go` API and a
fresh MongoDB replica set. It must not silently skip when the backend checkout,
fixtures or services are unavailable. Keep the backend revision in the release
record alongside the panel SHA; backend/session/visual-model compatibility is
part of the release.

Install Chromium with `yarn e2e:install`, then run `yarn test:e2e`. Local setup
needs Go, Redis, MongoDB and a Mongo shell; `E2E_BACKEND_DIR` optionally selects
the backend checkout (default `../autotable-Go`). Follow [the smoke guide](e2e.md)
for exact prerequisites, fixture ownership and CI configuration. Both the panel
and backend repositories were confirmed public on **2026-11-18**; CI uses the
standard GitHub token for backend checkout. `BACKEND_READ_TOKEN` is optional and
needed only if repository access later requires a separate token. Set repository
variable `BACKEND_REF` to a reviewed backend SHA for a reproducible release
rather than relying on `main`.

Never point a fixture runner at a developer or production database: it creates
test identities, projects and saved content. Failure traces,
screenshots and reports can contain test data and must receive appropriate
artifact access and retention. See the workflow for the exact service versions
and environment used in CI.

## Required GitHub checks

On **2026-11-18**, `main` branch protection was configured successfully through
the GitHub API to require **Release checks** and **browser-smoke**, with strict
up-to-date checks. Administrator enforcement remains enabled, force pushes and
branch deletion remain blocked, and the existing review settings were preserved
(zero required approvals). No test PR has yet exercised this configuration; no
deployment or release tag has been completed for this change.

For maintenance or another release branch, update the branch protection rule in
**Settings → Branches**, or an equivalent active ruleset in
**Settings → Rules → Rulesets**. A committed workflow alone cannot configure
these remote settings:

1. Require a pull request before merging.
2. Require status checks before merging; select **Release checks** and
   **browser-smoke** from this repository's GitHub Actions workflows.
3. Require branches to be up to date before merging, or use a configured merge
   queue whose events also run the required workflow.
4. Preserve administrator enforcement, blocked force pushes/deletion and the
   intended review settings; inspect bypass permissions deliberately.

Let both jobs run at least once so GitHub can offer their exact check names. A
failed or missing backend checkout must leave **browser-smoke** failed, not make the
required check disappear. Exercise protection with a test PR and retain that
evidence in the release record. Recheck remote settings when maintaining the
workflow or moving the release branch.

## Build configuration and private source maps

Set `VITE_API_URL` and `VITE_RUNTIME_APP_URL` for the target environment before
building. Browser monitoring is optional and starts only in a production build
with `VITE_SENTRY_DSN` set. Set `VITE_APP_ENV` to a stable environment name, such
as `staging` or `production`. A Sentry-compatible service must support the SDK's
event ingestion protocol; a compatible error endpoint alone does not establish
support for source-map upload APIs.

The build injects `__APP_RELEASE__` from `GITHUB_SHA`, `VERCEL_GIT_COMMIT_SHA` or
the local `git rev-parse HEAD`, in that order, and requires a full SHA. Browser
events and source maps identify the same code. Deploy from the verified committed revision. Keep
build metadata and environment labels free of user data.

Source-map upload uses build-only secrets `SENTRY_AUTH_TOKEN`, `SENTRY_ORG` and
`SENTRY_PROJECT`; `SENTRY_URL` optionally selects a self-hosted service. Never
prefix upload credentials with `VITE_`. Supply them only in the trusted release
build environment. Hidden source maps are generated only when all three required
upload settings are present; otherwise generation and upload are disabled.
With upload configured, confirm it succeeded and emitted `.map`
files were removed before publishing `dist/`. Do not publish maps, the analyzer
report, build credentials or local environment files as static assets.

Monitoring is initialized in `src/observability/index.ts`. Its privacy allowlist
in `src/observability/privacy.ts` removes free-text errors, request/user context,
URL query/fragment data and breadcrumb payloads. It retains filtered stack
locations, validated source-map debug IDs/asset locations and LCP/INP/CLS
measurements. The source-map metadata allowlist is covered by a privacy regression
test. Replay and automatic request tracing are
not enabled. Before rollout, send a synthetic staging error containing dummy
email/token/query/fragment values and inspect the ingested event and source-map
resolution; the privacy unit tests do not verify an external account. Also check
that web-vitals events carry the expected release and environment. Treat adding
new event fields or integrations as a privacy boundary change.

## Deployment and security headers

Publish the built `dist/` directory with SPA fallback to `index.html`. Vercel
configuration lives in `vercel.json`; `deploy/nginx.conf` supplies a reverse-proxy
hosting example. The nginx example is restricted to a private HTTP hop behind a
trusted HTTPS terminator and forwards `X-Forwarded-Proto: https`; do not expose
its HTTP listener directly. Adapt its root, upstream and deployment paths to
the host. Preserve SPA fallback for direct links such as invitation acceptance,
project settings and the visual builder.

Inspect actual HTTPS response headers after deployment. Vite development/preview
servers do not prove that hosting headers are installed. Review the report-only
CSP against the exact API, runtime, monitoring, font, media and embed origins used
by that environment. Explicitly list required production origins before turning
it into an enforcing policy. Keep frame restrictions and the iframe renderer's
URL validation/sandbox protections in place during CSP rollout.

For CSP reports, the repository includes a bounded `/csp-report` collector
(`api/csp-report.js` for Vercel and `server/cspReportCollector.mjs` /
`deploy/Dockerfile.csp` behind `deploy/nginx.conf` for container hosting). The
report-only policy sends violations to `/csp-report`, and the collector retains
only aggregate directive, disposition, status and count fields (never blocked
URLs, payloads or client IPs). `X-Frame-Options: DENY` and
`X-Robots-Tag: noindex, nofollow` are enforced alongside the report-only CSP,
and the **Staging container smoke** workflow verifies actual `nginx` headers and
`/csp-report` handling on every push and pull request. Start with staging and
production report-only observation, exercise supported embeds and visual
effects, fix or explicitly approve required sources, then replace the header
with enforcing `Content-Security-Policy` in a reviewed change. Keep that header
change independently reversible if legitimate content is blocked. The iframe
renderer's absolute HTTP(S) URL check and `sandbox="allow-scripts"` are enforced
independently.

Serve HTTPS, validate API credentialed CORS/cookie behavior, and verify protected
routes fail closed during session verification failures. Coordinate collaboration
flag/migration work with the backend's `docs/collaboration/operations.md`; frontend
build settings cannot grant server capabilities.

## Dependencies and security review

Run `yarn audit:high` to check direct and transitive dependencies for high or
critical advisories. Dependabot checks Yarn dependencies and GitHub Actions
weekly. Review major
upgrades individually and exercise affected visual effects, date handling,
editor/runtime compatibility and authentication. Keep the immutable lockfile in
version control. Review the CI high-severity audit output, including transitive
findings; document a specific advisory and mitigation for any unresolved issue
rather than interpreting a successful build as a security audit.

## Record and tag the verified commit

This repository's placeholder package version is not a release record. Keep
changes under `CHANGELOG.md`'s **Unreleased** heading until a real version is
chosen. Update the changelog/version as appropriate, commit the final content,
and verify that committed SHA. Tagging a dirty working tree only tags the old
commit; it does not include the files just tested.

A release operator can use the following after the reviewed commit exists:

```sh
git status --short
git rev-parse HEAD
```

Require a clean tree, record that full SHA, run the full checks for that SHA and
confirm both required GitHub checks pass on it. Then substitute the real version
and recorded full SHA explicitly:

```sh
git tag -a <release-tag> <verified-full-sha> -m '<release-tag>'
git rev-parse '<release-tag>^{commit}'
```

Compare the second command's result to the recorded verified SHA before pushing
the tag through the normal release process. Record panel SHA/tag, backend SHA,
check URLs, build environment and deployment identifier. Do not create a release
heading/tag or claim deployment or remote monitoring setup
until those operations have actually happened.

To roll back, redeploy the previous verified artifact with its original build
environment and SHA. Do not rebuild the old source using today's settings and
assume the result is identical. Avoid deleting backend migration history or
changing cookie/session state as part of a frontend rollback; verify stored
visual documents remain supported by the chosen runtime and panel versions.
