import { axiosClient } from './axiosClient';
import type { AcceptedProjectInvitation } from '../managementSession';
export interface InvitationPreview {
  tenantName: string;
  projectName: string;
  role: string;
  expiresAt: string;
  continuationExpiresAt: string;
  stage: 'choose_account' | 'reauthenticate' | 'verify_email' | 'ready' | 'switch_account';
  verificationDeliveryState?: string;
}
const base = '/tenant/auth/invitations';
export async function exchangeInvitation(token: string): Promise<InvitationPreview> {
  return (await axiosClient.post(base + '/exchange', {
    token
  })).data.data;
}
export async function resumeInvitation(): Promise<InvitationPreview> {
  return (await axiosClient.get(base + '/continuation')).data.data;
}
export async function reauthenticateInvitationAccount(input: {
  email: string;
  password: string;
}): Promise<InvitationPreview> {
  return (await axiosClient.post(base + '/reauthenticate', input)).data.data;
}
export async function requestInvitationVerification(): Promise<void> {
  await axiosClient.post(base + '/verification', {});
}
export async function verifyInvitationEmail(code: string): Promise<InvitationPreview> {
  return (await axiosClient.post(base + '/verify', {
    code
  })).data.data;
}
export async function acceptProjectInvitation(input: {
  mode: 'new' | 'existing';
  name?: string;
  password?: string;
}): Promise<AcceptedProjectInvitation> {
  return (await axiosClient.post(base + '/accept', input)).data.data;
}
export async function cancelInvitation(): Promise<void> {
  await axiosClient.delete(base + '/continuation');
}
