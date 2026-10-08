import { describe, expect, it } from "vitest";
import { buildCreateContainerPayload } from "./createContainerPayload";

describe("buildCreateContainerPayload", () => {
  it("omits access from every default route", () => {
    const payload = buildCreateContainerPayload(" orders ");

    expect(payload.SchemaName).toBe("orders");
    for (const route of Object.values(payload.Routes)) {
      expect(route).not.toHaveProperty("access");
      expect(route).not.toHaveProperty("Access");
    }
  });
});
