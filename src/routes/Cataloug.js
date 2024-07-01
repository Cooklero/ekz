import React from 'react';
import Navbar2 from '../components/navbar2/navbar2';
import Sidebar from '../components/sidebar/sidebar';
import CatalContent from '../components/catalouger/catalouger';
const CataloguerPage = () =>{
    return(
        <>
        <Navbar2/>
       
            
                <div className='rowcontainer'>
                  <Sidebar/> 
                  <CatalContent/>  
                </div>
                
       
       
        
        </>
    )
}

export default CataloguerPage