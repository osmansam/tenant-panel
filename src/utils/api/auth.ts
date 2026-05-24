import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { Location, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/User.context";
// import { Routes } from "../../navigation/constants";
import { get, post } from "./index";

const CONTEXT_CHANGED_EVENT = "autotable-context-changed";

function notifyContextChanged() {
  window.dispatchEvent(new Event(CONTEXT_CHANGED_EVENT));
}

interface LoginError {
  response: {
    data: {
      message: string;
      statusCode: number;
    };
  };
}

export type LoginCredentials = Record<string, any>;

import type { Tenant, User } from "../../types";

export interface LoginResponse {
  token: string;
  user: User;
}

// Tenant authentication types
export interface TenantLoginCredentials {
  email: string;
  password: string;
}

export interface TenantRegisterCredentials {
  email: string;
  password: string;
  name: string;
  tenantName: string;
  tenantSlug: string;
}

export interface TenantUser {
  id: string;
  email: string;
  name: string;
}

export interface TenantLoginResponse {
  status: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: TenantUser;
    tenant: Tenant;
    allTenants: Tenant[];
    roles: string[];
  };
}

export interface GoogleLoginResponse extends TenantLoginResponse {}

async function loginMethod(payload: LoginCredentials) {
  return post<LoginCredentials, LoginResponse>({
    path: "/auth/login",
    payload,
  });
}

export function useLogin(
  location?: Location,
  onError?: (error: unknown) => void
) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setUser } = useUserContext();
  const { mutate: login } = useMutation<
    LoginResponse,
    LoginError,
    LoginCredentials
  >({
    mutationFn: loginMethod,
    // We are updating tables query data with new item
    onSuccess: async (response: LoginResponse) => {
      const { token, user } = response;
      Cookies.set("jwt", token);
      toast.success(t("Logged in successfully"));
      localStorage.setItem("jwt", token);
      localStorage.setItem("loggedIn", "true");
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      }
      const target = location
        ? `${location.pathname}${location.search}`
        : // : Routes.HOME; // If no location is provided, redirect to home page
          "/";
      navigate(target);
    },

    onError,
  });
  return { login };
}

async function logoutMethod() {
  return post<undefined, { success: boolean }>({
    path: "/auth/logout",
    payload: undefined,
  });
}

export function useLogout(onError?: (error: unknown) => void) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setUser } = useUserContext();
  const { mutateAsync: logout } = useMutation({
    mutationFn: logoutMethod,
    onSuccess: () => {
      localStorage.clear();
      localStorage.setItem("loggedOut", "true");
      setTimeout(() => localStorage.removeItem("loggedOut"), 500);
      Cookies.remove("jwt");
      setUser(undefined);
      queryClient.clear();
      navigate("/login");
    },
    onError,
  });

  return { logout };
}

// Tenant Authentication Methods
async function tenantLoginMethod(payload: TenantLoginCredentials) {
  return post<TenantLoginCredentials, TenantLoginResponse>({
    path: "/tenant/auth/login",
    payload,
  });
}

export function useTenantLogin(
  location?: Location,
  onError?: (error: unknown) => void
) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setUser } = useUserContext();
  const { mutate: tenantLogin } = useMutation<
    TenantLoginResponse,
    LoginError,
    TenantLoginCredentials
  >({
    mutationFn: tenantLoginMethod,
    onSuccess: async (response: TenantLoginResponse) => {
      const { data } = response;
      const { accessToken, refreshToken, user, tenant, allTenants, roles } =
        data;

      // Store tenant token separately
      Cookies.set("jwt", accessToken);
      Cookies.set("refreshToken", refreshToken);
      localStorage.setItem("jwt", accessToken);
      localStorage.setItem("tenantToken", accessToken); // Store tenant token separately
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("loggedIn", "true");
      toast.success(t("Logged in successfully"));

      if (user) {
        // Create extended user object with tenant info
        const extendedUser: User = {
          id: user.id,
          _id: user.id,
          email: user.email,
          name: user.name,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          role: roles[0] || "user",
          tenantId: tenant.id,
          tenantName: tenant.name,
          tenantSlug: tenant.slug,
          roles,
          allTenants,
        };
        localStorage.setItem("user", JSON.stringify(extendedUser));
        localStorage.setItem("currentTenant", JSON.stringify(tenant));
        setUser(extendedUser);
        notifyContextChanged();
      }

      const target = location ? `${location.pathname}${location.search}` : "/";
      navigate(target);
    },
    onError,
  });

  return { tenantLogin };
}

async function tenantRegisterMethod(payload: TenantRegisterCredentials) {
  return post<TenantRegisterCredentials, TenantLoginResponse>({
    path: "/tenant/auth/register",
    payload,
  });
}

export function useTenantRegister(
  location?: Location,
  onError?: (error: unknown) => void
) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setUser } = useUserContext();
  const { mutate: tenantRegister } = useMutation<
    TenantLoginResponse,
    LoginError,
    TenantRegisterCredentials
  >({
    mutationFn: tenantRegisterMethod,
    onSuccess: async (response: TenantLoginResponse) => {
      const { data } = response;
      const { accessToken, refreshToken, user, tenant, allTenants, roles } =
        data;

      Cookies.set("jwt", accessToken);
      Cookies.set("refreshToken", refreshToken);
      toast.success(t("Account created and logged in successfully"));
      localStorage.setItem("jwt", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("loggedIn", "true");

      if (user) {
        // Create extended user object with tenant info
        const extendedUser: User = {
          id: user.id,
          _id: user.id,
          email: user.email,
          name: user.name,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          role: roles[0] || "user",
          tenantId: tenant.id,
          tenantName: tenant.name,
          tenantSlug: tenant.slug,
          roles,
          allTenants,
        };
        localStorage.setItem("user", JSON.stringify(extendedUser));
        localStorage.setItem("currentTenant", JSON.stringify(tenant));
        setUser(extendedUser);
        notifyContextChanged();
      }

      const target = location ? `${location.pathname}${location.search}` : "/";
      navigate(target);
    },
    onError,
  });

  return { tenantRegister };
}

async function googleLoginMethod() {
  // This will redirect to Google OAuth endpoint
  const response = await get<{ authUrl: string }>({
    path: "/tenant/auth/google",
  });
  return response;
}

export function useGoogleLogin(onError?: (error: unknown) => void) {
  const { mutate: initiateGoogleLogin } = useMutation<
    { authUrl: string },
    LoginError,
    void
  >({
    mutationFn: googleLoginMethod,
    onSuccess: (response) => {
      // Redirect to Google OAuth
      window.location.href = response.authUrl;
    },
    onError,
  });

  return { initiateGoogleLogin };
}

// Handle Google OAuth callback
async function handleGoogleCallbackMethod(code: string) {
  return post<{ code: string }, TenantLoginResponse>({
    path: "/tenant/auth/google/callback",
    payload: { code },
  });
}

export function useGoogleCallback(
  location?: Location,
  onError?: (error: unknown) => void
) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setUser } = useUserContext();
  const { mutate: handleGoogleCallback } = useMutation<
    TenantLoginResponse,
    LoginError,
    string
  >({
    mutationFn: handleGoogleCallbackMethod,
    onSuccess: async (response: TenantLoginResponse) => {
      const { data } = response;
      const { accessToken, refreshToken, user, tenant, allTenants, roles } =
        data;

      Cookies.set("jwt", accessToken);
      Cookies.set("refreshToken", refreshToken);
      toast.success(t("Logged in with Google successfully"));
      localStorage.setItem("jwt", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("loggedIn", "true");

      if (user) {
        // Create extended user object with tenant info
        const extendedUser: User = {
          id: user.id,
          _id: user.id,
          email: user.email,
          name: user.name,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          role: roles[0] || "user",
          tenantId: tenant.id,
          tenantName: tenant.name,
          tenantSlug: tenant.slug,
          roles,
          allTenants,
        };
        localStorage.setItem("user", JSON.stringify(extendedUser));
        localStorage.setItem("currentTenant", JSON.stringify(tenant));
        setUser(extendedUser);
        notifyContextChanged();
      }

      const target = location ? `${location.pathname}${location.search}` : "/";
      navigate(target);
    },
    onError,
  });

  return { handleGoogleCallback };
}

async function tenantLogoutMethod() {
  return post<undefined, { success: boolean }>({
    path: "/tenant/auth/logout",
    payload: undefined,
  });
}

export function useTenantLogout(onError?: (error: unknown) => void) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setUser } = useUserContext();
  const { mutateAsync: tenantLogout } = useMutation({
    mutationFn: tenantLogoutMethod,
    onSuccess: () => {
      localStorage.clear();
      localStorage.setItem("loggedOut", "true");
      setTimeout(() => localStorage.removeItem("loggedOut"), 500);
      Cookies.remove("jwt");
      Cookies.remove("refreshToken");
      setUser(undefined);
      queryClient.clear();
      navigate("/login");
    },
    onError,
  });

  return { tenantLogout };
}

// Refresh token functionality
async function refreshTokenMethod() {
  const refreshToken = Cookies.get("refreshToken");
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  return post<
    { refreshToken: string },
    { status: number; data: { accessToken: string } }
  >({
    path: "/tenant/auth/refresh",
    payload: { refreshToken },
  });
}

export function useRefreshToken(onError?: (error: unknown) => void) {
  const { setUser } = useUserContext();
  const { mutateAsync: refreshToken } = useMutation({
    mutationFn: refreshTokenMethod,
    onSuccess: (response) => {
      const { data } = response;
      Cookies.set("jwt", data.accessToken);
      localStorage.setItem("jwt", data.accessToken);
    },
    onError: (error) => {
      // If refresh fails, logout user
      localStorage.clear();
      Cookies.remove("jwt");
      Cookies.remove("refreshToken");
      setUser(undefined);
      window.location.href = "/login";
      if (onError) onError(error);
    },
  });

  return { refreshToken };
}

// Switch to project functionality
export interface SwitchToProjectRequest {
  projectId: string;
}

export interface SwitchToProjectResponse {
  status: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    project: {
      id: string;
      tenantId: string;
      tenantSlug: string;
      name: string;
      slug: string;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
    };
    roles: string[];
  };
}

async function switchToProjectMethod(payload: SwitchToProjectRequest) {
  return post<SwitchToProjectRequest, SwitchToProjectResponse>({
    path: "/tenant/auth/switch-project",
    payload,
  });
}

export function useSwitchToProject(onError?: (error: unknown) => void) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setUser } = useUserContext();
  const { mutate: switchToProject, isPending: isSwitching } = useMutation<
    SwitchToProjectResponse,
    LoginError,
    SwitchToProjectRequest
  >({
    mutationFn: switchToProjectMethod,
    onSuccess: async (response: SwitchToProjectResponse) => {
      const { data } = response;
      const { accessToken, refreshToken, project, roles } = data;

      // Store project token separately and set as active
      Cookies.set("jwt", accessToken);
      Cookies.set("refreshToken", refreshToken);
      localStorage.setItem("jwt", accessToken);
      localStorage.setItem("projectToken", accessToken); // Store project token separately
      localStorage.setItem("refreshToken", refreshToken);

      // Update user context with project information
      const currentUserData = localStorage.getItem("user");
      if (currentUserData) {
        const currentUser = JSON.parse(currentUserData);
        const updatedUser = {
          ...currentUser,
          projectId: project.id,
          projectName: project.name,
          projectSlug: project.slug,
          roles,
          roleScope: "project" as const,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        localStorage.setItem("currentProject", JSON.stringify(project));
        setUser(updatedUser);
        notifyContextChanged();
      }

      toast.success(t("Switched to project successfully"));

      // Navigate to project management page after switching
      navigate("/project-management");
    },
    onError,
  });

  return { switchToProject, isSwitching };
}

// Switch back to tenant context
export function useSwitchBackToTenant(onError?: (error: unknown) => void) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setUser } = useUserContext();

  const switchBackToTenant = async () => {
    // Get the current user and tenant data to reconstruct tenant context
    const currentUserData = localStorage.getItem("user");
    const currentTenantData = localStorage.getItem("currentTenant");

    if (currentUserData && currentTenantData) {
      try {
        const currentUser = JSON.parse(currentUserData);
        const currentTenant = JSON.parse(currentTenantData);

        // Update user context to remove project information and restore tenant context
        const updatedUser = {
          id: currentUser.id || currentUser._id,
          _id: currentUser.id || currentUser._id,
          email: currentUser.email,
          name: currentUser.name,
          isActive: true,
          createdAt: currentUser.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          role: currentUser.role || "user",
          tenantId: currentTenant.id,
          tenantName: currentTenant.name,
          tenantSlug: currentTenant.slug,
          projectId: undefined,
          projectName: undefined,
          projectSlug: undefined,
          roles: currentUser.roles || [],
          roleScope: "tenant" as const,
          allTenants: currentUser.allTenants || [],
        };

        // Update localStorage and user context first
        localStorage.setItem("user", JSON.stringify(updatedUser));
        localStorage.removeItem("currentProject");
        setUser(updatedUser);
        notifyContextChanged();

        // Switch to tenant token if available, otherwise refresh
        const tenantToken = localStorage.getItem("tenantToken");
        if (tenantToken) {
          console.log("Switching to cached tenant token");
          Cookies.set("jwt", tenantToken);
          localStorage.setItem("jwt", tenantToken);
        } else {
          // No tenant token cached, refresh to get one
          const refreshToken = Cookies.get("refreshToken");
          if (refreshToken) {
            try {
              console.log("Refreshing token for tenant scope...");
              const response = await refreshTokenMethod();
              const { data } = response;
              const newTenantToken = data.accessToken;
              Cookies.set("jwt", newTenantToken);
              localStorage.setItem("jwt", newTenantToken);
              localStorage.setItem("tenantToken", newTenantToken);
              console.log("Token refreshed successfully for tenant scope");
            } catch (refreshError) {
              console.warn(
                "Token refresh failed when switching to tenant:",
                refreshError
              );
              // Continue anyway - the interceptor will handle it on next API call
            }
          }
        }

        toast.success(t("Switched back to tenant context"));
        navigate("/projects");
      } catch (parseError) {
        console.error("Error parsing user/tenant data:", parseError);
        toast.error(t("Failed to switch back to tenant context"));
        if (onError) onError(parseError);
      }
    } else {
      // If no user or tenant data, something is wrong - redirect to login
      console.warn("Missing user or tenant data when switching back");
      localStorage.clear();
      Cookies.remove("jwt");
      Cookies.remove("refreshToken");
      setUser(undefined);
      navigate("/login");
    }
  };

  return { switchBackToTenant };
}
