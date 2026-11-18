import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from './axiosClient';
import { collaborationBase, collaborationKey, type CollaborationScope, type CollaborationCapabilities, type Collaborator, type InvitationSummary, type Page, type RoleChange } from '../../types/collaboration';
import type { User } from '../../types';
import { hasManagementPermission } from '../managementPermissions';
export function canAdministerCollaboration(user: User | undefined, scope: CollaborationScope) {
  return !!user && user.tenantId === scope.tenantId && (scope.authority === 'tenant' ? user.roleScope === 'tenant' && hasManagementPermission(user.roles, 'tenant.project.members.manage') : user.roleScope === 'project' && user.projectId === scope.projectId && hasManagementPermission(user.roles, 'project.members.manage'));
}
export function useCollaborationCapabilities(user?: User) {
  const project = user?.roleScope === 'project';
  const path = project && user?.tenantSlug && user?.projectSlug ? `/${encodeURIComponent(user.tenantSlug)}/${encodeURIComponent(user.projectSlug)}/tenant-auth/collaboration-capabilities` : '/tenant/auth/collaboration-capabilities';
  return useQuery<CollaborationCapabilities>({
    queryKey: ['collaboration-capabilities', user?.id, user?.tenantId, project ? user?.projectId : 'tenant', user?.roles],
    enabled: !!user?.tenantId && (!project || !!(user.projectId && user.tenantSlug && user.projectSlug)),
    queryFn: async () => {
      const result: CollaborationCapabilities = (await axiosClient.get(path)).data.data;
      if (!result || result.tenantId !== user?.tenantId || result.scope !== (project ? 'project' : 'tenant') || (project ? result.projectId !== user?.projectId : !!result.projectId)) throw new Error('Collaboration capabilities do not match the workspace');
      return result;
    },
    retry: false,
    staleTime: 15000
  });
}
function useDirectory<T>(scope: CollaborationScope, kind: string, enabled: boolean) {
  return useInfiniteQuery<Page<T>>({
    queryKey: [...collaborationKey(scope), kind],
    initialPageParam: '',
    queryFn: async ({
      pageParam
    }) => (await axiosClient.get(`${collaborationBase(scope)}/${kind}`, {
      params: {
        after: pageParam || undefined,
        limit: 20
      }
    })).data.data,
    getNextPageParam: last => last.nextCursor || undefined,
    enabled,
    retry: false
  });
}
export const useProjectMembers = (scope: CollaborationScope, enabled = true) => useDirectory<Collaborator>(scope, 'members', enabled);
export const useProjectInvitations = (scope: CollaborationScope, enabled = true) => useDirectory<InvitationSummary>(scope, 'invitations', enabled);
function useCollaborationMutation<T>(scope: CollaborationScope, operation: (input: T) => Promise<unknown>) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: operation,
    retry: false,
    onSuccess: () => {
      void client.invalidateQueries({
        queryKey: collaborationKey(scope)
      });
      void client.invalidateQueries({
        queryKey: ['collaboration-capabilities']
      });
    }
  });
}
export function useChangeProjectMemberRole(scope: CollaborationScope) {
  return useCollaborationMutation(scope, ({
    userId,
    ...body
  }: RoleChange & {
    userId: string;
  }) => axiosClient.patch(`${collaborationBase(scope)}/members/${encodeURIComponent(userId)}`, body));
}
export function useRemoveProjectMember(scope: CollaborationScope) {
  return useCollaborationMutation(scope, ({
    userId,
    expectedVersion,
    reason
  }: {
    userId: string;
    expectedVersion: number;
    reason?: string;
  }) => axiosClient.delete(`${collaborationBase(scope)}/members/${encodeURIComponent(userId)}`, {
    data: {
      expectedVersion,
      reason
    }
  }));
}
export function useCreateProjectInvitation(scope: CollaborationScope) {
  return useCollaborationMutation(scope, ({
    email,
    role,
    key
  }: {
    email: string;
    role: string;
    key: string;
  }) => axiosClient.post(`${collaborationBase(scope)}/invitations`, {
    email,
    role
  }, {
    headers: {
      'Idempotency-Key': key
    }
  }));
}
export function useResendProjectInvitation(scope: CollaborationScope) {
  return useCollaborationMutation(scope, ({
    id,
    version,
    key
  }: {
    id: string;
    version: number;
    key: string;
  }) => axiosClient.post(`${collaborationBase(scope)}/invitations/${encodeURIComponent(id)}/resend`, {
    expectedVersion: version
  }, {
    headers: {
      'Idempotency-Key': key
    }
  }));
}
export function useRevokeProjectInvitation(scope: CollaborationScope) {
  return useCollaborationMutation(scope, ({
    id,
    version
  }: {
    id: string;
    version: number;
  }) => axiosClient.delete(`${collaborationBase(scope)}/invitations/${encodeURIComponent(id)}`, {
    data: {
      expectedVersion: version
    }
  }));
}
export function useRecoverProjectAdmin(scope: CollaborationScope) {
  return useCollaborationMutation(scope, (body: {
    userId: string;
    expectedVersion: number;
    reason: string;
  }) => axiosClient.post(`${collaborationBase(scope)}/members/recover-admin`, body));
}
export function collaborationError(error: unknown): string {
  const e = error as {
    response?: {
      data?: {
        message?: string;
        data?: {
          code?: string;
        };
      };
    };
  };
  return e.response?.data?.message || 'Unable to update collaboration. Try again.';
}
