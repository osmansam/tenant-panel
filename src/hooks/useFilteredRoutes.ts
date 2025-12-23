import { useMemo } from "react";
import { allRoutes } from "../navigation/constants";
import { useDynamicPages } from "./useDynamicPages";
// import { Role } from "../types";
// import { useGetPanelControlPages } from "../utils/api/panelControl/page";

export const useFilteredRoutes = () => {
  // const { user } = useUserContext();
  // const pages = useGetPanelControlPages();

  const { dynamicRoutes } = useDynamicPages();

  // Commented out user check since authentication is disabled
  // if (
  //   !user
  //   // || !pages
  // ) {
  //   return [];
  // }

  const routes = useMemo(() => {
    // Merge static routes with dynamic routes at root level
    return [...allRoutes, ...dynamicRoutes];
  }, [dynamicRoutes]); // ?.filter((route) => {
  //   if (!route.children) {
  //     return (
  //       route?.exceptionalRoles?.includes((user?.role as Role)._id) ||
  //       pages?.some(
  //         (page) =>
  //           page.name === route.name &&
  //           page.permissionRoles?.includes((user?.role as Role)._id)
  //       )
  //     );
  //   } else {
  //     return route.children.some(
  //       (child) =>
  //         child?.exceptionalRoles?.includes((user?.role as Role)._id) ||
  //         pages?.some(
  //           (page) =>
  //             page.name === child.name &&
  //             page.permissionRoles?.includes((user?.role as Role)._id)
  //         )
  //     );
  //   }
  // });

  return routes || [];
};
