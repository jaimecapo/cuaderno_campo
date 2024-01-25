import React, { useEffect, useState } from "react";
import { NuevoCampo } from "./forms/NuevoCampo";
import { Campo } from "./details/Campo";

export const Campos = () => {
  let [campos, setCampos] = useState([]);
  let [creation, setCreation]=useState(false);
  let [focusCampo, setFocusCampo]=useState(null);

  useEffect(()=>{
    async function getCampos(){
        let newCampos=[];
        const id=localStorage.getItem('user');
        await fetch('https://campo.talkandeat.es/api/campos?id_usuario='+id).then((reponse)=>reponse.json()).then((data)=>{
          if(!data.code)  data.forEach((campo) => {
            newCampos.push(campo);
          });
          setCampos(newCampos);
        });
      }
  
      getCampos();
  },[]);

  const deleteCampo=(campoDelete)=>{
    let newCampo=[]
    campos.forEach(campo=>{
      if(campo!==campoDelete) newCampo.push(campo) ;
    });
    setCampos(newCampo);
  }

  async function borrarCampo(campo){
    const confirmation=window.confirm(`Estás seguro de que quieres desacerte de ${campo.nombre}?` );
    if(confirmation){
      const body={
        id:campo.id
      };
      try {
        await fetch( "https://campo.talkandeat.es/api/borrarCampo" , {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }).then(response=>{response.json()}).then(data=>{
          deleteCampo(campo);
          alert(`Campo "${campo.nombre}" borrado correctamente.`);
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  if(focusCampo!==null) return <Campo campo={focusCampo} deleteCampo={()=>{deleteCampo(focusCampo)}} setFocusCampo={()=>{setFocusCampo(null)}}/>
  else if(creation) return(<NuevoCampo setCreation={()=>setCreation(false)}/>);
  else  return( 
  <div className="campos container mt-5">
    <div className="campos_header mb-5">
        <h2 style={{ fontSize: 80, letterSpacing:"-8px"}}>Campos </h2>
      </div>
    <table className="table mt-4">
        <thead>
            <tr style={{fontSize:25}}>
                <th>nombre</th>
                <th>provincia</th>
                <th>municipio</th>
                <th>zona</th>
                <th>poligono</th>
                <th>parcela</th>
            </tr>
        </thead>
        <tbody style={{fontSize:'20px'}}>
            {campos.map((campo,key)=>{
                return(
                    <tr key={key}>
                        <td>{campo.nombre}</td>
                        <td>{campo.provincia}</td>
                        <td>{campo.municipio}</td>
                        <td>{campo.zona}</td>
                        <td>{campo.poligono}</td>
                        <td>{campo.parcela}</td>
                        <td style={{display:"flex" , gap:"10px"}}>
                          <button onClick={()=>{setFocusCampo(campo)}}><img src="./img/ojo.png" alt="eye emote" width={30} height={30}/></button>
                          <button onClick={()=>{borrarCampo(campo)}}><img src="./img/basura.png" alt="trash emote" width={30} height={30}/></button>
                          </td>
                    </tr>
                );
            })}
        </tbody>
    </table>
    <div className="addCampo mt-5">
    <button onClick={()=>setCreation(true)} style={{fontSize:30, border:"1px solid #282c34", borderRadius:"1em", backgroundColor:"white"}}>Crear Campo</button>
    </div>
  </div>);
};
