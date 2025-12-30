import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiInfo, FiPlus } from "react-icons/fi";
import { useUserContext } from "../../../context/User.context";
import { PageModel, useGetTenantPages } from "../../../utils/api/page";
import { getIconByName } from "../../../utils/menuIcons";
import { GenericButton } from "../FormElements/GenericButton";
import { CreatePageModal } from "../Modals/CreatePageModal";
import { H2 } from "../Typography";

export const PagesSection: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageModel | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Get pages for the current project with error handling
  let pages: any[] = [];
  let isLoading = false;
  let error = null;

  try {
    const pageData = useGetTenantPages();
    pages = pageData || [];
    console.log("Pages loaded:", pages);
  } catch (err) {
    console.log("Pages not available:", err);
    error = err;
  }

  // Check if user can create pages (project admin, developer, or editor)
  const userRoles = user?.roles || [];
  const canCreatePages = userRoles.some((role) =>
    ["project_admin", "project_developer", "project_editor"].includes(role)
  );

  const handleViewPage = (page: PageModel) => {
    setSelectedPage(page);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedPage(null);
  };

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

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="text-2xl mr-3">📄</div>
          <H2 className="text-lg font-semibold text-gray-900">{t("Pages")}</H2>
        </div>
        {canCreatePages && (
          <GenericButton
            size="sm"
            onClick={() => setIsCreateModalOpen(true)}
            iconLeft={<FiPlus size={16} />}
          >
            {t("Create Page")}
          </GenericButton>
        )}
      </div>

      {/* Page List */}
      <div className="space-y-3">
        {error ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-6xl mb-4">⚠️</div>
            <p className="text-gray-500 mb-4">
              {t(
                "Unable to load pages. Make sure you're in a project context."
              )}
            </p>
          </div>
        ) : pages && pages.length > 0 ? (
          pages.map((page) => {
            const IconComponent = page.icon ? getIconByName(page.icon) : null;

            return (
              <div
                key={page.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleViewPage(page)}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    {IconComponent && (
                      <div className="text-lg text-gray-700">
                        <IconComponent />
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {page.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        {page.slug && (
                          <p className="text-xs text-gray-400 font-mono">
                            /{page.slug}
                          </p>
                        )}
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPageTypeColor(
                            page
                          )}`}
                        >
                          {getPageTypeLabel(page)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {(page.sections || []).length} {t("sections")} •
                        {page.authorizeRole && page.authorizeRole.length > 0
                          ? ` ${page.authorizeRole.join(", ")}`
                          : ` ${t("No role restrictions")}`}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="flex items-center space-x-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <GenericButton
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewPage(page)}
                    iconLeft={<FiInfo size={12} />}
                  >
                    {t("Details")}
                  </GenericButton>
                  <GenericButton
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // TODO: Navigate to page builder/editor
                      console.log("Edit page:", page.id);
                    }}
                  >
                    {t("Edit")}
                  </GenericButton>
                  <GenericButton
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // TODO: Navigate to page preview
                      console.log("Preview page:", page.id);
                    }}
                  >
                    {t("Preview")}
                  </GenericButton>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 text-6xl mb-4">📄</div>
            <p className="text-gray-500 mb-4">
              {t("No pages found in this project")}
            </p>
            {canCreatePages && (
              <GenericButton
                onClick={() => setIsCreateModalOpen(true)}
                iconLeft={<FiPlus size={16} />}
              >
                {t("Create Your First Page")}
              </GenericButton>
            )}
          </div>
        )}
      </div>

      {/* Page Statistics */}
      {pages && pages.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {pages.length}
              </div>
              <div className="text-xs text-gray-500">{t("Total Pages")}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {
                  pages.filter((p) => !p.isAuthenticated && !p.isAuthorized)
                    .length
                }
              </div>
              <div className="text-xs text-gray-500">{t("Public Pages")}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {pages.filter((p) => p.isAuthenticated).length}
              </div>
              <div className="text-xs text-gray-500">{t("Auth Pages")}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {pages.reduce(
                  (total, p) => total + (p.sections?.length || 0),
                  0
                )}
              </div>
              <div className="text-xs text-gray-500">{t("Total Sections")}</div>
            </div>
          </div>
        </div>
      )}

      {/* Create Page Modal */}
      <CreatePageModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* TODO: Add Page Details Modal */}
    </div>
  );
};
