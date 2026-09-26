import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { GenericButton } from "../components/panelComponents/FormElements/GenericButton";
import {
  Badge,
  EmptyState,
  Input,
  Label,
  PageActions,
  PageHeader,
  PageShell,
  ResponsiveActionBar,
  Section,
  WorkspaceDialog,
} from "../components/ui";
import { useTenant } from "../hooks/useTenant";
import { useSwitchToProject } from "../utils/api/auth";
import {
  CreateProjectPayload,
  getProjectId,
  getProjectStatusDisplay,
  useCreateProject,
  useProjectTemplates,
  useProjects,
  useUpdateProjectTemplate,
} from "../utils/api/project";

const ProjectsPage: React.FC = () => {
  const { t } = useTranslation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createForm, setCreateForm] = useState<CreateProjectPayload>({ name: "", slug: "" });
  const [templateChoiceProject, setTemplateChoiceProject] = useState<{ id: string; name: string } | null>(null);

  const projectsData = useProjects(true);
  const projects = Array.isArray(projectsData) ? projectsData : [];
  const projectTemplatesData = useProjectTemplates(true);
  const projectTemplates = Array.isArray(projectTemplatesData) ? projectTemplatesData : [];
  const { createProject, isCreating } = useCreateProject();
  const { updateProjectTemplate, isUpdatingTemplate } = useUpdateProjectTemplate();
  const { switchToProject, isSwitching } = useSwitchToProject();
  const { currentTenant, hasRole, isTenantOwner } = useTenant();
  const canManageTenantTemplates =
    isTenantOwner(currentTenant?.id) || hasRole("tenant_owner") || hasRole("tenant_admin");

  useEffect(() => {
    if (!isCreateModalOpen) setCreateForm({ name: "", slug: "" });
  }, [isCreateModalOpen]);

  const handleCreateProject = () => {
    if (!createForm.name.trim()) {
      toast.error(t("Project name is required"));
      return;
    }
    const slug = createForm.slug || createForm.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    createProject({
      name: createForm.name,
      slug,
      ...(createForm.templateProjectId
        ? { templateProjectId: createForm.templateProjectId, includeTemplateItems: !!createForm.includeTemplateItems }
        : {}),
    });
    setIsCreateModalOpen(false);
  };

  const handleTemplateSelection = (templateProjectId: string) => {
    const selectedTemplate = projectTemplates.find((item) => getProjectId(item) === templateProjectId);
    setCreateForm((previous) => ({
      ...previous,
      templateProjectId: templateProjectId || undefined,
      includeTemplateItems: templateProjectId ? !!selectedTemplate?.templateIncludeItems : undefined,
    }));
  };

  const handleRedirectToProject = (projectSlug: string) => {
    if (!currentTenant?.slug) {
      toast.error(t("Tenant information not found"));
      return;
    }
    window.open(`https://panel.autoapi.org/t/${currentTenant.slug}/p/${projectSlug}/login`, "_blank");
  };

  const handleToggleProjectTemplate = (projectId: string, isTemplate: boolean) => {
    if (isTemplate) {
      const project = projects.find((item) => getProjectId(item) === projectId);
      setTemplateChoiceProject({ id: projectId, name: project?.name || t("Project") });
      return;
    }
    updateProjectTemplate(projectId, { isTemplate: false, templateIncludeItems: false });
  };

  const confirmTemplateChoice = (templateIncludeItems: boolean) => {
    if (!templateChoiceProject) return;
    updateProjectTemplate(templateChoiceProject.id, { isTemplate: true, templateIncludeItems });
    setTemplateChoiceProject(null);
  };

  const newProjectButton = (label: string) => (
    <GenericButton variant="primary" size="md" onClick={() => setIsCreateModalOpen(true)}>
      {t(label)}
    </GenericButton>
  );

  const projectAccents = [
    "bg-violet-600",
    "bg-sky-600",
    "bg-emerald-600",
    "bg-orange-600",
    "bg-pink-600",
    "bg-indigo-600",
  ];

  return (
    <PageShell width="wide">
      <PageHeader
        title={
          <span className="flex items-center gap-2.5">
            {t("Projects")}
            {projects.length > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ui-foreground px-1.5 text-[11px] font-semibold text-ui-surface">
                {projects.length}
              </span>
            )}
          </span>
        }
        actions={<PageActions aria-label={t("Page actions")}>{newProjectButton("New Project")}</PageActions>}
        className="pb-4"
      />

      <Section>
        {projects.length === 0 ? (
          <EmptyState
            title={t("No projects yet")}
            description={t("Create your first project to organize your work and collaborate with your team.")}
            action={newProjectButton("Create your first project")}
          />
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => {
              const projectId = getProjectId(project) || `project-${index}`;
              const isActive = project.isActive;
              const status = getProjectStatusDisplay(isActive ? "active" : "inactive", t);

              return (
                <article
                  key={projectId}
                  className="group relative min-w-0 overflow-hidden rounded-ui-lg border border-ui-border bg-ui-surface p-5 transition-colors hover:border-ui-border-strong"
                >
                  <button
                    type="button"
                    aria-label={isActive ? `${t("Switch to")} ${project.name}` : project.name}
                    disabled={!isActive || isSwitching}
                    onClick={() => switchToProject({ projectId })}
                    className="absolute inset-0 z-0 rounded-ui-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui-focus disabled:cursor-not-allowed"
                  />

                  <div className="pointer-events-none relative z-[1] flex items-start justify-between gap-3">
                    <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-ui-lg text-sm font-bold tracking-wide text-white ${projectAccents[index % projectAccents.length]}`}>
                      {project.name.substring(0, 2).toUpperCase()}
                    </span>
                    <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
                      {project.isTemplate && (
                        <Badge variant="warning">
                          {project.templateScope === "global" ? t("Global Template") : t("Template")}
                        </Badge>
                      )}
                      <span className={`mt-1 h-1.5 w-1.5 rounded-full ${isActive ? "bg-ui-success" : "bg-ui-border-strong"}`} aria-hidden="true" />
                    </div>
                  </div>

                  <div className="pointer-events-none relative z-[1] mt-4 min-w-0">
                    <h2 className="truncate text-[15px] font-semibold text-ui-foreground">{project.name}</h2>
                    <p className="mt-1 truncate text-[13px] text-ui-muted">
                      {project.description || t("No description provided")}
                    </p>
                  </div>

                  <div
                    role="group"
                    aria-label={t("Project actions")}
                    data-layout="wrapping-actions"
                    className="relative z-10 mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-ui-border pt-3"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={isActive ? "success" : "neutral"}>{status.label}</Badge>
                        {isActive && (
                          <button type="button" onClick={() => handleRedirectToProject(project.slug)} className="rounded-ui-sm bg-[hsl(var(--ui-info-subtle))] px-2 py-0.5 text-[11px] font-medium text-[hsl(var(--ui-info))] hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus">
                            {t("Open")}
                          </button>
                        )}
                        {canManageTenantTemplates && project.templateScope !== "global" && (
                          <button
                            type="button"
                            disabled={isUpdatingTemplate}
                            onClick={() => handleToggleProjectTemplate(projectId, !project.isTemplate)}
                            className="rounded-ui-sm bg-ui-subtle px-2 py-0.5 text-[11px] font-medium text-ui-muted hover:text-ui-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus disabled:opacity-50"
                          >
                            {project.isTemplate ? t("Template") : t("Make Template")}
                          </button>
                        )}
                    </div>
                    <time className="text-[11px] font-medium text-ui-muted" dateTime={project.createdAt}>
                      {new Date(project.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                    </time>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </Section>

      <WorkspaceDialog
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title={t("Create New Project")}
        description={t("Set up a new project for your team")}
        footer={
          <ResponsiveActionBar>
            <GenericButton variant="ghost" onClick={() => setIsCreateModalOpen(false)} disabled={isCreating}>{t("Cancel")}</GenericButton>
            <GenericButton variant="primary" onClick={handleCreateProject} disabled={isCreating || !createForm.name.trim()} isLoading={isCreating}>
              {isCreating ? t("Creating...") : t("Create Project")}
            </GenericButton>
          </ResponsiveActionBar>
        }
      >
        <div className="mx-auto max-w-xl space-y-5">
          <div className="space-y-2">
            <Label htmlFor="project-name">{t("Project Name")} *</Label>
            <Input id="project-name" value={createForm.name} onChange={(event) => setCreateForm((previous) => ({ ...previous, name: event.target.value }))} placeholder={t("Enter project name")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-slug">{t("Project Slug")} ({t("optional")})</Label>
            <Input id="project-slug" value={createForm.slug} onChange={(event) => setCreateForm((previous) => ({ ...previous, slug: event.target.value }))} placeholder={t("auto-generated-slug")} className="font-mono" />
            <p className="text-xs text-ui-muted">{t("If left blank, the slug is generated from the project name.")}</p>
          </div>
          {projectTemplates.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="project-template">{t("Template Project")} ({t("optional")})</Label>
              <select id="project-template" value={createForm.templateProjectId || ""} onChange={(event) => handleTemplateSelection(event.target.value)} className="h-9 w-full rounded-ui-md border border-ui-border bg-ui-surface px-3 text-sm text-ui-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus">
                <option value="">{t("Start from scratch")}</option>
                {projectTemplates.map((template) => <option key={getProjectId(template)} value={getProjectId(template)}>{template.name}{template.templateScope === "global" ? ` (${t("Global")})` : ""}</option>)}
              </select>
            </div>
          )}
          {createForm.templateProjectId && (
            <label className="flex items-start gap-3 rounded-ui-md border border-ui-border p-3 text-sm">
              <input type="checkbox" checked={!!createForm.includeTemplateItems} onChange={(event) => setCreateForm((previous) => ({ ...previous, includeTemplateItems: event.target.checked }))} className="mt-0.5 h-4 w-4" />
              <span><span className="block font-medium text-ui-foreground">{t("Include template items")}</span><span className="mt-0.5 block text-xs text-ui-muted">{t("Copy existing data records with new IDs")}</span></span>
            </label>
          )}
        </div>
      </WorkspaceDialog>

      <WorkspaceDialog
        open={!!templateChoiceProject}
        onClose={() => setTemplateChoiceProject(null)}
        title={t("Use project as template")}
        description={templateChoiceProject?.name}
        footer={
          <ResponsiveActionBar>
            <GenericButton variant="ghost" onClick={() => setTemplateChoiceProject(null)} disabled={isUpdatingTemplate}>{t("Cancel")}</GenericButton>
            <GenericButton variant="secondary" onClick={() => confirmTemplateChoice(false)} disabled={isUpdatingTemplate}>{t("Create without items")}</GenericButton>
            <GenericButton variant="primary" onClick={() => confirmTemplateChoice(true)} disabled={isUpdatingTemplate} isLoading={isUpdatingTemplate}>{t("Create with items")}</GenericButton>
          </ResponsiveActionBar>
        }
      >
        <p className="text-sm text-ui-muted">{t("Choose whether this template should include the current data records by default.")}</p>
      </WorkspaceDialog>
    </PageShell>
  );
};

export default ProjectsPage;
