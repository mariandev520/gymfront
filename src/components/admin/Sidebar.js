// src/components/admin/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="menu">
      <p className="menu-label">Administración</p>
      <ul className="menu-list">
        <li><Link to="/administracion/clientes">Clientes</Link></li>
        <li><Link to="/administracion/actividades">Actividades</Link></li>
        {/* Otros enlaces */}
      </ul>
    </aside>
  );
};

export default Sidebar;
