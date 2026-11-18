import { validateManagementWriteURL, watchScopedManagementWrite } from "../managementWriteGuard";
import axios, { type InternalAxiosRequestConfig } from "axios";
import { camelCase, isArray, isPlainObject, transform } from "lodash";
import { logout } from "../auth";

function toCamelCase(obj: any, inWorkflow = false, insideProps = false): any {
  if (isArray(obj)) return obj.map((value) => toCamelCase(value, inWorkflow, insideProps));
  if (isPlainObject(obj)) {
    return transform(obj, (result: any, value: any, key: string) => {
      const normalizedKey = key === "_id" ? "_id" : camelCase(key);
      // Slot IDs and authored filter field paths are dictionary keys, not API metadata. Preserve punctuation and case.
      if (normalizedKey === "requestBindings" && isPlainObject(value)) {
        result[normalizedKey] = Object.fromEntries(Object.entries(value).map(([slot, connection]) => [slot, toCamelCase(connection, inWorkflow)]));
        return;
      }
      if (normalizedKey === "sourceRequestFilters" && isPlainObject(value)) {
        result[normalizedKey] = { ...value };
        return;
      }
      // These workflow fields contain authored JSON, including Mongo operators
      // and case-sensitive field paths. Only normalize their metadata key.
      const preserveValue = (inWorkflow && ["config", "payload", "value"].includes(normalizedKey)) || (insideProps && normalizedKey === "visualBuilder");
      result[normalizedKey] = preserveValue
        ? value
        : toCamelCase(value, inWorkflow || normalizedKey === "workflows", normalizedKey === "props");
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

// Session responses set HttpOnly cookies before Axios resolves. Drain those
// responses before clearing cookies, and reject their stale UI results.
const sessionRequests = new Set<Promise<void>>();
const sessionCompletions = new WeakMap<object, () => void>();
const projectLogoutPaths = new Set<string>();
let loggingOut = false;
let logoutRequest: Promise<void> | undefined;

function sessionMutation(config: InternalAxiosRequestConfig): boolean {
  if (config.method?.toLowerCase() !== "post") return false;
  const path = new URL(config.url || "", "http://tenant-panel.local").pathname.replace(/^\/api\/v1(?=\/)/, "");
  return /^\/tenant\/auth\/(login|register|refresh|switch-project|switch-tenant|invitations\/accept|google\/callback)$/.test(path) ||
    /^\/[^/]+\/[^/]+\/tenant-auth\/refresh$/.test(path);
}

function finishSessionRequest(config?: object) {
  if (!config) return;
  sessionCompletions.get(config)?.();
  sessionCompletions.delete(config);
}

export function withManagementLogout(operation: (projectPaths: readonly string[]) => Promise<void>): Promise<void> {
  if (logoutRequest) return logoutRequest;
  loggingOut = true;
  logoutRequest = (async () => {
    await Promise.all([...sessionRequests]);
    await operation([...projectLogoutPaths]);
    projectLogoutPaths.clear();
  })().finally(() => {
    loggingOut = false;
    logoutRequest = undefined;
  });
  return logoutRequest;
}

const writeCleanups = new WeakMap<object,()=>void>();
axiosClient.interceptors.request.use(config => {
  writeCleanups.get(config)?.();
  const write = validateManagementWriteURL(config.url,config.method);
  if(write){const pending=watchScopedManagementWrite(write.scope,write.permission,config.signal);config.signal=pending.signal;writeCleanups.set(config,pending.dispose)}
  if (sessionMutation(config)) {
    if (loggingOut) throw new axios.CanceledError("Session change cancelled during logout");
    let complete!: () => void;
    const pending = new Promise<void>(resolve => { complete = resolve; });
    sessionRequests.add(pending);
    sessionCompletions.set(config, () => { sessionRequests.delete(pending); complete(); });
  }
  return config;
});

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
      !["session", "me", "switch-project", "switch-tenant"].includes(segments[2])) return null;
  if (segments[0] === "tenant") return "/tenant/auth/refresh";
  if (segments.length >= 4 && segments[2] === "tenant-auth" && !["refresh", "logout"].includes(segments[3])) return `/${encodeURIComponent(segments[0])}/${encodeURIComponent(segments[1])}/tenant-auth/refresh`;
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
    writeCleanups.get(response.config)?.();
    writeCleanups.delete(response.config);
    if (response.data) response.data = toCamelCase(response.data);
    if (sessionCompletions.has(response.config)) {
      const path = new URL(response.config.url || "", "http://tenant-panel.local").pathname.replace(/^\/api\/v1(?=\/)/, "");
      if (path.endsWith("/tenant-auth/refresh")) projectLogoutPaths.add(path.replace(/refresh$/, "logout"));
      if (path === "/tenant/auth/switch-project" || path === "/tenant/auth/invitations/accept") {
        const project = response.data?.data?.project;
        if (typeof project?.tenantSlug === "string" && project.tenantSlug && typeof project?.slug === "string" && project.slug) {
          projectLogoutPaths.add(`/${encodeURIComponent(project.tenantSlug)}/${encodeURIComponent(project.slug)}/tenant-auth/logout`);
        }
      }
      finishSessionRequest(response.config);
      if (loggingOut) throw new axios.CanceledError("Session change cancelled during logout");
    }
    return response;
  },
  async (error) => {
    writeCleanups.get(error.config)?.();
    writeCleanups.delete(error.config);
    finishSessionRequest(error.config);
    const request = error.config;
    if (error?.response?.status === 403 && !/\/(session|me)$/.test(request?.url || "") && !request?.url?.includes("/auth/invitations")) { window.dispatchEvent(new Event("management-access-changed")); }
    const refreshPath = selectManagementRefreshPath(request?.url);
    if (loggingOut || !shouldAttemptManagementRefresh(
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
      if (!loggingOut && refreshError?.response?.status === 401 && refreshPath === "/tenant/auth/refresh") {
        logout(true, "Session expired");
      }
      return Promise.reject(refreshError);
    }
  },
);
