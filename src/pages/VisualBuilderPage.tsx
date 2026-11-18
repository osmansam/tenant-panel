import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
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
  if (!scope) return <div className="p-6"><h1>Select a project to design its pages</h1><Link to="/projects">Open projects</Link></div>;
  const changed = scope.tenant !== currentProject?.tenantSlug || scope.project !== currentProject?.slug;
  if (changed) return <div className="p-6" role="alert"><h1>The selected project changed</h1><p>Reopen the editor from the current project. The previous editor has been closed.</p><Link to="/pages">Back to Pages</Link></div>;
  if (!canOpenVisualBuilder(user?.roles, true)) return <div className="p-6" role="alert"><h1>Page editing permission required</h1><p>A project admin, developer or editor can design pages.</p><Link to="/pages">Back to Pages</Link></div>;
  return <>

    <Suspense fallback={<p role="status" className="p-6">Loading visual builder…</p>}><VisualBuilderWorkspace scope={scope} /></Suspense>
  </>;
}
