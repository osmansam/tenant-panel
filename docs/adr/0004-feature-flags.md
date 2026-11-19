# ADR 0004: Server-owned collaboration feature capabilities

Status: Accepted

## Context

Collaboration rollout depends on database migration readiness, session support
and mail infrastructure as well as the selected user's permissions.

## Decision

The Go API owns `COLLABORATION_MEMBERS_ENABLED`,
`COLLABORATION_INVITATIONS_ENABLED` and `COLLABORATION_RECOVERY_ENABLED` (all false
by default in its `configs/collaboration.go`). Follow the backend's
`docs/collaboration/operations.md` for migration and staged enablement.

The frontend reads the scoped capabilities endpoint through
`useCollaborationCapabilities` in `src/utils/api/collaboration.ts`. It validates
the returned tenant, project and authority scope, keys the cache by identity,
workspace and roles, and does not retry a failed capability query. Member screens
combine capabilities with management permissions. Mutations still require
backend authorization.

## Consequences

Do not introduce a `VITE_*` override that grants these capabilities. Missing,
unavailable or mismatched capabilities cannot grant access. An operator changes
the API environment and readiness prerequisites, then restarts/redeploys the API;
rebuilding the panel alone does not enable collaboration. A future display-only
flag must remain separate from authorization and document its default/owner.
