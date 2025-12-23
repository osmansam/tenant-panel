import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { PublicRoutes } from "./constants";

export function PrivateRoutes() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to={PublicRoutes.Login} state={{ from: location }} replace />
    );
  }

  return <Outlet />;
}
