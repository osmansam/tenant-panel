# Troubleshooting

| Symptom | Check and action |
| --- | --- |
| Install differs from CI | Use `nvm use`, `corepack enable` and `yarn --version` (4.5.0), then `yarn install --immutable`. Resolve lockfile changes intentionally. |
| Login succeeds but session is lost | Inspect cookie acceptance, matching hostnames, API base including `/api/v1`, exact credentialed CORS origin and HTTPS/SameSite settings. Do not store access tokens in localStorage as a workaround. |
| “Unable to verify workspace access” | Inspect scoped `/session` and `/tenant/auth/me` responses and API/session-store health. A 503 denies protected rendering while preserving local identity; restore the API and reload. |
| Wrong or stale tenant/project view | Compare selected workspace with the verified session; check storage/current-project events and query-cache clearing. Never bypass identity validation to display stale data. |
| Collaboration controls unavailable | Inspect the scoped capabilities response, roles and backend migration readiness/`COLLABORATION_*` flags. Follow backend operations guidance; a frontend env override cannot enable authorization. |
| Visual components API unavailable | Check that the API revision includes the scoped visual-components endpoints; restart/update the backend. A 404 is not an empty library. |
| Visual save conflict | A 409 or changed target/revision means another editor changed the content. Preserve the local draft, reload the current server version and reconcile before retrying. |
| An embed is blank | Check permitted URL scheme, sandbox requirements, provider frame policy and browser CSP diagnostics. Keep unsafe schemes blocked; grant sandbox capabilities only for a reviewed requirement. |
| Deep link gives server 404 | Configure SPA fallback to `index.html` on the deployed host and verify the real URL directly. |
| No monitoring events | Use a production build with `VITE_SENTRY_DSN`, verify network ingestion/service configuration and expected environment/release, then send a synthetic staging error. Development intentionally does not initialize it. |
| Error details look filtered | Privacy filtering removes messages, request/user data and sensitive URLs. Use retained stack frames with private source maps; do not add secrets back to event payloads. |
| Bundle check fails | Build first, inspect `yarn analyze`, and compare compressed per-chunk/aggregate limits in `scripts/check-bundle-size.mjs`. Check newly eager imports and icon-family chunks. |
| Lint fails after a small edit | Read the reported file/rule regression and `scripts/lint-ratchet.md`. Fix it and reduce the baseline; do not reseed it to accept additional findings. |
| Browser smoke cannot start | Confirm the real backend checkout/revision, replica-set readiness and isolated fixture setup. Use CI traces/server logs; missing services or fixtures must fail visibly. |

When sharing logs or traces, remove cookies, authorization values, invitation
fragments, passwords, mail content and private database connection strings. Use
test identities for reproduction and record the panel/API SHAs, browser, failing
route and response status.
