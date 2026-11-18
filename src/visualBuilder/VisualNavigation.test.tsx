// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, expect, it, vi } from 'vitest';
import LibraryVisualBuilderPage from './LibraryVisualBuilderPage';
import PlacedVisualBuilderPage from './PlacedVisualBuilderPage';
vi.mock('./VisualDataBuilder', () => ({ default: () => <h2>Unsaved visual design</h2> }));
afterEach(() => vi.restoreAllMocks());

vi.mock('./VisualDesignGallery', () => ({ default: () => null }));
vi.mock('./libraryRepository', () => ({ createLibraryRepository: () => ({ list: () => new Promise(() => {}) }) }));
vi.mock('./pageRepository', () => ({ createPageRepository: () => ({ load: () => new Promise(() => {}) }) }));
const scope = { tenant: 'tenant', project: 'project' };

it('navigates from a placed section to Visual components and back to Pages without a document reload', async () => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(<QueryClientProvider client={client}><MemoryRouter initialEntries={['/placed']}><Routes>
    <Route path='/placed' element={<PlacedVisualBuilderPage scope={scope} pageId='page' componentId='component' />} />
    <Route path='/pages/visual-builder' element={<LibraryVisualBuilderPage scope={scope} />} />
    <Route path='/pages' element={<h1>Pages workspace</h1>} />
  </Routes></MemoryRouter></QueryClientProvider>);
  await userEvent.click(screen.getByRole('link', { name: 'Visual components' }));
  expect(await screen.findByRole('heading', { name: 'Your visual designs' })).toBeInTheDocument();
  await userEvent.click(screen.getByRole('link', { name: 'Back to Pages' }));
  expect(await screen.findByRole('heading', { name: 'Pages workspace' })).toBeInTheDocument();
});

it('keeps an unsaved library design when navigation is cancelled and leaves after confirmation', async () => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false);
  render(<QueryClientProvider client={client}><MemoryRouter initialEntries={['/pages/visual-builder']}><Routes>
    <Route path='/pages/visual-builder' element={<LibraryVisualBuilderPage scope={scope} />} />
    <Route path='/pages' element={<h1>Pages workspace</h1>} />
  </Routes></MemoryRouter></QueryClientProvider>);
  await userEvent.click(screen.getByRole('button', { name: 'New design' }));
  await screen.findByRole('heading', { name: 'Unsaved visual design' });
  await userEvent.click(screen.getByRole('link', { name: 'Back to Pages' }));
  expect(confirm).toHaveBeenCalledOnce();
  expect(screen.getByRole('heading', { name: 'Unsaved visual design' })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Pages workspace' })).not.toBeInTheDocument();
  confirm.mockReturnValue(true);
  await userEvent.click(screen.getByRole('link', { name: 'Back to Pages' }));
  expect(await screen.findByRole('heading', { name: 'Pages workspace' })).toBeInTheDocument();
});
