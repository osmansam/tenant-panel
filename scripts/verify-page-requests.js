// Run against the isolated PageRequestsEditor fixture with playwright-cli run-code --filename.
async page => {
  await page.evaluate(() => sessionStorage.removeItem("request-qa"));
  await page.reload();
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  await page.getByRole('button', { name: 'Add request', exact: true }).click();
  await page.getByRole('textbox', { name: 'Request name', exact: true }).fill('Product list');
  await page.getByRole('textbox', { name: 'Schema', exact: true }).fill('products');
  await page.getByRole('textbox', { name: 'Defaults sort', exact: true }).fill('name');
  const payload = JSON.parse(await page.locator('#payload').textContent());
  const requestId = payload.requests[0].id;
  await page.getByRole('combobox', { name: 'Products table · Data request', exact: true }).selectOption(requestId);
  await page.getByRole('combobox', { name: 'Product cards · Collection products request', exact: true }).selectOption(requestId);
  assert(await page.getByRole('button', { name: 'Delete request', exact: true }).isDisabled(), 'Connected request deletion must be blocked');
  await page.getByRole('button', { name: 'Save fixture', exact: true }).click();
  await page.reload();
  await page.getByRole('textbox', { name: 'Request name', exact: true }).waitFor();
  const saved = JSON.parse(await page.locator('#payload').textContent());
  assert(saved.requests[0].name === 'Product list', 'Request definition was lost');
  assert(saved.sections[0].component.requestBindings.data.requestId === requestId, 'Table connection was lost');
  const visual = saved.sections[1].component;
  assert(visual.requestBindings['collection:products'].requestId === requestId, 'Visual connection was lost');
  assert(visual.props.visualBuilder.document.root.children[0].source.requestSlot === 'products', 'Reusable collection slot was not saved');
  assert(!JSON.stringify(visual.props.visualBuilder.document).includes(requestId), 'Page request ID leaked into reusable visual document');
  await page.screenshot({ path: 'output/playwright/page-requests/editor.png', fullPage: true });
}
