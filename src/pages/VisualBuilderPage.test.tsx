// @vitest-environment jsdom
import {render,screen} from '@testing-library/react';
import {expect,it,vi} from 'vitest';
const state=vi.hoisted(()=>({project:{tenantSlug:'tenant',slug:'project'},roles:['project_editor']}));
vi.mock('../hooks/useCurrentProject',()=>({useCurrentProject:()=>({currentProject:state.project})}));
vi.mock('../context/User.context',()=>({useUserContext:()=>({user:{roles:state.roles}})}));
vi.mock('../visualBuilder/VisualBuilderPage',()=>({default:()=> <div>Writable workspace</div>}));
import VisualBuilderPage from './VisualBuilderPage';
it('unmounts the write workspace on project change or role loss',async()=>{state.roles=['project_editor'];const {rerender}=render(<VisualBuilderPage/>);await screen.findByText('Writable workspace');state.project={tenantSlug:'tenant',slug:'other'};rerender(<VisualBuilderPage/>);expect(screen.queryByText('Writable workspace')).not.toBeInTheDocument();expect(screen.getByRole('alert')).toBeInTheDocument()});
it('blocks Viewer builder entry',()=>{state.roles=['project_viewer'];render(<VisualBuilderPage/>);expect(screen.queryByText('Writable workspace')).not.toBeInTheDocument();expect(screen.getByRole('alert')).toBeInTheDocument()});
