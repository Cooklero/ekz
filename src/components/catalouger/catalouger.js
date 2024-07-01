
import React, { useState, useEffect,useContext, useLayoutEffect } from 'react';
import { Collapse,Radio, Breadcrumb ,Modal, Select, Input, Tree, Menu, Dropdown,message,Form,Button,Upload} from 'antd';
import './catalouger.css'
      
import {StarOutlined,DownloadOutlined ,DeleteFilled, UploadOutlined,
  FolderAddTwoTone,FolderTwoTone,FolderOpenTwoTone,FileTextTwoTone,FileExclamationTwoTone, FileDoneOutlined,FileTextOutlined,ReadOutlined
} from '@ant-design/icons';
import { CKEditor } from 'ckeditor4-react';
 import { Document, Paragraph, Packer, TextRun ,AlignmentType } from 'docx';
import {useNavigate} from 'react-router-dom'
import MDEditor, { commands,
  ICommand,
  EditorContext } from "@uiw/react-md-editor";
  import Aos from 'aos'
// No import is required in the WebPack.
import "@uiw/react-md-editor/markdown-editor.css";
// No import is required in the WebPack.
import "@uiw/react-markdown-preview/markdown.css";
import axios from 'axios'
import {marked} from 'marked';
import { AppContext } from '../context';
 
 


const { TreeNode } = Tree;
const { Search } = Input;


 const ContextMenu = ({ onSelectCreate }) => {
   return (//Контекстное меню для предмета
     <Menu>
       <Menu.Item key="создать" onClick={onSelectCreate}>
         Создать тему
       </Menu.Item>
     </Menu>
   );
 }

 

 

 
  

 
 const ContextMenuTree = () => {
  const [form] = Form.useForm();
  function Export2Word( filename = ''){
    var preHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><style>\
    table {\
      font-family: Arial, Helvetica, sans-serif;\
      border-collapse: collapse;\
      width: 100%;\
      margin-bottom:10px;\
    }\
    table td, table th {\
      border: 1px solid #ddd;\
      padding: 8px;\
    }\
    table tr:nth-child(even){background-color: #f2f2f2;}\
    table tr:hover {background-color: #ddd;}\
    table th {\
      padding-top: 12px;\
      padding-bottom: 12px;\
      text-align: left;\
      background-color: #04AA6D;\
      color: white;\
    }\
    h2{ text-align:center};\
    h3{ text-align:center};\
    img{
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 50%;
  }
    q {background-color: #f5f5f5;padding: 5px 10px;font-style: italic;border-radius:20px;}\
    code {color: #333;background-color: #efefef; padding: 0.5rem;margin: 0.5rem 0;border: 1px solid #ccc;border-radius: 1px;white-space: pre-wrap;word-break: break-word;}\
    </style></head>><body>`;
    let tasNumb=0;
    var htmlcode = ``;//Переменная с html кодом экспортируемых задач
      for (let i = 0; i < NodeKeys.length; i++) {

        //Поиск нужного задания в массиве works(задания)
        for( var w = 0; w < works.length; w++){
        
          if (String(works[w].id_works) == String(NodeKeys[i])) {
            
            tasNumb = Number(w) 
            
              }
        }
        //Проверка на на пустоту задания
        if(works[tasNumb].description != null){
          htmlcode = htmlcode +`<h3>№${i+1} ${works[tasNumb].title}</h3>`+marked(works[tasNumb].description)
        }
        };
        
      

      var postHtml = `</body></html>`;
      var html = preHtml+`<h2>Задачи с платформы ЭКЗамен</h2>`+`${htmlcode}`+postHtml;
  
      var blob = new Blob(['\ufeff', html], {
          type: 'application/msword'
      });
      
      // Specify link url
      var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
      
      // Specify file name
  
      
      // Create download link element
      var downloadLink = document.createElement("a");
  
      document.body.appendChild(downloadLink);
      
      if(navigator.msSaveOrOpenBlob ){
          navigator.msSaveOrOpenBlob(blob, filename);
      }else{
          // Создание ссылке к файлу
          downloadLink.href = url;
          
          // Объявление иимени файла
          downloadLink.download = "Задачи.doc";
          
          //Скачивание файла
          downloadLink.click();
      }
      
      document.body.removeChild(downloadLink);
  
 };
   const handleContextMenu = (value2) => {
    setValues3(Number(value2))
    for (let i =0; i < usersAndlessons.length; i++){
      
      if(usersAndlessons[i].value == Number(value2)){
        console.log(usersAndlessons[i].label)
        setSubjectTitle(usersAndlessons[i].label)
      }
      
    }
   }
   const handleContextMenu3 = (value2) => {
    console.log(value2)
    setDiff(value2)
   }
   const handleContextMenu4 = (value2) => {
    console.log(value2)
   setType(value2)
   }
const { value9, setValue9 } = useContext(AppContext);

 const mkdStr = '';
 const [value, setValue] = useState(mkdStr)
 const mkdStr2 = '';
 const [value2, setValue2] = useState(mkdStr2);
 const [DataTree, setTree] = useState('');
 const { TreeNode } = Tree;
 let idTask = 0
let v = '0'
 const [FileName, setFileName] = useState('Файл');
 const [SolutName, setSolutName] = useState('Решение');

   const handleCreateNode = () => {
     // Logic to create a new node
     console.log('Creating a new node...');
     setSelectedNode(null);
   }
   const handleDeleteNode = () => {
     // Logic to delete selected node
     console.log('Deleting selected node...');
     setSelectedNode(null);
   }
   const menu = (
     <ContextMenu onSelectCreate={handleCreateNode} />
   );
   //Выгрузка данных из бд и их подготовка для генерации в теге tree
    const handleSelect = (_, info) => {
      
      // сохраняем полученные данные в состояние
   if (info.node.props.eventKey.includes("WR")) {
        
      var idT = info.node.props.eventKey.split("-")
   
     for( var w = 0; w < works.length; w++){
 
        
      if (String(works[w].id_works) == String(idT[1])) {
       
        console.log(v)
        
        setid(idT[1])
        setcurId(w)
        
        console.log(works[w].fileName)
       
        console.log(works[w].solutName)
        
        idTask = works[w].id_works
          console.log(FileName)

          // props2.defaultFileList[0].name = works[w].fileName
        // propsSol.defaultFileList[0].name = works[w].solutName
        const button = document.getElementById('TaskName');
        
        handleClick(idT[2],idT[3],idT[4])
 
        setType(works[w].type)
    

        setDiff(works[w].difficulty)
       
        button.textContent = `${works[w].title}`; 
        setValue2(works[w].description)
        setValue(works[w].noteText)
        setshowFile(works[w].HaveFile)
        setshowSol(works[w].HaveSolut)
        
  
        change(works[w].fileName,works[w].solutName)
        
      }
    }
   }
 };

 const [TaskDiff, setDiff] = useState('');
 const [TaskType, setType] = useState('');
 const [usersAndlessons, setArr] = useState([]);
 const [topics, settopics] = useState([]);
 const [pr, setpr] = useState([]);
 const [works, setworks] = useState([]);
  
  useEffect(()=>{
  Aos.init({duration:1000})
})
  useEffect(() => {
    const handleResize = () => {
      // Реагируем на изменения размеров окна здесь
    const element = document.getElementById("markded")
    
      setEditorHeight(element.getBoundingClientRect().height-294); // Высота окна минус отступ
      setEditorHeight2(element.getBoundingClientRect().height-41);
      // Высота окна минус отступ
    };

    handleResize(); // Инициализация
    window.addEventListener('resize', handleResize);

    fetchData();
  }, []);

  
const [values2,setValues2] = useState({
 
  TopiId:'',
  prName:'',

})
const [id,setid] = useState('')


const [fileList, setFileList] = useState([
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done'
  },
]);
const [fileList2, setFileList2] = useState([
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done'
  },
]);

const change= (fileName,solName) =>{
  setFileList([
      {
        uid: '-1',
        name: fileName,
        status: 'done'
      },
    ])
  
    setFileList2([
      {
        uid: '-1',
        name: solName,
        status: 'done'
      },
    ])
}
const remove= () =>{
  setFileList([
      
    ])
}

const handleButtonClick = () => {
  // Меняем свойство name у каждого элемента в списке
  const updatedFileList = fileList.map(file => ({ ...file, name: 'newName' })); 
  setFileList(updatedFileList);
};

 //Генерация иерархии для тега Tree 
 const generateTreeData = () => {
     const treeData = [];//Массив с темами
     
     for (var t = 0; t < topics.length; t++) {
      if (topics[t].subject_id == values3) {
        const childrenLevel1 = [];//Массив с пр
          //Генерация контроля знаний(пр)
          for( var p = 0; p < pr.length; p++){
              if (pr[p].id_topic == topics[t].topic_id ) {
                 
                  //Проверка на работу фильтра для контроля знаний(пр)
                  if(filterPr != "0" ){
                    if(pr[p].prName.includes(filterPr)){

                    }else{
                      continue;
                    }
                  }
                  else{
                    
                  }

                  const childrenLevel2 = [];//Массив с заданиями
                  //Генерация заданий
                  for( var w = 0; w < works.length; w++){
                  
                    if (works[w].id_pr == pr[p].pr_id) {
                      if(filterTDif != "0" ){
                        if(works[w].difficulty.includes(filterTDif)){
    
                        }else{
                          continue;
                        }
                      }
                      else{
                        
                      }

                      if(filterTask != "0" ){//Проверка на работу фильтра для заданий
                        if(works[w].type.includes(filterTask)){
    
                        }else{
                          continue;
                        }
                      }
                      else{
                        
                      }
                      childrenLevel2.push({//Добавление задания в массив с заданиями
                        title: `${works[w].title}`,
                        isLeaf:true,
                        icon: <FileTextTwoTone />,
                        key:`WR -${works[w].id_works}-${topics[t].topicName}-${pr[p].prName}-${works[w].title}`
                      });
                      }
                  }

                  childrenLevel1.push({//Добавление контроля знаний(пр) в массив с пр
                    title: `${pr[p].prName}`,
                    children: childrenLevel2,
                    key:`PR -${pr[p].pr_id}-${pr[p].prName}`,
                    icon: <FolderOpenTwoTone />,
                  });
               }
          }
         
              treeData.push({//Добавление темы в массив с темами
                title: `Тема «${topics[t].topicName}»`,
                children: childrenLevel1,
                key:`TP -${topics[t].topic_id}-${topics[t].topicName}`,
                icon: <FolderOpenTwoTone />,
            });
        }
     
    }
    console.log(treeData)
  return treeData;
   };

   const [currentNodeTitle, setCurrentNodeTitle] = useState(null);
  
   const getMenuForTitle = (title) => {

     if (selectedNode.includes("PR")) {
       return (//Контекстное меню для контроля знаний(пр)
         <Menu>
          <Menu.Item key="1" onClick={showModal3}>Создать Задание</Menu.Item>
           {/* <Menu.Item key="2">Создать Тест</Menu.Item> */}
         
           <Menu.Item key="4" onClick={showModal5}>Удалить </Menu.Item>
           <Menu.Item key="5" onClick={showModal6}>Переименовать</Menu.Item>
         </Menu>
       );
     } else if (selectedNode.includes("WR")) {
       return (//Контекстное меню для контроля знаний(пр)
         <Menu>
           <Menu.Item key="6" onClick={showModal5}>Удалить </Menu.Item>
           <Menu.Item key="7" onClick={showModal6}>Переименовать</Menu.Item>
         </Menu>
       );
     }else if ( selectedNode.includes("Lesson")){
       return (//Контекстное меню для предмета
         <Menu>
           <Menu.Item key="8" onClick={showModal2}>Создать тему</Menu.Item>
         </Menu>
       );
     }else if (selectedNode.includes("TP"))  {
       return (//Контекстное меню для темы
         <Menu>
           <Menu.Item key="9" onClick={showModal}>Создать контроль знаний</Menu.Item>
           <Menu.Item key="13" onClick={showModal5}>Удалить </Menu.Item>
           <Menu.Item key="14" onClick={showModal6}>Переименовать</Menu.Item>
         </Menu>
       );
     }
     return null;
   };

   
  const [selectedNode, setSelectedNode] = useState("");
   const handleRightClick = ({ event, node }) => {
    
     event.preventDefault();
     
    const f = String(node.key)
    
     setSelectedNode(f)
   
   };

   const [values3,setValues3] = useState(-5)
   const [SubjectTitle, setSubjectTitle] = useState('Предмет не выбран');
//Выпадающий список с временем и сложностью
const [currentD, setCurrentD] = useState('null');
const [currentT, setCurrentT] = useState('null');
//Переменные для значений филтра
const [filterTask, setfilterTask] = useState('0');
const [filterTDif, setfilterTDif] = useState('0');
const [filterPr, setfilterPr] = useState('0');

const [showFile, setshowFile] = useState('');//Переменная, определяющая наличие или отсутствие файла у задания
const [showSol, setshowSol] = useState('');//Переменная, определяющая наличие или отсутствие решения у задания

const [currentTime, setCurrentTime] = useState('null');
const [currentTDif, setCurrentTDif] = useState('null');
const [currentType, setCurrentType] = useState('null');
const [currentInclSol, setCurrentInclSol] = useState('null');
const [currentFiles, setCurrentFiles] = useState('null');
const onChange6 = (e) => {
  setCurrentInclSol(e.target.value)
  console.log(`selected ${e.target.value}`);
};

const onChange7 = (e) => {
  setCurrentFiles(e.target.value)
  console.log(`selected ${e.target.value}`);
};

const onChange5 = (value) => {
  setCurrentType(value)
  console.log(`selected ${value}`);
};

const items= [
  {
    key: '1',
    label: 'Дополнительно',
    children: [<h3>Файл с решением</h3>,<Radio.Group onChange={onChange6}>
      <Radio value={"Нет"}>Нет</Radio>
      <Radio value={"Да"}>Да</Radio>
      
    </Radio.Group>,<h3>Прикрепление файлов к заданию</h3>,<Radio.Group onChange={onChange7}>
      <Radio value={"Нет"}>Нет</Radio>
      <Radio value={"Да"}>Да</Radio>
      
    </Radio.Group>,]
  },
  
];
const onChange = (value) => {
  setCurrentT(value)
  
  console.log(`selected ${value}`);
};
const onCallapse = (value) => {
  if(treeHeight > 280){
     setTreeHeight(280)
  }else{
    setTimeout(() =>{
setTreeHeight(410)
    },60)
    
  }
 
  console.log(`selected ${value}`);
};
const onChange2 = (value) => {
  setCurrentD(value)
  console.log(`selected ${value}`);
};

const onChange3= (value) => {
  setCurrentTime(value)
  console.log(`selected ${value}`);
};
const onChangeType= (value) => {
  setCurrentTime(value)
  console.log(`selected ${value}`);
};
const onChange4 = (value) => {
  setCurrentTDif(value)
  setDiff(value)
  console.log(`selected ${value}`);
};






// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  //Message boxes

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then(() => {
      var idLes = selectedNode.split("-")
        
      const formData = new FormData();
      formData.append('topicId', `${Number(idLes[1])}`);
      formData.append('prName', `${currentT+` «${document.getElementById("Prn").value}»`}`);
      console.log(currentT+` «${document.getElementById("Prn").value}»`)
      formData.append('prDiff', `${currentD}`);
      console.log(currentD)
      fetch(('/php/addPr.php'), {method: 'POST', body: formData}).then(res =>{fetchData() 
        generateTreeData()})
      setOpen(false);
      addPr();
    }).catch(() => {
      // Если поле пустое, показываем сообщение об ошибке
      // Можно добавить специальный блок для вывода сообщения об ошибке
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [open2, setOpen2] = useState(false);

  const showModal2 = () => {
    setOpen2(true);
  };


 
      // Получаем текущее значение объекта
      
  
  const handleOk2 = () => {
    form.validateFields().then(() => {
      var idLes = selectedNode.split("-")
      const formData = new FormData();
      formData.append('subjectId', `${values3}`);
      formData.append('topicName', `${document.getElementById("Mytop").value}`);
  
      fetch(('/php/addTopic.php'), {method: 'POST', body: formData}).then(res =>{fetchData()
        generateTreeData()})
      setOpen2(false);
      addTopic();
    }).catch(() => {
      // Если поле пустое, показываем сообщение об ошибке
      // Можно добавить специальный блок для вывода сообщения об ошибке
    });
  
    
  };

  const handleCancel2 = () => {
    setOpen2(false);
  };

  const [open3, setOpen3] = useState(false);
  const [curId, setcurId] = useState('9');
  const [deleteAction, setdeleteAction] = useState('');
  const [editorHeight, setEditorHeight] = useState(500); 
  const [editorHeight2, setEditorHeight2] = useState(500);
  const showModal3 = () => {
    setOpen3(true);
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
  const fetchData = async () => {
    try {
      const options = [];
      const formData = new FormData();
      formData.append('userId', `${findCookie("id")}`);
      fetch(('/php/getTeacherLessons.php'), {method: 'POST', body: formData}).then(response => response.json())
      .then(data => {
        console.log(data)
        
         for (let i = 0; i <data.length-1; i++) {
          // const newData = { ...AllSubject, [(response5.data[i]).lesson_id]: (response5.data[i]).lessonName };
          // setAllSubject(newData);
          options.push({ 
            value:`${(data[i]).lesson_id}`,
            label:`${(data[i]).lessonName}`
          });
        }
        console.log(options)
        setArr(options)
        
        }); // Получаем данны // Получаем данные из таблицы Пользователи и предметы
      // сохраняем полученные данные в состояние getTopics.php
        
     
      fetch(('/php/getTopics.php'), {method: 'POST'}).then(response => response.json())
      .then(data => {
        console.log(data) // Получаем данные из таблицы темы
        settopics(data); // сохраняем полученные данные в состояние
      })
      fetch(('/php/getPr.php'), {method: 'POST'}).then(response => response.json())
      .then(data => {
        console.log(data) // Получаем данные из таблицы темы
        setpr(data); // сохраняем полученные данные в состояние
      }) // Получаем данные из таблицы практические
       

      fetch(('/php/getTasks.php'), {method: 'POST'}).then(response => response.json())
      .then(data => {
        console.log(data) // Получаем данные из таблицы темы
        setworks(data); // сохраняем полученные данные в состояние
      }) // Получаем данные из таблицы работы
         // сохраняем полученные данные в состояние

      } catch (error) {
        console.error('Ошибкаd при полученdsdии данных:', error);
      }
    };
  const levelsTime = {//Объект с временем к каждому уровню сложности
    1:'15',
    2:'30',
    3:'45',
    4:'60',
    5:'75',
    6:'90'
  }
  const handleOk3 = () => {
    form.validateFields().then(() => {
      var idT = selectedNode.split("-")
      
      var Num = currentTDif[0]
      const today = new Date();
      const day = String(today.getDate()).padStart(2,'0');
      const month = String(today.getMonth()+1).padStart(2,'0');
      const year = today.getFullYear();
      const date = `${day}.${month}.${year}`
      var time = levelsTime[Num];
      
      const formData = new FormData();
      formData.append('prId', `${idT[1]}`);
      formData.append('taskName', `${document.getElementById("TaskN").value}`);
      formData.append('diff', `${currentTDif}`);
      formData.append('time', `${time}`);
      formData.append('type', `${currentType}`);
      formData.append('haveSolution', `${String(currentInclSol)}`);
      formData.append('haveFiles', `${String(currentFiles)}`);
      formData.append('taskDate', `${date}`);

      fetch(('/php/addTasks.php'), {method: 'POST', body: formData}).then(res =>{fetchData()
        generateTreeData()})

    
      setOpen3(false);
      addTask();
  }).catch(() => {
    // Если поле пустое, показываем сообщение об ошибке
    // Можно добавить специальный блок для вывода сообщения об ошибке
  });

  };

  const handleCancel3 = () => {
    setOpen3(false);
  };     

  const [open4, setOpen4] = useState(false);

  const showModal4 = () => {
    setOpen4(true);
  };

  const handleOk4 = () => {
    var idT = selectedNode.split("-")
   
    
    axios.post('http://localhost:8081/lek', {LekI:idT[1], NameLek:`Лекция '${document.getElementById("LekN").value}'`}).then(res => console.log(res))
    fetchData();
    generateTreeData()
    setOpen4(false);
  };

  const handleCancel4 = () => {
    setOpen4(false);
  };

  const [open5, setOpen5] = useState(false);

  const showModal5 = (type) => {

    setOpen5(true);
  };

  const handleOk5 = () => {
    var idT = selectedNode.split("-")
    
    const formData = new FormData();
    
    if (selectedNode.includes("PR")) {
      formData.append('prId', `${idT[1]}`);
      fetch(('/php/DeletePr.php'), {method: 'POST', body: formData}).then(res =>{fetchData()
        generateTreeData()})
    } else if (selectedNode.includes("WR")) {
      formData.append('taskId', `${idT[1]}`);
      fetch(('/php/DeleteTask.php'), {method: 'POST', body: formData}).then(res =>{fetchData()
        generateTreeData()})
    }else if (selectedNode.includes("TP"))  {
      formData.append('topicId', `${idT[1]}`);
      fetch(('/php/DeleteTopic.php'), {method: 'POST', body: formData}).then(res =>{fetchData()
        generateTreeData()})
    }
    setOpen5(false);
    deleted();
  };

  const handleCancel5 = () => {
    setOpen5(false);
  };

  const [open6, setOpen6] = useState(false);

  const showModal6 = () => {
    setOpen6(true);
  };

  const handleOk6 = () => {
    form.validateFields().then(() => {
      var idT = selectedNode.split("-")
      
      var array2 = idT[2].split("«")
      
      const formData = new FormData();
      if (selectedNode.includes("PR")) {
        formData.append('prId', `${idT[1]}`);
        formData.append('name', `${array2[0]} «${document.getElementById('updtName').value}»`);

        fetch(('/php/updatePrName.php'), {method: 'POST', body: formData}).then(res =>{fetchData()
          generateTreeData()})

      } else if (selectedNode.includes("WR")) {
        formData.append('taskId', `${idT[1]}`);
        formData.append('name', `${document.getElementById('updtName').value}`);

        fetch(('/php/updateTaskName.php'), {method: 'POST', body: formData}).then(res =>{fetchData()
          generateTreeData()})

      }else if (selectedNode.includes("TP"))  {
        formData.append('topicId', `${idT[1]}`);
        formData.append('name', `${document.getElementById('updtName').value}`);

        fetch(('/php/updateTopicName.php'), {method: 'POST', body: formData}).then(res =>{fetchData()
          generateTreeData()})
      }
      setOpen6(false);
      changedName()
  }).catch(() => {
    // Если поле пустое, показываем сообщение об ошибке
    // Можно добавить специальный блок для вывода сообщения об ошибке
  });
  };

  const handleCancel6 = () => {
    setOpen6(false);
  };
  const NavigateTo = useNavigate();
  const ToPrevMode = () =>{
    NavigateTo('/Catalouger(Preview)');
  }

  const Save = () =>{
    var idT = selectedNode.split("-")
    const formData = new FormData();
    formData.append('taskId', `${id}`);
    console.log(id)
    formData.append('type', `${TaskType}`);
    console.log(TaskType)
    formData.append('diff', `${TaskDiff}`);
    console.log(TaskDiff)
    
    formData.append('note', `${value2}`);
    console.log(value2)
    formData.append('descrip', `${value}`);
    console.log(value)
    fetch(('/php/SaveTaskChanges.php'), {method: 'POST', body: formData}).then(res =>{fetchData()
      generateTreeData()})
      dataSaved()
   
    
  }
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);
  let matchedKeys =  [];
  const handleClick = (top, pr,task) => {
    // Создаем новый массив элементов Breadcrumb
    var idLes = selectedNode.split("-")
    const newItems = [
      {
        title: SubjectTitle,
      },
      {
        type: 'separator',
        separator: '/',
      },
      {
    
        title: top,
      },
      {
        type: 'separator',
      },
      {
   
        title: pr,
      },
      {
        type: 'separator',
      },
      
    ];
    
    // Устанавливаем новый массив в состояние
    setBreadcrumbItems(newItems);
  };

  // const titleRender = (node) => {
  //   console.log(matchedKeys)
  //   console.log(node.key)
  //   console.log(expandedKeys)
  //   const commonPartStart = (document.getElementById('serch').value).indexOf(node.title);
  //   const commonPartEnd = commonPartStart + str2.length;
  //   const commonPart = str1.substring(commonPartStart, commonPartEnd);
  //   const start = str1.substring(0,commonPartStart);
  //   const end = str1.substring(commonPartStart, commonPartEnd);
  //   console.log(commonPart); 
  //   if(matchedKeys.includes(node.key) && (document.getElementById('serch').value).trim() != ''){
  //     return <span style={{ color:'#1677ff'}}>{commonPart}</span>
  //   }else{
  //     return <span style={{ color:'black'}}>{node.title}</span>
  //   }
  // }
  const onSearch = () => {
    const serchval = document.getElementById('serch').value

    const tree = generateTreeData();
    
    const findKeyChilde = (nodes) => {
      const boolArr = []
      const keysArr = []

      nodes.forEach(node => {
        let boolv = false
        if (node.title.includes(serchval)) {
          matchedKeys.push(node.key)
          boolv = true;
          boolArr.push(boolv);
            // matchedKeys.push(node.title);
        }
         if (node.children) {
          const arr2 = findKeyChilde(node.children);
          if(arr2.includes(true)){
          
            keysArr.push(node.key)
            
          }
         }

      }); 

      if(keysArr.length > 0){
        boolArr.push(true)
      }
      boolArr.unshift(keysArr)
      
      matchedKeys=keysArr
      return boolArr

      
    };
    const findKey = (nodes) => {
      const RRR =[]
      let find = false
      nodes.forEach(node => {
 
        if (node.title.includes(serchval)) {
       
         find = true
        }
        if (node.children) {
          const add = findKeyChilde(node.children);
          
          
          if(add.includes(true)){
            
          for(let j = 0; j < add[0].length; j++ ){
            RRR.push(add[0][j])
            
          }
            RRR.push(node.key)
            
          }
        }
      }); 
      if(RRR.length > 0 || find == true){
        RRR.push("Lesson-5")
      }  
       setExp(RRR)
       matchedKeys=RRR
    };

    findKey(tree);
    
  };

  const [expandedKeys, setExpandedKeys] = useState([])
const setExp = (keys) =>{
  setExpandedKeys(keys)



}
const [solName, setsolName] = useState([]);
const downloadFile = async () => {

  try {
    var fileUrl = `${works[Number(curId)].filePath}`;
    // Название файла
    var fileName = `${works[Number(curId)].fileName}`;
  
    // Создаем ссылку для загрузки файла
    var link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
  
    document.body.appendChild(link);
  
    // Автоматически нажимаем на ссылку для скачивания файла
    link.click();
  
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};

const downloadFile2 = async () => {
 
  try {
    var fileUrl = `${works[Number(curId)].solutPath}`;
    // Название файла
    var fileName = `${works[Number(curId)].solutName}`;
  
    // Создаем ссылку для загрузки файла
    var link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
  
    document.body.appendChild(link);
  
    // Автоматически нажимаем на ссылку для скачивания файла
    link.click();
  
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};
const props = {
  name: 'file',
  action: 'http://localhost:8081/upload',
  onChange(info) {
   
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      const fileName = (info.file.name).split('.');

   axios.post('http://localhost:8081/UploadFileName', {FileName:info.file.name,TaskId:2}).then(res => console.log(res))

      // Получение расширения файла
        fetchData()
    } else if (info.file.status === 'error') {
      alert(` file upload failed.`);
    }
  },
   
};
const handleUpload = async (file, onSuccess) => {
  const formData = new FormData();


  formData.append('file', file);
  
  formData.append('taskId', id);
  change(file.name,works[Number(curId)].solutName)

  fetch(('/php/upload.php'), {method: 'POST', body: formData}).then(res =>{fetchData()
    generateTreeData()})

return false
};

const handleUpload2 = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('taskId', id);
  change(works[Number(curId)].fileName,file.name,)
  fetch(('/php/upload2.php'), {method: 'POST', body: formData}).then(res =>{fetchData()
    generateTreeData()})
 return true
};

const handtTaskType= (value)=>{
  console.log(value)
  setfilterTask(value)
}
const handtPrType= (value)=>{
  console.log(value)
  setfilterPr(value)
}
const handtDiff= (value)=>{
  console.log(value)
  setfilterTDif(value)
}
const props2 = {
  
  onChange({ file, fileList }) {
    file.status = 'done'

    if (file.status !== 'uploading') {
      file.status = 'done'
      console.log(file, fileList);
    }
  },

  showUploadList: {
    showDownloadIcon: true,
    downloadIcon: <DownloadOutlined  onClick={downloadFile}/>,
    showRemoveIcon: true,
    removeIcon: <DeleteFilled onClick={(e) => console.log(e, 'custom removeIcofdfn event')} />,
  },
};
const [FileList,setFilesList] = useState( [
  {
    uid: '1',
    name: 'FileName',
    status: 'done',
    response: 'Server Error 500',
    // custom error message to show
 
  },
 
])
const chang = () => {
  setFilesList( [
    {
      uid: '1',
      name: 'dsd.png',
      status: 'done',
      response: 'Server Error 500',
      // custom error message to show
   
    },
   
  ])
}

const propsSol = {
  
  onChange({ file, fileList }) {
    file.status = 'done'

    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  
  showUploadList: {
    showDownloadIcon: true,
    downloadIcon: <DownloadOutlined  onClick={downloadFile2}/>,
    showRemoveIcon: true,
    removeIcon: <DeleteFilled onClick={(e) => console.log(e, 'custom removeIcofdfn event')} />,
  },
};
const DifficultItems = [
  {
    value: '1 уровень',
    label: '1 уровень(15 мин)',
  },{
    value: '2 уровень',
    label: '2 уровень(30 мин)',
  },{
    value: '3 уровень',
    label: '3 уровень(45 мин)',
  },{
    value: '4 уровень',
    label: '4 уровень(60 мин)',
  },{
    value: '5 уровень',
    label: '5 уровень(75 мин)',
  },{
    value: '6 уровень',
    label: '6 уровень(90 мин)',
  },
]
;
const TaskTypeItems =
[
  {
    value: 'Решение задачи',
    label: 'Решение задачи',
  },{
    value: 'Анализ текста',
    label: 'Анализ текста',
  },{
    value: 'Отчёт',
    label: 'Отчёт',
  },{
    value: 'Конспект',
    label: 'Конспект',
  },
  {
    value: 'Ответы на вопросы',
    label: 'Ответы на вопросы',
  },

]
const PrTypeItems =
[
  {
    value: 'Домашняя работа',
    label: 'Домашняя работа',
  },{
    value: 'Дифференциальный зачёт',
    label: 'Дифференциальный зачёт',
  },{
    value: 'Зачёт',
    label: 'Зачёт',
  },
  {
    value: 'Практическая работа',
    label: 'Практическая работа',
  },
  
  {
    value: 'Контрольная работа',
    label: 'Контрольная работа ',
  },{
    value: 'Проверочная работа ',
    label: 'Проверочная работа',
  },{
    value: 'Проектная работа',
    label: 'Проектная работа',
  },{
    value: 'Самостоятельная работа',
    label: 'Самостоятельная работа',
  },{
    value: 'Лабораторная работа',
    label: 'Лабораторная работа',
  }
]
const FilterItems= [
  {
    key: '1',
    label: 'Фильтры',
    children: [<Select id='Prd'
    showSearch
    placeholder="Сложность"
    optionFilterProp="children"
    onChange={handtDiff}
    options={DifficultItems}
  />,<Select
    showSearch
    placeholder="Тип задания"
    optionFilterProp="children"
   onChange={handtTaskType}
    options={TaskTypeItems}
  />,<Select
  id='Prt'
     showSearch
     placeholder="Тип контроля знаний"
     optionFilterProp="children"
     onChange={handtPrType}
     options={PrTypeItems}
   />]
  },
  
];
const [messageApi, contextHolder] = message.useMessage();
const dataSaved = () =>{
  messageApi.open({
    type:'success',
    content:'Изменения сохранен'
  })
}

const deleted = () =>{
  messageApi.open({
    type:'success',
    content:'Удалено'
  })
}
const changedName = () =>{
  messageApi.open({
    type:'success',
    content:'Переименовано'
  })
}
const addTask = () =>{
  messageApi.open({
    type:'success',
    content:'Задание добавленно'
  })
}
const addPr = () =>{
  messageApi.open({
    type:'success',
    content:'Контроль знаний добавлен'
  })
}

const addTopic = () =>{
  messageApi.open({
    type:'success',
    content:'Тема добавлена'
  })
}

const [checkedKeys, setCheckedKeys] = useState([]);
const [NodeKeys, setNodeKeys] = useState([]);
  const onCheck = (checkedKeys, info) => {
   let arr2 = []
   
    for (let i =0; i < info.checkedNodes.length; i++){
  
     
      const name = info.checkedNodes[i].key;
      
      if(!name.includes("PR")){
      
        let id = name.split("-")
        arr2.push(id[1])
        
        }
        
    }   
    
  setNodeKeys(arr2)
   
  
  };

const [treeHeight, setTreeHeight] = useState(410)

   return (
     <div className='catalboxes'>
      <Modal
      open={open2} width={623}
        title="Добавление темы"
        onOk={handleOk2}
        onCancel={handleCancel2}
       footer={[
          <Button  onClick={handleCancel2}>
            Отмена
          </Button>,
          <Button  type="primary" onClick={handleOk2}>
            Создать
          </Button>
          
        ]}
      > <Form form={form}> 
          <Form.Item
            
            name="topic"
            rules={[{required: true,message: 'Заполните это поле',},]}>
            <Input placeholder='Название темы' id="Mytop" name='Topicname'></Input>
          </Form.Item>
          </Form>
      </Modal>

      <Modal
        open={open3} width={623}
        title="Добавление задания"
        footer={[
          <Button  onClick={handleCancel3}>
            Отмена
          </Button>,
          <Button  type="primary" onClick={handleOk3}>
            Создать
          </Button>  
        ]}
        >
        <Form form={form}>
          <Form.Item
           
            name="taskName"
            rules={[{required: true,message: 'Заполните это поле',},]}>
            <Input placeholder='Название задания' name='Prname' id='TaskN' ></Input>
            </Form.Item>
          <Form.Item
         
            name="taskDiff"
            rules={[{required: true,message: 'Выберите сложность в этом поле',},]}>
            <Select onChange={onChange4}
              showSearch
              placeholder="Сложность"
              optionFilterProp="children"
              options={DifficultItems}/>
          </Form.Item>
          <Form.Item
   
            name="taskType"
            rules={[{required: true,message: 'Выберите тип задания в этом поле',},]}>
            <Select
              showSearch
              placeholder="Тип задания"
              optionFilterProp="children"
              onChange={onChange5}
              options={TaskTypeItems}/>
            </Form.Item>
            <Collapse items={items}   />
            
          </Form>
      </Modal>

      <Modal
      open={open4} width={623}
        title="Добавление лекции"
        onOk={handleOk4}
        onCancel={handleCancel4}
        footer={[
          <Button  onClick={handleCancel4}>
            Отмена
          </Button>,
          <Button  type="primary" onClick={handleOk4}>
            Создать
          </Button>
          
        ]}
      >
        
           <Input placeholder='Название лекции' id='LekN'></Input></Modal>
      <Modal
      open={open5 } width={623}
        title="Вы точно хотите удалить?"
        onOk={handleOk5}
        onCancel={handleCancel5}
        footer={[
          <Button  onClick={handleCancel5}>
            Нет
          </Button>,
          <Button  type="primary" onClick={handleOk5}>
            Да
          </Button>,
          
        ]}></Modal>
      <Modal
      open={open6} width={623}
        title="Переимнование"
        onOk={handleOk6}
        onCancel={handleCancel6}
        footer={[
          <Button  onClick={handleCancel6}>
            Отмена
          </Button>,
          <Button  type="primary" onClick={handleOk6}>
            Переименовать
          </Button>,
          
        ]}
      > 
      <Form form={form}>
        <Form.Item
          name="newName"
          rules={[{required: true,message: 'Заполните это поле',},]}>
          <Input placeholder='Новое название' id='updtName'></Input>
          </Form.Item>
        </Form>
      </Modal>
      
      <Modal
        open={open} width={623}
        title="Добавление контроля знаний"
        footer={[
          <Button  onClick={handleCancel}>
            Отмена
          </Button>,
          <Button  type="primary" onClick={handleOk}>
            Создать
          </Button>  
        ]}
    >
      <Form form={form}>
          <Form.Item
           
            name="prType"
            rules={[{required: true,message: 'Выберите контроль знаний в этом поле',},]}>
      <Select
      id='Prt'
          showSearch
          placeholder="Тип контроля знаний"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={PrTypeItems}
        /> </Form.Item>
      <Form.Item

            name="prDiff"
            rules={[{required: true,message: 'Выберите сложность в этом поле',},]}>  
        <Select id='Prd'
            showSearch
            placeholder="Сложность"
            optionFilterProp="children"
            onChange={onChange2}
            onSearch={onSearch}
            filterOption={filterOption}
            options={DifficultItems}
          />
        </Form.Item>
        
        <Form.Item
      
            name="prName"
            rules={[{required: true,message: 'Заполните это поле',},]}>
          <Input id='Prn' placeholder='Название'></Input>
        </Form.Item>   
        </Form> 
      </Modal>
       <div className='row'>
       {contextHolder}
         <div className='box1' data-aos="fade-right" data-aos-once="true">
         <div className='notetitle'><h3 className='notetx'>Навигация</h3></div>
         <Select
             className='tree'
             showSearch
             allowClear defaultactiveFirstOption
             width={500}
             placeholder="Выберите предмет" 
            onChange={handleContextMenu}
           id='subj'
             options={usersAndlessons}
           />
          <Input onChange={onSearch} id='serch' className='tree'  placeholder="Поиск"  />
          <Collapse className='tree'   items={FilterItems}  onChange={onCallapse} />
         <Dropdown overlay={getMenuForTitle(`Пр`)} trigger={['contextMenu']}>  
             <Tree onCheck={onCheck} expandedKeys={expandedKeys}   checkable onExpand={(keys) => setExp(keys)}  showIcon className='tree' showLine height={treeHeight} width={500} onSelect={handleSelect} onRightClick={handleRightClick}>
          
               <TreeNode  showIcon checkable={false}  icon={<ReadOutlined twoToneColor="#eb2f96" />}  title={SubjectTitle} key={"Lesson-5"}>
               {generateTreeData().map((node) => ( 
                 <TreeNode  showIcon icon={<FolderAddTwoTone/>} checkable={false}  title={node.title}  key={node.key} >
                   {node.children &&
                     node.children.map((child1) => (
                       <TreeNode  showIcon icon={<FolderAddTwoTone/>}     key={child1.key}  title={child1.title}>
                         {child1.children &&
                           child1.children.map((child2) => (
                             <TreeNode  showIcon  icon={<FileTextTwoTone />}     key={child2.key}   title={child2.title} />
                           ))}
                       </TreeNode>
                     ))}
                 </TreeNode>
               ))}
               </TreeNode> 
           </Tree>
           </Dropdown>
           <div>

    </div>
    

           {NodeKeys.length > 0 && <Button className='tree' type='primary' onClick={Export2Word}>Экспорт в Word</Button>}
           <div>
        
     </div>
         </div>
         <div className='box2' data-aos-delay='400' data-aos="fade-right" data-aos-once="true">
           <div className='main'>
            <Breadcrumb
              separator=""
               items={breadcrumbItems}/>
           <h3 id='TaskName'></h3>
            <div className="container">
                 <div data-color-mode="light" id='md'>
                   <MDEditor height={editorHeight} value={value2} onChange={setValue2} />
                 </div>
             </div> 
             <div>
              <div className='ChangeProps'>
              {TaskDiff.length > 0 && 
             <Select
                showSearch
                value={TaskDiff}
                
                placeholder="Сложность"
                optionFilterProp="children"
                onChange={handleContextMenu3}
                options={DifficultItems}
              />}
              
              {TaskType.length > 0 && 
            <Select
              value={TaskType}
                showSearch
                placeholder="Тип задания"
                optionFilterProp="children"
                id = 'TaskType'
                onChange={handleContextMenu4}
                options={TaskTypeItems}
              />}
              
        </div>
        {showFile == "Да" && <Upload fileList={fileList} beforeUpload = {() => true} {...props2}  customRequest={({ file, onSuccess }) => handleUpload(file)} maxCount={1} className='solutList2' accept="*"   >
    <Button icon={<UploadOutlined />}>Прикрепить файл</Button>
  </Upload>}

  {showSol == "Да" &&  <Upload fileList={fileList2} beforeUpload = {() => true} customRequest={({ file }) => handleUpload2(file)} maxCount={1}     className='solutList2' accept="*" {...propsSol}   >
      <Button icon={<UploadOutlined />}>Прикрепить решение</Button>
  </Upload>}

        <div className='ActionBtns'>  
                <Button type="primary" className='btnChangeMode' onClick={ToPrevMode}>Перейти в режим чтения</Button>
                <Button type="primary" className='btnSave' onClick={Save}>Сохранить</Button></div>
                
            </div>
           </div>
         </div>
         <div id='markded' className='box3' data-aos-delay='800' data-aos="fade-right" data-aos-once="true">
         <div className='notetitle'><h3 className='notetx'>Блокнот</h3></div>
           <div >
           
        
             <div >
                
                <div data-color-mode="light" >
                   <MDEditor height={editorHeight2}  className='Notebox' value={value} onChange={setValue} />
                 </div> 
                
             </div>
           </div>
         </div>
       </div>
     </div>
   );
           }
 export default ContextMenuTree;