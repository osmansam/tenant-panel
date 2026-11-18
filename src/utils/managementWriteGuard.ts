import { hasManagementPermission, type ManagementPermission } from './managementPermissions';
import { readStoredUser, readStoredProject, readStoredTenant } from './persistedContext';
export function assertScopedManagementWrite(scope: {
  tenant: string;
  project: string;
}, permission: ManagementPermission) {
  const current = readStoredUser();
  const selectedProject = readStoredProject(), selectedTenant = readStoredTenant();
  if ((selectedProject && (selectedProject.id !== current?.projectId || selectedProject.slug !== scope.project)) || (selectedTenant && (selectedTenant.id !== current?.tenantId || selectedTenant.slug !== scope.tenant))) throw new Error('Selected workspace changed. Reopen the project before editing.');
  if (!current || current.roleScope !== 'project' || !current.projectId || current.tenantSlug !== scope.tenant || current.projectSlug !== scope.project || !hasManagementPermission(current.roles, permission)) throw new Error('Project access changed. Reopen the project before editing.');
}
export function validateManagementWriteURL(url: string | undefined, method: string | undefined) {
  if (!url || ['get', 'head', 'options'].includes((method || 'get').toLowerCase())) return;
  const path = new URL(url, 'http://tenant-panel.local').pathname.replace(/^\/api\/v1(?=\/)/, '');
  const parts = path.split('/').filter(Boolean);
  if (parts.length < 3 || parts[0] === 'tenant') return;
  let permission: ManagementPermission | undefined;
  if (parts[2] === 'container') permission = parts.includes('reset-redis') ? 'project.cache.reset' : method?.toLowerCase() === 'delete' && parts.length === 4 ? 'project.schema.delete' : 'project.schema.write';
  if (parts[2] === 'admin' && ['page', 'visual-components'].includes(parts[3])) permission = method?.toLowerCase() === 'delete' ? 'project.page.delete' : 'project.page.write';
  if (permission) {
    const scope = {
      tenant: decodeURIComponent(parts[0]),
      project: decodeURIComponent(parts[1])
    };
    assertScopedManagementWrite(scope, permission);
    return {
      scope,
      permission
    };
  }
}
export function watchScopedManagementWrite(scope: {
  tenant: string;
  project: string;
}, permission: ManagementPermission, upstream?: {
  aborted: boolean;
  addEventListener?: (name: string, callback: () => void) => void;
  removeEventListener?: (name: string, callback: () => void) => void;
}) {
  assertScopedManagementWrite(scope, permission);
  const initial = readStoredUser();
  const controller = new AbortController();
  const abort = () => controller.abort();
  const changed = () => {
    try {
      assertScopedManagementWrite(scope, permission);
      const current = readStoredUser();
      if (current?.id !== initial?.id || current?.projectId !== initial?.projectId || current?.tenantId !== initial?.tenantId) abort();
    } catch {
      abort();
    }
  };
  const events = ['storage', 'currentProjectChange', 'management-context-updated'];
  if (typeof window !== 'undefined') events.forEach(event => window.addEventListener(event, changed));
  if (upstream?.aborted) abort();else upstream?.addEventListener?.('abort', abort);
  return {
    signal: controller.signal,
    dispose: () => {
      if (typeof window !== 'undefined') events.forEach(event => window.removeEventListener(event, changed));
      upstream?.removeEventListener?.('abort', abort);
    }
  };
}
