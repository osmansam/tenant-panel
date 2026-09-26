import { Navigate } from "react-router-dom";
import { BrandingEditor } from "../components/branding/BrandingEditor";
import { Badge, PageHeader, PageShell } from "../components/ui";
import { useCurrentProject } from "../hooks/useCurrentProject";
import useTenant from "../hooks/useTenant";

export default function TenantBrandingPage() {
  const { currentTenant } = useTenant();
  const { currentProject } = useCurrentProject();
  if (!currentTenant) return <Navigate to="/dashboard" replace />;

  const scopeLabel = currentProject ? currentProject.name : currentTenant.name;

  return (
    <PageShell width="wide">
        <PageHeader
          title="Branding"
          description={`Manage the identity for ${scopeLabel}. Tenant settings act as defaults; each project can override them individually.`}
          context={<Badge variant="info">{currentProject ? "Project override" : "Tenant default"}</Badge>}
        />
        <BrandingEditor
          scope={currentProject ? "project" : "tenant"}
          tenantId={currentTenant.id}
          projectId={currentProject?.id}
        />
    </PageShell>
  );
}
