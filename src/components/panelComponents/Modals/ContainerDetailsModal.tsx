import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FiChevronDown,
  FiChevronUp,
  FiCode,
  FiCopy,
  FiEdit,
  FiGitBranch,
  FiList,
  FiPlus,
  FiShield,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { CheckSwitch } from "../../../common/CheckSwitch";
import { ConfirmationDialog } from "../../../common/ConfirmationDialog";
import { useGetSelection } from "../../../utils/dynamic";
import {
  buildAuthUserPayload,
  canEnableGoogleLogin,
  getAuthUserFormFields,
  getAuthUserRoleField,
} from "../../../utils/authContainerValidation";
import {
  ContainerModel,
  Field,
  PipelineStage,
  useCreateProjectAuthUser,
  useUpdateContainer,
  useUpdatePipelines,
} from "../../../utils/api/container";
import FieldPermissions from "../../FieldPermissions";
import RoutePermissions from "../../RoutePermissions";
import { GenericButton } from "../FormElements/GenericButton";
import { AddFieldModal } from "./AddFieldModal";
import { AddPipelineModal } from "./AddPipelineModal";

interface ContainerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  container: ContainerModel | null;
}

export const ContainerDetailsModal: React.FC<ContainerDetailsModalProps> = ({
  isOpen,
  onClose,
  container,
}) => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<
    "structured" | "json" | "permissions" | "routes" | "pipelines"
  >("structured");
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);
  const [fieldToDelete, setFieldToDelete] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<Field | null>(null);
  const [authUserValues, setAuthUserValues] = useState<Record<string, string>>({});
  const [authUserRole, setAuthUserRole] = useState("");

  // Pipeline management state
  const [isAddPipelineModalOpen, setIsAddPipelineModalOpen] = useState(false);
  const [editingPipeline, setEditingPipeline] = useState<PipelineStage | null>(
    null
  );
  const [pipelineToDelete, setPipelineToDelete] = useState<string | null>(null);

  const { updateContainer, isUpdating } = useUpdateContainer();
  const { updatePipelines, isUpdating: isPipelinesUpdating } =
    useUpdatePipelines();
  const roleOptions = useGetSelection<Array<{ _id?: string; id?: string; name?: string }>>(
    container?.isAuthContainer ? "role" : "",
    container?.isAuthContainer ? "name" : "",
  );
  const getRoleOptionId = useCallback(
    (role?: { _id?: string; id?: string; name?: string }) => role?._id || role?.id || "",
    [],
  );
  const authUserFormFields = useMemo(
    () => getAuthUserFormFields(container?.fields || []),
    [container?.fields],
  );
  const authUserRoleField = useMemo(
    () => getAuthUserRoleField(container?.fields || []),
    [container?.fields],
  );
  const { createAuthUser, isCreatingAuthUser } = useCreateProjectAuthUser();

  const copyToClipboard = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text);
      toast.success(t("Copied to clipboard"));
    },
    [t]
  );

  const getFieldTypeColor = useCallback((type: string) => {
    const colors = {
      string: "bg-blue-100 text-blue-800",
      int: "bg-green-100 text-green-800",
      boolean: "bg-purple-100 text-purple-800",
      date: "bg-orange-100 text-orange-800",
      array: "bg-yellow-100 text-yellow-800",
      object: "bg-red-100 text-red-800",
    };
    return (
      colors[type.toLowerCase() as keyof typeof colors] ||
      "bg-gray-100 text-gray-800"
    );
  }, []);

  const renderChildFields = useCallback(
    (children: Field[] = []) => {
      if (!children.length) return null;

      return (
        <div className="mt-3 space-y-2 border-l-2 border-gray-200 pl-3">
          {children.map((child, childIndex) => (
            <div
              key={`${child.name}-${childIndex}`}
              className="rounded bg-white px-3 py-2"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-gray-800">
                  {child.name}
                </span>
                <span
                  className={`inline-flex rounded px-2 py-1 text-xs font-medium ${getFieldTypeColor(
                    child.type
                  )}`}
                >
                  {child.type}
                </span>
                {child.unique && (
                  <span className="inline-flex rounded bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800">
                    {t("Unique")}
                  </span>
                )}
                {child.isSearchable && (
                  <span className="inline-flex rounded bg-teal-100 px-2 py-1 text-xs font-medium text-teal-800">
                    {t("Searchable")}
                  </span>
                )}
              </div>
              {child.tag && (
                <p className="mt-1 text-xs text-gray-500">
                  {t("Tag")}: {child.tag}
                </p>
              )}
            </div>
          ))}
        </div>
      );
    },
    [getFieldTypeColor, t]
  );

  const handleAddField = useCallback(
    (field: Field) => {
      if (container?.id) {
        let updatedFields: Field[];

        if (editingField) {
          // Update existing field
          updatedFields = (container.fields || []).map((f) =>
            f.name === editingField.name ? field : f
          );
        } else {
          // Add new field
          updatedFields = [...(container.fields || []), field];
        }

        updateContainer({
          id: container.id,
          payload: {
            schemaName: container.schemaName,
            fields: updatedFields,
            routes: container.routes,
            redis: container.redis,
            populatedRoutes: container.populatedRoutes || [],
            indexes: container.indexes,
            rowAccess: container.rowAccess,
            isAuthContainer: container.isAuthContainer,
            isRegisterActive: container.isRegisterActive,
            isGoogleLoginActive: container.isGoogleLoginActive,
          },
        });
        setIsAddFieldModalOpen(false);
        setEditingField(null);
      }
    },
    [container, editingField, updateContainer]
  );

  const handleEditField = useCallback((field: Field) => {
    setEditingField(field);
    setIsAddFieldModalOpen(true);
  }, []);

  const handleDeleteField = useCallback((fieldName: string) => {
    setFieldToDelete(fieldName);
  }, []);

  const confirmDeleteField = useCallback(() => {
    if (container?.id && fieldToDelete) {
      const updatedFields = (container.fields || []).filter(
        (field) => field.name !== fieldToDelete
      );
      updateContainer({
        id: container.id,
        payload: {
          schemaName: container.schemaName,
          fields: updatedFields,
          routes: container.routes,
          redis: container.redis,
          populatedRoutes: container.populatedRoutes || [],
          indexes: container.indexes,
          rowAccess: container.rowAccess,
          isAuthContainer: container.isAuthContainer,
          isRegisterActive: container.isRegisterActive,
          isGoogleLoginActive: container.isGoogleLoginActive,
        },
      });
      setFieldToDelete(null);
    }
  }, [container, fieldToDelete, updateContainer]);

  const handleToggleRegisterActive = useCallback(() => {
    if (!container?.id || !container.isAuthContainer) return;

    updateContainer({
      id: container.id,
      payload: {
        schemaName: container.schemaName,
        fields: container.fields,
        routes: container.routes,
        redis: container.redis,
        populatedRoutes: container.populatedRoutes || [],
        indexes: container.indexes,
        rowAccess: container.rowAccess,
        isAuthContainer: container.isAuthContainer,
        isRegisterActive: !container.isRegisterActive,
        isGoogleLoginActive: container.isGoogleLoginActive,
      },
    });
  }, [container, updateContainer]);

  const handleToggleGoogleLoginActive = useCallback(() => {
    if (!container?.id || !container.isAuthContainer) return;

    const nextGoogleLoginActive = !container.isGoogleLoginActive;
    if (
      nextGoogleLoginActive &&
      !canEnableGoogleLogin(container.fields || [])
    ) {
      toast.error(t("Add an email field before enabling Google login."));
      return;
    }

    updateContainer({
      id: container.id,
      payload: {
        schemaName: container.schemaName,
        fields: container.fields,
        routes: container.routes,
        redis: container.redis,
        populatedRoutes: container.populatedRoutes || [],
        indexes: container.indexes,
        rowAccess: container.rowAccess,
        isAuthContainer: container.isAuthContainer,
        isRegisterActive: container.isRegisterActive,
        isGoogleLoginActive: nextGoogleLoginActive,
      },
    });
  }, [container, t, updateContainer]);

  const handleCreateAuthUser = useCallback(() => {
    if (!container?.isAuthContainer || !container.schemaName) return;
    const selectedRoleId = authUserRole || getRoleOptionId(roleOptions[0]);

    createAuthUser({
      schemaName: container.schemaName,
      payload: buildAuthUserPayload({
        values: authUserValues,
        roleFieldName: authUserRoleField?.name,
        role: selectedRoleId,
      }),
    });
    setAuthUserValues({});
    setAuthUserRole(getRoleOptionId(roleOptions[0]));
  }, [
    authUserRoleField?.name,
    authUserValues,
    authUserRole,
    container?.isAuthContainer,
    container?.schemaName,
    createAuthUser,
    getRoleOptionId,
    roleOptions,
  ]);

  const handleMoveFieldUp = useCallback(
    (index: number) => {
      if (!container?.id || index <= 0) return;

      const fields = [...(container.fields || [])];
      const currentField = fields[index];
      const previousField = fields[index - 1];

      // Swap order values
      const tempOrder = currentField.order ?? index;
      currentField.order = previousField.order ?? index - 1;
      previousField.order = tempOrder;

      // Swap positions in array
      fields[index] = previousField;
      fields[index - 1] = currentField;

      updateContainer({
        id: container.id,
        payload: {
          schemaName: container.schemaName,
          fields,
          routes: container.routes,
          redis: container.redis,
          populatedRoutes: container.populatedRoutes || [],
          indexes: container.indexes,
          rowAccess: container.rowAccess,
          isAuthContainer: container.isAuthContainer,
          isRegisterActive: container.isRegisterActive,
          isGoogleLoginActive: container.isGoogleLoginActive,
        },
      });
    },
    [container, updateContainer]
  );

  const handleMoveFieldDown = useCallback(
    (index: number) => {
      if (!container?.id || index >= (container.fields || []).length - 1)
        return;

      const fields = [...(container.fields || [])];
      const currentField = fields[index];
      const nextField = fields[index + 1];

      // Swap order values
      const tempOrder = currentField.order ?? index;
      currentField.order = nextField.order ?? index + 1;
      nextField.order = tempOrder;

      // Swap positions in array
      fields[index] = nextField;
      fields[index + 1] = currentField;

      updateContainer({
        id: container.id,
        payload: {
          schemaName: container.schemaName,
          fields,
          routes: container.routes,
          redis: container.redis,
          populatedRoutes: container.populatedRoutes || [],
          indexes: container.indexes,
          rowAccess: container.rowAccess,
          isAuthContainer: container.isAuthContainer,
          isRegisterActive: container.isRegisterActive,
          isGoogleLoginActive: container.isGoogleLoginActive,
        },
      });
    },
    [container, updateContainer]
  );

  // Pipeline management handlers
  const handleAddPipeline = useCallback(
    (pipeline: PipelineStage) => {
      if (container?.id) {
        let updatedPipelines: PipelineStage[];

        if (editingPipeline) {
          // Update existing pipeline
          updatedPipelines = (container.pipelines || []).map((p) =>
            p.name === editingPipeline.name ? pipeline : p
          );
        } else {
          // Add new pipeline
          updatedPipelines = [...(container.pipelines || []), pipeline];
        }

        updatePipelines({
          id: container.id,
          payload: { pipelines: updatedPipelines },
        });
        setIsAddPipelineModalOpen(false);
        setEditingPipeline(null);
      }
    },
    [container, editingPipeline, updatePipelines]
  );

  const handleEditPipeline = useCallback((pipeline: PipelineStage) => {
    setEditingPipeline(pipeline);
    setIsAddPipelineModalOpen(true);
  }, []);

  const handleDeletePipeline = useCallback((pipelineName: string) => {
    setPipelineToDelete(pipelineName);
  }, []);

  const confirmDeletePipeline = useCallback(() => {
    if (container?.id && pipelineToDelete) {
      const updatedPipelines = (container.pipelines || []).filter(
        (pipeline) => pipeline.name !== pipelineToDelete
      );
      updatePipelines({
        id: container.id,
        payload: { pipelines: updatedPipelines },
      });
      setPipelineToDelete(null);
    }
  }, [container, pipelineToDelete, updatePipelines]);

  const containerJson = useMemo(
    () => JSON.stringify(container, null, 2),
    [container]
  );

  if (!isOpen || !container) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-7xl sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {container.schemaName}
              </h3>
              <div className="flex items-center space-x-2">
                <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                  {container.id}
                </span>
                {container.isAuthContainer && (
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">
                    {t("Auth Container")}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("structured")}
                  className={`flex items-center space-x-1 px-3 py-1 text-xs font-medium rounded ${
                    viewMode === "structured"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <FiList size={12} />
                  <span>{t("Structured")}</span>
                </button>
                <button
                  onClick={() => setViewMode("pipelines")}
                  className={`flex items-center space-x-1 px-3 py-1 text-xs font-medium rounded ${
                    viewMode === "pipelines"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <FiGitBranch size={12} />
                  <span>{t("Pipelines")}</span>
                </button>
                <button
                  onClick={() => setViewMode("permissions")}
                  className={`flex items-center space-x-1 px-3 py-1 text-xs font-medium rounded ${
                    viewMode === "permissions"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <FiShield size={12} />
                  <span>{t("Permissions")}</span>
                </button>
                <button
                  onClick={() => setViewMode("routes")}
                  className={`flex items-center space-x-1 px-3 py-1 text-xs font-medium rounded ${
                    viewMode === "routes"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <FiCode size={12} />
                  <span>{t("Routes")}</span>
                </button>
                <button
                  onClick={() => setViewMode("json")}
                  className={`flex items-center space-x-1 px-3 py-1 text-xs font-medium rounded ${
                    viewMode === "json"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <FiCode size={12} />
                  <span>{t("JSON")}</span>
                </button>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div
            className={
              viewMode === "permissions" ||
              viewMode === "routes" ||
              viewMode === "pipelines"
                ? "h-[70vh]"
                : "max-h-[70vh] overflow-y-auto"
            }
          >
            {viewMode === "permissions" ? (
              <FieldPermissions containerId={container.id} />
            ) : viewMode === "routes" ? (
              <RoutePermissions containerId={container.id} />
            ) : viewMode === "pipelines" ? (
              <div className="space-y-4 h-full overflow-y-auto">
                {/* Pipelines Header */}
                <div className="flex items-center justify-between sticky top-0 bg-white pb-4 border-b">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {t("Pipelines")} ({(container.pipelines || []).length})
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {t(
                        "Manage MongoDB aggregation pipelines for this container"
                      )}
                    </p>
                  </div>
                  <GenericButton
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAddPipelineModalOpen(true)}
                    iconLeft={<FiPlus size={12} />}
                    disabled={isPipelinesUpdating}
                  >
                    {t("Add Pipeline")}
                  </GenericButton>
                </div>

                {/* Pipelines List */}
                <div className="space-y-3">
                  {(container.pipelines || []).map((pipeline, index) => (
                    <div
                      key={pipeline.name || index}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-gray-900">
                              {pipeline.name}
                            </span>
                            {pipeline.isActive ? (
                              <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded bg-green-100 text-green-800">
                                {t("Active")}
                              </span>
                            ) : (
                              <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-800">
                                {t("Inactive")}
                              </span>
                            )}
                            {pipeline.isRedisCached && (
                              <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded bg-blue-100 text-blue-800">
                                {t("Cached")} ({pipeline.cacheTime}s)
                              </span>
                            )}
                            {pipeline.isAuthenticated && (
                              <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded bg-purple-100 text-purple-800">
                                {t("Auth Required")}
                              </span>
                            )}
                            {pipeline.isAuthorized && (
                              <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded bg-orange-100 text-orange-800">
                                {t("Role Check")}
                              </span>
                            )}
                          </div>

                          {/* Pipeline JSON Preview */}
                          <div className="mt-2">
                            <details className="text-xs">
                              <summary className="cursor-pointer text-gray-600 hover:text-gray-900 font-medium">
                                {t("View Pipeline JSON")}
                              </summary>
                              <pre className="mt-2 p-3 bg-gray-900 text-green-400 rounded overflow-x-auto text-xs">
                                {pipeline.pipelineJson}
                              </pre>
                            </details>
                          </div>

                          {/* Roles */}
                          {pipeline.isAuthorized &&
                            pipeline.authorizeRole &&
                            pipeline.authorizeRole.length > 0 && (
                              <div className="mt-2">
                                <span className="text-xs text-gray-500">
                                  {t("Allowed Roles")}:{" "}
                                </span>
                                <span className="text-xs text-gray-700">
                                  {pipeline.authorizeRole.join(", ")}
                                </span>
                              </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 ml-4">
                          <GenericButton
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditPipeline(pipeline)}
                            iconLeft={<FiEdit size={10} />}
                            disabled={isPipelinesUpdating}
                          >
                            {t("Edit")}
                          </GenericButton>
                          <GenericButton
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeletePipeline(pipeline.name)}
                            iconLeft={<FiTrash2 size={10} />}
                            disabled={isPipelinesUpdating}
                          >
                            {t("Delete")}
                          </GenericButton>
                        </div>
                      </div>
                    </div>
                  ))}

                  {(!container.pipelines ||
                    container.pipelines.length === 0) && (
                    <div className="text-center py-12 text-gray-500">
                      <FiGitBranch
                        size={48}
                        className="mx-auto mb-4 text-gray-300"
                      />
                      <p className="mb-2">
                        {t("No pipelines defined for this container")}
                      </p>
                      <GenericButton
                        variant="outline"
                        size="sm"
                        onClick={() => setIsAddPipelineModalOpen(true)}
                        iconLeft={<FiPlus size={12} />}
                        className="mt-2"
                      >
                        {t("Add Your First Pipeline")}
                      </GenericButton>
                    </div>
                  )}
                </div>
              </div>
            ) : viewMode === "structured" ? (
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    {t("Container Information")}
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">{t("Schema Name")}:</span>
                      <span className="ml-2 font-medium">
                        {container.schemaName}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">
                        {t("Container ID")}:
                      </span>
                      <span className="ml-2 font-mono text-xs">
                        {container.id}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">
                        {t("Collection Name")}:
                      </span>
                      <span className="ml-2 font-mono text-xs">
                        {container.collectionName || "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">
                        {t("Auth Container")}:
                      </span>
                      <span className="ml-2">
                        {container.isAuthContainer ? t("Yes") : t("No")}
                      </span>
                    </div>
                    {container.isAuthContainer && (
                      <div className="space-y-4 rounded-lg border border-green-200 bg-green-50 p-4 md:col-span-2">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <label className="flex items-center justify-between rounded-md bg-white px-3 py-2 text-sm">
                            <span className="text-gray-600">
                              {t("Registration Active")}
                            </span>
                            <CheckSwitch
                              checked={container.isRegisterActive || false}
                              onChange={handleToggleRegisterActive}
                            />
                          </label>
                          <label className="flex items-center justify-between rounded-md bg-white px-3 py-2 text-sm">
                            <span className="text-gray-600">
                              {t("Google Login Active")}
                            </span>
                            <CheckSwitch
                              checked={container.isGoogleLoginActive || false}
                              onChange={handleToggleGoogleLoginActive}
                            />
                          </label>
                        </div>

                        <div className="rounded-md bg-white p-3">
                          <div className="mb-3">
                            <h4 className="text-sm font-semibold text-gray-900">
                              {t("Create auth user")}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {t("Creates a user in this project's auth container.")}
                            </p>
                          </div>
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
                            {authUserFormFields.map((field) => {
                              const fieldName = field.name;
                              const lowerFieldName = fieldName.toLowerCase();
                              const inputType =
                                field.isHashed || lowerFieldName.includes("password")
                                  ? "password"
                                  : field.type === "number" || field.type === "int"
                                    ? "number"
                                    : "text";

                              return (
                                <input
                                  key={fieldName}
                                  value={authUserValues[fieldName] || ""}
                                  onChange={(event) =>
                                    setAuthUserValues((current) => ({
                                      ...current,
                                      [fieldName]: event.target.value,
                                    }))
                                  }
                                  placeholder={t(fieldName)}
                                  type={inputType}
                                  className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                                />
                              );
                            })}
                            {authUserRoleField && (
                              <select
                                value={authUserRole || getRoleOptionId(roleOptions[0])}
                                onChange={(event) => setAuthUserRole(event.target.value)}
                                className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                              >
                                {roleOptions.length > 0 ? (
                                  roleOptions.map((role) => (
                                  <option key={getRoleOptionId(role)} value={getRoleOptionId(role)}>
                                    {role.name || "admin"}
                                  </option>
                                  ))
                                ) : (
                                  <option value="">
                                    {t("No roles found")}
                                  </option>
                                )}
                              </select>
                            )}
                            <GenericButton
                              size="sm"
                              onClick={handleCreateAuthUser}
                              disabled={
                                isCreatingAuthUser ||
                                authUserFormFields.length === 0 ||
                                (!!authUserRoleField && !roleOptions.length) ||
                                authUserFormFields.some(
                                  (field) =>
                                    (field.tag === "required" || field.isLoginCredential) &&
                                    !authUserValues[field.name]?.trim(),
                                )
                              }
                            >
                              {t("Create User")}
                            </GenericButton>
                          </div>
                        </div>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-500">
                        {t("Total Fields")}:
                      </span>
                      <span className="ml-2 font-medium">
                        {(container.fields || []).length}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">
                        {t("Redis Cached")}:
                      </span>
                      <span className="ml-2">
                        {container.redis?.isRedisCached ? t("Yes") : t("No")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Fields */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-900">
                      {t("Fields")} ({(container.fields || []).length})
                    </h4>
                    <GenericButton
                      variant="outline"
                      size="sm"
                      onClick={() => setIsAddFieldModalOpen(true)}
                      iconLeft={<FiPlus size={12} />}
                      disabled={isUpdating}
                    >
                      {t("Add Field")}
                    </GenericButton>
                  </div>
                  <div className="space-y-2">
                    {(container.fields || []).map((field, index) => (
                      <div
                        key={field.name || index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">
                              {field.name}
                            </span>
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getFieldTypeColor(
                                field.type
                              )}`}
                            >
                              {field.type}
                            </span>
                            {field.unique && (
                              <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-indigo-100 text-indigo-800">
                                {t("Unique")}
                              </span>
                            )}
                            {field.isSearchable && (
                              <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-teal-100 text-teal-800">
                                {t("Searchable")}
                              </span>
                            )}
                          </div>
                          {field.tag && (
                            <p className="text-xs text-gray-500 mt-1">
                              {t("Tag")}: {field.tag}
                            </p>
                          )}
                          {field.objectSchemaName && (
                            <p className="text-xs text-gray-500 mt-1">
                              {t("Object Schema")}: {field.objectSchemaName}
                            </p>
                          )}
                          {renderChildFields(field.children || [])}
                        </div>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleMoveFieldUp(index)}
                            disabled={index === 0 || isUpdating}
                            className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            title={t("Move Up")}
                          >
                            <FiChevronUp size={16} />
                          </button>
                          <button
                            onClick={() => handleMoveFieldDown(index)}
                            disabled={
                              index === (container.fields || []).length - 1 ||
                              isUpdating
                            }
                            className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            title={t("Move Down")}
                          >
                            <FiChevronDown size={16} />
                          </button>
                          <GenericButton
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditField(field)}
                            iconLeft={<FiEdit size={10} />}
                            disabled={isUpdating}
                          >
                            {t("Edit")}
                          </GenericButton>
                          <GenericButton
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteField(field.name)}
                            iconLeft={<FiTrash2 size={10} />}
                            disabled={isUpdating}
                          >
                            {t("Delete")}
                          </GenericButton>
                        </div>
                      </div>
                    ))}

                    {(!container.fields || container.fields.length === 0) && (
                      <div className="text-center py-8 text-gray-500">
                        <p>{t("No fields defined for this container")}</p>
                        <GenericButton
                          variant="outline"
                          size="sm"
                          onClick={() => setIsAddFieldModalOpen(true)}
                          iconLeft={<FiPlus size={12} />}
                          className="mt-2"
                        >
                          {t("Add Your First Field")}
                        </GenericButton>
                      </div>
                    )}
                  </div>
                </div>

                {/* Routes Information */}
                {container.routes && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">
                      {t("Available Routes")}
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(container.routes).map(
                        ([routeName, routeSpec]) => (
                          <div
                            key={routeName}
                            className={`p-2 rounded ${
                              routeSpec.isActive
                                ? "bg-green-50 text-green-800"
                                : "bg-red-50 text-red-800"
                            }`}
                          >
                            <span className="font-medium">
                              {routeName.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                            {routeSpec.isAuthenticated && (
                              <span className="ml-1 text-xs">🔒</span>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Redis Configuration */}
                {container.redis && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">
                      {t("Redis Configuration")}
                    </h4>
                    <div className="text-sm space-y-1">
                      <div>
                        <span className="text-gray-600">{t("Cached")}:</span>
                        <span className="ml-2">
                          {container.redis.isRedisCached ? t("Yes") : t("No")}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">
                          {t("Cache Time")}:
                        </span>
                        <span className="ml-2">
                          {container.redis.cacheTime}s
                        </span>
                      </div>
                      {container.redis.triggeredRedisCaches && (
                        <div>
                          <span className="text-gray-600">
                            {t("Triggered Caches")}:
                          </span>
                          <span className="ml-2">
                            {container.redis.triggeredRedisCaches.join(", ")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* JSON View */
              <div className="relative">
                <div className="absolute top-2 right-2">
                  <GenericButton
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(containerJson)}
                    iconLeft={<FiCopy size={12} />}
                  >
                    {t("Copy")}
                  </GenericButton>
                </div>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap">
                  {containerJson}
                </pre>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end space-x-3">
            <GenericButton variant="outline" onClick={onClose}>
              {t("Close")}
            </GenericButton>
            <GenericButton
              onClick={() => copyToClipboard(containerJson)}
              iconLeft={<FiCopy size={16} />}
            >
              {t("Copy JSON")}
            </GenericButton>
          </div>
        </div>
      </div>

      {/* Add Field Modal */}
      <AddFieldModal
        isOpen={isAddFieldModalOpen}
        onClose={() => {
          setIsAddFieldModalOpen(false);
          setEditingField(null);
        }}
        onAddField={handleAddField}
        containerFields={container?.fields || []}
        editField={editingField}
      />

      {/* Add/Edit Pipeline Modal */}
      <AddPipelineModal
        isOpen={isAddPipelineModalOpen}
        onClose={() => {
          setIsAddPipelineModalOpen(false);
          setEditingPipeline(null);
        }}
        onAddPipeline={handleAddPipeline}
        editPipeline={editingPipeline}
      />

      {/* Delete Field Confirmation */}
      <ConfirmationDialog
        isOpen={!!fieldToDelete}
        close={() => setFieldToDelete(null)}
        confirm={confirmDeleteField}
        title={t("Delete Field")}
        text={t(
          "Are you sure you want to delete this field? This action cannot be undone."
        )}
      />

      {/* Delete Pipeline Confirmation */}
      <ConfirmationDialog
        isOpen={!!pipelineToDelete}
        close={() => setPipelineToDelete(null)}
        confirm={confirmDeletePipeline}
        title={t("Delete Pipeline")}
        text={t(
          "Are you sure you want to delete this pipeline? This action cannot be undone."
        )}
      />
    </div>
  );
};
