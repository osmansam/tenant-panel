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
import { PageDetailsModal } from "../Modals/PageDetailsModal";
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
  let pages: PageModel[] = [];
  let isLoading = false;
  let error = null;

  try {
    const pageData = useGetTenantPages();
    pages = pageData || [];
  } catch (err) {
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

  const getPageId = (page: PageModel) => page._id || page.id || "";

  const getPageById = (pageId?: string | null) => {
    if (!pageId) return undefined;
    return pages.find((page) => getPageId(page) === pageId);
  };

  const isDescendantPage = (candidateParentId: string, pageId: string) => {
    let current = getPageById(candidateParentId);

    while (current?.parentPageId) {
      if (current.parentPageId === pageId) return true;
      current = getPageById(current.parentPageId);
    }

    return false;
  };

  const getParentPageOptions = (page: PageModel) => {
    const pageId = getPageId(page);

    return pages.filter((candidate) => {
      const candidateId = getPageId(candidate);
      if (!candidateId || candidateId === pageId) return false;
      return !isDescendantPage(candidateId, pageId);
    });
  };

  const handleParentPageChange = (page: PageModel, parentPageId: string) => {
    const pageId = getPageId(page);
    if (!pageId) return;

    updatePage({
      id: pageId,
      payload: {
        name: page.name,
        icon: page.icon,
        slug: page.slug,
        parentPageId: parentPageId || "",
        order: page.order,
        isGroupOnly: page.isGroupOnly,
        isOnSidebar: page.isOnSidebar,
        isMainPage: page.isMainPage,
        isAuthenticated: page.isAuthenticated,
        isAuthorized: page.isAuthorized,
        authorizeRole: page.authorizeRole,
        filters: page.filters,
        sections: page.sections,
        subPage: page.subPage,
      },
    });
  };

  const handleSavePageStructure = async (gridSections: any[]) => {
    if (!editingPage) return;

    try {
      // Use flat structure (backward compatible with Go model)
      const sections = gridSections;
      const filters = editingPage.filters ?? [];

      updatePage({
        id: editingPage._id || editingPage.id!,
        payload: {
          name: editingPage.name,
          icon: editingPage.icon,
          slug: editingPage.slug,
          parentPageId: editingPage.parentPageId || undefined,
          order: editingPage.order,
          isGroupOnly: editingPage.isGroupOnly,
          isOnSidebar: editingPage.isOnSidebar,
          isMainPage: editingPage.isMainPage,
          isAuthenticated: editingPage.isAuthenticated,
          isAuthorized: editingPage.isAuthorized,
          authorizeRole: editingPage.authorizeRole,
          filters,
          sections: sections,
        },
      });
      setEditingPage({
        ...editingPage,
        filters,
        sections,
      });
    } catch (error) {
      console.error("Failed to save page structure:", error);
    }
  };

  const handleSidebarVisibilityChange = (
    page: PageModel,
    isOnSidebar: boolean,
  ) => {
    const pageId = getPageId(page);
    if (!pageId) return;

    updatePage({
      id: pageId,
      payload: {
        name: page.name,
        icon: page.icon,
        slug: page.slug,
        parentPageId: page.parentPageId || "",
        order: page.order,
        isGroupOnly: page.isGroupOnly,
        isOnSidebar,
        isMainPage: page.isMainPage,
        isAuthenticated: page.isAuthenticated,
        isAuthorized: page.isAuthorized,
        authorizeRole: page.authorizeRole,
        filters: page.filters,
        sections: page.sections,
        subPage: page.subPage,
      },
    });
  };

  const handleMainPageChange = (page: PageModel, isMainPage: boolean) => {
    const pageId = getPageId(page);
    if (!pageId || page.isGroupOnly) return;

    updatePage({
      id: pageId,
      payload: {
        name: page.name,
        icon: page.icon,
        slug: page.slug,
        parentPageId: page.parentPageId || "",
        order: page.order,
        isGroupOnly: page.isGroupOnly,
        isOnSidebar: page.isOnSidebar,
        isMainPage,
        isAuthenticated: page.isAuthenticated,
        isAuthorized: page.isAuthorized,
        authorizeRole: page.authorizeRole,
        filters: page.filters,
        sections: page.sections,
        subPage: page.subPage,
      },
    });
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
            const pageId = getPageId(page);
            const parentPage = getPageById(page.parentPageId);
            const parentPageOptions = getParentPageOptions(page);

            return (
              <div
                key={pageId}
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
                        {page.isOnSidebar === false && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                            {t("Hidden from sidebar")}
                          </span>
                        )}
                        {page.isMainPage && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {t("Main page")}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {(page.sections || []).length} {t("sections")} •
                        {page.authorizeRole && page.authorizeRole.length > 0
                          ? ` ${page.authorizeRole.join(", ")}`
                          : ` ${t("No role restrictions")}`}
                      </p>
                      {parentPage && (
                        <p className="text-xs text-gray-500 mt-1">
                          {t("Parent")}: {parentPage.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="flex items-center space-x-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <select
                    value={page.parentPageId || ""}
                    onChange={(e) =>
                      handleParentPageChange(page, e.target.value)
                    }
                    className="w-44 px-2.5 py-1.5 text-xs bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">{t("No parent")}</option>
                    {parentPageOptions.map((parentOption) => {
                      const parentOptionId = getPageId(parentOption);
                      return (
                        <option key={parentOptionId} value={parentOptionId}>
                          {parentOption.name}
                        </option>
                      );
                    })}
                  </select>
                  <label className="flex items-center gap-1.5 text-xs text-gray-600">
                    <input
                      type="checkbox"
                      checked={page.isOnSidebar !== false}
                      onChange={(e) =>
                        handleSidebarVisibilityChange(page, e.target.checked)
                      }
                      className="h-3.5 w-3.5 rounded border-gray-300"
                    />
                    {t("Sidebar")}
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-gray-600">
                    <input
                      type="checkbox"
                      checked={page.isMainPage === true}
                      disabled={page.isGroupOnly === true}
                      onChange={(e) =>
                        handleMainPageChange(page, e.target.checked)
                      }
                      className="h-3.5 w-3.5 rounded border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {t("Main")}
                  </label>
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
                  (editingPage.sections
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
                    .filter((g) => g !== null) || []) as any
                }
                filters={editingPage.filters || []}
                onChange={(gridSections) => {
                  // Use flat structure for compatibility
                  const sections = gridSections.map((gridSection) => ({
                    ...gridSection,
                  }));
                  setEditingPage((currentPage) => currentPage && {
                    ...currentPage,
                    sections,
                  });
                }}
                onFiltersChange={(filters) => {
                  setEditingPage((currentPage) => currentPage && {
                    ...currentPage,
                    filters,
                  });
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Page Details Modal */}
      <PageDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        page={selectedPage}
        onEdit={handleEditPage}
      />
    </div>
  );
};
