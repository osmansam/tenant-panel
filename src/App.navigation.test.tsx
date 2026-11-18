// @vitest-environment jsdom
import { transferableAbortController } from 'node:util';
import { StrictMode } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider, Link } from 'react-router-dom';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import App from './App';
import { VisualBuilderPageLink } from './visualBuilder/pageLinks';

const state = vi.hoisted(() => ({ get: vi.fn() }));
vi.mock('./utils/api/axiosClient', () => ({ axiosClient: { get: state.get } }));
vi.mock('./hooks/useWebSocket', () => ({ useWebSocket: () => {} }));
vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (value: string) => value }) }));
vi.mock('./pages/CollectionsPage', () => ({ default: () => <><h1>Collections workspace</h1><VisualBuilderPageLink page={{ id: 'page', name: 'Inventory' }} canEdit /></> }));
vi.mock('./visualBuilder/VisualBuilderPage', () => ({ default: () => <><h1>Visual component library</h1><Link to='/collections'>Back to collections</Link></> }));

const nativeAbort = transferableAbortController();
let router: ReturnType<typeof createMemoryRouter>;
beforeEach(() => {
  vi.stubGlobal('AbortController', nativeAbort.constructor);
  vi.stubGlobal('AbortSignal', nativeAbort.signal.constructor);
  vi.clearAllMocks();
  localStorage.clear();
  localStorage.setItem('user', JSON.stringify({ id: 'u', email: 'u@example.test', tenantId: 't', tenantSlug: 'tenant', projectId: 'p', projectSlug: 'project', roleScope: 'project', roles: ['project_admin'] }));
  localStorage.setItem('currentTenant', JSON.stringify({ id: 't', name: 'Tenant', slug: 'tenant' }));
  localStorage.setItem('currentProject', JSON.stringify({ id: 'p', tenantSlug: 'tenant', name: 'Project', slug: 'project' }));
  state.get.mockImplementation((path: string) => Promise.resolve({ data: path.endsWith('/session') ? { authenticated: true, user: { id: 'u' }, tenantId: 't', projectId: 'p', roles: ['project_admin'] } : { data: { user: { id: 'u', email: 'u@example.test' } } } }));
});
afterEach(() => { router?.dispose(); vi.unstubAllGlobals(); });

it('opens and leaves the full-screen visual components layout without blocking verified workspace access', async () => {
  router = createMemoryRouter([{ path: '*', element: <App /> }], { initialEntries: ['/collections'] });
  render(<StrictMode><RouterProvider router={router} /></StrictMode>);
  await screen.findByRole('heading', { name: 'Collections workspace' });
  const visual = await screen.findByRole('button', { name: 'Visual components' });
  state.get.mockImplementation(() => new Promise(() => {}));
  await userEvent.click(visual);
  expect(await screen.findByRole('heading', { name: 'Visual component library' })).toBeInTheDocument();
  expect(screen.queryByText('Checking workspace access…')).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole('link', { name: 'Back to collections' }));
  expect(await screen.findByRole('heading', { name: 'Collections workspace' })).toBeInTheDocument();
  expect(screen.queryByText('Checking workspace access…')).not.toBeInTheDocument();
});

it('opens the visual builder from a page link without reloading the verified workspace', async () => {
  router = createMemoryRouter([{ path: '*', element: <App /> }], { initialEntries: ['/collections'] });
  render(<StrictMode><RouterProvider router={router} /></StrictMode>);
  await screen.findByRole('heading', { name: 'Collections workspace' });
  state.get.mockImplementation(() => new Promise(() => {}));
  await userEvent.click(screen.getByRole('link', { name: 'Open visual builder: Inventory' }));
  expect(await screen.findByRole('heading', { name: 'Visual component library' })).toBeInTheDocument();
  expect(router.state.location.pathname).toBe('/pages/visual-builder');
  expect(screen.queryByText('Checking workspace access…')).not.toBeInTheDocument();
});
