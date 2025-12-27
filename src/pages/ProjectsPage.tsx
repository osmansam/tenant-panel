import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { GenericButton } from "../components/panelComponents/FormElements/GenericButton";
import TextInput from "../components/panelComponents/FormElements/TextInput";
import { H1, H2 } from "../components/panelComponents/Typography";
import {
  CreateProjectPayload,
  getProjectStatusDisplay,
  useCreateProject,
  useProjects,
} from "../utils/api/project";

const ProjectsPage: React.FC = () => {
  const { t } = useTranslation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createForm, setCreateForm] = useState<CreateProjectPayload>({
    name: "",
    slug: "",
  });

  // API hooks
  const projectsData = useProjects(true);
  const projects = Array.isArray(projectsData) ? projectsData : [];
  const { createProject, isCreating } = useCreateProject();

  // Since useProjects returns data directly from factory, we need to handle loading state differently
  const isLoading = !projectsData;

  // Handlers
  const handleCreateProject = () => {
    if (!createForm.name.trim()) {
      toast.error(t("Project name is required"));
      return;
    }

    // Generate slug from name if not provided
    const slug =
      createForm.slug ||
      createForm.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

    createProject({ name: createForm.name, slug });
    setIsCreateModalOpen(false);
    setCreateForm({ name: "", slug: "" });
  };

  return (
    <div className="h-full bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <H1 className="text-2xl font-bold text-gray-900">
                {t("Projects")}
              </H1>
              <p className="text-gray-600 mt-1">
                {t("Manage your organization's projects")}
              </p>
            </div>
            <GenericButton
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2"
            >
              {t("Create Project")}
            </GenericButton>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">{t("No projects found")}</div>
              <GenericButton onClick={() => setIsCreateModalOpen(true)}>
                {t("Create your first project")}
              </GenericButton>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => {
                const statusDisplay = getProjectStatusDisplay(
                  project.isActive ? "active" : "inactive",
                  t
                );
                return (
                  <div
                    key={project.id || project._id || `project-${index}`}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <H2 className="text-lg font-semibold text-gray-900">
                        {project.name}
                      </H2>
                    </div>

                    {project.description && (
                      <p className="text-gray-600 text-sm mb-3">
                        {project.description}
                      </p>
                    )}

                    <div className="flex justify-between items-center">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          statusDisplay.color === "green"
                            ? "bg-green-100 text-green-800"
                            : statusDisplay.color === "red"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {statusDisplay.label}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Create Project Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <H2 className="text-xl font-bold mb-4">
              {t("Create New Project")}
            </H2>

            <div className="space-y-4">
              <TextInput
                label={t("Project Name")}
                type="text"
                value={createForm.name}
                onChange={(value) =>
                  setCreateForm((prev) => ({ ...prev, name: value }))
                }
                placeholder={t("Enter project name")}
                requiredField={true}
                isOnClearActive={false}
              />

              <TextInput
                label={t("Project Slug")}
                type="text"
                value={createForm.slug}
                onChange={(value) =>
                  setCreateForm((prev) => ({ ...prev, slug: value }))
                }
                placeholder={t("Enter project slug (optional)")}
                isOnClearActive={false}
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <GenericButton
                variant="outline"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setCreateForm({
                    name: "",
                    slug: "",
                  });
                }}
                disabled={isCreating}
              >
                {t("Cancel")}
              </GenericButton>
              <GenericButton
                onClick={handleCreateProject}
                disabled={isCreating || !createForm.name.trim()}
              >
                {isCreating ? t("Creating...") : t("Create")}
              </GenericButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
