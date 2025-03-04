import React, { useState } from "react";
import Navbar from "/Navbar";
import Sidebar from "/Sidebar"; // Asegúrate de que la ruta sea correcta
import Clientes from "/Clientes"; // Asegúrate de que la ruta sea correcta

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          className={`bg-gray-800 text-white w-64 flex-shrink-0 overflow-y-auto transition-transform duration-300 transform fixed top-0 left-0 mt-16 h-full z-40 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:h-auto md:mt-0`}
        >
          <Sidebar>
            {/* Aquí puedes agregar contenido adicional al Sidebar si es necesario */}
          </Sidebar>
        </div>

        {/* Contenido principal (Clientes) */}
        <div
          className={`flex-1 overflow-y-auto bg-gray-100 p-4 md:p-8 transition-transform duration-300 ${
            isSidebarOpen ? "ml-0" : "ml-0"
          } md:ml-64`}
        >
          <Clientes />
        </div>
      </div>
    </div>
  );
};

export default Layout;