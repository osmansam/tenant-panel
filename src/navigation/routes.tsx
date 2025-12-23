import { Routes } from "react-router-dom";

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
      {/* <Route path={PublicRoutes.Login} element={<Login />} /> */}
      {/* <Route path={PublicRoutes.GoogleCallback} element={<GoogleCallback />} /> */}
    </Routes>
  );
};

export default RouterContainer;
