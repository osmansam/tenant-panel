import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiCode,
  FiCopy,
  FiEdit,
  FiGitBranch,
  FiGlobe,
  FiList,
  FiMoreHorizontal,
  FiPlayCircle,
  FiPlus,
  FiShield,
  FiTrash2,
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
  DynamicApiModel,
  DynamicWorkflow,
  Field,
  PipelineStage,
  useCreateProjectAuthUser,
  useUpdateContainer,
  useUpdateDynamicApis,
  useUpdatePipelines,
  useUpdateWorkflows,
} from "../../../utils/api/container";
import FieldPermissions from "../../FieldPermissions";
import RoutePermissions from "../../RoutePermissions";
import { getContainerDetailsContentClass } from "../../../utils/containerDetailsModalLayout";
import {
  canReorderFilteredFields,
  filterContainerFields,
} from "../../../utils/containerFieldView";
import {
  addMissingSystemTimestampFields,
  hasAllSystemTimestampFields,
} from "../../../utils/containerTimestamps";
import { GenericButton } from "../FormElements/GenericButton";
import {
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tabs,
  TabsList,
  TabsTrigger,
  WorkspaceDialog,
} from "../../ui";
import { AddDynamicApiModal } from "./AddDynamicApiModal";
import { AddFieldModal } from "./AddFieldModal";
import { AddPipelineModal } from "./AddPipelineModal";
import { AddWorkflowModal } from "./AddWorkflowModal";

export type ContainerDialogSection =
  | "structured"
  | "pipelines"
  | "workflows"
  | "apis"
  | "permissions"
  | "routes"
  | "json";

interface ContainerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  container: ContainerModel | null;
  intent?: "details" | "manage";
  initialSection?: ContainerDialogSection;
  focusArea?: "summary" | "fields";
}

export const ContainerDetailsModal: React.FC<ContainerDetailsModalProps> = ({
  isOpen,
  onClose,
  container,
  intent = "details",
  initialSection = "structured",
  focusArea = "summary",
}) => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<ContainerDialogSection>(initialSection);
  const [fieldQuery, setFieldQuery] = useState("");
  const fieldsSectionRef = useRef<HTMLDivElement>(null);
  const dialogContextKey = isOpen
    ? `${container?.id || "unknown"}:${intent}:${initialSection}:${focusArea}`
    : "closed";
  const [activeDialogContextKey, setActiveDialogContextKey] = useState(dialogContextKey);
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
  const [isAddWorkflowModalOpen, setIsAddWorkflowModalOpen] = useState(false);
  const [editingWorkflow, setEditingWorkflow] =
    useState<DynamicWorkflow | null>(null);
  const [workflowToDelete, setWorkflowToDelete] = useState<string | null>(null);
  const [isAddDynamicApiModalOpen, setIsAddDynamicApiModalOpen] =
    useState(false);
  const [editingDynamicApi, setEditingDynamicApi] =
    useState<DynamicApiModel | null>(null);
  const [dynamicApiToDelete, setDynamicApiToDelete] = useState<string | null>(
    null
  );

  const { updateContainer, updateContainerAsync, isUpdating } = useUpdateContainer();
  const { updatePipelines, isUpdating: isPipelinesUpdating } =
    useUpdatePipelines();
  const { updateWorkflows, updateWorkflowsAsync, isUpdating: isWorkflowsUpdating } =
    useUpdateWorkflows();
  const { updateDynamicApis, isUpdating: isDynamicApisUpdating } =
    useUpdateDynamicApis();
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
  const areSystemTimestampsConfigured = useMemo(
    () => hasAllSystemTimestampFields(container?.fields || []),
    [container?.fields]
  );
  const visibleFields = useMemo(
    () => filterContainerFields(container?.fields || [], fieldQuery),
    [container?.fields, fieldQuery],
  );
  const fieldReorderingEnabled = canReorderFilteredFields(fieldQuery);
  const { createAuthUser, isCreatingAuthUser } = useCreateProjectAuthUser();

  if (activeDialogContextKey !== dialogContextKey) {
    setActiveDialogContextKey(dialogContextKey);
    if (isOpen) {
      setViewMode(initialSection);
      setFieldQuery("");
    }
  }

  useEffect(() => {
    if (!isOpen || focusArea !== "fields") return;

    const frame = window.requestAnimationFrame(() => {
      fieldsSectionRef.current?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [dialogContextKey, focusArea, isOpen]);

  const buildContainerUpdatePayload = useCallback(
    (overrides: Partial<ContainerModel> = {}) => {
      if (!container) return overrides;

      return {
        schemaName: container.schemaName,
        fields: container.fields,
        routes: container.routes,
        redis: container.redis,
        populatedRoutes: container.populatedRoutes || [],
        indexes: container.indexes,
        rowAccess: container.rowAccess,
        workflows: container.workflows || [],
        dynamicFunctions: container.dynamicFunctions || [],
        dynamicApis: container.dynamicApis || [],
        frontend: container.frontend,
        isAuthContainer: container.isAuthContainer,
        isRegisterActive: container.isRegisterActive,
        isGoogleLoginActive: container.isGoogleLoginActive,
        ...overrides,
      };
    },
    [container]
  );

  const copyToClipboard = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text);
      toast.success(t("Copied to clipboard"));
    },
    [t]
  );

  const getFieldTypeColor = useCallback((type: string) => {
    const colors = {
      string: "info",
      int: "success",
      boolean: "neutral",
      date: "warning",
      array: "warning",
      object: "danger",
    };
    return (
      colors[type.toLowerCase() as keyof typeof colors] ||
      "neutral"
    ) as "info" | "success" | "warning" | "danger" | "neutral";
  }, []);

  const renderChildFields = useCallback(
    (children: Field[] = []) => {
      if (!children.length) return null;

      return (
        <div className="mt-3 space-y-2 border-l-2 border-ui-border pl-3">
          {children.map((child, childIndex) => (
            <div
              key={`${child.name}-${childIndex}`}
              className="rounded-ui-sm bg-ui-surface px-3 py-2"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-ui-foreground">
                  {child.name}
                </span>
                <Badge variant={getFieldTypeColor(child.type)}>
                  {child.type}
                </Badge>
                {child.unique && (
                  <Badge variant="info">
                    {t("Unique")}
                  </Badge>
                )}
                {child.isSearchable && (
                  <Badge variant="success">
                    {t("Searchable")}
                  </Badge>
                )}
              </div>
              {child.tag && (
                <p className="mt-1 text-xs text-ui-muted">
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
    async (field: Field) => {
      if (!container?.id) return false;

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

      try {
        await updateContainerAsync({
          id: container.id,
          payload: buildContainerUpdatePayload({ fields: updatedFields }),
        });
        setIsAddFieldModalOpen(false);
        setEditingField(null);
        return true;
      } catch {
        return false;
      }
    },
    [buildContainerUpdatePayload, container, editingField, updateContainerAsync]
  );

  const handleEditField = useCallback((field: Field) => {
    setEditingField(field);
    setIsAddFieldModalOpen(true);
  }, []);

  const handleDeleteField = useCallback((fieldName: string) => {
    setFieldToDelete(fieldName);
  }, []);

  const handleAddSystemTimestamps = useCallback(() => {
    if (!container?.id) return;

    const fields = addMissingSystemTimestampFields(container.fields || []);
    updateContainer({
      id: container.id,
      payload: buildContainerUpdatePayload({ fields }),
    });
  }, [buildContainerUpdatePayload, container, updateContainer]);

  const confirmDeleteField = useCallback(() => {
    if (container?.id && fieldToDelete) {
      const updatedFields = (container.fields || []).filter(
        (field) => field.name !== fieldToDelete
      );
      updateContainer({
        id: container.id,
        payload: buildContainerUpdatePayload({ fields: updatedFields }),
      });
      setFieldToDelete(null);
    }
  }, [buildContainerUpdatePayload, container, fieldToDelete, updateContainer]);

  const handleToggleRegisterActive = useCallback(() => {
    if (!container?.id || !container.isAuthContainer) return;

    updateContainer({
      id: container.id,
      payload: buildContainerUpdatePayload({
        isRegisterActive: !container.isRegisterActive,
      }),
    });
  }, [buildContainerUpdatePayload, container, updateContainer]);

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
      payload: buildContainerUpdatePayload({
        isGoogleLoginActive: nextGoogleLoginActive,
      }),
    });
  }, [buildContainerUpdatePayload, container, t, updateContainer]);

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
        payload: buildContainerUpdatePayload({ fields }),
      });
    },
    [buildContainerUpdatePayload, container, updateContainer]
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
        payload: buildContainerUpdatePayload({ fields }),
      });
    },
    [buildContainerUpdatePayload, container, updateContainer]
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

  const handleAddWorkflow = useCallback(
    async (workflow: DynamicWorkflow) => {
      if (!container?.id) return false;

      const currentWorkflows = container.workflows || [];
      if (
        !editingWorkflow &&
        currentWorkflows.some((existing) => existing.name === workflow.name)
      ) {
        toast.error(t("A workflow with this name already exists"));
        return false;
      }

      const updatedWorkflows = editingWorkflow
        ? currentWorkflows.map((existing) =>
            existing.name === editingWorkflow.name ? workflow : existing
          )
        : [...currentWorkflows, workflow];

      try {
        await updateWorkflowsAsync({
          id: container.id,
          payload: { Workflows: updatedWorkflows },
        });
        setIsAddWorkflowModalOpen(false);
        setEditingWorkflow(null);
        return true;
      } catch {
        return false;
      }
    },
    [container, editingWorkflow, t, updateWorkflowsAsync]
  );

  const handleEditWorkflow = useCallback((workflow: DynamicWorkflow) => {
    setEditingWorkflow(workflow);
    setIsAddWorkflowModalOpen(true);
  }, []);

  const handleDeleteWorkflow = useCallback((workflowName: string) => {
    setWorkflowToDelete(workflowName);
  }, []);

  const confirmDeleteWorkflow = useCallback(() => {
    if (!container?.id || !workflowToDelete) return;

    updateWorkflows({
      id: container.id,
      payload: {
        Workflows: (container.workflows || []).filter(
          (workflow) => workflow.name !== workflowToDelete
        ),
      },
    });
    setWorkflowToDelete(null);
  }, [container, updateWorkflows, workflowToDelete]);

  const handleAddDynamicApi = useCallback(
    (dynamicApi: DynamicApiModel) => {
      if (!container?.id) return false;

      const currentDynamicApis = container.dynamicApis || [];
      if (
        !editingDynamicApi &&
        currentDynamicApis.some((api) => api.name === dynamicApi.name)
      ) {
        toast.error(t("A Dynamic API with this name already exists"));
        return false;
      }

      const updatedDynamicApis = editingDynamicApi
        ? currentDynamicApis.map((api) =>
            api.name === editingDynamicApi.name ? dynamicApi : api
          )
        : [...currentDynamicApis, dynamicApi];

      updateDynamicApis({
        id: container.id,
        payload: { dynamicApis: updatedDynamicApis },
      });
      setIsAddDynamicApiModalOpen(false);
      setEditingDynamicApi(null);
      return true;
    },
    [container, editingDynamicApi, t, updateDynamicApis]
  );

  const handleEditDynamicApi = useCallback((dynamicApi: DynamicApiModel) => {
    setEditingDynamicApi(dynamicApi);
    setIsAddDynamicApiModalOpen(true);
  }, []);

  const handleDeleteDynamicApi = useCallback((dynamicApiName: string) => {
    setDynamicApiToDelete(dynamicApiName);
  }, []);

  const confirmDeleteDynamicApi = useCallback(() => {
    if (!container?.id || !dynamicApiToDelete) return;

    const updatedDynamicApis = (container.dynamicApis || []).filter(
      (dynamicApi) => dynamicApi.name !== dynamicApiToDelete
    );
    updateDynamicApis({
      id: container.id,
      payload: { dynamicApis: updatedDynamicApis },
    });
    setDynamicApiToDelete(null);
  }, [container, dynamicApiToDelete, updateDynamicApis]);

  const containerJson = useMemo(
    () => JSON.stringify(container, null, 2),
    [container]
  );

  if (!isOpen || !container) return null;

  return (
    <>
      <WorkspaceDialog
        open={isOpen}
        onClose={onClose}
        size="large"
        title={
          intent === "manage"
            ? t("Manage {{schemaName}}", { schemaName: container.schemaName })
            : container.schemaName
        }
        description={
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="info" className="font-mono">
              {container.id}
            </Badge>
            {container.isAuthContainer && (
              <Badge variant="success">
                {t("Auth Container")}
              </Badge>
            )}
          </div>
        }
        closeLabel={t("Close container")}
        bodyClassName="p-0 sm:p-0"
        footer={
          <div className="flex justify-end gap-3">
            <GenericButton variant="outline" size="sm" onClick={onClose}>
              {t("Close")}
            </GenericButton>
            <GenericButton
              size="sm"
              onClick={() => copyToClipboard(containerJson)}
              iconLeft={<FiCopy size={16} />}
            >
              {t("Copy JSON")}
            </GenericButton>
          </div>
        }
      >
        <div className="sticky top-0 z-10 border-b border-ui-border bg-ui-surface px-4 sm:px-6">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as ContainerDialogSection)}>
            <TabsList className="border-b-0">
              {([
                ["structured", t("Structured"), FiList],
                ["pipelines", t("Pipelines"), FiGitBranch],
                ["workflows", t("Workflows"), FiPlayCircle],
                ["apis", t("Dynamic APIs"), FiGlobe],
                ["permissions", t("Permissions"), FiShield],
                ["routes", t("Routes"), FiCode],
                ["json", t("JSON"), FiCode],
              ] as const).map(([value, label, Icon]) => (
                <TabsTrigger key={value} value={value} className="flex h-11 items-center gap-1.5 px-3 text-xs">
                  <Icon size={13} aria-hidden="true" />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="p-4 sm:p-5">
          <div className={getContainerDetailsContentClass(viewMode)}>
            {viewMode === "permissions" ? (
              <FieldPermissions containerId={container.id} />
            ) : viewMode === "routes" ? (
              <RoutePermissions containerId={container.id} />
            ) : viewMode === "pipelines" ? (
              <div className="space-y-4 h-full overflow-y-auto">
                {/* Pipelines Header */}
                <div className="flex items-center justify-between sticky top-0 bg-ui-surface pb-4 border-b">
                  <div>
                    <h4 className="text-sm font-medium text-ui-foreground">
                      {t("Pipelines")} ({(container.pipelines || []).length})
                    </h4>
                    <p className="text-xs text-ui-muted mt-1">
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
                      className="bg-ui-surface-subtle rounded-ui-md p-4 hover:bg-ui-surface-subtle transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-ui-foreground">
                              {pipeline.name}
                            </span>
                            {pipeline.isActive ? (
                              <Badge variant="success">
{t("Active")}
</Badge>
                            ) : (
                              <Badge variant="neutral">
{t("Inactive")}
</Badge>
                            )}
                            {pipeline.isRedisCached && (
                              <Badge variant="info">
{t("Cached")} ({pipeline.cacheTime}s)
</Badge>
                            )}
                            {pipeline.isAuthenticated && (
                              <Badge variant="warning">
{t("Auth Required")}
</Badge>
                            )}
                            {pipeline.isAuthorized && (
                              <Badge variant="warning">
{t("Role Check")}
</Badge>
                            )}
                          </div>

                          {/* Pipeline JSON Preview */}
                          <div className="mt-2">
                            <details className="text-xs">
                              <summary className="cursor-pointer text-ui-muted hover:text-ui-foreground font-medium">
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
                                <span className="text-xs text-ui-muted">
                                  {t("Allowed Roles")}:{" "}
                                </span>
                                <span className="text-xs text-ui-foreground">
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
                    <div className="text-center py-12 text-ui-muted">
                      <FiGitBranch
                        size={48}
                        className="mx-auto mb-4 text-ui-placeholder"
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
            ) : viewMode === "workflows" ? (
              <div className="space-y-4 h-full overflow-y-auto">
                <div className="flex items-center justify-between sticky top-0 bg-ui-surface pb-4 border-b">
                  <div>
                    <h4 className="text-sm font-medium text-ui-foreground">
                      {t("Workflows")} ({(container.workflows || []).length})
                    </h4>
                    <p className="text-xs text-ui-muted mt-1">
                      {t("Manage workflow definitions and access controls for this container")}
                    </p>
                  </div>
                  <GenericButton
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAddWorkflowModalOpen(true)}
                    iconLeft={<FiPlus size={12} />}
                    disabled={isWorkflowsUpdating}
                  >
                    {t("Add Workflow")}
                  </GenericButton>
                </div>

                <div className="space-y-3">
                  {(container.workflows || []).map((workflow, index) => (
                    <div
                      key={workflow.name || index}
                      className="bg-ui-surface-subtle rounded-ui-md p-4 hover:bg-ui-surface-subtle transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span className="font-medium text-ui-foreground">{workflow.name}</span>
                            <Badge variant={workflow.isActive ? "success" : "neutral"}>
                              {workflow.isActive ? t("Active") : t("Inactive")}
                            </Badge>
                            <Badge variant="info">
{workflow.trigger || "manual"}
</Badge>
                            <Badge variant="neutral">
{workflow.mode || "transactional"}
</Badge>
                            {workflow.isAuthenticated && (
                              <Badge variant="warning">
{t("Auth Required")}
</Badge>
                            )}
                            {workflow.isAuthorized && (
                              <Badge variant="warning">
{t("Role Check")}
</Badge>
                            )}
                            {!!workflow.outputFields?.length && (
                              <Badge variant="info">
{workflow.outputFields.length} {t("Output Fields")}
</Badge>
                            )}
                          </div>

                          {workflow.description && (
                            <p className="mb-2 text-xs text-ui-muted">{workflow.description}</p>
                          )}

                          <details className="text-xs">
                            <summary className="cursor-pointer font-medium text-ui-muted hover:text-ui-foreground">
                              {t("View Workflow JSON")}
                            </summary>
                            <pre className="mt-2 overflow-x-auto rounded bg-gray-900 p-3 text-xs text-green-400">
                              {JSON.stringify(
                                {
                                  payload: workflow.payload || {},
                                  conditions: workflow.conditions || [],
                                  steps: workflow.steps || [],
                                },
                                null,
                                2
                              )}
                            </pre>
                          </details>

                          {workflow.isAuthorized &&
                            workflow.authorizeRole &&
                            workflow.authorizeRole.length > 0 && (
                              <div className="mt-2">
                                <span className="text-xs text-ui-muted">
                                  {t("Allowed Roles")}: {" "}
                                </span>
                                <span className="text-xs text-ui-foreground">
                                  {workflow.authorizeRole.join(", ")}
                                </span>
                              </div>
                            )}
                        </div>

                        <div className="ml-4 flex items-center space-x-2">
                          <GenericButton
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditWorkflow(workflow)}
                            iconLeft={<FiEdit size={10} />}
                            disabled={isWorkflowsUpdating}
                          >
                            {t("Edit")}
                          </GenericButton>
                          <GenericButton
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteWorkflow(workflow.name)}
                            iconLeft={<FiTrash2 size={10} />}
                            disabled={isWorkflowsUpdating}
                          >
                            {t("Delete")}
                          </GenericButton>
                        </div>
                      </div>
                    </div>
                  ))}

                  {(!container.workflows || container.workflows.length === 0) && (
                    <div className="py-12 text-center text-ui-muted">
                      <FiPlayCircle size={48} className="mx-auto mb-4 text-ui-placeholder" />
                      <p className="mb-2">{t("No workflows defined for this container")}</p>
                      <GenericButton
                        variant="outline"
                        size="sm"
                        onClick={() => setIsAddWorkflowModalOpen(true)}
                        iconLeft={<FiPlus size={12} />}
                        className="mt-2"
                      >
                        {t("Add Your First Workflow")}
                      </GenericButton>
                    </div>
                  )}
                </div>
              </div>
            ) : viewMode === "apis" ? (
              <div className="h-full space-y-4 overflow-y-auto">
                <div className="sticky top-0 flex items-center justify-between border-b bg-ui-surface pb-4">
                  <div>
                    <h4 className="text-sm font-medium text-ui-foreground">
                      {t("Dynamic APIs")} ({(container.dynamicApis || []).length})
                    </h4>
                    <p className="mt-1 text-xs text-ui-muted">
                      {t("Manage outbound or proxy APIs for this container")}
                    </p>
                  </div>
                  <GenericButton
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAddDynamicApiModalOpen(true)}
                    iconLeft={<FiPlus size={12} />}
                    disabled={isDynamicApisUpdating}
                  >
                    {t("Add API")}
                  </GenericButton>
                </div>

                <div className="space-y-3">
                  {(container.dynamicApis || []).map((dynamicApi, index) => (
                    <div
                      key={dynamicApi.name || index}
                      className="rounded-ui-md bg-ui-surface-subtle p-4 transition-colors hover:bg-ui-surface-subtle"
                    >
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span className="font-medium text-ui-foreground">
                              {dynamicApi.name}
                            </span>
                            <span className="inline-flex rounded bg-ui-surface-subtle px-2 py-0.5 font-mono text-xs font-medium text-ui-foreground">
                              {dynamicApi.method || "GET"}
                            </span>
                            {dynamicApi.isActive ? (
                              <Badge variant="success">
                                {t("Active")}
                              </Badge>
                            ) : (
                              <Badge variant="neutral">
                                {t("Inactive")}
                              </Badge>
                            )}
                            {dynamicApi.isRedisCached && (
                              <Badge variant="info">
                                {t("Cached")} ({dynamicApi.cacheTime}s)
                              </Badge>
                            )}
                            {dynamicApi.isAuthenticated && (
                              <Badge variant="warning">
                                {t("Auth Required")}
                              </Badge>
                            )}
                            {dynamicApi.isAuthorized && (
                              <Badge variant="warning">
                                {t("Role Check")}
                              </Badge>
                            )}
                          </div>

                          <p className="break-all font-mono text-xs text-ui-muted">
                            {dynamicApi.url}
                          </p>

                          {!!dynamicApi.dependencies?.length && (
                            <div className="mt-2">
                              <span className="text-xs text-ui-muted">
                                {t("Dependencies")}:{" "}
                              </span>
                              <span className="text-xs text-ui-foreground">
                                {dynamicApi.dependencies.join(", ")}
                              </span>
                            </div>
                          )}

                          {dynamicApi.isAuthorized &&
                            dynamicApi.authorizeRole &&
                            dynamicApi.authorizeRole.length > 0 && (
                              <div className="mt-2">
                                <span className="text-xs text-ui-muted">
                                  {t("Allowed Roles")}:{" "}
                                </span>
                                <span className="text-xs text-ui-foreground">
                                  {dynamicApi.authorizeRole.join(", ")}
                                </span>
                              </div>
                            )}
                        </div>

                        <div className="ml-4 flex items-center space-x-2">
                          <GenericButton
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditDynamicApi(dynamicApi)}
                            iconLeft={<FiEdit size={10} />}
                            disabled={isDynamicApisUpdating}
                          >
                            {t("Edit")}
                          </GenericButton>
                          <GenericButton
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleDeleteDynamicApi(dynamicApi.name)
                            }
                            iconLeft={<FiTrash2 size={10} />}
                            disabled={isDynamicApisUpdating}
                          >
                            {t("Delete")}
                          </GenericButton>
                        </div>
                      </div>
                    </div>
                  ))}

                  {(!container.dynamicApis ||
                    container.dynamicApis.length === 0) && (
                    <div className="py-12 text-center text-ui-muted">
                      <FiGlobe
                        size={48}
                        className="mx-auto mb-4 text-ui-placeholder"
                      />
                      <p className="mb-2">
                        {t("No Dynamic APIs defined for this container")}
                      </p>
                      <GenericButton
                        variant="outline"
                        size="sm"
                        onClick={() => setIsAddDynamicApiModalOpen(true)}
                        iconLeft={<FiPlus size={12} />}
                        className="mt-2"
                      >
                        {t("Add Your First API")}
                      </GenericButton>
                    </div>
                  )}
                </div>
              </div>
            ) : viewMode === "structured" ? (
              <div className="space-y-4">
                {/* Basic Information */}
                <section aria-label={t("Container overview")} className="rounded-ui-lg border border-ui-border bg-ui-surface px-4 py-3">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm md:grid-cols-3 xl:grid-cols-5">
                    <div>
                      <span className="text-ui-muted">{t("Schema Name")}:</span>
                      <span className="ml-2 font-medium">
                        {container.schemaName}
                      </span>
                    </div>
                    <div>
                      <span className="text-ui-muted">
                        {t("Collection Name")}:
                      </span>
                      <span className="ml-2 font-mono text-xs">
                        {container.collectionName || "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="text-ui-muted">
                        {t("Auth Container")}:
                      </span>
                      <span className="ml-2">
                        {container.isAuthContainer ? t("Yes") : t("No")}
                      </span>
                    </div>
                    {container.isAuthContainer && (
                      <section
                        aria-label={t("Authentication")}
                        className="space-y-4 border-t border-ui-border pt-4 md:col-span-2"
                      >
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <label className="flex items-center justify-between rounded-ui-sm bg-ui-surface px-3 py-2 text-sm">
                            <span className="text-ui-muted">
                              {t("Registration Active")}
                            </span>
                            <CheckSwitch
                              checked={container.isRegisterActive || false}
                              onChange={handleToggleRegisterActive}
                            />
                          </label>
                          <label className="flex items-center justify-between rounded-ui-sm bg-ui-surface px-3 py-2 text-sm">
                            <span className="text-ui-muted">
                              {t("Google Login Active")}
                            </span>
                            <CheckSwitch
                              checked={container.isGoogleLoginActive || false}
                              onChange={handleToggleGoogleLoginActive}
                            />
                          </label>
                        </div>

                        <div className="rounded-ui-sm bg-ui-surface p-3">
                          <div className="mb-3">
                            <h4 className="text-sm font-semibold text-ui-foreground">
                              {t("Create auth user")}
                            </h4>
                            <p className="text-xs text-ui-muted">
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
                                  className="rounded-ui-sm border border-ui-border px-3 py-2 text-sm"
                                />
                              );
                            })}
                            {authUserRoleField && (
                              <select
                                value={authUserRole || getRoleOptionId(roleOptions[0])}
                                onChange={(event) => setAuthUserRole(event.target.value)}
                                className="rounded-ui-sm border border-ui-border px-3 py-2 text-sm"
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
                      </section>
                    )}
                    <div>
                      <span className="text-ui-muted">
                        {t("Total Fields")}:
                      </span>
                      <span className="ml-2 font-medium">
                        {(container.fields || []).length}
                      </span>
                    </div>
                    <div>
                      <span className="text-ui-muted">
                        {t("Redis Cached")}:
                      </span>
                      <span className="ml-2">
                        {container.redis?.isRedisCached ? t("Yes") : t("No")}
                      </span>
                    </div>
                  </div>
                </section>

                {/* Fields */}
                <section ref={fieldsSectionRef} tabIndex={focusArea === "fields" ? -1 : undefined}>
                  <div className="sticky top-0 z-[5] mb-3 flex flex-col gap-3 border-b border-ui-border bg-ui-surface pb-3 lg:flex-row lg:items-center lg:justify-between">
                    <h4 className="text-base font-semibold text-ui-foreground">
                      {t("Fields")} ({visibleFields.length}/{(container.fields || []).length})
                    </h4>
                    <div
                      role="group"
                      aria-label={t("Field toolbar")}
                      className="flex flex-wrap items-center gap-2"
                    >
                      <div className="flex min-w-[240px] flex-1 items-center gap-2 lg:min-w-[320px]">
                        <input
                          type="search"
                          aria-label={t("Search fields")}
                          placeholder={t("Search fields by name, type, tag, or relation")}
                          value={fieldQuery}
                          onChange={(event) => setFieldQuery(event.target.value)}
                          className="h-9 min-w-0 flex-1 rounded-ui-md border border-ui-border bg-ui-surface px-3 text-sm text-ui-foreground outline-none transition focus:border-ui-focus focus:ring-2 focus:ring-ui-focus/20"
                        />
                        {fieldQuery && (
                          <GenericButton
                            variant="outline"
                            size="sm"
                            onClick={() => setFieldQuery("")}
                          >
                            {t("Clear field search")}
                          </GenericButton>
                        )}
                      </div>
                      <GenericButton
                        variant="outline"
                        size="sm"
                        onClick={handleAddSystemTimestamps}
                        iconLeft={<FiClock size={12} />}
                        disabled={isUpdating || areSystemTimestampsConfigured}
                      >
                        {areSystemTimestampsConfigured
                          ? t("Timestamps Added")
                          : t("Add Timestamps")}
                      </GenericButton>
                      <GenericButton
                        size="sm"
                        onClick={() => setIsAddFieldModalOpen(true)}
                        iconLeft={<FiPlus size={12} />}
                        disabled={isUpdating}
                      >
                        {t("Add Field")}
                      </GenericButton>
                    </div>
                  </div>
                  <div role="table" aria-label={t("Container fields")} className="overflow-visible rounded-ui-lg border border-ui-border bg-ui-surface">
                    <div role="row" className="hidden grid-cols-[minmax(180px,1.2fr)_120px_minmax(180px,1fr)_auto] items-center gap-4 border-b border-ui-border bg-ui-surface-subtle px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-ui-muted md:grid">
                      <span role="columnheader">{t("Name")}</span>
                      <span role="columnheader">{t("Type")}</span>
                      <span role="columnheader">{t("Attributes")}</span>
                      <span role="columnheader" className="sr-only">{t("Actions")}</span>
                    </div>
                    {visibleFields.map((field, index) => {
                      const sourceIndex = (container.fields || []).findIndex(
                        (candidate) => candidate === field || candidate.name === field.name,
                      );
                      const reorderTitle = fieldReorderingEnabled
                        ? undefined
                        : t("Clear field search to reorder fields");

                      return (
                      <div
                        key={field.name || index}
                        role="row"
                        className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-ui-border px-4 py-3 last:border-b-0 md:grid-cols-[minmax(180px,1.2fr)_120px_minmax(180px,1fr)_auto] md:gap-4"
                      >
                        <div role="cell" className="min-w-0">
                          <div className="flex min-w-0 items-center gap-2">
                            <span className="truncate font-medium text-ui-foreground">
                              {field.name}
                            </span>
                          </div>
                          {field.tag && (
                            <p className="mt-0.5 truncate text-xs text-ui-muted md:hidden">
                              {t("Tag")}: {field.tag}
                            </p>
                          )}
                          {renderChildFields(field.children || [])}
                        </div>
                        <div role="cell" className="hidden md:block">
                          <Badge variant={getFieldTypeColor(field.type)}>{field.type}</Badge>
                        </div>
                        <div role="cell" className="hidden min-w-0 items-center gap-1.5 md:flex">
                          {field.unique && <Badge variant="info">{t("Unique")}</Badge>}
                          {field.isSearchable && <Badge variant="success">{t("Searchable")}</Badge>}
                          {field.tag && <span className="truncate text-xs text-ui-muted">{field.tag}</span>}
                          {field.objectSchemaName && <span className="truncate text-xs text-ui-muted">→ {field.objectSchemaName}</span>}
                        </div>
                        <div role="cell" className="flex items-center justify-end gap-0.5">
                          <button
                            onClick={() => handleMoveFieldUp(sourceIndex)}
                            disabled={!fieldReorderingEnabled || sourceIndex === 0 || isUpdating}
                            className="p-1.5 text-ui-muted hover:text-ui-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            title={reorderTitle || t("Move Up")}
                          >
                            <FiChevronUp size={16} />
                          </button>
                          <button
                            onClick={() => handleMoveFieldDown(sourceIndex)}
                            disabled={
                              !fieldReorderingEnabled ||
                              sourceIndex === (container.fields || []).length - 1 ||
                              isUpdating
                            }
                            className="p-1.5 text-ui-muted hover:text-ui-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            title={reorderTitle || t("Move Down")}
                          >
                            <FiChevronDown size={16} />
                          </button>
                          <DropdownMenu>
                            <DropdownMenuTrigger aria-label={t("Actions for {{fieldName}}", { fieldName: field.name })} className="h-8 w-8 px-0 shadow-none">
                              <FiMoreHorizontal size={16} aria-hidden="true" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-36">
                              <DropdownMenuItem onClick={() => handleEditField(field)} disabled={isUpdating}>
                                <FiEdit size={14} aria-hidden="true" /> {t("Edit")}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem destructive onClick={() => handleDeleteField(field.name)} disabled={isUpdating}>
                                <FiTrash2 size={14} aria-hidden="true" /> {t("Delete")}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      );
                    })}

                    {(container.fields || []).length > 0 && visibleFields.length === 0 && (
                      <div className="rounded-ui-md border border-dashed border-ui-border py-10 text-center text-ui-muted">
                        <p>{t("No fields match your search")}</p>
                        <GenericButton
                          variant="outline"
                          size="sm"
                          onClick={() => setFieldQuery("")}
                          className="mt-3"
                        >
                          {t("Clear field search")}
                        </GenericButton>
                      </div>
                    )}

                    {(!container.fields || container.fields.length === 0) && (
                      <div className="text-center py-8 text-ui-muted">
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
                </section>

                {/* Routes Information */}
                {container.routes && (
                  <div>
                    <h4 className="text-sm font-medium text-ui-foreground mb-3">
                      {t("Available Routes")}
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(container.routes).map(
                        ([routeName, routeSpec]) => (
                          <div
                            key={routeName}
                            className={`p-2 rounded ${
                              routeSpec.isActive
                                ? "bg-[hsl(var(--ui-success-subtle))] text-ui-success"
                                : "bg-ui-danger-subtle text-ui-danger"
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
                  <div className="bg-[hsl(var(--ui-info-subtle))] rounded-ui-md p-4">
                    <h4 className="text-sm font-medium text-ui-foreground mb-3">
                      {t("Redis Configuration")}
                    </h4>
                    <div className="text-sm space-y-1">
                      <div>
                        <span className="text-ui-muted">{t("Cached")}:</span>
                        <span className="ml-2">
                          {container.redis.isRedisCached ? t("Yes") : t("No")}
                        </span>
                      </div>
                      <div>
                        <span className="text-ui-muted">
                          {t("Cache Time")}:
                        </span>
                        <span className="ml-2">
                          {container.redis.cacheTime}s
                        </span>
                      </div>
                      {container.redis.triggeredRedisCaches && (
                        <div>
                          <span className="text-ui-muted">
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
                <pre className="bg-gray-900 text-green-400 p-4 rounded-ui-md text-xs overflow-x-auto whitespace-pre-wrap">
                  {containerJson}
                </pre>
              </div>
            )}
          </div>
        </div>
      </WorkspaceDialog>

      {/* Add Field Modal */}
      <AddFieldModal
        isOpen={isAddFieldModalOpen}
        onClose={() => {
          setIsAddFieldModalOpen(false);
          setEditingField(null);
        }}
        onAddField={handleAddField}
        containerFields={container?.fields || []}
        containerName={container.schemaName}
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

      <AddWorkflowModal
        isOpen={isAddWorkflowModalOpen}
        onClose={() => {
          setIsAddWorkflowModalOpen(false);
          setEditingWorkflow(null);
        }}
        onAddWorkflow={handleAddWorkflow}
        editWorkflow={editingWorkflow}
      />

      {/* Add/Edit Dynamic API Modal */}
      <AddDynamicApiModal
        isOpen={isAddDynamicApiModalOpen}
        onClose={() => {
          setIsAddDynamicApiModalOpen(false);
          setEditingDynamicApi(null);
        }}
        onAddDynamicApi={handleAddDynamicApi}
        editDynamicApi={editingDynamicApi}
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

      <ConfirmationDialog
        isOpen={!!workflowToDelete}
        close={() => setWorkflowToDelete(null)}
        confirm={confirmDeleteWorkflow}
        title={t("Delete Workflow")}
        text={t(
          "Are you sure you want to delete this workflow? This action cannot be undone."
        )}
      />

      {/* Delete Dynamic API Confirmation */}
      <ConfirmationDialog
        isOpen={!!dynamicApiToDelete}
        close={() => setDynamicApiToDelete(null)}
        confirm={confirmDeleteDynamicApi}
        title={t("Delete Dynamic API")}
        text={t(
          "Are you sure you want to delete this Dynamic API? This action cannot be undone."
        )}
      />
    </>
  );
};
