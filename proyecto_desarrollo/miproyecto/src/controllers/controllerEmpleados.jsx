import axios from "axios";

export function Buscar({
  cedula,
  setNombre,
  setEdad,
  setCorreo,
  setTelefono,
  setPassword,
}) {
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

export function AgregarEmpleado({
  nombre,
  edad,
  correo,
  telefono,
  cedula,
  password,
  setUsuarios,
  llenarTabla,
  LimpiarCampos,
}) {
  if (nombre && edad && correo && telefono && cedula && password) {
    axios
      .post(`http://localhost:8000/api/Empleados/`, {
        nombre: nombre,
        correo: correo,
        edad: edad,
        telefono: telefono,
        cedula: cedula,
        password: password,
        user: "empleado",
      })
      .then((Response) => {
        alert("Empleado creado");
        llenarTabla();
        LimpiarCampos();
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

export function ActualizarEmpleado({
  cedula,
  nombre,
  correo,
  edad,
  telefono,
  password,
  llenarTabla,
  LimpiarCampos,
}) {
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
        LimpiarCampos();
      })
      .catch((Error) => {
        console.log(Error);
        alert("Error al actualizar");
      });
  } else {
    alert("Ingrese una cédula para actualizar");
  }
}

export function EliminarEmpleado({ cedula, llenarTabla, LimpiarCampos }) {
  if (cedula) {
    axios
      .delete(`http://localhost:8000/api/Empleados/${cedula}/`)
      .then(() => {
        alert("Usuario eliminado");
        llenarTabla();
        LimpiarCampos();
      })
      .catch((Error) => {
        console.log(Error);
        alert("Error al eliminar");
      });
  } else {
    alert("Ingrese una cédula para eliminar");
  }
}

export function LimpiarCampos({
  setNombre,
  setEdad,
  setCorreo,
  setTelefono,
  setCedula,
  setPassword,
}) {
  setNombre("");
  setEdad("");
  setCorreo("");
  setTelefono("");
  setCedula("");
  setPassword("");
}

export function LlenarTabla({ setUsuarios }) {
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
