import React, { useMemo } from "react";
import { getRoleLabel } from "../utils/roleLabels";
import { useTranslation } from "react-i18next";
import {
  FiArrowRight,
  FiCheckCircle,
  FiDatabase,
  FiFileText,
  FiFolder,
  FiGlobe,
  FiKey,
  FiSettings,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { GenericButton } from "../components/panelComponents/FormElements/GenericButton";
import {
  Badge,
  EmptyState,
  PageActions,
  PageHeader,
  PageShell,
  Section,
  SectionHeader,
  ResourceLoading,
} from "../components/ui";
import { useUserContext } from "../context/User.context";
import { useCurrentProject } from "../hooks/useCurrentProject";
import useTenant from "../hooks/useTenant";
import { useTenantLogout } from "../utils/api/auth";
import { useContainersQuery } from "../utils/api/container";
import { useIntegrationCredentials } from "../utils/api/integration";
import { useGetTenantPagesQuery } from "../utils/api/page";
import { hasManagementPermission } from "../utils/managementPermissions";
import { useProjectsQuery } from "../utils/api/project";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { currentTenant, allTenants, hasMultipleTenants, switchTenant } = useTenant();
  const { currentProject, isInProject } = useCurrentProject();
  const { tenantLogout } = useTenantLogout();

  const canReadProject = hasManagementPermission(user?.roles, "project.config.read");
  const canViewIntegrations = hasManagementPermission(user?.roles, "project.integrations.read");
  const projectsQuery = useProjectsQuery(Boolean(currentTenant) && !isInProject);
  const containersQuery = useContainersQuery(Boolean(isInProject && canReadProject));
  const pagesQuery = useGetTenantPagesQuery(Boolean(isInProject && canReadProject));
  const integrationsQuery = useIntegrationCredentials(Boolean(isInProject && canViewIntegrations));
  const projects = projectsQuery.data;
  const containers = containersQuery.data;
  const pages = pagesQuery.data;
  const integrations = integrationsQuery.data || [];
  const workspaceLoading = isInProject ? containersQuery.isLoading || pagesQuery.isLoading : projectsQuery.isLoading;
  const workspaceError = isInProject ? containersQuery.error || pagesQuery.error : projectsQuery.error;
  const retrySummary = () => {
    const queries = isInProject ? [containersQuery, pagesQuery] : [projectsQuery];
    void Promise.allSettled(queries.map((query) => query.refetch()));
  };

  const displayName = user?.name || user?.email;

  // Describe the available workspace context without inventing activity events.
  const recentActivities = useMemo(() => {
    const items = [];

    if (currentProject) {
      items.push({
        id: "current-proj",
        icon: FiFolder,
        title: t("Active project: {{name}}", { name: currentProject.name }),
        description: t("Project is actively selected with {{count}} collections and {{pages}} pages.", {
          count: containers.length,
          pages: pages.length,
        }),
        badge: t("Active"),
        badgeVariant: "success" as const,
        time: t("Current workspace"),
      });
    }

    if (!isInProject && projects.length > 0) {
      const firstProject = projects[0];
      items.push({
        id: "proj-status",
        icon: FiCheckCircle,
        title: t("Project {{name}} ready", { name: firstProject.name }),
        description: t("Slug: {{slug}} · Status: {{status}}", {
          slug: firstProject.slug,
          status: firstProject.isActive ? t("Active") : t("Inactive"),
        }),
        badge: firstProject.isActive ? t("Online") : t("Offline"),
        badgeVariant: (firstProject.isActive ? "info" : "neutral") as "info" | "neutral",
        time: t("Project status"),
      });
    }

    if (isInProject && canViewIntegrations && integrations.length > 0) {
      items.push({
        id: "integrations-status",
        icon: FiKey,
        title: t("API credentials configured"),
        description: t("{{count}} integration credentials configured for this project.", {
          count: integrations.length,
        }),
        badge: t("Configured"),
        badgeVariant: "success" as const,
        time: t("Active"),
      });
    }

    if (isInProject && canReadProject) items.push({
      id: "localization-status",
      icon: FiGlobe,
      title: t("Project localization"),
      description: t("Manage translations and language preferences for this workspace."),
      badge: t("Available"),
      badgeVariant: "neutral" as const,
      time: t("Project tools"),
    });

    return items;
  }, [currentProject, containers.length, pages.length, projects, isInProject, integrations.length, canReadProject, canViewIntegrations, t]);

  // Quick Action items as actionable destinations
  const quickActions = useMemo(() => [
    {
      scope: "tenant",
      label: t("Projects"),
      description: t("View and switch between all tenant projects"),
      path: "/projects",
      icon: FiFolder,
      badge: `${projects.length}`,
    },
    {
      scope: "project",
      label: t("Collections"),
      description: t("Manage data schemas, fields, and API endpoints"),
      path: isInProject ? "/collections" : "/projects",
      icon: FiDatabase,
      badge: isInProject ? `${containers.length}` : undefined,
    },
    {
      scope: "project",
      label: t("Pages"),
      description: t("Design page layouts, components, and navigation"),
      path: isInProject ? "/pages" : "/projects",
      icon: FiFileText,
      badge: isInProject ? `${pages.length}` : undefined,
    },
    {
      scope: "project",
      label: t("Integrations"),
      description: t("Configure API keys, webhooks, and third-party tools"),
      path: isInProject ? "/integrations" : "/projects",
      icon: FiKey,
      badge: isInProject ? `${integrations.length}` : undefined,
    },
    {
      scope: "project",
      label: t("Localization"),
      description: t("Customize languages and project dictionary translations"),
      path: isInProject ? "/localization" : "/projects",
      icon: FiGlobe,
    },
    {
      scope: "both",
      label: t("Settings & Branding"),
      description: t("Manage tenant identity, assets, logos, and theme"),
      path: "/settings",
      icon: FiSettings,
    },
  ].filter((action) => {
    if (!isInProject) return action.scope !== "project";
    if (action.scope === "tenant") return false;
    if (action.path === "/integrations") return canViewIntegrations;
    return canReadProject;
  }), [projects.length, isInProject, containers.length, pages.length, integrations.length, canReadProject, canViewIntegrations, t]);

  const metrics = isInProject ? [
    { label: t("Collections"), value: containersQuery.isLoading || containersQuery.error ? "—" : containers.length, description: t("In current project"), icon: FiDatabase, path: "/collections" },
    { label: t("Pages"), value: pagesQuery.isLoading || pagesQuery.error ? "—" : pages.length, description: t("In current project"), icon: FiFileText, path: "/pages" },
    ...(canViewIntegrations ? [{ label: t("Integrations"), value: integrationsQuery.isLoading || integrationsQuery.error ? "—" : integrations.length, description: t("Configured credentials"), icon: FiKey, path: "/integrations" }] : []),
  ].filter(() => canReadProject) : [
    { label: t("Projects"), value: projectsQuery.isLoading || projectsQuery.error ? "—" : projects.length, description: t("Total projects"), icon: FiFolder, path: "/projects" },
    { label: t("Active projects"), value: projectsQuery.isLoading || projectsQuery.error ? "—" : projects.filter((project) => project.isActive).length, description: t("Available to open"), icon: FiCheckCircle, path: "/projects" },
  ];

  return (
    <PageShell width="content">
      {/* Header */}
      <PageHeader
        title={currentProject?.name || currentTenant?.name || t("Dashboard")}
        description={
          currentTenant
            ? `${t("Welcome")}${displayName ? `, ${displayName}` : ""}`
            : t("Tenant context is unavailable")
        }
        context={
          <>
            {currentTenant?.slug && <Badge variant="info">{currentTenant.slug}</Badge>}
            {isInProject && currentProject && (
              <Badge variant="success">
                {t("Project: {{name}}", { name: currentProject.name })}
              </Badge>
            )}
          </>
        }
        actions={
          <PageActions aria-label={t("Dashboard actions")}>

            <GenericButton onClick={() => tenantLogout()} variant="outline" size="sm">
              {t("Logout")}
            </GenericButton>
          </PageActions>
        }
      />

      <div className={`mt-6 grid grid-cols-2 gap-3 ${metrics.length === 3 ? "sm:grid-cols-3" : ""}`}>
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return <button key={metric.label} aria-label={`${metric.label}: ${metric.value}. ${metric.description}`} type="button" onClick={() => navigate(metric.path)} className="group ui-focus-ring flex min-w-0 flex-col rounded-ui-xl border border-ui-border bg-ui-surface p-5 text-left shadow-ui-card transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-ui-border-hover hover:shadow-md"><div className="flex items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-ui-muted"><span>{metric.label}</span><Icon aria-hidden="true" className="size-4 shrink-0" /></div><span className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-ui-foreground">{metric.value}</span><span className="mt-1.5 text-xs text-ui-muted">{metric.description}</span></button>;
        })}
      </div>

      {/* 2. Recent Activity Section */}
      <Section aria-labelledby="recent-activity-heading">
        <SectionHeader
          title={<span id="recent-activity-heading">{t("Workspace overview")}</span>}
          description={t("Current projects and available workspace tools.")}
        />
        <div className="divide-y divide-ui-border overflow-hidden rounded-ui-xl border border-ui-border bg-ui-surface shadow-ui-card">
          {workspaceLoading ? <ResourceLoading label={t("Loading workspace")} /> : workspaceError ? <EmptyState role="alert" title={t("Workspace summary could not be loaded")} description={t("Check your connection and try again.")} action={<GenericButton variant="outline" onClick={retrySummary}>{t("Try again")}</GenericButton>} /> : <>
          {recentActivities.length === 0 && <EmptyState icon={<FiFolder size={28} />} title={t("Your workspace is ready")} description={t("Open Projects to choose a workspace or create your first project.")} action={<GenericButton variant="outline" onClick={() => navigate("/projects")}>{t("Open projects")}</GenericButton>} />}
          {recentActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.id}
                className="flex flex-col gap-2 p-3.5 sm:flex-row sm:items-center sm:justify-between transition-colors hover:bg-ui-surface-subtle/50"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-ui-sm bg-ui-surface-subtle text-ui-muted border border-ui-border">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-ui-foreground">{activity.title}</div>
                    <div className="text-xs text-ui-muted">{activity.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start pl-10 sm:self-center sm:pl-0">
                  <Badge variant={activity.badgeVariant} className="text-[10px]">
                    {activity.badge}
                  </Badge>
                  <span className="text-[11px] text-ui-muted">{activity.time}</span>
                </div>
              </div>
            );
          })}
          </>}
        </div>
      </Section>

      {/* 3. Actionable Quick Actions */}
      <Section aria-labelledby="quick-actions-heading">
        <SectionHeader
          title={<span id="quick-actions-heading">{t("Quick Actions")}</span>}
          description={isInProject ? t("Continue working in this project.") : t("Choose a project or manage your tenant settings.")}
        />
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                type="button"
                onClick={() => navigate(action.path)}
                className="group flex flex-col justify-between rounded-ui-xl border border-ui-border bg-ui-surface p-4 text-left shadow-ui-card transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-ui-border-hover hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus active:scale-[0.99]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-ui-sm bg-ui-surface-subtle text-ui-muted border border-ui-border group-hover:text-ui-foreground transition-colors">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm font-semibold text-ui-foreground group-hover:text-ui-primary transition-colors">
                      {action.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {action.badge && (
                      <Badge variant="mono" className="text-[10px]">
                        {action.badge}
                      </Badge>
                    )}
                    <FiArrowRight className="h-3.5 w-3.5 text-ui-muted transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-ui-foreground" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-ui-muted line-clamp-1">{action.description}</p>
              </button>
            );
          })}
        </div>
      </Section>

      {/* 4. Multi-Tenant Switcher (if applicable) */}
      {hasMultipleTenants() && (
        <Section aria-labelledby="tenant-switcher-heading">
          <SectionHeader
            title={<span id="tenant-switcher-heading">{t("Your Tenants")}</span>}
            description={t("Choose the tenant workspace you want to manage.")}
          />
          <div className="grid gap-2 sm:grid-cols-2">
            {allTenants.map((tenant) => {
              const isCurrent = tenant.id === currentTenant?.id;

              return (
                <button
                  key={tenant.id}
                  type="button"
                  disabled={isCurrent}
                  onClick={() => switchTenant(tenant.id)}
                  className="flex min-w-0 items-center justify-between gap-3 rounded-ui-md border border-ui-border bg-ui-surface px-4 py-3 text-left transition-colors hover:border-ui-border-strong hover:bg-ui-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus disabled:cursor-default disabled:border-ui-border-strong disabled:bg-ui-surface-subtle disabled:opacity-100"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-ui-foreground">
                      {tenant.name}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-ui-muted">
                      {tenant.slug}
                    </span>
                  </span>
                  {isCurrent && <Badge variant="info">{t("Current")}</Badge>}
                </button>
              );
            })}
          </div>
        </Section>
      )}

      {/* 5. Account & Access Info (Quiet overview at bottom) */}
      <Section aria-labelledby="account-overview-heading">
        <SectionHeader
          title={<span id="account-overview-heading">{t("Account Overview")}</span>}
          description={t("Your current tenant membership and access details.")}
        />
        {currentTenant ? (
          <div className="rounded-ui-xl border border-ui-border bg-ui-surface p-5 shadow-ui-card">
            <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-3">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-ui-muted">
                  {t("Current Tenant")}
                </dt>
                <dd className="mt-1 break-words text-sm font-medium text-ui-foreground">
                  {currentTenant.name}
                </dd>
                <dd className="mt-0.5 break-all text-xs font-mono text-ui-muted">{currentTenant.slug}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-ui-muted">
                  {t("Your Role")}
                </dt>
                <dd className="mt-1 text-sm font-medium text-ui-foreground">
                  {t(getRoleLabel(user?.role || user?.roles?.[0] || "user"))}
                </dd>
                {user?.roles && user.roles.length > 1 && (
                  <dd className="mt-0.5 text-xs text-ui-muted">
                    {user.roles.map((role) => t(getRoleLabel(role))).join(", ")}
                  </dd>
                )}
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-ui-muted">
                  {t("Account Status")}
                </dt>
                <dd className="mt-1 flex items-center gap-2">
                  <Badge variant="success">{t("Active")}</Badge>
                  <span className="text-xs text-ui-muted">{t("Signed in")}</span>
                </dd>
              </div>
            </dl>
          </div>
        ) : (
          <EmptyState
            title={t("Tenant context is unavailable")}
            description={t("Sign in again or contact an administrator to restore tenant access.")}
            action={<GenericButton variant="outline" onClick={() => tenantLogout()}>{t("Sign in again")}</GenericButton>}
          />
        )}
      </Section>
    </PageShell>
  );
};

export default Dashboard;
