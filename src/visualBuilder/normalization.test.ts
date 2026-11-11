import { AxiosHeaders } from "axios";
import { describe, expect, it, vi } from "vitest";
vi.mock("../utils/auth", () => ({ logout: vi.fn() }));
import { axiosClient } from "../utils/api/axiosClient";

describe("Tenant Panel page reads", () => {
  it("preserves visual documents and theme keys for ordinary page editing", async () => {
    const envelope = { document: { version: 2, effects: { "light-rays": { ProductSKU: "ABC" } } }, theme: { palettes: { light: { "primary-foreground": "#ffffff" } } } };
    const response = await axiosClient.get("/acme/shop/admin/page", { adapter: async config => ({ config, status: 200, statusText: "OK", headers: new AxiosHeaders(), data: [{ Name: "Inventory", Sections: [{ Component: { Props: { VisualBuilder: envelope } } }] }] }) });
    expect(response.data[0].name).toBe("Inventory");
    expect(response.data[0].sections[0].component.props.visualBuilder).toEqual(envelope);
  });
});


it("preserves request slot identities while normalizing connection metadata", async () => {
 const response = await axiosClient.get("/page", { adapter: async config => ({ config, status: 200, statusText: "OK", headers: new AxiosHeaders(), data: { Name: "Catalog", Sections: [{ Component: { ID: "visual", Type: "custom", RequestBindings: { "collection:Catalog_Rows": { RequestId: "Products_MAIN" }, "dataset:dataset_15476fa8": { RequestId: "old" } } } }] } }) });
 expect(response.data.sections[0].component.requestBindings).toEqual({ "collection:Catalog_Rows": { requestId: "Products_MAIN" }, "dataset:dataset_15476fa8": { requestId: "old" } });
});
