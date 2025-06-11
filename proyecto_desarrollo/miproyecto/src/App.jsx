import React from "react";
import Login from "./views/viewLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaP from "./views/viewPaginaP"
import PaginaP2 from "./views/viewPaginaP2";
import Empleados from "./views/viewEmpleados";
import Clientes from "./views/viewClientes";
import Compras from "./views/viewCompras";
import Inventario from "./views/viewInventario";




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