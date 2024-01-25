import React, { useState } from "react";
import { Trabajadores } from "./Trabajadores";
import { Actividades } from "./Actividades";
import { Home } from "./Home";
import { Campos } from "./Campos";
import { Maquinaria } from "./Maquinaria";

export const Dashboard = ({setLogued}) => {
  const [active, setActive] = useState("Home");

  const renderNavOptions = () => {
    const sections = [
      { name: "Home", icon: "home" },
      { name: "Actividades", icon: "calendario-reloj" },
      { name: "Campos", icon: "zanahoria" },
      { name: "Trabajadores", icon: "maletin" },
      { name: "Maquinaria", icon: "camion-contenedor" },
    ];

    return sections.map((section, index) => {
      return(
      <li key={index} className={section.name === active ? "active" : ""} onClick={()=>{
        if(active!==section.name) setActive(section.name);
      }}>
        <span>
          <span></span>
        </span>
        <span>
          <span></span>
        </span>
        <div>
          <img
            src={
              section.name === active
                ? "img/" + section.icon + "-green.png"
                : "img/" + section.icon + ".png"
            }
            width="30"
            alt=""
          />
          <p className="d-none d-lg-block">{section.name}</p>
        </div>
      </li>
      );
    });
  };
  function unLog(){
    document.querySelector('body').style.backgroundColor='#1b1f25'
    localStorage.removeItem('user');  
    setLogued(false); 
  }
  return (
    <div className="container-fluid dashboard ">
      <div className="row ">
        <nav className="col-3" style={{position: "relative"}}>
          <header>
            <h1 className="d-none d-lg-block">Web_Camp</h1>
          </header>
          <ul>{renderNavOptions()}</ul>
          <button onClick={()=>{unLog()}} style={{backgroundColor:"#2bc74f",border:"1px solid white", padding:'0.75em', borderRadius:'50%', position:"absolute", bottom:'1em', left:'1em'}}><img src="./img/desconectar.png" width={50} height={50} alt="disconect button" /></button>
        </nav>
        <section className="col-9">
          {active==='Home'? <Home setActive={setActive} active={active}/>:""}
          {active==='Trabajadores'? <Trabajadores/>:""}
          {active==='Actividades'? <Actividades/>:""}
          {active==='Campos'? <Campos/>:""}
          {active==='Maquinaria'? <Maquinaria/>:""}
        </section>
      </div>
    </div>
  );
};
