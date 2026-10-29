import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight, FiFolder, FiSearch, FiTrash2, FiX } from "react-icons/fi";
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
  Select,
  Skeleton,
  WorkspaceDialog,
} from "../components/ui";
import { ProjectExternalAPIs, ProjectExternalAPISelection } from "../components/integrations/ProjectExternalAPIs";
import { externalAPIError } from "../utils/api/integration";
import { createUrlSlug } from "../utils/urlSlug";
import { useTenant } from "../hooks/useTenant";
import { useSwitchToProject } from "../utils/api/auth";
import {
  CreateProjectPayload,
  getProjectId,
  getProjectStatusDisplay,
  useCreateProject,
  useDeleteProject,
  useProjectTemplates,
  useProjectsQuery,
  useUpdateProjectTemplate,
} from "../utils/api/project";

const ProjectsPage: React.FC = () => {
  const { t } = useTranslation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createForm, setCreateForm] = useState<CreateProjectPayload>({ name: "", slug: "" });
  const [templateChoiceProject, setTemplateChoiceProject] = useState<{ id: string; name: string } | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<{ id: string; name: string } | null>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const deleteInputRef = useRef<HTMLInputElement>(null);

  const { data: projects, isLoading, isError, refetch } = useProjectsQuery(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [createError, setCreateError] = useState("");
  const [externalAPISelection, setExternalAPISelection] = useState<ProjectExternalAPISelection>({ ids: [], bindings: {}, ready: true });
  const [savingCredential, setSavingCredential] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; slug?: string }>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const slugRef = useRef<HTMLInputElement>(null);
  const visibleProjects = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    return projects.filter((project) => {
      const matchesSearch = [project.name, project.slug, project.description].some((value) => value?.toLocaleLowerCase().includes(query));
      const matchesStatus = statusFilter === "all" || (statusFilter === "active" ? project.isActive : !project.isActive);
      return matchesSearch && matchesStatus;
    }).sort((a, b) => sortBy === "name"
      ? a.name.localeCompare(b.name)
      : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [projects, searchQuery, statusFilter, sortBy]);
  const clearFilters = () => { setSearchQuery(""); setStatusFilter("all"); };
  const projectTemplatesData = useProjectTemplates(true);
  const projectTemplates = Array.isArray(projectTemplatesData) ? projectTemplatesData : [];
  const { createProject, isCreating } = useCreateProject();
  const { updateProjectTemplate, isUpdatingTemplate } = useUpdateProjectTemplate();
  const { switchToProject, isSwitching } = useSwitchToProject();
  const { deleteProject, isDeleting } = useDeleteProject();
  const { currentTenant, hasRole, isTenantOwner } = useTenant();
  const canManageTenantTemplates =
    isTenantOwner(currentTenant?.id) || hasRole("tenant_owner") || hasRole("tenant_admin");
  // Backend restricts project deletion to tenant owners.
  const canDeleteProjects = isTenantOwner(currentTenant?.id) || hasRole("tenant_owner");

  const openDeleteDialog = (projectId: string, name: string) => {
    setDeleteConfirmText("");
    setProjectToDelete({ id: projectId, name });
  };

  const closeDeleteDialog = () => {
    if (isDeleting) return;
    setProjectToDelete(null);
    setDeleteConfirmText("");
  };

  const handleDeleteProject = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!projectToDelete || isDeleting || deleteConfirmText.trim() !== projectToDelete.name) return;
    try {
      await deleteProject(projectToDelete.id);
      setProjectToDelete(null);
      setDeleteConfirmText("");
    } catch {
      // Error toast is shown by the mutation; keep the dialog open so the user can retry.
    }
  };

  useEffect(() => {
    if (!isCreateModalOpen) { setCreateForm({ name: "", slug: "" }); setCreateError(""); setFieldErrors({}); setExternalAPISelection({ ids: [], bindings: {}, ready: true }); setSavingCredential(false); }
  }, [isCreateModalOpen]);

  const handleCreateProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isCreating || savingCredential || !externalAPISelection.ready) return;
    const slug = createForm.slug.trim() || createUrlSlug(createForm.name);
    const errors: typeof fieldErrors = {};
    if (!createForm.name.trim()) errors.name = t("Project name is required");
    if (!/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(slug)) {
      errors.slug = t("Use lowercase letters, numbers, and hyphens. Start and end with a letter or number.");
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length) {
      (errors.name ? nameRef : slugRef).current?.focus();
      return;
    }
    setCreateError("");
    try {
      await createProject({
        name: createForm.name.trim(),
        slug,
        ...(externalAPISelection.ids.length ? { externalAPICredentialIds: externalAPISelection.ids } : {}),
        ...(Object.keys(externalAPISelection.bindings).length ? { externalAPICredentialBindings: externalAPISelection.bindings } : {}),
        ...(createForm.templateProjectId ? { templateProjectId: createForm.templateProjectId, includeTemplateItems: !!createForm.includeTemplateItems } : {}),
      });
      setIsCreateModalOpen(false);
    } catch (failure) {
      setCreateError(`${t("Your project could not be created. Your details are saved here. Please try again.")} ${externalAPIError(failure, "")}`.trim());
    }
  };

  const handleTemplateSelection = (templateProjectId: string) => {
    setExternalAPISelection(previous => ({ ...previous, bindings: {}, ready: !templateProjectId }));
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
    window.open(`https://panel.autoapi.org/t/${currentTenant.slug}/p/${projectSlug}/login`, "_blank", "noopener,noreferrer");
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

  const newProjectButton = (label: string) => canManageTenantTemplates ? (
    <GenericButton variant="primary" size="md" onClick={() => setIsCreateModalOpen(true)}>
      {t(label)}
    </GenericButton>
  ) : undefined;

  // Distinct avatar accents per project — decorative but calibrated to the UI palette.
  const projectAccents = [
    "bg-gradient-to-br from-zinc-600 to-zinc-900",
    "bg-gradient-to-br from-sky-500 to-blue-700",
    "bg-gradient-to-br from-violet-500 to-indigo-700",
    "bg-gradient-to-br from-emerald-500 to-teal-700",
    "bg-gradient-to-br from-amber-500 to-orange-700",
    "bg-gradient-to-br from-rose-500 to-pink-700",
  ];

  return (
    <PageShell width="wide">
      <PageHeader
        title={
          <span className="flex items-center gap-2.5">
            {t("Projects")}
            {projects.length > 0 && (
              <span aria-hidden="true" className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ui-foreground px-1.5 text-[11px] font-semibold text-ui-surface">
                {projects.length}
              </span>
            )}
          </span>
        }
        description={t("Choose a workspace to manage its data, pages, and integrations.")}
        actions={<PageActions aria-label={t("Page actions")}>{newProjectButton("New Project")}</PageActions>}
        className="pb-4"
      />

      {projects.length > 0 && (
        <div className="mt-5 space-y-3">
          <div role="search" aria-label={t("Find a project")} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative min-w-0 flex-1 sm:max-w-sm">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ui-muted" aria-hidden="true" />
              <Input type="search" aria-label={t("Search projects")} placeholder={t("Search by name, slug, or description…")} value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="pl-9 pr-10" />
              {searchQuery && <button type="button" aria-label={t("Clear search")} onClick={() => setSearchQuery("")} className="ui-focus-ring absolute right-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-ui-sm text-ui-muted hover:text-ui-foreground"><FiX aria-hidden="true" /></button>}
            </div>
            <div className="flex min-w-0 flex-wrap gap-2 sm:ml-auto">
              <Select aria-label={t("Project status")} searchable={false} value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="min-w-[140px] flex-1 sm:flex-none">
                <option value="all">{t("All statuses")}</option><option value="active">{t("Active")}</option><option value="inactive">{t("Inactive")}</option>
              </Select>
              <Select aria-label={t("Sort projects")} searchable={false} value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="min-w-[150px] flex-1 sm:flex-none">
                <option value="newest">{t("Newest first")}</option><option value="name">{t("Name A–Z")}</option>
              </Select>
            </div>
          </div>
          <div aria-live="polite" className="flex min-h-6 items-center justify-between gap-3 text-xs text-ui-muted">
            <p>{t("Showing {{count}} of {{total}} projects", { count: visibleProjects.length, total: projects.length })}</p>
            {visibleProjects.length > 0 && (searchQuery || statusFilter !== "all") && <button type="button" onClick={clearFilters} className="ui-focus-ring rounded-ui-sm font-medium text-ui-primary hover:underline">{t("Clear filters")}</button>}
          </div>
        </div>
      )}

      <Section>
        {isLoading ? (
          <div role="status" aria-label={t("Loading projects")} className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            <span className="sr-only">{t("Loading projects…")}</span>
            {[0, 1, 2].map((key) => <div key={key} aria-hidden="true" className="space-y-4 rounded-ui-xl border border-ui-border bg-ui-surface p-5 shadow-ui-card"><Skeleton className="size-11" /><Skeleton className="h-4 w-2/3" /><Skeleton className="h-3 w-full" /><Skeleton className="h-3 w-1/2" /></div>)}
          </div>
        ) : isError ? (
          <EmptyState role="alert" title={t("Projects could not be loaded")} description={t("Check your connection and try again.")} action={<GenericButton variant="outline" onClick={() => { void refetch(); }}>{t("Try again")}</GenericButton>} />
        ) : projects.length === 0 ? (
          <EmptyState
            icon={<FiFolder size={32} />}
            title={t("No projects yet")}
            description={canManageTenantTemplates ? t("Create your first project to organize your work and collaborate with your team.") : t("Projects you have access to will appear here. Contact a tenant administrator to get started.")}
            action={newProjectButton("Create your first project")}
          />
        ) : visibleProjects.length === 0 ? (
          <EmptyState icon={<FiSearch size={28} />} title={t("No matching projects")} description={t("Try another search or clear your filters to see all projects.")} action={<GenericButton variant="outline" onClick={clearFilters}>{t("Clear filters")}</GenericButton>} />
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {visibleProjects.map((project, index) => {
              const projectId = getProjectId(project) || `project-${index}`;
              const isActive = project.isActive;
              const status = getProjectStatusDisplay(isActive ? "active" : "inactive", t);

              return (
                <article
                  key={projectId}
                  className="group relative min-w-0 overflow-hidden rounded-ui-xl border border-ui-border bg-ui-surface p-5 shadow-ui-card transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-ui-border-hover hover:shadow-lg"
                >
                  <button
                    type="button"
                    aria-label={isActive ? `${t("Switch to")} ${project.name}` : project.name}
                    disabled={!isActive || isSwitching}
                    onClick={() => switchToProject({ projectId })}
                    className="absolute inset-0 z-0 rounded-ui-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui-focus disabled:cursor-not-allowed"
                  />

                  <div className="pointer-events-none relative z-[1] flex items-start justify-between gap-3">
                    <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-[15px] font-semibold tracking-tight text-white shadow-ui-sm ${projectAccents[index % projectAccents.length]}`}>
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
                    <h2 title={project.name} className="truncate text-[15px] font-semibold text-ui-foreground">{project.name}</h2>
                    <p className="mt-1 truncate font-mono text-xs text-ui-muted">/{project.slug}</p>
                    <p title={project.description} className="mt-2 line-clamp-2 min-h-10 text-[13px] leading-5 text-ui-muted">
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
                        <button
                          type="button"
                          aria-label={t("Open {{name}} in a new tab", { name: project.name })}
                          onClick={() => handleRedirectToProject(project.slug)}
                          className="ui-focus-ring inline-flex items-center rounded-ui-sm border border-transparent bg-[hsl(var(--ui-info-subtle))] min-h-8 px-2.5 py-1 text-xs font-medium sm:min-h-6 sm:px-2 sm:py-0.5 sm:text-[11px] text-[hsl(var(--ui-info))] hover:brightness-95 transition-colors"
                        >
                          {t("Open")}<FiArrowUpRight aria-hidden="true" className="ml-1" />
                        </button>
                      )}
                      {canManageTenantTemplates && project.templateScope !== "global" && (
                        <button
                          type="button"
                          disabled={isUpdatingTemplate}
                          onClick={() => handleToggleProjectTemplate(projectId, !project.isTemplate)}
                          className="ui-focus-ring inline-flex items-center rounded-ui-sm border border-ui-border bg-ui-surface-subtle min-h-8 px-2.5 py-1 text-xs font-medium sm:min-h-6 sm:px-2 sm:py-0.5 sm:text-[11px] text-ui-muted hover:text-ui-foreground hover:bg-ui-disabled transition-colors disabled:opacity-50"
                        >
                          {project.isTemplate ? t("Template") : t("Make Template")}
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <time className="text-[11px] font-medium text-ui-muted" dateTime={project.createdAt}>
                        {new Date(project.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                      </time>
                      {canDeleteProjects && project.templateScope !== "global" && (
                        <button
                          type="button"
                          aria-label={t("Delete {{name}}", { name: project.name })}
                          title={t("Delete project")}
                          disabled={isDeleting}
                          onClick={() => openDeleteDialog(projectId, project.name)}
                          className="ui-focus-ring inline-flex size-8 items-center justify-center rounded-ui-sm text-ui-muted transition-colors hover:bg-ui-danger-subtle hover:text-ui-danger disabled:opacity-50 sm:size-6"
                        >
                          <FiTrash2 aria-hidden="true" size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </Section>

      <WorkspaceDialog
        open={isCreateModalOpen}
        initialFocusRef={nameRef}
        className="max-w-xl"
        onClose={() => { if (!isCreating && !savingCredential) setIsCreateModalOpen(false); }}
        title={t("Create New Project")}
        description={t("Set up a new project for your team")}
        footer={
          <ResponsiveActionBar>
            <GenericButton variant="ghost" onClick={() => setIsCreateModalOpen(false)} disabled={isCreating || savingCredential}>{t("Cancel")}</GenericButton>
            <GenericButton variant="primary" type="submit" form="create-project-form" disabled={isCreating || savingCredential || !externalAPISelection.ready} isLoading={isCreating}>
              {isCreating ? t("Creating...") : t("Create Project")}
            </GenericButton>
          </ResponsiveActionBar>
        }
      >
        <form id="create-project-form" noValidate onSubmit={handleCreateProject} aria-busy={isCreating} className="mx-auto max-w-xl space-y-5">
          {createError && <p role="alert" className="rounded-ui-md border border-ui-danger/20 bg-ui-danger-subtle p-3 text-sm text-ui-danger">{createError}</p>}
          <div className="space-y-2">
            <Label htmlFor="project-name">{t("Project Name")} *</Label>
            <Input ref={nameRef} id="project-name" required disabled={isCreating} invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? "project-name-error" : undefined} value={createForm.name} onChange={(event) => { setCreateForm((previous) => ({ ...previous, name: event.target.value })); setFieldErrors((previous) => ({ ...previous, name: undefined })); }} placeholder={t("Enter project name")} />
            {fieldErrors.name && <p id="project-name-error" role="alert" className="text-sm text-ui-danger">{fieldErrors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-slug">{t("Project Slug")} ({t("optional")})</Label>
            <Input ref={slugRef} id="project-slug" disabled={isCreating} invalid={Boolean(fieldErrors.slug)} aria-describedby={fieldErrors.slug ? "project-slug-error" : "project-slug-hint"} value={createForm.slug} onChange={(event) => { setCreateForm((previous) => ({ ...previous, slug: event.target.value })); setFieldErrors((previous) => ({ ...previous, slug: undefined })); }} placeholder={createUrlSlug(createForm.name) || t("auto-generated-slug")} className="font-mono" />
            {fieldErrors.slug && <p id="project-slug-error" role="alert" className="text-sm text-ui-danger">{fieldErrors.slug}</p>}
            <p id="project-slug-hint" className="text-xs text-ui-muted">{t("If left blank, the slug is generated from the project name.")}</p>
          </div>
          {projectTemplates.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="project-template">{t("Template Project")} ({t("optional")})</Label>
              <Select id="project-template" disabled={isCreating || savingCredential} value={createForm.templateProjectId || ""} onChange={(event) => handleTemplateSelection(event.target.value)} className="h-9 w-full rounded-ui-md border border-ui-border bg-ui-surface px-3 text-sm text-ui-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus">
                <option value="">{t("Start from scratch")}</option>
                {projectTemplates.map((template) => <option key={getProjectId(template)} value={getProjectId(template)}>{template.name}{template.templateScope === "global" ? ` (${t("Global")})` : ""}</option>)}
              </Select>
            </div>
          )}
          {createForm.templateProjectId && (
            <label className="flex items-start gap-3 rounded-ui-md border border-ui-border p-3 text-sm">
              <Input type="checkbox" checked={!!createForm.includeTemplateItems} onChange={(event) => setCreateForm((previous) => ({ ...previous, includeTemplateItems: event.target.checked }))} className="mt-0.5 h-4 w-4" />
              <span><span className="block font-medium text-ui-foreground">{t("Include template items")}</span><span className="mt-0.5 block text-xs text-ui-muted">{t("Copy existing data records with new IDs")}</span></span>
            </label>
          )}
          {isCreateModalOpen && canManageTenantTemplates && <ProjectExternalAPIs templateId={createForm.templateProjectId} disabled={isCreating} onChange={setExternalAPISelection} onSavingChange={setSavingCredential} />}
        </form>
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

      <WorkspaceDialog
        open={!!projectToDelete}
        initialFocusRef={deleteInputRef}
        className="max-w-md"
        onClose={closeDeleteDialog}
        title={t("Delete project")}
        description={projectToDelete?.name}
        footer={
          <ResponsiveActionBar>
            <GenericButton variant="ghost" onClick={closeDeleteDialog} disabled={isDeleting}>{t("Cancel")}</GenericButton>
            <GenericButton
              variant="danger"
              type="submit"
              form="delete-project-form"
              disabled={isDeleting || deleteConfirmText.trim() !== projectToDelete?.name}
              isLoading={isDeleting}
            >
              {isDeleting ? t("Deleting...") : t("Delete project")}
            </GenericButton>
          </ResponsiveActionBar>
        }
      >
        <form id="delete-project-form" noValidate onSubmit={handleDeleteProject} aria-busy={isDeleting} className="space-y-4">
          <p role="alert" className="rounded-ui-md border border-ui-danger/20 bg-ui-danger-subtle p-3 text-sm text-ui-danger">
            {t("This permanently deletes the project and all of its collections, data, pages, translations, and project-owned credentials. Tenant shared credentials remain available. This cannot be undone.")}
          </p>
          <div className="space-y-2">
            <Label htmlFor="delete-project-confirm">
              {t("Type {{name}} to confirm", { name: projectToDelete?.name ?? "" })}
            </Label>
            <Input
              ref={deleteInputRef}
              id="delete-project-confirm"
              autoComplete="off"
              disabled={isDeleting}
              value={deleteConfirmText}
              onChange={(event) => setDeleteConfirmText(event.target.value)}
              placeholder={projectToDelete?.name}
            />
          </div>
        </form>
      </WorkspaceDialog>
    </PageShell>
  );
};

export default ProjectsPage;
