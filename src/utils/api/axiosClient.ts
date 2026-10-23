import axios from "axios";
import { camelCase, isArray, isPlainObject, transform } from "lodash";
import { logout } from "../auth";

function toCamelCase(obj: any): any {
  if (isArray(obj)) return obj.map(toCamelCase);
  if (isPlainObject(obj)) {
    return transform(obj, (result: any, value: any, key: string) => {
      result[key === "_id" ? "_id" : camelCase(key)] = toCamelCase(value);
    });
  }
  return obj;
}

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  responseType: "json",
  withCredentials: true,
});

export const ACCESS_TOKEN = "jwt";
const refreshRequests = new Map<string, Promise<unknown>>();

export function selectManagementRefreshPath(requestUrl?: string): string | null {
  if (!requestUrl) return null;
  let pathname: string;
  try {
    pathname = new URL(requestUrl, "http://tenant-panel.local").pathname;
  } catch {
    return null;
  }
  const apiPrefix = "/api/v1";
  if (pathname === apiPrefix) return null;
  if (pathname.startsWith(`${apiPrefix}/`)) pathname = pathname.slice(apiPrefix.length);
  const segments = pathname.split("/").filter(Boolean);
  if (segments.includes("refresh") || segments.length === 0) return null;
  // Sign-in, registration, OAuth and logout failures are not expired access
  // sessions. Return those errors to their forms without attempting refresh.
  if (segments[0] === "tenant" && segments[1] === "auth" &&
      !["session", "me", "switch-project"].includes(segments[2])) return null;
  if (segments[0] === "tenant") return "/tenant/auth/refresh";
  if (segments.length >= 3 && segments[2] !== "auth" && segments[2] !== "tenant-auth") {
    return `/${encodeURIComponent(segments[0])}/${encodeURIComponent(segments[1])}/tenant-auth/refresh`;
  }
  return null;
}

export function shouldAttemptManagementRefresh(
  responseStatus: number | undefined,
  responseStatusCode: number | undefined,
  requestUrl: string | undefined,
  alreadyRetried = false,
): boolean {
  const isUnauthorized = responseStatus === 401 || responseStatusCode === 401;
  return isUnauthorized && !alreadyRetried && selectManagementRefreshPath(requestUrl) !== null;
}

axiosClient.interceptors.response.use(
  (response) => {
    if (response.data) response.data = toCamelCase(response.data);
    return response;
  },
  async (error) => {
    const request = error.config;
    const refreshPath = selectManagementRefreshPath(request?.url);
    if (!shouldAttemptManagementRefresh(
      error?.response?.status,
      error?.response?.data?.statusCode,
      request?.url,
      request?._retry,
    ) || !refreshPath) {
      return Promise.reject(error);
    }
    request._retry = true;
    try {
      // Axios joins baseURL and relative paths correctly, including a trailing
      // slash. Deduplicate only requests for the same tenant/project identity.
      const refreshKey = axiosClient.getUri({ url: refreshPath, baseURL: request.baseURL });
      let refreshRequest = refreshRequests.get(refreshKey);
      if (!refreshRequest) {
        refreshRequest = axiosClient.post(refreshPath, undefined, { baseURL: request.baseURL })
          .finally(() => { refreshRequests.delete(refreshKey); });
        refreshRequests.set(refreshKey, refreshRequest);
      }
      await refreshRequest;
      return axiosClient(request);
    } catch (refreshError: any) {
      if (refreshError?.response?.status === 401 && refreshPath === "/tenant/auth/refresh") {
        logout(true, "Session expired");
      }
      return Promise.reject(refreshError);
    }
  },
);
