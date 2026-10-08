import { describe, expect, it } from "vitest";
import {
  normalizeContainerRoutes,
  toggleContainerRouteFlag,
  updateContainerRouteSpec,
} from "./containerRoutes";

describe("container route normalization", () => {
  it("canonicalizes PascalCase selection route values", () => {
    expect(
      normalizeContainerRoutes({
        GetItemsForSelection: {
          IsActive: true,
          IsAuthenticated: false,
          IsAuthorized: false,
          AuthorizeRole: [],
          Method: "GET",
        },
      }),
    ).toEqual({
      GetItemsForSelection: {
        isActive: true,
        isAuthenticated: false,
        isAuthorized: false,
        authorizeRole: [],
        method: "GET",
      },
    });
  });

  it("canonicalizes PascalCase access policy values", () => {
    expect(
      normalizeContainerRoutes({
        CreateDynamicModelItem: {
          IsActive: true,
          IsAuthenticated: false,
          IsAuthorized: false,
          AuthorizeRole: [],
          Method: "POST",
          Access: {
            Assign: { ownerId: "{{auth.user.id}}", visibility: "private" },
            Any: [
              { Field: "ownerId", Operator: "eq", Value: "{{auth.user.id}}" },
              { Context: "{{auth.user.role}}", Operator: "in", Value: ["admin", "manager"] },
            ],
          },
        },
      }),
    ).toEqual({
      CreateDynamicModelItem: {
        isActive: true,
        isAuthenticated: false,
        isAuthorized: false,
        authorizeRole: [],
        method: "POST",
        access: {
          assign: { ownerId: "{{auth.user.id}}", visibility: "private" },
          any: [
            { field: "ownerId", operator: "eq", value: "{{auth.user.id}}" },
            { context: "{{auth.user.role}}", operator: "in", value: ["admin", "manager"] },
          ],
        },
      },
    });
  });

  it("preserves canonical access literals and omits absent access", () => {
    const routes = normalizeContainerRoutes({
      createItem: {
        isActive: true,
        access: {
          assign: { tenantId: "tenant-1", tags: ["a", "b"] },
          any: [
            { field: "status", operator: "in", value: ["open", "pending"] },
            { field: "deletedAt", operator: "eq", value: null },
          ],
        },
      },
      listItems: { isActive: true },
    });

    expect(routes.createItem.access).toEqual({
      assign: { tenantId: "tenant-1", tags: ["a", "b"] },
      any: [
        { field: "status", operator: "in", value: ["open", "pending"] },
        { field: "deletedAt", operator: "eq", value: null },
      ],
    });
    expect(routes.listItems).not.toHaveProperty("access");
  });

  it("updates access immutably and removes it cleanly", () => {
    const routes = normalizeContainerRoutes({
      createItem: {
        isActive: true,
        access: { any: [{ field: "ownerId", operator: "eq", value: "user-1" }] },
      },
    });
    const updated = updateContainerRouteSpec(routes, "createItem", {
      access: { any: [{ context: "{{auth.user.role}}", operator: "eq", value: "admin" }] },
    });
    expect(updated).not.toBe(routes);
    expect(updated.createItem).not.toBe(routes.createItem);
    expect(routes.createItem.access?.any?.[0]).toHaveProperty("field", "ownerId");

    const removed = updateContainerRouteSpec(updated, "createItem", { access: undefined });
    expect(removed.createItem).not.toHaveProperty("access");
  });

  it("toggles selection without retaining a conflicting PascalCase flag", () => {
    const routes = toggleContainerRouteFlag(
      {
        GetItemsForSelection: {
          IsActive: true,
          IsAuthenticated: false,
          IsAuthorized: false,
          AuthorizeRole: [],
          Method: "GET",
        },
      },
      "GetItemsForSelection",
      "isActive",
      false,
    );
    expect(routes.GetItemsForSelection).toEqual({
      isActive: false,
      isAuthenticated: false,
      isAuthorized: false,
      authorizeRole: [],
      method: "GET",
    });
    expect(routes.GetItemsForSelection).not.toHaveProperty("IsActive");
  });
});
