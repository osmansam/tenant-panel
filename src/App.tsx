import {
  QueryClient,
  QueryClientProvider,
  useIsMutating,
} from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./common/Loading";
import { Sidebar } from "./common/Sidebar";
import { GeneralContextProvider } from "./context/General.context";
import { UserContextProvider } from "./context/User.context";
import { useWebSocket } from "./hooks/useWebSocket";
import { PublicRoutes } from "./navigation/constants";
import RouterContainer from "./navigation/routes";
import { ACCESS_TOKEN } from "./utils/api/axiosClient";

function App() {
  const isMutating = useIsMutating();
  const location = useLocation();
  useWebSocket();

  // Don't show sidebar on public pages or if user is not authenticated
  const token = localStorage.getItem(ACCESS_TOKEN);
  const isPublicRoute = Object.values(PublicRoutes).includes(
    location.pathname as any
  );
  const showSidebar = !isPublicRoute && !!token;

  return (
    <div className="App">
      <UserContextProvider>
        <GeneralContextProvider>
          {isMutating ? <Loading /> : null}
          <div className="flex h-screen">
            {showSidebar && <Sidebar />}
            <main className="flex-1 overflow-auto">
              <RouterContainer />
            </main>
          </div>
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
