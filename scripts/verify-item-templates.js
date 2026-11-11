// Run after visual-data-browser-fixture.js. Exercises the real editor; no live API writes.
async (page) => {
 const fixture = page.__visualFixture;
 await page.setViewportSize({ width: 1600, height: 1050 });
 page.once("dialog", dialog => dialog.accept());
 await page.getByRole("button", { name: "New design", exact: true }).click();
 await page.getByRole("textbox", { name: "Design name", exact: true }).fill("Product catalog");
 await page.getByRole("button", { name: "More actions", exact: true }).click();
 await page.getByRole("menuitem", { name: "Document JSON…", exact: true }).click();
 await page.getByRole("button", { name: "Export document", exact: true }).click();
 const json = page.getByRole("textbox", { name: "Document JSON", exact: true });
 const document = JSON.parse(await json.inputValue());
 document.name = "Product catalog";
 document.root.children = [{ id: "card", type: "card", element: "article", style: { spacing: { padding: "lg", gap: "md" }, border: { radius: "lg", width: "hairline", color: "border" }, color: { background: "surface", text: "text" } }, children: [
  { id: "product-title", type: "heading", level: 3, text: "Product name", style: { typography: { size: "2xl", weight: "bold" } } },
  { id: "product-image", type: "image", src: "/visual-builder/placeholder.svg", alt: "Product photo", style: { custom: { width: "240px", height: "150px" } } },
  { id: "product-price", type: "text", text: "Price" },
 ] }];
 await json.fill(JSON.stringify(document));
 await page.getByRole("button", { name: "Import document", exact: true }).click();
 await page.getByRole("button", { name: "Close document tools", exact: true }).click();
 await page.getByRole("button", { name: /^Card ·/ }).click();
 await page.getByRole("button", { name: "Repeat with data", exact: true }).click();
 await page.getByRole("textbox", { name: "Collection source", exact: true }).waitFor();
 await page.getByRole("button", { name: "Undo", exact: true }).click();
 if (await page.getByRole("textbox", { name: "Collection source", exact: true }).count()) throw new Error("Repeater wrap was not one undo step");
 await page.getByRole("button", { name: "Redo", exact: true }).click();
 await page.getByRole("button", { name: /^Repeater ·/ }).click();
 await page.getByRole("combobox", { name: "Data schema", exact: true }).selectOption("products");
 // Type templates into the normal authoring fields, without field-selector bindings.
 await page.getByRole("button", { name: /^Heading ·/ }).click();
 await page.getByRole("textbox", { name: "Heading text", exact: true }).fill("{{item.name}}");
 await page.getByRole("button", { name: /^Image ·/ }).click();
 await page.getByRole("textbox", { name: "Image source", exact: true }).fill("{{item.imageUrl}}");
 await page.getByRole("textbox", { name: "Alternative text", exact: true }).fill("Photo of {{item.name}}");
 await page.getByRole("button", { name: /^Text ·/ }).click();
 await page.getByRole("textbox", { name: "Text content", exact: true }).fill("{{item.name}} — Price: {{item.price}}");
 await page.getByRole("button", { name: "Sample records", exact: true }).click();
 await page.getByRole("button", { name: "Load five example products", exact: true }).click();
 await page.getByRole("button", { name: "Preview data", exact: true }).click();
 await page.getByRole("heading", { name: "Example product 5", exact: true }).waitFor();
 if (await page.locator('[aria-label="Sample data preview"] [data-repeater-instance]').count() !== 5) throw new Error("Sample preview did not repeat five cards");
 await page.screenshot({ path: "/private/tmp/item-template-samples.png", fullPage: true });
 await page.getByRole("button", { name: "Close samples", exact: true }).click();
 await page.getByRole("button", { name: "Save", exact: true }).click();
 await page.getByRole("status", { name: "Document status" }).filter({ hasText: "Saved" }).waitFor();
 await page.waitForURL(url => url.searchParams.has("design"));
 if (fixture.collectionCalls.length) throw new Error("Authoring issued a production data request");
 if (JSON.stringify(fixture.library[0]).includes("Example product")) throw new Error("Sample records leaked into the saved design");
 if (!JSON.stringify(fixture.library[0].value).includes("{{item.name}}")) throw new Error("Saving replaced authored templates");
 if (!JSON.stringify(fixture.library[0].value).includes("{{item.price}}")) throw new Error("Saving lost price template");
 fixture.pages = [{ id: "111111111111111111111111", name: "Catalog", slug: "catalog", isAuthenticated: true, isAuthorized: true, authorizeRole: ["admin"], sections: [{ id: "grid", type: "grid", order: 0, grid: { columns: 1, cells: [{ id: "cell", row: 1, column: 1, components: [] }] } }] }];
 await page.getByRole("link", { name: "Back to Pages", exact: true }).click();
 await page.getByRole("button", { name: "Edit", exact: true }).click();
 await page.getByRole("button", { name: "Add section", exact: true }).click();
 await page.getByRole("menuitem", { name: "Visual section", exact: true }).click();
 const picker = page.getByRole("dialog", { name: "Add visual section", exact: true });
 await picker.getByRole("radio", { name: "Product catalog", exact: true }).check();
 await picker.getByRole("button", { name: "Add section", exact: true }).click();
 await page.getByRole("button", { name: "Save Page", exact: true }).click();
 await page.getByText("All changes saved", { exact: true }).waitFor();
 if (fixture.collectionCalls.length) throw new Error("Page design preview issued a production data request");
 await page.screenshot({ path: "/private/tmp/item-template-page.png", fullPage: true });
 await page.emulateMedia({ colorScheme: "dark" });
 await page.goto("http://127.0.0.1:3015/t/fixture/p/inventory/catalog");
 await page.getByRole("heading", { name: "Live product 5", exact: true }).waitFor();
 if (await page.locator("[data-repeater-instance]").count() !== 5) throw new Error("Runtime did not render five cards");
 if (fixture.collectionCalls.length !== 1) throw new Error("Templates added redundant collection requests");
 await page.getByText("Live product 1 — Price: 12", { exact: true }).waitFor();
 await page.getByText("Live product 5 — Price: 60", { exact: true }).waitFor();
 if (await page.locator('[data-visual-block] img[alt="Photo of Live product 5"]').count() !== 1) throw new Error("Image alt template did not resolve");
 if (await page.locator('[data-visual-block] img[src*="{{"]').count()) throw new Error("Runtime requested raw template image URL");
 if (await page.locator('.ozmi-site-theme:not([data-theme="light"])').count()) throw new Error("Runtime changed to dark mode");
 await page.screenshot({ path: "/private/tmp/item-template-runtime.png", fullPage: true });
 console.log("Template authoring, sample preview, save, independent page placement and five live cards from one query passed.");
}
