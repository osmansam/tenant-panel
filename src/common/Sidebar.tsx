import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
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
        // Show project management and hide projects list
        if (route.path === "/project-management") return true;
        if (route.path === "/projects") return false;

        // Show other routes based on roles
        if (route.requiredRoles) {
          const userRoles = user?.roles || [];
          return route.requiredRoles.some((role) => userRoles.includes(role));
        }
        return true;
      } else {
        // In tenant context - hide project management
        if (route.path === "/project-management") return false;

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
    Cookies.remove("jwt");
    Cookies.remove("refreshToken");
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
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          flex-shrink-0 flex flex-col border-r border-neutral-200 bg-white
          transition-all duration-300 ease-in-out
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
        <div className="h-16 flex items-center border-b border-neutral-200 bg-white">
          {isSidebarOpen ? (
            <div className="flex items-center justify-between w-full px-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center shadow-sm">
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
                  <h1 className="text-sm font-semibold text-neutral-900 tracking-tight">
                    Tenant Panel
                  </h1>
                  <p className="text-xs text-neutral-500">
                    {user?.email?.split("@")[0] || "User"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setOpenGroups({});
                  setIsSidebarOpen(false);
                }}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-all active:scale-95"
                aria-label="Collapse Sidebar"
              >
                <FiChevronLeft className="text-lg" strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center justify-center w-10 h-10 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-all active:scale-95"
                aria-label="Expand Sidebar"
              >
                <FiChevronRight className="text-lg" strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col h-[calc(100%-4rem)] py-4 px-3 bg-white overflow-y-auto">
          {/* Project Context Section */}
          {isInProject && currentProject && (
            <div className="mb-4 p-3 bg-violet-50 rounded-xl border border-violet-200">
              {isSidebarOpen ? (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-md bg-violet-100 flex items-center justify-center">
                      <MdBusinessCenter className="text-violet-600 text-sm" />
                    </div>
                    <span className="text-xs font-semibold text-violet-900">
                      {t("Current Project")}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-violet-800 mb-2.5 truncate">
                    {currentProject.name}
                  </div>
                  <button
                    onClick={handleSwitchBackToTenant}
                    className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-violet-700 bg-white border border-violet-200 rounded-lg hover:bg-violet-50 transition-all active:scale-95 w-full justify-center"
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
                    className="w-full flex items-center justify-center p-2 text-violet-600 hover:text-violet-800 hover:bg-violet-100 rounded-lg transition-all active:scale-95"
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
                        className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-all active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center text-neutral-600 flex-shrink-0">
                            <IconComponent className="text-[18px]" />
                          </div>
                          {isSidebarOpen && (
                            <span className="text-sm">{t(route.name)}</span>
                          )}
                        </div>
                        {isSidebarOpen &&
                          (openGroups[route.name] ? (
                            <FiChevronDown
                              className="text-sm text-neutral-400"
                              strokeWidth={2.5}
                            />
                          ) : (
                            <FiChevronRight
                              className="text-sm text-neutral-400"
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
                            className={`
                            w-full flex items-center pl-10 pr-3 py-2 rounded-lg mt-0.5
                            text-sm transition-all active:scale-[0.98]
                            ${
                              child.path === currentRoute
                                ? "bg-violet-50 text-violet-700 font-medium"
                                : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
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
                      className={`
                      w-full flex items-center gap-3 px-2.5 py-2 rounded-lg
                      text-sm transition-all active:scale-[0.98]
                      ${
                        routeChildren[0].path === currentRoute
                          ? "bg-violet-50 text-violet-700 font-medium"
                          : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
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
                            ? "text-violet-600"
                            : "text-neutral-600"
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
                    className={`
                    w-full flex items-center gap-3 px-2.5 py-2 rounded-lg
                    text-sm transition-all active:scale-[0.98]
                    ${
                      route.path === currentRoute
                        ? "bg-violet-50 text-violet-700 font-medium"
                        : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
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
                          ? "text-violet-600"
                          : "text-neutral-600"
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

          <div className="border-t border-neutral-200 pt-3 mt-3">
            <SidebarTooltip content={t("Logout")}>
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all active:scale-[0.98]"
              >
                <div className="flex items-center justify-center text-red-600 flex-shrink-0">
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
