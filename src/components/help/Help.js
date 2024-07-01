import React, { useState, useEffect } from 'react'
import './Help.css'
import ProfImage from '../../images/user (1) 6.png'
import { Upload , Select} from 'antd';
import ImgCrop from 'antd-img-crop';
import { Breadcrumb, Input,Button } from 'antd';
import axios from 'axios'
const Help =() => { 
  const sendMessage = () => {
    // Logic to create a new node
    
    const formData = new FormData();
    formData.append('message', `${document.getElementById("message").value}`);
    fetch(('/php/sendMessg.php'), {method: 'POST', body: formData})
  }
  const { TextArea } = Input;
  return (
    <div className='help'>
        <div className='container'>
            
            <div  className='inputbox'>
                <h1>
                Связь с администратором
                </h1>
                <div className='rowbox'>
                    <div className='wrap'>
                                <div className='input-box'>
                                    <TextArea id='message' 
                                        allowClear
                                        showCount
                                        maxLength={500}
                                        placeholder="Сообщение..."
                                        style={{ height: 200,width:700, resize: 'none' }}/>
                                </div>
                                 <Button  type='primary' onClick={sendMessage} className='textbtn'>Отправить</Button>
                                
                    </div>
                    
                
              </div>
              
             
            </div>
        </div>
       
    </div>
    
  );
}
  
export default Help;