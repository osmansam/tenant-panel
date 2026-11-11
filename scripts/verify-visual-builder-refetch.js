async (page) => {
  await page.evaluate(() => { window.confirm = () => true; });
  await page.getByRole("button", { name: "Reload", exact: true }).click();
  await page.getByRole("button", { name: /^Heading ·/ }).click();
  const input = page.getByRole("textbox", { name: "Heading text", exact: true });
  await input.fill("Reconnect draft must survive");
  page.__visualFixture.readStatus = 503;
  try {
    const failedRead = page.waitForResponse(response => response.url().includes("/admin/page") && response.status() === 503);
    await page.evaluate(() => { window.dispatchEvent(new Event("offline")); window.dispatchEvent(new Event("online")); });
    await failedRead; await page.waitForTimeout(150);
    if (await input.count() !== 1) throw new Error("Background refetch failure unmounted the unsaved editor");
    if (await input.inputValue() !== "Reconnect draft must survive") throw new Error("Background refetch failure lost the draft");
  } finally { page.__visualFixture.readStatus = 200; }
}
