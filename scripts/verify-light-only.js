// Run after visual-library-browser-fixture.js. Uses in-memory API data only.
async (page) => {
 if (await page.getByRole("button", { name: "Back to designs", exact: true }).count()) await page.getByRole("button", { name: "Back to designs", exact: true }).click();
 if (!page.url().includes("/pages/visual-builder")) await page.goto("http://127.0.0.1:3016/pages/visual-builder");
 await page.emulateMedia({ colorScheme: "dark" });
 await page.setViewportSize({ width: 1440, height: 1000 });
 const theme = await page.evaluate(async () => {
  const { DEFAULT_SITE_THEME } = await import("/src/visual-engine/theme/index.ts");
  return { ...structuredClone(DEFAULT_SITE_THEME), defaultMode: "system" };
 });
 const document = { version: 2, id: "light-document", name: "Stock visual section", kind: "section", root: { id: "light-root", type: "section", designPreset: "swiss-minimal", style: { color: { background: "background", text: "text" }, spacing: { paddingX: "lg", paddingY: "lg" } }, children: [
  { id: "light-heading", type: "heading", level: 2, text: "Stock overview", style: { color: { text: "text" }, typography: { size: "4xl", weight: "bold" } } },
  { id: "light-text", type: "text", text: "This section always appears in light mode." },
  { id: "light-code", type: "code", language: "json", code: '{ "example": true, "count": 12 }', wrap: true, showCopy: true, showLanguage: true },
  { id: "light-switch", type: "theme-switcher", presentation: "segmented", accessibleLabel: "Page appearance", labels: { light: "Light", dark: "Dark", system: "System" } },
 ] } };
 const value = { document, theme };
 page.__visualFixture.library = [{ id: "light-design", name: "Stock visual section", revision: 1, value }];
 page.__visualFixture.pages = [{ id: "111111111111111111111111", name: "Stock", slug: "stock", isAuthenticated: true, isAuthorized: true, authorizeRole: ["admin"], sections: [{ id: "light-section", type: "component", order: 0, component: { id: "light-component", type: "custom", title: "Stock visual section", props: { visualBuilder: value } } }] }];
 const check = async () => {
  await page.locator(".ozmi-site-theme h2").filter({ hasText: "Stock overview" }).first().waitFor();
  await page.evaluate(() => { window.document.documentElement.dataset.theme = "dark"; });
  const result = await page.locator('.ozmi-site-theme[data-theme="light"]').first().evaluate(element => {
   const section = element.querySelector("section"), code = element.querySelector(".ve-code-block");
   return { mode: element.getAttribute("data-default-mode"), scheme: getComputedStyle(element).colorScheme, background: getComputedStyle(section).backgroundColor, codeBackground: getComputedStyle(code).backgroundColor };
  });
  const bright = color => color.match(/\d+/g)?.slice(0,3).every(value => Number(value) > 180);
  if (result.mode !== "light" || result.scheme !== "light" || !bright(result.background) || !bright(result.codeBackground)) throw new Error(`Dark styling leaked into light page: ${JSON.stringify(result)}`);
  if (await page.locator(".ve-theme-switcher").count()) throw new Error("Theme switch remains on a light-only page");
 };
 await page.getByRole("button", { name: "Reload designs", exact: true }).click();
 await page.getByRole("button", { name: "Preview Stock visual section", exact: true }).click();
 await check();
 await page.screenshot({ path: "/private/tmp/light-only/gallery-preview.png", fullPage: true });
 await page.getByRole("button", { name: "Back to designs", exact: true }).click();
 await page.getByRole("link", { name: "Back to Pages", exact: true }).click();
 await page.getByRole("button", { name: "Edit", exact: true }).click();
 await page.getByRole("button", { name: "Stock visual section, visual section", exact: true }).click();
 await check();
 await page.screenshot({ path: "/private/tmp/light-only/page-preview.png", fullPage: true });
 await page.goto("http://127.0.0.1:3015/t/fixture/p/inventory/stock");
 await check();
 await page.screenshot({ path: "/private/tmp/light-only/runtime.png", fullPage: true });
 // Explicit saved dark preference also stays light after a fresh mount.
 theme.defaultMode = "dark";
 await page.reload();
 await check();
 if (value.theme.defaultMode !== "dark" || document.root.children.at(-1).type !== "theme-switcher") throw new Error("Rendering changed the saved document");
}
