async (page) => {
  await page.getByRole("button", { name: "More actions", exact: true }).click();
  await page.getByRole("menuitem", { name: "Document JSON…", exact: true }).click();
  await page.getByRole("button", { name: "Export document", exact: true }).click();
  const input = page.getByRole("textbox", { name: "Document JSON", exact: true });
  const document = JSON.parse(await input.inputValue());
  document.root.children = [{ id: "overview-heading", type: "heading", level: 1, text: "API-ready card layout", style: { typography: { size: "4xl", weight: "bold" } } }];
  await input.fill(JSON.stringify(document));
  await page.getByRole("button", { name: "Import document", exact: true }).click();
  await page.getByRole("heading", { name: "API-ready card layout", exact: true }).waitFor();
  await page.getByRole("button", { name: "Export document", exact: true }).click();
  if (JSON.parse(await input.inputValue()).root.children[0].text !== "API-ready card layout") throw new Error("Imported document did not export correctly");
  await page.getByRole("button", { name: "Close document tools", exact: true }).click();
  await page.getByRole("button", { name: "Heading · API-ready card layout", exact: true }).click();
}
