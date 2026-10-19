import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { CheckSwitch } from "../common/CheckSwitch";
import { PageModel, useGetTenantPagesQuery, useUpdatePage } from "../utils/api/page";
import { useRoleItems } from "../utils/api/roleInfo";
import DataTable from "./panelComponents/Tables/DataTable";
import { EmptyState, ResourceLoading } from "./ui";
import { GenericButton } from "./panelComponents/FormElements/GenericButton";

interface PagePermissionsProps {
  projectId?: string;
  pageId?: string;
  readOnly?: boolean;
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

const PagePermissions = ({ projectId, pageId, readOnly = false }: PagePermissionsProps) => {
  const { t } = useTranslation();
  const [isEnableEdit, setIsEnableEdit] = useState(false);

  // Fetch roles and pages data
  const { data: roleItems = [] } = useRoleItems();
  const { data: pages, isLoading, error, refetch } = useGetTenantPagesQuery();
  const { updatePage, isUpdating } = useUpdatePage();

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
    return pageId ? rows.filter((row) => row.pageId === pageId) : rows;
  }, [pages, pageId]);

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
          <span className="text-sm text-ui-muted font-mono">{row.slug}</span>
        ),
      },
      {
        key: "isGroupOnly",
        node: (row: PageRow) => {
          return isEnableEdit && !readOnly ? (
            <CheckSwitch
              disabled={isUpdating}
              ariaLabel={`${t("Navigation group")}: ${row.pageName}`}
              checked={!!row.isGroupOnly}
              onChange={() => handleIsGroupOnlyToggle(row)}
            />
          ) : row.isGroupOnly ? (
            <IoCheckmark role="img" aria-label={t("Enabled")} className="text-purple-500 text-2xl" />
          ) : (
            <IoCloseOutline role="img" aria-label={t("Disabled")} className="text-ui-danger text-2xl" />
          );
        },
      },
      {
        key: "isAuthenticated",
        node: (row: PageRow) => {
          return isEnableEdit && !readOnly ? (
            <CheckSwitch
              disabled={isUpdating}
              ariaLabel={`${t("Sign-in required")}: ${row.pageName}`}
              checked={!!row.isAuthenticated}
              onChange={() => handleIsAuthenticatedToggle(row)}
            />
          ) : row.isAuthenticated ? (
            <IoCheckmark role="img" aria-label={t("Enabled")} className="text-ui-primary text-2xl" />
          ) : (
            <IoCloseOutline role="img" aria-label={t("Disabled")} className="text-ui-danger text-2xl" />
          );
        },
      },
      {
        key: "isAuthorized",
        node: (row: PageRow) => {
          return isEnableEdit && !readOnly ? (
            <CheckSwitch
              disabled={isUpdating}
              ariaLabel={`${t("Role restrictions")}: ${row.pageName}`}
              checked={!!row.isAuthorized}
              onChange={() => handleIsAuthorizedToggle(row)}
            />
          ) : row.isAuthorized ? (
            <IoCheckmark role="img" aria-label={t("Enabled")} className="text-ui-primary text-2xl" />
          ) : (
            <IoCloseOutline role="img" aria-label={t("Disabled")} className="text-ui-danger text-2xl" />
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
            return <span className="text-ui-placeholder">-</span>;
          }

          const authorizeRoles = row.authorizeRole || [];
          const hasRolePermission = authorizeRoles.includes(roleId);

          return isEnableEdit && !readOnly ? (
            <CheckSwitch
              disabled={isUpdating}
              ariaLabel={`${roleName}: ${row.pageName}`}
              checked={hasRolePermission}
              onChange={() => handlePageRolePermission(row, roleId)}
            />
          ) : hasRolePermission ? (
            <IoCheckmark role="img" aria-label={t("Enabled")} className="text-ui-primary text-2xl" />
          ) : (
            <IoCloseOutline role="img" aria-label={t("Disabled")} className="text-ui-danger text-2xl" />
          );
        },
      });
    });

    return { columns: cols, rowKeys: keys };
  }, [
    t,
    roleItems,
    isEnableEdit,
    isUpdating,
    readOnly,
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
          <CheckSwitch ariaLabel={t("Enable Edit")} checked={isEnableEdit} disabled={isUpdating} onChange={() => setIsEnableEdit((value) => !value)} />
        ),
      },
    ],
    [t, isEnableEdit, isUpdating]
  );

  if (isLoading) return <ResourceLoading label={t("Loading page permissions")} />;
  if (error) return <EmptyState role="alert" title={t("Page permissions could not be loaded")} description={t("Check your connection and try again.")} action={<GenericButton variant="outline" onClick={() => { void refetch(); }}>{t("Try again")}</GenericButton>} />;

  return (
    <div className="w-full h-full">
      <DataTable
        rowKeys={rowKeys}
        columns={columns}
        rows={pageRows}
        filters={readOnly ? [] : filters}
        title={t("Page Permissions")}
        isSearch={true}
      />
    </div>
  );
};

export default PagePermissions;
