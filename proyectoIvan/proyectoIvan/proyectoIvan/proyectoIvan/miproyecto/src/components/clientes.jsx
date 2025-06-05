import React, { useEffect } from "react";
import "./clientes.css"; 
import { useState } from "react";
import axios from "axios";

function Clientes() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cedula, setCedula] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  const [usuarios, setUsuarios] = useState([]);

  function Buscar() {
    if (cedula) {
      axios
        .get(`http://localhost:8000/api/Clientes/?cedula=${cedula}`)
        .then((Response) => {
          const cliente = Response.data[0];
          setNombre(cliente.nombre);
          setEdad(cliente.edad);
          setCorreo(cliente.correo);
          setTelefono(cliente.telefono);
        })
        .catch((Error) => {
          console.log(Error);
          alert("Error al buscar cliente");
        });
    } else {
      alert("Ingrese una cédula válida");
    }
  }

  function Agregar_cliente() {
    if (nombre && edad && correo && telefono && cedula) {
      axios
        .post(`http://localhost:8000/api/Clientes/`, {
          nombre: nombre,
          correo: correo,
          edad: edad,
          telefono: telefono,
          cedula: cedula,
          user: "cliente"
        })
        .then((Response) => {
          console.log(Response.data);
          alert("Cliente creado");
          llenarTabla();
          Limpiar_campos();
          setUsuarios((prev) => [...prev, Response.data]);
        })
        .catch((Error) => {
          console.log(Error);
          alert("Error al crear cliente");
        });
    } else {
      alert("Llene todos los campos");
    }
  }
  

  function Actualizar_cliente() {
    if (cedula) {
      axios
        .patch(`http://localhost:8000/api/Clientes/${cedula}/`, {
          nombre: nombre,
          correo: correo,
          edad: edad,
          telefono: telefono,
        })
        .then((Response) => {
          console.log(Response.data);
          alert("Cliente actualizado");
          llenarTabla();
          Limpiar_campos();
        })
        .catch((Error) => {
          console.log(Error);
          alert("Error al actualizar cliente");
        });
    } else {
      alert("Ingrese una cédula para actualizar");
    }
  }

  function Eliminar_cliente() {
    if (cedula) {
      axios
        .delete(`http://localhost:8000/api/Clientes/${cedula}/`)
        .then(() => {
          alert("Cliente eliminado");
          llenarTabla();
          Limpiar_campos();
        })
        .catch((Error) => {
          console.log(Error);
          alert("Error al eliminar cliente");
        });
    } else {
      alert("Ingrese una cédula para eliminar");
    }
  }

  function Limpiar_campos() {
    setNombre("");
    setEdad("");
    setCorreo("");
    setTelefono("");
    setCedula("");
  }

  function llenarTabla() {
    axios
      .get(`http://localhost:8000/api/Clientes/`)
      .then((Response) => {
        console.log("Respuesta de Clientes:", Response.data);
        const data = Array.isArray(Response.data)
          ? Response.data
          : Response.data.data || [];
        setUsuarios(data);
      })
      .catch((Error) => {
        console.log("Error", Error);
      });
  }

  useEffect(() => {
    llenarTabla();
  }, []);

  function Componentes() {
    return (
      <div>
        <div className="contenedor2clientes">
          <label className="TituloClientes">Registro Clientes</label>
        </div>
        <div>
          <label className="label1clientes" style={{ position: "absolute", top: "15%", left: "2%" }}>Nombre</label>
          <label className="label1clientes" style={{ position: "absolute", top: "30%", left: "2%" }}>Edad</label>
          <label className="label1clientes" style={{ position: "absolute", top: "45%", left: "2%" }}>Correo</label>
          <label className="label1clientes" style={{ position: "absolute", top: "60%", left: "2%" }}>Teléfono</label>
          <label className="label1clientes" style={{ position: "absolute", top: "75%", left: "2%" }}>Cédula</label>

          <button className="boton1clientes" onClick={Agregar_cliente}>
            Agregar
          </button>
          <button className="boton2clientes" onClick={Actualizar_cliente}>
            Actualizar
          </button>
          <button className="boton3clientes" onClick={Eliminar_cliente}>
            Eliminar
          </button>
          <button className="boton4clientes" onClick={Limpiar_campos}>
            Limpiar campos
          </button>
          <img
            src="./lupa.png"
            className="ImagenLupa"
            onClick={Buscar}
            style={{
              position: "absolute",
              top: "80%",
              left: "14%",
              width: "40px",
              height: "40px",
            }}
          />

          <table className="tabla1clientes">
            <thead>
              <tr>
                <th>nombre</th>
                <th>edad</th>
                <th>correo</th>
                <th>teléfono</th>
                <th>cédula</th>
                <th>user</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((item, index) => (
                <tr key={index}>
                  <td>{item.nombre}</td>
                  <td>{item.edad}</td>
                  <td>{item.correo}</td>
                  <td>{item.telefono}</td>
                  <td>{item.cedula}</td>
                  <td>{item.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="fondo-clientes">
      <div className="contenedor1clientes">
          <input
            className="input1clientes"
            value={nombre || ""}
            placeholder="nombre"
            onChange={(e) => setNombre(e.target.value)}
            style={{ position: "absolute", top: "19%", left: "2%" }}
          />
          <input
            className="input1clientes"
            type="number"
            value={edad || ""}
            placeholder="edad"
            onChange={(e) => setEdad(e.target.value)}
            style={{ position: "absolute", top: "34%", left: "2%" }}
          />
          <input
            className="input1clientes"
            value={correo || ""}
            placeholder="correo"
            onChange={(e) => setCorreo(e.target.value)}
            style={{ position: "absolute", top: "49%", left: "2%" }}
          />
          <input
            className="input1clientes"
            type="number"
            value={telefono || ""}
            placeholder="teléfono"
            onChange={(e) => setTelefono(e.target.value)}
            style={{ position: "absolute", top: "64%", left: "2%" }}
          />
          <input
            className="input1clientes"
            type="number"
            value={cedula || ""}
            placeholder="cédula"
            onChange={(e) => setCedula(e.target.value)}
            style={{ position: "absolute", top: "79%", left: "2%" }}
          />
        <Componentes />
              <button
                  className="boton-ayuda"
                  onClick={() => setShowHelp((prev) => !prev)}
                  title="Ayuda"
              >
                  ?
              </button>

              {showHelp && (
                  <div className="tooltip-ayuda">
                      <p style={{ margin: 0, fontWeight: "bold" }}>¿Necesitas ayuda?</p>
                      <p style={{ margin: 0 }}>
                          Si tienes inconvenientes para registrar compras, escribe a<br />
                          <strong>soporte@petrogas.com</strong> o llama al&nbsp;
                          <strong>(+57) 300 123 4567</strong>.
                      </p>
                  </div>
              )}
            </div>
          </div>
  );
}

  export default Clientes;
