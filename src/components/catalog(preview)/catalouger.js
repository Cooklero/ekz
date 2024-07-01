
import React, { useState, useEffect,useContext } from 'react';
import {Descriptions, Collapse,Radio, Breadcrumb ,Modal, TimePicker, Select, Input, Tree, Menu, Dropdown, Button} from 'antd';
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
   return (
     <Menu>
       <Menu.Item key="создать" onClick={onSelectCreate}>
         Создать тему
       </Menu.Item>
     </Menu>
   );
 }
 


 
 const ContextMenuTree = () => {
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

  const { value9 } = useContext(AppContext);

  

 const mkdStr = '';
   const [value, setValue] = useState(mkdStr);
   const mkdStr2 = '';
   const [value2, setValue2] = useState(mkdStr2);
   const [DataTree, setTree] = useState('');
  const { TreeNode } = Tree;
   const handleCreateNode = () => {
     // Logic to create a new node
     console.log('Creating a new node...');
     setSelectedNode(null);
   }
   const handleDeleteNode = () => {
     // Logic to delete selected node
     console.log('Deleting selected node...');
     
   }
   const menu = (
     <ContextMenu onSelectCreate={handleCreateNode} />
   );
   //Выгрузка данных из бд и их подготовка для генерации в теге tree
    const handleSelect = (_, info) => {

      if (info.node.props.eventKey.includes("WR")) {
     
        var idT = info.node.props.eventKey.split("-")
        setSelectedNode(idT[1])
       for( var w = 0; w < works.length; w++){
     
          
        if (String(works[w].id_works) == String(idT[1])) {
          const button = document.getElementById('TaskName');
          handleClick(idT[2],idT[3],idT[4],works[w].type,works[w].difficulty,works[w].time,works[w].date)

          setcurId(w)
          button.textContent = `${works[w].title}`; 
         setValue2(works[w].description)
         setValue(works[w].noteText)
         setshowFile(works[w].HaveFile)
         setshowSol(works[w].HaveSolut)
     
          }
      }
     }
   };

   const [editorHeight, setEditorHeight] = useState(500);

   const [SubjectTitle, setSubjectTitle] = useState('Предмет не выбран');
   const [AllSubject, setAllSubject] = useState({});
  const [usersAndlessons, setArr] = useState([]);
  const [topics, settopics] = useState([]);
  const [pr, setpr] = useState([]);
  const [works, setworks] = useState([]);
  useEffect(()=>{
    Aos.init({duration:1000})
  })
  const [curId, setcurId] = useState('9');
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
  useEffect(() => {
    const handleResize = () => {
      // Реагируем на изменения размеров окна здесь
      setEditorHeight(window.innerHeight - 50); // Высота окна минус отступ
    };
  
    handleResize(); // Инициализация
    window.addEventListener('resize', handleResize);

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
          console.log(usersAndlessons)
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
    
    fetchData();
  }, []);

  
const [values2,setValues2] = useState({
 
  TopiId:'',
  prName:'',

})
const [values3,setValues3] = useState(-5)


  
 //Генерация дерева
 const generateTreeData = () => {
  const treeData = [];
  console.log(usersAndlessons[0])
  for (var t = 0; t < topics.length; t++) {
     if (topics[t].subject_id == values3) {
       const childrenLevel1 = [];

       for( var p = 0; p < pr.length; p++){
           if (pr[p].id_topic == topics[t].topic_id ) {
              

               if(filterPr != "0" ){
                 if(pr[p].prName.includes(filterPr)){

                 }else{
                   continue;
                 }
               }
               else{
                 
               }

               const childrenLevel2 = [];
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

                   if(filterTask != "0" ){
                     if(works[w].type.includes(filterTask)){
 
                     }else{
                       continue;
                     }
                   }
                   else{
                     
                   }
                   childrenLevel2.push({
                     title: `${works[w].title}`,
                     isLeaf:true,
                     icon: <FileTextTwoTone />,
                     key:`WR -${works[w].id_works}-${topics[t].topicName}-${pr[p].prName}-${works[w].title}`
                   });
                   }
               }

               childrenLevel1.push({
                 title: `'${pr[p].prName}'`,
                 children: childrenLevel2,
                 key:`PR -${pr[p].pr_id}`,
                 icon: <FolderOpenTwoTone />,
               });
            }
       }

           treeData.push({
             title: `Тема '${topics[t].topicName}'`,
             children: childrenLevel1,
             key:`TP -${topics[t].topic_id}`,
             icon: <FolderOpenTwoTone />,
         });
     }
  
 }
return treeData;
};

   const [currentNodeTitle, setCurrentNodeTitle] = useState(null);
   const handleContextMenu2 = (title) => {
     console.log(title);
    
   };
   const getMenuForTitle = (title) => {

     if (selectedNode.includes("PR")) {
       return (
         <Menu>
          <Menu.Item key="1" onClick={showModal3}>Создать Задание</Menu.Item>
           {/* <Menu.Item key="2">Создать Тест</Menu.Item> */}
           <Menu.Item key="3" onClick={showModal4}>Создать Лекцию</Menu.Item>
           <Menu.Item key="4" onClick={showModal5}>Удалить </Menu.Item>
           <Menu.Item key="5" onClick={showModal6}>Переименовать</Menu.Item>
         </Menu>
       );
     } else if (selectedNode.includes("WR")) {
       return (
         <Menu>
           <Menu.Item key="6" onClick={showModal5}>Удалить </Menu.Item>
           <Menu.Item key="7" onClick={showModal6}>Переименовать</Menu.Item>
         </Menu>
       );
     }else if ( selectedNode.includes("Lesson")){
       return (
         <Menu>
           <Menu.Item key="8" onClick={showModal2}>Создать тему</Menu.Item>
         </Menu>
       );
     }else if (selectedNode.includes("TP"))  {
       return (
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
   
//Выпадающий список и время
const [currentD, setCurrentD] = useState('null');
const [currentT, setCurrentT] = useState('null');

const [filterTask, setfilterTask] = useState('0');
const [filterTDif, setfilterTDif] = useState('0');
const [filterPr, setfilterPr] = useState('0');

const [showFile, setshowFile] = useState('');
const [showSol, setshowSol] = useState('');

const [currentTime, setCurrentTime] = useState('null');
const [currentTDif, setCurrentTDif] = useState('null');
const [currentType, setCurrentType] = useState('null');
const [currentInclSol, setCurrentInclSol] = useState('null');
const onChange6 = (value) => {
  setCurrentInclSol(value)
  console.log(`selected ${value}`);
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
      <Radio value={1}>Нет</Radio>
      <Radio value={2}>Да</Radio>
      
    </Radio.Group>,<h3>Тип задания</h3>,<Select onChange={onChange5}
    showSearch
    placeholder="Конспект"
    optionFilterProp="children"
    
    options={[
      {
        value: 'Решение задачи',
        label: 'Решение задачи',
      },{
        value: 'Анализ текста',
        label: 'Анализ текста',
      },{
        value: 'Отчёт',
        label: 'Отчёт',
      },
 
    ]}
  />,]
  },
  
];
const onChange = (value) => {
  setCurrentT(value)
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

const onChange4 = (value) => {
  setCurrentTDif(value)
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
var idLes = selectedNode.split("-")
    
    

    axios.post('http://localhost:8081/p', {Pri:idLes[1],Prn:currentT+` '${document.getElementById("Prn").value}'`, Prd:currentD}).then(res => console.log(res))
    setOpen(false);
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
    var idLes = selectedNode.split("-")

    axios.post('http://localhost:8081/q', {TopicID:idLes[1], NameTop: `Тема ${document.getElementById("Mytop").value}` }).then(res => console.log(res))
    

    setOpen2(false);
  };

  const handleCancel2 = () => {
    setOpen2(false);
  };

  const [open3, setOpen3] = useState(false);

  const showModal3 = () => {
    setOpen3(true);
  };

  const handleOk3 = () => {
    var idT = selectedNode.split("-")
   
    axios.post('http://localhost:8081/tasks', {Pri:idT[1], TaskN:`Задание '${document.getElementById("TaskN").value}'`, Diff:currentTDif, Time:String(currentTime),Type:currentType,Sol:String(currentInclSol)}).then(res => console.log(res))
    generateTreeData()
    setOpen3(false);
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
    setOpen4(false);
  };

  const handleCancel4 = () => {
    setOpen4(false);
  };

  const [open5, setOpen5] = useState(false);

  const showModal5 = () => {
    setOpen5(true);
  };

  const handleOk5 = () => {
    var idT = selectedNode.split("-")

    setOpen5(false);
  };

  const handleCancel5 = () => {
    setOpen5(false);
  };

  const [open6, setOpen6] = useState(false);

  const showModal6 = () => {
    setOpen6(true);
  };

  const handleOk6 = () => {
    
    setOpen6(false);
  };

  const handleCancel6 = () => {
    setOpen6(false);
  };
  const NavigateTo = useNavigate();
  const ToPrevMode = () =>{
    NavigateTo('/Catalouger');
  }
  
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
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);
  const [taskProp, settaskProp] = useState([]);
  const handleClick = (top, pr,task, type,difficulty,time,date) => {
    // Создаем новый массив элементов Breadcrumb
   
    var id = Number(selectedNode)

    
    const itemsProp = [
      {
        key: '1',
        label: 'Тип задания',
        children: `${type}`,
      },
      {
        key: '2',
        label: 'Сложность',
        children: `${difficulty}`,
      },
      {
        key: '3',
        label: 'Время выполнения',
        children: `${time} мин`,
      },
      {
        key: '4',
        label: 'Дата создания',
        children: `${date}`,
      },
      
    ];
    const newItems = [
      {
        title: 'Алгоритмизация',
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
    settaskProp(itemsProp);
  };
  const onSearch = () => {
    const serchval = document.getElementById('serch').value

    const tree = generateTreeData();
    const matchedKeys = [];
    const findKeyChilde = (nodes) => {
      const boolArr = []
      const keysArr = []
      nodes.forEach(node => {
        let boolv = false
        if (node.title.includes(serchval)) {
          
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
    };

    findKey(tree);

  };

  const [expandedKeys, setExpandedKeys] = useState([])
const setExp = (keys) =>{
  setExpandedKeys(keys)



}
const DifficultItems = [
  {
    value: '1 уровень',
    label: '1 уровень',
  },{
    value: '2 уровень',
    label: '2 уровень',
  },{
    value: '3 уровень',
    label: '3 уровень',
  },{
    value: '4 уровень',
    label: '4 уровень',
  },{
    value: '5 уровень',
    label: '5 уровень',
  },{
    value: '6 уровень',
    label: '6 уровень',
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
 

  const [selectedSubjects, setselectedSubjects] = useState([])
  const [subjectsList, setsubjectsList] = useState([])
  const [subjects, setsubjects] = useState([])
  const fetchData2 = async () => {
    try {
      
    } catch (error) {
      console.error('Ошибкаd приfdfdf полученdsdии данных:', error);
    }
  }; 
  fetchData2()
  
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
const [treeHeight, setTreeHeight] = useState(410)
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
   return (
     <div className='catalboxes_preview'>
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
          </Button>,
          
        ]}
      ><Input placeholder='Название темы' id="Mytop" name='Topicname'></Input></Modal>
      <Modal
      open={open3} width={623}
        title="Добавление задания"
        onOk={handleOk3}
        onCancel={handleCancel3}
        footer={[
          <Button  onClick={handleCancel3}>
            Отмена
          </Button>,
          <Button  type="primary" onClick={handleOk3}>
            Создать
          </Button>
          
        ]}
      ><Input placeholder='Название задания' name='Prname' id='TaskN' ></Input>
      <Select onChange={onChange4}
    showSearch
    placeholder="Сложность"
    optionFilterProp="children"
   
    options={[
      {
        value: 'Легко',
        label: 'Легко',
      },{
        value: 'Средне',
        label: 'Средне',
      },{
        value: 'Сложно',
        label: 'Сложно',
      },
 
    ]}
  />
   <TimePicker onChange={onChange3} style={{width:250}} placeholder='Время выполнения' showNow={false}  format="mm" minuteStep={5}/>
      <Collapse  className='tree'   items={FilterItems}  onChange={onCallapse} /></Modal>
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
      ><Input placeholder='Название лекции' id='LekN'></Input></Modal>
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
      ><Input placeholder='Новое название'></Input></Modal>
      <Modal
        open={open} width={623}
        title="Добавление контроля знаний"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="Отмена" onClick={handleCancel}>
            Отмена
          </Button>,
          <Button key="Создать" type="primary"  onClick={handleOk}>
            Создать
          </Button>,
          
        ]}
      >
 <Select
 id='Prt'
    showSearch
    placeholder="Тип контроля знаний"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={filterOption}
    options={[
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
    ]}
  />
<Select id='Prd'
    showSearch
    placeholder="Сложность"
    optionFilterProp="children"
    onChange={onChange2}
    onSearch={onSearch}
    filterOption={filterOption}
    options={[
      {
        value: 'Легко',
        label: 'Легко',
      },{
        value: 'Средне',
        label: 'Средне',
      },{
        value: 'Сложно',
        label: 'Сложно',
      },
 
    ]}
  />
      
     <Input id='Prn'  placeholder='Название'></Input>
      </Modal>
     
       <div className='row'>
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
         <Input onChange={onSearch} id='serch'   className='tree'   placeholder="Поиск"  />
          <Collapse className='tree'  items={FilterItems}  onChange={onCallapse}   />
       
          <Tree onCheck={onCheck} checkable  expandedKeys={expandedKeys}  onExpand={(keys) => setExp(keys)}  showIcon className='tree' showLine height={treeHeight} width={500} onSelect={handleSelect} >
          
          <TreeNode checkable={false}  icon={<ReadOutlined twoToneColor="#eb2f96" />} showIcon   title={SubjectTitle} key={"Lesson-5"}    >
          {generateTreeData().map((node) => ( 
            <TreeNode icon={<FolderAddTwoTone/>} checkable={false} showIcon   title={node.title}  key={node.key} onMouseEnter={() => handleContextMenu2(node.key)}>
              {node.children &&
                node.children.map((child1) => (
                  <TreeNode  icon={<FolderAddTwoTone/>} showIcon    conContextMenu={(e) => handleContextMenu2(e, child1.title)}  key={child1.key}  title={child1.title}>
                    {child1.children &&
                      child1.children.map((child2) => (
                        <TreeNode  showIcon icon={<FileTextTwoTone />}   onContextMenu={(e) => handleContextMenu2(e, child1.title)}  key={child2.key}   title={child2.title} />
                      ))}
                  </TreeNode>
                ))}
            </TreeNode>
          ))}
          </TreeNode> 
      </Tree>
      {NodeKeys.length > 0 && <Button className='tree' type='primary' onClick={Export2Word}>Экспорт в Word</Button>}
           <div>
        
     </div>
         </div>
         <div className='box2'  data-aos-delay='400' data-aos="fade-right" data-aos-once="true">
           <div className='main'>
           <Breadcrumb
              separator=""
               items={breadcrumbItems}/>
           <h3 id='TaskName'></h3>
           <Descriptions
        title="Информация о задании"
       
      
        items={taskProp}
      />
            <div className="taskContainer">
                 <div data-color-mode="light">
                 <MDEditor.Markdown  source={value2} className="scrollable" >

                 </MDEditor.Markdown>
                 </div>
             </div> 
             {showFile == "Да" && <Button icon={<DownloadOutlined /> } onClick={downloadFile}>Скачать файл</Button>}

  {showSol == "Да" &&  <Button icon={<DownloadOutlined />} onClick={downloadFile2}>Скачать решение</Button>}
             <div className='BtnToEditMode'>
              <Button className='btnChangeMode' type='primary' onClick={ToPrevMode}>Перейти в режим редактирования</Button>

            </div>
           </div>
         </div>
         <div className='box3'  data-aos-delay='800' data-aos="fade-right" data-aos-once="true">
          <div className='notetitle'><h3 className='notetx'>Блокнот</h3></div>
           <div className='noteMain'>
           <div className='note'>
            
            </div>
       
             <div className="noteContain">
                 <div data-color-mode="light">
                 <MDEditor.Markdown  style={{ height: `${editorHeight}px`, overflow: 'auto' }}  source={value} className="scrollable" >

                 </MDEditor.Markdown>
                 </div> 
             </div>
           </div>
         </div>
       </div>
     </div>
   );
           }
 export default ContextMenuTree;