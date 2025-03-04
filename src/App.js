import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Corregí "Navigate"
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import MisDatos from './components/MisDatos';
import Administracion from './components/Administracion';
import Sidebar from './components/admin/Sidebar';
import Clientes from './components/admin/Clientes';
import Actividades from './components/admin/Actividades';
import Pagos from './components/admin/Pagos';
import Profes from './components/admin/Profes';

const App = () => {
  const [user, setUser] = useState(null); // Guardamos el estado del usuario

  return (
    <Router>
      {/* Mostrar Navbar solo si el usuario está autenticado */}
      {user && <Navbar />}

      <div className="flex min-h-screen">
        {/* Mostrar Sidebar solo si el usuario es un admin */}
        {user?.role === 'admin' && (
          <div className="w-64 bg-gray-900 text-white flex-shrink-0">
            <Sidebar />
          </div>
        )}

        {/* Contenido Principal */}
        <div className={`flex-1 bg-black ${user?.role === 'admin' ? 'p-4' : ''}`}>
          <Routes>
            {/* Redirigir la ruta raíz ("/") al Login */}
            <Route
              path="/"
              element={user ? <Navigate to="/mis-datos" /> : <Login setUser={setUser} />}
            />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route
              path="/mis-datos"
              element={user ? <MisDatos /> : <Navigate to="/login" />}
            />
            <Route
              path="/administracion"
              element={user?.role === 'admin' ? <Administracion /> : <Navigate to="/login" />}
            />
            <Route
              path="/administracion/clientes"
              element={user?.role === 'admin' ? <Clientes /> : <Navigate to="/login" />}
            />
            <Route
              path="/administracion/actividades"
              element={user?.role === 'admin' ? <Actividades /> : <Navigate to="/login" />}
            />
            <Route
              path="/administracion/profes"
              element={user?.role === 'admin' ? <Profes /> : <Navigate to="/login" />}
            />
            <Route
              path="/administracion/pagos"
              element={user?.role === 'admin' ? <Pagos /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>

      {/* Mostrar Footer solo si el usuario está autenticado */}
      {user && <Footer />}
    </Router>
  );
};

export default App;