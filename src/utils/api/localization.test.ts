import { describe, expect, it } from "vitest";
import { translationQueryOptions } from "./localization";

describe("translationQueryOptions", () => {
  it("does not poll translations continuously", () => {
    expect(translationQueryOptions("project-1", "tr").refetchInterval).toBe(false);
  });
});
