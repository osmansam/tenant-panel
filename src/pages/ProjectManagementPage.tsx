import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { H1 } from "../components/panelComponents/Typography";
import { ContainersSection } from "../components/panelComponents/common/ContainersSection";
import { PagesSection } from "../components/panelComponents/common/PagesSection";
import { AuditLogsAuthorizationSection } from "../components/panelComponents/common/AuditLogsAuthorizationSection";
import { useUserContext } from "../context/User.context";
import { useCurrentProject } from "../hooks/useCurrentProject";

const ProjectManagementPage: React.FC = () => {
  const { t } = useTranslation();
  const { currentProject, isInProject } = useCurrentProject();
  const { user } = useUserContext();

  // If not in project context, redirect to projects page
  if (!isInProject || !currentProject) {
    return <Navigate to="/projects" replace />;
  }

  const projectRoles = user?.roles || [];

  return (
    <div className="h-full bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <H1 className="text-2xl font-bold text-gray-900">
                {currentProject.name}
              </H1>
              <p className="text-gray-600 mt-1">
                {t("Project Management & Configuration")}
              </p>
              <div className="mt-2">
                <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                  {currentProject.slug}
                </span>
                {currentProject.isActive ? (
                  <span className="ml-2 inline-flex px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                    {t("Active")}
                  </span>
                ) : (
                  <span className="ml-2 inline-flex px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-800">
                    {t("Inactive")}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">{t("Your Role")}:</div>
              <div className="text-lg font-medium text-gray-900">
                {projectRoles.map((role) => t(role)).join(", ")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {/* Containers Management */}
        <ContainersSection />

        {/* Pages Management */}
        <PagesSection />

        {/* Audit Logs Authorization */}
        <AuditLogsAuthorizationSection />
      </div>
    </div>
  );
};

export default ProjectManagementPage;
