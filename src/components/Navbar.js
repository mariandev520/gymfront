import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-700 shadow-lg">
      <div className=" mx-auto ">
        <div className="flex justify-between tems-center">
          {/* Logo y marca */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-white text-xl font-bold hover:text-gray-200 transition duration-300"
            >
              GYM ADMIN
            </Link>
          </div>

          {/* Menú hamburguesa (para móviles) */}
          <div className="">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          {/* Enlaces del navbar (para escritorio) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/mis-datos"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Mis Datos
            </Link>
            <Link
              to="/administracion"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Administración
            </Link>
          </div>
        </div>
      </div>

      {/* Menú desplegable (para móviles) */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/mis-datos"
              className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition duration-300"
            >
              Mis Datos
            </Link>
            <Link
              to="/administracion"
              className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition duration-300"
            >
              Administración
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;