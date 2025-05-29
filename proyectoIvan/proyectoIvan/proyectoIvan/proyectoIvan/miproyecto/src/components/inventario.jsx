import React, { useEffect, useState } from "react";
import './inventario.css';
import axios from 'axios';

function Inventario() {
    const [cedula, setCedula] = useState('');
    const [productos, setProductos] = useState('');
    const [stock, setStock] = useState('');
    const [valor, setValor] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [inventario, setInventario] = useState([]);
    const [showHelp, setShowHelp] = useState(false);

    function Empleado_existe() {
        if (productos && stock && valor) {
            axios.get(`http://localhost:8000/api/Empleados/?cedula=${cedula}`)
                .then((res) => {
                    const datos = res.data;
                    if (datos.length === 0) {
                        alert("no existe empleado");
                    } else {
                        Agregar_producto();
                    }
                })
                .catch(() => {
                    alert("el empleado no existe");
                });
        } else {
            alert("Error");
        }
    }

    function Agregar_producto() {
        axios.post(`http://localhost:8000/api/Inventario/`, {
            productos: productos,
            cedula: cedula,
            stock: stock,
            valor: valor
        })
            .then((Response) => {
                alert("producto agregado");
                console.log(Response.data);
                llenarTabla();
            })
            .catch((Error) => {
                console.log(Error);
            });
    }

    function Actualizar_inventario() {
        if (cedula) {
            axios.patch(`http://localhost:8000/api/Inventario/${cedula}/`, {
                productos: productos,
                cedula: cedula,
                stock: stock,
                valor: valor
            })
                .then(res => {
                    alert("Inventario actualizado");
                    llenarTabla();
                    Limpiar_campos();
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al actualizar");
                });
        } else {
            alert("Ingrese una cédula para actualizar");
        }
    }

    function Eliminar_inventario() {
        if (cedula) {
            axios.delete(`http://localhost:8000/api/Inventario/${cedula}/`)
                .then(() => {
                    alert("Inventario eliminada");
                    llenarTabla();
                    Limpiar_campos();
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al eliminar");
                });
        } else {
            alert("Ingrese una cédula para eliminar");
        }
    }

    function Limpiar_campos() {
        setCedula("");
        setProductos("");
        setStock("");
        setValor("");
    }

    function llenarTabla() {
        axios.get(`http://localhost:8000/api/Inventario/`)
            .then(res => {
                setInventario(res.data);
            })
            .catch(err => {
                console.log("Error al obtener inventario:", err);
            });
    }

    function obtenerEmpleados() {
        axios.get('http://localhost:8000/api/Empleados/')
            .then(res => {
                const data = Array.isArray(res.data) ? res.data : res.data.results || res.data.data || [];
                setEmpleados(data);
            })
            .catch(err => {
                console.error("Error al obtener empleados:", err);
            });
    }

    useEffect(() => {
        llenarTabla();
        obtenerEmpleados();
    }, []);

    function Componentes() {
        return (
            <div>
                <div className="contenedor2inventario">
                    <label className="Tituloinventario">Inventario</label>
                </div>
                <label className="label1inventario" style={{ position: 'absolute', top: '29%', left: '2%' }}>Cedula</label>
                <label className="label1inventario" style={{ position: 'absolute', top: '45%', left: '2%' }}>Productos</label>
                <label className="label1inventario" style={{ position: 'absolute', top: '53%', left: '2%' }}>Stock</label>
                <label className="label1inventario" style={{ position: 'absolute', top: '66%', left: '2%' }}>Valor</label>

                <select className="selectinventario" value={productos} onChange={(e) => setProductos(e.target.value)}>
                    <option hidden={true}>productos</option>
                    <option value='Gasolina Regular'>Gasolina Regular</option>
                    <option value='Gasolina premium'>Gasolina Premium</option>
                    <option value='Diesel'>Diésel</option>
                    <option value='Aceite de motor'>Aceite de motor</option>
                    <option value='Lubricante'>Lubricantes</option>
                    <option value='Refrigeracion'>Refrigerantes</option>
                </select>

                <button className="boton1inventario" onClick={Empleado_existe}>Agregar</button>
                <button className="boton2inventario" onClick={Actualizar_inventario}>Actualizar</button>
                <button className="boton3inventario" onClick={Eliminar_inventario}>Eliminar</button>
                <button className="boton4inventario" onClick={Limpiar_campos}>Limpiar_campos</button>

                <div className="contenedor" style={{ position: 'absolute', top: '10%', left: '48%' }}>
                    <table className="tabla1inventario">
                        <thead>
                            <tr>
                                <th>productos</th>
                                <th>cedula</th>
                                <th>stock</th>
                                <th>valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventario.map((item, idex) =>
                                <tr key={idex}>
                                    <td>{item.productos}</td>
                                    <td>{item.cedula}</td>
                                    <td>{item.stock}</td>
                                    <td>{item.valor}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return (
        <div className="contenedor1compras">
            <form>
                <input className="input1inventario" type="number" value={cedula} placeholder="cedula" onChange={(e) => setCedula(e.target.value)} style={{ position: 'absolute', top: '33%', left: '2%' }} />
                <input className="input1inventario" type="number" value={stock} placeholder="stock" onChange={(e) => setStock(e.target.value)} style={{ position: 'absolute', top: '57%', left: '2%' }} />
                <input className="input1inventario" type="number" value={valor} placeholder="valor" onChange={(e) => setValor(e.target.value)} style={{ position: 'absolute', top: '70%', left: '2%' }} />
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
                        Si tienes inconvenientes para registrar el inventario, escribe a<br />
                        <strong>soporte@petrogas.com</strong> o llama al&nbsp;
                        <strong>(+57) 300 123 4567</strong>.
                    </p>
                </div>
            )}
        </div>
    );
}

export default Inventario;
