import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCode, FiCopy, FiEdit, FiList, FiShield } from "react-icons/fi";
import type { PageModel } from "../../../utils/api/page";
import { getIconByName } from "../../../utils/menuIcons";
import { GenericButton } from "../FormElements/GenericButton";
import { Tabs, TabsContent, TabsList, TabsTrigger, WorkspaceDialog } from "../../ui";
import PagePermissions from "../../PagePermissions";

interface PageDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  page: PageModel | null;
  onEdit?: (page: PageModel) => void;
}

export const PageDetailsModal: React.FC<PageDetailsModalProps> = ({ isOpen, onClose, page, onEdit }) => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState("structured");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const pageId = page?._id || page?.id;
  useEffect(() => { if (isOpen) { setViewMode("structured"); setCopyState("idle"); } }, [isOpen, pageId]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(page, null, 2));
      setCopyState("copied");
    } catch { setCopyState("failed"); }
  };
  const getPageTypeColor = (page: PageModel) => {
    if (page.isGroupOnly) return "bg-ui-surface-subtle text-ui-muted";
    if (page.isAuthorized) return "bg-ui-danger-subtle text-ui-danger";
    if (page.isAuthenticated) return "bg-ui-warning-subtle text-ui-warning";
    return "bg-ui-success-subtle text-ui-success";
  };
  const getPageTypeLabel = (page: PageModel) => {
    if (page.isGroupOnly) return t("Group");
    if (page.isAuthorized) return t("Authorized");
    if (page.isAuthenticated) return t("Authenticated");
    return t("Public");
  };
  if (!isOpen || !page) return null;
  const PageIcon = page.icon ? getIconByName(page.icon) : null;

  return (
    <WorkspaceDialog open={isOpen} onClose={onClose}
      title={<span className="flex min-w-0 items-center gap-2">{PageIcon && <PageIcon aria-hidden="true" className="shrink-0 text-ui-muted" />}<span className="break-words">{page.name}</span></span>}
      description={page.slug ? <span className="break-all font-mono text-xs">/{page.slug}</span> : t("Page details")}
      className="max-w-6xl" bodyClassName="p-0 sm:p-0"
      footer={<div className="flex justify-end gap-2.5"><GenericButton variant="outline" onClick={onClose}>{t("Close")}</GenericButton>{onEdit && <GenericButton iconLeft={<FiEdit />} onClick={() => { onClose(); onEdit(page); }}>{t("Edit Page")}</GenericButton>}</div>}
    >
      <Tabs value={viewMode} onValueChange={setViewMode}>
        <TabsList aria-label={t("Page details views")} className="sticky top-0 z-10 bg-ui-surface px-4 pt-2 sm:px-6">
          <TabsTrigger value="structured"><FiList aria-hidden="true" className="mr-1.5 inline" />{t("Structured")}</TabsTrigger>
          <TabsTrigger value="permissions"><FiShield aria-hidden="true" className="mr-1.5 inline" />{t("Permissions")}</TabsTrigger>
          <TabsTrigger value="json"><FiCode aria-hidden="true" className="mr-1.5 inline" />{t("JSON")}</TabsTrigger>
        </TabsList>
        <TabsContent value="structured" className="py-0">
            <div className="space-y-6 p-6">
              {/* Basic Information */}
              <div className="bg-ui-surface-subtle rounded-lg p-4">
                <h4 className="text-sm font-medium text-ui-foreground mb-3">
                  {t("Page Information")}
                </h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
                  <div>
                    <span className="text-ui-muted">{t("Page Name")}:</span>
                    <span className="ml-2 font-medium">{page.name}</span>
                  </div>
                  <div>
                    <span className="text-ui-muted">{t("ID")}:</span>
                    <span className="ml-2 break-all font-mono text-xs">
                      {page.id || page._id}
                    </span>
                  </div>
                  <div>
                    <span className="text-ui-muted">{t("Slug")}:</span>
                    <span className="ml-2 break-all font-mono text-xs">
                      {page.slug || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-ui-muted">{t("Icon")}:</span>
                    <span className="ml-2 break-all font-mono text-xs">
                      {page.icon || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-ui-muted">{t("Order")}:</span>
                    <span className="ml-2 font-medium">
                      {page.order ?? "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-ui-muted">{t("Type")}:</span>
                    <span
                      className={`ml-2 inline-flex px-2 py-0.5 text-xs font-medium rounded ${getPageTypeColor(
                        page
                      )}`}
                    >
                      {getPageTypeLabel(page)}
                    </span>
                  </div>
                  <div>
                    <span className="text-ui-muted">
                      {t("Show in Sidebar")}:
                    </span>
                    <span
                      className={`ml-2 font-medium ${
                        page.isOnSidebar !== false
                          ? "text-ui-success"
                          : "text-ui-danger"
                      }`}
                    >
                      {page.isOnSidebar !== false ? t("Yes") : t("No")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-ui-surface-subtle rounded-lg p-4">
                <h4 className="text-sm font-medium text-ui-foreground mb-3">
                  {t("Security Settings")}
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-ui-muted">
                      {t("Is Authenticated")}:
                    </span>
                    <span
                      className={`font-medium ${
                        page.isAuthenticated ? "text-ui-success" : "text-ui-danger"
                      }`}
                    >
                      {page.isAuthenticated ? t("Yes") : t("No")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ui-muted">{t("Is Authorized")}:</span>
                    <span
                      className={`font-medium ${
                        page.isAuthorized ? "text-ui-success" : "text-ui-danger"
                      }`}
                    >
                      {page.isAuthorized ? t("Yes") : t("No")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ui-muted">{t("Is Group Only")}:</span>
                    <span
                      className={`font-medium ${
                        page.isGroupOnly ? "text-ui-success" : "text-ui-danger"
                      }`}
                    >
                      {page.isGroupOnly ? t("Yes") : t("No")}
                    </span>
                  </div>
                  {page.authorizeRole && page.authorizeRole.length > 0 && (
                    <div>
                      <span className="text-ui-muted block mb-2">
                        {t("Authorized Roles")}:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {page.authorizeRole.map((role, idx) => (
                          <span
                            key={idx}
                            className="inline-flex px-2 py-1 text-xs font-medium rounded bg-ui-active-subtle text-ui-foreground"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sections Information */}
              <div className="bg-ui-surface-subtle rounded-lg p-4">
                <h4 className="text-sm font-medium text-ui-foreground mb-3">
                  {t("Page Structure")}
                </h4>
                <div className="text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-ui-muted">
                      {t("Total Sections")}:
                    </span>
                    <span className="font-medium">
                      {page.sections?.length || 0}
                    </span>
                  </div>
                  {page.sections && page.sections.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {page.sections.map((section, idx) => (
                        <div
                          key={idx}
                          className="bg-white rounded p-2 border border-ui-border"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-ui-foreground">
                              {t("Section")} {idx + 1}
                            </span>
                            <span className="text-xs text-ui-muted">
                              {section.type || "grid"}
                            </span>
                          </div>
                          {(section.cells || section.grid?.cells) && (
                            <div className="text-xs text-ui-muted mt-1">
                              {section.cells?.length ||
                                section.grid?.cells?.length ||
                                0}{" "}
                              {t("cells")}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

        </TabsContent>
        <TabsContent value="permissions" className="p-4 sm:p-6"><PagePermissions pageId={pageId} readOnly={!onEdit} /></TabsContent>
        <TabsContent value="json" className="space-y-3 p-4 sm:p-6">
          <div className="flex items-center justify-between gap-3"><p role="status" className="text-xs text-ui-muted">{copyState === "copied" ? t("JSON copied to clipboard") : t("Complete page configuration")}</p><GenericButton variant="outline" size="sm" iconLeft={<FiCopy />} onClick={() => { void copyToClipboard(); }}>{t("Copy JSON")}</GenericButton></div>
          {copyState === "failed" && <p role="alert" className="rounded-ui-md bg-ui-danger-subtle p-3 text-sm text-ui-danger">{t("JSON could not be copied. Select the text below and copy it manually.")}</p>}
          <pre tabIndex={0} aria-label={t("Page JSON")} className="ui-focus-ring overflow-x-auto rounded-ui-md border border-ui-border bg-ui-surface-subtle p-4 font-mono text-xs leading-5 text-ui-foreground">{JSON.stringify(page, null, 2)}</pre>
        </TabsContent>
      </Tabs>
    </WorkspaceDialog>
  );
};
