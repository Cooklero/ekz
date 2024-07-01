import React from 'react'
import Goal from './components/goal/Goal';
import Navbar from './components/navbar/Navbar';
import News from './components/news/news';
import Partners from './components/partners/partners';
import Request from './components/Request/Request';
import Footer from './components/footer/Footer';
import { AppProvider } from './components/context';


<meta name="viewport" content='width=device-width,initial-scale=1.0'></meta>
function App() {

  return (
    <> 
    <AppProvider>
      <Navbar /> 
      <Goal/>
        <News />
      <Partners />
      <Request/>  
      <Footer/> 
      </AppProvider>
    </>
  );
}

export default App;
