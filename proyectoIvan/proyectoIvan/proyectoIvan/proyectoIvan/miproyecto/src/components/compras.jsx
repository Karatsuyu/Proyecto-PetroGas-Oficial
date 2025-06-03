import React, { useEffect, useState } from "react";
import './compras.css';
import axios from 'axios';

function Compras() {
    const [cedula, setCedula] = useState('');
    const [productos, setProductos] = useState('');
    const [stock, setStock] = useState('');
    const [valor, setValor] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [compras, setCompras] = useState([]);
    const [showHelp, setShowHelp] = useState(false);

    function Cliente_existe() {
        if (productos && stock && valor) {
            axios.get(`http://localhost:8000/api/Clientes/?cedula=${cedula}`)
                .then((res) => {
                    const datos = res.data;
                    if (datos.length === 0) {
                        alert("no existe cliente");
                    } else {
                        Agregar_producto();
                    }
                })
                .catch(() => {
                    alert("el cliente no existe");
                });
        } else {
            alert("Error");
        }
    }

    function Agregar_producto() {
        axios.post(`http://localhost:8000/api/Compras/`, {
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

    function Actualizar_compra() {
        if (cedula) {
            axios.patch(`http://localhost:8000/api/Compras/${cedula}/`, {
                productos: productos,
                cedula: cedula,
                stock: stock,
                valor: valor
            })
                .then(res => {
                    alert("Compra actualizada");
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

    function Eliminar_compra() {
        if (cedula) {
            axios.delete(`http://localhost:8000/api/Compras/${cedula}/`)
                .then(() => {
                    alert("Compra eliminada");
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
        axios.get(`http://localhost:8000/api/Compras/`)
            .then(res => {
                setCompras(res.data);
            })
            .catch(err => {
                console.log("Error al obtener compras:", err);
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
                <div className="contenedor2compras">
                    <label className="Titulocompras">compras</label>
                </div>
                <label className="label1compras" style={{ position: 'absolute', top: '20%', left: '2%' }}>Cedula</label>
                <label className="label1compras" style={{ position: 'absolute', top: '37%', left: '2%' }}>Productos</label>
                <label className="label1compras" style={{ position: 'absolute', top: '45%', left: '2%' }}>Stock</label>
                <label className="label1compras" style={{ position: 'absolute', top: '61%', left: '2%' }}>Valor</label>

                <select className="selectcompras" value={productos} onChange={(e) => setProductos(e.target.value)}>
                    <option hidden={true}>productos</option>
                    <option value='Gasolina Regular'>Gasolina Regular</option>
                    <option value='Gasolina premium'>Gasolina Premium</option>
                    <option value='Diesel'>Diésel</option>
                    <option value='Aceite de motor'>Aceite de motor</option>
                    <option value='Lubricante'>Lubricantes</option>
                    <option value='Refrigeracion'>Refrigerantes</option>
                </select>

                <button className="boton1compras" onClick={Cliente_existe}>Agregar</button>
                <button className="boton2compras" onClick={Actualizar_compra}>Actualizar</button>
                <button className="boton3compras" onClick={Eliminar_compra}>Eliminar</button>
                <button className="boton4compras" onClick={Limpiar_campos}>Limpiar campos</button>

                <div className="contenedor" style={{ position: 'absolute', top: '10%', left: '48%' }}>
                    <table className="tabla1compras">
                        <thead>
                            <tr>
                                <th>productos</th>
                                <th>cedula</th>
                                <th>stock</th>
                                <th>valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compras.map((item, idex) =>
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
                <input className="input1compras" type="number" value={cedula} placeholder="cedula" onChange={(e) => setCedula(e.target.value)} style={{ position: 'absolute', top: '25%', left: '2%' }} />
                <input className="input1compras" type="number" value={stock} placeholder="stock" onChange={(e) => setStock(e.target.value)} style={{ position: 'absolute', top: '50%', left: '2%' }} />
                <input className="input1compras" type="number" value={valor} placeholder="valor" onChange={(e) => setValor(e.target.value)} style={{ position: 'absolute', top: '66%', left: '2%' }} />
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
                        Si tienes inconvenientes para registrar compras, escribe a<br />
                        <strong>soporte@petrogas.com</strong> o llama al&nbsp;
                        <strong>(+57) 300 123 4567</strong>.
                    </p>
                </div>
            )}
        </div>
    );
}

export default Compras;
