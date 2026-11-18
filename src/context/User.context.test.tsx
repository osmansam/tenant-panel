// @vitest-environment jsdom
import {render,screen,fireEvent} from '@testing-library/react';
import {beforeEach,expect,it} from 'vitest';
import {UserContextProvider,useUserContext} from './User.context';
beforeEach(()=>localStorage.clear());
it('keeps cached identity but withholds cached roles until live verification',()=>{
 localStorage.setItem('user',JSON.stringify({id:'u',email:'u@example.test',tenantId:'t',roleScope:'tenant',roles:['tenant_owner']}));
 function Probe(){const {user,setUser}=useUserContext();return <><span data-testid="roles">{user?.roles?.join(',')}</span><span>{user?.email}</span><button onClick={()=>setUser({...user!,roles:['tenant_member']})}>Live roles</button></>}
 render(<UserContextProvider><Probe/></UserContextProvider>);expect(screen.getByText('u@example.test')).toBeInTheDocument();expect(screen.getByTestId('roles')).toBeEmptyDOMElement();fireEvent.click(screen.getByRole('button',{name:'Live roles'}));expect(screen.getByTestId('roles')).toHaveTextContent('tenant_member');
});
