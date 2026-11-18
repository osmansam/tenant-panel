export type CollaborationScope = {
  authority: 'tenant';
  tenantId: string;
  projectId: string;
} | {
  authority: 'project';
  tenantId: string;
  projectId: string;
  tenantSlug: string;
  projectSlug: string;
};
export interface Collaborator {
  id: string;
  userId: string;
  name: string;
  email: string;
  roles: string[];
  status: string;
  version: number;
}
export interface InvitationSummary {
  id: string;
  email: string;
  role: string;
  version: number;
  status: string;
  deliveryState: string;
  expiresAt: string;
}
export interface Page<T> {
  items: T[];
  nextCursor?: string;
  recoveryRequired?: boolean;
}
export interface CollaborationCapabilities {
  membersEnabled: boolean;
  invitationsEnabled: boolean;
  recoveryEnabled: boolean;
  canManageMembers: boolean;
  canInvite: boolean;
  canRecover: boolean;
  tenantId: string;
  projectId?: string;
  scope: string;
}
export interface RoleChange {
  role: string;
  expectedVersion: number;
  expectedRoles: string[];
  convertLegacyRoleSet: boolean;
  activateMembership: boolean;
  reason?: string;
}
export const collaborationRoles = [{
  value: 'project_admin',
  label: 'Administrator',
  description: 'Manage project configuration, members, and invitations.'
}, {
  value: 'project_developer',
  label: 'Developer',
  description: 'Build schemas, pages, and integrations; cannot manage members or delete schemas/pages.'
}, {
  value: 'project_editor',
  label: 'Editor',
  description: 'Edit pages and translations; cannot change schemas or manage members.'
}, {
  value: 'project_viewer',
  label: 'Viewer',
  description: 'Read project configuration, pages, and translations.'
}] as const;
export function collaborationBase(scope: CollaborationScope): string {
  return scope.authority === 'tenant' ? `/tenant/projects/${encodeURIComponent(scope.projectId)}` : `/${encodeURIComponent(scope.tenantSlug)}/${encodeURIComponent(scope.projectSlug)}/tenant-auth`;
}
export function collaborationKey(scope: CollaborationScope) {
  return ['collaboration', scope.authority, scope.tenantId, scope.projectId] as const;
}
