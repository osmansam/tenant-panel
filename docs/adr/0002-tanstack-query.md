# ADR 0002: TanStack Query for server state

Status: Accepted

## Context

Management screens share remote lists and mutations, while project switching and
role changes must not expose another workspace's cached data.

## Decision

Keep one `QueryClient` outside the component in `src/App.tsx`. Use query/mutation
hooks in `src/utils/api` for server state and explicit invalidation after writes.
The shared factory (`src/utils/api/factory.ts`) uses infinite stale/cache times
and disables automatic refetch, so its consumers must invalidate intentionally.
Other hooks can choose their own freshness policy: collaboration capabilities
use a 15-second stale time; localization jobs poll only while pending/running.

Include all identity/scope inputs in query keys for scoped resources. Clear the
client on workspace transitions, invitation acceptance and relevant role changes
(`src/utils/api/auth.ts`, `src/utils/managementSession.ts`,
`src/hooks/useAuth.ts`). Keep unsaved editor state separate from the server cache.

## Consequences

Optimistic updates must snapshot and roll back on error, and mutations must
invalidate affected keys. Do not assume every query refreshes on focus: session
verification has its own focus handler, independent of cached resource data.
New hooks need a deliberate freshness and invalidation policy.
