import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { CheckSwitch } from "../common/CheckSwitch";
import { useContainer, useUpdateContainer } from "../utils/api/container";
import { useRoleItems } from "../utils/api/roleInfo";
import GenericTable from "./panelComponents/Tables/GenericTable";
import SwitchButton from "./panelComponents/common/SwitchButton";

interface RoutePermissionsProps {
  containerId: string;
}

interface RouteRow {
  routeName: string;
  displayName: string;
  isActive?: boolean;
  isAuthenticated?: boolean;
  isAuthorized?: boolean;
  authorizeRole?: string[];
  method?: string;
}

const RoutePermissions = ({ containerId }: RoutePermissionsProps) => {
  const { t } = useTranslation();
  const [isEnableEdit, setIsEnableEdit] = useState(false);

  // Fetch roles and container data
  const { data: roleItems = [] } = useRoleItems();
  const container = useContainer(containerId);
  const { updateContainer } = useUpdateContainer();

  // Convert routes object to array for table display
  const routeRows = useMemo(() => {
    if (!container?.routes) return [];

    const rows: RouteRow[] = [];
    Object.entries(container.routes).forEach(
      ([routeName, routeSpec]: [string, any]) => {
        // Convert camelCase to readable format
        const displayName = routeName.replace(/([A-Z])/g, " $1").trim();

        rows.push({
          routeName,
          displayName,
          isActive: routeSpec.isActive ?? routeSpec.IsActive ?? false,
          isAuthenticated:
            routeSpec.isAuthenticated ?? routeSpec.IsAuthenticated ?? false,
          isAuthorized:
            routeSpec.isAuthorized ?? routeSpec.IsAuthorized ?? false,
          authorizeRole:
            routeSpec.authorizeRole || routeSpec.AuthorizeRole || [],
          method: routeSpec.method || routeSpec.Method || "GET",
        });
      }
    );

    return rows;
  }, [container?.routes]);

  // Handle isActive toggle
  const handleIsActiveToggle = useCallback(
    (route: RouteRow) => {
      if (!container?.routes) return;

      const routesRecord = container.routes as Record<string, any>;
      const updatedRoutes = {
        ...container.routes,
        [route.routeName]: {
          ...routesRecord[route.routeName],
          isActive: !route.isActive,
        },
      };

      updateContainer({
        id: containerId,
        payload: {
          ...container,
          routes: updatedRoutes,
        },
      });

      toast.success(t("Route status updated successfully"));
    },
    [container, containerId, updateContainer, t]
  );

  // Handle isAuthenticated toggle
  const handleIsAuthenticatedToggle = useCallback(
    (route: RouteRow) => {
      if (!container?.routes) return;

      const routesRecord = container.routes as Record<string, any>;
      const updatedRoutes = {
        ...container.routes,
        [route.routeName]: {
          ...routesRecord[route.routeName],
          isAuthenticated: !route.isAuthenticated,
        },
      };

      updateContainer({
        id: containerId,
        payload: {
          ...container,
          routes: updatedRoutes,
        },
      });

      toast.success(t("Route authentication updated successfully"));
    },
    [container, containerId, updateContainer, t]
  );

  // Handle isAuthorized toggle
  const handleIsAuthorizedToggle = useCallback(
    (route: RouteRow) => {
      if (!container?.routes) return;

      const newIsAuthorized = !route.isAuthorized;
      const routesRecord = container.routes as Record<string, any>;

      const updatedRoutes = {
        ...container.routes,
        [route.routeName]: {
          ...routesRecord[route.routeName],
          isAuthorized: newIsAuthorized,
          // If disabling authorization, clear the authorizeRole array
          authorizeRole: newIsAuthorized ? route.authorizeRole || [] : [],
        },
      };

      updateContainer({
        id: containerId,
        payload: {
          ...container,
          routes: updatedRoutes,
        },
      });

      toast.success(t("Route authorization updated successfully"));
    },
    [container, containerId, updateContainer, t]
  );

  // Handle role permission toggle for a route
  const handleRouteRolePermission = useCallback(
    (route: RouteRow, roleId: string) => {
      if (!container?.routes) return;

      const currentAuthorizeRoles = route.authorizeRole || [];
      let newAuthorizeRoles: string[];

      if (currentAuthorizeRoles.includes(roleId)) {
        // Remove this role
        newAuthorizeRoles = currentAuthorizeRoles.filter(
          (id: string) => id !== roleId
        );
      } else {
        // Add this role
        newAuthorizeRoles = [...currentAuthorizeRoles, roleId];
      }

      const routesRecord = container.routes as Record<string, any>;
      const updatedRoutes = {
        ...container.routes,
        [route.routeName]: {
          ...routesRecord[route.routeName],
          authorizeRole: newAuthorizeRoles,
        },
      };

      updateContainer({
        id: containerId,
        payload: {
          ...container,
          routes: updatedRoutes,
        },
      });

      toast.success(t("Route permissions updated successfully"));
    },
    [container, containerId, updateContainer, t]
  );

  const { columns, rowKeys } = useMemo(() => {
    const cols = [
      { key: t("Route"), isSortable: true },
      { key: t("Method"), isSortable: true },
      { key: t("Is Active"), isSortable: true },
      { key: t("Is Authenticated"), isSortable: true },
      { key: t("Is Authorized"), isSortable: true },
    ];

    const keys = [
      {
        key: "displayName",
        node: (row: RouteRow) => (
          <div className="flex items-center gap-2">
            <span className="font-medium">{row.displayName}</span>
          </div>
        ),
      },
      {
        key: "method",
        node: (row: RouteRow) => (
          <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800">
            {row.method}
          </span>
        ),
      },
      {
        key: "isActive",
        node: (row: RouteRow) => {
          return isEnableEdit ? (
            <CheckSwitch
              checked={!!row.isActive}
              onChange={() => handleIsActiveToggle(row)}
            />
          ) : row.isActive ? (
            <IoCheckmark className="text-green-500 text-2xl" />
          ) : (
            <IoCloseOutline className="text-red-800 text-2xl" />
          );
        },
      },
      {
        key: "isAuthenticated",
        node: (row: RouteRow) => {
          return isEnableEdit ? (
            <CheckSwitch
              checked={!!row.isAuthenticated}
              onChange={() => handleIsAuthenticatedToggle(row)}
            />
          ) : row.isAuthenticated ? (
            <IoCheckmark className="text-blue-500 text-2xl" />
          ) : (
            <IoCloseOutline className="text-red-800 text-2xl" />
          );
        },
      },
      {
        key: "isAuthorized",
        node: (row: RouteRow) => {
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
      },
    ];

    // Adding role columns
    roleItems.forEach((role) => {
      const roleId = role._id;
      const roleName = role.name || "Role";

      cols.push({ key: roleName, isSortable: true });
      keys.push({
        key: roleId,
        node: (row: RouteRow) => {
          // If not authorized, show disabled state
          if (!row.isAuthorized) {
            return <span className="text-gray-300">-</span>;
          }

          const authorizeRoles = row.authorizeRole || [];
          const hasRolePermission = authorizeRoles.includes(roleId);

          return isEnableEdit ? (
            <CheckSwitch
              checked={hasRolePermission}
              onChange={() => handleRouteRolePermission(row, roleId)}
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
    handleIsActiveToggle,
    handleIsAuthenticatedToggle,
    handleIsAuthorizedToggle,
    handleRouteRolePermission,
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
        rows={routeRows}
        filters={filters}
        title={t("Route Permissions") + ` - ${container?.schemaName || ""}`}
        isActionsActive={false}
        isSearch={true}
      />
    </div>
  );
};

export default RoutePermissions;
