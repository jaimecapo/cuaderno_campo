import React, { useState } from 'react'

export const Maquina = ({maquina, setFocusMaquina, deleteMaquina}) => {
    let [onlyVigent, setOnlyVigent]=useState(true);
    const allActivities= maquina.seUtilizaPara;
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
                <li key={key} className="maquina-activity">
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
    
    async function borrarMaquina(){
      const confirmation=window.confirm(`Estás seguro de que quieres desacerte de ${maquina.nombre}?` );
      if(confirmation){
        const body={
          id:maquina.id
        };
        try {
          await fetch( "https://campo.talkandeat.es/api/borrarMaquina" , {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          }).then(response=>{response.json()}).then(data=>{
            deleteMaquina();
            alert(`Maquina "${maquina.nombre}" borrada correctamente.`);
          });
        } catch (error) {
          console.log(error.message);
        }
      }
    }

    return (
        <div className="maquina-info-screen m-3 m-md-4 m-lg-5">
          <div className="row">
            <div className="col-12 col-lg-7">
              <div className="maquinahead">
                <h2 style={{display:"flex", alignItems:"center", gap:"0.5em"}}> <button onClick={()=>setFocusMaquina()}>&#5176;</button>{maquina.nombre}</h2>
              </div>
              
              <div className="info row">
                <p className="info-header mt-5 mb-4">Información de la Máquina</p>
                <div className="col-12 col-md-6">
                  <p>
                    <b>Id</b>: {maquina.id}
                  </p>
                </div>
                <div className="col-12 col-md-6">
                  <p>
                    <b>Nombre</b>: {maquina.nombre}
                  </p>
                </div>
                <div className="col-12 col-md-6">
                  <p>
                    <b>Marca</b>: {maquina.marca}
                  </p>
                </div>
                <div className="col-12 col-md-6">
                  <p>
                    <b>Modelo</b>: {maquina.modelo}
                  </p>
                </div>
                <div className="col-12 col-md-6">
                  <p>
                    <b>Matrícula</b>: {maquina.matricula}
                  </p>
                </div>
                <div className="col-12 col-md-6">
                  <p>
                    <b>Activa</b>: {maquina.activa}
                  </p>
                </div>
                <div className="col-12 col-md-6">
                  <p>
                    <b>Alquilada</b>: {maquina.alquilada}
                  </p>
                </div>
                <div className="col-12 col-md-6">
                  <p>
                    <b>Tipo</b>: {maquina.tipo}
                  </p>
                </div>
                <div className="col-12 col-md-6">
                  <p>
                    <b>Adquisicion</b>: {maquina.adquisicion}
                  </p>
                </div>
                <div className="col-12 col-md-6">
                  <p>
                    <b>Ultima revision</b>: {maquina.ultima_revision}
                  </p>
                </div>
                <div className="col-12 col-md-6">
                  <p>
                    <b>Capacidad</b>: {maquina.capacidad}
                  </p>
                </div>
              </div>
              <div className="div_btnBorrar">
              <button onClick={(event)=>{borrarMaquina(); setFocusMaquina()}}>
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
}
