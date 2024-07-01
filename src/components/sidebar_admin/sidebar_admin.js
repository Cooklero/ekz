import React from 'react'
import './sidebar_admin.css'
import {Link} from 'react-router-dom'
import Homeicon from '../../images/home (2) 3.png'
import Logout from '../../images/exit (2).png'
const Sidebar =() => {
  return (
    <div className='sidebar_admin'>
        <ul>
            <li>
                <Link to='/PersAccMain' className='link'><img src={Homeicon} ></img><span>Главная</span> </Link>
            </li>
            <li>
                <Link to='/login' className='link'><img className='imgz' src={Logout} ></img><span>Выйти</span></Link>
            </li>
        </ul>
    </div>
    
  );
}
    
export default Sidebar;