import React from 'react'
import './Footer.css'
import {Link} from 'react-router-dom'
import TgIcon from '../../images/telegram.svg'
import VkIcon from '../../images/vk.svg'
import MailIcon from '../../images/circle-envelope.svg'
import PhoneIcon from '../../images/circle-phone.svg'
const Footer =() => {
  return (
    <footer class="footer-distributed">

    <div class="footer-left">
        <h3>ЭКЗамен</h3>

        <p class="footer-links">
            <Link className='links' to='/'>Главная</Link>
            |
            <Link className='links' to='/teacherinfo'>Преподователям</Link>
            |
            <Link className='links' to='/studentinfo'>Студентам</Link>
            |
            <Link className='links' to='/aboutus'>О нас</Link>
            |
            <Link className='links' to='/login'>Войти</Link>
        </p>

        <p class="footer-company-name">Copyright © 2024 <strong>Версия 3.2.1</strong> </p>
    </div>

    <div class="footer-center">
        <div>
            <i class="fa fa-map-marker"></i>
            <p className='ColTitle'>Контакты</p>
        </div>

        <div>
            <img src={PhoneIcon}/>
            <p>+8-875-549-32-12</p>
        </div>
        <div>
            <img src={MailIcon}/>
            <p><a href="mailto:sagar00001.co@gmail.com">contact@gmail.com</a></p>
        </div>
    </div>
    <div class="footer-right">
        <p class="footer-company-about">
            <span>О нас</span>
            Библиотека призвана для того, чтобы облегчть работу преподователям и студентам. Она позволят создавать темы и практичские работы вместе с заданиями.

        </p>
        
        <div class="footer-icons">
            
            <a href="#"><img src={TgIcon}/></a>
            <a href="#"><img src={VkIcon}/></a>
            
        </div>
    </div>
</footer>
    
  );
}

export default Footer;