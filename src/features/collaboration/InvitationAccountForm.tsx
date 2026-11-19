import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Label } from '../../components/ui';
import { GenericButton } from '../../components/panelComponents/FormElements/GenericButton';
export function InvitationAccountForm({
  mode,
  busy,
  onSubmit
}: {
  mode: 'new' | 'existing';
  busy: boolean;
  onSubmit: (input: {
    email: string;
    name: string;
    password: string;
  }) => void;
}) {
  const {
    t
  } = useTranslation();
  const [email, setEmail] = useState(''),
    [name, setName] = useState(''),
    [password, setPassword] = useState('');
  return <form className="space-y-3" onSubmit={e => {
    e.preventDefault();
    onSubmit({
      email,
      name,
      password
    });
  }}>
 {mode === 'existing' ? <><Label htmlFor="join-email">{t('Email')}</Label><Input id="join-email" type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} /></> : <><Label htmlFor="join-name">{t('Name')}</Label><Input id="join-name" required maxLength={120} autoComplete="name" value={name} onChange={e => setName(e.target.value)} /></>}
 <Label htmlFor="join-password">{t('Password')}</Label><Input id="join-password" type="password" required minLength={mode === 'new' ? 8 : undefined} maxLength={72} autoComplete={mode === 'new' ? 'new-password' : 'current-password'} value={password} onChange={e => setPassword(e.target.value)} />
 <GenericButton type="submit" disabled={busy}>{t(mode === 'new' ? 'Create account and join' : 'Verify account')}</GenericButton>
 {mode === 'existing' && <p>{t('Use your existing password. Invitations cannot reset passwords or recover accounts. If your account has no password, contact support through your normal account recovery process.')}</p>}
 </form>;
}
