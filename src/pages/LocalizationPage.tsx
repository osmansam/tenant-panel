import { Navigate } from "react-router-dom";
import { ProjectLocalizationSection } from "../components/localization/ProjectLocalizationSection";
import { H1 } from "../components/panelComponents/Typography";
import { useCurrentProject } from "../hooks/useCurrentProject";

export default function LocalizationPage() {
  const { currentProject, isInProject } = useCurrentProject();
  if (!isInProject || !currentProject) return <Navigate to="/projects" replace />;
  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="mb-6">
        <H1 className="text-2xl font-bold text-gray-900">Localization</H1>
        <p className="mt-1 text-gray-600">Manage languages and translations for {currentProject.name}.</p>
      </div>
      <ProjectLocalizationSection project={currentProject} />
    </div>
  );
}

