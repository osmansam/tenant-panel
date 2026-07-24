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
import { normalizeContainerJsonPayload } from "../../../utils/jsonCreate";
import { ExcelUploadModal } from "../../PageDesigner/ExcelUploadModal";
import { GenericButton } from "../FormElements/GenericButton";
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

  const handleViewContainer = (container: ContainerModel) => {
    setSelectedContainer(container);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedContainer(null);
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
        ) : containers && containers.length > 0 ? (
          containers.map((container) => (
            <div
              key={container.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
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
                className="flex items-center space-x-2"
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
                  onClick={() => {
                    // TODO: Navigate to container details/edit page
                    console.log("Edit container:", container.id);
                  }}
                >
                  {t("Edit")}
                </GenericButton>
                <GenericButton
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // TODO: Navigate to container data view
                    console.log("View data:", container.id);
                  }}
                >
                  {t("View Data")}
                </GenericButton>
              </div>
            </div>
          ))
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
