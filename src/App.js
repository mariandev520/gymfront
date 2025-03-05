import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
      {/* Contenedor principal con diseño adaptable */}
      <div className="min-h-screen flex flex-col md:flex-row bg-black">
        {/* Sidebar para admin, oculto en móviles y visible en pantallas grandes */}
        {user?.role === 'admin' && (
          <div className="bg-black text-white md:w-64">
            <Sidebar />
          </div>
        )}

        {/* Contenido principal */}
        <div className="flex-1 p-4">
          <Routes>
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
      <Footer />
    </Router>

  );
};

export default App;
