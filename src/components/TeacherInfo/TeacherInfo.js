import React,{useEffect} from 'react'
import './TeacherInfo.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import InfoImage1 from '../../images/TeacherImg1.svg'
import InfoImage2 from '../../images/TeacherImg2.svg'
const TeacherInfo =() => {
  

      useEffect(()=>{
          Aos.init({duration:2000})
        })
     
  return (
   
    <div className='TeacherInfo'>
      <div className='container'>
        <div className='container' data-aos-delay="0" data-aos="fade-right" data-aos-once="true">
            <img  src={InfoImage1} alt='alt'/>
       </div>
        <div className='content' data-aos-delay="0" data-aos="fade-left" data-aos-once="true" >    
            <p>Поддержка преподователей в изучении и применении практических знаний, использование разнообразных методов обучения и проверки знаний. Библиотека призвана для того, чтобы облегчть работу преподователям и студентам.
            Она позволят создавать темы и практичские работы вместе с заданиями.Библиотека призвана для того, чтобы облегчть работу преподователям и студентам.
            Она позволят создавать темы и практичские работы вместе с заданиями.</p>
        </div>
      </div>
      <div className='container'>
        <div className='content' data-aos-delay="0" data-aos="fade-right" data-aos-once="true" >
            <p>Поддержка преподователей в изучении и применении практических знаний, использование разнообразных методов обучения и проверки знаний. Библиотека призвана для того, чтобы облегчть работу преподователям и студентам.
            Она позволят создавать темы и практичские работы вместе с заданиями.Библиотека призвана для того, чтобы облегчть работу преподователям и студентам.
            Она позволят создавать темы и практичские работы вместе с заданиями.</p>
        </div>
        <div className='container' data-aos-delay="0" data-aos="fade-left" data-aos-once="true">
            <img  src={InfoImage2} alt='alt'/>       
        </div>
        

      </div>
    </div>
  );
}

export default TeacherInfo;
