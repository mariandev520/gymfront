import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar is-primary">
      <div className="navbar-brand">
        <a className="navbar-item">Mi Proyecto</a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          {/* Agregar enlaces de navegación */}
          <Link className="navbar-item" to="/login">Login</Link>
          <Link className="navbar-item" to="/mis-datos">Mis Datos</Link>
          <Link className="navbar-item" to="/administracion">Administración</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
