import React from "react";
import Login from "./components/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaP from "./components/paginaP";
import PaginaP2 from "./components/paginaP2";
import Empleados from "./components/empleados";
import Clientes from "./components/clientes";
import Compras from "./components/compras";
import Inventario from "./components/inventario";




function App () {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/paginaP" element={<PaginaP/>} />
        <Route path="/paginaP2" element={<PaginaP2/>} />
        <Route path="/empleados" element={<Empleados/>} />
        <Route path="/clientes" element={<Clientes/>} />
        <Route path="/compras" element={<Compras/>} />
        <Route path="/inventario" element={<Inventario/>} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;