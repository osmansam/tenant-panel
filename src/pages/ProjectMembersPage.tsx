import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../context/User.context';
import { PageShell, PageHeader, Section, WorkspaceDialog, Input, Label, Select } from '../components/ui';
import { GenericButton } from '../components/panelComponents/FormElements/GenericButton';
import type { CollaborationScope, Collaborator, InvitationSummary } from '../types/collaboration';
import { collaborationBase } from '../types/collaboration';
import * as api from '../utils/api/collaboration';
import { axiosClient } from '../utils/api/axiosClient';
import { InviteCollaboratorDialog } from '../components/collaboration/InviteCollaboratorDialog';
import { ChangeCollaboratorRoleDialog } from '../components/collaboration/ChangeCollaboratorRoleDialog';
import { ProjectInvitationsList } from '../components/collaboration/ProjectInvitationsList';
export default function ProjectMembersPage() {
  const {
    user
  } = useUserContext();
  const {
    projectId
  } = useParams();
  const scope: CollaborationScope = projectId ? {
    authority: 'tenant',
    tenantId: user?.tenantId || '',
    projectId
  } : {
    authority: 'project',
    tenantId: user?.tenantId || '',
    projectId: user?.projectId || '',
    tenantSlug: user?.tenantSlug || '',
    projectSlug: user?.projectSlug || ''
  };
  const authorized = api.canAdministerCollaboration(user, scope);
  if (!authorized) return <PageShell><p role="alert">Project or tenant administrator access is required.</p></PageShell>;
  return <MembersWorkspace key={JSON.stringify(scope)} scope={scope} />;
}
function MembersWorkspace({
  scope
}: {
  scope: CollaborationScope;
}) {
  const {
    t
  } = useTranslation();
  const {
    user
  } = useUserContext();
  const caps = api.useCollaborationCapabilities(user);
  const enabled = !!caps.data?.membersEnabled && !!caps.data?.canManageMembers;
  const members = api.useProjectMembers(scope, enabled);
  const invitations = api.useProjectInvitations(scope, enabled && !!caps.data?.canInvite);
  const change = api.useChangeProjectMemberRole(scope),
    remove = api.useRemoveProjectMember(scope),
    create = api.useCreateProjectInvitation(scope),
    resend = api.useResendProjectInvitation(scope),
    revoke = api.useRevokeProjectInvitation(scope),
    recover = api.useRecoverProjectAdmin(scope);
  const [invite, setInvite] = useState(false),
    [edit, setEdit] = useState<Collaborator>(),
    [confirmation, setConfirmation] = useState<{
      member?: Collaborator;
      invitation?: InvitationSummary;
    }>(),
    [error, setError] = useState(''),
    [notice, setNotice] = useState('');
  const [query, setQuery] = useState(''),
    [candidates, setCandidates] = useState<{
      id: string;
      email: string;
      name: string;
      membershipVersion: number;
    }[]>([]),
    [selected, setSelected] = useState(''),
    [reason, setReason] = useState(''),
    [searching, setSearching] = useState(false);
  const items = members.data?.pages.flatMap(p => p.items) || [];
  const recoveryRequired = members.data?.pages[0]?.recoveryRequired;
  const busy = change.isPending || remove.isPending || create.isPending || resend.isPending || revoke.isPending || recover.isPending;
  const run = async (operation: () => Promise<unknown>, success: string) => {
    setError('');
    try {
      await operation();
      setNotice(success);
      return true;
    } catch (e) {
      setError(api.collaborationError(e));
      return false;
    }
  };
  if (caps.isPending) return <PageShell><p role="status">{t('Checking collaboration access…')}</p></PageShell>;
  if (caps.error || !enabled) return <PageShell><p role="alert">{t('Project collaboration is unavailable for this workspace.')}</p></PageShell>;
  return <PageShell><PageHeader title={t('Project members')} description={scope.authority === 'tenant' ? t('Manage project access with tenant authority. Project configuration access is separate.') : t('Manage access to the current project.')} />
 {notice && <p role="status">{t(notice)}</p>}{error && <p role="alert">{t(error)} <button onClick={() => {
        void members.refetch();
        void invitations.refetch();
      }}>{t('Reload lists')}</button></p>}
 <Section><div className="space-y-4 p-4">{caps.data.canInvite && (!recoveryRequired || scope.authority === 'tenant') && <GenericButton onClick={() => {
          setError('');
          setInvite(true);
        }}>{t('Invite collaborator')}</GenericButton>}
 {members.isPending && <p role="status">{t('Loading members…')}</p>}{members.error && <p role="alert">{api.collaborationError(members.error)}</p>}{!members.isPending && !items.length && <p>{t('No project members.')}</p>}
 {items.map(member => <article key={member.id} className="flex flex-wrap items-center justify-between gap-3 rounded-ui-lg border border-ui-border p-4"><div><h2>{member.name || member.email}</h2><p>{member.email}</p><p>{member.roles.join(', ')} · {t(member.status)}</p></div><div className="flex gap-2"><GenericButton disabled={busy || recoveryRequired} onClick={() => {
              setError('');
              setEdit(member);
            }}>{t('Change role')}</GenericButton>{member.status === 'active' && <GenericButton disabled={busy || recoveryRequired} onClick={() => setConfirmation({
              member
            })}>{t('Remove access')}</GenericButton>}</div></article>)}
 {members.hasNextPage && <GenericButton disabled={members.isFetchingNextPage} onClick={() => void members.fetchNextPage()}>{t('More members')}</GenericButton>}
 </div></Section>
 {recoveryRequired && <Section><div className="space-y-3 p-4"><h2>{t('Administrator recovery required')}</h2><p>{t('This project has no usable administrator. A tenant owner or administrator can explicitly appoint a verified tenant member.')}</p>{caps.data.canRecover && scope.authority === 'tenant' ? <form className="space-y-3" onSubmit={e => {
          e.preventDefault();
          void run(() => recover.mutateAsync({
            userId: selected,
            expectedVersion: candidates.find(candidate => candidate.id === selected)?.membershipVersion ?? 0,
            reason
          }), 'Project administrator restored.');
        }}>
 <Label htmlFor="recovery-query">{t('Find verified tenant member by email')}</Label><Input id="recovery-query" value={query} onChange={e => {
            setQuery(e.target.value);
            setCandidates([]);
            setSelected('');
          }} /><GenericButton type="button" disabled={query.trim().length < 3 || searching} onClick={async () => {
            setSearching(true);
            await run(async () => {
              const r = await axiosClient.get(`${collaborationBase(scope)}/members/recovery-candidates`, {
                params: {
                  query
                }
              });
              setCandidates(r.data.data.items);
            }, 'Search completed.');
            setSearching(false);
          }}>{t('Search')}</GenericButton>
 <Label htmlFor="recovery-target">{t('Appoint administrator')}</Label><Select id="recovery-target" value={selected} onChange={e => setSelected(e.target.value)}><option value="">{t('Choose a verified member')}</option>{candidates.map(c => <option key={c.id} value={c.id}>{c.email}</option>)}</Select><Label htmlFor="recovery-reason">{t('Reason')}</Label><Input id="recovery-reason" required maxLength={500} value={reason} onChange={e => setReason(e.target.value)} /><GenericButton disabled={busy || !selected || !reason.trim()} type="submit">{t('Restore administrator')}</GenericButton></form> : <p>{t('Contact a tenant administrator. Recovery is unavailable in this workspace.')}</p>}</div></Section>}
 {caps.data.canInvite && <Section><div className="space-y-4 p-4"><h2>{t('Invitations')}</h2>{invitations.error && <p role="alert">{api.collaborationError(invitations.error)}</p>}<ProjectInvitationsList items={invitations.data?.pages.flatMap(p => p.items) || []} busy={busy} onResend={item => {
          void run(() => resend.mutateAsync({
            id: item.id,
            version: item.version,
            key: crypto.randomUUID()
          }), 'Invitation queued.');
        }} onCancel={item => setConfirmation({
          invitation: item
        })} />{invitations.hasNextPage && <GenericButton disabled={invitations.isFetchingNextPage} onClick={() => void invitations.fetchNextPage()}>{t('More invitations')}</GenericButton>}</div></Section>}
 {invite && <InviteCollaboratorDialog busy={busy} error={error} onClose={() => setInvite(false)} onSave={input => {
      void run(() => create.mutateAsync(input), 'Invitation queued.').then(ok => {
        if (ok) setInvite(false);
      });
    }} />}
 {edit && <ChangeCollaboratorRoleDialog key={edit.id + ':' + edit.version} member={edit} busy={busy} error={error} onClose={() => setEdit(undefined)} onSave={input => {
      void run(() => change.mutateAsync({
        ...input,
        userId: edit.userId
      }), 'Project role updated.').then(ok => {
        if (ok) setEdit(undefined);
      });
    }} />}
 {confirmation && <WorkspaceDialog open onClose={() => {
      if (!busy) setConfirmation(undefined);
    }} title={t(confirmation.member ? 'Remove project access?' : 'Cancel invitation?')}><p>{confirmation.member?.email || confirmation.invitation?.email}</p><p>{t('This affects only this project.')}</p><GenericButton disabled={busy} onClick={() => {
        void run(() => confirmation.member ? remove.mutateAsync({
          userId: confirmation.member.userId,
          expectedVersion: confirmation.member.version
        }) : revoke.mutateAsync({
          id: confirmation.invitation!.id,
          version: confirmation.invitation!.version
        }), 'Project access updated.').then(ok => {
          if (ok) setConfirmation(undefined);
        });
      }}>{t('Confirm')}</GenericButton>{error && <p role="alert">{t(error)}</p>}</WorkspaceDialog>}
 </PageShell>;
}
