import axios from "axios";

export function Cliente_existe({
  cedula,
  productos,
  stock,
  valor,
  Agregar_producto,
}) {
  if (productos && stock && valor) {
    axios
      .get(`http://localhost:8000/api/Clientes/?cedula=${cedula}`)
      .then((res) => {
        const datos = res.data;
        if (datos.length === 0) {
          alert("No existe cliente");
        } else {
          Agregar_producto();
        }
      })
      .catch(() => {
        alert("El cliente no existe");
      });
  } else {
    alert("Error: complete todos los campos");
  }
}

export function Agregar_producto({
  productos,
  cedula,
  stock,
  valor,
  llenarTabla,
}) {
  axios
    .post(`http://localhost:8000/api/Compras/`, {
      productos: productos,
      cedula: cedula,
      stock: stock,
      valor: valor,
    })
    .then((Response) => {
      alert("Producto agregado");
      console.log(Response.data);
      llenarTabla();
    })
    .catch((Error) => {
      console.log(Error);
      alert("Error al agregar producto");
    });
}

export function Actualizar_compra({
  cedula,
  productos,
  stock,
  valor,
  llenarTabla,
  Limpiar_campos,
}) {
  if (cedula) {
    axios
      .patch(`http://localhost:8000/api/Compras/${cedula}/`, {
        productos: productos,
        cedula: cedula,
        stock: stock,
        valor: valor,
      })
      .then((res) => {
        alert("Compra actualizada");
        llenarTabla();
        Limpiar_campos();
      })
      .catch((err) => {
        console.error(err);
        alert("Error al actualizar compra");
      });
  } else {
    alert("Ingrese una cédula para actualizar");
  }
}

export function Eliminar_compra({ cedula, llenarTabla, Limpiar_campos }) {
  if (cedula) {
    axios
      .delete(`http://localhost:8000/api/Compras/${cedula}/`)
      .then(() => {
        alert("Compra eliminada");
        llenarTabla();
        Limpiar_campos();
      })
      .catch((err) => {
        console.error(err);
        alert("Error al eliminar compra");
      });
  } else {
    alert("Ingrese una cédula para eliminar");
  }
}

export function Limpiar_campos({
  setCedula,
  setProductos,
  setStock,
  setValor,
}) {
  setCedula("");
  setProductos("");
  setStock("");
  setValor("");
}

export function llenarTabla({ setCompras }) {
  axios
    .get(`http://localhost:8000/api/Compras/`)
    .then((res) => {
      setCompras(res.data);
    })
    .catch((err) => {
      console.log("Error al obtener compras:", err);
    });
}

export function obtenerEmpleados({ setEmpleados }) {
  axios
    .get("http://localhost:8000/api/Empleados/")
    .then((res) => {
      setEmpleados(res.data);
    })
    .catch((err) => {
      console.error("Error al obtener empleados:", err);
    });
}
