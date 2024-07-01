import React from 'react';
import Navbar2 from '../components/navbar_admin/navbar_admin';
import Sidebar from '../components/sidebar_admin/sidebar_admin';
import UsersTable from '../components/admin(main)/AdminMain';
const Admin = () =>{
    return(
        <>
        <Navbar2/>
       
            
                <div className='rowcontainer'>
                  <Sidebar/> 
                  <UsersTable/>  
                </div>
                
       
       
        
        </>
    )
}

export default Admin