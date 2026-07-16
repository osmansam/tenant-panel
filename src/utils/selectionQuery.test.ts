import { describe, expect, it } from "vitest";
import { getSelectionQueryConfig } from "./selectionQuery";

describe("getSelectionQueryConfig", () => {
  it("uses the same key for the same selection request across callers", () => {
    const first = getSelectionQueryConfig({
      schemaName: "product",
      fieldName: "name",
    });
    const second = getSelectionQueryConfig({
      schemaName: "product",
      fieldName: "name",
    });

    expect(first.queryKey).toEqual(second.queryKey);
    expect(first.path).toBe("/dynamic/selection?schemaName=product&fieldName=name");
  });

  it("separates otherwise identical requests by tenant and project scope", () => {
    const first = getSelectionQueryConfig({
      schemaName: "product",
      fieldName: "name",
      tenantSlug: "acme",
      projectSlug: "retailerv2",
    });
    const second = getSelectionQueryConfig({
      schemaName: "product",
      fieldName: "name",
      tenantSlug: "beta",
      projectSlug: "retailerv2",
    });

    expect(first.queryKey).not.toEqual(second.queryKey);
  });
});
