import React from "react";

export const Actividad = ({ activity, setFocusActivity, deleteActividad }) => {

  async function borrarActividad(){
    const confirmation=window.confirm(`Estás seguro de que quieres borrar la actividad?` );
    if(confirmation){
      const body={
        id:activity.id
      };
      try {
        await fetch( "https://campo.talkandeat.es/api/borrarActividad" , {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }).then(response=>{response.json()}).then(data=>{
          deleteActividad();
          alert(`Actividad "${activity.id}" borrada correctamente.`);
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  }


  return (
    <div className="actividad_info">
      <div className="info p-4">
        <div style={{display:"flex", gap:"1em", alignItems:"center"}}>
        <button onClick={() => setFocusActivity()}>&#5176;</button>
        <h2>{activity.titulo}</h2>
        </div>
        
        <p className="fecha">
          <b>Fecha Inicio:</b> {activity.fecha_inicio}
        </p>
        <p className="fecha">
          <b>Fecha Final:</b> {activity.fecha_final}
        </p>
        <p className="mt-5">{activity.descripcion}</p>
      </div>

      <div className="campo container-fluid mt-5">
      <h2>Campo</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Provincia</th>
              <th>Municipio</th>
              <th>Agregado</th>
              <th>Zona</th>
              <th>Polígono</th>
              <th>Parcela</th>
              <th>Recinto</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
                <tr>
                  <td>{activity.campo.id}</td>
                  <td>{activity.campo.nombre}</td>
                  <td>{activity.campo.provincia}</td>
                  <td>{activity.campo.municipio}</td>
                  <td>{activity.campo.agregado}</td>
                  <td>{activity.campo.zona}</td>
                  <td>{activity.campo.poligono}</td>
                  <td>{activity.campo.parcela}</td>
                  <td>{activity.campo.recinto}</td>
                </tr>

          </tbody>
        </table>
      </div>
      <div className="container-fluid trabajadores mt-5">
        <h2>Trabajadores</h2>
        <table className="table">
          <thead>
            <tr>
              <th>NIF</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Telefeno</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {activity.trabajadores.map((trabajador,key) => {
              return (
                <tr key={key}>
                  <td>{trabajador.nif}</td>
                  <td>{trabajador.nombre}</td>
                  <td>{trabajador.apellidos}</td>
                  <td>{trabajador.telefono? trabajador.telefono:"Vacío"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="container-fluid maquinaria mt-5 p-4">
        <h2>Maquinaria</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Matricula</th>
              <th>Tipo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {activity.maquinaria.map((maquina,key) => {
              return (
                <tr key={key}>
                  <td>{maquina.id}</td>
                  <td>{maquina.nombre}</td>
                  <td>{maquina.modelo}</td>
                  <td>{maquina.matricula}</td>
                  <td>{maquina.tipo}</td>
                </tr>
              );
            })}
            
          </tbody>
        </table>
      </div>

      <div className="div_btnBorrar">
        <button onClick={()=>{borrarActividad();setFocusActivity(null)}}>
          <p>Borrar</p>
          <span className="span1"></span>
          <span className="span2"></span>
          <span className="span3"></span>
          <span className="span4"></span>
        </button>
      </div>
    </div>
  );
};
