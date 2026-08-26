import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync(new URL("./ProjectManagementPage.tsx", import.meta.url), "utf8");

describe("ProjectManagementPage", () => {
  it("does not expose project branding management", () => {
    expect(source).not.toContain("BrandingEditor");
    expect(source).not.toContain("scope=\"project\"");
  });
});
