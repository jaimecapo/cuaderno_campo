import React, { useState } from "react";

export const NuevoTrabajador = ({ setCreation }) => {
  const id = localStorage.getItem("user");
  let [nif, setNif] = useState("");
  let [nombre, setNombre] = useState("");
  let [apellidos, setApellidos] = useState("");
  let [correo, setCorreo] = useState("");
  let [telefono, setTelefono] = useState("");
  let [puesto, setPuesto] = useState("basico");

  async function createTrabajador(){
    const body={
      nif:nif, 
      nombre: nombre, 
      apellidos: apellidos, 
      correo: correo, 
      telefono: telefono? telefono: null,
      puesto:puesto, 
      id_usuario: id
    };
    try {
      await fetch( "https://campo.talkandeat.es/api/añadirTrabajador" , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then(response=>{response.json()}).then(data=>{
        alert(`Trabajador/a "${nombre}" creado/a correctamente.`);
        emptyForm();
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  function emptyForm(){
    setNombre("");
    setApellidos(""); 
    setNif("");
    setCorreo("");
    setTelefono("");
    setPuesto("basico");
  }
  return (
    <div className="form_trabajador container mt-5 mb-5">
      <div>
        <button
          onClick={() => {
            setCreation();
          }}
        >
          &#5176;
        </button>
        <h2>Nuevo Trabajador</h2>
      </div>
      <p className="subtext">
        Completa todos los campos para crear un trabajador.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTrabajador();
          setCreation()
        }}
        className="form "
      >
        <label className="form-label" htmlFor="nif">
          Nif:
        </label>
        <input
          required
          className="form-control"
          type="text"
          name="nif"
          id="nif"
          value={nif}
          onChange={(event) => {
            setNif(event.target.value);
          }}
        />
        <label className="form-label" htmlFor="nombre">
          Nombre:
        </label>
        <input
          required
          className="form-control"
          type="text"
          name="nombre"
          id="nombre"
          value={nombre}
          onChange={(event) => {
            setNombre(event.target.value);
          }}
        />
        <label className="form-label" htmlFor="apellidos">
          Apellidos:
        </label>
        <input
          required
          className="form-control"
          type="text"
          name="apellidos"
          id="apellidos"
          value={apellidos}
          onChange={(event) => {
            setApellidos(event.target.value);
          }}
        />
        <label className="form-label" htmlFor="email">
          Correo:
        </label>
        <input
          required
          className="form-control"
          type="email"
          name="email"
          id="email"
          value={correo}
          onChange={(event) => {
            setCorreo(event.target.value);
          }}
        />
        <label className="form-label" htmlFor="phone">
          Teléfono
        </label>
        <input
          className="form-control"
          type="tel"
          name="phone"
          id="phone"
          value={telefono}
          onChange={(event) => {
            setTelefono(event.target.value);
          }}
        />
        <label className="form-label" htmlFor="puesto">
          Puesto
        </label>
        <select
          className="form-select"
          name="puesto"
          id="puesto"
          value={puesto}
          onChange={(event) => {
            setPuesto(event.target.value);
          }}
        >
          <option value="basico">Básico</option>
          <option value="calificado">Calificado</option>
          <option value="fumigador">Fumigador</option>
          <option value="piloto">Piloto Aplicador</option>
        </select>
        <div>
          <p>*Rellena todo para habilitar*</p>
          <button type="submit">Crear</button>
        </div>
      </form>
    </div>
  );
};
