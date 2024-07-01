import React, { useState, useEffect  }  from 'react'
import './charts.css'
import { Table,DatePicker,Select,Button,Modal,message, theme , locale } from 'antd';
import MDEditor, { selectWord,commands } from "@uiw/react-md-editor";
import axios from 'axios';
// No import is required in the WebPack.
import "@uiw/react-md-editor/markdown-editor.css";
// No import is required in the WebPack.
import "@uiw/react-markdown-preview/markdown.css";
import {StarOutlined,DownloadOutlined ,SettingTwoTone, SaveTwoTone,DeleteFilled, UploadOutlined,
  FolderAddTwoTone,FolderTwoTone,FolderOpenTwoTone,FileTextTwoTone,FileExclamationTwoTone, FileDoneOutlined,FileTextOutlined,ReadOutlined
} from '@ant-design/icons';
import PieChart from './PieChart';
import BarChart from './BarChart';
import ru_RU from 'antd/locale/ru_RU';
import Chart from 'react-apexcharts';
import moment from 'moment';

const SearchTree = () => {
  const [currDate, setCurrDate] = useState(''); 
  const [arr, setArr] = useState(''); 
  const [arr3, setArr3] = useState([]);
  const [obj, setobj] = useState({});
  const options = [];
      const noteData = {
        }
        let notesDates = ["m","0"]
  useEffect(() => {
    const formData = new FormData();
      formData.append('userId', `${findCookie("id")}`);
      fetch(('/php/getTeacherLessons.php'), {method: 'POST', body: formData}).then(response => response.json())
      .then(data => {
        console.log(data)
         for (let i = 0; i <data.length-1; i++) {
          options.push({ 
            value:`${(data[i]).lesson_id}`,
            label:`${(data[i]).lessonName}`
          });
        }

        setArr(options)
        
        });
        
    fetch(('/php/getTopics2.php'), {method: 'POST'}).then(response => response.json())
    .then(data => {
      console.log(data) // Получаем данные из таблицы темы
      setTopics(data); // сохраняем полученные данные в состояние
    })
    const formData2 = new FormData();
    formData2.append('userId', `${findCookie("id")}`);
      fetch(('/php/getNotes.php'), {method: 'POST', body: formData2}).then(response => response.json())
      .then(data => {
        console.log(data)
         for (let i = 0; i <data.length-1; i++) {
          notesDates.push((data[i]).created_at);

          noteData[(data[i]).created_at] =(data[i]).note_text
        }
        console.log(notesDates)
       console.log(noteData)
       setobj(noteData)
       setArr3(notesDates)
        });
        
    const handleResize = () => {
      // Реагируем на изменения размеров окна здесь
      
   
    const element = document.getElementById("note")
      setEditorHeight(element.getBoundingClientRect().height-135); // Высота окна минус отступ
      settableHeight(element.getBoundingClientRect().height-226)// Высота окна минус отступ
    };

    handleResize(); // Инициализация
    window.addEventListener('resize', handleResize);
    
  }, []);
  const disabledDate = (current) => {
    let currentDate = new Date();
    let currentDay = currentDate.getDay();

    let mondayDate = new Date(currentDate.setDate(currentDate.getDate() - currentDay + 1));
    let sundayDate = new Date(currentDate.setDate(currentDate.getDate() - currentDay + 7));

    // Форматирование дат в строку в формате "yyyy-mm-dd"
    const formattedMondayDate = mondayDate.toISOString().split('T')[0];
    const formattedSundayDate = sundayDate.toISOString().split('T')[0];
    return current.isBefore(formattedMondayDate) || current.isAfter(formattedSundayDate);
  };
  const [notes, setNotes] = useState([]); 
  const [editorHeight, setEditorHeight] = useState(300); 
  const [topics, setTopics] = useState('');
  const [tableHeight, settableHeight] = useState(125);
const mkdStr = '';
const [value, setValue] = useState(mkdStr);

const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  return daysOfWeek[date.getDay()];
};


const [open2, setOpen2] = useState(false);

const showModal2 = () => {
  setOpen2(true);
};

const handleOk2= () => {
  console.log(StorTime)
  const formData = new FormData();
  formData.append('user_id', `${findCookie("id")}`);
  formData.append('noteStorageTime', `${StorTime}`);
  fetch(('/php/setStorageTime.php'), {method: 'POST', body: formData}).then(data => {
    chandStorageTime();
  })
  setOpen2(false);
};

const handleCancel2 = () => {
  setOpen2(false);
};

const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content:'Заметка добавлена',
    });
  };
  const chandStorageTime = () => {
    messageApi.open({
      type: 'success',
      content:'Изменено',
    });
  };

const onChange = (date, dateString) => {
  
  setCurrDate(dateString)

  if(arr3.includes(String(dateString))){
    setValue(obj[dateString] )
  }else{
    setValue(' ')
  }
};
const handleContextMenu1 = (value1) => {
  const formData = new FormData();
  formData.append('subject_id', `${value1}`);
  fetch(('/php/getChartsTopic.php'), {method: 'POST', body: formData}).then(response => response.json())
  .then(data => {
    console.log(data)
    console.log(data[0])  // Получаем данные из таблицы темы
    setTopics(data); // сохраняем полученные данные в состояние
  })

}
const saveNote = () => {
  const formData = new FormData();
  formData.append('user_id', `${findCookie("id")}`);
  formData.append('textOfNote', `${value}`);
  formData.append('created_at', `${currDate}`);
  fetch(('/php/addNote.php'), {method: 'POST', body: formData}).then(data => {
    success();
  })
}

const [charts, setCharts] = useState([20,0,10,5,3,9]);
let taskdif = [0,0,0,0,0,0]
const handleContextMenu2 = (value2) => {
  console.log(value2)
  const formData = new FormData();
  formData.append('subject_id', `${value2}`);
  fetch(('/php/getTasksDiff.php'), {method: 'POST', body: formData}).then(response => response.json())
  .then(data => {
    console.log(data)
    taskdif = [0,0,0,0,0,0]
   for(let i=0;i<data.length;i++){
    console.log(data[i].difficulty)
    console.log(data[i].variaty)
    console.log(taskdif[0])
    if(data[i].difficulty == "1 уровень"){
      taskdif[0]= Number(data[i].variaty)
    }
    if(data[i].difficulty == "2 уровень"){
      taskdif[1]= Number(data[i].variaty)
    }
    if(data[i].difficulty == "3 уровень"){
      taskdif[2]= Number(data[i].variaty)
    }
    if(data[i].difficulty == "4 уровень"){
      taskdif[3]= Number(data[i].variaty)
    }
    if(data[i].difficulty == "5 уровень"){
      taskdif[4]= Number(data[i].variaty)
    }
    if(data[i].difficulty == "6 уровень"){
      taskdif[5]= Number(data[i].variaty)
    }

   }
  
    console.log(taskdif)  // Получаем данные из таблицы темы  
     // сохраняем полученные данные в состояние
     setCharts(taskdif)
  })
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

let StorTime = ''
const handleContextMenu3 = (value2) => {
   var time = moment(new Date());
  if(value2 == "1"){time.add(1, 'week');}
  if(value2 == "2"){time.add(1, 'months')}
  if(value2 == "3"){time.add(3, 'months')}
  if(value2 == "4"){time.add(6, 'months')}
  alert(moment().format('YYYY-MM-DD'));
  alert(time.format('YYYY-MM-DD'));
  StorTime = time.format('YYYY-MM-DD');
  console.log(StorTime);
 }
const columns = [
  {
    title: 'Название темы',
    width: 50,
    dataIndex: 'topic',
    key: 'name',
   
  },
  {
    title: 'Количество практических',
    width: 30,
    dataIndex: 'pr',
    key: 'age',
  
  },
  {
    title: 'Количество заданий',
    dataIndex: 'tasks',
    key: '1',
    width: 30,
  }
];

const data = [];
for (let i = 0; i < topics.length-1; i++) {
  data.push({
    key: i,
    topic: `${(topics[i]).topicName}`,
    pr: i*2,
    tasks:i*3
    
  });
}
  
const storageTime =
[
  {
    label: '1 неделя',
    value: '1',
  },{
    label: '1 месяц',
    value: '2',
  },{
    label: '3 месяца',
    value: '3',
  },
  {
    label: '6 месяцев',
    value: '4',
  }
]

const barOptions = {
  chart: {
    type: 'bar',
    height: '100%', // задаем высоту графика в %
    width: '100%',
    stacked: true,
          toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          tickPlacement: 'on',
          categories: ['Дек','Янв', 'Февр', 'Март', 'Апр', 'Май'],
        },
        plotOptions: {
          bar: {
            borderRadius:6,
            horizontal: false,
            columnWidth: '50%',
          }
        } // задаем ширину графика в %
  }
  // дополнительные опции графика


const series = [
  { name: 'ур1', data: [30, 40, 45, 50, 49, 60,] },
  { name: 'ур2', data: [20, 21, 90, 42, 90, 17,] },
  { name: 'ур3', data: [10, 10, 10, 10, 10, 10,] },
  { name: 'ур4', data: [10, 10, 10, 10, 10, 10,] },
  { name: 'ур5', data: [10, 10, 10,28, 10, 28, ] },
  { name: 'ур6', data: [10, 10, 10, 28, 10, 28,] },
    ];

     const { token } = theme.useToken();
  const style = {
    border: `1px solid ${token.colorPrimary}`, background:'#e6f4ff',
  };
  const cellRender = (current, info) => {
    if (info.type !== 'date') {
      return info.originNode;
    }

    if (typeof current === 'number' || typeof current === 'string') {
      return <div className="ant-picker-cell-inner">{current}</div>;
    }
    return (
      <div className="ant-picker-cell-inner" style={arr3.includes(current.format('YYYY-MM-DD')) ? style : {}}>
        {current.date()}
      </div>
    );
  };

  return (  
    <div className='charts'>
      {contextHolder}
       <Modal
      open={open2} width={623}
        title="Настройка заметок"
        onOk={handleOk2}
        onCancel={handleCancel2}
        footer={[
          <Button  onClick={handleCancel2}>
            Отмена
          </Button>,
          <Button  type="primary" onClick={handleOk2}>
            Сохранить
          </Button>
        ]}
        >
          <h3>Время хранения заметок</h3>
          
            <Select
                showSearch
                allowClear 
                defaultactiveFirstOption
                width={500}
                placeholder="1 месяц"
                optionFilterProp="children"
                onChange={handleContextMenu3}
                options={storageTime}
              />
             </Modal>
        <div className='row'>
            <div className='chart1'>
                  <div className='title'>
                      <h3>Статистика заданий</h3>
                    
                      <Select
                        className='tree'
                        showSearch
                        allowClear defaultactiveFirstOption
                        width={500}
                        placeholder="Выберите предмет" 
                        onChange={handleContextMenu1}
                      id='subj'
                        options={arr}
           />
                  </div>
                  <Table columns={columns} dataSource={data} scroll={{ x: 550, y:tableHeight }} /> 
            </div>
              
            <div  className='chart2'>
                  <div className='title'>
                    <h3>Статистика заданий</h3>
                    <Select
                        className='tree'
                        showSearch
                        allowClear defaultactiveFirstOption
                        width={500}
                        placeholder="Выберите предмет" 
                        onChange={handleContextMenu2}
                      id='subj'
                        options={arr}/>
                  </div>
                  <div className="chart-container">
                    <Chart options={{labels: ['1 уровень', '2 уровень', '3 уровень', '4 уровень', '5 уровень', '6 уровень']}} series={charts} type="donut" height='100%' width="100%" />
                  </div>
            </div>
         
        
        </div>
        <div className='row'>
            <div  className='chart3'>  
                <h3>Статистика добавления заданий</h3>       
                <div className="chart-container">
                  <Chart options={barOptions} series={series} type="bar" height='100%' width="100%" />
                </div>
            </div>
            
            <div id='note'  className='chart4'>
                <div data-color-mode="light">
                  <div className='title'>
                    <div>
                      <i></i>
                      <h3>Заметки</h3>
                    </div>
                    <div>
                      <Button onClick={saveNote} icon={<SaveTwoTone />} ></Button> 
                      <Button onClick={showModal2} icon={<SettingTwoTone/>} ></Button> 
                      <DatePicker locale={ru_RU} placeholder='Выберите дату' cellRender={cellRender}   onChange={onChange} />
                    </div>
                  </div>
                  <MDEditor height={editorHeight}   value={value} onChange={setValue} />
                  </div>
            </div>
        </div>
      
    </div>
    
  );
  
  
  
}

export default SearchTree;
