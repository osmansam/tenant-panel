// Run after visual-library-browser-fixture.js. All writes use isolated memory fixtures.
async (page) => {
 const makeDocument = (id, name, heading, detail, background) => ({
  version: 2, id, name, kind: "section", root: { id: `${id}-root`, type: "section", style: { color: { background: "surface-muted", text: "text" }, spacing: { paddingX: "xl", paddingY: "xl" } }, children: [
   { id: `${id}-heading`, type: "heading", level: 2, text: heading, style: { typography: { size: "4xl", weight: "bold" } } },
   { id: `${id}-text`, type: "text", text: detail, style: { typography: { size: "xl" } } },
   { id: `${id}-card`, type: "card", element: "article", style: { spacing: { paddingX: "lg", paddingY: "lg" }, border: { radius: "lg" }, color: { background: "surface", text: "text" } }, children: [
    { id: `${id}-metric`, type: "heading", level: 3, text: "128 items", style: { typography: { size: "2xl" } } },
    { id: `${id}-caption`, type: "text", text: "Your project content appears here" },
   ] },
  ] },
 });
 page.__visualFixture.library = [
  { id: "own-card", name: "Inventory card", revision: 1, value: { document: makeDocument("inventory-card", "Inventory card", "Inventory overview", "Keep your products and stock in view.", "#f0f7ff") } },
  { id: "own-orders", name: "Orders summary", revision: 1, value: { document: makeDocument("orders-summary", "Orders summary", "Orders at a glance", "A summary designed for your workspace.", "#f0faf4") } },
  { id: "own-contact", name: "Contact section", revision: 1, value: { document: makeDocument("contact-section", "Contact section", "Let’s keep in touch", "A reusable section for your project pages.", "#faf3ff") } },
 ];
 await page.setViewportSize({ width: 1440, height: 1000 });
 await page.getByRole("button", { name: "Reload designs", exact: true }).click();
 await page.getByRole("button", { name: "Preview Inventory card", exact: true }).waitFor();
 if (await page.getByRole("tab", { name: /Ozmishow/ }).count()) throw new Error("Gallery includes unwanted ozmishow designs");
 const cards = page.locator(".vd-card");
 await page.locator(".vd-preview__canvas").first().waitFor();
 await page.screenshot({ path: "/private/tmp/visual-gallery/own-designs.png", fullPage: true });
 const previewButton = cards.first().getByRole("button", { name: /^Preview / });
 const title = (await previewButton.getAttribute("aria-label")).slice(8);
 await previewButton.click();
 const preview = page.getByRole("dialog", { name: `Preview: ${title}`, exact: true });
 await preview.waitFor();
 if (await page.locator(".vb-host__editor").count()) throw new Error("Preview selected a draft without confirmation");
 await page.screenshot({ path: "/private/tmp/visual-gallery/large-preview.png", fullPage: true });
 await preview.getByRole("button", { name: `Open ${title}`, exact: true }).click();
 await page.getByRole("textbox", { name: "Design name", exact: true }).fill("Inventory card updated");
 await page.getByRole("button", { name: "Save", exact: true }).click();
 await page.getByRole("status", { name: "Document status" }).filter({ hasText: "Saved" }).waitFor();
 await page.waitForURL(url => url.searchParams.has("design"));
 if (page.__visualFixture.library.length !== 3 || page.__visualFixture.library[0].id !== "own-card") throw new Error("Opening a saved design changed its identity");
 await page.getByRole("button", { name: "Browse designs", exact: true }).click();
 const browse = page.getByRole("dialog", { name: "Browse visual designs", exact: true });
 await browse.getByRole("button", { name: "Preview Inventory card updated", exact: true }).waitFor();
 await page.screenshot({ path: "/private/tmp/visual-gallery/saved-designs.png", fullPage: true });
 await browse.getByRole("button", { name: "Open Inventory card updated", exact: true }).click();
 page.__visualFixture.pages = [{ id: "111111111111111111111111", name: "Stock", slug: "stock", sections: [{ id: "grid-a", type: "grid", order: 0, grid: { columns: 1, cells: [{ id: "cell_a", row: 1, column: 1, components: [] }] } }] }];
 await page.getByRole("link", { name: "Back to Pages", exact: true }).click();
 await page.getByRole("button", { name: "Edit", exact: true }).click();
 await page.getByRole("button", { name: "Add section", exact: true }).click();
 await page.getByRole("menuitem", { name: "Visual section", exact: true }).click();
 const picker = page.getByRole("dialog", { name: "Add visual section", exact: true });
 await picker.getByRole("button", { name: "Preview Inventory card updated", exact: true }).waitFor();
 await page.screenshot({ path: "/private/tmp/visual-gallery/section-picker.png", fullPage: true });
 await picker.getByRole("radio", { name: "Inventory card updated", exact: true }).check();
 await picker.getByRole("button", { name: "Add section", exact: true }).click();
 await page.getByRole("button", { name: "Save Page", exact: true }).click();
 await page.getByText("All changes saved", { exact: true }).waitFor();
 const fixture = page.__visualFixture;
 const section = fixture.pages[0].sections[1];
 if (section.component.props.visualBuilder.document.id === fixture.library[0].value.document.id || fixture.pages[0].sections[0].id !== "grid-a") throw new Error("Gallery insertion did not preserve independent mixed sections");
 // Check narrow-screen gallery.
 await page.goto("http://127.0.0.1:3016/pages/visual-builder");
 await page.setViewportSize({ width: 390, height: 844 });
 await page.getByRole("button", { name: "Preview Inventory card updated", exact: true }).waitFor();
 await page.screenshot({ path: "/private/tmp/visual-gallery/mobile.png", fullPage: true });
 if (await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)) throw new Error("Gallery overflows on mobile");
 const mediaDesign = fixture.library[0].value.document;
 mediaDesign.root.style.background = [{ kind: "video", src: "https://example.test/background.mp4", fit: "cover", position: "center", muted: true, loop: true }];
 mediaDesign.root.children.push(
  { id: "saved-video", type: "video", title: "Saved video", src: "https://example.test/video.mp4", poster: "/visual-builder/placeholder.svg", autoplay: true },
  { id: "saved-audio", type: "audio", accessibleLabel: "Saved audio", src: "https://example.test/audio.mp3", autoplay: true },
  { id: "saved-embed", type: "embed", title: "Saved embed", src: "https://example.test/embed", loading: "eager" },
 );
 await page.getByRole("button", { name: "Reload designs", exact: true }).click();
 await page.getByRole("button", { name: "Preview Inventory card updated", exact: true }).click();
 await page.getByRole("dialog", { name: "Preview: Inventory card updated", exact: true }).waitFor();
 if (await page.locator(".vd-preview video, .vd-preview audio, .vd-preview iframe, .vd-preview source").count()) throw new Error("Gallery started live media");
 if (mediaDesign.root.children.at(-1).type !== "embed") throw new Error("Static preview modified the saved media document");
}
