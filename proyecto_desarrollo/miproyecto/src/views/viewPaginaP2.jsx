import React, { useState } from "react";
import './css/paginaP2.css';
import { useNavigate } from "react-router-dom";
import { irARegistrarClientes, irACompras, irAInventario } from "../controllers/controllerPaginaP2";

function PaginaP2() {
    const navigate = useNavigate();
    const [showHelp, setShowHelp] = useState(false);

    function Componentes() {
        return (
            <div>
                <div className="contenedor2paginaP2">
                    <label className="TitulopaginaP2">Página principal</label>
                </div>
                <div>
                    <button className="boton1paginaP2" onClick={() => irARegistrarClientes(navigate)}>
                        Registrar Clientes
                    </button>
                    <button className="botonInventarioPaginaP2" onClick={() => irAInventario(navigate)}>
                        Inventario
                    </button>
                    <button className="boton2paginaP2" onClick={() => irACompras(navigate)}>
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
        <div className="contenedor1paginaP2">
            <Componentes />
        </div>
    );
}

export default PaginaP2;
