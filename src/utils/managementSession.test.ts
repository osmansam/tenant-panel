// @vitest-environment jsdom
import { QueryClient } from '@tanstack/react-query';
import { beforeEach, expect, it, vi } from 'vitest';
const state=vi.hoisted(()=>({get:vi.fn()}));
vi.mock('./api/axiosClient',()=>({axiosClient:{get:state.get}}));
import { refreshManagementContext, applyAcceptedProjectInvitation } from './managementSession';
beforeEach(()=>{localStorage.clear();vi.clearAllMocks()});
it('replaces persisted owner roles with current Member roles',async()=>{
 localStorage.setItem('user',JSON.stringify({id:'u',email:'u@example.test',tenantId:'t',roleScope:'tenant',roles:['tenant_owner']}));
 state.get.mockResolvedValueOnce({data:{authenticated:true,user:{id:'u'},tenantId:'t',roles:['tenant_member']}}).mockResolvedValueOnce({data:{data:{user:{id:'u',email:'u@example.test',name:'Current'}}}});
 const view=await refreshManagementContext();expect(view.user.roles).toEqual(['tenant_member']);expect(view.user.name).toBe('Current');
});
it('refreshes project roles from the exact project session and refuses another scope',async()=>{
 localStorage.setItem('user',JSON.stringify({id:'u',email:'u@example.test',tenantId:'t',projectId:'p',roleScope:'project',roles:['project_admin'],tenantSlug:'tenant',projectSlug:'project'}));
 state.get.mockResolvedValueOnce({data:{authenticated:true,user:{id:'u'},tenantId:'t',projectId:'other',roles:['project_admin']}});
 await expect(refreshManagementContext()).rejects.toThrow();expect(state.get).toHaveBeenCalledWith('/tenant/project/tenant-auth/session');
});
it('acceptance replaces account and both scopes together and clears old caches',()=>{
 const client=new QueryClient();client.setQueryData(['projects','old'],['secret']);const setUser=vi.fn();
 applyAcceptedProjectInvitation({user:{id:'u',email:'u@example.test'},tenant:{id:'t',name:'Tenant',slug:'tenant'},project:{id:'p',tenantId:'t',name:'Project',slug:'project',tenantSlug:'tenant'},allTenants:[],roles:['project_viewer'],tenantRoles:['tenant_member']} as any,client,setUser);
 expect(client.getQueryCache().getAll()).toHaveLength(0);expect(setUser).toHaveBeenCalledWith(expect.objectContaining({tenantId:'t',projectId:'p',roles:['project_viewer'],roleScope:'project'}));
 expect(JSON.parse(localStorage.getItem('currentTenant')!).id).toBe('t');
});
