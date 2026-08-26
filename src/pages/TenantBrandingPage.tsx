import { Navigate } from "react-router-dom";
import { BrandingEditor } from "../components/branding/BrandingEditor";
import { useCurrentProject } from "../hooks/useCurrentProject";
import useTenant from "../hooks/useTenant";

export default function TenantBrandingPage() {
  const { currentTenant } = useTenant();
  const { currentProject } = useCurrentProject();
  if (!currentTenant) return <Navigate to="/dashboard" replace />;

  const scopeLabel = currentProject ? currentProject.name : currentTenant.name;

  return (
    <div className="h-full overflow-y-auto bg-neutral-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-violet-600">Settings</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-neutral-900">Branding</h1>
          <p className="mt-2 max-w-2xl text-sm text-neutral-600">
            Manage the identity for {scopeLabel}. Tenant settings act as defaults; each project can override them individually.
          </p>
        </div>
        <BrandingEditor
          scope={currentProject ? "project" : "tenant"}
          tenantId={currentTenant.id}
          projectId={currentProject?.id}
        />
      </div>
    </div>
  );
}
