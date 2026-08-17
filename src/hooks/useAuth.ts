import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/User.context";
import { PublicRoutes } from "../navigation/constants";
import { Tenant } from "../types";
import { axiosClient } from "../utils/api/axiosClient";

const useAuth = () => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUser = async (): Promise<void> => {
      if (user) return;

      try {
        const { data } = await axiosClient.get("/tenant/auth/session");
        if (!data?.authenticated) throw new Error("Unauthenticated");
      } catch {
        navigate(PublicRoutes.Login, {
          replace: true,
          state: { from: location },
        });
        return;
      }

      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          // Set user from localStorage if available
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (e) {
          console.error("Failed to parse stored user:", e);
          // Clear invalid user data and logout
          logout();
        }
      } else {
        navigate(PublicRoutes.Login, {
          replace: true,
          state: { from: location },
        });
      }
    };

    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === "loggedOut" && event.newValue === "true") {
        setUser(undefined);
        navigate(PublicRoutes.Login, {
          replace: true,
        });
      }

      // Handle login from another tab
      if (event.key === "loggedIn" && event.newValue === "true") {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
            // Navigate to dashboard or intended location
            const intendedPath = location.state?.from?.pathname || "/";
            navigate(intendedPath, { replace: true });
          } catch (e) {
            console.error("Failed to parse user from storage event:", e);
          }
        }
      }
    };

    window.addEventListener("storage", handleStorageEvent);
    getUser();

    return () => {
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, [user, setUser, navigate, location]);

  const logout = () => {
    localStorage.clear();
    localStorage.setItem("loggedOut", "true");
    setTimeout(() => localStorage.removeItem("loggedOut"), 500);
    setUser(undefined);
    navigate(PublicRoutes.Login, { replace: true });
  };

  const getCurrentTenant = (): Tenant | null => {
    const currentTenant = localStorage.getItem("currentTenant");
    return currentTenant ? JSON.parse(currentTenant) : null;
  };

  const switchTenant = (tenant: Tenant) => {
    if (user && user.allTenants) {
      const targetTenant = user.allTenants.find(
        (t: Tenant) => t.id === tenant.id
      );
      if (targetTenant) {
        localStorage.setItem("currentTenant", JSON.stringify(targetTenant));
        // You might want to refresh the token for the new tenant here
        window.location.reload(); // Simple approach to reset app state
      }
    }
  };

  return {
    setUser,
    logout,
    getCurrentTenant,
    switchTenant,
    isAuthenticated: !!user,
  };
};

export default useAuth;
