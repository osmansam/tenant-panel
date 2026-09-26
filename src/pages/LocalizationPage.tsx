import { Navigate } from "react-router-dom";
import { ProjectLocalizationSection } from "../components/localization/ProjectLocalizationSection";
import { Badge, PageHeader, PageShell } from "../components/ui";
import { useCurrentProject } from "../hooks/useCurrentProject";

export default function LocalizationPage() {
  const { currentProject, isInProject } = useCurrentProject();
  if (!isInProject || !currentProject) return <Navigate to="/projects" replace />;
  return (
    <PageShell width="wide">
      <PageHeader
        title="Localization"
        description={`Manage languages and translations for ${currentProject.name}.`}
        context={<Badge variant="info">{currentProject.enabledLocales?.length || 1} locales</Badge>}
      />
      <ProjectLocalizationSection project={currentProject} />
    </PageShell>
  );
}
