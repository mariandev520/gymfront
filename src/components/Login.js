import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './estilos/Login.css';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    setError('');

    if (username === 'admin' && password === 'admin123') {
      setUser({ username, role: 'admin' });
      navigate('/administracion');
    } else if (username === 'user' && password === 'user123') {
      setUser({ username, role: 'user' });
      navigate('/mis-datos');
    } else {
      setError('Credenciales incorrectas. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Iniciar Sesión</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="input-group">
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu usuario"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        <button className="login-button" onClick={handleLogin}>Entrar</button>
      </div>
    </div>
  );
};

export default Login;