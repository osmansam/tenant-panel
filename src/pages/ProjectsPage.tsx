import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { GenericButton } from "../components/panelComponents/FormElements/GenericButton";
import { useSwitchToProject } from "../utils/api/auth";
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
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // API hooks
  const projectsData = useProjects(true);
  const projects = Array.isArray(projectsData) ? projectsData : [];
  const { createProject, isCreating } = useCreateProject();
  const { switchToProject, isSwitching } = useSwitchToProject();

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

  const handleSwitchToProject = (projectId: string) => {
    switchToProject({ projectId });
  };

  // Generate gradient for project icon
  const getGradient = (index: number) => {
    const gradients = [
      "from-violet-500 to-purple-600",
      "from-blue-500 to-cyan-600",
      "from-emerald-500 to-teal-600",
      "from-orange-500 to-red-600",
      "from-pink-500 to-rose-600",
      "from-indigo-500 to-blue-600",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header - Fixed with blur */}
      <div className="sticky top-0 z-10 border-b border-neutral-200/80 bg-white/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold text-neutral-900 tracking-tight">
                {t("Projects")}
              </h1>
              {projects.length > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[11px] font-semibold bg-neutral-900 text-white">
                  {projects.length}
                </span>
              )}
            </div>
            <GenericButton
              onClick={() => setIsCreateModalOpen(true)}
              variant="primary"
              size="md"
              iconLeft={
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              }
            >
              {t("New Project")}
            </GenericButton>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-8">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 blur-2xl rounded-full" />
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-50 border border-neutral-200 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-neutral-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              {t("No projects yet")}
            </h3>
            <p className="text-sm text-neutral-500 mb-8 max-w-md text-center leading-relaxed">
              {t(
                "Get started by creating your first project to organize your work and collaborate with your team"
              )}
            </p>
            <GenericButton
              onClick={() => setIsCreateModalOpen(true)}
              variant="primary"
              size="lg"
              iconLeft={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              }
            >
              {t("Create your first project")}
            </GenericButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {projects.map((project, index) => {
              const statusDisplay = getProjectStatusDisplay(
                project.isActive ? "active" : "inactive",
                t
              );
              const isActive = project.isActive;
              const projectId = project.id || project._id || `project-${index}`;
              const isHovered = hoveredProject === projectId;

              return (
                <div
                  key={projectId}
                  className="group relative bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 transition-all duration-200 overflow-hidden"
                  onMouseEnter={() => setHoveredProject(projectId)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => isActive && handleSwitchToProject(projectId)}
                >
                  {/* Hover gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${getGradient(
                      index
                    )} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300 pointer-events-none`}
                  />

                  <div
                    className={`relative p-5 ${
                      isActive
                        ? "cursor-pointer"
                        : "cursor-not-allowed opacity-60"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${getGradient(
                          index
                        )} flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200`}
                      >
                        <span className="text-white font-bold text-sm tracking-wide">
                          {project.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>

                      {/* Status dot */}
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? "bg-emerald-500" : "bg-neutral-300"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <h3 className="text-[15px] font-semibold text-neutral-900 mb-1.5 tracking-tight leading-tight">
                        {project.name}
                      </h3>
                      {project.description ? (
                        <p className="text-[13px] text-neutral-500 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      ) : (
                        <p className="text-[13px] text-neutral-400">
                          {t("No description provided")}
                        </p>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3.5 border-t border-neutral-100">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-md ${
                          isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        {isActive && (
                          <svg
                            className="w-2.5 h-2.5"
                            fill="currentColor"
                            viewBox="0 0 8 8"
                          >
                            <circle cx="4" cy="4" r="3" />
                          </svg>
                        )}
                        {statusDisplay.label}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-medium">
                        {new Date(project.createdAt).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Bottom border accent on hover */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${getGradient(
                      index
                    )} transform origin-left transition-transform duration-300 ${
                      isHovered && isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {isCreateModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsCreateModalOpen(false);
              setCreateForm({ name: "", slug: "" });
            }
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <div>
                <h2 className="text-base font-semibold text-neutral-900">
                  {t("Create New Project")}
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {t("Set up a new project for your team")}
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setCreateForm({ name: "", slug: "" });
                }}
                className="text-neutral-400 hover:text-neutral-600 transition-colors p-1.5 rounded-lg hover:bg-neutral-100 active:scale-95"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t("Project Name")}
                  <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  value={createForm.name}
                  onChange={(e) =>
                    setCreateForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder={t("Enter project name")}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all placeholder:text-neutral-400"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t("Project Slug")}
                  <span className="text-neutral-400 text-xs ml-1.5">
                    ({t("optional")})
                  </span>
                </label>
                <input
                  type="text"
                  value={createForm.slug}
                  onChange={(e) =>
                    setCreateForm((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  placeholder={t("auto-generated-slug")}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all placeholder:text-neutral-400 font-mono"
                />
              </div>

              <div className="bg-blue-50 rounded-lg p-3.5 border border-blue-100">
                <div className="flex gap-2.5">
                  <svg
                    className="w-4 h-4 text-blue-600 mt-0.5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-xs text-blue-900 leading-relaxed">
                    {t(
                      "The project slug will be used in URLs and API endpoints. If not provided, it will be automatically generated from the project name."
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-neutral-100 bg-neutral-50/50 rounded-b-2xl">
              <GenericButton
                variant="ghost"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setCreateForm({ name: "", slug: "" });
                }}
                disabled={isCreating}
              >
                {t("Cancel")}
              </GenericButton>
              <GenericButton
                variant="primary"
                onClick={handleCreateProject}
                disabled={isCreating || !createForm.name.trim()}
                isLoading={isCreating}
              >
                {isCreating ? t("Creating...") : t("Create Project")}
              </GenericButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
