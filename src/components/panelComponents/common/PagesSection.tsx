import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { FiArrowDown, FiArrowUp, FiCode, FiInfo, FiLayout, FiNavigation, FiPlus, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/User.context";
import {
  PageModel,
  useCreatePage,
  useGetTenantPages,
  useUpdatePage,
  CreatePagePayload,
  UpdatePagePayload,
} from "../../../utils/api/page";
import { getIconByName } from "../../../utils/menuIcons";
import {
  buildPageJsonUpdate,
  getEditablePageJson,
  normalizePageJsonPayload,
} from "../../../utils/jsonCreate";
import { updatePageEditorMetadata } from "../../../utils/pageEditorMetadata";
import { buildPageOrderSwap, sortPagesForDisplay } from "../../../utils/pageOrdering";
import { PAGE_ICON_OPTIONS } from "../../../utils/pageIcons";
import { PageDesigner } from "../../PageDesigner/PageDesigner";
import { PageNavigatorEditor } from "../../PageDesigner/PageNavigatorEditor";
import { GenericButton } from "../FormElements/GenericButton";
import { CreatePageModal } from "../Modals/CreatePageModal";
import { CreateWithJsonModal } from "../Modals/CreateWithJsonModal";
import { PageDetailsModal } from "../Modals/PageDetailsModal";
import { H2 } from "../Typography";

export const PagesSection: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateJsonModalOpen, setIsCreateJsonModalOpen] = useState(false);
  const [editingJsonPage, setEditingJsonPage] = useState<PageModel | null>(null);
  const [selectedPage, setSelectedPage] = useState<PageModel | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<PageModel | null>(null);
  const [showDesigner, setShowDesigner] = useState(false);
  const [editorTab, setEditorTab] = useState<"content" | "navigation" | "settings">("content");
  const { updatePage, updatePageAsync, isUpdating } = useUpdatePage();
  const { createPage, isCreating } = useCreatePage();

  useEffect(() => {
    if (!showDesigner) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showDesigner]);

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

  const orderedPages = useMemo(() => sortPagesForDisplay(pages), [pages]);

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

  const handleCreatePageWithJson = (payload: unknown) => {
    createPage(payload as CreatePagePayload);
  };

  const handleEditPageWithJson = (payload: unknown) => {
    if (!editingJsonPage) return;
    const update = buildPageJsonUpdate(
      editingJsonPage as PageModel & Record<string, unknown>,
      payload as Record<string, unknown>,
    );
    updatePage({ id: update.id, payload: update.payload as UpdatePagePayload });
  };

  const buildPageOrderPayload = (page: PageModel, order: number) => ({
    name: page.name,
    icon: page.icon,
    slug: page.slug,
    parentPageId: page.parentPageId || "",
    order,
    isGroupOnly: page.isGroupOnly,
    isOnSidebar: page.isOnSidebar,
    isMainPage: page.isMainPage,
    isAuthenticated: page.isAuthenticated,
    isAuthorized: page.isAuthorized,
    authorizeRole: page.authorizeRole,
    filters: page.filters,
    sections: page.sections,
    subPage: page.subPage,
    pageNavigator: page.pageNavigator,
  });

  const handleMovePage = async (index: number, direction: "up" | "down") => {
    const updates = buildPageOrderSwap(orderedPages, index, direction);
    if (updates.length !== 2) return;

    const pagesById = new Map(
      orderedPages.map((page) => [getPageId(page), page]),
    );

    await Promise.all(
      updates.map(({ id, order }) => {
        const page = pagesById.get(id);
        if (!page) return Promise.resolve();
        return updatePageAsync({
          id,
          payload: buildPageOrderPayload(page, order),
        });
      }),
    );
  };

  const handleEditPage = (page: PageModel) => {
    setEditingPage(page);
    setEditorTab("content");
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
        pageNavigator: page.pageNavigator,
      },
    });
  };

  const handleSavePageStructure = async (gridSections: any[]) => {
    if (!editingPage) return;

    try {
      // Use flat structure (backward compatible with Go model)
      const sections = gridSections;
      const filters = editingPage.filters ?? [];

      await updatePageAsync({
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
          pageNavigator: editingPage.pageNavigator,
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
        pageNavigator: page.pageNavigator,
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
        pageNavigator: page.pageNavigator,
      },
    });
  };

  const handleCancelDesigner = () => {
    setShowDesigner(false);
    setEditingPage(null);
    setEditorTab("content");
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
          <div className="flex gap-2">
            <GenericButton
              size="sm"
              variant="outline"
              onClick={() => setIsCreateJsonModalOpen(true)}
              iconLeft={<FiCode size={16} />}
            >
              {t("Create with JSON")}
            </GenericButton>
            <GenericButton
              size="sm"
              onClick={() => setIsCreateModalOpen(true)}
              iconLeft={<FiPlus size={16} />}
            >
              {t("Create Page")}
            </GenericButton>
          </div>
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
        ) : orderedPages && orderedPages.length > 0 ? (
          orderedPages.map((page, pageIndex) => {
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
                  <button
                    type="button"
                    onClick={() => handleMovePage(pageIndex, "up")}
                    disabled={pageIndex === 0}
                    title={t("Move up")}
                    className="rounded-md border border-gray-300 p-1.5 text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FiArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMovePage(pageIndex, "down")}
                    disabled={pageIndex === orderedPages.length - 1}
                    title={t("Move down")}
                    className="rounded-md border border-gray-300 p-1.5 text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FiArrowDown size={14} />
                  </button>
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
                    onClick={() => setEditingJsonPage(page)}
                    iconLeft={<FiCode size={12} />}
                  >
                    {t("Edit with JSON")}
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
      {orderedPages && orderedPages.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {orderedPages.length}
              </div>
              <div className="text-xs text-gray-500">{t("Total Pages")}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {
                  orderedPages.filter((p) => !p.isAuthenticated && !p.isAuthorized)
                    .length
                }
              </div>
              <div className="text-xs text-gray-500">{t("Public Pages")}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {orderedPages.filter((p) => p.isAuthenticated).length}
              </div>
              <div className="text-xs text-gray-500">{t("Auth Pages")}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {orderedPages.reduce(
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

      <CreateWithJsonModal
        isOpen={isCreateJsonModalOpen}
        title="Create Page with JSON"
        description="Temporary raw JSON page creation"
        submitLabel="Create Page"
        initialJson={{
          name: "New Page",
          slug: "new-page",
          icon: "MdSpaceDashboard",
          isAuthenticated: true,
          isAuthorized: false,
          authorizeRole: [],
          sections: [],
          filters: [],
        }}
        isSubmitting={isCreating}
        validate={(payload) => {
          const name = String(payload.name || payload.Name || "").trim();
          return name ? null : "Page JSON requires name";
        }}
        normalize={(payload) => normalizePageJsonPayload(payload)}
        onSubmit={handleCreatePageWithJson}
        onClose={() => setIsCreateJsonModalOpen(false)}
      />

      {editingJsonPage && (
        <CreateWithJsonModal
          isOpen
          title="Edit Page with JSON"
          description="Edit the complete page configuration"
          submitLabel="Save Changes"
          initialJson={getEditablePageJson(
            editingJsonPage as PageModel & Record<string, unknown>,
          )}
          isSubmitting={isUpdating}
          validate={(payload) => {
            const name = String(payload.name || payload.Name || "").trim();
            return name ? null : "Page JSON requires name";
          }}
          normalize={(payload) => normalizePageJsonPayload(payload)}
          onSubmit={handleEditPageWithJson}
          onClose={() => setEditingJsonPage(null)}
        />
      )}

      {/* Page Designer Modal */}
      {showDesigner && editingPage && createPortal(
        <div data-testid="page-editor-workspace" className="fixed inset-0 z-[100] overflow-hidden bg-ui-page font-ui">
          <div className="flex h-full min-h-0 flex-col">
            <header className="shrink-0 border-b border-ui-border bg-ui-surface">
              <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wide text-ui-muted">Page editor</span>
                    {editingPage.slug && <span className="truncate rounded-full bg-ui-subtle px-2 py-0.5 font-mono text-[11px] text-ui-muted">/{editingPage.slug}</span>}
                  </div>
                  <h1 className="mt-0.5 truncate text-base font-semibold text-ui-foreground">{editingPage.name}</h1>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <GenericButton variant="ghost" size="sm" onClick={handleCancelDesigner}>{t("Cancel")}</GenericButton>
                  <GenericButton size="sm" disabled={!editingPage.name.trim()} data-primary-action="true" onClick={() => handleSavePageStructure(editingPage.sections || [])}>{t("Save Page")}</GenericButton>
                </div>
              </div>
              <div className="overflow-x-auto px-4 sm:px-6">
                <div role="tablist" aria-label="Page editor sections" className="flex min-w-max gap-6">
                  {([[
                    "content", "Content", FiLayout,
                  ], ["navigation", "Navigation", FiNavigation], ["settings", "Page settings", FiSettings]] as const).map(([value, label, Icon]) => (
                    <button key={value} type="button" role="tab" id={`page-editor-tab-${value}`} aria-controls={`page-editor-panel-${value}`} aria-selected={editorTab === value} tabIndex={editorTab === value ? 0 : -1} onClick={() => setEditorTab(value)} className={`relative inline-flex h-11 items-center gap-2 border-b-2 px-0.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus ${editorTab === value ? "border-ui-foreground text-ui-foreground" : "border-transparent text-ui-muted hover:text-ui-foreground"}`}>
                      <Icon className="h-4 w-4" aria-hidden="true" />{label}
                    </button>
                  ))}
                </div>
              </div>
            </header>

            <div className="min-h-0 flex-1 overflow-hidden">
              {editorTab === "navigation" && (
              <div role="tabpanel" id="page-editor-panel-navigation" aria-labelledby="page-editor-tab-navigation" className="h-full overflow-y-auto p-4 sm:p-6">
                <div className="mx-auto max-w-5xl">
                  <div className="mb-5">
                    <h2 className="text-lg font-semibold text-ui-foreground">Navigation</h2>
                    <p className="mt-1 text-sm text-ui-muted">Control how this page appears in its hierarchy and header.</p>
                  </div>
                <PageNavigatorEditor
                  value={editingPage.pageNavigator}
                  currentPageId={getPageId(editingPage)}
                  pages={pages.map((page) => ({
                    id: getPageId(page),
                    name: page.name,
                    slug: page.slug,
                    parentPageId: page.parentPageId,
                    isMainPage: page.isMainPage,
                    isGroupOnly: page.isGroupOnly,
                    sections: [],
                  }))}
                  onChange={(pageNavigator) =>
                    setEditingPage((currentPage) =>
                      currentPage ? { ...currentPage, pageNavigator } : currentPage,
                    )
                  }
                />
                </div>
              </div>
              )}
              {editorTab === "settings" && (
                <div role="tabpanel" id="page-editor-panel-settings" aria-labelledby="page-editor-tab-settings" className="h-full overflow-y-auto p-4 sm:p-6">
                  <div className="mx-auto max-w-3xl">
                    <div className="mb-5">
                      <h2 className="text-lg font-semibold text-ui-foreground">Page settings</h2>
                      <p className="mt-1 text-sm text-ui-muted">Edit the identity shown in project navigation.</p>
                    </div>
                    <section className="rounded-ui-lg border border-ui-border bg-ui-surface p-5 sm:p-6">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <label className="space-y-1.5 text-sm font-medium text-ui-foreground">
                          {t("Page Name")}
                          <input id="page-designer-name" type="text" value={editingPage.name} onChange={(event) => setEditingPage((currentPage) => currentPage ? updatePageEditorMetadata(currentPage, "name", event.target.value) : currentPage)} className="w-full rounded-ui-md border border-ui-border bg-ui-surface px-3 py-2.5 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-ui-focus" />
                        </label>
                        <label className="space-y-1.5 text-sm font-medium text-ui-foreground">
                          {t("Page Icon")}
                          <div className="flex items-center gap-2">
                            {(() => { const PageIcon = getIconByName(editingPage.icon || "MdSpaceDashboard"); return <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-ui-md border border-ui-border bg-ui-subtle"><PageIcon className="h-5 w-5 text-ui-foreground" /></span>; })()}
                            <select id="page-designer-icon" value={editingPage.icon || "MdSpaceDashboard"} onChange={(event) => setEditingPage((currentPage) => currentPage ? updatePageEditorMetadata(currentPage, "icon", event.target.value) : currentPage)} className="w-full rounded-ui-md border border-ui-border bg-ui-surface px-3 py-2.5 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-ui-focus">
                              {PAGE_ICON_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label} ({option.value})</option>)}
                            </select>
                          </div>
                        </label>
                      </div>
                      <div className="mt-5 border-t border-ui-border pt-4">
                        <div className="text-xs font-medium uppercase tracking-wide text-ui-muted">Page URL</div>
                        <div className="mt-1 font-mono text-sm text-ui-foreground">/{editingPage.slug || "—"}</div>
                      </div>
                    </section>
                  </div>
                </div>
              )}
              {editorTab === "content" && (
              <div role="tabpanel" id="page-editor-panel-content" aria-labelledby="page-editor-tab-content" className="h-full">
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
                onComponentSave={handleSavePageStructure}
                onFiltersChange={(filters) => {
                  setEditingPage((currentPage) => currentPage && {
                    ...currentPage,
                    filters,
                  });
                }}
              />
              </div>
              )}
            </div>
          </div>
        </div>,
        document.body,
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
