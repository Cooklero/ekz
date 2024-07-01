import React from 'react';
import Navbar2 from '../components/navbar2/navbar2';
import Sidebar from '../components/sidebar/sidebar';
import Charts from '../components/charts/charts';
const PerAccMain = () =>{
    return(
        <>
        <Navbar2/>
       
            
                <div className='rowcontainer'>
                  <Sidebar/> 
                  <Charts/>  
                </div>
                
       
       
        
        </>
    )
}

export default PerAccMain