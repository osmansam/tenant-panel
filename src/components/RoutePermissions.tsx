import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { CheckSwitch } from "../common/CheckSwitch";
import { useContainer, useUpdateContainer } from "../utils/api/container";
import { useRoleItems } from "../utils/api/roleInfo";
import {
  normalizeContainerRoutes,
  toggleContainerRouteFlag,
  updateContainerRouteSpec,
} from "../utils/containerRoutes";
import GenericTable from "./panelComponents/Tables/GenericTable";
import SwitchButton from "./panelComponents/common/SwitchButton";
import type { ColumnType } from "./panelComponents/shared/types";

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

type RouteBooleanFlag = "isActive" | "isAuthenticated" | "isAuthorized";

const RoutePermissions = ({ containerId }: RoutePermissionsProps) => {
  const { t } = useTranslation();
  const [isEnableEdit, setIsEnableEdit] = useState(false);

  // Fetch roles and container data
  const { data: roleItems = [] } = useRoleItems();
  const container = useContainer(containerId);
  const { updateContainerAsync } = useUpdateContainer();

  const serverRoutesSignature = JSON.stringify(container?.routes ?? {});
  const serverRoutes = useMemo(
    () => normalizeContainerRoutes(JSON.parse(serverRoutesSignature)),
    [serverRoutesSignature],
  );
  const [editableRoutes, setEditableRoutes] = useState(serverRoutes);
  const editableRoutesRef = useRef(editableRoutes);
  const latestServerRoutesRef = useRef(serverRoutes);
  const pendingRoutesSignatureRef = useRef<string | null>(null);
  const updateSequenceRef = useRef(0);
  const updateQueueRef = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    latestServerRoutesRef.current = serverRoutes;

    if (
      pendingRoutesSignatureRef.current &&
      pendingRoutesSignatureRef.current !== serverRoutesSignature
    ) {
      return;
    }

    pendingRoutesSignatureRef.current = null;
    editableRoutesRef.current = serverRoutes;
    setEditableRoutes(serverRoutes);
  }, [serverRoutes, serverRoutesSignature]);

  const commitRoutes = useCallback(
    (updatedRoutes: ReturnType<typeof normalizeContainerRoutes>) => {
      if (!container) return;

      editableRoutesRef.current = updatedRoutes;
      setEditableRoutes(updatedRoutes);
      pendingRoutesSignatureRef.current = JSON.stringify(updatedRoutes);

      const sequence = ++updateSequenceRef.current;
      const request = {
        id: containerId,
        payload: {
          ...container,
          routes: updatedRoutes,
        },
      };
      const sendUpdate = () => updateContainerAsync(request);

      updateQueueRef.current = updateQueueRef.current
        .then(sendUpdate, sendUpdate)
        .then(
          () => {
            if (sequence === updateSequenceRef.current) {
              pendingRoutesSignatureRef.current = null;
            }
          },
          () => {
            if (sequence !== updateSequenceRef.current) return;

            pendingRoutesSignatureRef.current = null;
            editableRoutesRef.current = latestServerRoutesRef.current;
            setEditableRoutes(latestServerRoutesRef.current);
          },
        );
    },
    [container, containerId, updateContainerAsync],
  );

  // Convert routes object to array for table display
  const routeRows = useMemo(() => {
    if (!container?.routes) return [];

    const rows: RouteRow[] = [];
    Object.entries(editableRoutes).forEach(
      ([routeName, routeSpec]: [string, any]) => {
        // Convert camelCase to readable format
        const displayName = routeName.replace(/([A-Z])/g, " $1").trim();

        rows.push({
          routeName,
          displayName,
          isActive: routeSpec.isActive,
          isAuthenticated: routeSpec.isAuthenticated,
          isAuthorized: routeSpec.isAuthorized,
          authorizeRole: routeSpec.authorizeRole,
          method: routeSpec.method,
        });
      }
    );

    return rows;
  }, [container?.routes, editableRoutes]);

  const handleAllRoutesToggle = useCallback(
    (flag: RouteBooleanFlag, value: boolean) => {
      if (!container?.routes) return;

      const updatedRoutes = Object.fromEntries(
        Object.entries(editableRoutesRef.current).map(
          ([routeName, routeSpec]) => [
            routeName,
            {
              ...routeSpec,
              [flag]: value,
              ...(flag === "isAuthorized" && !value
                ? { authorizeRole: [] }
                : {}),
            },
          ],
        ),
      );

      commitRoutes(updatedRoutes);
    },
    [commitRoutes, container?.routes],
  );

  // Handle isActive toggle
  const handleIsActiveToggle = useCallback(
    (route: RouteRow) => {
      if (!container?.routes) return;

      const currentRoute = editableRoutesRef.current[route.routeName];
      const updatedRoutes = toggleContainerRouteFlag(
        editableRoutesRef.current,
        route.routeName,
        "isActive",
        !currentRoute?.isActive,
      );

      commitRoutes(updatedRoutes);

    },
    [commitRoutes, container?.routes]
  );

  // Handle isAuthenticated toggle
  const handleIsAuthenticatedToggle = useCallback(
    (route: RouteRow) => {
      if (!container?.routes) return;

      const currentRoute = editableRoutesRef.current[route.routeName];
      const updatedRoutes = toggleContainerRouteFlag(
        editableRoutesRef.current,
        route.routeName,
        "isAuthenticated",
        !currentRoute?.isAuthenticated,
      );

      commitRoutes(updatedRoutes);

    },
    [commitRoutes, container?.routes]
  );

  // Handle isAuthorized toggle
  const handleIsAuthorizedToggle = useCallback(
    (route: RouteRow) => {
      if (!container?.routes) return;

      const currentRoute = editableRoutesRef.current[route.routeName];
      const newIsAuthorized = !currentRoute?.isAuthorized;
      const updatedRoutes = updateContainerRouteSpec(
        editableRoutesRef.current,
        route.routeName,
        {
          isAuthorized: newIsAuthorized,
          authorizeRole: newIsAuthorized
            ? currentRoute?.authorizeRole || []
            : [],
        },
      );

      commitRoutes(updatedRoutes);

    },
    [commitRoutes, container?.routes]
  );

  // Handle role permission toggle for a route
  const handleRouteRolePermission = useCallback(
    (route: RouteRow, roleId: string) => {
      if (!container?.routes) return;

      const currentRoute = editableRoutesRef.current[route.routeName];
      const currentAuthorizeRoles = currentRoute?.authorizeRole || [];
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

      const updatedRoutes = updateContainerRouteSpec(
        editableRoutesRef.current,
        route.routeName,
        { authorizeRole: newAuthorizeRoles },
      );

      commitRoutes(updatedRoutes);

    },
    [commitRoutes, container?.routes]
  );

  const { columns, rowKeys } = useMemo(() => {
    const bulkSwitch = (label: string, flag: RouteBooleanFlag) => {
      if (!isEnableEdit) return undefined;

      const areAllEnabled =
        routeRows.length > 0 && routeRows.every((route) => !!route[flag]);

      return (
        <CheckSwitch
          checked={areAllEnabled}
          onChange={() => handleAllRoutesToggle(flag, !areAllEnabled)}
          ariaLabel={`${t("Set all")} ${label}`}
        />
      );
    };

    const cols: ColumnType[] = [
      { key: t("Route"), isSortable: true },
      { key: t("Method"), isSortable: true },
      {
        key: t("Is Active"),
        isSortable: true,
        headerNode: bulkSwitch(t("Is Active"), "isActive"),
      },
      {
        key: t("Is Authenticated"),
        isSortable: true,
        headerNode: bulkSwitch(t("Is Authenticated"), "isAuthenticated"),
      },
      {
        key: t("Is Authorized"),
        isSortable: true,
        headerNode: bulkSwitch(t("Is Authorized"), "isAuthorized"),
      },
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
    handleAllRoutesToggle,
    routeRows,
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
