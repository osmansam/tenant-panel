import { describe, expect, it } from "vitest";
import { getHttpMethodBadgeTreatment } from "./http-method-badge";

describe("getHttpMethodBadgeTreatment", () => {
  it.each([
    ["GET", "success"],
    ["post", "info"],
    ["PUT", "warning"],
    ["patch", "warning"],
    ["DELETE", "danger"],
    ["OPTIONS", "mono"],
  ] as const)("maps %s to the %s semantic Badge treatment", (method, variant) => {
    expect(getHttpMethodBadgeTreatment(method)).toEqual({
      variant,
      className: "font-mono font-semibold uppercase tracking-wider",
    });
  });
});
