# AutoTable Tenant Panel

The React/TypeScript management application for AutoTable tenants and projects.
It manages projects, collections, pages, integrations, localization and project
members, and hosts the visual component editor. The Go API supplies authenticated
management data; the separate runtime application renders published pages.

## Local development

Use Node **22.22.0** (`.nvmrc`) and Corepack's pinned **Yarn 4.5.0**.

```sh
nvm use
corepack enable
yarn install --immutable
cp .env.example .env.local
yarn dev
```

Set `VITE_API_URL` to the API base, including `/api/v1` (the example uses
`http://localhost:3002/api/v1`), and `VITE_RUNTIME_APP_URL` to the runtime origin
(the example uses `http://localhost:3005`). Start the sibling `autotable-Go` API
separately with its development database configuration. Use the same hostname
consistently: `localhost` and `127.0.0.1` have different cookie scopes. The API
must allow the panel's exact origin with credentialed CORS.

Vite embeds every `VITE_*` value in browser code. Keep passwords, signing keys,
database URIs and source-map upload tokens in server/build secrets. Restart Vite
after changing local environment values; production changes require a rebuild.

## Commands and checks

| Command | Purpose |
| --- | --- |
| `yarn dev` | Start the Vite development server. |
| `yarn lint` | Run the repository lint rules and warning ratchet. |
| `yarn test` | Run Vitest once. |
| `yarn test:coverage` | Run Vitest with V8 coverage and enforce coverage floors. |
| `yarn build` | Type-check and build the production application into `dist/`. |
| `yarn check:bundle` | Check compressed JavaScript budgets after building. |
| `yarn release:check` | Run lint/coverage/server/performance-gate tests, lint, coverage, build, template catalog check and bundle budgets. |
| `yarn analyze` | Build an interactive bundle report in `output/bundle-stats.html`. |
| `yarn test:e2e` | Run Playwright smoke and axe accessibility journeys against an isolated real backend. |
| `yarn test:performance` | Run Lighthouse CI navigation and interaction budgets against the isolated backend. |
| `yarn audit:high` | Audit direct and transitive dependencies for high/critical findings. |
| `yarn serve` | Preview the production build locally. |

Run `yarn release:check` before submitting a change. Browser smoke tests require
an isolated real API and MongoDB replica set; see [release and smoke instructions](docs/releasing.md).
As of **2026-11-18**, `main` branch protection requires **Release checks** and
**browser-smoke**, with branches required to be up to date before merging.
Protection applies to administrators; force pushes and branch deletion remain
blocked. [PR #41](https://github.com/osmansam/tenant-panel/pull/41) exercises the
checks and Vercel preview deployment. See the [verification record](docs/release-verification.md)
for measured results and the remaining monitoring and release steps.

## Code map and decisions

| Path | Responsibility |
| --- | --- |
| `src/navigation`, `src/hooks/useAuth.ts` | Routing and live workspace verification. |
| `src/utils/api`, `src/utils/managementSession.ts` | Credentialed API calls, session transitions and query hooks. |
| `src/visual-engine` | Versioned document model, validation, editor and renderer. |
| `src/visualBuilder` | Management API persistence and page/library integration. |
| `src/pages/LocalizationPage.tsx` | Project content translation administration. |
| `src/utils/i18n.ts` | Management interface language detection and i18next setup. |

Architecture decisions cover [cookie sessions](docs/adr/0001-cookie-auth-and-session-verification.md),
[TanStack Query](docs/adr/0002-tanstack-query.md),
[visual documents](docs/adr/0003-visual-engine-model.md),
[server feature flags](docs/adr/0004-feature-flags.md) and
[localization](docs/adr/0005-i18n.md).

Select a project and open **Visual components** to save reusable designs. In
**Pages → Edit**, use **Structure → + Add → Visual section** to place a design.
Cell and Tab Panel insertion use the same library. Each placement is an
independent copy; editing the library does not update existing placements.

For monitoring, deployment headers, source maps, dependency updates and release
tags, use the [release runbook](docs/releasing.md). Operational failure diagnosis
is in [troubleshooting](docs/troubleshooting.md). Changes awaiting release belong
in [CHANGELOG.md](CHANGELOG.md).
