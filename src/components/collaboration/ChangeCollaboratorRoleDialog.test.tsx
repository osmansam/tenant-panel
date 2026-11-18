// @vitest-environment jsdom
import {fireEvent,render,screen} from '@testing-library/react';
import {expect,it,vi} from 'vitest';
import {ChangeCollaboratorRoleDialog} from './ChangeCollaboratorRoleDialog';
vi.mock('react-i18next',()=>({useTranslation:()=>({t:(s:string)=>s})}));
it('requires confirmation of the whole legacy role set before replacement',()=>{
 const save=vi.fn();render(<ChangeCollaboratorRoleDialog member={{userId:'u',email:'a@example.test',roles:['project_support','project_editor'],status:'disabled',version:3} as any} onClose={()=>{}} onSave={save} busy={false}/>);
 expect(screen.getByRole('button',{name:'Save role'})).toBeDisabled();fireEvent.click(screen.getByLabelText(/Replace the complete role set/));
 expect(screen.getByRole('button',{name:'Save role'})).toBeDisabled();fireEvent.click(screen.getByLabelText(/Reactivate project membership/));fireEvent.click(screen.getByRole('button',{name:'Save role'}));
 expect(save).toHaveBeenCalledWith(expect.objectContaining({expectedVersion:3,expectedRoles:['project_support','project_editor'],convertLegacyRoleSet:true,activateMembership:true}));
});
