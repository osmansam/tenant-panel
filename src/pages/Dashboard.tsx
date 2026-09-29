import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  FiActivity,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiDatabase,
  FiFileText,
  FiFolder,
  FiGlobe,
  FiKey,
  FiMenu,
  FiSettings,
  FiUsers,
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
} from "../components/ui";
import { useGeneralContext } from "../context/General.context";
import { useUserContext } from "../context/User.context";
import { useCurrentProject } from "../hooks/useCurrentProject";
import useTenant from "../hooks/useTenant";
import { useTenantLogout } from "../utils/api/auth";
import { useContainers } from "../utils/api/container";
import { useIntegrationCredentials } from "../utils/api/integration";
import { useGetTenantPages } from "../utils/api/page";
import { useProjects } from "../utils/api/project";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { setIsSidebarOpen } = useGeneralContext();
  const { currentTenant, allTenants, hasMultipleTenants, switchTenant } = useTenant();
  const { currentProject, isInProject } = useCurrentProject();
  const { tenantLogout } = useTenantLogout();

  const projects = useProjects(Boolean(currentTenant));
  const containers = useContainers(Boolean(isInProject));
  const pages = useGetTenantPages(Boolean(isInProject));
  const { data: integrations = [] } = useIntegrationCredentials(Boolean(isInProject));

  const displayName = user?.name || user?.email;

  // Recent activity stream synthesized from tenant and project context
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

    if (projects.length > 0) {
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
        time: t("Recently updated"),
      });
    }

    if (isInProject && integrations.length > 0) {
      items.push({
        id: "integrations-status",
        icon: FiKey,
        title: t("API credentials configured"),
        description: t("{{count}} integration keys active for external automation and webhooks.", {
          count: integrations.length,
        }),
        badge: t("Secure"),
        badgeVariant: "success" as const,
        time: t("Active"),
      });
    }

    items.push({
      id: "localization-status",
      icon: FiGlobe,
      title: t("Localization system active"),
      description: t("Multi-language translations and locale overrides available."),
      badge: t("System"),
      badgeVariant: "neutral" as const,
      time: t("All environments"),
    });

    return items;
  }, [currentProject, containers.length, pages.length, projects, isInProject, integrations.length, t]);

  // Quick Action items as actionable destinations
  const quickActions = useMemo(() => [
    {
      label: t("Projects"),
      description: t("View and switch between all tenant projects"),
      path: "/projects",
      icon: FiFolder,
      badge: `${projects.length}`,
    },
    {
      label: t("Collections"),
      description: t("Manage data schemas, fields, and API endpoints"),
      path: isInProject ? "/collections" : "/projects",
      icon: FiDatabase,
      badge: isInProject ? `${containers.length}` : undefined,
    },
    {
      label: t("Pages"),
      description: t("Design page layouts, components, and navigation"),
      path: isInProject ? "/pages" : "/projects",
      icon: FiFileText,
      badge: isInProject ? `${pages.length}` : undefined,
    },
    {
      label: t("Integrations"),
      description: t("Configure API keys, webhooks, and third-party tools"),
      path: isInProject ? "/integrations" : "/projects",
      icon: FiKey,
      badge: isInProject ? `${integrations.length}` : undefined,
    },
    {
      label: t("Localization"),
      description: t("Customize languages and project dictionary translations"),
      path: isInProject ? "/localization" : "/projects",
      icon: FiGlobe,
    },
    {
      label: t("Settings & Branding"),
      description: t("Manage tenant identity, assets, logos, and theme"),
      path: "/settings",
      icon: FiSettings,
    },
  ], [projects.length, isInProject, containers.length, pages.length, integrations.length, t]);

  return (
    <PageShell width="content">
      {/* Header */}
      <PageHeader
        title={currentTenant?.name || t("Dashboard")}
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
            <button
              type="button"
              aria-label={t("Open navigation")}
              onClick={() => setIsSidebarOpen(true)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-ui-md text-ui-muted transition-colors hover:bg-ui-surface-subtle hover:text-ui-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus md:hidden"
            >
              <FiMenu className="h-4 w-4" aria-hidden="true" />
            </button>
            <GenericButton onClick={() => tenantLogout()} variant="outline" size="sm">
              {t("Logout")}
            </GenericButton>
          </PageActions>
        }
      />

      {/* 1. Tenant & Project Summary Stats Strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <button
          type="button"
          onClick={() => navigate("/projects")}
          className="group flex flex-col justify-between rounded-ui-lg border border-ui-border bg-ui-surface p-4 text-left shadow-ui-sm transition-all duration-150 hover:border-ui-border-strong hover:bg-ui-surface-subtle/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus active:scale-[0.99]"
        >
          <div className="flex items-center justify-between text-xs font-medium text-ui-muted">
            <span className="font-semibold uppercase tracking-wider text-[11px]">{t("Projects")}</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-ui-md bg-ui-surface-subtle border border-ui-border/70 text-ui-muted group-hover:text-ui-foreground group-hover:border-ui-border transition-colors">
              <FiFolder className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold tracking-tight text-ui-foreground">{projects.length}</div>
          <div className="mt-1 text-[11px] text-ui-muted">{t("Total active projects")}</div>
        </button>

        <button
          type="button"
          onClick={() => navigate(isInProject ? "/collections" : "/projects")}
          className="group flex flex-col justify-between rounded-ui-lg border border-ui-border bg-ui-surface p-4 text-left shadow-ui-sm transition-all duration-150 hover:border-ui-border-strong hover:bg-ui-surface-subtle/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus active:scale-[0.99]"
        >
          <div className="flex items-center justify-between text-xs font-medium text-ui-muted">
            <span className="font-semibold uppercase tracking-wider text-[11px]">{t("Collections")}</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-ui-md bg-ui-surface-subtle border border-ui-border/70 text-ui-muted group-hover:text-ui-foreground group-hover:border-ui-border transition-colors">
              <FiDatabase className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold tracking-tight text-ui-foreground">
            {isInProject ? containers.length : "—"}
          </div>
          <div className="mt-1 text-[11px] text-ui-muted">
            {isInProject ? t("In current project") : t("Select a project")}
          </div>
        </button>

        <button
          type="button"
          onClick={() => navigate(isInProject ? "/pages" : "/projects")}
          className="group flex flex-col justify-between rounded-ui-lg border border-ui-border bg-ui-surface p-4 text-left shadow-ui-sm transition-all duration-150 hover:border-ui-border-strong hover:bg-ui-surface-subtle/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus active:scale-[0.99]"
        >
          <div className="flex items-center justify-between text-xs font-medium text-ui-muted">
            <span className="font-semibold uppercase tracking-wider text-[11px]">{t("Pages")}</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-ui-md bg-ui-surface-subtle border border-ui-border/70 text-ui-muted group-hover:text-ui-foreground group-hover:border-ui-border transition-colors">
              <FiFileText className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold tracking-tight text-ui-foreground">
            {isInProject ? pages.length : "—"}
          </div>
          <div className="mt-1 text-[11px] text-ui-muted">
            {isInProject ? t("In current project") : t("Select a project")}
          </div>
        </button>

        <button
          type="button"
          onClick={() => navigate(isInProject ? "/integrations" : "/projects")}
          className="group flex flex-col justify-between rounded-ui-lg border border-ui-border bg-ui-surface p-4 text-left shadow-ui-sm transition-all duration-150 hover:border-ui-border-strong hover:bg-ui-surface-subtle/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus active:scale-[0.99]"
        >
          <div className="flex items-center justify-between text-xs font-medium text-ui-muted">
            <span className="font-semibold uppercase tracking-wider text-[11px]">{t("Integrations")}</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-ui-md bg-ui-surface-subtle border border-ui-border/70 text-ui-muted group-hover:text-ui-foreground group-hover:border-ui-border transition-colors">
              <FiKey className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold tracking-tight text-ui-foreground">
            {isInProject ? integrations.length : "—"}
          </div>
          <div className="mt-1 text-[11px] text-ui-muted">
            {isInProject ? t("Active credentials") : t("Select a project")}
          </div>
        </button>
      </div>

      {/* 2. Recent Activity Section */}
      <Section aria-labelledby="recent-activity-heading">
        <SectionHeader
          title={<span id="recent-activity-heading">{t("Recent Activity")}</span>}
          description={t("Status, updates, and active workspaces in your tenant.")}
        />
        <div className="divide-y divide-ui-border rounded-ui-lg border border-ui-border bg-ui-surface shadow-ui-sm overflow-hidden">
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
        </div>
      </Section>

      {/* 3. Actionable Quick Actions */}
      <Section aria-labelledby="quick-actions-heading">
        <SectionHeader
          title={<span id="quick-actions-heading">{t("Quick Actions")}</span>}
          description={t("Direct shortcuts to common management areas and toolsets.")}
        />
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                type="button"
                onClick={() => navigate(action.path)}
                className="group flex flex-col justify-between rounded-ui-lg border border-ui-border bg-ui-surface p-3.5 text-left shadow-ui-sm transition-all duration-150 hover:border-ui-border-strong hover:bg-ui-surface-subtle/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus active:scale-[0.99]"
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
          <div className="rounded-ui-lg border border-ui-border bg-ui-surface p-4 shadow-ui-sm">
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
                  {user?.role || t("Member")}
                </dd>
                {user?.roles && user.roles.length > 1 && (
                  <dd className="mt-0.5 text-xs text-ui-muted">
                    {user.roles.join(", ")}
                  </dd>
                )}
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-ui-muted">
                  {t("Account Status")}
                </dt>
                <dd className="mt-1 flex items-center gap-2">
                  <Badge variant="success">{t("Active")}</Badge>
                  <span className="text-xs text-ui-muted">{t("Full Access")}</span>
                </dd>
              </div>
            </dl>
          </div>
        ) : (
          <EmptyState
            title={t("Tenant context is unavailable")}
            description={t("Sign in again or contact an administrator to restore tenant access.")}
          />
        )}
      </Section>
    </PageShell>
  );
};

export default Dashboard;
