import { Navigate } from "react-router-dom";
import { ProjectLocalizationSection } from "../components/localization/ProjectLocalizationSection";
import { Badge, PageHeader, PageShell } from "../components/ui";
import { useCurrentProject } from "../hooks/useCurrentProject";
import { useUserContext } from "../context/User.context";
import { hasManagementPermission } from "../utils/managementPermissions";

export default function LocalizationPage() {
  const { currentProject, isInProject } = useCurrentProject();
  const { user } = useUserContext();
  if (!isInProject || !currentProject) return <Navigate to="/projects" replace />;
  const canManage = hasManagementPermission(
    user?.roles,
    "project.localization.manage",
  );
  return (
    <PageShell width="wide">
      <PageHeader
        title="Localization"
        description={`Manage languages and translations for ${currentProject.name}.`}
        context={<Badge variant="info">{currentProject.enabledLocales?.length || 1} locales</Badge>}
      />
      <ProjectLocalizationSection project={currentProject} readOnly={!canManage} />
    </PageShell>
  );
}
