import axios, { AxiosHeaders } from "axios";
import Cookies from "js-cookie";
import { camelCase, isArray, isPlainObject, transform } from "lodash";
import { logout } from "../auth";

// Recursively convert all keys in an object from PascalCase to camelCase
// Special handling: preserve _id fields (don't convert to id)
function toCamelCase(obj: any): any {
  if (isArray(obj)) {
    return obj.map((item) => toCamelCase(item));
  }

  if (isPlainObject(obj)) {
    return transform(obj, (result: any, value: any, key: string) => {
      // Preserve _id as-is (don't convert to id)
      const camelKey = key === "_id" ? "_id" : camelCase(key);
      result[camelKey] = toCamelCase(value);
    });
  }

  return obj;
}

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  responseType: "json",
});

export const ACCESS_TOKEN = "jwt";

axiosClient.interceptors.request.use(
  async (req) => {
    const isTenantProjectManagementRequest =
      typeof req.url === "string" && req.url.startsWith("/tenant/projects");
    const accessToken = isTenantProjectManagementRequest
      ? localStorage.getItem("tenantToken") || Cookies.get(ACCESS_TOKEN)
      : Cookies.get(ACCESS_TOKEN);

    if (accessToken) {
      (req.headers as AxiosHeaders).set(
        "Authorization",
        `Bearer ${accessToken}`
      );
    }

    return req;
  },

  (err) => Promise.reject(err)
);

axiosClient.interceptors.response.use(
  (response) => {
    // Transform response data from PascalCase to camelCase
    if (response.data) {
      response.data = toCamelCase(response.data);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check for 401 in both standard HTTP status and custom statusCode
    const is401 =
      error?.response?.status === 401 ||
      error?.response?.data?.statusCode === 401;

    // Check for scope-related errors
    const errorMessage =
      error?.response?.data?.message || error?.response?.data?.error || "";
    const isTenantScopeRequired = errorMessage
      .toLowerCase()
      .includes("tenant scope required");
    const isProjectScopeRequired = errorMessage
      .toLowerCase()
      .includes("project scope required");
    const isScopeIssue =
      isTenantScopeRequired ||
      isProjectScopeRequired ||
      errorMessage.toLowerCase().includes("scope") ||
      errorMessage.toLowerCase().includes("invalid scope");

    // Check for authentication-related error messages
    const authErrorMessages = [
      "unauthorized",
      "token expired",
      "invalid token",
      "authentication failed",
    ];
    const hasAuthErrorMessage = authErrorMessages.some((msg) =>
      errorMessage.toLowerCase().includes(msg)
    );

    if (
      (is401 || hasAuthErrorMessage || isScopeIssue) &&
      !originalRequest._retry
    ) {
      console.log("Authentication/Scope error detected:", {
        status: error?.response?.status,
        statusCode: error?.response?.data?.statusCode,
        message: errorMessage,
        url: originalRequest?.url,
        isScopeIssue,
        isTenantScopeRequired,
        isProjectScopeRequired,
      });

      originalRequest._retry = true;

      const refreshToken = Cookies.get("refreshToken");

      if (refreshToken && (is401 || hasAuthErrorMessage || isScopeIssue)) {
        try {
          // For scope issues, clear the old access token before refreshing
          if (isScopeIssue) {
            console.log(
              "Scope mismatch - clearing old access token before refresh"
            );
            Cookies.remove("jwt");
            localStorage.removeItem("jwt");
          }

          console.log(
            "Attempting token refresh for",
            isTenantScopeRequired
              ? "tenant scope"
              : isProjectScopeRequired
              ? "project scope"
              : "token renewal"
          );
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/tenant/auth/refresh`,
            {
              refreshToken,
            }
          );

          const { data } = response.data;
          const newAccessToken = data.accessToken;
          Cookies.set("jwt", newAccessToken);
          localStorage.setItem("jwt", newAccessToken);

          // Store the token in the appropriate cache based on scope
          const userData = localStorage.getItem("user");
          if (userData) {
            try {
              const user = JSON.parse(userData);
              if (user.roleScope === "tenant" || !user.projectId) {
                localStorage.setItem("tenantToken", newAccessToken);
                console.log("Cached as tenant token");
              } else if (user.roleScope === "project" || user.projectId) {
                localStorage.setItem("projectToken", newAccessToken);
                console.log("Cached as project token");
              }
            } catch (e) {
              console.warn(
                "Could not parse user data to determine token scope"
              );
            }
          }

          console.log("Token refreshed successfully, retrying request");
          // Update the authorization header and retry the original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosClient(originalRequest);
        } catch (refreshError: any) {
          // Only logout if refresh truly failed and it's not a scope issue we can recover from
          const refreshFailed =
            refreshError?.response?.status === 401 ||
            refreshError?.response?.status === 403;

          if (refreshFailed && !isScopeIssue) {
            console.error("Token refresh failed, logging out:", refreshError);
            logout(true, "Session expired");
          } else if (isScopeIssue) {
            // For scope issues, don't logout - let the error propagate
            // The UI should handle switching contexts if needed
            console.warn(
              "Scope mismatch detected - request requires different token scope"
            );
          } else {
            console.warn(
              "Token refresh failed but might be recoverable:",
              refreshError
            );
          }
          return Promise.reject(refreshError);
        }
      } else if (!refreshToken && (is401 || hasAuthErrorMessage)) {
        // No refresh token and auth error - logout
        console.log("No refresh token available, redirecting to login");
        logout(true, "Session expired");
      } else if (isScopeIssue) {
        // Scope issue but no refresh token or not 401 - don't logout
        console.warn("Scope issue detected, but not logging out automatically");
      }
    }

    return Promise.reject(error);
  }
);
