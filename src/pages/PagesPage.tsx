import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { PagesSection } from "../components/panelComponents/common/PagesSection";
import { Badge, PageHeader, PageShell } from "../components/ui";
import { useUserContext } from "../context/User.context";
import { useCurrentProject } from "../hooks/useCurrentProject";

const PagesPage: React.FC = () => {
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
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ui-border pb-3 mb-4">
        <div className="flex flex-wrap items-center gap-2.5 min-w-0">
          <h1 className="text-lg font-semibold tracking-tight text-ui-foreground truncate">
            {currentProject.name}
          </h1>
          <Badge variant="info" className="text-[11px] py-0 px-1.5">
            {currentProject.slug}
          </Badge>
          <Badge
            variant={currentProject.isActive ? "success" : "danger"}
            className="text-[11px] py-0 px-1.5"
          >
            {currentProject.isActive ? t("Active") : t("Inactive")}
          </Badge>
          <span className="hidden text-xs text-ui-muted sm:inline">•</span>
          <span className="text-xs text-ui-muted truncate">
            {t("Page Builder & Navigation")}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-ui-muted shrink-0">
          <span className="text-ui-muted">{t("Role")}:</span>
          <span className="font-medium text-ui-foreground">
            {projectRoles.map((role) => t(role)).join(", ")}
          </span>
        </div>
      </div>

      <PagesSection />
    </PageShell>
  );
};

export default PagesPage;
