import React, { useState } from "react";

export const Trabajador = ({worker , focusWorker ,deleteWorker}) => {
    let [onlyVigent, setOnlyVigent]=useState(true);
    const allActivities= worker.actividades;
    const vigentActivities=[];
    const setVigentActivities=()=>{
        const today=new Date();
        allActivities.map((activity)=>{
            let date=new Date(activity.fecha_final);
            if(date>today)vigentActivities.push(activity);
            return "";
        });
    }
    setVigentActivities();  
    
    const renderActivities=(arrayActivities)=>{
        return arrayActivities.map((activity,key)=>{
            return (
                <li key={key} className="worker-activity">
          <button className="btn-activities">
            <img
              src="./img/calendario-reloj.png"
              width="30"
              alt="btnmore"
            />
            <div>
              <p className="title">
                <b>
                  {activity.titulo}
                </b>
              </p>
              <p className="area">area {activity.id_campo}</p>
              <p className="fecha">
                {activity.fecha_inicio} - {activity.fecha_final}
              </p>
              <p className="desc"> {activity.descripcion} </p>
            </div>
          </button>
        </li>
            );
        })
    }

    async function borrarTrabajador(){
      const confirmation=window.confirm(`Estás seguro de que quieres eliminar a ${worker.name} ${worker.surname}` );
      if(confirmation){
        const body={
          nif:worker.nif
        };
        try {
          await fetch( "https://campo.talkandeat.es/api/borrarTrabajador" , {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          }).then(response=>{response.json()}).then(data=>{
            deleteWorker();
            alert(`Trabajador/a "${worker.name}" borrado/a correctamente.`);
          });
        } catch (error) {
          console.log(error.message);
        }
      }
    }

    return (
    <div className="employe-info-screen m-3 m-md-4 m-lg-5">
      <div className="row">
        <div className="col-12 col-lg-7">
          <div className="workerhead">
            <h2 style={{display:"flex", alignItems:"center", gap:"0.5em"}}> <button onClick={()=>focusWorker()}>&#5176;</button>{worker.name}</h2>
          </div>
          
          <div className="info row">
            <p className="info-header mt-5 mb-4">Información trabajador</p>
            <div className="col-12 col-lg-6">
              <p>
                <b>Nombre</b>: {worker.name}
              </p>
            </div>
            <div className="col-12 col-lg-6">
              <p>
                <b>Apellidos</b>: {worker.surname}
              </p>
            </div>
            <div className="col-12 col-lg-6">
              <p>
                <b>NIF</b>: {worker.nif}
              </p>
            </div>
            <div className="col-12 col-lg-6">
              <p>
                <b>Telefono</b>: {worker.phone}
              </p>
            </div>
            <div className="col-12 col-lg-6">
              <p>
                <b>Correo</b>: {worker.email}
              </p>
            </div>
            <div className="col-12 col-lg-6">
              <p>
                <b>Puesto</b>: {worker.puesto}
              </p>
            </div>
          </div>
          <div className="div_btnBorrar" onClick={(e)=>{borrarTrabajador();focusWorker()}}>
              <button>
                <p>Borrar</p>
                <span className="span1"></span>
                <span className="span2"></span>
                <span className="span3"></span>
                <span className="span4"></span>
              </button>
            </div>
        </div>
        <div className="col-12 col-lg-5 mt-5 mt-lg-0">
          <ul>
            <li className="more-activities">
              <button onClick={()=>onlyVigent? setOnlyVigent(false):setOnlyVigent(true)} className="btn-activities">
                <img
                  src="./img/plus-pequeno-white.png"
                  width="30"
                  alt="btnmore"
                />
                <p>{onlyVigent? "Actividades anteriores ...":"Ocultar actividades anteriores..."}</p>
              </button>
            </li>
            {onlyVigent? renderActivities(vigentActivities): renderActivities(allActivities) }
          </ul>
        </div>
      </div>
    </div>
  );
};
