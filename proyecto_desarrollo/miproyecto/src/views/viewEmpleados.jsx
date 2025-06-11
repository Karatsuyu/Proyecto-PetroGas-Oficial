import React, { useEffect, useState } from "react";
import "./css/empleados.css";
import {
  Buscar,
  AgregarEmpleado,
  ActualizarEmpleado,
  EliminarEmpleado,
  LimpiarCampos,
  LlenarTabla,
} from "../controllers/controllerEmpleados";

function Empleados() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    LlenarTabla({ setUsuarios });
  }, []);

  return (
    <div className="contenedor2empleados">
      <label className="Tituloempleados">Registro Empleados</label>

      <label className="label1empleados" style={{ position: "absolute", top: "13%", left: "2%" }}>
        Nombre
      </label>
      <input
        className="inputempleados"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
        style={{ position: "absolute", top: "18%", left: "2%" }}
      />

      <label className="label1empleados" style={{ position: "absolute", top: "26%", left: "2%" }}>
        Edad
      </label>
      <input
        className="inputempleados"
        type="number"
        value={edad}
        onChange={(e) => setEdad(e.target.value)}
        placeholder="Edad"
        style={{ position: "absolute", top: "31%", left: "2%" }}
      />

      <label className="label1empleados" style={{ position: "absolute", top: "39%", left: "2%" }}>
        Correo
      </label>
      <input
        className="inputempleados"
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="Correo"
        style={{ position: "absolute", top: "44%", left: "2%" }}
      />

      <label className="label1empleados" style={{ position: "absolute", top: "52%", left: "2%" }}>
        Teléfono
      </label>
      <input
        className="inputempleados"
        type="number"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        placeholder="Teléfono"
        style={{ position: "absolute", top: "57%", left: "2%" }}
      />

      <label className="label1empleados" style={{ position: "absolute", top: "65%", left: "2%" }}>
        Cédula
      </label>
      <input
        className="inputempleados"
        type="number"
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
        placeholder="Cédula"
        style={{ position: "absolute", top: "70%", left: "2%" }}
      />

      <label className="label1empleados" style={{ position: "absolute", top: "80%", left: "2%" }}>
        Contraseña
      </label>
      <input
        className="inputempleados"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        style={{ position: "absolute", top: "85%", left: "2%" }}
      />

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
            llenarTabla: () => LlenarTabla({ setUsuarios }),
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
            cedula,
            nombre,
            correo,
            edad,
            telefono,
            password,
            llenarTabla: () => LlenarTabla({ setUsuarios }),
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
            llenarTabla: () => LlenarTabla({ setUsuarios }),
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

      <button
        className="botonBuscarempleados"
        onClick={() =>
          Buscar({
            cedula,
            setNombre,
            setEdad,
            setCorreo,
            setTelefono,
            setPassword,
          })
        }
      >
        Buscar
      </button>

      <div
        className="tablaempleados-container"
        style={{ position: "absolute", top: "50%", left: "30%", width: "60%" }}
      >
        <table className="tablaempleados">
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
            {usuarios.map((usuario) => (
              <tr key={usuario.cedula}>
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
    </div>
  );
}

export default Empleados;
