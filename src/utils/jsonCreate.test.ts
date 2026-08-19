import { describe, expect, it } from "vitest";
import {
  buildPageJsonUpdate,
  getEditablePageJson,
  normalizeContainerJsonPayload,
  normalizePageJsonPayload,
  parseJsonObject,
} from "./jsonCreate";

describe("json create helpers", () => {
  it("prepares the full page for JSON editing without root identity metadata", () => {
    expect(getEditablePageJson({
      _id: "page-1",
      id: "legacy-id",
      name: "Orders",
      slug: "orders",
      sections: [{ id: "section-1", type: "grid" }],
      createdAt: "yesterday",
    })).toEqual({
      name: "Orders",
      slug: "orders",
      sections: [{ id: "section-1", type: "grid" }],
    });
  });

  it("builds an update with the original page id and normalized edited JSON", () => {
    expect(buildPageJsonUpdate(
      { _id: "page-1", name: "Orders" },
      { _id: "replacement", Name: " Updated Orders ", Sections: [{ id: "section-1" }] },
    )).toEqual({
      id: "page-1",
      payload: expect.objectContaining({
        name: "Updated Orders",
        sections: [{ id: "section-1" }],
        filters: [],
        isAuthenticated: true,
      }),
    });
  });

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
