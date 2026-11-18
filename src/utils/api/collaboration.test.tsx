// @vitest-environment jsdom
import {renderHook,waitFor} from '@testing-library/react';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';
import type {PropsWithChildren} from 'react';
import {expect,it,vi} from 'vitest';
const state=vi.hoisted(()=>({get:vi.fn()}));
vi.mock('./axiosClient',()=>({axiosClient:{get:state.get}}));
import {useCollaborationCapabilities} from './collaboration';
it('rejects capabilities from another project or tenant',async()=>{
 state.get.mockResolvedValue({data:{data:{scope:'project',tenantId:'other-t',projectId:'other-p',membersEnabled:true,canManageMembers:true}}});
 const client=new QueryClient();const wrapper=({children}:PropsWithChildren)=><QueryClientProvider client={client}>{children}</QueryClientProvider>;
 const {result}=renderHook(()=>useCollaborationCapabilities({id:'u',email:'u@example.test',tenantId:'t',projectId:'p',tenantSlug:'tenant',projectSlug:'project',roleScope:'project',roles:['project_admin']} as any),{wrapper});
 await waitFor(()=>expect(result.current.isError).toBe(true));expect(result.current.data).toBeUndefined();
});
