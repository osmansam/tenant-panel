import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../context/User.context';
import { PageShell, Section, Input, Label } from '../components/ui';
import { GenericButton } from '../components/panelComponents/FormElements/GenericButton';
import { InvitationAccountForm } from '../components/collaboration/InvitationAccountForm';
import * as api from '../utils/api/invitations';
import { applyAcceptedProjectInvitation } from '../utils/managementSession';
import { useTenantLogout } from '../utils/api/auth';
export default function AcceptProjectInvitationPage() {
  const {
      t
    } = useTranslation(),
    navigate = useNavigate(),
    client = useQueryClient();
  const {
    setUser
  } = useUserContext();
  const {
    tenantLogout
  } = useTenantLogout();
  const [preview, setPreview] = useState<api.InvitationPreview>(),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false),
    [mode, setMode] = useState<'new' | 'existing'>(),
    [code, setCode] = useState(''),
    [notice, setNotice] = useState(''),
    [joined, setJoined] = useState(false);
  const initial = useRef<Promise<api.InvitationPreview>>();
  const report = (e: unknown) => {
    const failure = e as {
      response?: {
        data?: {
          message?: string;
          data?: {
            code?: string;
          };
        };
      };
    };
    const code = failure.response?.data?.data?.code;
    if (code === 'invitation_joined_sign_in_required') {
      setJoined(true);
      setPreview(undefined);
    } else if (code === 'invitation_reauthenticate' || code === 'invitation_account_action_required') {
      setMode('existing');
      setPreview(p => p ? {
        ...p,
        stage: 'reauthenticate'
      } : p);
    } else if (code === 'invitation_account_mismatch') {
      setPreview(p => p ? {
        ...p,
        stage: 'switch_account'
      } : p);
    }
    setError(failure.response?.data?.message || 'This invitation is unavailable. Reopen the invitation email or ask a project administrator for help.');
  };
  useEffect(() => {
    let cancelled = false;
    if (!initial.current) {
      const fragment = window.location.hash.slice(1);
      window.history.replaceState(null, '', '/invitations/accept');
      initial.current = fragment.startsWith('verification=') ? api.verifyInvitationEmail(fragment.slice('verification='.length)) : fragment ? api.exchangeInvitation(fragment) : api.resumeInvitation();
    }
    initial.current.then(value => {
      if (!cancelled) setPreview(value);
    }).catch(e => {
      if (!cancelled) report(e);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  const run = async (operation: () => Promise<void>) => {
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      await operation();
    } catch (e) {
      report(e);
    } finally {
      setBusy(false);
    }
  };
  const accept = async (input: {
    mode: 'existing' | 'new';
    name?: string;
    password?: string;
  }) => {
    const result = await api.acceptProjectInvitation(input);
    applyAcceptedProjectInvitation(result, client, setUser);
    setPreview(undefined);
    setMode(undefined);
    navigate('/collections', {
      replace: true
    });
  };
  return <PageShell width="content"><Section><div className="mx-auto max-w-lg space-y-5 p-6"><h1 className="text-2xl font-semibold">{t('Join project')}</h1>
 {error && <p role="alert">{t(error)}</p>}{notice && <p role="status">{t(notice)}</p>}
 {joined ? <a href="/login">{t('Sign in')}</a> : preview ? <>
 <div><h2 className="text-xl font-medium">{preview.projectName}</h2><p>{preview.tenantName} · {preview.role}</p><p>{t('Invitation expires')}: {new Date(preview.expiresAt).toLocaleString()}</p></div>
 {preview.stage === 'switch_account' ? <><p>{t('A different account is signed in. Sign out before continuing with the invited account.')}</p><GenericButton disabled={busy} onClick={() => void run(async () => {
              await tenantLogout();
              navigate('/invitations/accept', {
                replace: true
              });
              setPreview(await api.resumeInvitation());
              setMode('existing');
            })}>{t('Sign out and continue')}</GenericButton></> : preview.stage === 'ready' ? <GenericButton disabled={busy} onClick={() => void run(() => accept({
            mode: 'existing'
          }))}>{t('Join project')}</GenericButton> : preview.stage === 'verify_email' ? <div className="space-y-3"><p>{t('Verify your email using a separate message sent to your account.')}</p>{preview.verificationDeliveryState && <p>{t('Verification email status')}: {preview.verificationDeliveryState}</p>}
 <GenericButton disabled={busy} onClick={() => void run(async () => {
              await api.requestInvitationVerification();
              setNotice('Verification email queued. Sent means mail-server acceptance.');
              setPreview(await api.resumeInvitation());
            })}>{t('Send verification email')}</GenericButton>
 <form className="space-y-3" onSubmit={e => {
              e.preventDefault();
              void run(async () => {
                setPreview(await api.verifyInvitationEmail(code.trim()));
                setCode('');
              });
            }}><Label htmlFor="verification-code">{t('Verification code')}</Label><Input id="verification-code" required autoComplete="one-time-code" value={code} onChange={e => setCode(e.target.value)} /><GenericButton type="submit" disabled={busy}>{t('Verify email')}</GenericButton></form></div> : <div className="space-y-4"><div className="flex gap-2"><GenericButton disabled={busy} onClick={() => setMode('existing')}>{t('Use existing account')}</GenericButton><GenericButton disabled={busy} onClick={() => setMode('new')}>{t('Create new account')}</GenericButton></div>
 {(mode || preview.stage === 'reauthenticate') && <InvitationAccountForm key={mode || 'existing'} mode={mode || 'existing'} busy={busy} onSubmit={input => void run(async () => {
              if (mode === 'new') await accept({
                mode: 'new',
                name: input.name,
                password: input.password
              });else {
                setPreview(await api.reauthenticateInvitationAccount({
                  email: input.email,
                  password: input.password
                }));
                setMode(undefined);
              }
            })} />}</div>}
 <GenericButton variant="ghost" disabled={busy} onClick={() => void run(async () => {
            await api.cancelInvitation();
            setPreview(undefined);
            setMode(undefined);
            setNotice('Invitation progress cleared. Reopen the email to start again.');
          })}>{t('Cancel')}</GenericButton>
 </> : !error && !notice ? <p role="status">{t('Loading invitation…')}</p> : null}
 </div></Section></PageShell>;
}
