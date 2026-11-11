// Run after scripts/visual-library-browser-fixture.js in an isolated playwright-cli session.
// All API data and saves stay in the fixture; no live project records are accessed.
async (page) => {
 await page.setViewportSize({ width: 1440, height: 1000 });
 await page.getByRole('tab', { name: 'Built-in admin templates (8)', exact: true }).click();
 const names = ['Dashboard KPI cards', 'Record card grid', 'Compact record list', 'Customer profile', 'Record details', 'Order summary', 'Activity feed', 'Empty state'];
 if (await page.getByRole('button', { name: /^Preview / }).count() !== 8) throw new Error('Starter gallery is incomplete');
 await page.screenshot({ path: '/private/tmp/admin-templates-gallery.png', fullPage: true });
 for (const name of names) {
  await page.getByRole('button', { name: `Preview ${name}`, exact: true }).click();
  const dialog = page.getByRole('dialog', { name: `Preview: ${name}`, exact: true });
  await dialog.waitFor();
  if (await dialog.getByText('Preview unavailable.', { exact: false }).count()) throw new Error(`Preview failed: ${name}`);
  if (['Dashboard KPI cards', 'Record card grid', 'Customer profile', 'Order summary'].includes(name)) await page.screenshot({ path: `/private/tmp/admin-template-${name.toLowerCase().replaceAll(' ', '-')}.png`, fullPage: true });
  await page.getByRole('button', { name: 'Back to designs', exact: true }).click();
 }
 await page.getByRole('combobox', { name: 'Design category', exact: true }).selectOption('Records');
 if (await page.getByRole('button', { name: /^Preview / }).count() !== 2) throw new Error('Admin category does not filter');
 await page.getByRole('combobox', { name: 'Design category', exact: true }).selectOption('All categories');
 await page.getByRole('searchbox', { name: 'Search designs', exact: true }).fill('invoice');
 await page.getByRole('button', { name: 'Preview Order summary', exact: true }).waitFor();
 await page.getByRole('searchbox', { name: 'Search designs', exact: true }).fill('');
 await page.getByRole('button', { name: 'Use Record card grid', exact: true }).click();
 await page.getByRole('textbox', { name: 'Design name', exact: true }).waitFor();
 const buttonStyles = await page.getByRole('region', { name: 'Canvas', exact: true }).getByRole('button', { name: 'Edit', exact: true }).first().evaluate(element => ({ background: getComputedStyle(element).backgroundColor, color: getComputedStyle(element).color, border: getComputedStyle(element).borderTopWidth }));
 if (buttonStyles.background !== 'rgb(37, 99, 235)' || buttonStyles.color !== 'rgb(255, 255, 255)' || buttonStyles.border === '0px') throw new Error(`Canvas reset hid authored button styling: ${JSON.stringify(buttonStyles)}`);
 await page.getByRole('button', { name: 'Mobile preview', exact: true }).click();
 const frame = page.locator('.visual-builder__canvas-frame');
 await page.waitForFunction(() => document.querySelector('.visual-builder__canvas-frame')?.getAttribute('data-breakpoint') === 'mobile');
 const dimensions = await frame.evaluate(element => ({ width: element.clientWidth, content: element.scrollWidth }));
 if (dimensions.content > dimensions.width + 2) throw new Error(`Mobile template overflows: ${JSON.stringify(dimensions)}`);
 await frame.screenshot({ path: '/private/tmp/admin-template-record-grid-mobile.png' });
 await page.getByRole('button', { name: 'Desktop preview', exact: true }).click();
 await page.getByRole('button', { name: 'Save', exact: true }).click();
 await page.waitForURL(url => url.searchParams.has('design'));
 const saved = page.__visualFixture.library[0];
 if (saved.value.document.id === 'admin-record-grid') throw new Error('Template identity was reused');
 if (page.__visualFixture.requests.some(request => /\/dynamic/.test(request.path))) throw new Error('Visual templates requested live records');
 return { eightPreviews: true, categoryFilter: true, descriptionSearch: true, savedIndependentCopy: true, mobileNoOverflow: dimensions, noDataRequests: true };
}
