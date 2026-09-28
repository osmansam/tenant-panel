// Navigation constants for tenant panel application

// Public routes (accessible without authentication)
export enum PublicRoutes {
  NotFound = "*",
  Login = "/login",
  Register = "/register",
  GoogleCallback = "/auth/google/callback",
}

// Protected routes (require authentication)
export enum Routes {
  Home = "/",
  Dashboard = "/dashboard",
  Projects = "/projects",
  ProjectManagement = "/project-management",
  Collections = "/collections",
  Pages = "/pages",
  Localization = "/localization",
  Integrations = "/integrations",
  Settings = "/settings",
  Users = "/users",
  Profile = "/profile",
}

// Route metadata for navigation and sidebar
export interface RouteConfig {
  name: string;
  path: string;
  isOnSidebar: boolean;
  icon?: string;
  requiredRoles?: string[];
  element?: () => JSX.Element;
  children?: RouteConfig[];
}

// Static/system routes configuration
export const systemRoutes: RouteConfig[] = [
  {
    name: "Dashboard",
    path: Routes.Dashboard,
    isOnSidebar: true,
    icon: "MdSpaceDashboard",
  },
  {
    name: "Projects",
    path: Routes.Projects,
    isOnSidebar: true,
    icon: "MdFolder",
  },
  {
    name: "Collections",
    path: Routes.Collections,
    isOnSidebar: true,
    icon: "MdInventory2",
    requiredRoles: [
      "tenant_owner",
      "tenant_admin",
      "project_admin",
      "project_developer",
      "project_editor",
      "project_viewer",
    ],
  },
  {
    name: "Pages",
    path: Routes.Pages,
    isOnSidebar: true,
    icon: "MdDescription",
    requiredRoles: [
      "tenant_owner",
      "tenant_admin",
      "project_admin",
      "project_developer",
      "project_editor",
      "project_viewer",
    ],
  },
  {
    name: "Localization",
    path: Routes.Localization,
    isOnSidebar: true,
    icon: "MdTranslate",
  },
  {
    name: "Integrations",
    path: Routes.Integrations,
    isOnSidebar: true,
    icon: "MdVpnKey",
    requiredRoles: ["project_admin", "project_developer"],
  },
  {
    name: "Users",
    path: Routes.Users,
    isOnSidebar: true,
    icon: "MdGroup",
    requiredRoles: ["tenant_owner", "tenant_admin"],
  },
  {
    name: "Settings",
    path: Routes.Settings,
    isOnSidebar: true,
    icon: "MdSettings",
  },
  {
    name: "Profile",
    path: Routes.Profile,
    isOnSidebar: false,
    icon: "MdPerson",
  },
];

// This will be replaced/extended with dynamic routes from backend
export const allRoutes = systemRoutes;

export const NO_IMAGE_URL =
  "https://res.cloudinary.com/dvbg/image/upload/ar_4:4,c_crop/c_fit,h_100/davinci/no-image_pyet1d.jpg";
