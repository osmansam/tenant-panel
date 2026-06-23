import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCode, FiCopy, FiEdit, FiList, FiShield, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { PageModel } from "../../../utils/api/page";
import { getIconByName } from "../../../utils/menuIcons";
import PagePermissions from "../../PagePermissions";

interface PageDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  page: PageModel | null;
  onEdit?: (page: PageModel) => void;
}

export const PageDetailsModal: React.FC<PageDetailsModalProps> = ({
  isOpen,
  onClose,
  page,
  onEdit,
}) => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<
    "structured" | "json" | "permissions"
  >("structured");

  const copyToClipboard = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text);
      toast.success(t("Copied to clipboard"));
    },
    [t]
  );

  const getPageTypeColor = (page: PageModel) => {
    if (page.isGroupOnly) return "bg-gray-100 text-gray-800";
    if (page.isAuthorized) return "bg-red-100 text-red-800";
    if (page.isAuthenticated) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scale-in">
        {/* Header */}
        <div className="border-b border-neutral-100">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              {PageIcon && (
                <div className="flex items-center justify-center w-10 h-10 bg-neutral-100 rounded-lg text-neutral-700">
                  <PageIcon size={20} />
                </div>
              )}
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">
                  {page.name}
                </h2>
                {page.slug && (
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">
                    /{page.slug}
                  </p>
                )}
              </div>
            </div>

            {/* View Mode Tabs */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-neutral-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("structured")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    viewMode === "structured"
                      ? "bg-white text-neutral-900 shadow-sm"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  <FiList size={12} />
                  <span>{t("Structured")}</span>
                </button>
                <button
                  onClick={() => setViewMode("permissions")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    viewMode === "permissions"
                      ? "bg-white text-neutral-900 shadow-sm"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  <FiShield size={12} />
                  <span>{t("Permissions")}</span>
                </button>
                <button
                  onClick={() => setViewMode("json")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    viewMode === "json"
                      ? "bg-white text-neutral-900 shadow-sm"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  <FiCode size={12} />
                  <span>{t("JSON")}</span>
                </button>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="h-[70vh] overflow-y-auto">
          {viewMode === "permissions" ? (
            <PagePermissions />
          ) : viewMode === "structured" ? (
            <div className="space-y-6 p-6">
              {/* Basic Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  {t("Page Information")}
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">{t("Page Name")}:</span>
                    <span className="ml-2 font-medium">{page.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">{t("ID")}:</span>
                    <span className="ml-2 font-mono text-xs">
                      {page.id || page._id}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">{t("Slug")}:</span>
                    <span className="ml-2 font-mono text-xs">
                      {page.slug || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">{t("Icon")}:</span>
                    <span className="ml-2 font-mono text-xs">
                      {page.icon || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">{t("Order")}:</span>
                    <span className="ml-2 font-medium">
                      {page.order ?? "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">{t("Type")}:</span>
                    <span
                      className={`ml-2 inline-flex px-2 py-0.5 text-xs font-medium rounded ${getPageTypeColor(
                        page
                      )}`}
                    >
                      {getPageTypeLabel(page)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">
                      {t("Show in Sidebar")}:
                    </span>
                    <span
                      className={`ml-2 font-medium ${
                        page.isOnSidebar !== false
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {page.isOnSidebar !== false ? t("Yes") : t("No")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  {t("Security Settings")}
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">
                      {t("Is Authenticated")}:
                    </span>
                    <span
                      className={`font-medium ${
                        page.isAuthenticated ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {page.isAuthenticated ? t("Yes") : t("No")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">{t("Is Authorized")}:</span>
                    <span
                      className={`font-medium ${
                        page.isAuthorized ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {page.isAuthorized ? t("Yes") : t("No")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">{t("Is Group Only")}:</span>
                    <span
                      className={`font-medium ${
                        page.isGroupOnly ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {page.isGroupOnly ? t("Yes") : t("No")}
                    </span>
                  </div>
                  {page.authorizeRole && page.authorizeRole.length > 0 && (
                    <div>
                      <span className="text-gray-500 block mb-2">
                        {t("Authorized Roles")}:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {page.authorizeRole.map((role, idx) => (
                          <span
                            key={idx}
                            className="inline-flex px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800"
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
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  {t("Page Structure")}
                </h4>
                <div className="text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">
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
                          className="bg-white rounded p-2 border border-gray-200"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-700">
                              {t("Section")} {idx + 1}
                            </span>
                            <span className="text-xs text-gray-500">
                              {section.type || "grid"}
                            </span>
                          </div>
                          {(section.cells || section.grid?.cells) && (
                            <div className="text-xs text-gray-500 mt-1">
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
          ) : (
            <div className="p-6">
              <div className="relative">
                <div className="absolute top-2 right-2 z-10">
                  <button
                    onClick={() =>
                      copyToClipboard(JSON.stringify(page, null, 2))
                    }
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded-lg transition-colors"
                  >
                    <FiCopy size={12} />
                    {t("Copy")}
                  </button>
                </div>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap font-mono">
                  {JSON.stringify(page, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-100 px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            {t("Close")}
          </button>
          {onEdit && (
            <button
              onClick={() => {
                onEdit(page);
                onClose();
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <FiEdit size={14} />
              {t("Edit Page")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
