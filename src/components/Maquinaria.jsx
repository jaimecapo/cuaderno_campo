import React, { useEffect, useState } from "react";
import { NuevaMaquina } from "./forms/NuevaMaquina";
import { Maquina } from "./details/Maquina";

export const Maquinaria = () => {
  let [maquinaria, setMaquinaria] = useState([]);
  let [creation, setCreation]=useState(false);
   let [focusMaquina, setFocusMaquina]=useState(null);

  useEffect(()=>{
    async function getMaquinas(){
        let newMaquinaria=[];
        const id=localStorage.getItem('user');
        await fetch('http://campo.talkandeat.es/api/maquinas?id_usuario='+id).then((reponse)=>reponse.json()).then((data)=>{
          if(!data.code)  data.forEach((campo) => {
            newMaquinaria.push(campo);
          });
          setMaquinaria(newMaquinaria);
        });
      }
  
      getMaquinas();
  },[]);

  const deleteMaquina=(maquinaDeleted)=>{
    let newMaquina=[]
    maquinaria.forEach(maquina=>{
      if(maquina!==maquinaDeleted) newMaquina.push(maquina) ;
    });
    setMaquinaria(newMaquina);
  }

  async function borrarMaquina(maquina){
    const confirmation=window.confirm(`Estás seguro de que quieres desacerte de ${maquina.nombre}?` );
    if(confirmation){
      const body={
        id:maquina.id
      };
      try {
        await fetch( "http://campo.talkandeat.es/api/borrarMaquina" , {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }).then(response=>{response.json()}).then(data=>{
          deleteMaquina(maquina);
          alert(`Maquina "${maquina.nombre}" borrada correctamente.`);
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  if(focusMaquina!==null) return (<Maquina maquina={focusMaquina} deleteMaquina={()=>{deleteMaquina(focusMaquina)}} setFocusMaquina={()=>{setFocusMaquina(null)}}/>);
  else if(creation) return(<NuevaMaquina setCreation={()=>setCreation(false)}/>);
  else  return (
    <div className="maquinaria container mt-5">
      <div className="maquinaria_header mb-5">
        <h2 style={{ fontSize: 80, letterSpacing:"-8px"}}>Maquinaria </h2>
      </div>
      <table className="table mt-4" >
        <thead>
          <tr style={{ fontSize: 25 }}>
            <th>nombre</th>
            <th>marca</th>
            <th>modelo</th>
            <th>matrícula</th>
            <th>tipo</th>
            <th>capacidad</th>
            <th>activa</th>
          </tr>
        </thead>
        <tbody style={{fontSize:'20px'}}>
            {maquinaria.map((maquina, key)=>{
                return(
                    <tr key={key}>
                        <td>{maquina.nombre}</td>
                        <td>{maquina.marca}</td>
                        <td>{maquina.modelo}</td>
                        <td>{maquina.matricula}</td>
                        <td>{maquina.tipo}</td>
                        <td>{maquina.capacidad}</td>
                        <td>{maquina.activa}</td>
                        <td style={{display:"flex" , gap:"10px"}}>
                          <button onClick={()=>{setFocusMaquina(maquina)}}><img src="./img/ojo.png" alt="eye emote" width={30} height={30}/></button>
                          <button onClick={()=>{borrarMaquina(maquina)}}><img src="./img/basura.png" alt="trash emote" width={30} height={30}/></button>
                        </td>
                    </tr>
                );
            })}
        </tbody>
      </table>
      <div className="addCampo mt-5">
        <button
          onClick={() => setCreation(true)}
          style={{
            fontSize: 30,
            border: "1px solid #282c34",
            borderRadius: "1em",
            backgroundColor: "white",
          }}
        >
          Crear Campo
        </button>
      </div>
    </div>
  );
};
