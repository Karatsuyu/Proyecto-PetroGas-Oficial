import React, { useEffect, useState } from "react";
import "./css/compras.css";
import {
  Cliente_existe,
  Agregar_producto,
  Actualizar_compra,
  Eliminar_compra,
  Limpiar_campos,
  llenarTabla,
  obtenerEmpleados,
} from "../controllers/controllerCompras";

function ViewsCompras() {
  const [cedula, setCedula] = useState("");
  const [productos, setProductos] = useState("");
  const [stock, setStock] = useState("");
  const [valor, setValor] = useState("");
  const [compras, setCompras] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    llenarTabla({ setCompras });
    obtenerEmpleados({ setEmpleados });
  }, []);

  return (
    <div className="contenedor1compras">
      <form>
        <input
          className="input1compras"
          type="number"
          value={cedula}
          placeholder="cedula"
          onChange={(e) => setCedula(e.target.value)}
          style={{ position: "absolute", top: "25%", left: "2%" }}
        />
        <input
          className="input1compras"
          type="number"
          value={stock}
          placeholder="stock"
          onChange={(e) => setStock(e.target.value)}
          style={{ position: "absolute", top: "50%", left: "2%" }}
        />
        <input
          className="input1compras"
          type="number"
          value={valor}
          placeholder="valor"
          onChange={(e) => setValor(e.target.value)}
          style={{ position: "absolute", top: "66%", left: "2%" }}
        />
      </form>

      <div>
        <div className="contenedor2compras">
          <label className="Titulocompras">Compras</label>
        </div>

        <label
          className="label1compras"
          style={{ position: "absolute", top: "20%", left: "2%" }}
        >
          Cedula
        </label>
        <label
          className="label1compras"
          style={{ position: "absolute", top: "37%", left: "2%" }}
        >
          Productos
        </label>
        <label
          className="label1compras"
          style={{ position: "absolute", top: "45%", left: "2%" }}
        >
          Stock
        </label>
        <label
          className="label1compras"
          style={{ position: "absolute", top: "61%", left: "2%" }}
        >
          Valor
        </label>

        <select
          className="selectcompras"
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
          className="boton1compras"
          onClick={() =>
            Cliente_existe({
              cedula,
              productos,
              stock,
              valor,
              Agregar_producto: () =>
                Agregar_producto({
                  productos,
                  cedula,
                  stock,
                  valor,
                  llenarTabla: () => llenarTabla({ setCompras }),
                }),
            })
          }
        >
          Agregar
        </button>

        <button
          className="boton2compras"
          onClick={() =>
            Actualizar_compra({
              cedula,
              productos,
              stock,
              valor,
              llenarTabla: () => llenarTabla({ setCompras }),
              Limpiar_campos: () =>
                Limpiar_campos({
                  setCedula,
                  setProductos,
                  setStock,
                  setValor,
                }),
            })
          }
        >
          Actualizar
        </button>

        <button
          className="boton3compras"
          onClick={() =>
            Eliminar_compra({
              cedula,
              llenarTabla: () => llenarTabla({ setCompras }),
              Limpiar_campos: () =>
                Limpiar_campos({
                  setCedula,
                  setProductos,
                  setStock,
                  setValor,
                }),
            })
          }
        >
          Eliminar
        </button>

        <button
          className="boton4compras"
          onClick={() =>
            Limpiar_campos({
              setCedula,
              setProductos,
              setStock,
              setValor,
            })
          }
        >
          Limpiar campos
        </button>

        <div
          className="contenedor"
          style={{ position: "absolute", top: "10%", left: "34%" }}
        >
          <table className="tabla1compras">
            <thead>
              <tr>
                <th>Productos</th>
                <th>Cédula</th>
                <th>Stock</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {compras.map((item, index) => (
                <tr key={index}>
                  <td>{item.productos}</td>
                  <td>{item.cedula}</td>
                  <td>{item.stock}</td>
                  <td>{item.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
            Si tienes inconvenientes para registrar compras, escribe a
            <br />
            <strong>soporte@petrogas.com</strong> o llama al&nbsp;
            <strong>(+57) 300 123 4567</strong>.
          </p>
        </div>
      )}
    </div>
  );
}

export default ViewsCompras;
