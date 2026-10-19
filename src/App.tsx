import {
  QueryClient,
  QueryClientProvider,
  useIsMutating,
} from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./common/Loading";
import { lazy, Suspense } from "react";
import { RouteErrorBoundary } from "./common/RouteErrorBoundary";
import { NavigationRecovery } from "./common/NavigationRecovery";
import { WorkspaceLayout } from "./common/WorkspaceLayout";
import { GeneralContextProvider } from "./context/General.context";
import { UserContextProvider } from "./context/User.context";
import { useWebSocket } from "./hooks/useWebSocket";
import { PublicRoutes } from "./navigation/constants";
import RouterContainer from "./navigation/routes";

const Sidebar = lazy(() => import("./common/Sidebar").then((module) => ({ default: module.Sidebar })));

function App() {
  const isMutating = useIsMutating();
  const location = useLocation();
  useWebSocket();

  // Don't show sidebar on public pages or if user is not authenticated
  const isPublicRoute = Object.values(PublicRoutes).includes(
    location.pathname as any
  );
  const showSidebar = !isPublicRoute && !!localStorage.getItem("user");

  return (
    <div className="App">
      <UserContextProvider>
        <GeneralContextProvider>
          {isMutating ? <Loading /> : null}
          {showSidebar ? (
            <WorkspaceLayout sidebar={<RouteErrorBoundary resetKey={location.pathname} fallback={(onRetry, requiresReload) => <NavigationRecovery onRetry={onRetry} requiresReload={requiresReload} />}><Suspense fallback={<div className="hidden w-16 shrink-0 border-r border-ui-border bg-ui-surface md:block" />}><Sidebar /></Suspense></RouteErrorBoundary>}>
              <RouterContainer />
            </WorkspaceLayout>
          ) : (
            <div className="h-dvh overflow-auto bg-ui-page font-ui text-ui-foreground">
              <RouterContainer />
            </div>
          )}
          <ToastContainer
            autoClose={2000}
            hideProgressBar={true}
            transition={Slide}
            closeButton={false}
            position="bottom-right"
          />
        </GeneralContextProvider>
      </UserContextProvider>
    </div>
  );
}

// Create QueryClient once outside component to prevent recreation
const queryClient = new QueryClient();

// We are wrapping the App component to be able to use isMutating hooks in it
function Wrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

export default Wrapper;
