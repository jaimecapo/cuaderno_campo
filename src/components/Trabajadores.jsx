import React, { useEffect, useState } from "react";
import { NuevoTrabajador } from "./forms/NuevoTrabajador";
import { Trabajador } from "./details/Trabajador";


export const Trabajadores = () => {
  let [workers, setWorkers] = useState([]);
  let [focusWorker, setFocusWorker]= useState(null);
  let [creation, setCreation]=useState(false);


  useEffect(()=>{
    async function getWorkers(){
      let newWorkers=[];
      const id=localStorage.getItem('user');
      await fetch('https://campo.talkandeat.es/api/trabajadores?id_usuario='+id).then((reponse)=>reponse.json()).then((data)=>{
        if(!data.code)  data.forEach((worker) => {
          newWorkers.push({
            name: worker.nombre, 
            surname: worker.apellidos, 
            nif:worker.nif,
            email:worker.correo, 
            phone:worker.telefono,
            puesto:worker.puesto,
            actividades:worker.actividades,
          });
        });
        setWorkers(newWorkers);
      });
    }

    getWorkers();
  },[]);
  
  const deleteWorker=(workerDeleted)=>{
    let newWorkers=[]
    workers.forEach(worker=>{
      if(worker!==workerDeleted) newWorkers.push(worker) ;
    });
    setWorkers(newWorkers);
  }

  const renderWorkers = () => {
    return workers.map((worker, index) => {
      return (
        <div key={index} onClick={()=>{setFocusWorker(worker)}} className="col-12 col-md-6 col-lg-4 worker">
            <div>
            <img src="./img/usuario.png" width="100" alt="usericon" />
            <p>{worker.name} {worker.surname}</p>
            </div>
        </div>
      );
    });
  };

  if(focusWorker!==null) return (<Trabajador worker={focusWorker} deleteWorker={()=>{deleteWorker(focusWorker)}} focusWorker={()=>setFocusWorker(null)}/>);
  else if(creation) return(<NuevoTrabajador setCreation={()=>setCreation(false)}/>);
  else return (
    <div className="container workers">
      <div className="row">
        <div className="col-12 n-workers mt-5">
          <h3>Nº TRABAJADORES</h3>
          <h2>{workers.length}</h2>
        </div>
        <div className="col-10 offset-1 filters d-none">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Filter Clicked");
            }}
          >
            <input
              type="text"
              className="form-control"
              name="searchworker"
              id="searchworker"
              placeholder="NIF / Nombre"
              required
            />
            <button type="submit">Search</button>
          </form>
          <div className="order-results">
            <div className="d-flex gap-1">
              <img
                src="./img/hora-cuarto-a.png"
                width="30"
                height="30"
                alt="time"
              />
              <p className="d-none d-md-block">Tiempo</p>
            </div>
            <div className="d-flex gap-1">
              <img
                src="./img/ordenar-az.png"
                width="30"
                height="30"
                alt="alfabetico"
              />
              <p className="d-none d-md-block">Alfabético</p>
            </div>
          </div>
        </div>
        <div className="col-10 offset-1 workers-list" style={{borderTop:"4px solid #2bc74f"}}>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 new-worker">
              <button onClick={()=>{setCreation(true)}}>
                <img
                  src="./img/plus-pequeno.png"
                  className="img-responsive"
                  width="100"
                  alt="addicon"
                />
              </button>
            </div>
            {renderWorkers()}
          </div>
        </div>
      </div>
    </div>
  );
};
