import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import VisualSectionPreview from "./VisualSectionPreview";
import VisualDesignPreview from "./VisualDesignPreview";
import { DEFAULT_SITE_THEME } from "../visual-engine/theme";
import { sampleDocument } from "./testFixtures";
it.each(["dark", "system"] as const)("renders page and gallery previews in light mode despite saved %s preference", mode => {
 const value = { document: { ...sampleDocument, root: { ...sampleDocument.root, children: [...sampleDocument.root.children, {
  id: "switcher", type: "theme-switcher" as const, presentation: "segmented" as const, accessibleLabel: "Appearance switch", labels: { light: "Light", dark: "Dark", system: "System" },
 }] } }, theme: { ...structuredClone(DEFAULT_SITE_THEME), defaultMode: mode } };
 const before = structuredClone(value);
 const outputs = [renderToStaticMarkup(<VisualSectionPreview component={{ id: "preview", type: "custom", props: { visualBuilder: value } }} />), renderToStaticMarkup(<VisualDesignPreview value={value} large />)];
 for (const html of outputs) {
  expect(html).toMatch(/<div[^>]+data-default-mode="light"[^>]+data-theme="light"/);
  expect(html).not.toContain('aria-label="Appearance switch"');
 }
 expect(value).toEqual(before);
});
