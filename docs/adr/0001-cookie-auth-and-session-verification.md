# ADR 0001: Cookie authentication and live session verification

Status: Accepted

## Context

The panel can switch tenant/project workspaces and restore UI context from
localStorage. Stored identity and roles can be stale after revocation or changes
in another tab. A stored user cannot establish server authorization.

## Decision

Use API-issued HttpOnly cookies. `src/utils/api/axiosClient.ts` sends
`withCredentials: true`, chooses tenant or project refresh endpoints from the
request scope, deduplicates refreshes for that scope, and retries only once.
`src/utils/auth.ts` exposes no JavaScript access/refresh token.

`src/utils/managementSession.ts` verifies the scoped `/session` response and
`/tenant/auth/me`, checks user/tenant/project identity, and rejects results if the
workspace changed while requests were in flight. `src/hooks/useAuth.ts` and
`src/navigation/PrivateRoutes.tsx` wait for that verification before rendering
protected content. Focus, scope changes and access-change events refresh it.
Verification unavailability fails closed; a 503 preserves local identity for a
later retry. Backend permission checks remain authoritative for every request.

## Consequences

Persisted `user`, `currentTenant` and `currentProject` are UI context only. Clear
cached data on identity/role/scope changes. Deploy panel/API on a supported
same-site HTTPS cookie topology with exact credentialed CORS origins; a frontend
environment value cannot fix server cookie or permission configuration. Cover
refresh, logout races and failed verification in session and navigation tests.
