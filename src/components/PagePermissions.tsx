import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { CheckSwitch } from "../common/CheckSwitch";
import { PageModel, useGetTenantPages, useUpdatePage } from "../utils/api/page";
import { useRoleItems } from "../utils/api/roleInfo";
import GenericTable from "./panelComponents/Tables/GenericTable";
import SwitchButton from "./panelComponents/common/SwitchButton";

interface PagePermissionsProps {
  projectId?: string;
}

interface PageRow {
  pageId: string;
  pageName: string;
  slug: string;
  isGroupOnly?: boolean;
  isAuthenticated?: boolean;
  isAuthorized?: boolean;
  authorizeRole?: string[];
  icon?: string;
}

const PagePermissions = ({ projectId }: PagePermissionsProps) => {
  const { t } = useTranslation();
  const [isEnableEdit, setIsEnableEdit] = useState(false);

  // Fetch roles and pages data
  const { data: roleItems = [] } = useRoleItems();
  const pages = useGetTenantPages();
  const { updatePage } = useUpdatePage();

  // Convert pages array to flat array for table display
  const pageRows = useMemo(() => {
    if (!pages || pages.length === 0) return [];

    const rows: PageRow[] = [];

    const flattenPages = (pageList: PageModel[], parentSlug = ""): void => {
      pageList.forEach((page) => {
        const fullSlug = parentSlug
          ? `${parentSlug}/${page.slug || page.name.toLowerCase()}`
          : page.slug || page.name.toLowerCase();

        rows.push({
          pageId: page.id || page._id || "",
          pageName: page.name,
          slug: fullSlug,
          isGroupOnly: page.isGroupOnly ?? false,
          isAuthenticated: page.isAuthenticated ?? false,
          isAuthorized: page.isAuthorized ?? false,
          authorizeRole: page.authorizeRole || [],
          icon: page.icon,
        });

        // If page has subPage, recursively add it
        if (page.subPage) {
          flattenPages([page.subPage], fullSlug);
        }
      });
    };

    flattenPages(pages);
    return rows;
  }, [pages]);

  // Handle isAuthenticated toggle
  const handleIsAuthenticatedToggle = useCallback(
    (page: PageRow) => {
      if (!page.pageId) return;

      const currentPage = pages?.find((p) => (p.id || p._id) === page.pageId);
      if (!currentPage) return;

      const { id, _id, ...pageData } = currentPage;

      const finalPayload = {
        ...pageData,
        isAuthenticated: !currentPage.isAuthenticated,
      };

      updatePage({
        id: page.pageId,
        payload: finalPayload,
      });

      toast.success(t("Page authentication updated successfully"));
    },
    [updatePage, t, pages]
  );

  // Handle isAuthorized toggle
  const handleIsAuthorizedToggle = useCallback(
    (page: PageRow) => {
      if (!page.pageId) return;

      const currentPage = pages?.find((p) => (p.id || p._id) === page.pageId);
      if (!currentPage) return;

      const { id, _id, ...pageData } = currentPage;
      const newIsAuthorized = !currentPage.isAuthorized;

      updatePage({
        id: page.pageId,
        payload: {
          ...pageData,
          isAuthorized: newIsAuthorized,
          // If disabling authorization, clear the authorizeRole array
          authorizeRole: newIsAuthorized ? currentPage.authorizeRole || [] : [],
        },
      });

      toast.success(t("Page authorization updated successfully"));
    },
    [updatePage, t, pages]
  );

  // Handle isGroupOnly toggle
  const handleIsGroupOnlyToggle = useCallback(
    (page: PageRow) => {
      if (!page.pageId) return;

      const currentPage = pages?.find((p) => (p.id || p._id) === page.pageId);
      if (!currentPage) return;

      const { id, _id, ...pageData } = currentPage;

      updatePage({
        id: page.pageId,
        payload: {
          ...pageData,
          isGroupOnly: !currentPage.isGroupOnly,
        },
      });

      toast.success(t("Page group status updated successfully"));
    },
    [updatePage, t, pages]
  );

  // Handle role permission toggle for a page
  const handlePageRolePermission = useCallback(
    (page: PageRow, roleId: string) => {
      if (!page.pageId) return;

      const currentPage = pages?.find((p) => (p.id || p._id) === page.pageId);
      if (!currentPage) return;

      const { id, _id, ...pageData } = currentPage;
      const currentAuthorizeRoles = currentPage.authorizeRole || [];
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

      updatePage({
        id: page.pageId,
        payload: {
          ...pageData,
          authorizeRole: newAuthorizeRoles,
        },
      });

      toast.success(t("Page permissions updated successfully"));
    },
    [updatePage, t, pages]
  );

  const { columns, rowKeys } = useMemo(() => {
    const cols = [
      { key: t("Page Name"), isSortable: true },
      { key: t("Slug"), isSortable: true },
      { key: t("Is Group Only"), isSortable: true },
      { key: t("Is Authenticated"), isSortable: true },
      { key: t("Is Authorized"), isSortable: true },
    ];

    const keys = [
      {
        key: "pageName",
        node: (row: PageRow) => (
          <div className="flex items-center gap-2">
            {row.icon && <span>{row.icon}</span>}
            <span className="font-medium">{row.pageName}</span>
          </div>
        ),
      },
      {
        key: "slug",
        node: (row: PageRow) => (
          <span className="text-sm text-gray-600 font-mono">{row.slug}</span>
        ),
      },
      {
        key: "isGroupOnly",
        node: (row: PageRow) => {
          return isEnableEdit ? (
            <CheckSwitch
              checked={!!row.isGroupOnly}
              onChange={() => handleIsGroupOnlyToggle(row)}
            />
          ) : row.isGroupOnly ? (
            <IoCheckmark className="text-purple-500 text-2xl" />
          ) : (
            <IoCloseOutline className="text-red-800 text-2xl" />
          );
        },
      },
      {
        key: "isAuthenticated",
        node: (row: PageRow) => {
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
        node: (row: PageRow) => {
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
        node: (row: PageRow) => {
          // If not authorized, show disabled state
          if (!row.isAuthorized) {
            return <span className="text-gray-300">-</span>;
          }

          const authorizeRoles = row.authorizeRole || [];
          const hasRolePermission = authorizeRoles.includes(roleId);

          return isEnableEdit ? (
            <CheckSwitch
              checked={hasRolePermission}
              onChange={() => handlePageRolePermission(row, roleId)}
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
    handleIsGroupOnlyToggle,
    handleIsAuthenticatedToggle,
    handleIsAuthorizedToggle,
    handlePageRolePermission,
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

  if (!pages) {
    return <div className="p-4">{t("Loading...")}</div>;
  }

  return (
    <div className="w-full h-full">
      <GenericTable
        rowKeys={rowKeys}
        columns={columns}
        rows={pageRows}
        filters={filters}
        title={t("Page Permissions")}
        isActionsActive={false}
        isSearch={true}
      />
    </div>
  );
};

export default PagePermissions;
