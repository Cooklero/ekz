import React from 'react';
import Navbar from '../components/navbar/Navbar';
import StudentInfo from '../components/StudentInfo/StudentInfo';
import Footer from '../components/footer/Footer';


const StudentInfoPage = () =>{
    return(
        <>
        <Navbar/>
        
        <StudentInfo/>
        <Footer/>
        </>
    )
}

export default StudentInfoPage