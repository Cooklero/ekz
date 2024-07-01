import React,{useState} from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import {SiDarty} from 'react-icons/si'
import {FaBars, FaTimes} from 'react-icons/fa'

const Navbar =() => {
  const [nav,setNav] = useState(false)
  const handleNav = () => setNav(!nav)
  return (
    <div className='navbar'>
      <div className='contain'>
        <div className='logo'>
            <div className='logo-img'></div>
            <h5>ЭКЗамен</h5>
        </div>
    
            <ul className={nav ? 'nav-menu active':'nav-menu'}>
                <li><Link className='links' style={{ textDecoration: 'none' }} to='/'>Главная</Link></li>
                <li><Link className='links' style={{ textDecoration: 'none' }} to='/teacherinfo'>Преподователям</Link></li>
                <li><Link className='links' style={{ textDecoration: 'none' }} to='/studentinfo'>Студентам</Link></li>
                <li><Link className='links' style={{ textDecoration: 'none' }} to='/login'>Войти</Link></li>
            </ul>
        <div className='hamburger' onClick={handleNav}>
          {!nav ? (<FaBars className='icon'/>): (<FaTimes className='icon'/>)}
          
         </div>
      </div>
    </div>
  );
}

export default Navbar;