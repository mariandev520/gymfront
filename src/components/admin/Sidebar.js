import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      {/* Botón para abrir el menú en pantallas pequeñas */}
      <button className="button is-primary is-small is-hidden-desktop" onClick={toggleMenu}>
        <span className="icon">
          <i className="fas fa-bars"></i>
        </span>
      </button>

      {/* Barra lateral */}
      <aside className={`menu ${isActive ? 'is-active' : ''} is-hidden-mobile`}>
        <p className="menu-label">Administración</p>
        <ul className="menu-list">
          <li><Link to="/administracion/clientes">Clientes</Link></li>
          <li><Link to="/administracion/actividades">Actividades</Link></li>
          <li><Link to="/administracion/profesores">Profesores</Link></li>
          <li><Link to="/administracion/pagos">Pagos</Link></li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
