import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WorkspaceDialog, Input, Label, Select } from '../ui';
import { GenericButton } from '../panelComponents/FormElements/GenericButton';
import { collaborationRoles } from '../../types/collaboration';
export function InviteCollaboratorDialog({
  onClose,
  onSave,
  busy,
  error
}: {
  onClose: () => void;
  onSave: (input: {
    email: string;
    role: string;
    key: string;
  }) => void;
  busy: boolean;
  error?: string;
}) {
  const {
    t
  } = useTranslation();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('project_viewer');
  const intent = useRef({
    digest: '',
    key: ''
  });
  const save = () => {
    const digest = JSON.stringify([email.trim().toLowerCase(), role]);
    if (intent.current.digest !== digest) intent.current = {
      digest,
      key: crypto.randomUUID()
    };
    onSave({
      email,
      role,
      key: intent.current.key
    });
  };
  return <WorkspaceDialog open title={t('Invite collaborator')} onClose={() => {
    if (!busy) onClose();
  }}><form className="space-y-4" onSubmit={e => {
      e.preventDefault();
      save();
    }}>
 <Label htmlFor="invite-email">{t('Email')}</Label><Input id="invite-email" type="email" required value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
 <Label htmlFor="invite-role">{t('Role')}</Label><Select id="invite-role" value={role} onChange={e => setRole(e.target.value)}>{collaborationRoles.map(r => <option key={r.value} value={r.value}>{t(r.label)}</option>)}</Select><p>{t(collaborationRoles.find(r => r.value === role)?.description || '')}</p>
 <p>{t('The invitation expires in seven days. Existing accounts must sign in and verify their email before joining.')}</p>{error && <p role="alert">{t(error)}</p>}<GenericButton type="submit" disabled={busy}>{t('Queue invitation')}</GenericButton>
 </form></WorkspaceDialog>;
}
