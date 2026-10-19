import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronLeft, FiChevronRight, FiCode, FiDatabase, FiEdit, FiInfo, FiLayers, FiPlus, FiSearch, FiShield, FiUpload, FiX } from "react-icons/fi";
import { cn } from "../../../utils/cn";
import { useUserContext } from "../../../context/User.context";
import {
  ContainerModel,
  CreateContainerPayload,
  CreateContainerRawPayload,
  useContainersQuery,
  useCreateContainer,
} from "../../../utils/api/container";
import {
  CONTAINER_PAGE_SIZES,
  DEFAULT_CONTAINER_PAGE_SIZE,
  getContainerCollectionPage,
} from "../../../utils/containerCollectionView";
import { normalizeContainerJsonPayload } from "../../../utils/jsonCreate";
import { hasManagementPermission } from "../../../utils/managementPermissions";
import { ExcelUploadModal } from "../../PageDesigner/ExcelUploadModal";
import {
  Badge,
  EmptyState,
  Input,
  PageActions,
  ResourceLoading,
  Section,
  SectionHeader,
  Select,
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
  const [typeFilter, setTypeFilter] = useState<"all" | "auth" | "regular" | "redis">("all");
  const [isExcelUploadOpen, setIsExcelUploadOpen] = useState(false);
  const { createContainerAsync, isCreating } = useCreateContainer();

  const { data: containers, isLoading, error, refetch } = useContainersQuery();

  const filteredContainers = useMemo(() => {
    if (typeFilter === "auth") {
      return containers.filter((container) => container.isAuthContainer);
    }
    if (typeFilter === "regular") {
      return containers.filter((container) => !container.isAuthContainer);
    }
    if (typeFilter === "redis") {
      return containers.filter((container) => container.redis?.isRedisCached);
    }
    return containers;
  }, [containers, typeFilter]);

  const collectionPage = getContainerCollectionPage(
    filteredContainers,
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

  const canCreateContainers = hasManagementPermission(
    user?.roles,
    "project.schema.write",
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

  const handleTypeFilterChange = (
    value: "all" | "auth" | "regular" | "redis",
  ) => {
    setTypeFilter(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setTypeFilter("all");
    setCurrentPage(1);
  };

  const handleCreateContainerWithJson = (payload: unknown) => {
    return createContainerAsync(payload as CreateContainerPayload | CreateContainerRawPayload);
  };

  return (
    <Section aria-labelledby="containers-heading">
      <SectionHeader
        title={
          <span className="flex items-center gap-2.5">
            <span id="containers-heading">{t("Collections")}</span>
            {containers.length > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ui-surface-subtle px-1.5 text-[11px] font-semibold tabular-nums text-ui-muted">
                {containers.length}
              </span>
            )}
          </span>
        }
        actions={canCreateContainers ? (
          <PageActions aria-label={t("Collection actions")}>
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
              {t("Create Collection")}
            </GenericButton>
          </PageActions>
        ) : undefined}
      />

      {/* Collection overview + toolbar */}
      {containers.length > 0 && !error && (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center justify-between gap-3 rounded-ui-lg border border-ui-border bg-ui-surface px-4 py-3.5 shadow-ui-sm">
              <div className="min-w-0">
                <p className="text-xl font-semibold leading-none tabular-nums text-ui-foreground">
                  {containers.length}
                </p>
                <p className="mt-1.5 text-xs text-ui-muted">
                  {t("Total Collections")}
                </p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-ui-md bg-ui-surface-subtle text-ui-muted">
                <FiDatabase size={15} />
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-ui-lg border border-ui-border bg-ui-surface px-4 py-3.5 shadow-ui-sm">
              <div className="min-w-0">
                <p className="text-xl font-semibold leading-none tabular-nums text-ui-success">
                  {containers.filter((c) => c.isAuthContainer).length}
                </p>
                <p className="mt-1.5 text-xs text-ui-muted">
                  {t("Auth Collections")}
                </p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-ui-md bg-ui-surface-subtle text-ui-success">
                <FiShield size={15} />
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-ui-lg border border-ui-border bg-ui-surface px-4 py-3.5 shadow-ui-sm">
              <div className="min-w-0">
                <p className="text-xl font-semibold leading-none tabular-nums text-[hsl(var(--ui-info))]">
                  {containers.reduce(
                    (total, c) => total + (c.fields?.length || 0),
                    0,
                  )}
                </p>
                <p className="mt-1.5 text-xs text-ui-muted">{t("Total Fields")}</p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-ui-md bg-ui-surface-subtle text-[hsl(var(--ui-info))]">
                <FiLayers size={15} />
              </span>
            </div>
          </div>

          <Toolbar
            aria-label={t("Collection toolbar")}
            className="mb-3 mt-4 flex-col items-stretch gap-3 py-0 sm:flex-row sm:items-center"
          >
            <form
              role="search"
              aria-label={t("Search collections")}
              onSubmit={(event) => event.preventDefault()}
              className="relative w-full max-w-md"
            >
              <label htmlFor="container-search" className="sr-only">
                {t("Search collections")}
              </label>
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ui-muted" />
              <Input
                id="container-search"
                type="search"
                value={searchQuery}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder={t("Search by schema, collection name, or collection ID")}
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

            <div className="sm:ml-auto">
              <Select
                aria-label={t("Collection type")}
                controlSize="sm"
                searchable={false}
                value={typeFilter}
                onChange={(event) =>
                  handleTypeFilterChange(
                    event.target.value as "all" | "auth" | "regular" | "redis",
                  )
                }
                className="w-full sm:w-[190px]"
              >
                <option value="all">{t("All collections")}</option>
                <option value="auth">{t("Auth collections")}</option>
                <option value="regular">{t("Regular collections")}</option>
                <option value="redis">{t("Redis cached")}</option>
              </Select>
            </div>
          </Toolbar>
        </>
      )}

      {/* Collection list */}
      {isLoading ? (
        <ResourceLoading label={t("Loading collections")} />
      ) : error ? (
        <EmptyState role="alert" title={t("Collections could not be loaded")} description={t("Check your connection and try again.")} action={<GenericButton variant="outline" onClick={() => { void refetch(); }}>{t("Try again")}</GenericButton>} />
      ) : containers && containers.length > 0 && collectionPage.items.length > 0 ? (
        <div className="overflow-hidden rounded-ui-xl border border-ui-border bg-ui-surface shadow-ui-card">
          <ul role="list" className="divide-y divide-ui-border/70">
            {collectionPage.items.map((container) => (
              <li key={container.id}>
                <article
                  aria-label={`${container.schemaName} ${t("collection")}`}
                  data-density="dense"
                  className="group flex min-h-[var(--ui-row-dense)] cursor-pointer flex-col gap-3 px-4 py-4 transition-colors hover:bg-ui-surface-subtle/60 sm:px-5 lg:flex-row lg:items-center lg:justify-between"
                  onClick={() => handleViewContainer(container)}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-ui-md border border-ui-border/70 bg-ui-surface-subtle text-ui-muted transition-colors group-hover:border-ui-primary/30 group-hover:text-ui-primary sm:flex">
                      <FiDatabase size={15} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-sm font-semibold text-ui-foreground transition-colors group-hover:text-ui-primary">
                          {container.schemaName}
                        </h3>
                        <Badge variant={container.isAuthContainer ? "success" : "neutral"} className="text-[11px]">
                          {container.isAuthContainer ? t("Auth Collection") : t("Regular Collection")}
                        </Badge>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ui-muted">
                        {container.collectionName && (
                          <span className="font-mono">{container.collectionName}</span>
                        )}
                        <span>{(container.fields || []).length} {t("fields")}</span>
                        {container.redis?.isRedisCached && (
                          <span className="inline-flex items-center gap-1.5 font-medium text-ui-primary">
                            <span className="h-1.5 w-1.5 rounded-full bg-ui-primary" aria-hidden="true" />
                            {t("Redis Cached")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex shrink-0 flex-wrap items-center justify-end gap-1 self-end lg:self-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {canCreateContainers && (
                      <GenericButton
                        size="sm"
                        variant="ghost"
                        onClick={() => handleViewContainer(container, "manage")}
                        iconLeft={<FiEdit size={12} className="text-ui-muted" />}
                      >
                        {t("Edit")}
                      </GenericButton>
                    )}
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
              </li>
            ))}
          </ul>

          {collectionPage.totalItems > 0 && (
            <nav
              aria-label={t("Collection pagination")}
              className="flex flex-col gap-3 border-t border-ui-border px-4 py-3 text-xs text-ui-muted sm:flex-row sm:items-center sm:justify-between sm:px-5"
            >
              <p>
                {t("Showing {{start}}–{{end}} of {{total}} collections", {
                  start: collectionPage.startNumber,
                  end: collectionPage.endNumber,
                  total: collectionPage.totalItems,
                })}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <label htmlFor="container-page-size" className="text-xs text-ui-muted font-normal">
                    {t("Collections per page")}
                  </label>
                  <Select
                    id="container-page-size"
                    controlSize="sm"
                    searchable={false}
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
                    className="w-[76px]"
                  >
                    {CONTAINER_PAGE_SIZES.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </Select>
                </div>

                {collectionPage.totalPages > 1 && (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                      disabled={collectionPage.page === 1}
                      aria-label={t("Previous")}
                      className="flex h-8 w-8 items-center justify-center rounded-ui-md border border-ui-border bg-ui-surface text-ui-muted transition hover:border-ui-border-hover hover:bg-ui-surface-subtle hover:text-ui-foreground disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <FiChevronLeft className="h-4 w-4" />
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
                            "flex h-8 min-w-8 items-center justify-center rounded-ui-md px-2 text-xs font-medium tabular-nums transition-colors",
                            page === collectionPage.page
                              ? "bg-ui-ink text-white"
                              : "text-ui-muted hover:bg-ui-surface-subtle hover:text-ui-foreground",
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
                      className="flex h-8 w-8 items-center justify-center rounded-ui-md border border-ui-border bg-ui-surface text-ui-muted transition hover:border-ui-border-hover hover:bg-ui-surface-subtle hover:text-ui-foreground disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <FiChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </nav>
          )}
        </div>
      ) : searchQuery || typeFilter !== "all" ? (
        <EmptyState title={t("No collections match your search")} description={t("Try another name, collection, or identifier.")} action={<GenericButton variant="outline" onClick={handleClearFilters}>{t("Show all collections")}</GenericButton>} />
      ) : (
        <EmptyState
          title={t("No collections found in this project")}
          description={t("Create a collection to define this project's data model.")}
          action={canCreateContainers ? (
            <GenericButton
              onClick={() => setIsCreateModalOpen(true)}
              iconLeft={<FiPlus size={16} />}
              data-primary-action="true"
            >
              {t("Create Your First Collection")}
            </GenericButton>
          ) : undefined}
        />
      )}

      {/* Create Container Modal */}
      <CreateContainerModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <CreateWithJsonModal
        isOpen={isCreateJsonModalOpen}
        title="Create Collection with JSON"
        description="Temporary raw JSON collection creation"
        submitLabel="Create Collection"
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
          if (!schemaName) return "Collection JSON requires schemaName";
          const fields = payload.fields || payload.Fields;
          return Array.isArray(fields) ? null : "Collection JSON requires fields array";
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
