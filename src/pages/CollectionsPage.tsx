import React from "react";
import { getRoleLabel } from "../utils/roleLabels";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { ContainersSection } from "../components/panelComponents/common/ContainersSection";
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
    <PageShell width="wide">
      <PageHeader
        title={currentProject.name}
        description={t("Manage project schemas and their records")}
        context={
          <>
            <Badge variant="mono">{currentProject.slug}</Badge>
            <Badge variant={currentProject.isActive ? "success" : "danger"}>
              {currentProject.isActive ? t("Active") : t("Inactive")}
            </Badge>
            {projectRoles.length > 0 && (
              <span className="text-xs text-ui-muted">
                {t("Role")}:{" "}
                <span className="font-medium text-ui-foreground">
                  {projectRoles.map((role) => t(getRoleLabel(role))).join(", ")}
                </span>
              </span>
            )}
          </>
        }
      />

      <ContainersSection />
    </PageShell>
  );
};

export default CollectionsPage;
