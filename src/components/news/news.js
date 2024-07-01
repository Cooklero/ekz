import React,{useEffect}from 'react'
import './news.css'
import 'aos/dist/aos.css'
import Aos from 'aos'

const News =() => {
    useEffect(()=>{
        Aos.init({duration:1600})
      })
   
  return (
    <div className='news'>
      <div className='container'>
        <div  className='content'>
            <div className='Title' data-aos-delay="100" data-aos="fade-right" data-aos-once="true">
                <h1>Новости</h1>
            </div>
            
            <div  className='news-boxes'>
                <div className='news-box ' data-aos-delay="100" data-aos="fade-up" data-aos-once="true" >
                    <div className='news-date'>25 февраля 2024 г.</div>
                    <p className='news-text'>
                    Библиотека призвана для того, чтобы облегчть работу преподователям и студентам. Она позволят создавать темы и практичские работы вместе с заданиями.

                    </p>
                </div>
                <div className='news-box' data-aos-delay="300" data-aos="fade-up" data-aos-once="true" >
                    <div className='news-date'>25 февраля 2024 г.</div>
                    <p className='news-text'>
                    Библиотека призвана для того, чтобы облегчть работу преподователям и студентам. Она позволят создавать темы и практичские работы вместе с заданиями.
  
                    </p>
                </div>
                <div className='news-box' data-aos-delay="500" data-aos="fade-up" data-aos-once="true" >
                    <div className='news-date'>25 февраля 2024 г.</div>
                    <p className='news-text'>
                    Библиотека призвана для того, чтобы облегчть работу преподователям и студентам. Она позволят создавать темы и практичские работы вместе с заданиями.


                    
                    </p>
                </div>
                <div className='news-box' data-aos-delay="700" data-aos="fade-up" data-aos-once="true" >
                    <div className='news-date'>25 февраля 2024 г.</div>
                    <p className='news-text'>
                    Библиотека призвана для того, чтобы облегчть работу преподователям и студентам. Она позволят создавать темы и практичские работы вместе с заданиями.


                    
                    </p>
                </div>
 
    
                <div className='news-box' data-aos-delay="100" data-aos="fade-up" data-aos-once="true">
                    <div className='news-date'>25 февраля 2024 г.</div>
                    <p className='news-text'>
                    Библиотека призвана для того, чтобы облегчть работу преподователям и студентам. Она позволят создавать темы и практичские работы вместе с заданиями.


                    
                    </p>
                </div>
                <div className='news-box' data-aos-delay="300" data-aos="fade-up" data-aos-once="true" >
                    <div className='news-date'>25 февраля 2024 г.</div>
                    <p className='news-text'>
                    Библиотека призвана для того, чтобы облегчть работу преподователям и студентам. Она позволят создавать темы и практичские работы вместе с заданиями.


                    
                    </p>
                </div>
                <div className='news-box' data-aos-delay="500" data-aos="fade-up" data-aos-once="true" >
                    <div className='news-date'>25 февраля 2024 г.</div>
                    <p className='news-text'>
                    Библиотека призвана для того, чтобы облегчть работу преподователям и студентам. Она позволят создавать темы и практичские работы вместе с заданиями.


                    
                    </p>
                </div>
                <div className='news-box' data-aos-delay="700" data-aos="fade-up" data-aos-once="true" >
                    <div className='news-date'>25 февраля 2024 г.</div>
                    <p className='news-text'>
                    Библиотека призвана для того, чтобы облегчть работу преподователям и студентам. Она позволят создавать темы и практичские работы вместе с заданиями.


                    
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default News;