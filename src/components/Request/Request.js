import React, {useState} from 'react'
import axios from 'axios'
import './Request.css'
import {notification } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
const RequestForm =() => {
    const [values,setValues] = useState({
        name:'',
        email:'',
        org:'',
        phone:''
    })
    const handleInput = (event) =>{
        setValues(prev =>({ ...prev, [event.target.name]: [event.target.value]}) )
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        const formData2 = new FormData();
        formData2.append('name', `${document.getElementById('name').value}`);
        formData2.append('email', `${document.getElementById('email').value}`);
        formData2.append('phone', `${document.getElementById('phone').value}`);
        formData2.append('org', `${document.getElementById('org').value}`);
        fetch(('/php/RegistryApplication.php'), {method: 'POST', body: formData2}).then(response => response.text())
        .then(data => {
          const userData = data.split(';').map(item => item.trim());
          if(userData[0] == "Succes"){ 
            openNotification();
          }else if(userData[0] == "Faile"){
            openNotification2();
          }
        })
    }
    
   //Уведомления об ошибке при авторизации
   
   const openNotification2 = () => {
     api.open({
      message: `Невозможно подать заявку`,
      description:
        'Данные, указанные в вашей заявке(ФИО,почта,телефон), уже имеются в нашей системе',
      icon: <CloseCircleFilled   style={{ color: 'red' }} />,
    });
   };
    //Уведомления об отправке заявки
    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
      api.open({
        message: 'Статус заявки',
        description:
          'Заявка отправлена на рассмотрение.',
        duration: 5,
      });
    };
  return (
    <div className='Request'>
    {contextHolder}
    <div className='container'>
        <div className='content' data-aos="fade-down" data-aos-once="true">
            <div className='Title' >
                <h1>Оставить заявку на регистрацию</h1>
            </div>
            <div className='Form_Text'>
                
                <form action="" onSubmit={handleSubmit} className='Form'>
                    <h2>Заявка</h2>
                    <p>В случаи одобрения или отказа заявки вам придёт письмо на почту</p>
                    <div className='input_label'>
                        
                        
                        <div className='input-box'><input onChange={handleInput} id='name' required placeholder='Ваше ФИО' type='text' name="name" ></input></div>
                    </div>
                   
                    <div className='input_label'>
                        
                        <div className='input-box'><input onChange={handleInput} id='phone' name="phone" required placeholder='Телефон'></input></div>
                    </div>
                    <div className='input_label'>
                        
                        <div className='input-box'><input onChange={handleInput} id='email' name="email" required placeholder='Почта'></input></div>
                    </div>
                    <div className='input_label'>
                        
                        <div className='input-box'><input onChange={handleInput} id='org' name="org" required placeholder='Образовательная организация'></input></div>
                    </div>
                    <div className='SendBut'>
                        <button className='Send' type='submit'>Отправить</button>
                    </div>
                    
                </form>
                
            </div>
        </div>
    </div>
    </div>
  );
}

export default RequestForm;