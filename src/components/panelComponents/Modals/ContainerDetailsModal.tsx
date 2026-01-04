import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FiChevronDown,
  FiChevronUp,
  FiCode,
  FiCopy,
  FiEdit,
  FiList,
  FiPlus,
  FiShield,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { ConfirmationDialog } from "../../../common/ConfirmationDialog";
import {
  ContainerModel,
  Field,
  useUpdateContainer,
} from "../../../utils/api/container";
import FieldPermissions from "../../FieldPermissions";
import { GenericButton } from "../FormElements/GenericButton";
import { AddFieldModal } from "./AddFieldModal";

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
    "structured" | "json" | "permissions"
  >("structured");
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);
  const [fieldToDelete, setFieldToDelete] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<Field | null>(null);

  const { updateContainer, isUpdating } = useUpdateContainer();

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
        },
      });
      setFieldToDelete(null);
    }
  }, [container, fieldToDelete, updateContainer]);

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
        },
      });
    },
    [container, updateContainer]
  );

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
              viewMode === "permissions"
                ? "h-[70vh]"
                : "max-h-[70vh] overflow-y-auto"
            }
          >
            {viewMode === "permissions" ? (
              <FieldPermissions containerId={container.id} />
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
    </div>
  );
};
