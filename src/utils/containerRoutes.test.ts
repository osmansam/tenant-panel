import { describe, expect, it } from "vitest";
import { normalizeContainerRoutes, toggleContainerRouteFlag } from "./containerRoutes";

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
