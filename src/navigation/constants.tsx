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
  AuditLogs = "/audit-logs",
  Projects = "/projects",
  ProjectManagement = "/project-management",
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
    icon: "🏠",
  },
  {
    name: "Audit Logs",
    path: Routes.AuditLogs,
    isOnSidebar: true,
    icon: "📋",
    requiredRoles: ["tenant_owner", "tenant_admin", "tenant_auditor"],
  },
  {
    name: "Projects",
    path: Routes.Projects,
    isOnSidebar: true,
    icon: "📁",
  },
  {
    name: "Project Management",
    path: Routes.ProjectManagement,
    isOnSidebar: true,
    icon: "🔧",
    requiredRoles: [
      "project_admin",
      "project_developer",
      "project_editor",
      "project_viewer",
    ],
  },
  {
    name: "Integrations",
    path: Routes.Integrations,
    isOnSidebar: true,
    icon: "MdKey",
    requiredRoles: ["project_admin", "project_developer"],
  },
  {
    name: "Users",
    path: Routes.Users,
    isOnSidebar: true,
    icon: "👥",
    requiredRoles: ["tenant_owner", "tenant_admin"],
  },
  {
    name: "Settings",
    path: Routes.Settings,
    isOnSidebar: true,
    icon: "⚙️",
  },
  {
    name: "Profile",
    path: Routes.Profile,
    isOnSidebar: false,
    icon: "👤",
  },
];

// This will be replaced/extended with dynamic routes from backend
export const allRoutes = systemRoutes;

export const NO_IMAGE_URL =
  "https://res.cloudinary.com/dvbg/image/upload/ar_4:4,c_crop/c_fit,h_100/davinci/no-image_pyet1d.jpg";
