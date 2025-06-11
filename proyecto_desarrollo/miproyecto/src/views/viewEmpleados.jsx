import React, { useEffect, useState } from "react";
import "./css/empleados.css";
import {
  Buscar,
  AgregarEmpleado,
  ActualizarEmpleado,
  EliminarEmpleado,
  LimpiarCampos,
  llenarTabla,
} from "../controllers/controllerEmpleados";

function Empleados() {
  const [id, setid] = useState("");
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    llenarTabla({ setUsuarios });
  }, []);

  return (
    <div className="contenedor1empleados">
      <form>
        <input
          className="input1empleados"
          value={nombre}
          placeholder="Nombre"
          onChange={(e) => setNombre(e.target.value)}
          style={{ position: "absolute", top: "19%", left: "2%" }}
        />
        <input
          className="input1empleados"
          type="number"
          value={edad}
          placeholder="Edad"
          onChange={(e) => setEdad(e.target.value)}
          style={{ position: "absolute", top: "31%", left: "2%" }}
        />
        <input
          className="input1empleados"
          type="email"
          value={correo}
          placeholder="Correo"
          onChange={(e) => setCorreo(e.target.value)}
          style={{ position: "absolute", top: "43%", left: "2%" }}
        />
        <input
          className="input1empleados"
          type="number"
          value={telefono}
          placeholder="Teléfono"
          onChange={(e) => setTelefono(e.target.value)}
          style={{ position: "absolute", top: "55%", left: "2%" }}
        />
        <input
          className="input1empleados"
          type="number"
          value={cedula}
          placeholder="id"
          onChange={(e) => setCedula(e.target.value)}
          style={{ position: "absolute", top: "67%", left: "2%" }}
        />
        <input
          className="input1empleados"
          type="password"
          value={password}
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          style={{ position: "absolute", top: "79%", left: "2%" }}
        />
      </form>

      <div className="contenedor2empleados">
        <label className="Tituloempleados">Registro Empleados</label>
      </div>

      <label className="label1empleados" style={{ position: "absolute", top: "15%", left: "2%" }}>
        Nombre
      </label>
      <label className="label1empleados" style={{ position: "absolute", top: "27%", left: "2%" }}>
        Edad
      </label>
      <label className="label1empleados" style={{ position: "absolute", top: "39%", left: "2%" }}>
        Correo
      </label>
      <label className="label1empleados" style={{ position: "absolute", top: "51%", left: "2%" }}>
        Teléfono
      </label>
      <label className="label1empleados" style={{ position: "absolute", top: "63%", left: "2%" }}>
        id
      </label>
      <label className="label1empleados" style={{ position: "absolute", top: "75%", left: "2%" }}>
        Contraseña
      </label>

      <button
        className="boton1empleados"
        onClick={() =>
          AgregarEmpleado({
            nombre,
            edad,
            correo,
            telefono,
            cedula,
            password,
            setUsuarios,
            llenarTabla: () => llenarTabla({ setUsuarios }),
            LimpiarCampos: () =>
              LimpiarCampos({ setNombre, setEdad, setCorreo, setTelefono, setCedula, setPassword }),
          })
        }
      >
        Agregar
      </button>

      <button
        className="boton2empleados"
        onClick={() =>
          ActualizarEmpleado({
            nombre,
            edad,
            correo,
            telefono,
            cedula,
            password,
            llenarTabla: () => llenarTabla({ setUsuarios }),
            LimpiarCampos: () =>
              LimpiarCampos({ setNombre, setEdad, setCorreo, setTelefono, setCedula, setPassword }),
          })
        }
      >
        Actualizar
      </button>

      <button
        className="boton3empleados"
        onClick={() =>
          EliminarEmpleado({
            cedula,
            llenarTabla: () => llenarTabla({ setUsuarios }),
            LimpiarCampos: () =>
              LimpiarCampos({ setNombre, setEdad, setCorreo, setTelefono, setCedula, setPassword }),
          })
        }
      >
        Eliminar
      </button>

      <button
        className="boton4empleados"
        onClick={() =>
          LimpiarCampos({ setNombre, setEdad, setCorreo, setTelefono, setCedula, setPassword })
        }
      >
        Limpiar campos
      </button>

      <img
          src="./lupa.png"
          className="ImagenLupa"
          onClick={() => {Buscar({cedula, setNombre, setEdad, setCorreo, setTelefono, setPassword})}}
          style={{
            position: "absolute",
            top: "67%",
            left: "14%",
            width: "40px",
            height: "40px",
          }}
      />

      <div
        className="contenedor"
        style={{ position: "absolute", top: "13%", left: "37%" }}
      >
        <table className="tabla1empleados">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Cédula</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={index}>
                <td>{usuario.nombre}</td>
                <td>{usuario.edad}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.cedula}</td>
                <td>{usuario.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
            Si tienes inconvenientes para registrar empleados, escribe a
            <br />
            <strong>soporte@petrogas.com</strong> o llama al&nbsp;
            <strong>(+57) 300 123 4567</strong>.
          </p>
        </div>
      )}
    </div>
  );
}

export default Empleados;
