import React,{useEffect} from 'react'
import {useState} from 'react'
import {message ,notification} from 'antd'; 
import { CloseCircleFilled } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom'
import './Registr.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'
import RegistrImage from '../../images/registratsiyaImg.png'
import MainPicha from '../../images/regist.png'
import Logs from '../../images/logs.png'
import IMask from 'imask'
const Registr =() => {
  // const element = document.getElementById('phone');
  // const maskpOtions = {mask:'+{7}(000)000-00-00'}
  // const mask = IMask(element, maskpOtions)
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({           
      type: 'success',
      content: 'Вход успешен',
    });
  };
//Initializing the animation 
useEffect(()=>{
      Aos.init({duration:1000})
    })
    const [api, contextHolder2] = notification.useNotification();
    const openNotification = () => {
      api.open({
       message: `Невозможно зарегистрировать аккаунт`,
       description:
         'Заявка с данным логином не была одобрена',
       icon: <CloseCircleFilled   style={{ color: 'red' }} />,
     });
    };
const NavigateTo = useNavigate();
//Creating state variables
const [values,setValues] = useState({
  login:'',
    email:'',
  password:'',
  phone:''

})
const handleInput = (event) =>{
  setValues(prev =>({ ...prev, [event.target.name]: [event.target.value]}) )
}
const handleSubmit = (event) =>{
  event.preventDefault(); 
  const formData2 = new FormData();
  formData2.append('login', `${document.getElementById('login').value}`);
  formData2.append('email', `${document.getElementById('email').value}`);
  formData2.append('phone', `${document.getElementById('phone').value}`);
  formData2.append('pass', `${document.getElementById('pass').value}`);
  fetch(('/php/Registration.php'), {method: 'POST', body: formData2}).then(response => response.text())
        .then(data => {
          const userData = data.split(';').map(item => item.trim());
          if(userData[0] == "Succes"){ 
            NavigateTo('/login')
          }else if(userData[0] == "Faile"){
            openNotification();
          }
        })
  
}


  return (
   
    <div className='RegistrForm'>
    <div className='container1' >
    {contextHolder2}
        <div className="rightcontent" >
            <div className="content2" data-aos-delay="0" data-aos="fade-right" data-aos-once="true">
                    <div className="righttitle">
                        <h1>Создание аккаунта</h1>
                        <img width={500} src={RegistrImage}></img>
                    </div>
            </div>
        </div>
        <div className="leftform">
              <div className="content1" data-aos-delay="0" data-aos="fade-left" data-aos-once="true">
                  <div className="lefttitle">
                      <img></img>
                     
                  </div>
                  <div className='loginblock'>
                      <h1>Регистрация</h1>
                      <form className='form'  action="" onSubmit={handleSubmit}>
                          <div className='inputbox'>
                              <h3>Логин</h3>
                              <input required id='login' autoComplete='on' className='input' type="text" placeholder="Введите имя"/>
                          </div>
                          <div className='inputbox'>
                              <h3>Пароль</h3>
                              <input required id='pass' autoComplete='on' className='input' type='text' placeholder="Введите пароль"/>
                          </div>
                          <div className='inputbox'>
                              <h3>Почта</h3>
                              <input required id='email' autoComplete='on' className='input' type='text' placeholder="Введите почту"/>
                          </div>
                          <div className='inputbox'>
                              <h3>Телефон</h3>
                              <input required id='phone' autoComplete='on' className='input' type='text' placeholder="Введите телефон"/>
                          </div>
                          <button className='btn'>Зарегистрироваться</button>
                      </form>
                  </div>
              </div>
        </div>
      </div>
  </div>
    
  );
}

export default Registr;
