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
          className="md:hidden fixed inset-0 bg-black/50 transition-opacity duration-300 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          flex-shrink-0 flex flex-col border-r border-gray-200 bg-white
          transition-all duration-300 ease-in-out shadow-lg
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
        <div
          className={`h-16 bg-gray-800 flex items-center border-b border-gray-700 transition-all duration-200 ${
            isSidebarOpen ? "justify-end pr-4" : "justify-center"
          }`}
        >
          <button
            onClick={() => {
              if (isSidebarOpen) {
                setOpenGroups({});
              }
              setIsSidebarOpen(!isSidebarOpen);
            }}
            className="flex items-center justify-center w-10 h-10 rounded-lg 
              text-white hover:bg-gray-700 transition-all duration-200"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? (
              <FiChevronLeft className="text-2xl" />
            ) : (
              <FiChevronRight className="text-2xl" />
            )}
          </button>
        </div>

        <div className="flex flex-col h-[calc(100%-4rem)] py-3 px-2 bg-white overflow-y-auto">
          {/* Project Context Section */}
          {isInProject && currentProject && (
            <div className="mb-4 p-2 bg-blue-50 rounded-lg border border-blue-200">
              {isSidebarOpen ? (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MdBusinessCenter className="text-blue-600 text-lg" />
                    <span className="text-sm font-semibold text-blue-900">
                      {t("Current Project")}
                    </span>
                  </div>
                  <div className="text-sm text-blue-800 mb-2">
                    {currentProject.name}
                  </div>
                  <button
                    onClick={handleSwitchBackToTenant}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
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
                    className="w-full flex items-center justify-center p-1 text-blue-600 hover:text-blue-800 transition-colors"
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
                        className="w-full flex items-center justify-between px-2 py-2 rounded-lg
                        text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="flex items-center justify-center text-gray-700 flex-shrink-0">
                            <IconComponent className="text-xl" />
                          </div>
                          {isSidebarOpen && <span>{t(route.name)}</span>}
                        </div>
                        {isSidebarOpen &&
                          (openGroups[route.name] ? (
                            <FiChevronDown className="text-sm" />
                          ) : (
                            <FiChevronRight className="text-sm" />
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
                            w-full flex items-center pl-8 pr-3 py-2 rounded-lg mt-1
                            text-sm transition-colors
                            ${
                              child.path === currentRoute
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "text-gray-600 hover:bg-gray-50"
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
                      w-full flex items-center gap-2.5 px-2 py-2 rounded-lg
                      text-sm transition-colors
                      ${
                        routeChildren[0].path === currentRoute
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
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
                            ? "text-blue-600"
                            : "text-gray-700"
                        }`}
                      >
                        <IconComponent className="text-xl" />
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
                    w-full flex items-center gap-2.5 px-2 py-2 rounded-lg
                    text-sm transition-colors
                    ${
                      route.path === currentRoute
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
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
                          ? "text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      <IconComponent className="text-xl" />
                    </div>
                    {isSidebarOpen && <span>{t(route.name)}</span>}
                  </button>
                </SidebarTooltip>
              );
            })}
          </div>

          <div className="border-t border-gray-200 pt-3 mt-3">
            <SidebarTooltip content={t("Logout")}>
              <button
                onClick={logout}
                className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg
                text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <div className="flex items-center justify-center text-red-600 flex-shrink-0">
                  <IoIosLogOut className="text-xl" />
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
