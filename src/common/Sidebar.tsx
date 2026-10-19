import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
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
import { useModalFocus } from "../hooks/useModalFocus";
import { useIsDesktop } from "../hooks/useIsDesktop";

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

  const isDesktop = useIsDesktop();
  const sidebarRef = useRef<HTMLElement>(null);

  useModalFocus(sidebarRef, !isDesktop && isSidebarOpen, () => setIsSidebarOpen(false));

  const navigateTo = (path: string) => {
    resetGeneralContext();
    navigate(path);
    document.getElementById("main-content")?.scrollTo?.(0, 0);
    if (!isDesktop) setIsSidebarOpen(false);
  };

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
        // Project routes still require an explicit project role. Tenant roles do
        // not imply project access.
        if (route.path === "/project-management") return false;
        if (route.path === "/projects") return false;

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
          data-modal-backdrop-for="main-navigation"
          className="fixed inset-0 z-40 bg-[hsl(var(--ui-overlay)/0.48)] md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        id="main-navigation"
        data-modal-layer="50"
        ref={sidebarRef}
        role={!isDesktop && isSidebarOpen ? "dialog" : undefined}
        aria-modal={!isDesktop && isSidebarOpen ? true : undefined}
        aria-label={t("Workspace navigation")}
        aria-hidden={!isDesktop && !isSidebarOpen ? true : undefined}
        className={`
          flex-shrink-0 flex flex-col border-r border-ui-border/70 bg-[hsl(240_10%_97.5%)]
          transition-[width,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${isSidebarOpen ? "w-[264px]" : "w-[68px]"}
          md:relative md:translate-x-0
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "invisible -translate-x-full md:visible md:translate-x-0"
          }
          fixed md:static top-0 left-0 h-dvh z-50
        `}
      >
        {/* Header */}
        <div className="flex h-16 items-center border-b border-ui-border/60">
          {isSidebarOpen ? (
            <div className="flex w-full items-center justify-between px-3.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-ui-ink shadow-ui-button">
                  <svg
                    className="size-[18px] text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.4}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-semibold tracking-tight text-ui-foreground">
                    Tenant Panel
                  </div>
                  <p className="truncate text-[11px] text-ui-muted">
                    {user?.email || "Workspace"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setOpenGroups({});
                  setIsSidebarOpen(false);
                }}
                className="ui-focus-ring flex size-7 shrink-0 items-center justify-center rounded-full text-ui-muted transition-colors hover:bg-ui-surface hover:text-ui-foreground hover:shadow-ui-sm"
                aria-label="Collapse Sidebar"
                aria-controls="main-navigation"
                aria-expanded={true}
              >
                <FiChevronLeft className="text-base" strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            <div className="flex w-full items-center justify-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="ui-focus-ring flex size-9 items-center justify-center rounded-[11px] bg-ui-ink text-white shadow-ui-button transition-transform hover:scale-105"
                aria-label="Expand Sidebar"
                aria-controls="main-navigation"
                aria-expanded={false}
              >
                <FiChevronRight className="text-base" strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-2.5 py-3">
          {/* Project Context Section */}
          {isInProject && currentProject && (
            <div className="mb-3 rounded-ui-lg border border-ui-border/80 bg-ui-surface p-3 shadow-ui-sm">
              {isSidebarOpen ? (
                <div>
                  <div className="mb-1.5 flex items-center gap-2">
                    <div className="flex size-5 items-center justify-center rounded-md bg-[hsl(var(--ui-info-subtle))]">
                      <MdBusinessCenter className="text-xs text-[hsl(var(--ui-info))]" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ui-muted">
                      {t("Current Project")}
                    </span>
                  </div>
                  <div className="mb-2.5 truncate text-[13px] font-semibold text-ui-foreground">
                    {currentProject.name}
                  </div>
                  <button
                    onClick={handleSwitchBackToTenant}
                    className="ui-focus-ring flex w-full items-center justify-center gap-1.5 rounded-ui-md border border-ui-border bg-ui-surface px-2 py-1.5 text-[12px] font-medium text-ui-foreground shadow-ui-sm transition-colors hover:bg-ui-surface-subtle active:scale-[0.98]"
                  >
                    <MdArrowBack className="text-sm text-ui-muted" />
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
                    aria-label={t("Back to Tenant")}
                    className="ui-focus-ring flex w-full items-center justify-center rounded-ui-md p-2 text-ui-primary transition-colors hover:bg-[hsl(var(--ui-info-subtle))]"
                  >
                    <MdBusinessCenter className="text-lg" />
                  </button>
                </SidebarTooltip>
              )}
            </div>
          )}

          {isSidebarOpen && (
            <div className="px-2 pb-1.5 pt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-ui-placeholder">
              {t("Menu")}
            </div>
          )}
          <nav aria-label={t("Main navigation")} className="flex-1 space-y-0.5">
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
                        aria-label={t(route.name)}
                        aria-expanded={Boolean(isSidebarOpen && openGroups[route.name])}
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
                        className="group ui-focus-ring flex h-9 w-full items-center justify-between rounded-ui-md px-2.5 text-[13px] font-medium text-ui-muted transition-colors hover:bg-ui-surface hover:text-ui-foreground hover:shadow-ui-sm active:scale-[0.99]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center text-ui-muted group-hover:text-ui-foreground flex-shrink-0 transition-colors">
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
                            aria-label={t(child.name)}
                            aria-current={child.path === currentRoute ? "page" : undefined}
                            className={`
                            ui-focus-ring mt-0.5 flex h-9 w-full items-center rounded-ui-md pl-10 pr-3
                            text-[13px] transition-colors active:scale-[0.99]
                            ${
                              child.path === currentRoute
                                ? "bg-ui-surface font-semibold text-ui-foreground shadow-ui-sm ring-1 ring-ui-border/70"
                                : "text-ui-muted hover:bg-ui-surface hover:text-ui-foreground"
                            }
                          `}
                            onClick={() => {
                              if (child.path) {
                                navigateTo(child.path);
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
                const isActive = routeChildren[0].path === currentRoute;
                return (
                  <SidebarTooltip
                    key={routeChildren[0].name}
                    content={t(routeChildren[0].name)}
                  >
                    <button
                      aria-label={t(child.name)}
                      aria-current={isActive ? "page" : undefined}
                      className={`
                      group ui-focus-ring flex h-9 w-full items-center gap-3 rounded-ui-md px-2.5
                      text-[13px] transition-colors active:scale-[0.99]
                      ${
                        isActive
                          ? "bg-ui-surface font-semibold text-ui-foreground shadow-ui-sm ring-1 ring-ui-border/70"
                          : "text-ui-muted hover:bg-ui-surface hover:text-ui-foreground"
                      }
                    `}
                      onClick={() => {
                        if (routeChildren[0].path) {
                          navigateTo(routeChildren[0].path);
                        }
                      }}
                    >
                      <div
                        className={`flex items-center justify-center flex-shrink-0 transition-colors ${
                          isActive
                            ? "text-ui-primary"
                            : "text-ui-muted group-hover:text-ui-foreground"
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
              const isActive = route.path === currentRoute;
              return (
                <SidebarTooltip key={route.name} content={t(route.name)}>
                  <button
                    aria-label={t(route.name)}
                    aria-current={isActive ? "page" : undefined}
                    className={`
                    group ui-focus-ring flex h-9 w-full items-center gap-3 rounded-ui-md px-2.5
                    text-[13px] transition-colors active:scale-[0.99]
                    ${
                      isActive
                        ? "bg-ui-surface font-semibold text-ui-foreground shadow-ui-sm ring-1 ring-ui-border/70"
                        : "text-ui-muted hover:bg-ui-surface hover:text-ui-foreground"
                    }
                  `}
                    onClick={() => {
                      if (route.path) {
                        navigateTo(route.path);
                      }
                    }}
                  >
                    <div
                      className={`flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive
                          ? "text-ui-primary"
                          : "text-ui-muted group-hover:text-ui-foreground"
                      }`}
                    >
                      <IconComponent className="text-[18px]" />
                    </div>
                    {isSidebarOpen && <span>{t(route.name)}</span>}
                  </button>
                </SidebarTooltip>
              );
            })}
          </nav>

        </div>

        <div className="border-t border-ui-border/60 p-2.5">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2.5 rounded-ui-lg border border-ui-border/70 bg-ui-surface p-2 shadow-ui-sm">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ui-ink text-[11px] font-semibold text-white">
                {(user?.name || user?.email || "U").slice(0, 1).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-semibold leading-4 text-ui-foreground">
                  {user?.name || user?.email?.split("@")[0] || t("User")}
                </p>
                <p className="truncate text-[10.5px] leading-4 text-ui-muted">
                  {user?.email}
                </p>
              </div>
              <SidebarTooltip content={t("Logout")}>
                <button
                  aria-label={t("Logout")}
                  onClick={logout}
                  className="ui-focus-ring flex size-7 shrink-0 items-center justify-center rounded-full text-ui-muted transition-colors hover:bg-ui-danger-subtle hover:text-ui-danger"
                >
                  <IoIosLogOut className="text-[16px]" />
                </button>
              </SidebarTooltip>
            </div>
          ) : (
            <SidebarTooltip content={t("Logout")}>
              <button
                aria-label={t("Logout")}
                onClick={logout}
                className="ui-focus-ring flex h-10 w-full items-center justify-center rounded-ui-md text-ui-muted transition-colors hover:bg-ui-danger-subtle hover:text-ui-danger"
              >
                <IoIosLogOut className="text-[18px]" />
              </button>
            </SidebarTooltip>
          )}
        </div>
      </aside>
    </>
  );
};
