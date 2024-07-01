import React,{useEffect} from 'react'
import {useState} from 'react'
import {message ,notification} from 'antd'; 
import { CloseCircleFilled } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom'
import './RecovPass.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'
import RegistrImage from '../../images/registratsiyaImg.png'
import MainPicha from '../../images/regist.png'
import Logs from '../../images/logs.png'
import IMask from 'imask'
const RecovPass =() => {
  // const element = document.getElementById('phone');
  // const maskpOtions = {mask:'+{7}(000)000-00-00'}
  // const mask = IMask(element, maskpOtions)
  
const NavigateTo = useNavigate();
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
       message: `Ошибка`,
       description:
         'Неправильный код',
       icon: <CloseCircleFilled   style={{ color: 'red' }} />,
     });
    };
    const openNotification2 = () => {
      api.open({
       message: `Ошибка`,
       description:
         'Аккаунта с такой почтой не существует',
       icon: <CloseCircleFilled   style={{ color: 'red' }} />,
     });
    };

//Creating state variables
const [values,setValues] = useState({
  login:'',
    email:'',
  password:'',
  phone:''

})
const switchContainer = () =>{
   let x = document.getElementById("emailPage")
   let y = document.getElementById("changePassPage")
   x.style.left="-450px"
   y.style.left="0px"
  
 
  }
const handleInput = (event) =>{
  setValues(prev =>({ ...prev, [event.target.name]: [event.target.value]}) )
}
const sendCode = (event) =>{
  event.preventDefault(); 
  const formData2 = new FormData();
  formData2.append('email', `${document.getElementById('email').value}`);
  fetch(('/php/sendCode.php'), {method: 'POST', body: formData2}).then(response => response.text())
        .then(data => {
          const userData = data.split(';').map(item => item.trim());
          if(userData[0] == "Succes"){ 
            switchContainer()
          }else if(userData[0] == "Faile"){
            openNotification2();
          }
        })
  
}
const changePass = (event) =>{
  event.preventDefault(); 
  const formData2 = new FormData();
  formData2.append('code', `${document.getElementById('code').value}`);
  formData2.append('pass', `${document.getElementById('newPass').value}`);
  fetch(('/php/changePass.php'), {method: 'POST', body: formData2}).then(response => response.text())
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
   
    <div className='Recovering'>
    <div className='container1' >
    {contextHolder2}
        <div className="rightcontent" >
            <div className="content2" data-aos-delay="0" data-aos="fade-right" data-aos-once="true">
                    <div className="righttitle">
                        <h1>На указанный вами электронный адрес будет отправлено письмо с кодом,который вам нужно будет ввести для изменения пароля</h1>
                        
                    </div>
            </div>
        </div>
        <div className="leftform">
              <div className="content1" data-aos-delay="0" data-aos="fade-left" data-aos-once="true">
                  <div className="lefttitle">
                      <img></img>
                     
                  </div>
                 
                  <div className='loginblock'>
                     
                     <h1>Восстановление пароля</h1>
                     <div className='formContainer'>
                        <form className='form' id='emailPage'  action="" onSubmit={sendCode} >
                            <div className='inputbox'>
                                <h3>Почта</h3>
                                <input  id='email' autoComplete='on' className='input' type='text' placeholder="Введите почту"/>
                            </div>
                            <button  className='btn'>Восстановление пароля</button>
                        </form >
                        <form className='form'  id='changePassPage' onSubmit={changePass}  action="">
                            <div className='inputbox'>
                                <h3>Код</h3>
                                <input  id='code' autoComplete='on' className='input' type='text' placeholder="Введите код"/>
                                <input  id='newPass' autoComplete='on' className='input' type='text' placeholder="Введите новый пароль"/>
                                
                            </div>
                            <button className='btn' >Восстановление пароля</button>
                        </form>
                      </div>
                  </div>
              </div>
        </div>
      </div>
  </div>
    
  );
}

export default RecovPass;
