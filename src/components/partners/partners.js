import React,{useEffect} from 'react'
import './partners.css'
import 'aos/dist/aos.css'
import Aos from 'aos'
const Partners =() => {
  useEffect(()=>{
    Aos.init({duration:1700})
  })
  return (
    <div className='Partners'>
      <div className='container'>
        <div className='content' >
            <div className='Title' data-aos="fade-down" data-aos-once="true">
                <h1>Сотрудничество</h1>
            </div>
            
            <div className='part-boxes' data-aos="fade-down" data-aos-once="true">
                <div className='part-box img1'>

                
                </div>
               
            </div>
        </div>
      </div>
    </div>
  );
}

export default Partners;