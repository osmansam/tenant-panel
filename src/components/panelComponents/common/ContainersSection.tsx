import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronDown, FiChevronLeft, FiChevronRight, FiCode, FiDatabase, FiEdit, FiInfo, FiPlus, FiSearch, FiUpload, FiX } from "react-icons/fi";
import { cn } from "../../../utils/cn";
import { useUserContext } from "../../../context/User.context";
import {
  ContainerModel,
  CreateContainerPayload,
  CreateContainerRawPayload,
  useContainers,
  useCreateContainer,
} from "../../../utils/api/container";
import {
  CONTAINER_PAGE_SIZES,
  DEFAULT_CONTAINER_PAGE_SIZE,
  getContainerCollectionPage,
} from "../../../utils/containerCollectionView";
import { normalizeContainerJsonPayload } from "../../../utils/jsonCreate";
import { ExcelUploadModal } from "../../PageDesigner/ExcelUploadModal";
import {
  Badge,
  EmptyState,
  PageActions,
  Section,
  SectionHeader,
  Toolbar,
} from "../../ui";
import { GenericButton } from "../FormElements/GenericButton";
import { ContainerDataModal } from "../Modals/ContainerDataModal";
import { ContainerDetailsModal } from "../Modals/ContainerDetailsModal";
import { CreateContainerModal } from "../Modals/CreateContainerModal";
import { CreateWithJsonModal } from "../Modals/CreateWithJsonModal";

export const ContainersSection: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateJsonModalOpen, setIsCreateJsonModalOpen] = useState(false);
  const [selectedContainer, setSelectedContainer] =
    useState<ContainerModel | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [detailsIntent, setDetailsIntent] = useState<"details" | "manage">("details");
  const [detailsFocusArea, setDetailsFocusArea] = useState<"summary" | "fields">("summary");
  const [dataContainer, setDataContainer] = useState<ContainerModel | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_CONTAINER_PAGE_SIZE);
  const [isExcelUploadOpen, setIsExcelUploadOpen] = useState(false);
  const { createContainer, isCreating } = useCreateContainer();

  // Get containers for the current project with error handling
  let containers: any[] = [];
  let error = null;

  try {
    const containerData = useContainers();
    containers = containerData || [];
  } catch (err) {
    error = err;
  }

  const collectionPage = getContainerCollectionPage(
    containers,
    searchQuery,
    currentPage,
    pageSize,
  );

  useEffect(() => {
    if (currentPage !== collectionPage.page) {
      setCurrentPage(collectionPage.page);
    }
  }, [collectionPage.page, currentPage]);

  // Update selectedContainer when containers data changes
  useEffect(() => {
    if (selectedContainer && containers.length > 0) {
      const updatedContainer = containers.find(
        (c: ContainerModel) => c.id === selectedContainer.id
      );
      if (
        updatedContainer &&
        JSON.stringify(updatedContainer) !== JSON.stringify(selectedContainer)
      ) {
        setSelectedContainer(updatedContainer);
      }
    }
  }, [containers, selectedContainer]);

  // Check if user can create containers (project admin or developer)
  const userRoles = user?.roles || [];
  const canCreateContainers = userRoles.some((role) =>
    ["project_admin", "project_developer"].includes(role)
  );

  const handleViewContainer = (
    container: ContainerModel,
    intent: "details" | "manage" = "details",
  ) => {
    setSelectedContainer(container);
    setDetailsIntent(intent);
    setDetailsFocusArea(intent === "manage" ? "fields" : "summary");
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedContainer(null);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleCreateContainerWithJson = (payload: unknown) => {
    createContainer(payload as CreateContainerPayload | CreateContainerRawPayload);
  };

  return (
    <Section aria-labelledby="containers-heading">
      <SectionHeader
        title={<span id="containers-heading">{t("Containers")}</span>}
        description={t("Manage project schemas and their records")}
        actions={canCreateContainers ? (
          <PageActions aria-label={t("Container actions")}>
            <GenericButton
              size="sm"
              variant="outline"
              onClick={() => setIsCreateJsonModalOpen(true)}
              iconLeft={<FiCode size={14} className="text-ui-muted" />}
            >
              {t("Create with JSON")}
            </GenericButton>
            <GenericButton
              size="sm"
              variant="outline"
              onClick={() => setIsExcelUploadOpen(true)}
              iconLeft={<FiUpload size={14} className="text-ui-muted" />}
            >
              {t("Upload Excel")}
            </GenericButton>
            <GenericButton
              size="sm"
              onClick={() => setIsCreateModalOpen(true)}
              iconLeft={<FiPlus size={14} />}
              data-primary-action="true"
            >
              {t("Create Container")}
            </GenericButton>
          </PageActions>
        ) : undefined}
      />

      {/* Container Toolbar: Search + Quick Stats */}
      {containers && containers.length > 0 && !error && (
        <Toolbar
          aria-label={t("Container toolbar")}
          className="mb-4 flex-col items-stretch gap-3 py-0 sm:flex-row sm:items-center sm:justify-between"
        >
          <form
            role="search"
            aria-label={t("Search containers")}
            onSubmit={(event) => event.preventDefault()}
            className="relative w-full max-w-sm sm:max-w-md"
          >
            <label htmlFor="container-search" className="sr-only">
              {t("Search containers")}
            </label>
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ui-muted" />
            <input
              id="container-search"
              type="search"
              value={searchQuery}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder={t("Search by schema, collection, or container ID")}
              className="ui-control h-ui-sm pl-9 pr-9 text-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label={t("Clear search")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full text-ui-muted hover:bg-ui-surface-subtle hover:text-ui-foreground transition-colors"
              >
                <FiX className="h-3.5 w-3.5" />
              </button>
            )}
          </form>

          {/* Quick Stats Pill Strip */}
          <div className="flex flex-wrap items-center gap-4 rounded-ui-md border border-ui-border bg-ui-surface px-3 py-1.5 shadow-ui-sm self-start sm:self-auto">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-ui-primary">
                {containers.length}
              </span>
              <span className="text-ui-muted">
                {t("Total Containers")}
              </span>
            </div>
            <div className="h-3.5 w-px bg-ui-border" />
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-ui-success">
                {containers.filter((c) => c.isAuthContainer).length}
              </span>
              <span className="text-ui-muted">
                {t("Auth Containers")}
              </span>
            </div>
            <div className="h-3.5 w-px bg-ui-border" />
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-[hsl(var(--ui-info))]">
                {containers.reduce(
                  (total, c) => total + (c.fields?.length || 0),
                  0
                )}
              </span>
              <span className="text-ui-muted">{t("Total Fields")}</span>
            </div>
          </div>
        </Toolbar>
      )}

      {/* Container List */}
      {error ? (
        <div className="text-center py-8">
          <div className="text-ui-placeholder text-6xl mb-4">⚠️</div>
          <p className="text-ui-muted mb-4">
            {t(
              "Unable to load containers. Make sure you're in a project context."
            )}
          </p>
        </div>
      ) : containers && containers.length > 0 && collectionPage.items.length > 0 ? (
        <div className="divide-y divide-ui-border rounded-ui-lg border border-ui-border bg-ui-surface overflow-hidden shadow-ui-sm">
          <div className="hidden sm:grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-ui-border bg-ui-surface-subtle/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-ui-muted">
            <div>{t("Container / Schema")}</div>
            <div className="text-right">{t("Actions")}</div>
          </div>
          {collectionPage.items.map((container) => (
            <article
              key={container.id}
              aria-label={`${container.schemaName} ${t("container")}`}
              data-density="dense"
              className="group flex min-h-[var(--ui-row-dense)] cursor-pointer flex-col gap-3 p-3.5 transition-colors hover:bg-ui-surface-subtle/60 sm:px-4 sm:py-3 lg:flex-row lg:items-center lg:justify-between"
              onClick={() => handleViewContainer(container)}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="hidden sm:flex h-8 w-8 shrink-0 items-center justify-center rounded-ui-sm bg-ui-surface-subtle border border-ui-border/70 text-ui-muted group-hover:text-ui-primary group-hover:border-ui-primary/30 transition-colors">
                  <FiDatabase size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-sm font-semibold text-ui-foreground transition-colors group-hover:text-ui-primary">
                      {container.schemaName}
                    </h3>
                    <Badge variant={container.isAuthContainer ? "success" : "neutral"} className="text-[11px]">
                      {container.isAuthContainer ? t("Auth Container") : t("Regular Container")}
                    </Badge>
                    {container.collectionName && (
                      <Badge variant="mono" className="text-[11px]">
                        {container.collectionName}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-ui-muted">
                    <span>{(container.fields || []).length} {t("fields")}</span>
                    {container.redis?.isRedisCached && (
                      <>
                        <span>•</span>
                        <span className="font-medium text-ui-primary">{t("Redis Cached")}</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div
                className="flex shrink-0 flex-wrap items-center justify-end gap-1 self-end lg:self-center"
                onClick={(e) => e.stopPropagation()}
              >
                <GenericButton
                  size="sm"
                  variant="ghost"
                  onClick={() => handleViewContainer(container, "manage")}
                  iconLeft={<FiEdit size={12} className="text-ui-muted" />}
                >
                  {t("Edit")}
                </GenericButton>
                <GenericButton
                  size="sm"
                  variant="ghost"
                  onClick={() => setDataContainer(container)}
                  iconLeft={<FiDatabase size={12} className="text-ui-muted" />}
                >
                  {t("View Data")}
                </GenericButton>
                <GenericButton
                  size="sm"
                  variant="ghost"
                  onClick={() => handleViewContainer(container)}
                  iconLeft={<FiInfo size={12} />}
                >
                  {t("Details")}
                </GenericButton>
              </div>
            </article>
          ))}
        </div>
      ) : searchQuery ? (
        <EmptyState title={t("No containers match your search")} />
      ) : (
        <EmptyState
          title={t("No containers found in this project")}
          description={t("Create a container to define this project's data model.")}
          action={canCreateContainers ? (
            <GenericButton
              onClick={() => setIsCreateModalOpen(true)}
              iconLeft={<FiPlus size={16} />}
              data-primary-action="true"
            >
              {t("Create Your First Container")}
            </GenericButton>
          ) : undefined}
        />
      )}

      {containers.length > 0 && collectionPage.totalItems > 0 && (
        <nav
          aria-label={t("Container pagination")}
          className="mt-4 flex flex-col gap-3 border-t border-ui-border/60 pt-3 sm:flex-row sm:items-center sm:justify-between text-xs text-ui-muted"
        >
          <p>
            {t("Showing {{start}}–{{end}} of {{total}} containers", {
              start: collectionPage.startNumber,
              end: collectionPage.endNumber,
              total: collectionPage.totalItems,
            })}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="container-page-size" className="text-xs text-ui-muted font-normal">
                {t("Containers per page")}
              </label>
              <div className="relative inline-flex items-center">
                <select
                  id="container-page-size"
                  value={pageSize}
                  onChange={(event) => {
                    const nextSize = Number(event.target.value);
                    if (
                      CONTAINER_PAGE_SIZES.includes(
                        nextSize as (typeof CONTAINER_PAGE_SIZES)[number],
                      )
                    ) {
                      setPageSize(nextSize);
                      setCurrentPage(1);
                    }
                  }}
                  className="h-8 appearance-none rounded-ui-md border border-ui-border bg-ui-surface pl-2.5 pr-7 text-xs font-medium text-ui-foreground hover:border-ui-border-strong focus:border-ui-primary focus:outline-none transition-colors cursor-pointer shadow-ui-sm"
                >
                  {CONTAINER_PAGE_SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-ui-muted" />
              </div>
            </div>

            {collectionPage.totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={collectionPage.page === 1}
                  aria-label={t("Previous")}
                  className="inline-flex h-8 items-center gap-1 rounded-ui-md border border-ui-border bg-ui-surface px-2.5 text-xs font-medium text-ui-foreground shadow-ui-sm transition-colors hover:bg-ui-surface-subtle hover:border-ui-border-strong disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-ui-surface disabled:hover:border-ui-border"
                >
                  <FiChevronLeft className="h-3.5 w-3.5" />
                  <span>{t("Previous")}</span>
                </button>
                {Array.from({ length: collectionPage.totalPages }, (_, index) => index + 1).map(
                  (page) => (
                    <button
                      key={page}
                      type="button"
                      aria-label={t("Page {{page}}", { page })}
                      aria-current={page === collectionPage.page ? "page" : undefined}
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "h-8 min-w-[32px] rounded-ui-md px-2 text-xs font-medium transition-colors",
                        page === collectionPage.page
                          ? "border border-ui-border-strong bg-ui-surface-subtle font-semibold text-ui-foreground shadow-ui-sm"
                          : "border border-transparent text-ui-muted hover:border-ui-border hover:bg-ui-surface-subtle hover:text-ui-foreground",
                      )}
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) => Math.min(collectionPage.totalPages, page + 1))
                  }
                  disabled={collectionPage.page === collectionPage.totalPages}
                  aria-label={t("Next")}
                  className="inline-flex h-8 items-center gap-1 rounded-ui-md border border-ui-border bg-ui-surface px-2.5 text-xs font-medium text-ui-foreground shadow-ui-sm transition-colors hover:bg-ui-surface-subtle hover:border-ui-border-strong disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-ui-surface disabled:hover:border-ui-border"
                >
                  <span>{t("Next")}</span>
                  <FiChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </nav>
      )}

      {/* Create Container Modal */}
      <CreateContainerModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <CreateWithJsonModal
        isOpen={isCreateJsonModalOpen}
        title="Create Container with JSON"
        description="Temporary raw JSON container creation"
        submitLabel="Create Container"
        initialJson={{
          schemaName: "newSchema",
          fields: [],
          isAuthContainer: false,
          isRegisterActive: false,
          isGoogleLoginActive: false,
        }}
        isSubmitting={isCreating}
        validate={(payload) => {
          const schemaName = String(payload.schemaName || payload.SchemaName || "").trim();
          if (!schemaName) return "Container JSON requires schemaName";
          const fields = payload.fields || payload.Fields;
          return Array.isArray(fields) ? null : "Container JSON requires fields array";
        }}
        normalize={(payload) => normalizeContainerJsonPayload(payload)}
        onSubmit={handleCreateContainerWithJson}
        onClose={() => setIsCreateJsonModalOpen(false)}
      />

      {/* Container Details Modal */}
      <ContainerDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        container={selectedContainer}
        intent={detailsIntent}
        initialSection="structured"
        focusArea={detailsFocusArea}
      />

      <ContainerDataModal
        isOpen={!!dataContainer}
        onClose={() => setDataContainer(null)}
        container={dataContainer}
      />

      {/* Excel Upload Modal */}
      <ExcelUploadModal
        isOpen={isExcelUploadOpen}
        onClose={() => setIsExcelUploadOpen(false)}
        onUploadSuccess={() => {
          setIsExcelUploadOpen(false);
          // Containers list will auto-refresh due to query invalidation
        }}
      />
    </Section>
  );
};
