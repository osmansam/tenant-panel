import { useState } from "react";
import { GenericButton } from "../panelComponents/FormElements/GenericButton";
import { Input, Label, Select } from "../ui";
import { ExternalAPICredential, ExternalAPICredentialFormValues, externalAPIError, normalizeExternalAPICredentialPayload, useCreateTenantExternalAPICredential } from "../../utils/api/integration";

export function SharedCredentialForm({ onSaved, onCancel, onSavingChange }: { onSaved: (credential: ExternalAPICredential) => void; onCancel: () => void; onSavingChange?: (saving: boolean) => void }) {
  const [values, setValues] = useState<ExternalAPICredentialFormValues>({ name: "", authType: "bearer", secret: "", allowedDomains: "", headerName: "", expiresAt: "" });
  const [error, setError] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const create = useCreateTenantExternalAPICredential();
  const update = (key: keyof ExternalAPICredentialFormValues, value: string) => setValues(previous => ({ ...previous, [key]: value }));
  const save = async () => {
    if (create.isPending) return;
    setError("");
    try {
      const payload = normalizeExternalAPICredentialPayload(values);
      if (!payload.name || !payload.secret || !payload.allowedDomains.length) { setError("Credential name, token, and allowed domains are required."); return; }
      if (payload.authType === "header" && !payload.headerName) { setError("Header name is required for custom header auth."); return; }
      if (payload.expiresAt && new Date(payload.expiresAt).getTime() <= Date.now()) { setError("Expiration must be in the future."); return; }
      onSavingChange?.(true);
      const result = await create.mutateAsync(payload);
      setValues(previous => ({ ...previous, secret: "" }));
      onSaved(result.credential);
    } catch (failure) { setError(externalAPIError(failure, "Credential could not be saved. Please try again.")); }
    finally { onSavingChange?.(false); }
  };
  return <div className="space-y-4" aria-busy={create.isPending}>
    <p className="text-sm text-ui-muted">Save this key to the tenant first. It remains available in External APIs if project creation fails.</p>
    {error && <p role="alert" className="text-sm text-ui-danger">{error}</p>}
    <fieldset disabled={create.isPending} className="space-y-3">
      <div><Label htmlFor="shared-credential-name">Credential name</Label><Input id="shared-credential-name" value={values.name} onChange={event => update("name", event.target.value)} autoComplete="off" /></div>
      <div><Label htmlFor="shared-auth-type">Authentication</Label><Select id="shared-auth-type" searchable={false} value={values.authType} onChange={event => update("authType", event.target.value)}><option value="bearer">Authorization: Bearer</option><option value="header">Custom header</option></Select></div>
      {values.authType === "header" && <div><Label htmlFor="shared-header">Header name</Label><Input id="shared-header" value={values.headerName} onChange={event => update("headerName", event.target.value)} placeholder="X-API-Key" /></div>}
      <div><Label htmlFor="shared-secret">External API token</Label><Input id="shared-secret" type={showSecret ? "text" : "password"} autoComplete="new-password" value={values.secret} onChange={event => update("secret", event.target.value)} /><button type="button" className="ui-focus-ring text-xs text-ui-primary" onClick={() => setShowSecret(!showSecret)}>{showSecret ? "Hide token" : "Show token"}</button></div>
      <div><Label htmlFor="shared-domains">Allowed domains</Label><Input id="shared-domains" value={values.allowedDomains} onChange={event => update("allowedDomains", event.target.value)} placeholder="api.vendor.com, checkout.vendor.com" /><p className="text-xs text-ui-muted">Comma-separated domains permitted for outbound requests.</p></div>
      <div><Label htmlFor="shared-expiration">Expires at (optional)</Label><Input id="shared-expiration" type="datetime-local" value={values.expiresAt} onChange={event => update("expiresAt", event.target.value)} /></div>
    </fieldset>
    <div className="flex flex-wrap justify-end gap-2"><GenericButton type="button" variant="ghost" disabled={create.isPending} onClick={onCancel}>Cancel credential</GenericButton><GenericButton type="button" disabled={create.isPending} isLoading={create.isPending} onClick={() => { void save(); }}>Save shared credential</GenericButton></div>
  </div>;
}
