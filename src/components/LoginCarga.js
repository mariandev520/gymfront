import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const LoginCarga = ({ setUser }) => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireecion] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/clientes', {
        nombre,
        direccion,
      });

      if (response.data.inscrito) {
        setUser({ ...response.data.cliente, role: 'cliente' });
        toast.success('Inscripción verificada. Bienvenido.');
        navigate('/mis-datos');
      } else {
        toast.error('Cliente no encontrado o no inscrito.');
      }
    } catch (error) {
      console.error('Error al verificar inscripción:', error);
      toast.error('Error al verificar inscripción. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Verificar Inscripción</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
              Nombre
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nombre"
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
              Apellido
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="apellido"
              type="text"
              placeholder="Direccion"
              value={direccion}
              onChange={(e) => setDireecion(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Verificar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginCarga;