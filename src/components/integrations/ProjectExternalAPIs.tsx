import { useEffect, useMemo, useState } from "react";
import { GenericButton } from "../panelComponents/FormElements/GenericButton";
import { Input, Label, Select } from "../ui";
import { ExternalAPICredential, isExternalAPICredentialUsable, useTenantExternalAPICredentials } from "../../utils/api/integration";
import { TemplateExternalAPIRequirement, useTemplateExternalAPIRequirements } from "../../utils/api/project";
import { SharedCredentialForm } from "./SharedCredentialForm";
const NO_REQUIREMENTS: TemplateExternalAPIRequirement[] = [];
export interface ProjectExternalAPISelection { ids: string[]; bindings: Record<string, string>; ready: boolean }
function host(value: string) {
  try { return new URL(value.includes("://") ? value : `https://${value}`).hostname.toLowerCase().replace(/\.$/, ""); } catch { return ""; }
}
function supports(credential: ExternalAPICredential, requirement: TemplateExternalAPIRequirement) {
  return requirement.hosts.every(destination => credential.allowedDomains.some(domain => {
    const allowed = host(domain); const target = host(destination);
    return !!allowed && !!target && (allowed === target || target.endsWith(`.${allowed}`));
  }));
}
export function ProjectExternalAPIs({ templateId, onChange, disabled, onSavingChange }: { templateId?: string; onChange: (selection: ProjectExternalAPISelection) => void; disabled: boolean; onSavingChange: (saving: boolean) => void }) {
  const credentials = useTenantExternalAPICredentials();
  const requirements = useTemplateExternalAPIRequirements(templateId);
  const [saved, setSaved] = useState<ExternalAPICredential[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  // Associate mappings with the template immediately; effects cannot leak stale bindings for a frame.
  const [mapping, setMapping] = useState<{ templateId?: string; values: Record<string, string> }>({ templateId, values: {} });
  const [adding, setAdding] = useState(false);
  const available = useMemo(() => Array.from(new Map([...saved, ...(credentials.data || [])].map(credential => [credential.id, credential])).values()).filter(credential => credential.scope === "tenant" && isExternalAPICredentialUsable(credential)), [credentials.data, saved]);
  const unavailableIds = ids.filter(id => !available.some(credential => credential.id === id));
  const required = templateId ? requirements.data || NO_REQUIREMENTS : NO_REQUIREMENTS;
  const bindings = useMemo(() => {
    const explicit = mapping.templateId === templateId ? mapping.values : {};
    return Object.fromEntries(required.flatMap(requirement => {
      const source = requirement.sourceCredentialId;
      const selected = Object.prototype.hasOwnProperty.call(explicit, source) ? explicit[source] : available.find(credential => credential.id === source && supports(credential, requirement))?.id;
      return selected ? [[source, selected]] : [];
    }));
  }, [mapping, templateId, required, available]);
  const ready = !credentials.isLoading && !credentials.isError && (!templateId || (!requirements.isLoading && !requirements.isError && requirements.data !== undefined)) && ids.every(id => available.some(credential => credential.id === id)) && required.every(requirement => available.some(credential => credential.id === bindings[requirement.sourceCredentialId] && supports(credential, requirement)));
  useEffect(() => { onChange({ ids, bindings, ready: ready && !adding }); }, [ids, bindings, ready, adding, onChange]);
  useEffect(() => { setMapping({ templateId, values: {} }); }, [templateId]);
  const retry = () => { void credentials.refetch(); if (templateId) void requirements.refetch(); };
  return <section aria-label="External APIs" className="space-y-3 border-t border-ui-border pt-4">
    <h2 className="text-sm font-semibold">External APIs</h2>
    <p className="text-xs text-ui-muted">Select shared credentials to connect to this project. Required template connections must each have a matching key.</p>
    {credentials.isLoading || (templateId && requirements.isLoading) ? <p role="status" className="text-sm">Loading external API connections…</p> : null}
    {credentials.isError || (templateId && requirements.isError) ? <div role="alert" className="text-sm text-ui-danger">{requirements.isError ? "Template connection requirements could not be loaded." : "Shared credentials could not be loaded."}<GenericButton type="button" variant="ghost" onClick={retry}>Retry connections</GenericButton></div> : null}
    <fieldset disabled={disabled || adding} className="space-y-3">
      {!!unavailableIds.length && <div role="alert" className="space-y-2 text-sm text-ui-danger">
        <p>A selected credential is revoked, expired, or no longer available. Remove it or choose an active replacement.</p>
        {unavailableIds.map(id => {
          const name = credentials.data?.find(credential => credential.id === id)?.name || saved.find(credential => credential.id === id)?.name || id;
          return <GenericButton key={id} type="button" variant="ghost" aria-label={`Remove unavailable ${name}`} onClick={() => setIds(previous => previous.filter(selected => selected !== id))}>Remove {name}</GenericButton>;
        })}
      </div>}
      {required.map(requirement => <div key={requirement.sourceCredentialId} className="space-y-1 rounded-ui-md border border-ui-border p-3">
        <Label htmlFor={`connection-${requirement.sourceCredentialId}`}>{requirement.name} *</Label>
        {!!requirement.hosts.length && <p className="break-all text-xs text-ui-muted">Destinations: {requirement.hosts.join(", ")}</p>}
        {requirement.usages.map(usage => <p key={usage} className="text-xs text-ui-muted">{usage}</p>)}
        <Select searchable={false} id={`connection-${requirement.sourceCredentialId}`} aria-label={`Credential for ${requirement.name}`} value={bindings[requirement.sourceCredentialId] || ""} onChange={event => setMapping({ templateId, values: { ...bindings, [requirement.sourceCredentialId]: event.target.value } })}>
          <option value="">Choose a shared credential</option>{available.filter(credential => supports(credential, requirement)).map(credential => <option key={credential.id} value={credential.id}>{credential.name}</option>)}
        </Select>
        {!available.some(credential => supports(credential, requirement)) && <p className="text-xs text-ui-danger">No active shared credential permits these destinations. Add a credential with the required allowed domains.</p>}
      </div>)}
      {available.length > 0 ? <div className="space-y-2"><p className="text-xs font-medium">Additional project connections (optional)</p>{available.map(credential => <label key={credential.id} className="flex items-center gap-2 text-sm"><Input type="checkbox" className="h-4 w-4" checked={ids.includes(credential.id)} onChange={event => setIds(previous => event.target.checked ? [...previous, credential.id] : previous.filter(id => id !== credential.id))} />{credential.name}</label>)}</div> : !credentials.isLoading && !credentials.isError && <p className="text-sm text-ui-muted">No active shared credentials. Add one below.</p>}
    </fieldset>
    {adding ? <SharedCredentialForm onSavingChange={onSavingChange} onCancel={() => setAdding(false)} onSaved={credential => { setSaved(previous => [...previous, credential]); setIds(previous => [...new Set([...previous, credential.id])]); setAdding(false); }} /> : <GenericButton type="button" variant="secondary" disabled={disabled} onClick={() => setAdding(true)}>Add new credential</GenericButton>}
    {!!saved.length && <p role="status" className="text-xs text-ui-muted">Your saved credential remains available in tenant External APIs, even if project creation fails.</p>}
  </section>;
}
