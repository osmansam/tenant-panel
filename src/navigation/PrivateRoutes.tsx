import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ACCESS_TOKEN } from "../utils/api/axiosClient";
import { PublicRoutes } from "./constants";

export function PrivateRoutes() {
  useAuth();
  const location = useLocation();
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (!token) {
    return <Navigate to={PublicRoutes.Login} state={{ from: location }} replace />;
  }

  return <Outlet />;
}
