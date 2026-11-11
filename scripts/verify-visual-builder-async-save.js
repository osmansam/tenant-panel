async (page) => {
  await page.getByRole("button", { name: /^Heading ·/ }).click();
  const input = page.getByRole("textbox", { name: "Heading text", exact: true });
  await input.fill("Version being saved");
  page.__visualFixture.saveDelay = 1500;
  const response = page.waitForResponse(response => response.request().method() === "PATCH");
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await input.fill("Edited while saving");
  await response;
  await page.waitForTimeout(100);
  const status = await page.getByRole("status", { name: "Document status" }).innerText();
  if (status !== "Unsaved changes") throw new Error(`Edits made during save were incorrectly marked ${status}`);
  if (await input.inputValue() !== "Edited while saving") throw new Error("Save replaced the newer draft");
  page.__visualFixture.saveDelay = 0;
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await page.getByRole("status", { name: "Document status" }).filter({ hasText: "Saved" }).waitFor();
}
