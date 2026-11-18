import type { QueryClient } from '@tanstack/react-query';
import type { User, Tenant, Project } from '../types';
import { axiosClient } from './api/axiosClient';
import { readStoredUser } from './persistedContext';
import { emitCurrentProjectChange } from '../hooks/useCurrentProject';
export interface ManagementSessionView {
  user: User;
}
export interface AcceptedProjectInvitation {
  user: Pick<User, 'id' | 'email' | 'name'>;
  tenant: Tenant;
  allTenants: Tenant[];
  project: Project;
  roles: string[];
  tenantRoles: string[];
}
export const MANAGEMENT_ACCESS_CHANGED = 'management-access-changed';
export class ManagementContextChangedError extends Error {}
export function managementWorkspaceKey(): string { return JSON.stringify(['user','currentTenant','currentProject'].map(key=>localStorage.getItem(key))); }

export async function refreshManagementContext(expected: User | undefined = readStoredUser()): Promise<ManagementSessionView> {
  const workspace = managementWorkspaceKey();
  const project = expected?.roleScope === 'project';
  if (project && (!expected.tenantSlug || !expected.projectSlug || !expected.projectId)) throw new Error('Project context unavailable');
  const path = project ? `/${encodeURIComponent(expected!.tenantSlug!)}/${encodeURIComponent(expected!.projectSlug!)}/tenant-auth/session` : '/tenant/auth/session';
  const {
    data: session
  } = await axiosClient.get(path);
  if (!session?.authenticated || !session.user?.id || !session.tenantId || !Array.isArray(session.roles) || !session.roles.length || !session.roles.every((r: unknown) => typeof r === 'string') || expected && ((expected.id || expected._id) !== session.user.id || expected.tenantId !== session.tenantId || (project ? expected.projectId !== session.projectId : !!session.projectId))) throw new Error('Session does not match this workspace');
  const {
    data: account
  } = await axiosClient.get('/tenant/auth/me');
  if (managementWorkspaceKey() !== workspace) throw new ManagementContextChangedError('Workspace changed during verification');
  const live = account?.data?.user;
  if (!live || live.id !== session.user.id) throw new Error('Account does not match this workspace');
  return {
    user: {
      ...expected,
      ...live,
      _id: live.id,
      tenantId: session.tenantId,
      projectId: project ? session.projectId : undefined,
      roles: session.roles,
      role: session.roles[0],
      roleScope: project ? 'project' : 'tenant'
    }
  };
}
export function applyAcceptedProjectInvitation(result: AcceptedProjectInvitation, client: QueryClient, setUser: (user?: User) => void): void {
  const user: User = {
    ...result.user,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    _id: result.user.id,
    tenantId: result.tenant.id,
    tenantName: result.tenant.name,
    tenantSlug: result.tenant.slug,
    projectId: result.project.id,
    projectName: result.project.name,
    projectSlug: result.project.slug,
    roleScope: 'project',
    roles: result.roles,
    role: result.roles[0],
    allTenants: result.allTenants
  };
  client.clear();
  localStorage.setItem('currentTenant', JSON.stringify(result.tenant));
  localStorage.setItem('currentProject', JSON.stringify(result.project));
  localStorage.setItem('user', JSON.stringify(user));
  setUser(user);
  emitCurrentProjectChange();
}
