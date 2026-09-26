import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { ContainersSection } from "../components/panelComponents/common/ContainersSection";
import { PagesSection } from "../components/panelComponents/common/PagesSection";
import { AuditLogsAuthorizationSection } from "../components/panelComponents/common/AuditLogsAuthorizationSection";
import { Badge, PageHeader, PageShell } from "../components/ui";
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

  return (
    <PageShell>
      <PageHeader
        title={currentProject.name}
        description={t("Project Management & Configuration")}
        context={
          <>
            <Badge variant="info">{currentProject.slug}</Badge>
            <Badge variant={currentProject.isActive ? "success" : "danger"}>
              {currentProject.isActive ? t("Active") : t("Inactive")}
            </Badge>
          </>
        }
        actions={
          <div className="text-left sm:text-right">
            <div className="text-xs font-medium uppercase tracking-wide text-ui-muted">
              {t("Your Role")}
            </div>
            <div className="mt-1 text-sm font-medium text-ui-foreground">
              {projectRoles.map((role) => t(role)).join(", ")}
            </div>
          </div>
        }
      />

      {/* Content Sections */}
      <div className="divide-y divide-ui-border">
        {/* Containers Management */}
        <ContainersSection />

        {/* Pages Management */}
        <PagesSection />

        {/* Audit Logs Authorization */}
        <AuditLogsAuthorizationSection />
      </div>
    </PageShell>
  );
};

export default ProjectManagementPage;
