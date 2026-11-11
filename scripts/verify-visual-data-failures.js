async (page) => {
 const fixture = page.__visualFixture;
 fixture.sourceStatus = 401; fixture.collectionCalls = [];
 await page.reload();
 await page.getByRole('alert').filter({ hasText: 'Sign in to view' }).waitFor();
 if (fixture.collectionCalls.length !== 2) throw new Error('401 did not use exactly the runtime client refresh retry');
 fixture.sourceStatus = 200;
 await page.route('**/*', route => {
  const url = new URL(route.request().url());
  if (fixture.networkFailure && url.pathname.endsWith('/dynamic/table-source')) { fixture.collectionCalls.push(url.search); return route.abort('internetdisconnected'); }
  return route.fallback();
 });
 fixture.networkFailure = true; fixture.collectionCalls = [];
 await page.reload();
 await page.getByRole('alert').filter({ hasText: 'Check your connection' }).waitFor();
 if (fixture.collectionCalls.length !== 2) throw new Error('Network failure did not get one retry');
 fixture.networkFailure = false; fixture.sourceDelay = 20000; fixture.collectionCalls = [];
 await page.reload();
 await page.getByRole('alert').filter({ hasText: 'too long to load' }).waitFor({ timeout: 45000 });
 if (fixture.collectionCalls.length !== 2) throw new Error('Timeout did not get one retry');
 fixture.sourceDelay = 0;
 await page.getByRole('button', { name: 'Try again', exact: true }).click();
 await page.getByRole('heading', { name: 'Restored product', exact: true }).waitFor();
}
