import React,{useEffect} from 'react'
import './StudentInfo.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import InfoStudImage1 from '../../images/StudentImg1.svg'
import InfoStudImage2 from '../../images/StudentImg2.svg'
const StudentInfo =() => {
  

      useEffect(()=>{
          Aos.init({duration:2000})
        })
     
  return (
   
    <div className='StudentInfo'>
      <div className='container'>

        <div className='content' data-aos-delay="0" data-aos="fade-right" data-aos-once="true" >    
            <p>Поддержка преподователей в изучении и применении практических знаний, использование разнообразных методов обучения и проверки знаний. Библиотека призвана для того, чтобы облегчть работу преподователям и студентам.
            Она позволят создавать темы и практичские работы вместе с заданиями.Библиотека призвана для того, чтобы облегчть работу преподователям и студентам.
            Она позволят создавать темы и практичские работы вместе с заданиями.</p>
        </div>

        <div className='container' data-aos-delay="0" data-aos="fade-left" data-aos-once="true">
            <img  src={InfoStudImage1} alt='alt'/>
        </div>
        
      </div>
      <div className='container'>
        
        <div className='container' data-aos-delay="0" data-aos="fade-right" data-aos-once="true">
            <img  src={InfoStudImage2} alt='alt'/>       
        </div>
        <div className='content' data-aos-delay="0" data-aos="fade-left" data-aos-once="true" >
            <p>Поддержка преподователей в изучении и применении практических знаний, использование разнообразных методов обучения и проверки знаний. Библиотека призвана для того, чтобы облегчть работу преподователям и студентам.
            Она позволят создавать темы и практичские работы вместе с заданиями.Библиотека призвана для того, чтобы облегчть работу преподователям и студентам.
            Она позволят создавать темы и практичские работы вместе с заданиями.</p>
        </div>

      </div>
    </div>
  );
}

export default StudentInfo;
