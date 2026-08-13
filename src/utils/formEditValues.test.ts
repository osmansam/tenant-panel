import { describe, expect, it } from "vitest";
import { prepareFormEditValues } from "./formEditValues";

describe("prepareFormEditValues", () => {
  it("turns populated object arrays into IDs for multi-select inputs", () => {
    expect(prepareFormEditValues(
      { permissionRoles: [{ _id: "role-1", name: "admin" }] },
      [{ key: "permissionRoles", type: "stringArray" }],
      [{ formKey: "permissionRoles", type: "select", isMultiple: true }],
    )).toEqual({ permissionRoles: ["role-1"] });
  });

  it("keeps comma-separated editing for non-select array inputs", () => {
    expect(prepareFormEditValues(
      { tags: ["one", "two"] },
      [{ key: "tags", type: "stringArray" }],
      [{ formKey: "tags", type: "text" }],
    )).toEqual({ tags: "one, two" });
  });
});
