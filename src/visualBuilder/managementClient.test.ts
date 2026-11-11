import { AxiosError, AxiosHeaders, type AxiosAdapter } from "axios";
import { describe, expect, it, vi } from "vitest";
import { createManagementClient } from "./managementClient";

function response(config: Parameters<AxiosAdapter>[0], data: unknown, status = 200) {
  return { config, data, status, statusText: "Fixture", headers: new AxiosHeaders() };
}
function denied(config: Parameters<AxiosAdapter>[0], status = 401): never {
  throw new AxiosError("Denied", "ERR_BAD_REQUEST", config, undefined, response(config, {}, status));
}
describe("management client boundary", () => {
  it("pins encoded project scope and keeps authored JSON intact", async () => {
    const client = createManagementClient({ tenant: "acme team", project: "shop" }, "https://api.test/api/v1");
    client.defaults.adapter = async config => {
      expect(config.url).toBe("/acme%20team/shop/admin/page/"); expect(config.withCredentials).toBe(true);
      return response(config, { props: { visualBuilder: { "primary-foreground": "keep" } } });
    };
    expect((await client.get("/admin/page/")).data).toEqual({ props: { visualBuilder: { "primary-foreground": "keep" } } });
  });
  it("does not rename unrelated authored page props during a full-page read", async () => {
    const client = createManagementClient({ tenant: "lossless", project: "shop" }, "https://api.test/api/v1");
    const page = { name: "Inventory", sections: [{ component: { type: "custom", props: { filters: { $eq: ["ProductSKU", "ABC"] }, ProductSKU: "original", visualBuilder: { "primary-foreground": "keep" } } } }] };
    client.defaults.adapter = async config => response(config, page);
    expect((await client.get("/admin/page/p")).data).toEqual(page);
  });
  it("deduplicates refresh for concurrent expired requests and retries each once", async () => {
    const client = createManagementClient({ tenant: "refresh", project: "shop" }, "https://api.test/api/v1");
    const calls: string[] = []; let refreshed = false;
    client.defaults.adapter = async config => {
      calls.push(config.url!);
      if (config.url?.endsWith("/tenant-auth/refresh")) { await new Promise(resolve => setTimeout(resolve, 5)); refreshed = true; return response(config, {}); }
      if (!refreshed) return denied(config);
      return response(config, [{ name: "Page", sections: [] }]);
    };
    const values = await Promise.all([client.get("/admin/page/"), client.get("/admin/page/")]);
    expect(values.map(value => value.status)).toEqual([200, 200]);
    expect(calls.filter(url => url.endsWith("/tenant-auth/refresh"))).toHaveLength(1);
    expect(calls.filter(url => url.endsWith("/admin/page/"))).toHaveLength(4);
  });
  it("returns 403 without refresh or application-session side effects", async () => {
    const client = createManagementClient({ tenant: "forbidden", project: "shop" }, "https://api.test/api/v1");
    vi.stubGlobal("localStorage", { removeItem() { throw new Error("Application logout must not run"); } });
    let count = 0; client.defaults.adapter = async config => { count++; return denied(config, 403); };
    try { await expect(client.patch("/admin/page/p", {})).rejects.toMatchObject({ response: { status: 403 } }); expect(count).toBe(1); }
    finally { vi.unstubAllGlobals(); }
  });
  it("does not retry a rejected refresh or an already retried management call", async () => {
    const client = createManagementClient({ tenant: "invalid", project: "shop" }, "https://api.test/api/v1");
    let count = 0; client.defaults.adapter = async config => { count++; return denied(config); };
    await expect(client.get("/admin/page/")).rejects.toMatchObject({ response: { status: 401 } });
    expect(count).toBe(2);
  });
  it("refreshes different projects independently", async () => {
    const clients = ["one", "two"].map(project => createManagementClient({ tenant: "parallel", project }, "https://api.test/api/v1"));
    const refreshes: string[] = [];
    for (const client of clients) {
      let refreshed = false;
      client.defaults.adapter = async config => {
        if (config.url?.endsWith("/tenant-auth/refresh")) { refreshed = true; refreshes.push(config.url); return response(config, {}); }
        if (!refreshed) return denied(config);
        return response(config, []);
      };
    }
    await Promise.all(clients.map(client => client.get("/admin/page/")));
    expect(refreshes.sort()).toEqual(["/parallel/one/tenant-auth/refresh", "/parallel/two/tenant-auth/refresh"]);
  });
});
