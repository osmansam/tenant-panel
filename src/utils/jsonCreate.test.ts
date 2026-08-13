import { describe, expect, it } from "vitest";
import {
  normalizeContainerJsonPayload,
  normalizePageJsonPayload,
  parseJsonObject,
} from "./jsonCreate";

describe("json create helpers", () => {
  it("strips only root record identity fields and preserves nested configuration ids", () => {
    expect(
      parseJsonObject(
        '{"id":"page-id","_id":"1","name":"Page","sections":[{"id":"s1","type":"grid","components":[{"id":"cmp1","table":{"generatedRelationColumns":[{"id":"relation1"}],"toggles":[{"id":"toggle1"}]}}]}]}',
      ),
    ).toEqual({
      name: "Page",
      sections: [
        {
          id: "s1",
          type: "grid",
          components: [
            {
              id: "cmp1",
              table: {
                generatedRelationColumns: [{ id: "relation1" }],
                toggles: [{ id: "toggle1" }],
              },
            },
          ],
        },
      ],
    });
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
