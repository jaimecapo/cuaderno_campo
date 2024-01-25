import React, { useEffect, useState } from "react";
import { Actividad } from "./details/Actividad";
import { Calendario } from "./objects/Calendario";
import { NuevaActividad } from "./forms/NuevaActividad";


export const Actividades = () => {
  let [focusActivity,setFocusActivity]=useState(null);
  let [onlyVigent, setOnlyVigent] = useState(true);
  let [activities, setActivities] = useState([]);
  let [vigentActivities, setVigentActivities] = useState([]);
  let [creation, setCreation]=useState(false);
  
  const deleteActividad=(actividadDelete)=>{
    let newActividad=[]
    activities.forEach(actividad=>{
      if(actividad!==actividadDelete) newActividad.push(actividad) ;
    });
    setActivities(newActividad);

    let newvigentactivities=[]
    vigentActivities.forEach(actividad=>{
      if(actividad!==actividadDelete) newvigentactivities.push(actividad) ;
    });
    setVigentActivities(newvigentactivities);
  }

  useEffect(() => {
    let today = new Date();
    let newActivities = [];
    let newVigent = [];
    async function getActivities() {
      const id=localStorage.getItem('user');
      await fetch("https://campo.talkandeat.es/api/actividades?id_usuario="+id)
        .then((reponse) => reponse.json())
        .then((data) => {
          if(!data.code)  data.forEach((activity) => {
            let endDate = new Date(activity.fecha_final);
            newActivities.push(activity);
            if (endDate > today) newVigent.push(activity);
          });
        });
      setActivities(newActivities);
      setVigentActivities(newVigent);
    }

    getActivities();
  }, []);

  const renderActivities=(arrayActivities )=>{
    return arrayActivities.map((activity, key)=>{
      return ( 
      <li className="activity" key={key} style={{fontSize:"20px"}}>
      <button className="btn-activities" onClick={()=>setFocusActivity(activity)}>
        <img src="./img/calendario-reloj.png" width="30" alt="btnmore" />
        <div>
          <p className="title">
            <b>{activity.titulo}</b>
          </p>
          <p className="area">area {activity.campo.id}</p>
          <p className="fecha">
            {activity.fecha_inicio} - {activity.fecha_final}
          </p>
          <p className="desc">{activity.descripcion}</p>
        </div>
      </button>
    </li> );
    })
  }

  
  if(focusActivity!==null) return <Actividad activity={focusActivity} deleteActividad={()=>{deleteActividad(focusActivity)}} setFocusActivity={()=>setFocusActivity(null)}/>;
  else if (creation) return <NuevaActividad setCreation={()=>setCreation(false)}/>
  else return (
    <div className="container actividades pt-2 p-5">
      <Calendario/>
      <div onClick={()=>{setCreation(true)}} className="mt-5 mb-3" style={{display:"flex", gap:"1em", alignItems:"center"}}><h2 >Actividades</h2> <button className="btn_addActividad">+</button></div>
      <ul className="container listActividades">
        <li className="more-activities">
          <button
            onClick={() =>
              onlyVigent ? setOnlyVigent(false) : setOnlyVigent(true)
            }
            className="btn-activities"
          >
            <img src="./img/plus-pequeno-white.png" width="30" alt="btnmore" />
            <p>
              {onlyVigent
                ? "Actividades anteriores ..."
                : "Ocultar actividades anteriores..."}
            </p>
          </button>
        </li>
        { onlyVigent? renderActivities(vigentActivities): renderActivities(activities)}
      </ul>
    </div>
  );
};
