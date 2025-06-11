import React, { useState } from "react";
import './paginaP.css';
import { useNavigate } from "react-router-dom";

function PaginaP() {
    const navigate = useNavigate();
    const [showHelp, setShowHelp] = useState(false);

    function irARegistrarEmpleados() {
        navigate('/empleados');
    }

    function irACompras() {
        navigate('/compras');
    }

    function irAInventario() {
        navigate('/inventario');
    }

    function Componentes() {
        return (
            <div>
                <div className="contenedor2paginaP">
                    <label className="TitulopaginaP">Página principal</label>
                </div>
                <div>
                    <button className="boton1paginaP" onClick={irARegistrarEmpleados}>
                        Registrar Empleados
                    </button>
                    <button className="botonInventarioPaginaP" onClick={irAInventario}>
                        Inventario
                    </button>
                    <button className="boton2paginaP" onClick={irACompras}>
                        Realizar Compras
                    </button>
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
                            Si tienes inconvenientes para usar la plataforma, escribe a
                            <br />
                            <strong>soporte@petrogas.com</strong> o llama al&nbsp;
                            <strong>(+57) 300 123 4567</strong>.
                        </p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="contenedor1paginaP">
            <Componentes />
        </div>
    );
}

export default PaginaP;
