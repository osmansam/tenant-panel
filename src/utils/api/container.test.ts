import { describe, expect, it } from "vitest";
import { normalizeDynamicApiModel, normalizeDynamicWorkflow } from "./container";

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

  it("normalizes Dynamic Workflows returned with Go field names", () => {
    expect(
      normalizeDynamicWorkflow({
        ID: "workflow-1",
        Name: "notify",
        Version: 2,
        Trigger: "event",
        Schedule: "0 * * * *",
        Timezone: "UTC",
        Mode: "transactional",
        IsActive: false,
        IsAuthenticated: true,
        IsAuthorized: true,
        AuthorizeRole: ["admin"],
        Description: "Send notifications",
        Payload: { channel: "email" },
        Conditions: [{ field: "status", operator: "=", value: "ready" }],
        Steps: [{ name: "send", type: "action" }],
        StopOnError: false,
        TimeoutSec: 30,
        ReturnStep: "send",
        OutputFields: ["messageId"],
        RunInTransaction: true,
      })
    ).toEqual({
      id: "workflow-1",
      name: "notify",
      version: 2,
      trigger: "event",
      schedule: "0 * * * *",
      timezone: "UTC",
      mode: "transactional",
      isActive: false,
      isAuthenticated: true,
      isAuthorized: true,
      authorizeRole: ["admin"],
      description: "Send notifications",
      payload: { channel: "email" },
      conditions: [{ field: "status", operator: "=", value: "ready" }],
      steps: [{ name: "send", type: "action" }],
      stopOnError: false,
      timeoutSec: 30,
      returnStep: "send",
      outputFields: ["messageId"],
      runInTransaction: true,
    });
  });
});
