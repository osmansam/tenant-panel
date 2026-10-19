import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { FiArrowDown, FiArrowUp, FiCode, FiInfo, FiLayout, FiMoreHorizontal, FiNavigation, FiPlus, FiSearch, FiSettings } from "react-icons/fi";
import { UnsavedChangesGuard } from "../../../common/UnsavedChangesGuard";
import { useModalFocus } from "../../../hooks/useModalFocus";
import { useUserContext } from "../../../context/User.context";
import {
  PageModel,
  useCreatePage,
  useGetTenantPagesQuery,
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
  Input,
  PageActions,
  ResourceLoading,
  WorkspaceDialog,
  ResponsiveActionBar,
  Section,
  SectionHeader,
  Select,
} from "../../../components/ui";
import { cn } from "../../../utils/cn";
import { hasManagementPermission } from "../../../utils/managementPermissions";

const pageEditorSnapshot = (page: PageModel) => JSON.stringify({
  name: page.name,
  icon: page.icon || "MdSpaceDashboard",
  sections: page.sections || [],
  filters: page.filters || [],
  pageNavigator: page.pageNavigator || null,
});

export const PagesSection: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [accessFilter, setAccessFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateJsonModalOpen, setIsCreateJsonModalOpen] = useState(false);
  const [editingJsonPage, setEditingJsonPage] = useState<PageModel | null>(null);
  const [selectedPage, setSelectedPage] = useState<PageModel | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<PageModel | null>(null);
  const [showDesigner, setShowDesigner] = useState(false);
  const [savedEditorSnapshot, setSavedEditorSnapshot] = useState("");
  const [isDiscardDialogOpen, setIsDiscardDialogOpen] = useState(false);
  const [hasNestedEditor, setHasNestedEditor] = useState(false);
  const [isSavingPage, setIsSavingPage] = useState(false);
  const savingPageRef = useRef(false);
  const [saveError, setSaveError] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  const keepEditingRef = useRef<HTMLButtonElement>(null);
  const hasUnsavedChanges = Boolean(showDesigner && editingPage && pageEditorSnapshot(editingPage) !== savedEditorSnapshot);
  const [editorTab, setEditorTab] = useState<"content" | "navigation" | "settings">("content");
  const { updatePage, updatePageAsync, isUpdating } = useUpdatePage();
  const { createPageAsync, isCreating } = useCreatePage();

  useEffect(() => {
    if (!showDesigner || (!hasUnsavedChanges && !hasNestedEditor && !isSavingPage)) return;
    const warnBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warnBeforeUnload);
    return () => window.removeEventListener("beforeunload", warnBeforeUnload);
  }, [showDesigner, hasUnsavedChanges, hasNestedEditor, isSavingPage]);

  const { data: pages, isLoading, error, refetch } = useGetTenantPagesQuery();

  const orderedPages = useMemo(() => sortPagesForDisplay(pages), [pages]);
  const visiblePages = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    return orderedPages.filter((page) => {
      const matchesQuery = !query || `${page.name} ${page.slug || ""}`.toLocaleLowerCase().includes(query);
      const matchesAccess = accessFilter === "all" ||
        (accessFilter === "groups" && page.isGroupOnly) ||
        (!page.isGroupOnly && (
          (accessFilter === "public" && !page.isAuthenticated && !page.isAuthorized) ||
          (accessFilter === "authenticated" && page.isAuthenticated && !page.isAuthorized) ||
          (accessFilter === "authorized" && page.isAuthorized)
        ));
      return matchesQuery && matchesAccess;
    });
  }, [orderedPages, searchQuery, accessFilter]);
  const hasActiveFilters = Boolean(searchQuery.trim() || accessFilter !== "all");
  const resetFilters = () => { setSearchQuery(""); setAccessFilter("all"); };

  const canCreatePages = hasManagementPermission(
    user?.roles,
    "project.page.write",
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
    return createPageAsync(payload as CreatePagePayload);
  };

  const handleEditPageWithJson = (payload: unknown) => {
    if (!editingJsonPage) return;
    const update = buildPageJsonUpdate(
      editingJsonPage as PageModel & Record<string, unknown>,
      payload as Record<string, unknown>,
    );
    return updatePageAsync({ id: update.id, payload: update.payload as UpdatePagePayload });
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
    setSavedEditorSnapshot(pageEditorSnapshot(page));
    setSaveError("");
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
    if (!editingPage || savingPageRef.current) throw new Error("A page save is already in progress.");
    savingPageRef.current = true;
    setIsSavingPage(true);
    setSaveError("");
    const draftAtSave = editingPage;
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
      setSavedEditorSnapshot(pageEditorSnapshot({ ...draftAtSave, filters, sections }));
      setEditingPage((current) => current && {
        ...current,
        ...(current.sections === draftAtSave.sections ? { sections } : {}),
        ...(current.filters === draftAtSave.filters ? { filters } : {}),
      });
    } catch (error) {
      setSaveError(t("Your page could not be saved. Your changes are still here. Please try again."));
      console.error("Failed to save page structure:", error);
      throw error;
    } finally {
      savingPageRef.current = false;
      setIsSavingPage(false);
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
    setIsDiscardDialogOpen(false);
    setHasNestedEditor(false);
    setSaveError("");
  };
  const requestCloseDesigner = () => {
    if (isSavingPage) return;
    if (hasUnsavedChanges) setIsDiscardDialogOpen(true);
    else handleCancelDesigner();
  };
  useModalFocus(editorRef, showDesigner, requestCloseDesigner);

  const handleEditorTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    const index = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (index < 0) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    tabs[next]?.focus();
    tabs[next]?.click();
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

      {!isLoading && !error && orderedPages.length > 0 && (
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="relative min-w-0 flex-1 sm:min-w-56">
            <FiSearch aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ui-muted" />
            <Input type="search" aria-label={t("Search pages")} placeholder={t("Search pages by name or URL")} value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="w-full pl-9" />
          </div>
          <Select aria-label={t("Page access filter")} value={accessFilter} searchable={false} onChange={(event) => setAccessFilter(event.target.value)} className="w-full sm:w-52">
            <option value="all">{t("All page types")}</option>
            <option value="public">{t("Public pages")}</option>
            <option value="authenticated">{t("Sign-in required")}</option>
            <option value="authorized">{t("Role-restricted pages")}</option>
            <option value="groups">{t("Navigation groups")}</option>
          </Select>
          {hasActiveFilters && visiblePages.length > 0 && <GenericButton variant="ghost" size="sm" onClick={resetFilters}>{t("Reset filters")}</GenericButton>}
          <span role="status" aria-live="polite" className="text-xs text-ui-muted sm:ml-auto">{visiblePages.length} {t("of")} {orderedPages.length} {t("pages")}</span>
        </div>
      )}

      {/* Page List */}
      {isLoading ? (
        <ResourceLoading label={t("Loading pages")} />
      ) : error ? (
        <EmptyState role="alert" title={t("Pages could not be loaded")} description={t("Check your connection and try again.")} action={<GenericButton variant="outline" onClick={() => { void refetch(); }}>{t("Try again")}</GenericButton>} />
      ) : visiblePages.length > 0 ? (
        <div className="divide-y divide-ui-border rounded-ui-lg border border-ui-border bg-ui-surface overflow-hidden shadow-ui-sm">
          <div className="hidden sm:grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-ui-border bg-ui-surface-subtle/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-ui-muted">
            <div>{t("Page / Slug")}</div>
            <div className="text-right">{t("Hierarchy & Actions")}</div>
          </div>
          {visiblePages.map((page) => {
            const pageIndex = orderedPages.indexOf(page);
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
                    <h3 className="min-w-0 break-words text-sm font-semibold text-ui-foreground group-hover:text-ui-primary transition-colors">
                      <button type="button" className="text-left ui-focus-ring rounded-ui-sm" onClick={(event) => { event.stopPropagation(); handleViewPage(page); }} aria-label={`${t("View page details")}: ${page.name}`}>{page.name}</button>
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
                    <Select
                      aria-label={`${t("Parent page")}: ${page.name}`}
                      controlSize="sm"
                      searchable={false}
                      value={page.parentPageId || ""}
                      disabled={!canCreatePages}
                      onChange={(e) =>
                        handleParentPageChange(page, e.target.value)
                      }
                      className="min-w-[140px] max-w-[168px]"
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
                    </Select>

                    {/* Navigation placement controls (compact segmented pill) */}
                    <div className="inline-flex h-8 items-center gap-2 rounded-ui-md border border-ui-border/70 bg-ui-surface-subtle/60 px-2 text-xs">
                      <label className="flex items-center gap-1.5 cursor-pointer font-normal text-ui-muted hover:text-ui-foreground select-none transition-colors">
                        <Input
                          type="checkbox"
                          checked={page.isOnSidebar !== false}
                          disabled={!canCreatePages}
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
                        <Input
                          type="checkbox"
                          checked={page.isMainPage === true}
                          disabled={!canCreatePages || page.isGroupOnly === true}
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

                  {/* Actions Group: Edit (subtle outline), ⋯ (icon-only borderless) */}
                  <div className="flex items-center gap-1">
                    {canCreatePages && (
                      <GenericButton
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-xs font-medium text-ui-foreground shadow-none hover:border-ui-border-strong hover:bg-ui-surface-subtle"
                        onClick={() => handleEditPage(page)}
                      >
                        {t("Edit")}
                      </GenericButton>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="h-8 w-8 border-transparent bg-transparent p-0 shadow-none text-ui-muted hover:border-transparent hover:text-ui-foreground hover:bg-ui-surface-subtle inline-flex items-center justify-center rounded-ui-md"
                        aria-label={`${t("More options")}: ${page.name}`}
                      >
                        <FiMoreHorizontal size={16} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem onClick={() => handleViewPage(page)}>
                          <FiInfo className="h-3.5 w-3.5 text-ui-muted" />
                          <span>{t("Details")}</span>
                        </DropdownMenuItem>
                        {canCreatePages && (
                          <>
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
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : orderedPages.length > 0 ? (
        <EmptyState title={t("No pages match your search")} description={t("Try another name, URL, or page type.")} action={<GenericButton variant="outline" onClick={resetFilters}>{t("Reset filters")}</GenericButton>} />
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
        description="Create a page from a JSON configuration"
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
        <div ref={editorRef} role="dialog" aria-modal="true" aria-labelledby="page-editor-title" tabIndex={-1} data-modal-layer="100" data-testid="page-editor-workspace" className="fixed inset-0 z-[100] overflow-hidden bg-ui-page font-ui outline-none">
          <div className="flex h-full min-h-0 flex-col">
            <header className="shrink-0 border-b border-ui-border bg-ui-surface">
              <div>
                <div data-testid="page-editor-toolbar" className="flex min-h-14 flex-wrap items-center gap-2 px-4 py-2 sm:flex-nowrap sm:gap-4 sm:px-5">
                  <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:w-48 sm:flex-none">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-ui-md bg-ui-subtle text-ui-muted"><FiLayout className="h-3.5 w-3.5" aria-hidden="true" /></span>
                    <div className="min-w-0"><h1 id="page-editor-title" className="truncate text-sm font-semibold text-ui-foreground">{editingPage.name}</h1><span role="status" aria-live="polite" className={`block text-[11px] ${hasUnsavedChanges ? "text-ui-warning" : "text-ui-muted"}`}>{isSavingPage ? t("Saving…") : hasUnsavedChanges ? t("Unsaved changes") : t("All changes saved")}</span></div>
                  </div>
                  <div role="tablist" aria-label={t("Page editor sections")} onKeyDown={handleEditorTabKeyDown} className="order-3 flex w-full min-w-0 items-center gap-1 overflow-x-auto sm:order-none sm:w-auto sm:flex-1">
                  {([[
                    "content", "Content", FiLayout,
                  ], ["navigation", "Navigation", FiNavigation], ["settings", "Page settings", FiSettings]] as const).map(([value, label, Icon]) => (
                    <button key={value} type="button" role="tab" id={`page-editor-tab-${value}`} aria-controls={`page-editor-panel-${value}`} aria-selected={editorTab === value} tabIndex={editorTab === value ? 0 : -1} onClick={() => setEditorTab(value)} className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-ui-md px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus ${editorTab === value ? "bg-ui-subtle text-ui-foreground" : "text-ui-muted hover:bg-ui-subtle/70 hover:text-ui-foreground"}`}>
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />{label}
                    </button>
                  ))}
                  </div>
                  <div className="ml-auto flex shrink-0 items-center gap-2 border-l border-ui-border pl-4">
                    <GenericButton variant="ghost" size="sm" className="min-h-10 sm:min-h-8" disabled={isSavingPage} onClick={requestCloseDesigner}>{t("Cancel")}</GenericButton>
                    <GenericButton size="sm" className="min-h-10 sm:min-h-8" isLoading={isSavingPage} disabled={!editingPage.name.trim()} data-primary-action="true" onClick={() => { void handleSavePageStructure(editingPage.sections || []).catch(() => {}); }}>{isSavingPage ? t("Saving…") : t("Save Page")}</GenericButton>
                  </div>
                </div>
              </div>
            </header>

            {saveError && <p role="alert" className="border-b border-ui-danger/20 bg-ui-danger-subtle px-4 py-3 text-sm text-ui-danger">{saveError}</p>}
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
                          <Input id="page-designer-name" type="text" value={editingPage.name} onChange={(event) => setEditingPage((currentPage) => currentPage ? updatePageEditorMetadata(currentPage, "name", event.target.value) : currentPage)} className="w-full rounded-ui-md border border-ui-border bg-ui-surface px-3 py-2.5 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-ui-focus" />
                        </label>
                        <label className="space-y-1.5 text-sm font-medium text-ui-foreground">
                          {t("Page Icon")}
                          <div className="flex items-center gap-2">
                            {(() => { const PageIcon = getIconByName(editingPage.icon || "MdSpaceDashboard"); return <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-ui-md border border-ui-border bg-ui-subtle"><PageIcon className="h-5 w-5 text-ui-foreground" /></span>; })()}
                            <Select aria-label={t("Page Icon")} id="page-designer-icon" value={editingPage.icon || "MdSpaceDashboard"} onChange={(event) => setEditingPage((currentPage) => currentPage ? updatePageEditorMetadata(currentPage, "icon", event.target.value) : currentPage)} className="w-full rounded-ui-md border border-ui-border bg-ui-surface px-3 py-2.5 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-ui-focus">
                              {PAGE_ICON_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label} ({option.value})</option>)}
                            </Select>
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
                onNestedEditorChange={setHasNestedEditor}
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

      <WorkspaceDialog open={isDiscardDialogOpen} onClose={() => setIsDiscardDialogOpen(false)} layer="nested" className="max-w-md" initialFocusRef={keepEditingRef} title={t("Discard unsaved changes?")} footer={<ResponsiveActionBar><GenericButton ref={keepEditingRef} variant="outline" onClick={() => setIsDiscardDialogOpen(false)}>{t("Keep editing")}</GenericButton><GenericButton variant="danger" onClick={handleCancelDesigner}>{t("Discard changes")}</GenericButton></ResponsiveActionBar>}>
        <p className="text-sm leading-6 text-ui-muted">{t("Your page has changes that have not been saved. Keep editing to save them, or discard them to return to the page list.")}</p>
      </WorkspaceDialog>

      <UnsavedChangesGuard when={showDesigner && (hasUnsavedChanges || hasNestedEditor || isSavingPage)} saving={isSavingPage} />

      {/* Page Details Modal */}
      <PageDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        page={selectedPage}
        onEdit={canCreatePages ? handleEditPage : undefined}
      />
    </Section>
  );
};
