import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { GenericButton } from "../components/panelComponents/FormElements/GenericButton";
import { H1, H2 } from "../components/panelComponents/Typography";
import { ContainersSection } from "../components/panelComponents/common/ContainersSection";
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
  const isProjectAdmin = projectRoles.includes("project_admin");

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

      {/* Project Management Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Project Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="text-2xl mr-3">ℹ️</div>
            <H2 className="text-lg font-semibold text-gray-900">
              {t("Project Information")}
            </H2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-500">
                {t("Project ID")}
              </label>
              <p className="text-sm text-gray-900 font-mono">
                {currentProject.id}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                {t("Tenant ID")}
              </label>
              <p className="text-sm text-gray-900 font-mono">
                {currentProject.tenantId}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                {t("Created")}
              </label>
              <p className="text-sm text-gray-900">
                {new Date(currentProject.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Project Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="text-2xl mr-3">⚙️</div>
            <H2 className="text-lg font-semibold text-gray-900">
              {t("Project Settings")}
            </H2>
          </div>
          <div className="space-y-3">
            <GenericButton
              className="w-full"
              variant="outline"
              disabled={!isProjectAdmin}
            >
              {t("Edit Project Details")}
            </GenericButton>
            <GenericButton
              className="w-full"
              variant="outline"
              disabled={!isProjectAdmin}
            >
              {t("Manage Permissions")}
            </GenericButton>
            <GenericButton
              className="w-full"
              variant="outline"
              disabled={!isProjectAdmin}
            >
              {t("Project Configuration")}
            </GenericButton>
          </div>
        </div>

        {/* Team Management */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="text-2xl mr-3">👥</div>
            <H2 className="text-lg font-semibold text-gray-900">
              {t("Team Management")}
            </H2>
          </div>
          <div className="space-y-3">
            <GenericButton
              className="w-full"
              variant="outline"
              disabled={!isProjectAdmin}
            >
              {t("Manage Team Members")}
            </GenericButton>
            <GenericButton
              className="w-full"
              variant="outline"
              disabled={!isProjectAdmin}
            >
              {t("Invite Members")}
            </GenericButton>
            <GenericButton className="w-full" variant="outline">
              {t("View Team")}
            </GenericButton>
          </div>
        </div>

        {/* Containers Management */}
        <div className="md:col-span-2 lg:col-span-3">
          <ContainersSection />
        </div>

        {/* Data Management */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="text-2xl mr-3">🗃️</div>
            <H2 className="text-lg font-semibold text-gray-900">
              {t("Data Management")}
            </H2>
          </div>
          <div className="space-y-3">
            <GenericButton className="w-full" variant="outline">
              {t("View Data")}
            </GenericButton>
            <GenericButton
              className="w-full"
              variant="outline"
              disabled={!isProjectAdmin}
            >
              {t("Import Data")}
            </GenericButton>
            <GenericButton
              className="w-full"
              variant="outline"
              disabled={!isProjectAdmin}
            >
              {t("Export Data")}
            </GenericButton>
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="text-2xl mr-3">📊</div>
            <H2 className="text-lg font-semibold text-gray-900">
              {t("Analytics")}
            </H2>
          </div>
          <div className="space-y-3">
            <GenericButton className="w-full" variant="outline">
              {t("Project Analytics")}
            </GenericButton>
            <GenericButton className="w-full" variant="outline">
              {t("Usage Statistics")}
            </GenericButton>
            <GenericButton className="w-full" variant="outline">
              {t("Reports")}
            </GenericButton>
          </div>
        </div>

        {/* Integrations */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="text-2xl mr-3">🔌</div>
            <H2 className="text-lg font-semibold text-gray-900">
              {t("Integrations")}
            </H2>
          </div>
          <div className="space-y-3">
            <GenericButton
              className="w-full"
              variant="outline"
              disabled={!isProjectAdmin}
            >
              {t("API Configuration")}
            </GenericButton>
            <GenericButton
              className="w-full"
              variant="outline"
              disabled={!isProjectAdmin}
            >
              {t("Webhooks")}
            </GenericButton>
            <GenericButton
              className="w-full"
              variant="outline"
              disabled={!isProjectAdmin}
            >
              {t("External Services")}
            </GenericButton>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <H2 className="text-lg font-semibold text-gray-900 mb-4">
          {t("Quick Actions")}
        </H2>
        <div className="flex flex-wrap gap-4">
          <GenericButton variant="outline">
            {t("View Project Logs")}
          </GenericButton>
          <GenericButton variant="outline">
            {t("Download Backup")}
          </GenericButton>
          {isProjectAdmin && (
            <>
              <GenericButton variant="outline">
                {t("Create Backup")}
              </GenericButton>
              <GenericButton variant="outline">
                {t("Project Health Check")}
              </GenericButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectManagementPage;
