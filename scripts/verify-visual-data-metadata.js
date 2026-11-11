async (page) => {
 const fixture = page.__visualFixture;
 const value = fixture.pages[0].sections[0].component.props.visualBuilder;
 const visit = node => { if (node.type === 'repeater') node.source.filters = [{ field: 'name', operator: 'eq', value: 'Restored product' }]; if (node.children) node.children.forEach(visit); };
 visit(value.document.root);
 let denied = true, metadataCalls = 0;
 await page.route('**/*', route => {
  if (new URL(route.request().url()).pathname.endsWith('/runtime/schemas')) {
   metadataCalls++;
   return route.fulfill({ status: denied ? 403 : 200, contentType: 'application/json', headers: { 'access-control-allow-origin': 'http://127.0.0.1:3015', 'access-control-allow-credentials': 'true' }, body: JSON.stringify(denied ? { message: 'No metadata access' } : fixture.schemas) });
  }
  return route.fallback();
 });
 fixture.collectionCalls = [];
 await page.reload();
 await page.getByRole('alert').filter({ hasText: 'You do not have access' }).waitFor();
 if (fixture.collectionCalls.length) throw new Error('Filtered collection executed before field metadata was ready');
 if (metadataCalls !== 1) throw new Error('Forbidden metadata request retried automatically');
 denied = false;
 await page.getByRole('button', { name: 'Try again', exact: true }).click();
 await page.getByRole('heading', { name: 'Restored product', exact: true }).waitFor();
 if (fixture.collectionCalls.length !== 1) throw new Error('Metadata recovery did not execute exactly one data query');
 await page.getByRole('status').filter({ hasText: 'first page, up to 20' }).waitFor();
}
