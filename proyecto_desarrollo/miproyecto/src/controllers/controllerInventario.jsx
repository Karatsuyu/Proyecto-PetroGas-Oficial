import axios from "axios";

export function Agregar_producto({ productos, stock, valor, llenarTabla }) {
  axios
    .post(`http://localhost:8000/api/Inventario/`, {
      productos: productos,
      stock: stock,
      valor: valor,
    })
    .then((Response) => {
      alert("Producto agregado");
      llenarTabla();
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function Actualizar_inventario({
  productos,
  stock,
  valor,
  llenarTabla,
  Limpiar_campos,
}) {
  if (productos) {
    axios
      .put(`http://localhost:8000/api/Inventario/${productos}/`, {
        productos: productos,
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
    alert("Seleccione un producto para actualizar");
  }
}

export function Eliminar_inventario({ productos, llenarTabla, Limpiar_campos }) {
  if (productos) {
    axios
      .delete(`http://localhost:8000/api/Inventario/${productos}/`)
      .then(() => {
        alert("Producto eliminado del inventario");
        llenarTabla();
        Limpiar_campos();
      })
      .catch((err) => {
        console.error(err);
        alert("Error al eliminar");
      });
  } else {
    alert("Seleccione un producto para eliminar");
  }
}

export function Limpiar_campos({ setProductos, setStock, setValor }) {
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
