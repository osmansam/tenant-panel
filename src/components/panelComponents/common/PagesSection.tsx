import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiInfo, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/User.context";
import {
  PageModel,
  useGetTenantPages,
  useUpdatePage,
} from "../../../utils/api/page";
import { getIconByName } from "../../../utils/menuIcons";
import { PageDesigner } from "../../PageDesigner/PageDesigner";
import { GenericButton } from "../FormElements/GenericButton";
import { CreatePageModal } from "../Modals/CreatePageModal";
import { H2 } from "../Typography";

export const PagesSection: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageModel | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<PageModel | null>(null);
  const [showDesigner, setShowDesigner] = useState(false);
  const { updatePage } = useUpdatePage();

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

  const handleEditPage = (page: PageModel) => {
    setEditingPage(page);
    setShowDesigner(true);
  };

  const handleSavePageStructure = async (gridSections: any[]) => {
    if (!editingPage) return;

    try {
      // Use flat structure (backward compatible with Go model)
      const sections = gridSections;

      updatePage({
        id: editingPage._id || editingPage.id!,
        payload: {
          name: editingPage.name,
          icon: editingPage.icon,
          slug: editingPage.slug,
          parentPageId: editingPage.parentPageId,
          order: editingPage.order,
          isGroupOnly: editingPage.isGroupOnly,
          isAuthenticated: editingPage.isAuthenticated,
          isAuthorized: editingPage.isAuthorized,
          authorizeRole: editingPage.authorizeRole,
          sections: sections,
        },
      });
      setShowDesigner(false);
      setEditingPage(null);
    } catch (error) {
      console.error("Failed to save page structure:", error);
    }
  };

  const handleCancelDesigner = () => {
    setShowDesigner(false);
    setEditingPage(null);
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
                    onClick={() => handleEditPage(page)}
                  >
                    {t("Edit")}
                  </GenericButton>
                  <GenericButton
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Navigate to page preview in the same tab
                      navigate(`/page-preview/${page.id}`);
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

      {/* Page Designer Modal */}
      {showDesigner && editingPage && (
        <div className="fixed inset-0 bg-white z-50 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Designer Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {t("Design Page")}: {editingPage.name}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {editingPage.slug && `/${editingPage.slug}`}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <GenericButton variant="outline" onClick={handleCancelDesigner}>
                  {t("Cancel")}
                </GenericButton>

                <GenericButton
                  onClick={() =>
                    handleSavePageStructure(editingPage.sections || [])
                  }
                >
                  {t("Save Page")}
                </GenericButton>
              </div>
            </div>

            {/* Page Designer */}
            <div className="flex-1 overflow-hidden">
              <PageDesigner
                sections={
                  editingPage.sections
                    ?.map((s) => {
                      // Handle nested structure (type: "grid", grid: {...})
                      if (s.type === "grid" && s.grid) {
                        return s.grid;
                      }
                      // Handle flat structure (columns, cells directly on section)
                      if (s.columns && s.cells) {
                        return {
                          columns: s.columns,
                          gap: s.gap,
                          cells: s.cells,
                        };
                      }
                      return null;
                    })
                    .filter((g) => g !== null) || []
                }
                onChange={(gridSections) => {
                  // Use flat structure for compatibility
                  const sections = gridSections.map((gridSection) => ({
                    ...gridSection,
                  }));
                  setEditingPage({
                    ...editingPage,
                    sections,
                  });
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Page Details Modal */}
      {isDetailsModalOpen && selectedPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {selectedPage.icon && (
                  <div className="text-2xl text-gray-700">
                    {React.createElement(getIconByName(selectedPage.icon))}
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedPage.name}
                  </h2>
                  {selectedPage.slug && (
                    <p className="text-sm text-gray-500 font-mono mt-1">
                      /{selectedPage.slug}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={handleCloseDetailsModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Page Info Section */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                  {t("Page Information")}
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs font-medium text-gray-500">
                        {t("ID")}
                      </span>
                      <p className="text-sm font-mono text-gray-900 mt-1">
                        {selectedPage.id || selectedPage._id}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500">
                        {t("Name")}
                      </span>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedPage.name}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500">
                        {t("Icon")}
                      </span>
                      <p className="text-sm font-mono text-gray-900 mt-1">
                        {selectedPage.icon || "-"}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500">
                        {t("Slug")}
                      </span>
                      <p className="text-sm font-mono text-gray-900 mt-1">
                        {selectedPage.slug || "-"}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500">
                        {t("Order")}
                      </span>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedPage.order ?? "-"}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500">
                        {t("Type")}
                      </span>
                      <p className="text-sm mt-1">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPageTypeColor(
                            selectedPage
                          )}`}
                        >
                          {getPageTypeLabel(selectedPage)}
                        </span>
                      </p>
                    </div>
                  </div>

                  {selectedPage.authorizeRole &&
                    selectedPage.authorizeRole.length > 0 && (
                      <div>
                        <span className="text-xs font-medium text-gray-500">
                          {t("Authorized Roles")}
                        </span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedPage.authorizeRole.map((role, idx) => (
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

              {/* Page Structure (JSON) */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                  {t("Page Structure (JSON)")}
                </h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-xs text-green-400 font-mono">
                    {JSON.stringify(selectedPage, null, 2)}
                  </pre>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
              <GenericButton
                variant="outline"
                onClick={handleCloseDetailsModal}
              >
                {t("Close")}
              </GenericButton>
              <GenericButton
                onClick={() => {
                  handleCloseDetailsModal();
                  handleEditPage(selectedPage);
                }}
              >
                {t("Edit Page")}
              </GenericButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
