import { useTranslation } from 'react-i18next';
import { GenericButton } from '../panelComponents/FormElements/GenericButton';
import type { InvitationSummary } from '../../types/collaboration';
export function ProjectInvitationsList({
  items,
  busy,
  onResend,
  onCancel
}: {
  items: InvitationSummary[];
  busy: boolean;
  onResend: (item: InvitationSummary) => void;
  onCancel: (item: InvitationSummary) => void;
}) {
  const {
    t
  } = useTranslation();
  return <div className="space-y-3"><p className="text-sm text-ui-muted">{t('Sent means the mail server accepted the message. Inbox delivery is not guaranteed.')}</p>{!items.length && <p>{t('No invitations yet.')}</p>}{items.map(item => <article className="rounded-ui-lg border border-ui-border p-4" key={item.id}><h3>{item.email}</h3><p>{item.role} · {t(item.status)} · {t(item.deliveryState)}</p><p>{t('Expires')}: {new Date(item.expiresAt).toLocaleString()}</p>{(item.status === 'pending' || item.status === 'expired') && <div className="flex gap-2"><GenericButton disabled={busy} onClick={() => onResend(item)}>{t('Resend')}</GenericButton>{item.status === 'pending' && <GenericButton disabled={busy} onClick={() => onCancel(item)}>{t('Cancel invitation')}</GenericButton>}</div>}</article>)}</div>;
}
