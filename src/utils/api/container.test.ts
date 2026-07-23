import { describe, expect, it } from "vitest";
import { normalizeDynamicApiModel } from "./container";

describe("container API normalization", () => {
  it("normalizes Dynamic API models returned with Go field names", () => {
    expect(
      normalizeDynamicApiModel({
        Name: "status",
        Url: "https://api.example.com/status",
        Method: "POST",
        Dependencies: ["id", "token"],
        IsAuthenticated: true,
        IsAuthorized: true,
        AuthorizeRole: ["admin"],
        IsActive: false,
        IsRedisCached: true,
        CacheTime: 30,
      })
    ).toEqual({
      name: "status",
      url: "https://api.example.com/status",
      method: "POST",
      dependencies: ["id", "token"],
      isAuthenticated: true,
      isAuthorized: true,
      authorizeRole: ["admin"],
      isActive: false,
      isRedisCached: true,
      cacheTime: 30,
    });
  });
});
