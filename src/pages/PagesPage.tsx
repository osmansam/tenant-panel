import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { AuditLogsAuthorizationSection } from "../components/panelComponents/common/AuditLogsAuthorizationSection";
import { PagesSection } from "../components/panelComponents/common/PagesSection";
import { Badge, PageShell, Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui";
import { useUserContext } from "../context/User.context";
import { useCurrentProject } from "../hooks/useCurrentProject";

const PagesPage: React.FC = () => {
  const { t } = useTranslation();
  const { currentProject, isInProject } = useCurrentProject();
  const { user } = useUserContext();
  const [activeTab, setActiveTab] = useState("pages");

  // If not in project context, redirect to projects page
  if (!isInProject || !currentProject) {
    return <Navigate to="/projects" replace />;
  }

  const projectRoles = user?.roles || [];

  return (
    <PageShell>
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-ui-border/70 pb-2.5 mb-3">
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          <h1 className="text-sm font-semibold tracking-tight text-ui-foreground truncate">
            {currentProject.name}
          </h1>
          <Badge variant="mono" className="text-[11px] py-0 px-1.5">
            {currentProject.slug}
          </Badge>
          <Badge
            variant={currentProject.isActive ? "success" : "danger"}
            className="text-[11px] py-0 px-1.5"
          >
            {currentProject.isActive ? t("Active") : t("Inactive")}
          </Badge>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-ui-muted shrink-0">
          <span className="text-ui-muted">{t("Role")}:</span>
          <span className="font-medium text-ui-foreground">
            {projectRoles.map((role) => t(role)).join(", ")}
          </span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList aria-label="Pages sections">
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="audit-logs">Audit Logs</TabsTrigger>
        </TabsList>
        <TabsContent value="pages" className="py-3">
          <PagesSection />
        </TabsContent>
        <TabsContent value="audit-logs" className="py-3">
          <AuditLogsAuthorizationSection />
        </TabsContent>
      </Tabs>
    </PageShell>
  );
};

export default PagesPage;
