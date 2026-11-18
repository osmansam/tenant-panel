// @vitest-environment jsdom
import {fireEvent,render,screen} from '@testing-library/react';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';
import {MemoryRouter,Routes,Route} from 'react-router-dom';
import {expect,it,vi} from 'vitest';
const state=vi.hoisted(()=>({roles:['project_viewer'],scope:'project',get:vi.fn(),remove:vi.fn()}));
vi.mock('../context/User.context',()=>({useUserContext:()=>({user:{id:'u',tenantId:'t',projectId:'p',tenantSlug:'tenant',projectSlug:'project',roleScope:state.scope,roles:state.roles}})}));
vi.mock('../utils/api/axiosClient',()=>({axiosClient:{get:state.get,delete:state.remove}}));
vi.mock('react-i18next',()=>({useTranslation:()=>({t:(s:string)=>s})}));
import ProjectMembersPage from './ProjectMembersPage';
it.each(['project_viewer','project_editor','project_developer'])('does not fetch directory for %s',role=>{state.roles=[role];render(<QueryClientProvider client={new QueryClient()}><MemoryRouter><ProjectMembersPage/></MemoryRouter></QueryClientProvider>);expect(screen.getByRole('alert')).toHaveTextContent(/administrator/i);expect(state.get).not.toHaveBeenCalled()});
it('does not fetch members when the feature is disabled',async()=>{state.get.mockClear();state.roles=['project_admin'];state.get.mockResolvedValue({data:{data:{scope:"project",tenantId:"t",projectId:"p",membersEnabled:false,canManageMembers:true}}});render(<QueryClientProvider client={new QueryClient({defaultOptions:{queries:{retry:false}}})}><MemoryRouter><ProjectMembersPage/></MemoryRouter></QueryClientProvider>);expect(await screen.findByRole('alert')).toHaveTextContent('not enabled');expect(state.get).toHaveBeenCalledTimes(1);expect(state.get.mock.calls[0][0]).toContain('collaboration-capabilities')});

it('explains last-administrator protection without discarding the confirmation',async()=>{
 state.roles=['project_admin'];state.get.mockReset();state.get.mockImplementation((path:string)=>Promise.resolve({data:{data:path.includes('capabilities')?{scope:"project",tenantId:"t",projectId:"p",membersEnabled:true,canManageMembers:true,canInvite:false,canRecover:false}: {items:[{id:'m',userId:'u',email:'admin@example.test',roles:['project_admin'],status:'active',version:2}],recoveryRequired:false}}}));
 state.remove.mockRejectedValue({response:{data:{message:'Appoint another project administrator before removing this access.'}}});
 render(<QueryClientProvider client={new QueryClient({defaultOptions:{queries:{retry:false}}})}><MemoryRouter><ProjectMembersPage/></MemoryRouter></QueryClientProvider>);
 fireEvent.click(await screen.findByRole('button',{name:'Remove access'}));fireEvent.click(screen.getByRole('button',{name:'Confirm'}));
 expect((await screen.findAllByRole('alert')).some(e=>e.textContent?.includes('Appoint another'))).toBe(true);expect(screen.getByRole('dialog')).toBeInTheDocument();expect(state.remove).toHaveBeenCalledWith('/tenant/project/tenant-auth/members/u',{data:{expectedVersion:2,reason:undefined}});
});

it('offers tenant-authorized invitations for an adminless project',async()=>{state.scope='tenant';state.roles=['tenant_owner'];state.get.mockImplementation((path:string)=>Promise.resolve({data:{data:path.includes('capabilities')?{scope:'tenant',tenantId:'t',projectId:'',membersEnabled:true,canManageMembers:true,canInvite:true,canRecover:true}:{items:[],recoveryRequired:true}}}));render(<QueryClientProvider client={new QueryClient({defaultOptions:{queries:{retry:false}}})}><MemoryRouter initialEntries={['/projects/p/members']}><Routes><Route path='/projects/:projectId/members' element={<ProjectMembersPage/>}/></Routes></MemoryRouter></QueryClientProvider>);await screen.findByRole('heading',{name:'Administrator recovery required'});expect(screen.getByRole('button',{name:'Invite collaborator'})).toBeInTheDocument();state.scope='project'});
