import React from "react";
import { useTranslation } from "react-i18next";
import { FiMenu } from "react-icons/fi";
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
import useTenant from "../hooks/useTenant";
import { useTenantLogout } from "../utils/api/auth";

const quickActions = ["View Analytics", "Manage Users", "Settings", "View Logs"];

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const { setIsSidebarOpen } = useGeneralContext();
  const { currentTenant, allTenants, hasMultipleTenants, switchTenant } = useTenant();
  const { tenantLogout } = useTenantLogout();

  const displayName = user?.name || user?.email;

  return (
    <PageShell width="content">
      <PageHeader
        title={currentTenant?.name || t("Dashboard")}
        description={
          currentTenant
            ? `${t("Welcome")}${displayName ? `, ${displayName}` : ""}`
            : t("Tenant context is unavailable")
        }
        context={currentTenant?.slug ? <Badge variant="info">{currentTenant.slug}</Badge> : undefined}
        actions={
          <PageActions aria-label={t("Dashboard actions")}>
            <button
              type="button"
              aria-label={t("Open navigation")}
              onClick={() => setIsSidebarOpen(true)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-ui-md text-ui-muted transition-colors hover:bg-ui-subtle hover:text-ui-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus md:hidden"
            >
              <FiMenu className="h-4 w-4" aria-hidden="true" />
            </button>
            <GenericButton onClick={() => tenantLogout()} variant="outline" size="sm">
              {t("Logout")}
            </GenericButton>
          </PageActions>
        }
      />

      <Section aria-labelledby="account-overview-heading">
        <SectionHeader
          title={<span id="account-overview-heading">{t("Account overview")}</span>}
          description={t("Your current tenant membership and access details.")}
        />
        {currentTenant ? (
          <dl className="grid gap-x-8 gap-y-4 border-y border-ui-border py-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-ui-muted">
                {t("Current Tenant")}
              </dt>
              <dd className="mt-1 break-words text-sm font-medium text-ui-foreground">
                {currentTenant.name}
              </dd>
              <dd className="mt-0.5 break-all text-xs text-ui-muted">{currentTenant.slug}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-ui-muted">
                {t("Your Role")}
              </dt>
              <dd className="mt-1 text-sm font-medium text-ui-foreground">
                {user?.role || t("Member")}
              </dd>
              {user?.roles && user.roles.length > 1 && (
                <dd className="mt-0.5 text-xs text-ui-muted">
                  +{user.roles.length - 1} {t("more roles")}
                </dd>
              )}
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-ui-muted">
                {t("Account Status")}
              </dt>
              <dd className="mt-1">
                <Badge variant="success">{t("Active")}</Badge>
              </dd>
              <dd className="mt-1 text-xs text-ui-muted">{t("Full Access")}</dd>
            </div>
          </dl>
        ) : (
          <EmptyState
            title={t("Tenant context is unavailable")}
            description={t("Sign in again or contact an administrator to restore tenant access.")}
          />
        )}
      </Section>

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
                  className="flex min-w-0 items-center justify-between gap-3 rounded-ui-md border border-ui-border bg-ui-surface px-4 py-3 text-left transition-colors hover:border-ui-border-strong hover:bg-ui-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus disabled:cursor-default disabled:border-ui-border-strong disabled:bg-ui-subtle disabled:opacity-100"
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

      <Section aria-labelledby="quick-actions-heading">
        <SectionHeader
          title={<span id="quick-actions-heading">{t("Quick Actions")}</span>}
          description={t("Common administration areas available from the main navigation.")}
        />
        <ul className="grid gap-x-8 gap-y-3 border-y border-ui-border py-4 sm:grid-cols-2">
          {quickActions.map((label) => (
            <li key={label} className="flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-ui-foreground">{t(label)}</span>
              <span className="text-xs text-ui-muted">{t("Navigation")}</span>
            </li>
          ))}
        </ul>
      </Section>
    </PageShell>
  );
};

export default Dashboard;
