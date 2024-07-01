import React,{useState} from 'react'
import './navbar_admin.css'
import {Link} from 'react-router-dom'
import {SiDarty} from 'react-icons/si'
import {Avatar,Select} from 'antd'
import {FaBars, FaTimes} from 'react-icons/fa'
import ProfImage from '../../images/user (1) 6.png'

const Navbar2 =() => {

  return (
    <div className='navbar2'>
      <div className='contain'>
        <div className='logo'>
            <div className='logo-img'></div>
            <div className='Titles'>
            <h5>ЭКЗамен</h5>
            <h6>Электронная картотека знаний</h6>
            </div>
        </div>
        <div className='Cont'>
      
          </div>
    <div className='logo-box'>
      <h3>Администратор</h3>
      <img width={32} src={ProfImage}></img>
    </div>
      
      </div>
    </div>
  );
}

export default Navbar2;