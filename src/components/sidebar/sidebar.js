import React from 'react'
import './sidebar.css'
import {Link} from 'react-router-dom'
import { BiHomeAlt, BiExit  } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { GrBook } from "react-icons/gr";
import { FiHelpCircle } from "react-icons/fi";


const Sidebar =() => {
  return (
    <div className='sidebar'>
       <ul>
            <li>
                <Link to='/PersAccMain' className='link'><BiHomeAlt className='MainHome'/><span>Главная</span> </Link>
            </li>
            <li>
                <Link to='/Profile' className='link'><AiOutlineUser className='MainHome'/><span>Профиль</span></Link>
            </li>
            <li>
                <Link to='/Catalouger' className='link'><GrBook className='MainHome' /><span>Каталогизатор</span></Link>
            </li>
            <li>
                <Link to='/help' className='link'><FiHelpCircle className='MainHome'/><span>Помощь</span></Link>
            </li>
            <li>
                <Link to='/login' className='link'><BiExit className='MainHome' /><span>Выйти</span></Link>
            </li>
        </ul>
    </div>
    
  );
}
  
export default Sidebar;