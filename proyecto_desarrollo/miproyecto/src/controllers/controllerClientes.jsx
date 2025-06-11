import axios from "axios";

export function Buscar({ cedula, setNombre, setEdad, setCorreo, setTelefono }) {
  if (cedula) {
    axios
      .get(`http://localhost:8000/api/Clientes/?cedula=${cedula}`)
      .then((Response) => {
        const Empleado = Response.data[0];
          setNombre(Empleado.nombre);
          setEdad(Empleado.edad);
          setCorreo(Empleado.correo);
          setTelefono(Empleado.telefono);
          alert("Cliente encontrado");
      })
      .catch((Error) => {
        console.log(Error);
        alert("Error al buscar cliente");
      });
  } else {
    alert("Ingrese una cédula para buscar");
  }
}

export function Agregar_cliente({
  nombre,
  edad,
  correo,
  telefono,
  cedula,
  setUsuarios,
  llenarTabla,
  Limpiar_campos,
}) {
  if (nombre && edad && correo && telefono && cedula) {
    axios
      .post(`http://localhost:8000/api/Clientes/`, {
        nombre: nombre,
        correo: correo,
        edad: edad,
        telefono: telefono,
        cedula: cedula,
        user: "cliente",
      })
      .then((Response) => {
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

export function Actualizar_cliente({
  nombre,
  edad,
  correo,
  telefono,
  cedula,
  llenarTabla,
  Limpiar_campos,
}) {
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

export function Eliminar_cliente({ cedula, llenarTabla, Limpiar_campos }) {
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

export function Limpiar_campos({
  setNombre,
  setEdad,
  setCorreo,
  setTelefono,
  setCedula,
}) {
  setNombre("");
  setEdad("");
  setCorreo("");
  setTelefono("");
  setCedula("");
}

export function llenarTabla({ setUsuarios }) {
  axios
    .get(`http://localhost:8000/api/Clientes/`)
    .then((Response) => {
      setUsuarios(Response.data);
    })
    .catch((Error) => {
      console.log("Error al obtener clientes:", Error);
    });
}
