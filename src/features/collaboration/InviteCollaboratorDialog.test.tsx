// @vitest-environment jsdom
import {fireEvent,render,screen} from '@testing-library/react';
import {expect,it,vi} from 'vitest';
import {InviteCollaboratorDialog} from './InviteCollaboratorDialog';
vi.mock('react-i18next',()=>({useTranslation:()=>({t:(s:string)=>s})}));
it('keeps the same idempotency key for retrying the same invitation intent',()=>{const save=vi.fn();render(<InviteCollaboratorDialog onSave={save} onClose={()=>{}} busy={false} error="Try again"/>);fireEvent.change(screen.getByLabelText('Email'),{target:{value:'person@example.test'}});fireEvent.click(screen.getByRole('button',{name:'Queue invitation'}));fireEvent.click(screen.getByRole('button',{name:'Queue invitation'}));expect(save).toHaveBeenCalledTimes(2);expect(save.mock.calls[0][0].key).toBe(save.mock.calls[1][0].key);expect(screen.getByLabelText('Email')).toHaveValue('person@example.test')});
