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

  return (
    <PageShell width="wide">
      <PageHeader
        title={t("Projects")}
        description={t("Create, switch, and manage tenant projects.")}
        context={projects.length > 0 ? <Badge>{projects.length} {t("projects")}</Badge> : undefined}
        actions={<PageActions aria-label={t("Page actions")}>{newProjectButton("New Project")}</PageActions>}
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
                <article key={projectId} className="flex min-w-0 flex-col rounded-ui-lg border border-ui-border bg-ui-surface p-4">
                  <div className="flex min-w-0 items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-semibold text-ui-foreground">{project.name}</h2>
                      <p className="mt-1 line-clamp-2 text-sm text-ui-muted">
                        {project.description || t("No description provided")}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
                      {project.isTemplate && (
                        <Badge variant="warning">
                          {project.templateScope === "global" ? t("Global Template") : t("Template")}
                        </Badge>
                      )}
                      <Badge variant={isActive ? "success" : "neutral"}>{status.label}</Badge>
                    </div>
                  </div>

                  <div className="mt-auto pt-4">
                    <ResponsiveActionBar align="between" aria-label={t("Project actions")}>
                      <div className="text-xs text-ui-muted">
                        {new Date(project.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                      </div>
                      <div className="flex flex-wrap justify-end gap-2">
                        {isActive && (
                          <GenericButton variant="ghost" size="sm" onClick={() => handleRedirectToProject(project.slug)}>
                            {t("Open panel")}
                          </GenericButton>
                        )}
                        {canManageTenantTemplates && project.templateScope !== "global" && (
                          <GenericButton
                            variant="ghost"
                            size="sm"
                            disabled={isUpdatingTemplate}
                            onClick={() => handleToggleProjectTemplate(projectId, !project.isTemplate)}
                          >
                            {project.isTemplate ? t("Remove Template") : t("Make Template")}
                          </GenericButton>
                        )}
                        <GenericButton
                          variant="outline"
                          size="sm"
                          disabled={!isActive || isSwitching}
                          onClick={() => switchToProject({ projectId })}
                        >
                          {isActive ? `${t("Switch to")} ${project.name}` : project.name}
                        </GenericButton>
                      </div>
                    </ResponsiveActionBar>
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
