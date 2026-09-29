import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { FiArrowDown, FiArrowUp, FiChevronDown, FiCode, FiInfo, FiLayout, FiMoreHorizontal, FiNavigation, FiPlus, FiSettings } from "react-icons/fi";
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
import {
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EmptyState,
  PageActions,
  Section,
  SectionHeader,
} from "../../../components/ui";
import { cn } from "../../../utils/cn";

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

  const getPageTypeBadgeVariant = (page: PageModel): "neutral" | "danger" | "warning" | "success" => {
    if (page.isGroupOnly) return "neutral";
    if (page.isAuthorized) return "danger";
    if (page.isAuthenticated) return "warning";
    return "success";
  };

  const getPageTypeLabel = (page: PageModel) => {
    if (page.isGroupOnly) return t("Group");
    if (page.isAuthorized) return t("Authorized");
    if (page.isAuthenticated) return t("Authenticated");
    return t("Public");
  };

  return (
    <Section aria-labelledby="pages-heading">
      <SectionHeader
        title={<span id="pages-heading">{t("Pages")}</span>}
        description={t("Manage project page views, navigation, and layouts")}
        actions={canCreatePages ? (
          <PageActions aria-label={t("Page actions")}>
            <GenericButton
              size="sm"
              variant="outline"
              className="h-8 rounded-ui-md border-ui-border bg-ui-surface px-3 text-xs font-medium text-ui-foreground shadow-ui-sm hover:border-ui-border-strong hover:bg-ui-surface-subtle"
              onClick={() => setIsCreateJsonModalOpen(true)}
              iconLeft={<FiCode size={14} className="text-ui-muted" />}
            >
              {t("Create with JSON")}
            </GenericButton>
            <GenericButton
              size="sm"
              className="h-8 rounded-ui-md bg-ui-primary px-3.5 text-xs font-medium text-white shadow-ui-sm hover:bg-ui-primary-hover"
              onClick={() => setIsCreateModalOpen(true)}
              iconLeft={<FiPlus size={14} />}
              data-primary-action="true"
            >
              {t("Create Page")}
            </GenericButton>
          </PageActions>
        ) : undefined}
      />

      {/* Page Statistics Strip */}
      {orderedPages && orderedPages.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-4 rounded-ui-md border border-ui-border bg-ui-surface px-3 py-1.5 shadow-ui-sm self-start sm:self-auto w-fit">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-ui-primary">
              {orderedPages.length}
            </span>
            <span className="text-ui-muted">
              {t("Total Pages")}
            </span>
          </div>
          <div className="h-3.5 w-px bg-ui-border" />
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-ui-success">
              {
                orderedPages.filter(
                  (p) => !p.isAuthenticated && !p.isAuthorized,
                ).length
              }
            </span>
            <span className="text-ui-muted">
              {t("Public Pages")}
            </span>
          </div>
          <div className="h-3.5 w-px bg-ui-border" />
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-ui-warning">
              {orderedPages.filter((p) => p.isAuthenticated).length}
            </span>
            <span className="text-ui-muted">
              {t("Auth Pages")}
            </span>
          </div>
          <div className="h-3.5 w-px bg-ui-border" />
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-[hsl(var(--ui-info))]">
              {orderedPages.reduce(
                (total, p) => total + (p.sections?.length || 0),
                0,
              )}
            </span>
            <span className="text-ui-muted">
              {t("Total Sections")}
            </span>
          </div>
        </div>
      )}

      {/* Page List */}
      {error ? (
        <div className="text-center py-8">
          <div className="text-ui-placeholder text-6xl mb-4">⚠️</div>
          <p className="text-ui-muted mb-4">
            {t(
              "Unable to load pages. Make sure you're in a project context."
            )}
          </p>
        </div>
      ) : orderedPages && orderedPages.length > 0 ? (
        <div className="divide-y divide-ui-border rounded-ui-lg border border-ui-border bg-ui-surface overflow-hidden shadow-ui-sm">
          <div className="hidden sm:grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-ui-border bg-ui-surface-subtle/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-ui-muted">
            <div>{t("Page / Slug")}</div>
            <div className="text-right">{t("Hierarchy & Actions")}</div>
          </div>
          {orderedPages.map((page, pageIndex) => {
            const IconComponent = page.icon ? getIconByName(page.icon) : null;
            const pageId = getPageId(page);
            const parentPage = getPageById(page.parentPageId);
            const parentPageOptions = getParentPageOptions(page);

            return (
              <div
                key={pageId}
                className="group flex flex-col gap-3 p-3.5 transition-colors hover:bg-ui-surface-subtle/60 sm:px-4 sm:py-3 lg:flex-row lg:items-center lg:justify-between cursor-pointer"
                onClick={() => handleViewPage(page)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {IconComponent && (
                      <span className="flex h-6 w-6 items-center justify-center rounded-ui-sm bg-ui-surface-subtle text-ui-foreground">
                        <IconComponent className="h-3.5 w-3.5" />
                      </span>
                    )}
                    <h3 className="text-sm font-semibold text-ui-foreground group-hover:text-ui-primary transition-colors">
                      {page.name}
                    </h3>
                    {page.slug && (
                      <Badge variant="mono" className="text-[11px]">
                        /{page.slug}
                      </Badge>
                    )}
                    <Badge
                      variant={getPageTypeBadgeVariant(page)}
                      className="text-[11px]"
                    >
                      {getPageTypeLabel(page)}
                    </Badge>
                    {page.isOnSidebar === false && (
                      <Badge variant="neutral" className="text-[11px]">
                        {t("Hidden from sidebar")}
                      </Badge>
                    )}
                    {page.isMainPage && (
                      <Badge variant="info" className="text-[11px]">
                        {t("Main page")}
                      </Badge>
                    )}
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-ui-muted">
                    <span>
                      {(page.sections || []).length} {t("sections")}
                    </span>
                    <span>•</span>
                    <span>
                      {page.authorizeRole && page.authorizeRole.length > 0
                        ? page.authorizeRole.join(", ")
                        : t("No role restrictions")}
                    </span>
                    {parentPage && (
                      <>
                        <span>•</span>
                        <span>
                          {t("Parent")}:{" "}
                          <strong className="font-medium text-ui-foreground">
                            {parentPage.name}
                          </strong>
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div
                  className="flex flex-wrap items-center gap-2.5 sm:gap-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Utility Controls Group: Parent selector + Navigation placement */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Parent page selector */}
                    <div className="relative inline-flex items-center">
                      <select
                        aria-label={t("Parent page")}
                        value={page.parentPageId || ""}
                        onChange={(e) =>
                          handleParentPageChange(page, e.target.value)
                        }
                        className="h-8 max-w-[140px] appearance-none rounded-ui-md border border-ui-border bg-ui-surface-subtle pl-2.5 pr-7 text-xs font-normal text-ui-muted hover:border-ui-border-strong hover:text-ui-foreground focus:border-ui-primary focus:outline-none focus:ring-1 focus:ring-ui-primary cursor-pointer transition-colors truncate"
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
                      <FiChevronDown className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-ui-muted" />
                    </div>

                    {/* Navigation placement controls (compact segmented pill) */}
                    <div className="inline-flex h-8 items-center gap-2 rounded-ui-md border border-ui-border/70 bg-ui-surface-subtle/60 px-2 text-xs">
                      <label className="flex items-center gap-1.5 cursor-pointer font-normal text-ui-muted hover:text-ui-foreground select-none transition-colors">
                        <input
                          type="checkbox"
                          checked={page.isOnSidebar !== false}
                          onChange={(e) =>
                            handleSidebarVisibilityChange(page, e.target.checked)
                          }
                          className="h-3.5 w-3.5 rounded border-ui-border text-ui-primary focus:ring-ui-primary"
                        />
                        <span>{t("Sidebar")}</span>
                      </label>
                      <div className="h-3 w-px bg-ui-border" />
                      <label
                        className={cn(
                          "flex items-center gap-1.5 select-none transition-colors",
                          page.isGroupOnly
                            ? "cursor-not-allowed text-ui-muted/50"
                            : "cursor-pointer font-normal text-ui-muted hover:text-ui-foreground",
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={page.isMainPage === true}
                          disabled={page.isGroupOnly === true}
                          onChange={(e) =>
                            handleMainPageChange(page, e.target.checked)
                          }
                          className="h-3.5 w-3.5 rounded border-ui-border text-ui-primary focus:ring-ui-primary disabled:cursor-not-allowed"
                        />
                        <span>{t("Main")}</span>
                      </label>
                    </div>
                  </div>

                  {/* Subtle divider between utility controls and primary row actions */}
                  <div className="hidden h-4 w-px bg-ui-border/70 lg:block" />

                  {/* Actions Group: Edit (subtle outline), Preview (ghost), ⋯ (icon-only borderless) */}
                  <div className="flex items-center gap-1">
                    <GenericButton
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 text-xs font-medium text-ui-foreground shadow-none hover:border-ui-border-strong hover:bg-ui-surface-subtle"
                      onClick={() => handleEditPage(page)}
                    >
                      {t("Edit")}
                    </GenericButton>

                    <GenericButton
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2.5 text-xs font-normal text-ui-muted shadow-none hover:bg-ui-surface-subtle hover:text-ui-foreground"
                      onClick={() => navigate(`/page-preview/${page.id}`)}
                    >
                      {t("Preview")}
                    </GenericButton>

                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="h-8 w-8 border-transparent bg-transparent p-0 shadow-none text-ui-muted hover:border-transparent hover:text-ui-foreground hover:bg-ui-surface-subtle inline-flex items-center justify-center rounded-ui-md"
                        aria-label={t("More options")}
                      >
                        <FiMoreHorizontal size={16} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem onClick={() => handleViewPage(page)}>
                          <FiInfo className="h-3.5 w-3.5 text-ui-muted" />
                          <span>{t("Details")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditingJsonPage(page)}>
                          <FiCode className="h-3.5 w-3.5 text-ui-muted" />
                          <span>{t("Edit with JSON")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          disabled={pageIndex === 0}
                          onClick={() => handleMovePage(pageIndex, "up")}
                        >
                          <FiArrowUp className="h-3.5 w-3.5 text-ui-muted" />
                          <span>{t("Move up")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={pageIndex === orderedPages.length - 1}
                          onClick={() => handleMovePage(pageIndex, "down")}
                        >
                          <FiArrowDown className="h-3.5 w-3.5 text-ui-muted" />
                          <span>{t("Move down")}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title={t("No pages found in this project")}
          description={t(
            "Create a page to build navigation and layouts for your users.",
          )}
          action={
            canCreatePages ? (
              <GenericButton
                onClick={() => setIsCreateModalOpen(true)}
                iconLeft={<FiPlus size={16} />}
                data-primary-action="true"
              >
                {t("Create Your First Page")}
              </GenericButton>
            ) : undefined
          }
        />
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
              <div className="overflow-x-auto">
                <div data-testid="page-editor-toolbar" className="flex h-14 min-w-[760px] items-center gap-5 px-4 sm:px-5">
                  <div className="flex min-w-0 w-48 shrink-0 items-center gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-ui-md bg-ui-subtle text-ui-muted"><FiLayout className="h-3.5 w-3.5" aria-hidden="true" /></span>
                    <h1 className="truncate text-sm font-semibold text-ui-foreground">{editingPage.name}</h1>
                  </div>
                  <div role="tablist" aria-label="Page editor sections" className="flex h-full min-w-max flex-1 items-center gap-1">
                  {([[
                    "content", "Content", FiLayout,
                  ], ["navigation", "Navigation", FiNavigation], ["settings", "Page settings", FiSettings]] as const).map(([value, label, Icon]) => (
                    <button key={value} type="button" role="tab" id={`page-editor-tab-${value}`} aria-controls={`page-editor-panel-${value}`} aria-selected={editorTab === value} tabIndex={editorTab === value ? 0 : -1} onClick={() => setEditorTab(value)} className={`inline-flex h-8 items-center gap-1.5 rounded-ui-md px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus ${editorTab === value ? "bg-ui-subtle text-ui-foreground" : "text-ui-muted hover:bg-ui-subtle/70 hover:text-ui-foreground"}`}>
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />{label}
                    </button>
                  ))}
                  </div>
                  <div className="ml-auto flex shrink-0 items-center gap-2 border-l border-ui-border pl-4">
                    <GenericButton variant="ghost" size="sm" onClick={handleCancelDesigner}>{t("Cancel")}</GenericButton>
                    <GenericButton size="sm" disabled={!editingPage.name.trim()} data-primary-action="true" onClick={() => handleSavePageStructure(editingPage.sections || [])}>{t("Save Page")}</GenericButton>
                  </div>
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
    </Section>
  );
};
