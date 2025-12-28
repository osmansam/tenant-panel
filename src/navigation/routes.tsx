import { Navigate, Route, Routes } from "react-router-dom";
import { GoogleCallbackHandler } from "../components/auth";
import {
  Dashboard,
  LoginPage,
  ProjectManagementPage,
  RegisterPage,
} from "../pages";
import ProjectsPage from "../pages/ProjectsPage";
import { PrivateRoutes } from "./PrivateRoutes";
import { Routes as ProtectedRoutes, PublicRoutes } from "./constants";

interface RouteConfig {
  name: string;
  path?: string;
  isOnSidebar: boolean;
  icon?: string;
  element?: () => JSX.Element;
  children?: RouteConfig[];
  link?: string;
}

const RouterContainer = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={PublicRoutes.Login} element={<LoginPage />} />
      <Route path={PublicRoutes.Register} element={<RegisterPage />} />
      <Route
        path={PublicRoutes.GoogleCallback}
        element={<GoogleCallbackHandler />}
      />

      {/* Protected Routes */}
      <Route path="/" element={<PrivateRoutes />}>
        <Route
          index
          element={<Navigate to={ProtectedRoutes.Dashboard} replace />}
        />
        <Route path={ProtectedRoutes.Dashboard} element={<Dashboard />} />
        <Route
          path={ProtectedRoutes.Home}
          element={<Navigate to={ProtectedRoutes.Dashboard} replace />}
        />

        {/* TODO: Add other protected routes */}
        {/* <Route path={ProtectedRoutes.AuditLogs} element={<AuditLogsPage />} /> */}
        <Route path={ProtectedRoutes.Projects} element={<ProjectsPage />} />
        <Route
          path={ProtectedRoutes.ProjectManagement}
          element={<ProjectManagementPage />}
        />
        {/* <Route path={ProtectedRoutes.Users} element={<UsersPage />} /> */}
        {/* <Route path={ProtectedRoutes.Settings} element={<SettingsPage />} /> */}
        {/* <Route path={ProtectedRoutes.Profile} element={<ProfilePage />} /> */}
      </Route>

      {/* 404 Route */}
      <Route path={PublicRoutes.NotFound} element={<div>Page Not Found</div>} />
    </Routes>
  );
};

export default RouterContainer;
