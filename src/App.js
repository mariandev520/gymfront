import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import MisDatos from './components/MisDatos';
import Administracion from './components/Administracion';
import Sidebar from './components/admin/Sidebar';
import Clientes from './components/admin/Clientes';
import Actividades from './components/admin/Actividades';
import Profesores from './components/admin/Profesores';
import Pagos from './components/admin/Pagos';

const App = () => {
  const [user, setUser] = useState(null); // Guardamos el estado del usuario

  return (
    <Router>
      <Navbar />
      
      <div className="columns">
        {/* Mostrar Sidebar solo si el usuario es un admin */}
        {user?.role === 'admin' && (
          <div className="column is-3">
            <Sidebar />
          </div>
        )}

        {/* Contenido Principal */}
        <div className={`column ${user?.role === 'admin' ? '' : ''}`}>
          <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/mis-datos" element={user ? <MisDatos /> : <Login setUser={setUser} />} />
            <Route path="/administracion" element={user?.role === 'admin' ? <Administracion /> : <Login setUser={setUser} />} />
            <Route path="/administracion/clientes" element={user?.role === 'admin' ? <Clientes /> : <Login setUser={setUser} />} />
            <Route path="/administracion/actividades" element={user?.role === 'admin' ? <Actividades /> : <Login setUser={setUser} />} />
            <Route path="/administracion/profesores" element={user?.role === 'admin' ? <Profesores /> : <Login setUser={setUser} />} />
            <Route path="/administracion/pagos" element={user?.role === 'admin' ? <Pagos /> : <Login setUser={setUser} />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </Router>
  );
};

export default App;
