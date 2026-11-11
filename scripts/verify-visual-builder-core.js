// Run after visual-builder-browser-fixture.js with playwright-cli run-code.
async (page) => {
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  await page.evaluate(() => { window.confirm = () => true; });
  await page.getByRole("combobox", { name: "Builder page", exact: true }).selectOption("111111111111111111111111");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: /^Heading ·/ }).click();
  await page.getByRole("textbox", { name: "Heading text", exact: true }).fill("Failed save draft");
  page.__visualFixture.writeStatus = 403;
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await page.getByRole("status", { name: "Document status" }).filter({ hasText: "Needs attention" }).waitFor();
  assert(await page.getByRole("textbox", { name: "Heading text", exact: true }).inputValue() === "Failed save draft", "Failed save lost the draft");
  page.__visualFixture.writeStatus = 200;
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await page.getByRole("status", { name: "Document status" }).filter({ hasText: "Saved" }).waitFor();
  assert(page.__visualFixture.saves.at(-1).sections[1].component.props.visualBuilder.document.root.children[0].text === "Failed save draft", "Retry did not save the draft");
  await page.getByRole("textbox", { name: "Heading text", exact: true }).fill("Navigation draft");
  await page.evaluate(() => { window.confirm = () => false; });
  await page.getByRole("combobox", { name: "Builder page", exact: true }).selectOption("222222222222222222222222");
  assert(await page.getByRole("combobox", { name: "Builder page", exact: true }).inputValue() === "111111111111111111111111", "Cancelled target switch changed page");
  assert(await page.getByRole("textbox", { name: "Heading text", exact: true }).inputValue() === "Navigation draft", "Cancelled target switch lost draft");
  await page.evaluate(() => { window.confirm = () => true; });
  await page.getByRole("combobox", { name: "Builder page", exact: true }).selectOption("222222222222222222222222");
  await page.getByRole("heading", { name: "Design a visual section", exact: true }).waitFor();
  await page.getByRole("button", { name: "Add visual section", exact: true }).first().click();
  await page.getByRole("heading", { name: "Overview visual section", exact: true }).waitFor();
  const url = page.url();
  await page.evaluate(() => { window.confirm = () => false; });
  await page.goBack();
  // Allow the guard's compensating history traversal to complete.
  await page.waitForTimeout(150);
  assert(page.url() === url, "Cancelled browser Back changed the editor URL");
  assert(await page.getByRole("heading", { name: "Overview visual section", exact: true }).isVisible(), "Cancelled browser Back lost the new section");
  page.__visualFixture.results = { failedSaveRetry: "passed", cancelledTargetSwitch: "passed", newSection: "passed", cancelledBrowserBack: "passed" };
  await page.evaluate(results => { window.__visualResults = results; }, page.__visualFixture.results);
}
