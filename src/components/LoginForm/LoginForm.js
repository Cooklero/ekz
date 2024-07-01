import React,{useEffect,useContext} from 'react'
import {useState} from 'react'
import {notification } from 'antd';
import {useNavigate} from 'react-router-dom'
import './LoginForm.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { CloseCircleFilled } from '@ant-design/icons';
import { AppContext } from '../context';
import loginImgage from '../../images/loginImg.png'
import { FiAlertOctagon } from 'react-icons/fi';
import Chart from 'react-apexcharts'
import {Link} from 'react-router-dom'
const LoginForm =() => {
  const { value9, setValue9 } = useContext(AppContext);
 
   //Уведомления об ошибке при авторизации
   const [api, contextHolder] = notification.useNotification();
   const openNotification = (login) => {
     api.open({
      message: `Пользователь с логином "${login}" не найден`,
      description:
        'Неправильный логин или пароль',
      icon: <CloseCircleFilled   style={{ color: 'red' }} />,
    });
   };
//Initializing the animation 
useEffect(()=>{
      Aos.init({duration:1000})
    })

const NavigateTo = useNavigate();
//Creating state variables
const [values,setValues] = useState({
  email:'',
  password:''
})
const [user,setuser] = useState([])
const handleInput = (event) =>{
  setValues(prev =>({ ...prev, [event.target.name]: [event.target.value]}) )
}
function findCookie(psps){
  var name    = psps;
  var value   = null;
  var cookies = document.cookie.split(/\s*;\s*/);
  for(var i = 0; i < cookies.length; i++) {
      if(cookies[i].substring(0, name.length + 1) == (name + '=')) {
          value = decodeURIComponent(cookies[i].substring(name.length + 1));
          break;
      }
  }
  return value;
}
const handleSubmit = async (event) =>{

  event.preventDefault();
  const formData = new FormData();
  formData.append('login', `${document.getElementById('login').value}`);
  formData.append('password', `${document.getElementById('pass').value}`);
  fetch('/php/login.php', {method: 'POST', body: formData}).then(response => response.text())
  .then(data => {
   
    const userData = data.split(';').map(item => item.trim());
  
    if(userData[0] == "Admin access"){
      document.cookie = `id=${userData[1]}`;
      document.cookie = `name=${userData[2]}`;
      document.cookie = `email=${userData[3]}`;
      document.cookie = `phone=${userData[4]}`;
      document.cookie = `organization=${userData[5]}`;
      document.cookie = `isAdmin=${userData[6]}`;
     
      NavigateTo('/Admin')  
    }else
    if(userData[0] == "Access"){
    
      document.cookie = `id=${userData[1]}`;
      document.cookie = `name=${userData[2]}`;
      document.cookie = `email=${userData[3]}`;
      document.cookie = `phone=${userData[4]}`;
      document.cookie = `organization=${userData[5]}`;
      document.cookie = `isAdmin=${userData[6]}`;
      document.cookie = `avatar=${userData[7]}`;
      NavigateTo('/PersAccMain')
    }else{
      openNotification(document.getElementById('login').value);
    }
    if(userData[0] == "Denied"){
     
      console.log(data[0])
    }
    })
  .catch(error => console.error('Error:', error));

}


return (
  <div className='LoginForm'>
  {contextHolder}
    <div className='container1' id="chart">'
         <div className="leftform" >
              <div className="content1" data-aos-delay="0" data-aos="fade-right" data-aos-once="true">
                  <div className="lefttitle">
                    
                  </div>
                  <div className='loginblock'>
                      <h1>Вход</h1>
                      <form className='form'  action="" onSubmit={handleSubmit}>
                          <div className='inputbox'>
                              <h3>Логин</h3>
                              <input required className='input' id='login' type='text'/>
                          </div>
                          <div className='inputbox'>
                              <h3>Пароль</h3>
                              <input required className='input' id='pass' type='text'/>
                          </div>
                          <div className='forgotPass-container'><Link className='links' style={{ textDecoration: 'none' }} to='/recovering'>Забыли пароль?</Link></div>
                          <button className='btn'>Войти</button>
                      </form>
                  </div>
              </div>
        </div>
        <div class="rightcontent" >
            <div className="content2" data-aos-delay="0" data-aos="fade-left" data-aos-once="true">
                    <div className="righttitle">
                        <h1>Войдите в свой аккаунт</h1>
                        <img width={500} src={loginImgage}></img>
                    </div>
            </div>
        </div>
      </div>
  </div>










  )
}
export default LoginForm;
