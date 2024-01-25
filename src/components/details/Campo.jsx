import React from "react";

export const Campo = ({ campo, setFocusCampo, deleteCampo }) => {

  async function borrarCampo(){
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
          deleteCampo();
          alert(`Campo "${campo.nombre}" borrado correctamente.`);
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  return (
    <div className="campo-info-screen m-3 m-md-4 m-lg-5">
      <div className="row">
        <div className="col-12">
          <div className="campohead">
            <h2 style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
              {" "}
              <button onClick={() => setFocusCampo()}>&#5176;</button>
              {campo.nombre}
            </h2>
          </div>

          <div className="info row">
            <p className="info-header mt-5 mb-4">Información del Campo</p>
            <div className="col-12 col-md-6">
              <p>
                <b>Id</b>: {campo.id}
              </p>
            </div>
            <div className="col-12 col-md-6">
              <p>
                <b>Nombre</b>: {campo.nombre}
              </p>
            </div>
            <div className="col-12 col-md-6">
              <p>
                <b>Provincia</b>: {campo.provincia}
              </p>
            </div>
            <div className="col-12 col-md-6">
              <p>
                <b>Municipio</b>: {campo.municipio}
              </p>
            </div>
            <div className="col-12 col-md-6">
              <p>
                <b>Agregado</b>: {campo.agregado}
              </p>
            </div>
            <div className="col-12 col-md-6">
              <p>
                <b>Zona</b>: {campo.zona}
              </p>
            </div>
            <div className="col-12 col-md-6">
              <p>
                <b>Polígono</b>: {campo.poligono}
              </p>
            </div>
            <div className="col-12 col-md-6">
              <p>
                <b>Parcela</b>: {campo.parcela}
              </p>
            </div>
            <div className="col-12 col-md-6">
              <p>
                <b>Recinto</b>: {campo.recinto}
              </p>
            </div>

            
          </div>
        </div>
        <div className="div_btnBorrar">
              <button onClick={()=>{borrarCampo();setFocusCampo()}}>
                <p>Borrar</p>
                <span className="span1"></span>
                <span className="span2"></span>
                <span className="span3"></span>
                <span className="span4"></span>
              </button>
            </div>
      </div>
    </div>
  );
};
