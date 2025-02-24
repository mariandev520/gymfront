import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../estilos/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faDumbbell, faUserTie, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const location = useLocation();
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <aside className={`menu ${isMinimized ? 'is-minimized' : ''}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        <span></span><span></span><span></span>
      </button>
      <p className="menu-label">Administración</p>
      <ul className="menu-list">
        <li className={location.pathname === '/administracion/clientes' ? 'is-active' : ''}>
          <Link to="/administracion/clientes" className={isMinimized ? 'icon-only' : ''}>
            {!isMinimized && <span>Clientes</span>}
            <FontAwesomeIcon icon={faUsers} className="menu-icon" />
          </Link>
        </li>
        <li className={location.pathname === '/administracion/actividades' ? 'is-active' : ''}>
          <Link to="/administracion/actividades" className={isMinimized ? 'icon-only' : ''}>
            {!isMinimized && <span>Actividades</span>}
            <FontAwesomeIcon icon={faDumbbell} className="menu-icon" />
          </Link>
        </li>
        <li className={location.pathname === '/administracion/profes' ? 'is-active' : ''}>
          <Link to="/administracion/profes" className={isMinimized ? 'icon-only' : ''}>
            {!isMinimized && <span>Profesores</span>}
            <FontAwesomeIcon icon={faUserTie} className="menu-icon" />
          </Link>
        </li>
        <li className={location.pathname === '/administracion/pagos' ? 'is-active' : ''}>
          <Link to="/administracion/pagos" className={isMinimized ? 'icon-only' : ''}>
            {!isMinimized && <span>Pagos</span>}
            <FontAwesomeIcon icon={faMoneyBill} className="menu-icon" />
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;