import React, { useState } from "react";

export const NuevaMaquina = ({setCreation}) => {
  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [matricula, setMatricula] = useState("");
  const [activado, setActivado] = useState("si");
  const [alquilado, setAlquilado] = useState("si");
  const [adquisicion, setAdquisicion] = useState("");
  const [fechaRevision, setFechaRevision] = useState("");
  const [capacidad, setCapacidad] = useState(0);
  const [tipo, setTipo] = useState("tractor");

  async function createMaquina(){
    const id=localStorage.getItem('user');
    const body = {
      nombre: nombre,
      marca: marca,
      modelo: modelo,
      matricula: matricula,
      activa: activado === 'si' ? 1 : 0,
      alquilada: alquilado === 'si' ? 1 : 0,
      tipo: tipo,
      adquisicion: adquisicion,
      ultima_revision: fechaRevision,
      capacidad: capacidad,
      id_usuario: id
    };
    try {
      await fetch( "https://campo.talkandeat.es/api/añadirMaquina" , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then(response=>{response.json()}).then(data=>{
        alert(`Máquina "${nombre}" creada correctamente.`);
        emptyForm();
      });
    } catch (error) {
      console.log(error.message);
    }
  }

    function emptyForm() {
      setNombre("");
      setMarca("");
      setModelo("");
      setMatricula("");
      setActivado("si");
      setAlquilado("si");
      setAdquisicion("");
      setFechaRevision("");
      setCapacidad(0);
      setTipo("tractor");
    }

  return (
    <div className="form_maquina  container mt-5 mb-5">
      <div>
        <button onClick={()=>{setCreation()}}>&#5176;</button>
        <h2>Nueva Máquina</h2>
      </div>
      <p className="subtext">Completa todos los campos para crear un trabajador.</p>

      <form onSubmit={(e)=>{
        e.preventDefault()
        createMaquina();
        setCreation();
      }}>
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
        <label className="form-label" htmlFor="marca">
          Marca:
        </label>
        <input
          required
          className="form-control"
          type="text"
          name="marca"
          id="marca"
          value={marca}
          onChange={(event) => {
            setMarca(event.target.value);
          }}
        />
        <label className="form-label" htmlFor="modelo">
          Modelo:
        </label>
        <input
          required
          className="form-control"
          type="text"
          name="modelo"
          id="modelo"
          value={modelo}
          onChange={(event) => {
            setModelo(event.target.value);
          }}
        />
        <label className="form-label" htmlFor="matricula">
          Matrícula:
        </label>
        <input
          required
          className="form-control"
          type="text"
          name="matricula"
          id="matricula"
          value={matricula}
          onChange={(event) => {
            setMatricula(event.target.value);
          }}
        />
        <div className="row">
          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="activado">
              Activa
            </label>
            <select onChange={(event)=>{ setActivado(event.target.value)}} className="form-select" name="activado" id="activado">
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="alquilado">
              Alquilado
            </label>
            <select onChange={(event)=>{ setAlquilado(event.target.value)}} className="form-select" name="alquilado" id="alquilado">
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="adquisicion">
              Adquisicion:
            </label>
            <input
              required
              className="form-control"
              type="date"
              name="adquisicion"
              id="adquisicion"
              value={adquisicion}
          onChange={(event) => {
            setAdquisicion(event.target.value);
          }}
            />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="fecha_revision">
              Fecha última revisión:
            </label>
            <input
              required
              className="form-control"
              type="date"
              name="fecha_revision"
              id="fecha_revision"
              value={fechaRevision}
          onChange={(event) => {
            setFechaRevision(event.target.value);
          }}
            />
          </div>
        </div>

        <label className="form-label" htmlFor="cantidad">
          Cantidad
        </label>
        <input
          required
          className="form-control"
          type="number"
          name="cantidad"
          id="cantidad"
          value={capacidad}
          onChange={(event) => {
            setCapacidad(event.target.value);
          }}
        />
        <label htmlFor="form-label">Tipo</label>
        <select onChange={(event)=>{ setTipo(event.target.value)}} className="form-select" name="tipo" id="tipo">
          <option value="tractor">Tractor</option>
          <option value="cosechadora">Cosechadora</option>
          <option value="sembradora">Sembradora</option>
          <option value="fertilizadora">Fertilizadora</option>
          <option value="herbicida">Herbicida</option>
          <option value="pulverizadora">Pulverizadora</option>
          <option value="trabajo_suelo">Trabajo del suelo</option>
          <option value="transporte">Transporte</option>
          <option value="atomizador">Atomizador</option>
          <option value="empacadora">Empacadora</option>
          <option value="otros">Otros</option>
        </select>
        <div className="btn_div">
          <p>*Rellena todo para habilitar*</p>
          <button type="submit">Crear</button>
        </div>
      </form>
    </div>
  );
};
