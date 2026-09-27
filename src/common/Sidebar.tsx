import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { MdArrowBack, MdBusinessCenter } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useGeneralContext } from "../context/General.context";
import { useUserContext } from "../context/User.context";
import { useCurrentProject } from "../hooks/useCurrentProject";
import { systemRoutes } from "../navigation/constants";
import { useSwitchBackToTenant } from "../utils/api/auth";
import { getIconByName, getMenuIcon } from "../utils/menuIcons";
import SidebarTooltip from "./SidebarTooltip";

export const Sidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { user, setUser } = useUserContext();
  const { currentProject, clearCurrentProject, isInProject } =
    useCurrentProject();
  const { switchBackToTenant } = useSwitchBackToTenant();
  const { isSidebarOpen, setIsSidebarOpen, resetGeneralContext } =
    useGeneralContext();
  const currentRoute = location.pathname;
  const [openGroups, setOpenGroups] = useState<{ [group: string]: boolean }>(
    {}
  );

  const routes = systemRoutes;

  const toggleGroup = (groupName: string) => {
    setOpenGroups((prev) => ({ ...prev, [groupName]: !prev[groupName] }));
  };

  // Filter routes based on current context (tenant vs project)
  const getVisibleRoutes = () => {
    return routes.filter((route) => {
      // Always show dashboard
      if (route.path === "/dashboard") return true;

      // In project context
      if (isInProject) {
        // Show project routes and hide projects list
        if (route.path === "/collections") return true;
        if (route.path === "/pages") return true;
        if (route.path === "/project-management") return false;
        if (route.path === "/localization") return true;
        if (route.path === "/projects") return false;

        // Show other routes based on roles
        if (route.requiredRoles) {
          const userRoles = user?.roles || [];
          return route.requiredRoles.some((role) => userRoles.includes(role));
        }
        return true;
      } else {
        // In tenant context - hide project routes
        if (route.path === "/collections") return false;
        if (route.path === "/pages") return false;
        if (route.path === "/project-management") return false;
        if (route.path === "/localization") return false;

        // Show other routes based on roles
        if (route.requiredRoles) {
          const userRoles = user?.roles || [];
          return route.requiredRoles.some((role) => userRoles.includes(role));
        }
        return true;
      }
    });
  };

  const visibleRoutes = getVisibleRoutes();

  if (visibleRoutes.length === 0) {
    return null;
  }

  const logout = () => {
    localStorage.clear();
    localStorage.setItem("loggedOut", "true");
    setTimeout(() => localStorage.removeItem("loggedOut"), 500);
    setUser(undefined);
    queryClient.clear();
    navigate("/login");
  };

  const handleSwitchBackToTenant = () => {
    // Clear project context locally first for immediate UI feedback
    clearCurrentProject();
    if (user) {
      const updatedUser = {
        ...user,
        projectId: undefined,
        projectName: undefined,
        projectSlug: undefined,
        roleScope: "tenant" as const,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
    // Use the API hook to handle the token refresh and navigation
    switchBackToTenant();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[hsl(var(--ui-overlay)/0.48)] md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          flex-shrink-0 flex flex-col border-r border-ui-border bg-ui-surface
          transition-[width,transform] duration-200 ease-out
          ${isSidebarOpen ? "w-64" : "w-16"}
          md:relative md:translate-x-0
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
          fixed md:static top-0 left-0 h-full z-50
        `}
      >
        {/* Header */}
        <div className="flex h-14 items-center border-b border-ui-border bg-ui-surface">
          {isSidebarOpen ? (
            <div className="flex items-center justify-between w-full px-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-ui-md bg-ui-primary">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold tracking-tight text-ui-foreground">
                    Tenant Panel
                  </div>
                  <p className="text-xs text-ui-muted">
                    {user?.email?.split("@")[0] || "User"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setOpenGroups({});
                  setIsSidebarOpen(false);
                }}
                className="ui-focus-ring flex h-8 w-8 items-center justify-center rounded-ui-md text-ui-muted transition-colors hover:bg-ui-surface-subtle hover:text-ui-foreground"
                aria-label="Collapse Sidebar"
              >
                <FiChevronLeft className="text-lg" strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="ui-focus-ring flex h-10 w-10 items-center justify-center rounded-ui-md text-ui-muted transition-colors hover:bg-ui-surface-subtle hover:text-ui-foreground"
                aria-label="Expand Sidebar"
              >
                <FiChevronRight className="text-lg" strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>

        <div className="flex h-[calc(100%-3.5rem)] flex-col overflow-y-auto bg-ui-surface px-3 py-3">
          {/* Project Context Section */}
          {isInProject && currentProject && (
            <div className="mb-3 rounded-ui-md bg-ui-surface-subtle p-3">
              {isSidebarOpen ? (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-ui-sm bg-[hsl(var(--ui-info-subtle))]">
                      <MdBusinessCenter className="text-sm text-[hsl(var(--ui-info))]" />
                    </div>
                    <span className="text-xs font-semibold text-ui-foreground">
                      {t("Current Project")}
                    </span>
                  </div>
                  <div className="mb-2.5 truncate text-sm font-medium text-ui-foreground">
                    {currentProject.name}
                  </div>
                  <button
                    onClick={handleSwitchBackToTenant}
                    className="ui-focus-ring flex w-full items-center justify-center gap-1.5 rounded-ui-md border border-ui-border bg-ui-surface px-2 py-1.5 text-xs font-medium text-ui-foreground transition-colors hover:bg-ui-surface-subtle"
                  >
                    <MdArrowBack className="text-sm" />
                    {t("Back to Tenant")}
                  </button>
                </div>
              ) : (
                <SidebarTooltip
                  content={`${t("Current Project")}: ${
                    currentProject.name
                  } - ${t("Click to go back to tenant")}`}
                >
                  <button
                    onClick={handleSwitchBackToTenant}
                    className="ui-focus-ring flex w-full items-center justify-center rounded-ui-md p-2 text-ui-primary transition-colors hover:bg-[hsl(var(--ui-info-subtle))]"
                  >
                    <MdBusinessCenter className="text-lg" />
                  </button>
                </SidebarTooltip>
              )}
            </div>
          )}

          <div className="flex-1 space-y-1">
            {visibleRoutes.map((route) => {
              // Our routes don't have children structure, they are flat
              const routeChildren = route?.children;

              if (routeChildren && routeChildren.length > 1) {
                // Handle routes with multiple children
                const IconComponent =
                  route.icon && /^[A-Z][a-z]+[A-Z]/.test(route.icon)
                    ? getIconByName(route.icon)
                    : getMenuIcon(route.icon || route.name);
                return (
                  <div key={route.name}>
                    <SidebarTooltip content={t(route.name)}>
                      <button
                        onClick={() => {
                          if (!isSidebarOpen) {
                            setIsSidebarOpen(true);
                            setTimeout(() => {
                              toggleGroup(route.name);
                            }, 100);
                          } else {
                            toggleGroup(route.name);
                          }
                        }}
                        className="w-full flex items-center justify-between px-2.5 py-2 rounded-ui-sm text-sm font-medium text-ui-foreground hover:bg-ui-surface-subtle transition-all active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center text-ui-muted flex-shrink-0">
                            <IconComponent className="text-[18px]" />
                          </div>
                          {isSidebarOpen && (
                            <span className="text-sm">{t(route.name)}</span>
                          )}
                        </div>
                        {isSidebarOpen &&
                          (openGroups[route.name] ? (
                            <FiChevronDown
                              className="text-sm text-ui-muted"
                              strokeWidth={2.5}
                            />
                          ) : (
                            <FiChevronRight
                              className="text-sm text-ui-muted"
                              strokeWidth={2.5}
                            />
                          ))}
                      </button>
                    </SidebarTooltip>

                    {isSidebarOpen &&
                      openGroups[route.name] &&
                      routeChildren
                        .filter((child) => child.isOnSidebar)
                        .map((child) => (
                          <button
                            key={child.name}
                            aria-current={child.path === currentRoute ? "page" : undefined}
                            className={`
                            w-full flex items-center pl-10 pr-3 py-2 rounded-ui-sm mt-0.5
                            text-sm transition-all active:scale-[0.98]
                            ${
                              child.path === currentRoute
                                ? "bg-ui-active-subtle text-ui-primary font-medium"
                                : "text-ui-muted hover:bg-ui-surface-subtle hover:text-ui-foreground"
                            }
                          `}
                            onClick={() => {
                              if (child.path) {
                                resetGeneralContext();
                                navigate(child.path);
                                window.scrollTo(0, 0);
                                setIsSidebarOpen(false);
                              }
                            }}
                          >
                            {t(child.name)}
                          </button>
                        ))}
                  </div>
                );
              }

              if (routeChildren && routeChildren.length === 1) {
                // Handle routes with single child
                if (!routeChildren[0].isOnSidebar) return null;
                const child = routeChildren[0];
                const IconComponent =
                  child.icon && /^[A-Z][a-z]+[A-Z]/.test(child.icon)
                    ? getIconByName(child.icon)
                    : getMenuIcon(child.icon || child.name);
                return (
                  <SidebarTooltip
                    key={routeChildren[0].name}
                    content={t(routeChildren[0].name)}
                  >
                    <button
                      aria-current={routeChildren[0].path === currentRoute ? "page" : undefined}
                      className={`
                      w-full flex items-center gap-3 px-2.5 py-2 rounded-ui-sm
                      text-sm transition-all active:scale-[0.98]
                      ${
                        routeChildren[0].path === currentRoute
                          ? "bg-ui-active-subtle text-ui-primary font-medium"
                          : "text-ui-foreground hover:bg-ui-surface-subtle"
                      }
                    `}
                      onClick={() => {
                        if (routeChildren[0].path) {
                          resetGeneralContext();
                          navigate(routeChildren[0].path);
                          window.scrollTo(0, 0);
                        }
                      }}
                    >
                      <div
                        className={`flex items-center justify-center flex-shrink-0 ${
                          routeChildren[0].path === currentRoute
                            ? "text-ui-primary"
                            : "text-ui-muted"
                        }`}
                      >
                        <IconComponent className="text-[18px]" />
                      </div>
                      {isSidebarOpen && <span>{t(routeChildren[0].name)}</span>}
                    </button>
                  </SidebarTooltip>
                );
              }

              // Handle direct routes (no children)
              if (!route.isOnSidebar) return null;
              const IconComponent =
                route.icon && /^[A-Z][a-z]+[A-Z]/.test(route.icon)
                  ? getIconByName(route.icon)
                  : getMenuIcon(route.icon || route.name);
              return (
                <SidebarTooltip key={route.name} content={t(route.name)}>
                  <button
                    aria-current={route.path === currentRoute ? "page" : undefined}
                    className={`
                    w-full flex items-center gap-3 px-2.5 py-2 rounded-ui-sm
                    text-sm transition-all active:scale-[0.98]
                    ${
                      route.path === currentRoute
                        ? "bg-ui-active-subtle text-ui-primary font-medium"
                        : "text-ui-foreground hover:bg-ui-surface-subtle"
                    }
                  `}
                    onClick={() => {
                      if (route.path) {
                        resetGeneralContext();
                        navigate(route.path);
                        window.scrollTo(0, 0);
                      }
                    }}
                  >
                    <div
                      className={`flex items-center justify-center flex-shrink-0 ${
                        route.path === currentRoute
                          ? "text-ui-primary"
                          : "text-ui-muted"
                      }`}
                    >
                      <IconComponent className="text-[18px]" />
                    </div>
                    {isSidebarOpen && <span>{t(route.name)}</span>}
                  </button>
                </SidebarTooltip>
              );
            })}
          </div>

          <div className="border-t border-ui-border pt-3 mt-3">
            <SidebarTooltip content={t("Logout")}>
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-2.5 py-2 rounded-ui-sm text-sm font-medium text-ui-danger hover:bg-ui-danger-subtle transition-all active:scale-[0.98]"
              >
                <div className="flex items-center justify-center text-ui-danger flex-shrink-0">
                  <IoIosLogOut className="text-[18px]" />
                </div>
                {isSidebarOpen && <span>{t("Logout")}</span>}
              </button>
            </SidebarTooltip>
          </div>
        </div>
      </aside>
    </>
  );
};
