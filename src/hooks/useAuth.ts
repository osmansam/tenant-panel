import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/User.context';
import { readStoredTenant, readStoredUser } from '../utils/persistedContext';
import { MANAGEMENT_ACCESS_CHANGED, ManagementContextChangedError, managementWorkspaceKey, refreshManagementContext } from '../utils/managementSession';
import type { Tenant } from '../types';
import { switchManagementTenant } from '../utils/api/auth';
const useAuth = () => {
  const client = useQueryClient();
  const {
    user,
    setUser,
    verifiedManagementIdentity
  } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const latest = useRef({ user, navigate, location });
  latest.current = { user, navigate, location };
  const localVerification = useRef<string>();
  const verification = verifiedManagementIdentity || localVerification;
  const epoch = useRef(0);
  const [revision, setRevision] = useState(0);
  const [ready, setReady] = useState(() => verification.current === [user?.id || user?._id, user?.tenantId, user?.projectId, user?.roleScope].join(':'));
  const [error, setError] = useState(false);
  const identity = [user?.id || user?._id, user?.tenantId, user?.projectId, user?.roleScope].join(':');
  useEffect(() => {
    let cancelled = false;
    let running = false;
    setReady(verification.current === identity);
    setError(false);
    const adoptStoredWorkspace = () => {
      verification.current = undefined;
      const stored = readStoredUser();
      if (stored) setUser({ ...stored, roles: [] });
      client.clear();
      setReady(false);
      window.dispatchEvent(new Event('management-context-updated'));
    };
    const refresh = async () => {
      if (running) return;
      running = true;
      const generation = epoch.current;
      const workspace = managementWorkspaceKey();
      const stored = readStoredUser();
      const storedIdentity = [stored?.id || stored?._id, stored?.tenantId, stored?.projectId, stored?.roleScope].join(':');
      if (stored && storedIdentity !== identity) { adoptStoredWorkspace(); running = false; return; }
      try {
        const view = await refreshManagementContext(latest.current.user);
        if (!cancelled && generation === epoch.current && workspace === managementWorkspaceKey()) {
          if (JSON.stringify(view.user.roles) !== JSON.stringify(latest.current.user?.roles)) client.clear();
          verification.current = identity;
          localStorage.setItem('user', JSON.stringify(view.user));
          setUser(view.user);
          window.dispatchEvent(new Event('management-context-updated'));
          setReady(true);
          setError(false);
        }
      } catch (err) {
        if (!cancelled && generation === epoch.current) {
          if (err instanceof ManagementContextChangedError) { adoptStoredWorkspace(); setRevision(value=>value+1); return; }
          verification.current = undefined;
          setReady(false);
          setError(true);
          const status = (err as { response?: { status?: number } })?.response?.status;
          if (status !== 503) latest.current.navigate('/login', {
            replace: true,
            state: {
              from: latest.current.location
            }
          });
        }
      } finally {
        running = false;
      }
    };
    const storage = (e: StorageEvent) => {
      if (e.key === 'loggedOut') {
        epoch.current++;
        verification.current = undefined;
        setUser(undefined);
        latest.current.navigate('/login', {
          replace: true
        });
      } else if (['loggedIn','user','currentTenant','currentProject'].includes(e.key || '')) changed();
    };
    const changed = () => { epoch.current++; adoptStoredWorkspace(); setRevision(value=>value+1); };
    window.addEventListener('currentProjectChange', changed);
    window.addEventListener('focus', refresh);
    window.addEventListener(MANAGEMENT_ACCESS_CHANGED, refresh);
    window.addEventListener('storage', storage);
    void refresh();
    return () => {
      cancelled = true;
      epoch.current++;
      window.removeEventListener('currentProjectChange', changed);
      window.removeEventListener('focus', refresh);
      window.removeEventListener(MANAGEMENT_ACCESS_CHANGED, refresh);
      window.removeEventListener('storage', storage);
    };
    // Page navigation changes useNavigate in declarative routers. Read it through
    // a ref; only identity/scope changes invalidate this verification.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity, setUser, revision]);
  const switchTenant = async (tenant: Tenant) => {
    await switchManagementTenant(tenant.id);
    window.location.assign('/projects');
  };
  return {
    setUser,
    getCurrentTenant: readStoredTenant,
    switchTenant,
    isAuthenticated: ready && verification.current === identity && !!user,
    isLoading: (!ready || verification.current !== identity) && !error,
    authError: error
  };
};
export default useAuth;
