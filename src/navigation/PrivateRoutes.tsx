import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { PublicRoutes } from "./constants";

export function PrivateRoutes() {
  const { isAuthenticated, isLoading, authError } = useAuth();
  const location = useLocation();

  if (isLoading) return <div role="status">Checking workspace access…</div>;
  if (authError) return <div role="alert">Unable to verify workspace access. Reload to try again.</div>;
  if (!isAuthenticated) {
    return (
      <Navigate to={PublicRoutes.Login} state={{ from: location }} replace />
    );
  }

  return <Outlet />;
}
