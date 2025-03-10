import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faDumbbell,
  faUserTie,
  faMoneyBill,
  faIdCard // <-- IMPORTA UN ÍCONO PARA "Verificar Cliente"
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ children }) => {
  const location = useLocation();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="">
      {/* Botón para menú en móviles */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-2 left-2 bg-gray-900 text-white p-2 rounded-lg z-50"
      >
        <div className="space-y-1">
          <span className="block w-6 h-1 bg-white"></span>
          <span className="block w-6 h-1 bg-white"></span>
          <span className="block w-6 h-1 bg-white"></span>
        </div>
      </button>

      {/* Barra lateral */}
      <aside
        className={`bg-black text-white h-screen p-4 transition-all duration-300 fixed top-0 left-0 z-40 ${
          isMinimized ? "w-20" : "w-64"
        } ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}
      >
        {/* Botón para minimizar en escritorio */}
        <button
          onClick={toggleSidebar}
          className="hidden md:block w-full text-left mb-4 p-2 hover:bg-gray-900 rounded-lg transition duration-300"
        >
          <div className="space-y-1">
            <span className="block w-6 h-1 bg-white"></span>
            <span className="block w-6 h-1 bg-white"></span>
            <span className="block w-6 h-1 bg-white"></span>
          </div>
        </button>

        {/* Sección Admin */}
        <p className="text-sm font-semibold uppercase text-gray-400 mb-4">
          Admin
        </p>

        <ul className="space-y-2">
          <li>
            <Link
              to="/administracion/clientes"
              className={`flex items-center p-2 rounded-lg transition duration-300 ${
                location.pathname === "/administracion/clientes"
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <FontAwesomeIcon icon={faUsers} className="w-6 h-6" />
              {!isMinimized && (
                <span className="ml-3 text-sm font-medium">Clientes</span>
              )}
            </Link>
          </li>

          <li>
            <Link
              to="/administracion/actividades"
              className={`flex items-center p-2 rounded-lg transition duration-300 ${
                location.pathname === "/administracion/actividades"
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <FontAwesomeIcon icon={faDumbbell} className="w-6 h-6" />
              {!isMinimized && (
                <span className="ml-3 text-sm font-medium">Actividades</span>
              )}
            </Link>
          </li>

          <li>
            <Link
              to="/administracion/profes"
              className={`flex items-center p-2 rounded-lg transition duration-300 ${
                location.pathname === "/administracion/profes"
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <FontAwesomeIcon icon={faUserTie} className="w-6 h-6" />
              {!isMinimized && (
                <span className="ml-3 text-sm font-medium">Profesores</span>
              )}
            </Link>
          </li>

          <li>
            <Link
              to="/administracion/pagos"
              className={`flex items-center p-2 rounded-lg transition duration-300 ${
                location.pathname === "/administracion/pagos"
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <FontAwesomeIcon icon={faMoneyBill} className="w-6 h-6" />
              {!isMinimized && (
                <span className="ml-3 text-sm font-medium">Pagos</span>
              )}
            </Link>
          </li>

          {/* NUEVO LINK: VERIFICAR CLIENTE */}
          <li>
            <Link
              to="/administracion/verificar-cliente"
              className={`flex items-center p-2 rounded-lg transition duration-300 ${
                location.pathname === "/administracion/verificar-cliente"
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <FontAwesomeIcon icon={faIdCard} className="w-6 h-6" />
              {!isMinimized && (
                <span className="ml-3 text-sm font-medium">
                  Verificar Cliente
                </span>
              )}
            </Link>
          </li>
        </ul>
      </aside>

      {/* Contenido principal */}
      <div
        className={`flex-grow transition-all duration-300 ${
          isMinimized ? "ml-20" : "ml-64"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
