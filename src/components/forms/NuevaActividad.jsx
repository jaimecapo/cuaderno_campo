import React, { useEffect, useState } from "react";

export const NuevaActividad = ({ setCreation }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [campo, setCampo] = useState("");
  const [trabajadores, setTrabajadores] = useState([]);
  const [maquinas, setMaquinas] = useState([]);

  let [inputMaquinas, setInputMaquinas] = useState([]);
  let [inputCampos, setInputCampos] = useState([]);
  let [inputTrabajadores, setInputTrabajadores] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("user");

    async function getCampos() {
      let newCampos = [];
      const id = localStorage.getItem("user");
      await fetch("https://campo.talkandeat.es/api/campos?id_usuario=" + id)
        .then((reponse) => reponse.json())
        .then((data) => {
          if (!data.code)
            data.forEach((campo) => {
              newCampos.push(campo);
            });
          setInputCampos(newCampos);
        });
    }

    getCampos();

    async function getMaquinas() {
      let newMaquinaria = [];
      await fetch("https://campo.talkandeat.es/api/maquinas?id_usuario=" + id)
        .then((reponse) => reponse.json())
        .then((data) => {
          if (!data.code)
            data.forEach((campo) => {
              newMaquinaria.push(campo);
            });
          setInputMaquinas(newMaquinaria);
        });
    }

    getMaquinas();

    async function getWorkers() {
      let newWorkers = [];
      const id = localStorage.getItem("user");
      await fetch(
        "https://campo.talkandeat.es/api/trabajadores?id_usuario=" + id
      )
        .then((reponse) => reponse.json())
        .then((data) => {
          if (!data.code)
            data.forEach((worker) => {
              newWorkers.push(worker);
            });
          setInputTrabajadores(newWorkers);
        });
    }

    getWorkers();
  }, []);

  async function createActividad() {
    const id = localStorage.getItem("user");
    const body = {
      titulo: nombre,
      descripcion: descripcion,
      fecha_inicio: fechaInicio,
      fecha_final: fechaFinal,
      id_campo: campo,
      nifs_trabajadores: trabajadores,
      id_maquinarias: maquinas,
      id_usuario: id,
    };

    try {
      await fetch("https://campo.talkandeat.es/api/añadirActividad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          response.json();
        })
        .then((data) => {
          alert(`Actividad creada correctamente.`);
          emptyForm();
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  function emptyForm() {
    setNombre("");
    setDescripcion("");
    setFechaInicio("");
    setFechaFinal("");
    setCampo("");
    setTrabajadores([]);
    setMaquinas([]);
  }

  return (
    <div className="form_actividad container mt-5 mb-5">
      <div>
        <button
          onClick={() => {
            setCreation();
          }}
        >
          &#5176;
        </button>
        <h2>Nueva Actividad</h2>
      </div>
      <p className="subtext">
        Completa todos los campos para crear una nueva actividad.
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log(campo);
          createActividad();
          setCreation();
        }}
        className="form "
      >
        <label className="form-label" htmlFor="nombre">
          titulo:
        </label>
        <input
          required
          className="form-control"
          type="text"
          name="nombre"
          id="nombre"
          value={nombre}
          onChange={(e) => {
            setNombre(e.target.value);
          }}
        />
        <label className="form-label" htmlFor="descripcion">
          Descripcion:
        </label>
        <input
          required
          className="form-control"
          type="text"
          name="descripcion"
          id="descripcion"
          value={descripcion}
          onChange={(e) => {
            setDescripcion(e.target.value);
          }}
        />
        <div className="row">
          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="fecha_inicio">
              Fecha Inicio:
            </label>
            <input
              required
              className="form-control"
              type="date"
              name="fecha_inicio"
              id="fecha_inicio"
              value={fechaInicio}
              onChange={(e) => {
                setFechaInicio(e.target.value);
              }}
            />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="fecha_final">
              Fecha final:
            </label>
            <input
              required
              className="form-control"
              type="date"
              name="fecha_final"
              id="fecha_final"
              value={fechaFinal}
              onChange={(e) => {
                setFechaFinal(e.target.value);
              }}
            />
          </div>
        </div>

        <label className="form-label" htmlFor="campo">
          Campo
        </label>
        <select
          onChange={(e) => {
            setCampo(e.target.value);
          }}
          className="form-select"
          name="campo"
          id="campo"
        >
          {inputCampos.map((campo, key) => {
            return <option key={key} value={campo.id}>{campo.nombre}</option>;
          })}
        </select>
        <label className="form-label" htmlFor="trabajadores">
          Trabajadores
        </label>
        <select
          multiple
          className="form-select"
          name="trabajadores"
          id="trabajadores"
          onChange={(e) => {
            const selectedOptions = Array.from(e.target.selectedOptions).map(
              (option) =>{
                return option.value
              } 
            );
            setTrabajadores(selectedOptions);
          }}
        >
          {inputTrabajadores.map((trabajador,key) => {
            return (
              <option key={key} value={trabajador.nif}>
                {trabajador.nombre} {trabajador.apellidos}
              </option>
            );
          })}
        </select>
        <label className="form-label" htmlFor="maquinas">
          Maquinas
        </label>
        <select
          multiple
          className="form-select"
          name="maquinas"
          id="maquinas"
          onChange={(e) => {
            const selectedOptions = Array.from(e.target.selectedOptions).map(
              (option) => option.value
            );
            setMaquinas(selectedOptions);
          }}
        >
          {inputMaquinas.map((maquina,key) => {
            return <option key={key} value={maquina.id}>{maquina.nombre}</option>;
          })}
        </select>
        <div className="btn_div">
          <p>*Rellena todo para habilitar*</p>
          <button type="submit">Crear</button>
        </div>
      </form>
    </div>
  );
};
