import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import TeacherInfoPage from './routes/TeacherInfoPage'
import StudentInfoPage from './routes/StudentInfoPage'
import AboutUs from './routes/AboutUs'
import Login from './routes/Login'
import Recovering from './routes/Recovering'
import Regr from './routes/Registration'
import PersAccMainPage from './routes/PersAccMainPage'
import Profile from './routes/Profile';
import Help from './routes/Help';
import Catalouger from './routes/Cataloug';
import Cataloguer_prev from './routes/Catalog_preview';
import Admin from './routes/AdminPg';
import { AppProvider } from './components/context';
ReactDOM.render(
  <AppProvider>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/teacherinfo' element={<TeacherInfoPage/>}/>
      <Route path='/studentinfo' element={<StudentInfoPage/>}/>
      <Route path='/aboutus' element={<AboutUs/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/registration' element={<Regr/>}/>
      <Route path='/PersAccMain' element={<PersAccMainPage/>}/>
      <Route path='/Profile' element={<Profile/>}/>
      <Route path='/help' element={<Help/>}/>
      <Route path='/Catalouger' element={<Catalouger/>}/>
      <Route path='/Catalouger(Preview)' element={<Cataloguer_prev />}/>
      <Route path='/Admin' element={<Admin/>}/>
      <Route path='/recovering' element={<Recovering/>}/>
    </Routes>
  </BrowserRouter>
  </AppProvider>,
  document.getElementById('root')
);