import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faDumbbell,
  faUserTie,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const location = useLocation();
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <aside
      className={`bg-gray-800 text-white h-screen p-4 transition-all duration-300 ${
        isMinimized ? "w-20" : "w-64"
      }`}
    >
      {/* Botón para minimizar/maximizar la barra lateral */}
      <button
        onClick={toggleSidebar}
        className="block w-full text-left mb-4 p-2 hover:bg-gray-700 rounded-lg transition duration-300"
      >
        <div className="space-y-1">
          <span className="block w-6 h-1 bg-white"></span>
          <span className="block w-6 h-1 bg-white"></span>
          <span className="block w-6 h-1 bg-white"></span>
        </div>
      </button>

      {/* Título de la sección */}
      <p className="text-sm font-semibold uppercase text-gray-400 mb-4">
        Administración
      </p>

      {/* Lista de enlaces */}
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
      </ul>
    </aside>
  );
};

export default Sidebar;