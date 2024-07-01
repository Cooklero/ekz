import React, { useState, useEffect  }  from 'react'
import './Admin.css'
import {Modal,Table,Avatar, Select,Button, Input, notification} from 'antd';
  import MDEditor, { selectWord,commands } from "@uiw/react-md-editor";
  import axios from 'axios';



const SearchTree = () => {

  const generateRandomAvatar = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    setColor(randomColor);

    const randomInitial1 = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const randomInitial2 = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    setInitials(randomInitial1 + randomInitial2);
  }

  const [reqs, setReqs] = useState([]);
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const columns = [
    {
      width: 7,
      dataIndex: 'avatar',
      key: 'avatar',
     
    },
    {
      title: 'ФИО',
      width: 30,
      dataIndex: 'topic',
      key: 'name',
     
    },
    {
      title: 'Телефон',
      width: 20,
      dataIndex: 'pr',
      key: 'age',
    
    },
    {
      title: 'Почта',
      dataIndex: 'tasks',
      key: '1',
      width: 30,
    },
    {
      title: 'Образовательная организация',
      dataIndex: 'org',
      key: '1',
      width: 30,
    },
    {
      title: 'Действия',
      dataIndex: 'actions',
      key: '1',
      width: 25,
    }
  ];
  const BtnEven = (e) =>{
    console.log(e.target.id);
    const generatedLogin = Math.random().toString(36).substring(7);
    const arr = (e.target.id).split('/')
    const formData = new FormData();
    formData.append('login', `${generatedLogin}`);
    formData.append('id', `${arr[0]}`);
    formData.append('email', `${arr[1]}`);
    fetch('/php/AcceptReq.php', {method: 'POST', body: formData}).then(res => fetchData())
      openNotification1();
}

const BtnDelete = (e) =>{
  console.log(e.target.id);
    
  const arr = (e.target.id).split('/')
  console.log(arr);
    
    const formData = new FormData();
    formData.append('id', `${arr[0]}`);
    formData.append('email', `${arr[1]}`);
    fetch('/php/DeclineReq.php', {method: 'POST', body: formData}).then(res => fetchData())
    
    openNotification2();
}
  let dataTable = [];
  const [color, setColor] = useState('#000');
  const [initials, setInitials] = useState('AA');
 
  const fetchData = async () => {
    try {
      dataTable =[]
      fetch(('/php/getRequests.php'), {method: 'POST'}).then(response => response.json())
      .then(data => {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
          const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
          let allSymbols = ((data[i]).name).split(' ')
         
          dataTable.push({
            key: i,
            avatar:<Avatar style={{ backgroundColor: randomColor }}>{allSymbols[0][0]+allSymbols[1][0]}</Avatar>,
            topic: `${(data[i]).name}`,
            pr: `${(data[i]).phone}`,
            tasks:`${(data[i]).email}`,
            org:`${(data[i]).organization}`,
            actions:<div className='actBtns'><button className='evenBtn' onClick={BtnEven} id={`${(data[i]).id}/${(data[i]).email}`}>Одобрить</button><button className='delBtn'  onClick={BtnDelete} id={`${(data[i]).id}/${(data[i]).email}`}>Отклонить</button></div>
          });
        } 
        console.log(dataTable)// Получаем данные из таблицы темы
        setReqs(dataTable)
        console.log(reqs)
         // сохраняем полученные данные в состояние
      })
      } catch (error) {
        console.error('Ошибкаd при получении данных:', error);
      }
      console.log(reqs)
    };
useEffect(()=>{
  fetchData()
}, [])  

const [open2, setOpen2] = useState(false);
const showModal2 = () => {
    setOpen2(true);
  };
  const handleCancel2 = () => {
    setOpen2(false);
  };
  const handleOk2 = () => {
    const formData = new FormData();
    formData.append('lesson', `${document.getElementById('LessonName').value}`);
    fetch('/php/addLesson.php', {method: 'POST', body: formData})
    openNotification3()
    setOpen2(false);
  };
   //Уведомления об отправке заявки
   const [Accept, contextHolder1] = notification.useNotification();
   const openNotification1 = () => {
     Accept.open({
       message: 'Статус заявки',
       description:
         'Заявка одобрена',
       duration: 5,
     });
   };
      //Уведомления об отправке заявки
      const [Decline, contextHolder2] = notification.useNotification();
      const openNotification2 = () => {
        Decline.open({
          message: 'Статус заявки',
          description:
            'Заявка отклонена',
          duration: 5,
        });
      };
      const [AddSubject, contextHolder3] = notification.useNotification();
      const openNotification3 = () => {
        Decline.open({
          message: 'Предмет добавлен',
          
          duration: 5,
        });
      };
  return (  
   <div className='Admin'
>
{contextHolder1}
{contextHolder2}
{contextHolder3}
<Modal
open={open2} width={623}
  title="Добавление предмет"
  onOk={handleOk2}
  onCancel={handleCancel2}
  footer={[
    <Button  onClick={handleCancel2}>
      Отмена
    </Button>,
    <Button  type="primary" onClick={handleOk2}>
      Создать
    </Button>,
    
  ]}
><Input placeholder='Название предмета' id="LessonName" name='Topicname'></Input>
</Modal>
<h1>Заявки</h1>
     <Table columns={columns} dataSource={reqs} scroll={{ x: 700, y: 500 }} />
     <Button type='primary' onClick={showModal2} >Добавить предмет </Button>
</div>
  );
 
  
  
}

export default SearchTree;
