import React, { useState } from "react";

export const NuevoCampo = ({ setCreation }) => {
  let [nombre, setNombre] = useState("");
  let [provincia, setProvincia] = useState("");
  let [municipio, setMunicipio] = useState("");
  let [agregado, setAgregado] = useState("");
  let [zona, setZona] = useState("");
  let [poligono, setPoligono] = useState("");
  let [parcela, setParcela] = useState("");
  let [recinto, setRecinto] = useState("");

  async function createCampo(){
    const id=localStorage.getItem('user');
    const body = {
      nombre: nombre,
      provincia: provincia,
      municipio: municipio,
      agregado: agregado,
      zona: zona,
      poligono: poligono,
      parcela: parcela,
      recinto: recinto,
      id_usuario:id
    };
    
    try {
      await fetch( "https://campo.talkandeat.es/api/añadirCampo" , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then(response=>{response.json()}).then(data=>{
        alert(`Trabajador "${nombre}" creado correctamente.`);
        emptyForm();
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  function emptyForm() {
    setNombre("");
    setProvincia("");
    setMunicipio("");
    setAgregado("");
    setZona("");
    setPoligono("");
    setParcela("");
    setRecinto("");
  }
  

  return (
    <div className="form_campo  container mt-5 mb-5">
      <div>
        <button onClick={() => setCreation()}>&#5176;</button>
        <h2>Nuevo Campo</h2>
      </div>
      <p className="subtext">
        Completa todos los campos para crear un trabajador.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          createCampo();
          setCreation()
        }}
      >
        <label className="form-label" htmlFor="nombre">
          Nombre Recinto:
        </label>
        <input
          required
          className="form-control"
          type="text"
          name="nombre"
          id="nombre"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}        
          />

        <label className="form-label" htmlFor="provincia">
          Provincia:
        </label>
        <input
          required
          className="form-control"
          type="text"
          name="provincia"
          id="provincia"
          value={provincia}
          onChange={(event) => setProvincia(event.target.value)}
        />

        <label className="form-label" htmlFor="municipio">
          Municipio:
        </label>
        <input
          required
          className="form-control"
          type="text"
          name="municipio"
          id="municipio"
          value={municipio}
          onChange={(event) => setMunicipio(event.target.value)}
        />
        <label className="form-label" htmlFor="agregado">
          Agregado:
        </label>
        <input
          required
          className="form-control"
          type="number"
          name="agregado"
          id="agregado"
          value={agregado}
          onChange={(event) => setAgregado(event.target.value)}
        />
        <label className="form-label" htmlFor="zona">
          Zona:
        </label>
        <input
          required
          className="form-control"
          type="number"
          name="zona"
          id="zona"
          value={zona}
          onChange={(event) => setZona(event.target.value)}
        />
        <label className="form-label" htmlFor="poligono">
          Polígono:
        </label>
        <input
          required
          className="form-control"
          type="number"
          name="poligono"
          id="poligono"
          value={poligono}
          onChange={(event) => setPoligono(event.target.value)}
        />
        <label className="form-label" htmlFor="parcela">
          Parcela:
        </label>
        <input
          required
          className="form-control"
          type="number"
          name="parcela"
          id="parcela"
          value={parcela}
          onChange={(event) => setParcela(event.target.value)}
        />
        <label className="form-label" htmlFor="recinto">
          Recinto:
        </label>
        <input
          required
          className="form-control"
          type="number"
          name="recinto"
          id="recinto"
          value={recinto}
          onChange={(event) => setRecinto(event.target.value)}
        />
        <div>
          <p>*Rellena todo para habilitar*</p>
          <button type="submit">Crear</button>
        </div>
      </form>
    </div>
  );
};
