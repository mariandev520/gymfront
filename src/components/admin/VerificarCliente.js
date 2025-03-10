import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
    "Content-Type": "application/json",
  },
});

const VerificarCliente = () => {
  // Usamos "tarifa" para el valor ingresado que se comparará con la columna 'tarifa_mensual'
  const [tarifa, setTarifa] = useState("");
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState("");

  const handleSearchCliente = async (e) => {
    e.preventDefault();
    setError("");
    setCliente(null);

    if (!tarifa) {
      setError("Por favor, ingresa una tarifa válida.");
      return;
    }

    try {
      // Se llama a la ruta: /clientes/tarifa_mensual/:tarifa
      const response = await axiosInstance.get(`/clientes/tarifa_mensual/${tarifa}`);
      setCliente(response.data);
    } catch (err) {
      console.error("Error al buscar cliente:", err);
      setError("No se encontró cliente con esa tarifa o ocurrió un error.");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Verificar Cliente</h1>

      <form onSubmit={handleSearchCliente} className="bg-white p-4 rounded shadow-md w-full max-w-sm">
        <label htmlFor="tarifa" className="block mb-2 font-medium text-gray-700">
          Ingrese la Tarifa Mensual
        </label>
        <input
          id="tarifa"
          type="text"
          value={tarifa}
          onChange={(e) => setTarifa(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4 w-full"
          placeholder="Ej: 28608102"
        />

        {/* Si se encuentra un cliente, mostrar mensaje de coincidencia */}
        {cliente && (
          <p className="mb-4 text-green-600 text-center">
            Se ha encontrado una coincidencia: {cliente.nombre}
          </p>
        )}

        {/* Mostrar errores */}
        {error && (
          <div className="bg-red-500 text-white p-2 mb-4 text-center rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 w-full"
        >
          Verificar
        </button>
      </form>
    </div>
  );
};

export default VerificarCliente;
