import React from 'react';
import Navbar2 from '../components/navbar2/navbar2';
import Sidebar from '../components/sidebar/sidebar';
import ProfileContent from '../components/profilecontent/profilecontent';
const Profile = () =>{
    return(
        <>
        <Navbar2/>
       
            
                <div className='rowcontainer'>
                  <Sidebar/> 
                  <ProfileContent/>  
                </div>
                
       
       
        
        </>
    )
}

export default Profile