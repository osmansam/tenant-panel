import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WorkspaceDialog, Input, Label, Select } from '../../components/ui';
import { GenericButton } from '../../components/panelComponents/FormElements/GenericButton';
import { collaborationRoles, type Collaborator, type RoleChange } from '../../types/collaboration';
export function ChangeCollaboratorRoleDialog({
  member,
  onClose,
  onSave,
  busy,
  error
}: {
  member: Collaborator;
  onClose: () => void;
  onSave: (body: RoleChange) => void;
  busy: boolean;
  error?: string;
}) {
  const {
    t
  } = useTranslation();
  const legacy = member.roles.length !== 1 || !collaborationRoles.some(r => r.value === member.roles[0]);
  const [role, setRole] = useState(legacy ? 'project_viewer' : member.roles[0]);
  const [convert, setConvert] = useState(false);
  const [activate, setActivate] = useState(false);
  return <WorkspaceDialog open title={t('Change project role')} onClose={() => {
    if (!busy) onClose();
  }} description={member.email}>
 <form className="space-y-4" onSubmit={e => {
      e.preventDefault();
      onSave({
        role,
        expectedVersion: member.version,
        expectedRoles: member.roles,
        convertLegacyRoleSet: legacy && convert,
        activateMembership: activate
      });
    }}>
 <p>{t('Current roles')}: {member.roles.join(', ')}</p><Label htmlFor="collaborator-role">{t('Role')}</Label><Select id="collaborator-role" value={role} onChange={e => setRole(e.target.value)}>{collaborationRoles.map(r => <option key={r.value} value={r.value}>{t(r.label)}</option>)}</Select>
 <p>{t(collaborationRoles.find(r => r.value === role)?.description || '')}</p>
 {legacy && <label className="flex gap-2"><Input type="checkbox" checked={convert} onChange={e => setConvert(e.target.checked)} />{t('Replace the complete role set shown above with this one role')}</label>}
 {member.status !== 'active' && <label className="flex gap-2"><Input type="checkbox" checked={activate} onChange={e => setActivate(e.target.checked)} />{t('Reactivate project membership')}</label>}
 {error && <p role="alert">{t(error)}</p>}<GenericButton type="submit" disabled={busy || legacy && !convert || member.status !== 'active' && !activate}>{t('Save role')}</GenericButton>
 </form></WorkspaceDialog>;
}
