import { test as base, expect, type Page, type APIRequestContext } from '@playwright/test';
import { readFileSync } from 'node:fs';

type Seed = { tenantId: string; projectId: string; secondProjectId: string; inactiveProjectId: string; pageId: string; memberId: string };
const api = 'http://127.0.0.1:4174';
const password = 'Smoke-password-123!';
const fixtureHeaders = () => ({ 'X-E2E-Key': JSON.parse(readFileSync('output/playwright/fixture.json', 'utf8')).key });
const test = base.extend<{ seed: Seed }>({
  seed: async ({ request }, use) => {
    const response = await request.post(`${api}/__e2e/reset`, { headers: fixtureHeaders() });
    expect(response.ok(), await response.text()).toBeTruthy();
    await use(await response.json());
  },
});
// Every journey gets an empty browser context and a newly seeded disposable DB.
test.beforeEach(async ({ seed }) => { expect(seed.projectId).toMatch(/^[a-f0-9]{24}$/); });
async function login(page: Page, email = 'owner@example.test') {
  await page.goto('/login');
  await page.getByLabel(/^Email/).fill(email);
  await page.getByLabel(/^Password/).fill(password);
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page).not.toHaveURL(/\/login/);
  await expect(page.getByRole('button', { name: 'Logout', exact: true }).first()).toBeVisible();
}
async function openProject(page: Page, name = 'Inventory') {
  await page.goto('/projects');
  await page.getByRole('button', { name: `Switch to ${name}`, exact: true }).click();
  await expect(page).toHaveURL(/\/collections$/);
  await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
}
async function createInvitation(request: APIRequestContext, projectId: string, email: string) {
  const login = await request.post(`${api}/api/v1/tenant/auth/login`, { data: { email: 'owner@example.test', password } });
  expect(login.ok(), await login.text()).toBeTruthy();
  const response = await request.post(`${api}/api/v1/tenant/projects/${projectId}/invitations`, { headers: { 'Idempotency-Key': crypto.randomUUID(), Origin: 'http://127.0.0.1:4173' }, data: { email, role: 'project_viewer' } });
  expect(response.status(), await response.text()).toBe(202);
  return invitationPath(request, email);
}
async function invitationPath(request: APIRequestContext, email: string) {
  const response = await request.get(`${api}/__e2e/mail`, { headers: fixtureHeaders(), params: { email } });
  expect(response.ok(), await response.text()).toBeTruthy();
  const mail = await response.json() as { textBody: string };
  const link = mail.textBody.split('\n').find(line => line.startsWith('https://'));
  expect(link, 'Production delivery worker must produce an invitation email').toBeTruthy();
  const url = new URL(link!);
  return `${url.pathname}${url.hash}`;
}
async function selectRole(page: Page, label: string) {
  await page.getByRole('combobox', { name: 'Role', exact: true }).click();
  await page.getByRole('option', { name: label, exact: true }).click();
}

test('01 login and logout clear both tenant and project sessions', async ({ page, seed }) => {
  await login(page); await openProject(page);
  const secondTab = await page.context().newPage();
  await secondTab.goto('/members');
  await expect(secondTab.getByRole('heading', { name: 'Project members', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Logout', exact: true }).first().click();
  await expect(page).toHaveURL(/\/login$/);
  expect(await page.evaluate(() => localStorage.getItem('user'))).toBeNull();
  for (const path of ['/tenant/auth/session', '/smoke/inventory/tenant-auth/session']) {
    const response = await page.request.get(`${api}/api/v1${path}`);
    if (path === '/tenant/auth/session') { expect(response.status()).toBe(200); expect((await response.json()).authenticated).toBe(false); }
    else expect(response.status()).toBe(401);
  }
  await secondTab.reload();
  await expect(secondTab).toHaveURL(/\/login$/);
  await secondTab.close();
  expect(seed.projectId).toBeTruthy();
});

test('02 temporary 503 preserves workspace; expired session returns to login', async ({ page }) => {
  await login(page); await openProject(page);
  const stored = await page.evaluate(() => localStorage.getItem('currentProject'));
  await page.route('**/tenant-auth/session', route => route.fulfill({ status: 503, headers: { 'Access-Control-Allow-Origin': 'http://127.0.0.1:4173', 'Access-Control-Allow-Credentials': 'true' }, json: { message: 'Injected dependency outage' } }));
  await page.reload();
  await expect(page.getByRole('alert').filter({ hasText: 'Unable to verify workspace access' })).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('currentProject'))).toBe(stored);
  await page.unroute('**/tenant-auth/session'); await page.reload();
  await expect(page.getByRole('button', { name: 'Logout', exact: true }).first()).toBeVisible();
  // Removing real HttpOnly credentials simulates a fully expired browser session.
  await page.context().clearCookies(); await page.reload();
  await expect(page).toHaveURL(/\/login$/);
});

test('03 new account accepts emailed invitation and receives project scope', async ({ browser, request, seed }) => {
  const path = await createInvitation(request, seed.projectId, 'new@example.test');
  const context = await browser.newContext(); const page = await context.newPage();
  try {
    await page.goto(`http://127.0.0.1:4173${path}`);
    await page.getByRole('button', { name: 'Create new account', exact: true }).click();
    await page.getByLabel('Name', { exact: true }).fill('New Collaborator');
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Create account and join', exact: true }).click();
    await expect(page).toHaveURL(/\/collections$/);
    const session = await page.request.get(`${api}/api/v1/smoke/inventory/tenant-auth/session`);
    expect(session.ok(), await session.text()).toBeTruthy();
    expect(JSON.stringify(await session.json())).toContain('project_viewer');
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('currentProject') || '{}').id)).toBe(seed.projectId);
  } finally { await context.close(); }
});

test('04 existing verified account reauthenticates and joins emailed invitation', async ({ browser, request, seed }) => {
  const path = await createInvitation(request, seed.projectId, 'existing@example.test');
  const context = await browser.newContext(); const page = await context.newPage();
  try {
    await page.goto(`http://127.0.0.1:4173${path}`);
    await page.getByRole('button', { name: 'Use existing account', exact: true }).click();
    await page.getByLabel('Email', { exact: true }).fill('existing@example.test');
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Verify account', exact: true }).click();
    await page.getByRole('button', { name: 'Join project', exact: true }).click();
    await expect(page).toHaveURL(/\/collections$/);
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('user') || '{}').email)).toBe('existing@example.test');
    const response = await page.request.get(`${api}/api/v1/smoke/inventory/tenant-auth/session`);
    expect(response.ok(), await response.text()).toBeTruthy();
  } finally { await context.close(); }
});

test('05 wrong account must sign out before invited account can join', async ({ page, request, seed }) => {
  const path = await createInvitation(request, seed.projectId, 'existing@example.test');
  await login(page); await openProject(page); await page.goto(path);
  await expect(page.getByText('A different account is signed in.', { exact: false })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Join project', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Sign out and continue', exact: true }).click();
  await page.getByLabel('Email', { exact: true }).fill('existing@example.test');
  await page.getByLabel('Password', { exact: true }).fill(password);
  await page.getByRole('button', { name: 'Verify account', exact: true }).click();
  await page.getByRole('button', { name: 'Join project', exact: true }).click();
  await expect(page).toHaveURL(/\/collections$/);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('user') || '{}').email)).toBe('existing@example.test');
});

test('06 invite collaborator, change a member role and remove project access', async ({ page, request, seed }) => {
  await login(page); await page.goto(`/projects/${seed.projectId}/members`);
  await page.getByRole('button', { name: 'Invite collaborator', exact: true }).click();
  await page.getByLabel('Email', { exact: true }).fill('queued@example.test');
  await page.getByRole('button', { name: 'Queue invitation', exact: true }).click();
  await expect(page.getByText('queued@example.test', { exact: true })).toBeVisible();
  expect(await invitationPath(request, 'queued@example.test')).toContain('/invitations/accept#');
  const member = page.locator('article').filter({ hasText: 'member@example.test' });
  await member.getByRole('button', { name: 'Change role', exact: true }).click();
  await selectRole(page, 'Editor');
  await page.getByRole('button', { name: 'Save role', exact: true }).click();
  await expect(member).toContainText('project_editor');
  await member.getByRole('button', { name: 'Remove access', exact: true }).click();
  await page.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(member).toContainText('disabled');
  await page.reload();
  await expect(page.locator('article').filter({ hasText: 'member@example.test' })).toContainText('disabled');
});

test('07 project switch changes live scope and inactive project stays disabled', async ({ page, seed }) => {
  await login(page); await page.goto('/projects');
  await expect(page.getByRole('button', { name: 'Archived', exact: true })).toBeDisabled();
  const denied = await page.request.post(`${api}/api/v1/tenant/auth/switch-project`, { headers: { Origin: 'http://127.0.0.1:4173' }, data: { projectId: seed.inactiveProjectId } });
  expect(denied.status()).toBe(403);
  await page.getByRole('button', { name: 'Switch to Inventory', exact: true }).click();
  await expect(page).toHaveURL(/\/collections$/);
  await page.getByRole('button', { name: 'Back to Tenant', exact: true }).first().click();
  await expect(page).toHaveURL(/\/projects$/);
  await page.getByRole('button', { name: 'Switch to Catalog', exact: true }).click();
  await expect(page).toHaveURL(/\/collections$/);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('currentProject') || '{}').id)).toBe(seed.secondProjectId);
  const session = await page.request.get(`${api}/api/v1/smoke/catalog/tenant-auth/session`);
  expect(session.ok(), await session.text()).toBeTruthy();
});

test('08 designer edit and save survives backend reload', async ({ page, seed }) => {
  await login(page); await openProject(page); await page.goto('/pages');
  await page.getByRole('button', { name: 'Edit', exact: true }).click();
  await page.getByRole('tab', { name: 'Page settings', exact: true }).click();
  await page.getByLabel('Page Name', { exact: true }).fill('Smoke Page Saved');
  const saved = page.waitForResponse(response => response.url().endsWith(`/admin/page/${seed.pageId}`) && response.request().method() === 'PATCH');
  await page.getByRole('button', { name: 'Save Page', exact: true }).click();
  expect((await saved).ok()).toBeTruthy();
  await expect(page.getByText('All changes saved', { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('button', { name: 'View page details: Smoke Page Saved', exact: true })).toBeVisible();
  const response = await page.request.get(`${api}/api/v1/smoke/inventory/admin/page/${seed.pageId}`);
  expect(response.ok()).toBeTruthy(); expect(JSON.stringify(await response.json())).toContain('Smoke Page Saved');
});

test('09 hard reload of project-id members URL restores verified permissions', async ({ page, seed }) => {
  await login(page); await page.goto(`/projects/${seed.projectId}/members`);
  await expect(page.getByRole('heading', { name: 'Project members', exact: true })).toBeVisible();
  await expect(page.getByText('member@example.test', { exact: true })).toBeVisible();
  await page.reload();
  await expect(page).toHaveURL(new RegExp(`/projects/${seed.projectId}/members$`));
  await expect(page.getByRole('heading', { name: 'Project members', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Invite collaborator', exact: true })).toBeEnabled();
  await expect(page.getByText('member@example.test', { exact: true })).toBeVisible();
});

test('10 visual builder placed-component deep link and reload load the saved document', async ({ page, seed }) => {
  await login(page); await openProject(page);
  const deepLink = `/pages/visual-builder?page=${seed.pageId}&component=smoke-visual`;
  const loaded = page.waitForResponse(response => response.url().endsWith(`/admin/page/${seed.pageId}`) && response.request().method() === 'GET');
  await page.goto(deepLink);
  expect((await loaded).ok()).toBeTruthy();
  await expect(page.getByText('Edit placed visual section', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Save copy to library', exact: true })).toBeEnabled();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Save copy to library', exact: true })).toBeEnabled();
  await expect(page).toHaveURL(new RegExp(`/pages/visual-builder\\?page=${seed.pageId}&component=smoke-visual$`));
});
