import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { CheckSwitch } from "../common/CheckSwitch";
import type { Field } from "../utils/api/container";
import { useContainer, useUpdateContainer } from "../utils/api/container";
import { useRoleItems } from "../utils/api/roleInfo";
import GenericTable from "./panelComponents/Tables/GenericTable";
import SwitchButton from "./panelComponents/common/SwitchButton";

interface FieldPermissionsProps {
  containerId: string;
}

interface FlatField extends Field {
  displayPath: string; // e.g., "user.address.street"
  depth: number;
}

const FieldPermissions = ({ containerId }: FieldPermissionsProps) => {
  const { t } = useTranslation();
  const [isEnableEdit, setIsEnableEdit] = useState(false);

  // Fetch roles and container data
  const { data: roleItems = [] } = useRoleItems();
  const container = useContainer(containerId);
  const { updateContainer } = useUpdateContainer();

  // Flatten nested fields for easier display (not memoized, pure function)
  const flattenFields = (
    fields: Field[],
    parentPath = "",
    depth = 0
  ): FlatField[] => {
    const result: FlatField[] = [];

    for (const field of fields) {
      const currentPath = parentPath
        ? `${parentPath}.${field.name}`
        : field.name;

      result.push({
        ...field,
        displayPath: currentPath,
        depth,
      });

      if (field.children && field.children.length > 0) {
        result.push(...flattenFields(field.children, currentPath, depth + 1));
      }
    }

    return result;
  };

  const flatFields = useMemo(() => {
    if (!container?.fields) return [];
    const flattened = flattenFields(container.fields);
    return flattened;
  }, [container?.fields]);

  // Helper function to update a field in nested tree structure
  const updateFieldInTree = useCallback(
    (fields: Field[], targetPath: string, updates: Partial<Field>): Field[] => {
      const pathParts = targetPath.split(".");
      const currentFieldName = pathParts[0];

      return fields.map((field) => {
        if (field.name === currentFieldName) {
          if (pathParts.length === 1) {
            // Found the target field
            return { ...field, ...updates };
          } else if (field.children) {
            // Continue searching in children
            const remainingPath = pathParts.slice(1).join(".");
            return {
              ...field,
              children: updateFieldInTree(
                field.children,
                remainingPath,
                updates
              ),
            };
          }
        }
        return field;
      });
    },
    []
  );

  // Handle isAuthorized toggle for a field
  const handleIsAuthorizedToggle = useCallback(
    (field: FlatField) => {
      if (!container?.fields) return;

      const newIsAuthorized = !field.isAuthorized;

      // Update the field in the nested structure
      const updatedFields = updateFieldInTree(
        container.fields,
        field.displayPath,
        {
          isAuthorized: newIsAuthorized,
          // If disabling authorization, clear the authorizeRole array
          authorizeRole: newIsAuthorized ? field.authorizeRole || [] : [],
        }
      );

      // Update container with ALL data to prevent data loss
      updateContainer({
        id: containerId,
        payload: {
          ...container,
          fields: updatedFields,
        },
      });

      toast.success(t("Field authorization updated successfully"));
    },
    [container, containerId, updateContainer, updateFieldInTree, t]
  );

  // Handle role permission toggle for a field
  const handleFieldRolePermission = useCallback(
    (field: FlatField, roleId: string) => {
      if (!container?.fields) return;

      const currentAuthorizeRoles = field.authorizeRole || [];
      let newAuthorizeRoles: string[];

      if (currentAuthorizeRoles.includes(roleId)) {
        // Remove this role (unauthorized for this role)
        newAuthorizeRoles = currentAuthorizeRoles.filter(
          (id: string) => id !== roleId
        );
      } else {
        // Add this role (authorized for this role)
        newAuthorizeRoles = [...currentAuthorizeRoles, roleId];
      }

      // Update the field in the nested structure
      const updatedFields = updateFieldInTree(
        container.fields,
        field.displayPath,
        { authorizeRole: newAuthorizeRoles }
      );

      // Update container with ALL data to prevent data loss
      updateContainer({
        id: containerId,
        payload: {
          ...container,
          fields: updatedFields,
        },
      });

      toast.success(t("Field permissions updated successfully"));
    },
    [container, containerId, updateContainer, updateFieldInTree, t]
  );

  const { columns, rowKeys } = useMemo(() => {
    const cols = [{ key: t("Field"), isSortable: true }];
    const keys = [
      {
        key: "name",
        node: (row: FlatField) => {
          return (
            <div className="flex items-center gap-2">
              <span style={{ marginLeft: `${row.depth * 20}px` }}>
                {row.name}
              </span>
              <span className="text-xs text-gray-500">({row.type})</span>
            </div>
          );
        },
      },
    ];

    // Add isAuthorized column
    cols.push({ key: t("Is Authorized"), isSortable: true });
    keys.push({
      key: "isAuthorized",
      node: (row: FlatField) => {
        return isEnableEdit ? (
          <CheckSwitch
            checked={!!row.isAuthorized}
            onChange={() => handleIsAuthorizedToggle(row)}
          />
        ) : row.isAuthorized ? (
          <IoCheckmark className="text-blue-500 text-2xl" />
        ) : (
          <IoCloseOutline className="text-red-800 text-2xl" />
        );
      },
    });

    // Adding role columns and rowKeys (only active if isAuthorized is true)
    roleItems.forEach((role) => {
      const roleId = role._id;
      const roleName = role.name || "Role";
      cols.push({ key: roleName, isSortable: true });
      keys.push({
        key: roleId,
        node: (row: FlatField) => {
          // If not authorized, show disabled state
          if (!row.isAuthorized) {
            return <span className="text-gray-300">-</span>;
          }

          const authorizeRoles = row.authorizeRole || [];
          // Empty authorizeRole means NO roles are authorized (all unauthorized)
          const hasRolePermission = authorizeRoles.includes(roleId);

          return isEnableEdit ? (
            <CheckSwitch
              checked={hasRolePermission}
              onChange={() => handleFieldRolePermission(row, roleId)}
            />
          ) : hasRolePermission ? (
            <IoCheckmark className="text-blue-500 text-2xl" />
          ) : (
            <IoCloseOutline className="text-red-800 text-2xl" />
          );
        },
      });
    });
    return { columns: cols, rowKeys: keys };
  }, [
    t,
    roleItems,
    isEnableEdit,
    handleFieldRolePermission,
    handleIsAuthorizedToggle,
  ]);

  const filters = useMemo(
    () => [
      {
        label: t("Enable Edit"),
        isUpperSide: true,
        node: (
          <SwitchButton checked={isEnableEdit} onChange={setIsEnableEdit} />
        ),
      },
    ],
    [t, isEnableEdit]
  );

  if (!container) {
    return <div className="p-4">{t("Loading...")}</div>;
  }
  return (
    <div className="w-full h-full">
      <GenericTable
        rowKeys={rowKeys}
        columns={columns}
        rows={flatFields}
        filters={filters}
        title={t("Field Permissions") + ` - ${container?.schemaName || ""}`}
        isActionsActive={false}
        isSearch={true}
      />
    </div>
  );
};

export default FieldPermissions;
