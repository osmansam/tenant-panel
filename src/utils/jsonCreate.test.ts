import { describe, expect, it } from "vitest";
import {
  normalizeContainerJsonPayload,
  normalizePageJsonPayload,
  parseJsonObject,
} from "./jsonCreate";

describe("json create helpers", () => {
  it("parses object JSON and strips identity fields recursively", () => {
    expect(
      parseJsonObject('{"_id":"1","name":"Page","sections":[{"id":"s1","type":"grid"}]}'),
    ).toEqual({ name: "Page", sections: [{ type: "grid" }] });
  });

  it("normalizes page defaults", () => {
    expect(normalizePageJsonPayload({ name: "Dashboard" })).toMatchObject({
      name: "Dashboard",
      sections: [],
      filters: [],
      isAuthenticated: true,
    });
  });

  it("normalizes container fields", () => {
    expect(
      normalizeContainerJsonPayload({ SchemaName: "orders", Fields: [{ name: "email" }] }),
    ).toMatchObject({ schemaName: "orders", fields: [{ name: "email" }] });
  });
});
