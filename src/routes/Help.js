import React from 'react';
import Navbar2 from '../components/navbar2/navbar2';
import Sidebar from '../components/sidebar/sidebar';
import Help from '../components/help/Help';
const Profile = () =>{
    return(
        <>
        <Navbar2/>
       
            
                <div className='rowcontainer'>
                  <Sidebar/> 
                  <Help/>  
                </div>
                
       
       
        
        </>
    )
}

export default Profile