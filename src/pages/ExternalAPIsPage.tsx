import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/User.context";
import { useTenant } from "../hooks/useTenant";
import { GenericButton } from "../components/panelComponents/FormElements/GenericButton";
import { Badge, EmptyState, PageActions, PageHeader, PageShell, Section, Select, WorkspaceDialog } from "../components/ui";
import { SharedCredentialForm } from "../components/integrations/SharedCredentialForm";
import { useProjectsQuery } from "../utils/api/project";
import { ExternalAPICredential, TenantCredentialAction, externalAPIError, isExternalAPICredentialUsable, useTenantExternalAPICredentialAction, useTenantExternalAPICredentials } from "../utils/api/integration";

function ExternalAPIsContent() {
  const credentials = useTenantExternalAPICredentials();
  const projects = useProjectsQuery();
  const mutation = useTenantExternalAPICredentialAction();
  const [createOpen, setCreateOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [confirm, setConfirm] = useState<{ credential: ExternalAPICredential; action: "promote" | "revoke" } | null>(null);
  const act = async (action: TenantCredentialAction) => {
    if (mutation.isPending) return;
    setError("");
    try { await mutation.mutateAsync(action); setConfirm(null); }
    catch (failure) { setError(externalAPIError(failure, "Credential change failed. Please try again.")); }
  };
  const projectName = (id: string) => projects.data.find(project => project.id === id)?.name || id;
  return <PageShell width="wide">
    <PageHeader title="External APIs" description="Share outbound API credentials with explicitly connected projects in this tenant." actions={<PageActions><GenericButton onClick={() => setCreateOpen(true)}>Add shared credential</GenericButton></PageActions>} />
    {error && <p role="alert" className="text-sm text-ui-danger">{error}</p>}
    <Section>
      {credentials.isLoading ? <p role="status">Loading external API credentials…</p> : credentials.isError ? <EmptyState role="alert" title="External API credentials could not be loaded" action={<GenericButton onClick={() => { void credentials.refetch(); }}>Try again</GenericButton>} /> : !credentials.data?.length ? <EmptyState title="No external API credentials yet" description="Create one shared key, then connect the projects that may use it." /> : <div className="space-y-4">{credentials.data.map(credential => {
        const shared = credential.scope === "tenant";
        const usable = isExternalAPICredentialUsable(credential);
        const grants = credential.grantedProjectIds || [];
        const availableProjects = projects.data.filter(project => project.isActive && !grants.includes(project.id));
        return <article key={credential.id} className="space-y-3 rounded-ui-lg border border-ui-border bg-ui-surface p-4">
          <div className="flex flex-wrap items-center gap-2"><h2 className="font-semibold">{credential.name}</h2><Badge variant={shared ? "info" : "neutral"}>{shared ? "Tenant shared" : "Project only"}</Badge><Badge variant={credential.revokedAt ? "danger" : usable ? "success" : "warning"}>{credential.revokedAt ? "Revoked" : usable ? "Active" : "Expired"}</Badge></div>
          <code className="block break-all text-xs text-ui-muted">{credential.id}</code><p className="text-sm text-ui-muted">Domains: {credential.allowedDomains.join(", ")}</p>
          {!shared ? <div className="flex flex-wrap items-center gap-3"><p className="text-sm">Owned by {projectName(credential.projectId || "")}</p><GenericButton variant="secondary" disabled={!usable || mutation.isPending} aria-label={`Promote ${credential.name}`} onClick={() => setConfirm({ credential, action: "promote" })}>Promote to shared</GenericButton></div> : <>
            <ul className="space-y-2">{grants.map(id => <li key={id} className="flex flex-wrap items-center gap-3 text-sm"><span>{projectName(id)}</span><GenericButton variant="ghost" disabled={mutation.isPending} aria-label={`Disconnect ${projectName(id)} from ${credential.name}`} onClick={() => { void act({ action: "disconnect", credentialId: credential.id, projectId: id }); }}>Disconnect</GenericButton></li>)}</ul>
            {!grants.length && <p className="text-sm text-ui-muted">No connected projects</p>}
            {projects.isLoading ? <p role="status">Loading projects…</p> : projects.isError ? <p role="alert">Projects could not be loaded. Refresh the page to connect a project.</p> : <div className="flex flex-wrap gap-2"><Select searchable={false} aria-label={`Project for ${credential.name}`} value={choices[credential.id] || ""} disabled={!usable || mutation.isPending} onChange={event => setChoices(previous => ({ ...previous, [credential.id]: event.target.value }))}><option value="">Choose a project</option>{availableProjects.map(project => <option key={project.id} value={project.id}>{project.name}</option>)}</Select><GenericButton variant="secondary" aria-label={`Connect ${credential.name}`} disabled={!usable || mutation.isPending || !availableProjects.some(project => project.id === choices[credential.id])} onClick={() => { void act({ action: "grant", credentialId: credential.id, projectId: choices[credential.id] }); }}>Connect project</GenericButton></div>}
            <GenericButton variant="danger" disabled={!!credential.revokedAt || mutation.isPending} aria-label={`Revoke ${credential.name}`} onClick={() => setConfirm({ credential, action: "revoke" })}>Revoke for all projects</GenericButton>
          </>}
        </article>;
      })}</div>}
    </Section>
    <WorkspaceDialog open={createOpen} title="Create shared external API credential" onClose={() => { if (!saving) setCreateOpen(false); }}>{createOpen && <SharedCredentialForm onSavingChange={setSaving} onCancel={() => setCreateOpen(false)} onSaved={() => setCreateOpen(false)} />}</WorkspaceDialog>
    <WorkspaceDialog open={!!confirm} title={confirm?.action === "promote" ? "Promote credential" : "Revoke shared credential"} onClose={() => { if (!mutation.isPending) setConfirm(null); }}>
      <p className="mb-4 text-sm">{confirm?.action === "promote" ? "The credential becomes tenant owned. Its ID stays the same and the original project keeps access." : "This revokes the key for every connected project. This cannot be undone."}</p>
      <div className="flex justify-end gap-2"><GenericButton variant="ghost" disabled={mutation.isPending} onClick={() => setConfirm(null)}>Cancel</GenericButton><GenericButton variant={confirm?.action === "revoke" ? "danger" : "primary"} disabled={mutation.isPending} onClick={() => { if (confirm) void act({ action: confirm.action, credentialId: confirm.credential.id }); }}>{confirm?.action === "promote" ? "Promote to shared" : "Revoke for all projects"}</GenericButton></div>
      {error && <p role="alert" className="mt-3 text-sm text-ui-danger">{error}</p>}
    </WorkspaceDialog>
  </PageShell>;
}
export default function ExternalAPIsPage() {
  const { currentTenant, hasRole, isTenantOwner } = useTenant();
  const { user } = useUserContext();
  const allowed = user?.roleScope !== "project" && !user?.projectId && (isTenantOwner(currentTenant?.id) || hasRole("tenant_owner") || hasRole("tenant_admin"));
  return allowed ? <ExternalAPIsContent /> : <Navigate to="/projects" replace />;
}
