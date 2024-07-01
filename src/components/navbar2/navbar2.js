import React,{useState,useEffect, useContext} from 'react'
import './navbar2.css'
import ProfImage from '../../images/user (1) 6.png'
import { AppContext } from '../context';

const Navbar2 =() => {

  const { value9, setValue9 } = useContext(AppContext);
  const [image, setImageData] = useState(null);
  const [ name, setName ] = useState('');
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
  const name =findCookie("name"); 
 setName(name)

 
    const fetchImageData = async () => {
      const avatar =findCookie("avatar");
      const formData = new FormData();
      
        if(avatar.length > 10){
          setImageData(avatar);
        }else{
          setImageData(ProfImage);
          console.log('here')
        }
      
      
     
    };
    
    fetchImageData()
  
},[]);
    
 
  return (
    <div className='navbar2'>
      <div className='contain'>
        <div className='logo'>
            <div className='logo-img'></div>
            <div className='Titles'>
            <h5>ЭКЗамен</h5>
            <h6>Электронная картотека знаний</h6>
            </div>
        </div>
       
    <div className='logo-box'>

      <h3 >{name}</h3>
      <img className='AvatarImage' width={50} height={50} src={`${image}`}></img>
    </div>
      
      </div>
    </div>
  );
}

export default Navbar2;