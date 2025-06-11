import React, { useEffect, useState } from "react";
import "./css/inventario.css";
import {
  Agregar_producto,
  Actualizar_inventario,
  Eliminar_inventario,
  Limpiar_campos,
  llenarTabla,
} from "../controllers/controllerInventario";

function Inventario() {
  const [productos, setProductos] = useState("");
  const [stock, setStock] = useState("");
  const [valor, setValor] = useState("");
  const [inventario, setInventario] = useState([]);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    llenarTabla({ setInventario });
  }, []);


  const seleccionarProducto = (producto) => {
    setProductos(producto.productos);
    setStock(producto.stock);
    setValor(producto.valor);
  };

  function Componentes() {
    return (
      <div>
        <div className="contenedor2inventario">
          <label className="Tituloinventario">Inventario</label>
        </div>
        <label className="label1inventario" style={{ position: "absolute", top: "34%", left: "2%" }}>
          Productos
        </label>
        <label className="label1inventario" style={{ position: "absolute", top: "43%", left: "2%" }}>
          Stock
        </label>
        <label className="label1inventario" style={{ position: "absolute", top: "58%", left: "2%" }}>
          Valor
        </label>

        <select
          className="selectinventario"
          value={productos}
          onChange={(e) => setProductos(e.target.value)}
        >
          <option hidden={true}>productos</option>
          <option value="Gasolina Regular">Gasolina Regular</option>
          <option value="Gasolina premium">Gasolina Premium</option>
          <option value="Diesel">Diésel</option>
          <option value="Aceite de motor">Aceite de motor</option>
          <option value="Lubricante">Lubricantes</option>
          <option value="Refrigeracion">Refrigerantes</option>
        </select>

        <button
          className="boton1inventario"
          onClick={() =>
            Agregar_producto({
              productos,
              stock,
              valor,
              llenarTabla: () => llenarTabla({ setInventario }),
            })
          }
        >
          Agregar
        </button>

        <button
          className="boton2inventario"
          onClick={() =>
            Actualizar_inventario({
              productos,
              stock,
              valor,
              llenarTabla: () => llenarTabla({ setInventario }),
              Limpiar_campos: () => Limpiar_campos({ setProductos, setStock, setValor }),
            })
          }
        >
          Actualizar
        </button>

        <button
          className="boton3inventario"
          onClick={() =>
            Eliminar_inventario({
              productos,
              llenarTabla: () => llenarTabla({ setInventario }),
              Limpiar_campos: () => Limpiar_campos({ setProductos, setStock, setValor }),
            })
          }
        >
          Eliminar
        </button>

        <button
          className="boton4inventario"
          onClick={() => Limpiar_campos({ setProductos, setStock, setValor })}
        >
          Limpiar campos
        </button>

        <div className="contenedor" style={{ position: "absolute", top: "10%", left: "45%" }}>
          <table className="tabla1inventario">
            <thead>
              <tr>
                <th>productos</th>
                <th>stock</th>
                <th>valor</th>
              </tr>
            </thead>
            <tbody>
              {inventario.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => seleccionarProducto(item)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{item.productos}</td>
                  <td>{item.stock}</td>
                  <td>{item.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="contenedor1compras">
      <form>
        <input
          className="input1inventario"
          type="number"
          value={stock}
          placeholder="stock"
          onChange={(e) => setStock(e.target.value)}
          style={{ position: "absolute", top: "48%", left: "2%" }}
        />
        <input
          className="input1inventario"
          type="number"
          value={valor}
          placeholder="valor"
          onChange={(e) => setValor(e.target.value)}
          style={{ position: "absolute", top: "63%", left: "2%" }}
        />
      </form>

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
            Si tienes inconvenientes para registrar el inventario, escribe a
            <br />
            <strong>soporte@petrogas.com</strong> o llama al&nbsp;
            <strong>(+57) 300 123 4567</strong>.
          </p>
        </div>
      )}
    </div>
  );
}

export default Inventario;
