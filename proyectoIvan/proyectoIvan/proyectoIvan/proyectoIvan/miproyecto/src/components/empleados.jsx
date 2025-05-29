import React, { useEffect, useState } from "react";
import "./empleados.css";
import axios from "axios";

function Empleados() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [showHelp, setShowHelp] = useState(false);

  function Buscar() {
    if (cedula) {
      axios
        .get(`http://localhost:8000/api/Empleados/?cedula=${cedula}`)
        .then((Response) => {
          const Empleados = Response.data[0];
          setNombre(Empleados.nombre);
          setEdad(Empleados.edad);
          setCorreo(Empleados.correo);
          setTelefono(Empleados.telefono);
          setPassword(Empleados.password);
        })
        .catch((Error) => {
          console.log(Error);
          alert("error");
        });
    } else {
      alert("cedula no encontrada");
    }
  }

  function Agregar_empleado() {
    if (nombre && edad && correo && telefono && cedula && password) {
      axios
        .post(`http://localhost:8000/api/Empleados/`, {
          nombre,
          correo,
          edad,
          telefono,
          cedula,
          password,
          user: "empleado",
        })
        .then((Response) => {
          alert("Empleado creado");
          llenarTabla();
          Limpiar_campos();
          setUsuarios((prev) => [...prev, Response.data]);
        })
        .catch((Error) => {
          console.log(Error);
          alert("Error");
        });
    } else {
      alert("Llene todos los campos");
    }
  }

  function Actualizar_empleado() {
    if (cedula) {
      axios
        .patch(`http://localhost:8000/api/Empleados/${cedula}/`, {
          nombre,
          correo,
          edad,
          telefono,
          password,
        })
        .then(() => {
          alert("Empleado actualizado");
          llenarTabla();
          Limpiar_campos();
        })
        .catch((Error) => {
          console.log(Error);
          alert("Error al actualizar");
        });
    } else {
      alert("Ingrese una cédula para actualizar");
    }
  }

  function Eliminar_empleado() {
    if (cedula) {
      axios
        .delete(`http://localhost:8000/api/Empleados/${cedula}/`)
        .then(() => {
          alert("Usuario eliminado");
          llenarTabla();
          Limpiar_campos();
        })
        .catch((Error) => {
          console.log(Error);
          alert("Error al eliminar");
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
    setPassword("");
  }

  function llenarTabla() {
    axios
      .get(`http://localhost:8000/api/Empleados/`)
      .then((Response) => {
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
        <div className="contenedor2empleados">
          <label className="Tituloempleados">Registro Empleados</label>
        </div>
        <div>
          <label className="label1empleados" style={{ position: "absolute", top: "15%", left: "2%" }}>Nombre</label>
          <label className="label1empleados" style={{ position: "absolute", top: "30%", left: "2%" }}>Edad</label>
          <label className="label1empleados" style={{ position: "absolute", top: "45%", left: "2%" }}>Correo</label>
          <label className="label1empleados" style={{ position: "absolute", top: "60%", left: "2%" }}>Teléfono</label>
          <label className="label1empleados" style={{ position: "absolute", top: "75%", left: "2%" }}>Cédula</label>
          <label className="label1empleados" style={{ position: "absolute", top: "90%", left: "2%" }}>Contraseña</label>

          <button className="boton1empleados" onClick={Agregar_empleado}>Agregar</button>
          <button className="boton2empleados" onClick={Actualizar_empleado}>Actualizar</button>
          <button className="boton3empleados" onClick={Eliminar_empleado}>Eliminar</button>
          <button className="boton4empleados" onClick={Limpiar_campos}>Limpiar campos</button>

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

          <button
            className="boton-ayuda"
            onClick={() => setShowHelp(!showHelp)}
            title="Ayuda"
          >
            ?
          </button>

          {showHelp && (
            <div className="tooltip-ayuda">
              <p style={{ margin: 0, fontWeight: "bold" }}>¿Necesitas ayuda?</p>
              <p style={{ margin: 0 }}>
                Si tienes inconvenientes para registrar un empleado, escribe a <br />
                <strong>soporte@petrogas.com</strong> o llama al <strong>(+57) 300 123 4567</strong>.
              </p>
            </div>
          )}

          <table className="tabla1empleados">
            <thead>
              <tr>
                <th>nombre</th>
                <th>edad</th>
                <th>correo</th>
                <th>teléfono</th>
                <th>cédula</th>
                <th>contraseña</th>
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
                  <td>{item.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="contenedor1empleados">
      <form>
        <input
          className="input1empleados"
          value={nombre}
          placeholder="nombre"
          onChange={(e) => setNombre(e.target.value)}
          style={{ position: "absolute", top: "19%", left: "2%" }}
        />
        <input
          className="input1empleados"
          type="number"
          value={edad}
          placeholder="edad"
          onChange={(e) => setEdad(e.target.value)}
          style={{ position: "absolute", top: "34%", left: "2%" }}
        />
        <input
          className="input1empleados"
          value={correo}
          placeholder="correo"
          onChange={(e) => setCorreo(e.target.value)}
          style={{ position: "absolute", top: "49%", left: "2%" }}
        />
        <input
          className="input1empleados"
          type="number"
          value={telefono}
          placeholder="teléfono"
          onChange={(e) => setTelefono(e.target.value)}
          style={{ position: "absolute", top: "64%", left: "2%" }}
        />
        <input
          className="input1empleados"
          type="number"
          value={cedula}
          placeholder="cédula"
          onChange={(e) => setCedula(e.target.value)}
          style={{ position: "absolute", top: "79%", left: "2%" }}
        />
        <input
          className="input1empleados"
          type="password"
          value={password}
          placeholder="contraseña"
          onChange={(e) => setPassword(e.target.value)}
          style={{ position: "absolute", top: "94%", left: "2%" }}
        />
      </form>
      <Componentes />
    </div>
  );
}

export default Empleados;
