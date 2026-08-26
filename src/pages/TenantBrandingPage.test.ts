import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const source = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)), "TenantBrandingPage.tsx"),
  "utf8",
);

describe("TenantBrandingPage", () => {
  it("edits project branding when a project is active", () => {
    expect(source).toContain("useCurrentProject");
    expect(source).toContain('scope={currentProject ? "project" : "tenant"}');
    expect(source).toContain("projectId={currentProject?.id}");
  });
});
