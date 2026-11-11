async (page) => {
  await page.evaluate(() => { window.confirm = () => true; });
  await page.getByRole("button", { name: "Reload", exact: true }).click();
  await page.waitForFunction(() => !Array.from(document.querySelectorAll("button")).find(button => button.textContent === "Reload")?.disabled);
  await page.getByRole("button", { name: /^Heading ·/ }).waitFor();
  const overview = page.__visualFixture.pages.find(page => page.name === "Overview");
  page.__visualFixture.externalVersion = (page.__visualFixture.externalVersion ?? 0) + 1;
  const updatedText = `Updated in another editor ${page.__visualFixture.externalVersion}`;
  overview.sections[0].component.props.visualBuilder.document.root.children[0].text = updatedText;
  const reloaded = page.waitForResponse(response => response.url().endsWith("/admin/page/222222222222222222222222"));
  await page.getByRole("button", { name: "Reload", exact: true }).click();
  await reloaded;
  await page.waitForFunction(() => !Array.from(document.querySelectorAll("button")).find(button => button.textContent === "Reload")?.disabled);
  await page.waitForTimeout(100);
  if (!await page.getByRole("heading", { name: updatedText, exact: true }).isVisible()) throw new Error("Reload reopened stale cached document content");
}
