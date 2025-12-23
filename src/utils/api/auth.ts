import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { Location, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/User.context";
// import { Routes } from "../../navigation/constants";
import { get, post } from "./index";

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
      setUser(null);
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

      Cookies.set("jwt", accessToken);
      Cookies.set("refreshToken", refreshToken);
      toast.success(t("Logged in successfully"));
      localStorage.setItem("jwt", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("loggedIn", "true");

      if (user) {
        // Create extended user object with tenant info
        const extendedUser = {
          _id: user.id,
          email: user.email,
          name: user.name,
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
        const extendedUser = {
          _id: user.id,
          email: user.email,
          name: user.name,
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
        const extendedUser = {
          _id: user.id,
          email: user.email,
          name: user.name,
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
      setUser(null);
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
      setUser(null);
      window.location.href = "/login";
      if (onError) onError(error);
    },
  });

  return { refreshToken };
}
