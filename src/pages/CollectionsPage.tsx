import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { ContainersSection } from "../components/panelComponents/common/ContainersSection";
import { AuditLogsAuthorizationSection } from "../components/panelComponents/common/AuditLogsAuthorizationSection";
import { Badge, PageHeader, PageShell } from "../components/ui";
import { useUserContext } from "../context/User.context";
import { useCurrentProject } from "../hooks/useCurrentProject";

const CollectionsPage: React.FC = () => {
  const { t } = useTranslation();
  const { currentProject, isInProject } = useCurrentProject();
  const { user } = useUserContext();

  // If not in project context, redirect to projects page
  if (!isInProject || !currentProject) {
    return <Navigate to="/projects" replace />;
  }

  const projectRoles = user?.roles || [];

  return (
    <PageShell>
      <PageHeader
        className="mb-3 gap-2.5 pb-2.5 sm:items-center"
        title={
          <span className="block truncate text-sm font-semibold tracking-tight">
            {currentProject.name}
          </span>
        }
        context={
          <>
            <Badge variant="mono" className="px-1.5 py-0 text-[11px]">
              {currentProject.slug}
            </Badge>
            <Badge
              variant={currentProject.isActive ? "success" : "danger"}
              className="px-1.5 py-0 text-[11px]"
            >
              {currentProject.isActive ? t("Active") : t("Inactive")}
            </Badge>
          </>
        }
        actions={
          <div className="flex shrink-0 items-center gap-1.5 text-xs text-ui-muted">
            <span>{t("Role")}:</span>
            <span className="font-medium text-ui-foreground">
              {projectRoles.map((role) => t(role)).join(", ")}
            </span>
          </div>
        }
      />

      {/* Content Sections */}
      <div className="divide-y divide-ui-border">
        {/* Containers/Collections Management */}
        <ContainersSection />

        {/* Audit Logs Authorization */}
        <AuditLogsAuthorizationSection />
      </div>
    </PageShell>
  );
};

export default CollectionsPage;
