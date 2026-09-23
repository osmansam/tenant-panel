import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCode, FiInfo, FiPlus, FiUpload } from "react-icons/fi";
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
import { GenericButton } from "../FormElements/GenericButton";
import { ContainerDataModal } from "../Modals/ContainerDataModal";
import { ContainerDetailsModal } from "../Modals/ContainerDetailsModal";
import { CreateContainerModal } from "../Modals/CreateContainerModal";
import { CreateWithJsonModal } from "../Modals/CreateWithJsonModal";
import { H2 } from "../Typography";

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
  const [draftQuery, setDraftQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
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
    appliedQuery,
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

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAppliedQuery(draftQuery.trim());
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setDraftQuery("");
    setAppliedQuery("");
    setCurrentPage(1);
  };

  const handleCreateContainerWithJson = (payload: unknown) => {
    createContainer(payload as CreateContainerPayload | CreateContainerRawPayload);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="text-2xl mr-3">🗄️</div>
          <H2 className="text-lg font-semibold text-gray-900">
            {t("Containers")}
          </H2>
        </div>
        {canCreateContainers && (
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
              variant="outline"
              onClick={() => setIsExcelUploadOpen(true)}
              iconLeft={<FiUpload size={16} />}
            >
              {t("Upload Excel")}
            </GenericButton>
            <GenericButton
              size="sm"
              onClick={() => setIsCreateModalOpen(true)}
              iconLeft={<FiPlus size={16} />}
            >
              {t("Create Container")}
            </GenericButton>
          </div>
        )}
      </div>

      {containers.length > 0 && !error && (
        <div className="mb-5 rounded-lg border border-gray-200 bg-gray-50 p-3">
          <form
            role="search"
            onSubmit={handleSearch}
            className="flex flex-col gap-2 sm:flex-row sm:items-center"
          >
            <label htmlFor="container-search" className="sr-only">
              {t("Search containers")}
            </label>
            <input
              id="container-search"
              type="search"
              value={draftQuery}
              onChange={(event) => setDraftQuery(event.target.value)}
              placeholder={t("Search by schema, collection, or container ID")}
              className="h-10 min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            <GenericButton type="submit" size="sm">
              {t("Search")}
            </GenericButton>
            {(draftQuery || appliedQuery) && (
              <GenericButton
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClearSearch}
              >
                {t("Clear search")}
              </GenericButton>
            )}
          </form>
        </div>
      )}

      {/* Container List */}
      <div className="space-y-3">
        {error ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-6xl mb-4">⚠️</div>
            <p className="text-gray-500 mb-4">
              {t(
                "Unable to load containers. Make sure you're in a project context."
              )}
            </p>
          </div>
        ) : containers && containers.length > 0 && collectionPage.items.length > 0 ? (
          collectionPage.items.map((container) => (
            <article
              key={container.id}
              aria-label={`${container.schemaName} ${t("container")}`}
              className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 lg:flex-row lg:items-center lg:justify-between"
              onClick={() => handleViewContainer(container)}
            >
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">
                  {container.schemaName}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {(container.fields || []).length} {t("fields")} •
                  {container.isAuthContainer
                    ? ` ${t("Auth Container")}`
                    : ` ${t("Regular Container")}`}
                </p>
                {container.collectionName && (
                  <p className="text-xs text-gray-400 mt-1 font-mono">
                    {container.collectionName}
                  </p>
                )}
              </div>
              <div
                className="flex flex-wrap items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <GenericButton
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewContainer(container)}
                  iconLeft={<FiInfo size={12} />}
                >
                  {t("Details")}
                </GenericButton>
                <GenericButton
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewContainer(container, "manage")}
                >
                  {t("Edit")}
                </GenericButton>
                <GenericButton
                  variant="outline"
                  size="sm"
                  onClick={() => setDataContainer(container)}
                >
                  {t("View Data")}
                </GenericButton>
              </div>
            </article>
          ))
        ) : appliedQuery ? (
          <div className="rounded-lg border border-dashed border-gray-300 py-10 text-center">
            <p className="text-gray-500">{t("No containers match your search")}</p>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 text-6xl mb-4">🗄️</div>
            <p className="text-gray-500 mb-4">
              {t("No containers found in this project")}
            </p>
            {canCreateContainers && (
              <GenericButton
                onClick={() => setIsCreateModalOpen(true)}
                iconLeft={<FiPlus size={16} />}
              >
                {t("Create Your First Container")}
              </GenericButton>
            )}
          </div>
        )}
      </div>

      {containers.length > 0 && collectionPage.totalItems > 0 && (
        <nav
          aria-label={t("Container pagination")}
          className="mt-5 flex flex-col gap-3 border-t border-gray-200 pt-4 lg:flex-row lg:items-center lg:justify-between"
        >
          <p className="text-sm text-gray-600">
            {t("Showing {{start}}–{{end}} of {{total}} containers", {
              start: collectionPage.startNumber,
              end: collectionPage.endNumber,
              total: collectionPage.totalItems,
            })}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="container-page-size" className="text-sm text-gray-600">
              {t("Containers per page")}
            </label>
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
              className="h-9 rounded-lg border border-gray-300 bg-white px-2 text-sm"
            >
              {CONTAINER_PAGE_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <GenericButton
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={collectionPage.page === 1}
            >
              {t("Previous")}
            </GenericButton>
            {Array.from({ length: collectionPage.totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  aria-label={t("Page {{page}}", { page })}
                  aria-current={page === collectionPage.page ? "page" : undefined}
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 min-w-8 rounded-md border px-2 text-sm ${
                    page === collectionPage.page
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ),
            )}
            <GenericButton
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((page) => Math.min(collectionPage.totalPages, page + 1))
              }
              disabled={collectionPage.page === collectionPage.totalPages}
            >
              {t("Next")}
            </GenericButton>
          </div>
        </nav>
      )}

      {/* Container Statistics */}
      {containers && containers.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {containers.length}
              </div>
              <div className="text-xs text-gray-500">
                {t("Total Containers")}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {containers.filter((c) => c.isAuthContainer).length}
              </div>
              <div className="text-xs text-gray-500">
                {t("Auth Containers")}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {containers.reduce(
                  (total, c) => total + (c.fields?.length || 0),
                  0
                )}
              </div>
              <div className="text-xs text-gray-500">{t("Total Fields")}</div>
            </div>
          </div>
        </div>
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
    </div>
  );
};
