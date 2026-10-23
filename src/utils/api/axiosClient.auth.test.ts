import axios, { AxiosError, type AxiosAdapter, type InternalAxiosRequestConfig } from "axios";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { logout } from "../auth";
import { axiosClient, selectManagementRefreshPath } from "./axiosClient";

vi.mock("../auth", () => ({ logout: vi.fn() }));

const originalAdapter = axios.defaults.adapter;
const originalClientAdapter = axiosClient.defaults.adapter;
const originalBaseURL = axiosClient.defaults.baseURL;

function reply(config: InternalAxiosRequestConfig, status: number, data: unknown) {
  return { config, status, data, statusText: String(status), headers: {} };
}

function unauthorized(config: InternalAxiosRequestConfig, message = "Access expired") {
  return new AxiosError(message, AxiosError.ERR_BAD_REQUEST, config, undefined, reply(config, 401, { message }));
}

function useAdapter(adapter: AxiosAdapter) {
  axios.defaults.adapter = adapter;
  axiosClient.defaults.adapter = adapter;
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("VITE_API_URL", "https://api.example/api/v1/");
  axiosClient.defaults.baseURL = "https://api.example/api/v1/";
});

afterEach(() => {
  axios.defaults.adapter = originalAdapter;
  axiosClient.defaults.adapter = originalClientAdapter;
  axiosClient.defaults.baseURL = originalBaseURL;
  vi.unstubAllEnvs();
});

describe("management refresh identity selection", () => {
  it.each([
    ["/tenant/auth/login", null],
    ["/tenant/auth/register", null],
    ["/tenant/auth/google/callback", null],
    ["/tenant/auth/logout", null],
    ["/tenant/auth/refresh", null],
    ["/tenant/auth/session", "/tenant/auth/refresh"],
    ["/api/v1/tenant/auth/me", "/tenant/auth/refresh"],
    ["/tenant/projects", "/tenant/auth/refresh"],
    ["/acme/shop/container", "/acme/shop/tenant-auth/refresh"],
    ["/acme/shop/tenant-auth/refresh", null],
    ["/acme/shop/auth/login", null],
    ["/acme/shop/auth/session", null],
  ])("selects the correct identity for %s", (path, expected) => {
    expect(selectManagementRefreshPath(path)).toBe(expected);
  });
});

describe("management refresh requests", () => {
  it("returns invalid login credentials without refreshing or redirecting to logout", async () => {
    const paths: string[] = [];
    useAdapter(async (config) => {
      paths.push(new URL(axios.getUri(config)).pathname);
      throw unauthorized(config, config.url?.includes("refresh") ? "Refresh expired" : "Invalid credentials");
    });

    await expect(axiosClient.post("/tenant/auth/login", { email: "user@example.com", password: "incorrect" }))
      .rejects.toMatchObject({ response: { data: { message: "Invalid credentials" } } });
    expect(paths).toEqual(["/api/v1/tenant/auth/login"]);
    expect(logout).not.toHaveBeenCalled();
  });

  it("recovers a tenant session with a correctly joined refresh URL and cookies", async () => {
    const paths: string[] = [];
    let sessionAttempts = 0;
    useAdapter(async (config) => {
      const path = new URL(axios.getUri(config)).pathname;
      paths.push(path);
      expect(config.withCredentials).toBe(true);
      if (path.endsWith("/refresh")) return reply(config, 200, { status: 200 });
      if (sessionAttempts++ === 0) throw unauthorized(config);
      return reply(config, 200, { authenticated: true });
    });

    const response = await axiosClient.get("/tenant/auth/session");
    expect(response.data.authenticated).toBe(true);
    expect(paths).toEqual(["/api/v1/tenant/auth/session", "/api/v1/tenant/auth/refresh", "/api/v1/tenant/auth/session"]);
  });

  it("keeps simultaneous tenant and project refreshes in their own identities", async () => {
    const refreshed: string[] = [];
    const attempts = new Set<string>();
    let release!: () => void;
    const gate = new Promise<void>((resolve) => { release = resolve; });
    useAdapter(async (config) => {
      const path = new URL(axios.getUri(config)).pathname;
      if (path.endsWith("/refresh")) {
        refreshed.push(path);
        await gate;
        return reply(config, 200, {});
      }
      if (!attempts.has(path)) { attempts.add(path); throw unauthorized(config); }
      return reply(config, 200, { ok: true });
    });

    const requests = Promise.all([
      axiosClient.get("/tenant/projects"),
      axiosClient.get("/acme/shop/container"),
    ]);
    try {
      await vi.waitFor(() => expect(refreshed).toHaveLength(2), { timeout: 500 });
    } finally { release(); }
    await requests;
    expect(refreshed.sort()).toEqual(["/api/v1/acme/shop/tenant-auth/refresh", "/api/v1/tenant/auth/refresh"]);
  });

  it("does not sign out the tenant when only a project management refresh fails", async () => {
    useAdapter(async (config) => { throw unauthorized(config); });
    await expect(axiosClient.get("/acme/shop/container")).rejects.toMatchObject({ response: { status: 401 } });
    expect(logout).not.toHaveBeenCalled();
  });

  it("shares one refresh between simultaneous requests within the same project", async () => {
    let refreshCount = 0;
    let release!: () => void;
    const gate = new Promise<void>((resolve) => { release = resolve; });
    const attempts = new Set<string>();
    useAdapter(async (config) => {
      const path = new URL(axios.getUri(config)).pathname;
      if (path.endsWith("/refresh")) { refreshCount++; await gate; return reply(config, 200, {}); }
      if (!attempts.has(path)) { attempts.add(path); throw unauthorized(config); }
      return reply(config, 200, { ok: true });
    });
    const requests = Promise.all([axiosClient.get("/acme/shop/container"), axiosClient.get("/acme/shop/roles")]);
    try {
      await vi.waitFor(() => expect(refreshCount).toBe(1), { timeout: 500 });
    } finally { release(); }
    const responses = await requests;
    expect(responses.every(({ data }) => data.ok)).toBe(true);
    expect(refreshCount).toBe(1);
  });

  it("ends the tenant session when its own refresh is rejected", async () => {
    useAdapter(async (config) => { throw unauthorized(config); });
    await expect(axiosClient.get("/tenant/projects")).rejects.toMatchObject({ response: { status: 401 } });
    expect(logout).toHaveBeenCalledWith(true, "Session expired");
  });
});
