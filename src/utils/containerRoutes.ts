export interface CanonicalContainerRouteSpec {
  isAuthenticated: boolean;
  isAuthorized: boolean;
  authorizeRole: string[];
  isActive: boolean;
  method: string;
}

export type CanonicalContainerRoutes = Record<
  string,
  CanonicalContainerRouteSpec
>;

export function normalizeContainerRouteSpec(
  routeSpec: Record<string, any> = {},
): CanonicalContainerRouteSpec {
  return {
    isAuthenticated:
      routeSpec.isAuthenticated ?? routeSpec.IsAuthenticated ?? false,
    isAuthorized: routeSpec.isAuthorized ?? routeSpec.IsAuthorized ?? false,
    authorizeRole: routeSpec.authorizeRole ?? routeSpec.AuthorizeRole ?? [],
    isActive: routeSpec.isActive ?? routeSpec.IsActive ?? false,
    method: routeSpec.method ?? routeSpec.Method ?? "GET",
  };
}

export function normalizeContainerRoutes(
  routes: Record<string, any> = {},
): CanonicalContainerRoutes {
  return Object.fromEntries(
    Object.entries(routes).map(([routeName, routeSpec]) => [
      routeName,
      normalizeContainerRouteSpec(routeSpec),
    ]),
  );
}

export function updateContainerRouteSpec(
  routes: Record<string, any>,
  routeName: string,
  updates: Partial<CanonicalContainerRouteSpec>,
): CanonicalContainerRoutes {
  const normalizedRoutes = normalizeContainerRoutes(routes);

  return {
    ...normalizedRoutes,
    [routeName]: {
      ...normalizeContainerRouteSpec(normalizedRoutes[routeName]),
      ...updates,
    },
  };
}

export function toggleContainerRouteFlag(
  routes: Record<string, any>,
  routeName: string,
  flag: "isActive" | "isAuthenticated" | "isAuthorized",
  value: boolean,
): CanonicalContainerRoutes {
  return updateContainerRouteSpec(routes, routeName, { [flag]: value });
}
