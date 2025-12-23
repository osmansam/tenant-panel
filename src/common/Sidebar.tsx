import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useGeneralContext } from "../context/General.context";
import { useFilteredRoutes } from "../hooks/useFilteredRoutes";
import { getIconByName, getMenuIcon } from "../utils/menuIcons";
import SidebarTooltip from "./SidebarTooltip";

export const Sidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { isSidebarOpen, setIsSidebarOpen, resetGeneralContext } =
    useGeneralContext();
  // const { setUser } = useUserContext();
  // const user = useGetUser();
  const currentRoute = location.pathname;
  const [openGroups, setOpenGroups] = useState<{ [group: string]: boolean }>(
    {}
  );

  const routes = useFilteredRoutes();

  // Commented out since permission filtering is disabled
  // const pages = useGetPanelControlPages();

  const toggleGroup = (groupName: string) => {
    setOpenGroups((prev) => ({ ...prev, [groupName]: !prev[groupName] }));
  };

  if (
    // !user ||
    routes.length === 0
  ) {
    return null;
  }

  const logout = () => {
    localStorage.clear();
    localStorage.setItem("loggedOut", "true");
    setTimeout(() => localStorage.removeItem("loggedOut"), 500);
    Cookies.remove("jwt");
    // setUser(undefined);
    queryClient.clear();
    navigate("/login");
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="hidden lg:block fixed inset-0 bg-black/20 transition-opacity duration-300 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          hidden lg:block fixed top-0 left-0 h-screen border-r border-gray-200
          transition-all duration-300 ease-in-out shadow-lg z-50
          ${isSidebarOpen ? "w-64" : "w-16"}
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
          <div className="flex-1 space-y-1">
            {routes.map((route) => {
              // Commented out permission role filtering - showing all routes
              const filteredRouteChildren = route?.children;
              /* 
              const filteredRouteChildren = route?.children?.filter(
                (child) =>
                  child?.exceptionalRoles?.includes((user?.role as Role)._id) ||
                  pages?.some(
                    (page) =>
                      page.name === child.name &&
                      page.permissionRoles?.includes((user?.role as Role)._id)
                  )
              );
              */

              if (filteredRouteChildren && filteredRouteChildren?.length > 1) {
                // If route.icon exists and looks like an icon name (starts with 2+ capital letters like "MdCard", "FaHeart"), use getIconByName
                // Otherwise, use getMenuIcon with the route name
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
                      filteredRouteChildren
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
                            ${
                              child.link
                                ? "text-blue-600 hover:text-blue-700"
                                : ""
                            }
                          `}
                            onClick={() => {
                              if (child.link) {
                                window.location.href = child.link;
                                return;
                              }
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

              if (
                filteredRouteChildren &&
                filteredRouteChildren?.length === 1
              ) {
                if (!filteredRouteChildren[0].isOnSidebar) return null;
                const child = filteredRouteChildren[0];
                // If child.icon exists and looks like an icon name, use getIconByName
                const IconComponent =
                  child.icon && /^[A-Z][a-z]+[A-Z]/.test(child.icon)
                    ? getIconByName(child.icon)
                    : getMenuIcon(child.icon || child.name);
                return (
                  <SidebarTooltip
                    key={filteredRouteChildren[0].name}
                    content={t(filteredRouteChildren[0].name)}
                  >
                    <button
                      className={`
                      w-full flex items-center gap-2.5 px-2 py-2 rounded-lg
                      text-sm transition-colors
                      ${
                        filteredRouteChildren[0].path === currentRoute
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                      ${
                        filteredRouteChildren[0].link
                          ? "text-blue-600 hover:text-blue-700"
                          : ""
                      }
                    `}
                      onClick={() => {
                        if (filteredRouteChildren[0].link) {
                          window.location.href = filteredRouteChildren[0].link;
                          return;
                        }
                        if (filteredRouteChildren[0].path) {
                          resetGeneralContext();
                          navigate(filteredRouteChildren[0].path);
                          window.scrollTo(0, 0);
                        }
                      }}
                    >
                      <div
                        className={`flex items-center justify-center flex-shrink-0 ${
                          filteredRouteChildren[0].path === currentRoute
                            ? "text-blue-600"
                            : "text-gray-700"
                        }`}
                      >
                        <IconComponent className="text-xl" />
                      </div>
                      {isSidebarOpen && (
                        <span>{t(filteredRouteChildren[0].name)}</span>
                      )}
                    </button>
                  </SidebarTooltip>
                );
              }

              if (!route.isOnSidebar) return null;
              // If route.icon exists and looks like an icon name, use getIconByName
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
                    ${route.link ? "text-blue-600 hover:text-blue-700" : ""}
                  `}
                    onClick={() => {
                      if (route.link) {
                        window.location.href = route.link;
                        return;
                      }
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
