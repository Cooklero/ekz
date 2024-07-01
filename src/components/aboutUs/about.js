import React,{useEffect} from 'react'
import './about.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import InfoImage1 from '../../images/free-icon-user-848043 1.png'
import InfoImage2 from '../../images/free-icon-dasboard-11994829 1.png'
import InfoImage3 from '../../images/free-icon-laptop-4687691 1.png'
import InfoImage4 from '../../images/free-icon-folder-4725439 1.png'
const About =() => {
  

      useEffect(()=>{
          Aos.init({duration:2000})
        })
     
  return (
   
<div className='AboutUs'>
    <div className='contain'>
        <div className='info-container' >
           <h2 data-aos-delay="0" data-aos="fade-right" data-aos-once="true">О платформе</h2>      
           <p data-aos-delay="0" data-aos="fade-up" data-aos-once="true">ЭКЗамен - платформа созданная для размещения  задании. Здесь вы можете использовать с помощью Каталогизатора можете разместить практические задания, редактировать с помощью MarkDown разметки.
            После размещения заданий каталогизатор предлагает c помощью Дэшборда следить за статистикой выполнения выложенных заданий.
            </p>
        </div>

        <div className='info-container'>
            <h2 data-aos-delay="0" data-aos="fade-down" data-aos-once="true">Главные особенности</h2>
            <div className='content'  >
                <img  src={InfoImage3} alt='alt' data-aos-delay="0" data-aos="fade-right" data-aos-once="true"/>
                <div  className='info' data-aos-delay="0" data-aos="fade-left" data-aos-once="true">
                    <h3 >Сервис для пользователей</h3>
                    <p>
                    Мы постоянно улучшаем существующий функционал и добавляем новый, чтоб вам удобно было пользоваться
                    </p> 
                </div>
            </div>
            <div className='content'  >
                <img  src={InfoImage4} alt='alt' data-aos-delay="0" data-aos="fade-right" data-aos-once="true"/>
                <div className='info' data-aos="fade-left" data-aos-once="true">
                    <h3>Каталогизатор</h3>
                    <p>Размещайте практические работы с помощью редактора </p>
                </div>
            </div>
            <div className='content'>
                <img  src={InfoImage2} alt='alt' data-aos-delay="0" data-aos="fade-right" data-aos-once="true"/>
                <div  className='info' data-aos-delay="0" data-aos="fade-left" data-aos-once="true">
                    <h3>Удобная статистика</h3>
                    <p>С помощью Дэшборда отслеживаете выполненые задания </p>
                </div>
            </div>
        </div> 
        
       
      </div>
</div>
  );
}

export default About;