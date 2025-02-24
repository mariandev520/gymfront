import React from 'react';
import { Link } from 'react-router-dom';
import './estilos/Navbar.css'; // Importa el archivo CSS

const Navbar = () => {
  return (
    <nav className="navbar"> {/* Elimina la clase is-primary para personalizar */}
      <div className="navbar-container"> {/* Nuevo contenedor para centrar y controlar ancho */}
        <div className="navbar-brand">
          <Link className="navbar-item" to="/"> {/* Enlace al inicio */}
          GYM ADMIN
          </Link>
          {/* Botón para menú hamburguesa en responsive */}
          <div className="navbar-burger" data-target="navbarBasicExample">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <Link className="navbar-item" to="/">Login</Link>
            <Link className="navbar-item" to="/mis-datos">Mis Datos</Link>
            <Link className="navbar-item" to="/administracion">Administración</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;