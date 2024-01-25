import React from "react";

export const Home = ({setActive, active}) => {
  const nombre=localStorage.getItem('nombre');

  return (
    <div className="container mt-4">
      <header>
        <h2 style={{fontSize:90, letterSpacing:"-8px"}}>Hi, {nombre}.</h2>
        <h3 style={{fontSize:40, letterSpacing:"-3px"}}>Let´s start today</h3>
      </header>
      <div className="home-sections row mt-5 mb-4">
        <div className="camposDiv col-12" style={{position:"relative"}} onClick={()=>{setActive('Campos')}}>
          <div>
            <div style={{backgroundImage: "url(./img/pexels-steven-hylands-1650868.jpg)"}}></div>
          </div>
          <p style={{position:"absolute", top:"1em", left:"1em", color:"white",fontSize:30}}>
            Campos
          </p>
        </div>
        <div className="col-12 mt-1">
          <div className="row ">
            <div className="col-4 trabajadoresDiv" style={{position:"relative"}} onClick={()=>{setActive('Trabajadores')}}>
              <div>
                <div style={{backgroundImage: "url(img/pexels-balazs-simon-6874481.jpg)"}}></div>
              </div>
              <p className="d-none d-md-block" style={{position:"absolute", top:"1em", left:"1em", color:"white",fontSize:30}}>
                Trabajadores
              </p>
            </div>
            <div className="col-4  actividadesDiv" style={{position:"relative"}} onClick={()=>{setActive('Actividades')}}>
              <div>
                <div style={{backgroundImage: "url(img/pexels-pixabay-159519.jpg)"}}></div>
              </div>
              <p className="d-none d-md-block" style={{position:"absolute", top:"1em", left:"1em", color:"white",fontSize:30}}>
                Actividades
              </p>
            </div>
            <div className="col-4 maquinasDiv" style={{position:"relative"}} onClick={()=>{setActive('Maquinaria')}}>
              <div>
                <div style={{backgroundImage: "url(img/pexels-jannis-knorr-2933243.jpg)"}}></div>
              </div>
              <p className="d-none d-md-block" style={{position:"absolute", top:"1em", left:"1em", color:"white",fontSize:30}}>
                Maquinas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
