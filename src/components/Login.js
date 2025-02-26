import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");

    if (username === "admin" && password === "admin") {
      setUser({ username, role: "admin" });
      navigate("/administracion");
    } else if (username === "user" && password === "user123") {
      setUser({ username, role: "user" });
      navigate("/mis-datos");
    } else {
      setError("Credenciales incorrectas. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">Iniciar Sesión</h2>

        {error && (
          <motion.div
            initial={{ x: -10 }}
            animate={{ x: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.3 }}
            className="text-red-500 bg-red-100 p-2 mt-2 rounded-md text-center"
          >
            {error}
          </motion.div>
        )}

        <div className="mt-4">
          <label className="block text-gray-600 font-medium">Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu usuario"
            className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-600 font-medium">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full mt-6 p-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          Entrar
        </button>

        <p className="mt-4 text-center text-gray-500 text-sm">
          ¿No tienes cuenta?{" "}
          <a href="#" className="text-blue-600 font-semibold hover:underline">
            Regístrate aquí
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
