async (page) => {
await (async (page) => {
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
})(page);
await (async (page) => {
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
})(page);
await (async (page) => {
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
})(page);
await (async (page) => {
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
})(page);
await (async (page) => {
  const result = await page.evaluate(async () => {
    const host = document.createElement("div"); host.style.cssText = "width:400px;height:200px";
    const canvas = document.createElement("canvas"); canvas.width = 123; canvas.height = 45; host.append(canvas); document.body.append(host);
    const effect = document.createElement("div"); effect.className = "ve-utilities"; effect.style.cssText = "width:400px;height:200px";
    const effectCanvas = document.createElement("canvas"); effectCanvas.width = 123; effectCanvas.height = 45; effect.append(effectCanvas); document.body.append(effect);
    const before = canvas.getBoundingClientRect();
    const link = document.createElement("link"); link.rel = "stylesheet"; link.href = "/src/visual-engine/effects/providers/reactbits/official/backgrounds/Hyperspeed/Hyperspeed.css?direct&t=" + Date.now();
    await new Promise((resolve, reject) => { link.onload = resolve; link.onerror = reject; document.head.append(link); });
    const after = canvas.getBoundingClientRect(); const effectSize = effectCanvas.getBoundingClientRect();
    const result = { before: [before.width, before.height], after: [after.width, after.height], effect: [effectSize.width, effectSize.height] };
    host.remove(); effect.remove(); link.remove(); return result;
  });
  if (result.after[0] !== result.before[0] || result.after[1] !== result.before[1]) throw new Error(`Effect CSS changed an application canvas from ${result.before} to ${result.after}`);
  if (result.effect[0] !== 400 || result.effect[1] !== 200) throw new Error("Effect canvas no longer fills its own surface");
})(page);

  await page.getByRole("button", { name: /^Heading ·/ }).click();
  await page.getByRole("textbox", { name: "Heading text", exact: true }).fill("Designed in Tenant Panel");
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await page.getByRole("status", { name: "Document status" }).filter({ hasText: "Saved" }).waitFor();
  const saved = page.__visualFixture.saves.at(-1);
  if (saved.sections[0].component.props.visualBuilder.document.root.children[0].text !== "Designed in Tenant Panel") throw new Error("Panel save did not persist the design");
  await page.getByRole("button", { name: "Reload", exact: true }).click();
  await page.getByRole("heading", { name: "Designed in Tenant Panel", exact: true }).waitFor();
  await page.screenshot({ path: "/private/tmp/visual-builder-relocation/panel-builder.png", fullPage: true });
  const requests = [];
  const observe = request => requests.push(new URL(request.url()).pathname);
  page.on("request", observe);
  await page.goto("http://127.0.0.1:3015/t/fixture/p/inventory/overview");
  await page.getByRole("heading", { name: "Designed in Tenant Panel", exact: true }).waitFor();
  if (await page.getByRole("combobox", { name: "Builder page", exact: true }).count()) throw new Error("Runtime contains authoring controls");
  if (requests.some(path => path.includes("/visual-engine/editor/") || path.includes("/visualBuilder/VisualBuilderPage"))) throw new Error("Runtime loaded editor code");
  await page.screenshot({ path: "/private/tmp/visual-builder-relocation/runtime-page.png", fullPage: true });
  page.off("request", observe);
  console.log("PASS: import/export, async save, refetch/reload protection, scoped CSS, panel save -> runtime rendering; runtime loads no editor code.");
}
