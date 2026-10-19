import { describe, expect, it } from "vitest";
import type { Field, RouteSpec } from "./api/container";
import {
  buildEndpointRequestUrl,
  DEFAULT_API_BASE_URL,
  getApiBaseUrl,
  getContainerRouteEndpoints,
} from "./containerRouteEndpoints";

const spec = (method: string, overrides: Partial<RouteSpec> = {}): RouteSpec => ({
  isActive: true,
  isAuthenticated: false,
  isAuthorized: false,
  authorizeRole: [],
  method,
  ...overrides,
});

const stockFields: Field[] = [
  { name: "product", type: "string" },
  { name: "quantity", type: "int" },
];

describe("getContainerRouteEndpoints", () => {
  it("maps route names to exact request paths with the collection schema", () => {
    const endpoints = getContainerRouteEndpoints(
      {
        GetAllDynamicModelItems: spec("GET"),
        CreateMultipleDynamicModelItem: spec("POST"),
      },
      "stock",
    );

    expect(endpoints.map((endpoint) => [endpoint.method, endpoint.path])).toEqual([
      ["GET", "/dynamic?schemaName=stock"],
      ["POST", "/dynamic/multiple?schemaName=stock"],
    ]);
  });

  it("uses backend-registered methods and keeps placeholder paths", () => {
    const endpoints = getContainerRouteEndpoints(
      {
        TestPipeline: spec("POST"),
        UpdateDynamicModelItem: spec("PUT"),
      },
      "stock",
    );

    expect(endpoints[0]).toMatchObject({
      method: "GET",
      path: "/dynamic/testPipeline?schemaName=stock",
    });
    expect(endpoints[1]).toMatchObject({
      method: "PATCH",
      path: "/dynamic/{id}?schemaName=stock",
    });
  });

  it("omits paused dynamic function routes", () => {
    const endpoints = getContainerRouteEndpoints(
      {
        ExecuteDynamicCode: spec("GET"),
        GetPipeline: spec("GET"),
      },
      "stock",
    );

    expect(endpoints.map((endpoint) => endpoint.routeName)).toEqual([
      "GetPipeline",
    ]);
  });

  it("falls back to the stored method for unknown route names", () => {
    const endpoints = getContainerRouteEndpoints(
      { CustomThing: spec("DELETE") },
      "stock",
    );

    expect(endpoints[0]).toMatchObject({
      method: "DELETE",
      path: "/dynamic?schemaName=stock",
      summary: "Custom Thing",
    });
    expect(JSON.parse(endpoints[0].exampleBody ?? "{}")).toEqual({
      _id: "mock_id_1",
    });
  });

  it("matches route names regardless of casing", () => {
    const [endpoint] = getContainerRouteEndpoints(
      { createDynamicModelItem: spec("POST") },
      "stock",
      stockFields,
    );

    expect(endpoint).toMatchObject({
      method: "POST",
      path: "/dynamic?schemaName=stock",
      summary: "Create a record",
    });
    expect(endpoint.exampleBody).toBeDefined();
  });

  it("generates default payloads for unknown write routes", () => {
    const [endpoint] = getContainerRouteEndpoints(
      { CustomBulkWrite: spec("PATCH") },
      "stock",
      stockFields,
    );
    const payload = JSON.parse(endpoint.exampleBody ?? "{}");

    expect(payload).toMatchObject({
      product: expect.any(String),
      quantity: expect.any(Number),
    });
  });

  it("generates a delete payload with the record id", () => {
    const [endpoint] = getContainerRouteEndpoints(
      { DeleteDynamicModelItem: spec("DELETE") },
      "stock",
      stockFields,
    );

    expect(JSON.parse(endpoint.exampleBody ?? "{}")).toEqual({
      _id: "mock_id_1",
    });
  });

  it("carries permission flags from the route spec", () => {
    const endpoints = getContainerRouteEndpoints(
      {
        GetDynamicModelItem: spec("GET", {
          isAuthenticated: true,
          isAuthorized: true,
          authorizeRole: ["admin"],
        }),
      },
      "stock",
    );

    expect(endpoints[0]).toMatchObject({
      isActive: true,
      isAuthenticated: true,
      isAuthorized: true,
      authorizeRole: ["admin"],
    });
  });

  it("omits inactive routes", () => {
    const endpoints = getContainerRouteEndpoints(
      {
        GetAllDynamicModelItems: spec("GET", { isActive: false }),
        CreateDynamicModelItem: spec("POST"),
      },
      "stock",
      stockFields,
    );

    expect(endpoints.map((endpoint) => endpoint.routeName)).toEqual([
      "CreateDynamicModelItem",
    ]);
  });
});

describe("example payloads", () => {
  it("builds a create payload from the collection fields without _id", () => {
    const [endpoint] = getContainerRouteEndpoints(
      { CreateDynamicModelItem: spec("POST") },
      "stock",
      stockFields,
    );
    const payload = JSON.parse(endpoint.exampleBody ?? "{}");

    expect(payload).toMatchObject({
      product: expect.any(String),
      quantity: expect.any(Number),
    });
    expect(payload).not.toHaveProperty("_id");
  });

  it("builds array payloads for bulk routes", () => {
    const endpoints = getContainerRouteEndpoints(
      {
        CreateMultipleDynamicModelItem: spec("POST"),
        DeleteMultipleDynamicModelItem: spec("DELETE"),
      },
      "stock",
      stockFields,
    );
    const createPayload = JSON.parse(endpoints[0].exampleBody ?? "[]");
    const deletePayload = JSON.parse(endpoints[1].exampleBody ?? "[]");

    expect(createPayload).toHaveLength(2);
    expect(createPayload[0]).not.toHaveProperty("_id");
    expect(deletePayload).toEqual([
      { _id: "mock_id_1" },
      { _id: "mock_id_2" },
    ]);
  });

  it("builds an export payload scoped to the collection", () => {
    const [endpoint] = getContainerRouteEndpoints(
      { ExportDynamicModelItems: spec("POST") },
      "stock",
      stockFields,
    );
    const payload = JSON.parse(endpoint.exampleBody ?? "{}");

    expect(payload).toMatchObject({
      schemaName: "stock",
      fields: ["product", "quantity"],
      page: 1,
      limit: 100,
    });
  });

  it("builds a pipeline stage payload for TestPipeline", () => {
    const [endpoint] = getContainerRouteEndpoints(
      { TestPipeline: spec("GET") },
      "stock",
      stockFields,
    );
    const payload = JSON.parse(endpoint.exampleBody ?? "{}");

    expect(payload.pipelineStage).toMatchObject({
      name: "example-stage",
      isActive: true,
    });
  });

  it("omits example payloads for body-less routes", () => {
    const endpoints = getContainerRouteEndpoints(
      { GetAllDynamicModelItems: spec("GET") },
      "stock",
      stockFields,
    );

    expect(endpoints[0].exampleBody).toBeUndefined();
  });

  it("builds a paginated response example for list routes", () => {
    const [endpoint] = getContainerRouteEndpoints(
      { GetAllDynamicModelItemsWithPagination: spec("GET") },
      "stock",
      stockFields,
    );
    const payload = JSON.parse(endpoint.exampleResponse ?? "{}");

    expect(payload).toMatchObject({
      totalItems: 2,
      totalPages: 1,
      currentPage: 1,
    });
    expect(payload.items).toHaveLength(2);
    expect(payload.items[0]).toHaveProperty("_id");
  });

  it("builds a single-record response example for get-by-id", () => {
    const [endpoint] = getContainerRouteEndpoints(
      { GetDynamicModelItem: spec("GET") },
      "stock",
      stockFields,
    );
    const payload = JSON.parse(endpoint.exampleResponse ?? "{}");

    expect(payload).toMatchObject({
      _id: expect.any(String),
      product: expect.any(String),
      quantity: expect.any(Number),
    });
  });

  it("omits response examples for write routes", () => {
    const [endpoint] = getContainerRouteEndpoints(
      { CreateDynamicModelItem: spec("POST") },
      "stock",
      stockFields,
    );

    expect(endpoint.exampleBody).toBeDefined();
    expect(endpoint.exampleResponse).toBeUndefined();
  });
});

describe("buildEndpointRequestUrl", () => {
  it("always uses the production API base", () => {
    expect(DEFAULT_API_BASE_URL).toBe(
      "https://api-production.autoapi.org/api/v1/",
    );
    expect(buildEndpointRequestUrl("/dynamic?schemaName=stock")).toBe(
      "https://api-production.autoapi.org/api/v1/dynamic?schemaName=stock",
    );
  });

  it("appends the tenant and project slugs to the base URL", () => {
    expect(getApiBaseUrl("acme", "shop")).toBe(
      "https://api-production.autoapi.org/api/v1/acme/shop/",
    );
    expect(
      buildEndpointRequestUrl("/dynamic?schemaName=stock", "acme", "shop"),
    ).toBe(
      "https://api-production.autoapi.org/api/v1/acme/shop/dynamic?schemaName=stock",
    );
  });

  it("encodes tenant and project slugs", () => {
    expect(getApiBaseUrl("my tenant", "my/project")).toBe(
      "https://api-production.autoapi.org/api/v1/my%20tenant/my%2Fproject/",
    );
  });
});
