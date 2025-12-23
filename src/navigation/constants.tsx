// import { Tab } from "../components/panelComponents/shared/types";

// Removed all missing page imports - only keeping existing pages
export enum PublicRoutes {
  NotFound = "*",
  Login = "/login",
  GoogleCallback = "/auth/google/callback",
}

export enum Routes {
  AuditLogs = "/audit-logs",
}

// Static/hardcoded routes (you can keep these or move them to dynamic pages)
export const staticRoutes: {
  name: string;
  path?: string;
  isOnSidebar: boolean;
  exceptionalRoles?: number[];
  link?: string;
  icon?: string;
  element?: () => JSX.Element;
  children?: typeof staticRoutes;
}[] = [];

// This will be replaced with dynamic routes
export const allRoutes = staticRoutes;

export const NO_IMAGE_URL =
  "https://res.cloudinary.com/dvbg/image/upload/ar_4:4,c_crop/c_fit,h_100/davinci/no-image_pyet1d.jpg";
