import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin123') {
      setUser({ username, role: 'admin' });
      navigate('/administracion');
    } else if (username === 'user' && password === 'user123') {
      setUser({ username, role: 'user' });
      navigate('/mis-datos');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Login</h1>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
        </div>
        <div className="control">
          <button className="button is-primary" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
