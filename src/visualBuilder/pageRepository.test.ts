import axios, { AxiosHeaders, type AxiosAdapter } from "axios";
import { describe, expect, it } from "vitest";
import { createPageRepository } from "./pageRepository";
import { listVisualBlocks, readVisualBlock } from "./pageAdapter";
import { sampleDocument, samplePage, visualComponent } from "./testFixtures";

describe("page repository full save", () => {
  it("saves placement request connections while preserving page definitions", async () => {
    const client = axios.create(); let page = samplePage();
    page.requests = [{ id: "products", name: "Products", source: { transport: "table-source", kind: "schema", schemaName: "products" }, result: { kind: "records" } }];
    client.defaults.adapter = (async config => {
      if (config.method === "patch") page = { ...JSON.parse(config.data), id: "page-1" };
      return { config, data: { data: structuredClone(page) }, status: 200, statusText: "OK", headers: new AxiosHeaders() };
    }) satisfies AxiosAdapter;
    const repo = createPageRepository({ tenant: "acme", project: "shop" }, client);
    const saved = await repo.save({ pageId: "page-1", target: { componentId: "visual", baseline: visualComponent, isNew: false, requestBindings: { "collection:products": { requestId: "products" } } }, value: { document: sampleDocument } });
    expect(listVisualBlocks(saved)[0].requestBindings?.["collection:products"].requestId).toBe("products");
    expect(saved.requests?.[0].id).toBe("products");
  });
  it("reloads the latest page, preserves unrelated changes and confirms persisted content", async () => {
    const client = axios.create(); let page = samplePage(); page.name = "Concurrent metadata edit";
    const requests: string[] = [];
    client.defaults.adapter = (async config => {
      requests.push(`${config.method} ${config.url}`);
      if (config.method === "patch") {
        const payload = JSON.parse(config.data);
        expect(payload).not.toHaveProperty("id"); expect(payload.name).toBe("Concurrent metadata edit");
        expect(payload.variables[0].initialValue).toBe("keep");
        page = { ...payload, id: "page-1" };
      }
      return { config, data: { data: { data: structuredClone(page) } }, status: 200, statusText: "OK", headers: new AxiosHeaders() };
    }) satisfies AxiosAdapter;
    const repo = createPageRepository({ tenant: "acme", project: "shop" }, client);
    const saved = await repo.save({ pageId: "page-1", target: { componentId: "visual", baseline: visualComponent, isNew: false }, value: { document: { ...sampleDocument, name: "New layout" } } });
    expect(requests).toEqual(["get /admin/page/page-1", "patch /admin/page/page-1", "get /admin/page/page-1"]);
    expect(readVisualBlock(listVisualBlocks(saved)[0]).document.name).toBe("New layout");
  });
  it("does not claim success when a backend response fails to retain the document", async () => {
    const client = axios.create(); const page = samplePage();
    client.defaults.adapter = async config => ({ config, data: { data: { data: page } }, status: 200, statusText: "OK", headers: new AxiosHeaders() });
    const repo = createPageRepository({ tenant: "acme", project: "shop" }, client);
    await expect(repo.save({ pageId: "page-1", target: { componentId: "visual", baseline: visualComponent, isNew: false }, value: { document: { ...sampleDocument, name: "Not retained" } } })).rejects.toThrow(/could not be confirmed/i);
  });
});

it("saves a placed record connection without changing the design or unrelated parameters, and verifies persistence", async () => {
 const client = axios.create(); let page = samplePage();
 page.sections[0].component!.outputs = [{ id: "selected", key: "selectedRecord", type: "record", source: { kind: "tableSelectedRecord" } }];
 const initial = listVisualBlocks(page)[0]; initial.dataBinding = { kind: "schema", parameters: { other: { source: "static", value: 5 } } };
 const baseline = structuredClone(initial);
 const binding = { source: "componentOutput" as const, componentId: "table", outputId: "selected" };
 client.defaults.adapter = async config => {
  if (config.method === "patch") page = { ...JSON.parse(config.data), id: "page-1" };
  return { config, data: structuredClone(page), status: 200, statusText: "OK", headers: new AxiosHeaders() };
 };
 const repo = createPageRepository({ tenant: "acme", project: "shop" }, client);
 const saved = await repo.save({ pageId: "page-1", target: { componentId: "visual", baseline, isNew: false, itemBinding: binding }, value: readVisualBlock(initial) });
 expect(listVisualBlocks(saved)[0].dataBinding?.parameters).toEqual({ other: { source: "static", value: 5 }, item: binding });
 const connected = listVisualBlocks(saved)[0];
 const disconnected = await repo.save({ pageId: "page-1", target: { componentId: "visual", baseline: connected, isNew: false, itemBinding: null }, value: readVisualBlock(connected) });
 expect(listVisualBlocks(disconnected)[0].dataBinding?.parameters).toEqual({ other: { source: "static", value: 5 } });
});

it("confirms disconnect when Go omits empty parameter maps in the saved page", async () => {
 const client = axios.create(); let page = samplePage();
 const initial = listVisualBlocks(page)[0];
 initial.dataBinding = { kind: "schema", parameters: { item: { source: "componentOutput", componentId: "table", outputId: "selected" } } };
 client.defaults.adapter = async config => {
  if (config.method === "patch") {
   page = { ...JSON.parse(config.data), id: "page-1" };
   const binding = listVisualBlocks(page)[0].dataBinding!;
   if (!Object.keys(binding.parameters || {}).length) delete binding.parameters;
  }
  return { config, data: structuredClone(page), status: 200, statusText: "OK", headers: new AxiosHeaders() };
 };
 const repo = createPageRepository({ tenant: "acme", project: "shop" }, client);
 await expect(repo.save({ pageId: "page-1", target: { componentId: "visual", baseline: structuredClone(initial), isNew: false, itemBinding: null }, value: readVisualBlock(initial) })).resolves.toBeDefined();
});

it.each(["fill", "natural"] as const)("rejects an unconfirmed %s sizing save", async sizing => {
 const client = axios.create(); const page = samplePage(); const block = listVisualBlocks(page)[0];
 if (sizing === "natural") block.props = { ...block.props, visualCellSizing: "fill" };
 client.defaults.adapter = async config => ({ config, data: structuredClone(page), status: 200, statusText: "OK", headers: new AxiosHeaders() });
 const repo = createPageRepository({ tenant: "acme", project: "shop" }, client);
 await expect(repo.save({ pageId: "page-1", target: { componentId: "visual", baseline: structuredClone(block), isNew: false, cellSizing: sizing }, value: readVisualBlock(block) })).rejects.toThrow(/could not be confirmed/i);
});
