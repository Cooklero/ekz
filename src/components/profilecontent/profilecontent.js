import React, { useState, useEffect,useContext } from 'react'
import './profilecontent.css'
import ProfImage from '../../images/user (1) 6.png'
import { Radio, Breadcrumb ,Modal,Button ,notification,message,Form,  Input,Upload , Select} from 'antd';
import ImgCrop from 'antd-img-crop';
import { AppContext } from '../context';
import axios from 'axios'
import { CloseCircleFilled } from '@ant-design/icons';

const Profilecontent =() => {
  const { avatar, setAvatar } = useState(ProfImage)
  let v='https://res.cloudinary.com/practicaldev/image/fetch/s--06gijueY--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7t211pyomdy5orm9kkv7.png'

  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'igmage.png',
      status: 'done',
      url: findCookie("avatar"),
    },
  ]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const [selectedSubjects, setselectedSubjects] = useState([])
  const [subjectsList, setsubjectsList] = useState([])
  const [subjects, setsubjects] = useState([])
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [org, setOrg] = useState('')


  const selectedSubj =  (values) => {
    setselectedSubjects(values)
  
  };

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

  const loadAvatar = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    document.cookie = `avatar=https://cd00351.tw1.ru/php/uploads/${file.name}`;
    formData.append('userId', `${findCookie("id")}`);
    fetch(('/php/UploadAvatar.php'), {method: 'POST', body: formData})
    v = findCookie("avatar");
    setFileList([
      {
        uid: '-1',
        name: file.name,
        status: 'done',
        url: v,
      },
    ])
    return true;
  };

useEffect(() => { 
      const name =findCookie("name");
      const organization =findCookie("organization");
      const email =findCookie("email");
      const phone =findCookie("phone");
      const avatar =findCookie("avatar");
      
      setName(name)
      setOrg(organization)
      setEmail(email)
      setPhone(phone)
      
  const fetchData = async () => {
    try {
      const formData = new FormData();
      formData.append('userId', `${findCookie("id")}`);
      fetch(('/php/getSubjects.php'), {method: 'POST', body: formData}).then(response => response.json()
       
      )
      .then(data => {
      
        setsubjects(data)// сохраняем полученные данные в состояние   allUsers
        const options = [];
        for (let i = 0; i <(data).length-1; i++) {
      
            options.push({
              value:`${(data[i]).subject_name}`,
              label:`${(data[i]).subject_name}`
            });
          }
          
          console.log(options)
          setsubjectsList(options)}); // Получаем данные из таблицы Пользователи и предметы
      
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  fetchData();
  
}, []);
const saveChanges =  () => {
  
 

  const formData = new FormData();
  formData.append('userId', `${findCookie("id")}`);
  if((document.getElementById('name').value).trim() != ''){
    formData.append('name', `${document.getElementById('name').value}`);document.cookie = `name=${document.getElementById('name').value}`;
  }else{
    formData.append('name', `${findCookie("name")}`);
  }

  if((document.getElementById('email').value).trim() != ''){
    formData.append('email', `${document.getElementById('email').value}`);
    document.cookie = `email=${document.getElementById('email').value}`;
  }else{
    formData.append('email', `${findCookie("email")}`);
  }

  if((document.getElementById('org').value).trim() != ''){
    formData.append('organization', `${document.getElementById('org').value}`);
    document.cookie = `organization=${document.getElementById('org').value}`;
  }else{
    formData.append('organization', `${findCookie("organization")}`);
  }

  if((document.getElementById('phone').value).trim() != ''){
    formData.append('phone', `${document.getElementById('phone').value}`);
    document.cookie = `phone=${document.getElementById('phone').value}`;
  }else{
    formData.append('phone', `${findCookie("phone")}`);
  }


  
  
  
  
  const name =findCookie("name");
  const organization =findCookie("organization");
  const email =findCookie("email");
  const phone =findCookie("phone");
  setName(name)
  setOrg(organization)
  setEmail(email)
  setPhone(phone)

  fetch(('/php/SavePersData.php'), {method: 'POST', body: formData})
  for (let i =0; i < selectedSubjects.length; i++ ){
    const formData2 = new FormData();
    formData2.append('userId', `${findCookie("id")}`);
    formData2.append('subject', `${selectedSubjects[i]}`);
    fetch(('/php/AddTeacherSubject.php'), {method: 'POST', body: formData2})
  }
  dataSaved();
}
const [messageApi, contextHolder] = message.useMessage();
const dataSaved = () =>{
  messageApi.open({
    type:'success',
    content:'Изменения сохранен'
  })
}
const passChanged = () =>{
  messageApi.open({
    type:'success',
    content:'Пароль изменён'
  })
}
const [open2, setOpen2] = useState(false);
const showModal2 = () => {
    setOpen2(true);
  };
  const handleCancel2 = () => {
    setOpen2(false);
  };

  const [api, contextHolder2] = notification.useNotification();
  const openNotification = () => {
    api.open({
     message: `Ошибка авторизации`,
     description:
       'Введён неправильный пароль',
     icon: <CloseCircleFilled   style={{ color: 'red' }} />,
   });
  };

  const handleOk2 = () => {
    const formData = new FormData();
    formData.append('OldPass', `${document.getElementById('OldPass').value}`);
    formData.append('NewPass', `${document.getElementById('NewPass').value }`);
    formData.append('userId', `${findCookie("id")}`);
    fetch(('/php/ChangePassword.php'), {method: 'POST', body: formData}).then(response => response.text())
    .then(data => {
      const userData = data.split(';').map(item => item.trim());
      if(userData[0] == "Succes"){ 
        passChanged();
       setOpen2(false);
      }else if(userData[0] == "Faile"){
        openNotification();
      }
    })
   
  };
  const [form] = Form.useForm();
  return (
    
    <div className='profile'>
      <Modal
        open={open2} width={623}
        title="Изменение пароля"
        onOk={handleOk2}
        onCancel={handleCancel2}
        footer={[
          <Button  onClick={handleCancel2}>
            Отмена
          </Button>,
          <Button  type="primary" onClick={handleOk2}>
            Сохранить
          </Button>,
        ]}>
        <Form form={form}>
                <Form.Item
                  name="OldPass"
                  rules={[{required: true,message: 'Заполните это поле',},]}>
                    <Input placeholder='Текущий пароль' id="OldPass" name='Topicname'></Input>
                </Form.Item>,
                <Form.Item
                  name="NewPass"
                  rules={[{required: true,message: 'Заполните это поле',},]}>
                    <Input placeholder='Новый пароль' id="NewPass" name='Topicname'></Input> 
                </Form.Item> 
        </Form>
      </Modal>
        <div className='contain'>
            <div className='imgbox'>
            {contextHolder}
            {contextHolder2}
              <h2>Профиль</h2>
              <ImgCrop rotationSlider>
                <Upload className="ic"
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-circle"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}  customRequest={({ file}) => loadAvatar(file)}
                >
                  {fileList.length < 1 && 'Загрузить'}
                </Upload>
              </ImgCrop>
              
              <Button type='primary' onClick={showModal2} className="ic passw">Сменить пароль</Button>
             
            </div>
            <div  className='inputbox'>
                <h1>
                  Основная информация
                </h1>
                <div className='rowbox'>
                <div className='wrap'>
                            <label for="login">ФИО</label>
                            <div className='input-box'><Input className='input' type="text" placeholder={name} name='email' id='name' ></Input></div>
                            <label for="login">Образовательная организация</label>
                            <div className='input-box'><Input className='input'  type="text" placeholder={org} name='email' id='org'  ></Input></div> 
                </div>
                <div className='wrap2'>
                             <label for="login">Почта</label>
                            <div className='input-box2'><Input className='input'  type="email" placeholder={email} name='email' id='email'  ></Input></div>

                            <label for="login">Телефон</label>
                            <div className='input-box2'><Input className='input'  type="phone" placeholder={phone} name='email' id='phone'  ></Input></div>       
                </div>
               
              </div>
              <Select
                mode="multiple"
                showSearch
                allowClear defaultactiveFirstOption
                style={{
                  width: '100%',height:'50px'
                }}
                placeholder="Выберите предмет" onChange = {selectedSubj}
                
              
                options={subjectsList}
              />
              <Button onClick={saveChanges} type='primary'  className='textbtn'>Сохранить</Button>
            </div>
        </div>
       
    </div>
    
  );
}
  
export default Profilecontent;