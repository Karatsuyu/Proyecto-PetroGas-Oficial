import React, { useEffect, useState } from "react";
import "./css/clientes.css";
import {
  Buscar,
  Agregar_cliente,
  llenarTabla,
  Eliminar_cliente,
  Actualizar_cliente,
} from "../controllers/controllerClientes";

function Clientes() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cedula, setCedula] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    llenarTabla({ setUsuarios });
  }, []);

  const Limpiar_campos = () => {
    setNombre("");
    setEdad("");
    setCorreo("");
    setTelefono("");
    setCedula("");
  };

  return (
    <div className="fondo-clientes">
      <div className="contenedor1clientes">
        <input
          className="input1clientes"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          style={{ position: "absolute", top: "19%", left: "2%" }}
        />
        <input
          className="input1clientes"
          type="number"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          placeholder="Edad"
          style={{ position: "absolute", top: "34%", left: "2%" }}
        />
        <input
          className="input1clientes"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Correo"
          style={{ position: "absolute", top: "49%", left: "2%" }}
        />
        <input
          className="input1clientes"
          type="number"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Teléfono"
          style={{ position: "absolute", top: "64%", left: "2%" }}
        />
        <input
          className="input1clientes"
          type="number"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          placeholder="Cédula"
          style={{ position: "absolute", top: "79%", left: "2%" }}
        />

        <button
          className="boton1clientes"
          onClick={() => {
            Agregar_cliente({
              nombre,
              edad,
              correo,
              telefono,
              cedula,
              setUsuarios,
            });
          }}
        >
          Agregar
        </button>

        <button
          className="boton2clientes"
          onClick={() => {
            Actualizar_cliente({
              nombre,
              edad,
              correo,
              telefono,
              cedula,
              setUsuarios,
            });
          }}
        >
          Actualizar
        </button>

        <button
          className="boton3clientes"
          onClick={() => {
            Eliminar_cliente({
              cedula,
              setUsuarios,
            });
          }}
        >
          Eliminar
        </button>

        <button className="boton4clientes" onClick={Limpiar_campos}>
          Limpiar campos
        </button>

        <img
          src="./lupa.png"
          className="ImagenLupa"
          onClick={() => {
            Buscar({
              cedula,
              setNombre,
              setEdad,
              setCorreo,
              setTelefono,
            });
          }}
          style={{
            position: "absolute",
            top: "80%",
            left: "14%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
          }}
          alt="Buscar"
        />

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
              Si tienes inconvenientes para registrar clientes, escribe a<br />
              <strong>soporte@petrogas.com</strong> o llama al&nbsp;
              <strong>(+57) 300 123 4567</strong>.
            </p>
          </div>
        )}

        <div
          className="tabla1clientes-container"
          style={{ position: "absolute", top: "110%", left: "2%", width: "90%" }}
        >
          <table className="tabla1clientes">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Cédula</th>
                <th>User</th>
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
    </div>
  );
}

export default Clientes;
