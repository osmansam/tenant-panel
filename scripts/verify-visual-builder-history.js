async (page) => {
  await page.evaluate(() => { window.confirm = () => false; });
  await page.getByRole("combobox", { name: "Builder page", exact: true }).selectOption("222222222222222222222222");
  await page.getByRole("heading", { name: "Design a visual section", exact: true }).waitFor();
  await page.getByRole("button", { name: "Add visual section", exact: true }).first().click();
  await page.getByRole("heading", { name: "Overview visual section", exact: true }).waitFor();
  const url = page.url();
  await page.goBack();
  await page.waitForTimeout(150);
  if (page.url() !== url) throw new Error("Cancelled browser Back changed the editor URL");
  if (!await page.getByRole("heading", { name: "Overview visual section", exact: true }).isVisible()) throw new Error("Cancelled browser Back lost the draft");
}
