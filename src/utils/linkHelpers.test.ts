import { describe, expect, it } from "vitest";
import { buildLinkUrl } from "./linkHelpers";

describe("link template URL safety", () => {
  it.each([
    "https://example.com/{{value}}", "http://example.com/{{value}}",
    "mailto:{{value}}", "tel:{{value}}", "/records/{{value}}",
    "records/{{value}}", "../records/{{value}}", "#{{value}}", "?id={{value}}",
  ])("allows supported URLs: %s", (linkTemplate) => {
    expect(buildLinkUrl({ linkTemplate }, "123", {})).toBe(linkTemplate.replace("{{value}}", "123"));
  });

  it.each([
    "javascript:alert(1)", "JaVaScRiPt:alert(1)", "data:text/html,test", "vbscript:msgbox(1)",
    "java\nscript:alert(1)", "https://example.com/\u0000", "\thttps://example.com",
    "javascript%3Aalert(1)", "%6aavascript:alert(1)", "https://example.com/%0d%0aheader",
  ])("rejects unsafe interpolated URLs: %s", (value) => {
    expect(buildLinkUrl({ linkTemplate: "{{value}}" }, value, {})).toBeNull();
  });

  it("validates row placeholders after substitution", () => {
    expect(buildLinkUrl({ linkTemplate: "{{row.target}}" }, "Label", { target: "data:text/html,test" })).toBeNull();
  });
});
