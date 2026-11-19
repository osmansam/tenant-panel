# Browser smoke suite

`yarn test:e2e` runs ten Chromium journeys against production Go HTTP routes and a real MongoDB replica set. There are no mocked successful API responses. The only browser response injection is an explicit 503 dependency outage. Session expiry removes the browser's real HttpOnly cookies.

## Local setup

Use Node 22.22.0 with Corepack/Yarn 4.5.0, Go matching the backend's `go.mod`, `redis-server`, `mongod`, and its matching `mongo` or `mongosh` shell. On this workspace the Mongo 5 binaries are available under `/opt/homebrew/opt/mongodb-community@5.0/bin/`; the launcher detects them. Set `MONGO_SHELL_BIN` if the shell is elsewhere.

Check out `github.com/osmansam/autotable-Go` next to this repository, or set `E2E_BACKEND_DIR` to its absolute path. Use the backend revision intended for the panel release, including the collaboration routes and invitation delivery worker.

```sh
corepack enable
yarn install --immutable
yarn e2e:install
yarn test:e2e
```

Ports 4173 and 4174 must be free. The launcher builds the panel-owned `e2e/backend/main.go` against the backend checkout without editing backend files. It builds the production frontend into its own temporary directory, then starts loopback-only Vite preview and Go servers, a temporary Mongo replica set on an unused port, and a temporary Redis process on an unused port. A generated `tenant_panel_e2e_*` database is the only database seeded or dropped. No application `.env` is loaded by the fixture server. Processes and local Mongo files are cleaned up when Playwright exits.

For a task-owned Mongo replica set already running on loopback, set `E2E_MONGO_URI='mongodb://127.0.0.1:27018/?replicaSet=panel-e2e'`. Remote URIs are rejected. The suite still chooses its own random database and starts its own Redis. Never supply an application database.

## Journeys and evidence

1. Login, select project, open members in a second tab, logout, and confirm both tabs and live tenant/project sessions are signed out.
2. Preserve cached workspace during an injected 503; recover after reload; expire real cookies and return to login.
3. Create a new account through an emailed invitation and verify live project scope.
4. Reauthenticate an existing verified account and accept its invitation.
5. Block the wrong signed-in account, sign out, and join using the invited account.
6. Queue an invitation in the UI, capture its delivered email, change a member's role, remove access, and verify persistence after reload.
7. Switch projects and verify inactive projects are disabled in the UI and rejected by the API.
8. Edit page designer metadata, save through the real PATCH route, and verify persisted state after reload.
9. Hard reload `/projects/<actual project ID>/members` and recover verified permissions and member data.
10. Open and reload the visual builder deep link and load the saved placed visual component from the real page API.

The fixture creates bcrypt accounts, tenant/project memberships, an editable page and the collaboration schema-ready marker. Login, cookies, refresh, live membership authorization, acceptance transactions, and page writes use the production implementations. Invitation email capture implements only the transport interface passed to the production outbox delivery worker; token creation, encrypted delivery storage, and delivery processing are real. Fixture controls are loopback-only and protected by a fresh per-run secret. Browser contexts and database seed are reset for each test; one worker prevents shared fixture races.

Playwright retains trace, screenshot and video evidence on failure under `output/playwright/results/`; HTML results are under `output/playwright/report/`. Open a failure trace with `yarn playwright show-trace <trace.zip>`. These artifacts can contain disposable test credentials and invitation tokens; CI retains them for seven days. `output/playwright/fixture.json` is transient and is removed during cleanup.

## CI setup

The `Browser smoke` workflow exposes the check `browser-smoke`. The Go backend repository is currently public, so checkout uses the standard GitHub token. If the backend becomes private, configure the optional `BACKEND_READ_TOKEN` repository secret with Contents read access to `osmansam/autotable-Go`; checkout prefers that token when present. Configure the `BACKEND_REF` repository variable to the reviewed backend commit SHA; absent that variable, checkout uses the locally verified backend commit `9d297229a248200040229ac9c7b83de4fc602f6d`. Update this pin or the variable only with a reviewed, smoke-verified backend revision.

The workflow starts Mongo 7 as a single-member replica set, installs Redis, installs Chromium and runs the same command. Failure artifacts are uploaded. Public backend checkout also works for fork PRs. If private-backend credentials become necessary, fork PRs cannot read repository secrets; a maintainer must run the workflow in a trusted branch with the configured secret. Do not change this workflow to `pull_request_target` to expose credentials to untrusted code.
