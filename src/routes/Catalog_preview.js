import React from 'react';
import Navbar2 from '../components/navbar2/navbar2';
import Sidebar from '../components/sidebar/sidebar';
import CatalContent from '../components/catalog(preview)/catalouger';
const CataloguerPage_prev = () =>{
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

export default CataloguerPage_prev