import { describe, expect, it } from "vitest";
import type { ContainerModel } from "./api/container";
import {
  DEFAULT_CONTAINER_PAGE_SIZE,
  filterContainers,
  getContainerCollectionPage,
} from "./containerCollectionView";

const container = (index: number): ContainerModel => ({
  id: `container-${index}`,
  schemaName: index === 12 ? "InventoryStock" : `schema${index}`,
  collectionName:
    index === 18 ? "tenant_orders" : `collection_${index}`,
  fields: [],
  routes: {},
  redis: {
    isRedisCached: false,
    cacheTime: 10,
    triggeredRedisCaches: [],
  },
  pipelines: [],
  dynamicFunctions: [],
  dynamicApis: [],
  populatedRoutes: [],
});

describe("container collection view", () => {
  const containers = Array.from({ length: 40 }, (_, index) =>
    container(index + 1),
  );

  it("matches schema, collection, and id without case sensitivity", () => {
    expect(filterContainers(containers, "inventorystock")).toHaveLength(1);
    expect(filterContainers(containers, "TENANT_ORDERS")).toHaveLength(1);
    expect(filterContainers(containers, "CONTAINER-7")[0].id).toBe(
      "container-7",
    );
  });

  it("defaults to ten results and clamps an invalid page", () => {
    expect(DEFAULT_CONTAINER_PAGE_SIZE).toBe(10);
    expect(
      getContainerCollectionPage(containers, "", 1, 10).items,
    ).toHaveLength(10);
    expect(
      getContainerCollectionPage(containers, "Inventory", 4, 10),
    ).toMatchObject({
      page: 1,
      totalItems: 1,
      totalPages: 1,
    });
  });

  it("falls back to the default size and reports empty bounds", () => {
    expect(getContainerCollectionPage(containers, "missing", 9, 7)).toMatchObject(
      {
        items: [],
        page: 1,
        pageSize: 10,
        startNumber: 0,
        endNumber: 0,
      },
    );
  });
});
