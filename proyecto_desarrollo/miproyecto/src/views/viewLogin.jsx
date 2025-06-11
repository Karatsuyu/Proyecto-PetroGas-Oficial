import React, { useState } from "react";
import "./css/login.css";
import { useNavigate } from "react-router-dom";
import { Validar } from "../controllers/controllerLogin";

function Login() {
  const [cedula, setCedula] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="fondo-login">
      <div className="contenedor1login">
        <input
          className="input1"
          type="number"
          value={cedula}
          placeholder="Cédula"
          onChange={(e) => setCedula(e.target.value)}
          style={{ position: "absolute", top: "30%", left: "38%" }}
        />
        <input
          className="input1"
          type="password"
          value={contraseña}
          placeholder="Contraseña"
          onChange={(e) => setContraseña(e.target.value)}
          style={{ position: "absolute", top: "40%", left: "38%" }}
        />

        <div>
          <div className="contenedor2login">
            <label className="Titulo">Login</label>
          </div>
          <div>
            <button
              className="boton1"
              onClick={() =>
                Validar({ cedula, contraseña, navigate })
              }
            >
              Ingresar
            </button>
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
              Si tienes inconvenientes para iniciar sesión, escribe a
              <br />
              <strong>soporte@petrogas.com</strong> o llama al&nbsp;
              <strong>(+57) 300 123 4567</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
