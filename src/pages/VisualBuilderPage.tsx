import { lazy, Suspense, useState } from "react";
import { useCurrentProject } from "../hooks/useCurrentProject";
import { useUserContext } from "../context/User.context";
import { canOpenVisualBuilder } from "../visualBuilder/pageLinks";
import type { ProjectScope } from "../visualBuilder/types";
const VisualBuilderWorkspace = lazy(() => import("../visualBuilder/VisualBuilderPage"));
export default function VisualBuilderPage() {
  const { currentProject } = useCurrentProject();
  const { user } = useUserContext();
  // Pin requests and local drafts to the project in which this editor opened.
  const [scope, setScope] = useState<ProjectScope | null>(() => currentProject?.tenantSlug && currentProject.slug ? { tenant: currentProject.tenantSlug, project: currentProject.slug } : null);
  if (!scope && currentProject?.tenantSlug && currentProject.slug) {
    setScope({ tenant: currentProject.tenantSlug, project: currentProject.slug });
  }
  if (!scope) return <div className="p-6"><h1>Select a project to design its pages</h1><a href="/projects">Open projects</a></div>;
  const changed = scope.tenant !== currentProject?.tenantSlug || scope.project !== currentProject?.slug;
  if (!changed && !canOpenVisualBuilder(user?.roles, true)) return <div className="p-6" role="alert"><h1>Page editing permission required</h1><p>A project admin, developer or editor can design pages.</p><a href="/pages">Back to Pages</a></div>;
  return <>
    {changed ? <p role="status" className="bg-amber-50 p-3 text-amber-950">The selected project changed. This editor still belongs to {scope.tenant} / {scope.project}. Save or discard your changes before returning to Pages.</p> : null}
    <Suspense fallback={<p role="status" className="p-6">Loading visual builder…</p>}><VisualBuilderWorkspace scope={scope} /></Suspense>
  </>;
}
