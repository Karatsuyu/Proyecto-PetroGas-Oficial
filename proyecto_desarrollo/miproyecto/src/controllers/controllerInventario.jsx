import axios from "axios";

export function Empleado_existe({ cedula, productos, stock, valor, Agregar_producto }) {
  if (productos && stock && valor) {
    axios
      .get(`http://localhost:8000/api/Empleados/?cedula=${cedula}`)
      .then((res) => {
        const datos = res.data;
        if (datos.length === 0) {
          alert("No existe empleado");
        } else {
          Agregar_producto();
        }
      })
      .catch(() => {
        alert("El empleado no existe");
      });
  } else {
    alert("Error: complete todos los campos");
  }
}

export function Agregar_producto({ productos, cedula, stock, valor, llenarTabla }) {
  axios
    .post(`http://localhost:8000/api/Inventario/`, {
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
    });
}

export function Actualizar_inventario({
  cedula,
  productos,
  stock,
  valor,
  llenarTabla,
  Limpiar_campos,
}) {
  if (cedula) {
    axios
      .patch(`http://localhost:8000/api/Inventario/${cedula}/`, {
        productos: productos,
        cedula: cedula,
        stock: stock,
        valor: valor,
      })
      .then(() => {
        alert("Inventario actualizado");
        llenarTabla();
        Limpiar_campos();
      })
      .catch((err) => {
        console.error(err);
        alert("Error al actualizar");
      });
  } else {
    alert("Ingrese una cédula para actualizar");
  }
}

export function Eliminar_inventario({ cedula, llenarTabla, Limpiar_campos }) {
  if (cedula) {
    axios
      .delete(`http://localhost:8000/api/Inventario/${cedula}/`)
      .then(() => {
        alert("Inventario eliminado");
        llenarTabla();
        Limpiar_campos();
      })
      .catch((err) => {
        console.error(err);
        alert("Error al eliminar");
      });
  } else {
    alert("Ingrese una cédula para eliminar");
  }
}

export function Limpiar_campos({ setCedula, setProductos, setStock, setValor }) {
  setCedula("");
  setProductos("");
  setStock("");
  setValor("");
}

export function llenarTabla({ setInventario }) {
  axios
    .get(`http://localhost:8000/api/Inventario/`)
    .then((res) => {
      setInventario(res.data);
    })
    .catch((err) => {
      console.log("Error al obtener inventario:", err);
    });
}

export function obtenerEmpleados({ setUsuarios }) {
  axios
    .get("http://localhost:8000/api/Empleados/")
    .then((res) => {
      const data = Array.isArray(res.data) ? res.data : res.data.results || res.data.data || [];
      setUsuarios(data);
    })
    .catch((err) => {
      console.error("Error al obtener empleados:", err);
    });
}
