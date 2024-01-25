import { useEffect, useState } from 'react';
import './App.css';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';

function App() {
  const [logued, setLogued]=useState(false);
  
  useEffect(()=>{
    function checkLogued(){
      let user=localStorage.getItem('user')
      user? setLogued(true):setLogued(false)
    }
    checkLogued();
  },[]);
  
  return (
    <div className='App'>
      <img src='cc-logo.png' style={{display:(logued)?"none":"block"}} id='logo' alt='logo'></img>
      {logued? <Dashboard setLogued={()=>setLogued(false)}/>:<Login setLogued={()=>setLogued(true)}/>}
    </div>
  );
}

export default App;
