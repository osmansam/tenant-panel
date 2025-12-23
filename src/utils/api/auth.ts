import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { Location, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/User.context";
// import { Routes } from "../../navigation/constants";
import { post } from "./index";

interface LoginError {
  response: {
    data: {
      message: string;
      statusCode: number;
    };
  };
}

export type LoginCredentials = Record<string, any>;

import type { User } from "../../types";

export interface LoginResponse {
  token: string;
  user: User;
}

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
