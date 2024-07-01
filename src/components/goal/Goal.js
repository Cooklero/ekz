import React,{useEffect} from 'react'
import './Goal.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import {useNavigate} from 'react-router-dom'
import GoalImage from '../../images/Goal_img.png'
const Goal =() => {
  
  const NavigateTo = useNavigate();
  const NavToAbout = () =>{
    NavigateTo('/aboutUs');
  }
      useEffect(()=>{
          Aos.init({duration:2000})
        })
     
  return (
   
    <div className='Goal'>
      <div className='container'>
        <div className='content' data-aos-delay="0" data-aos="fade-right" data-aos-once="true" >
            <h1>ЦЕЛЬ ЭКЗ</h1>
            <p>Сайт создан для того, чтобы облегчть работу преподователям и студентам.
            Она позволят создавать темы и практичские работы вместе с заданиями   .</p>
            <div><button type='submit' className='btn' onClick={NavToAbout}>Подробнее</button></div>
            
        </div>
        <div className='container' id='img' data-aos-delay="0" data-aos="fade-left" data-aos-once="true">
    
            <img  src={GoalImage} alt='alt'/>
          
        </div>
      </div>
    </div>
  );
}

export default Goal;
