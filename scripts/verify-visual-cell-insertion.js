// Run after visual-builder-browser-fixture.js on panel3016/runtime3015.
async (page) => {
  const fixture = page.__visualFixture;
  const target = fixture.pages.find(item => item.name === "Overview");
  target.sections = [{ columns: 2, gap: 16, cells: [
    { id: "left_cell", row: 1, column: 1, components: [{ id: "native_info", type: "infoBlocks", title: "Keep native content", props: { infoBlocks: { source: "static", items: [{ title: "Native content", value: "Keep native content", footer: "Unchanged" }] } } }] },
    { id: "right_cell", row: 1, column: 2, components: [] },
  ] }];
  const source = fixture.pages.find(item => item.name === "Inventory").sections[1].component;
  const sourceBefore = JSON.stringify(source);
  await page.reload();
  await page.getByRole("button", { name: "Edit", exact: true }).nth(1).click();
  await page.getByRole("button", { name: /^Section 1/ }).click();
  await page.getByTitle("Add component", { exact: true }).nth(1).click();
  await page.getByRole("combobox", { name: "Component Type", exact: true }).click();
  await page.getByRole("option", { name: "Visual component", exact: true }).click();
  if (await page.getByRole("combobox", { name: "Schema Name", exact: true }).count()) throw new Error("Visual components incorrectly require a table schema");
  await page.getByRole("radio", { name: /Inventory visual.*Inventory/ }).check();
  await page.screenshot({ path: "/private/tmp/visual-cell-insertion/component-picker.png", fullPage: true });
  const saved = page.waitForResponse(response => response.request().method() === "PATCH");
  await page.getByRole("button", { name: "Add Component", exact: true }).click();
  await saved;
  await page.getByRole("dialog", { name: "Add Component", exact: true }).waitFor({ state: "hidden" });
  await page.getByRole("button", { name: "Save Page", exact: true }).click();
  await page.getByText("All changes saved", { exact: true }).waitFor();
  const persisted = fixture.pages.find(item => item.name === "Overview");
  const copy = persisted.sections[0].cells[1].components[0];
  if (copy?.type !== "custom" || copy.title !== "Inventory visual") throw new Error("Design was not placed in the selected right cell");
  if (copy.id === source.id || copy.props.visualBuilder.document.id === source.props.visualBuilder.document.id) throw new Error("Inserted design reused source identity");
  if (persisted.sections[0].cells[0].components[0].id !== "native_info") throw new Error("Insertion changed a neighboring component");
  if (JSON.stringify(source) !== sourceBefore) throw new Error("Insertion mutated the source design");
  await page.screenshot({ path: "/private/tmp/visual-cell-insertion/page-cell.png", fullPage: true });
  await page.getByRole("button", { name: "Cancel", exact: true }).click();
  await page.getByTestId("page-editor-workspace").waitFor({ state: "hidden" });
  source.props.visualBuilder.document.root.children[0].text = "Source design changed after copying";
  await page.goto("http://127.0.0.1:3015/t/fixture/p/inventory/overview");
  await page.getByRole("heading", { name: "Fixture products", exact: true }).waitFor();
  await page.getByText("Keep native content", { exact: true }).waitFor();
  if (await page.getByRole("heading", { name: "Source design changed after copying", exact: true }).count()) throw new Error("Source edits unexpectedly updated an inserted copy");
  await page.screenshot({ path: "/private/tmp/visual-cell-insertion/runtime-cell.png", fullPage: true });
}
