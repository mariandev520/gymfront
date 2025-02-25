import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "/Sidebar";
import Clientes from "/Clientes";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar la visibilidad del Sidebar en móviles

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Contenedor principal (Sidebar + Clientes) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (visible en escritorio, oculto en móviles por defecto) */}
        <div
          className={`bg-gray-800 text-white w-64 flex-shrink-0 overflow-y-auto transition-transform duration-300 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <Sidebar />
        </div>

        {/* Contenido principal (Clientes) */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-8">
          <Clientes />
        </div>
      </div>
    </div>
  );
};

export default Layout;