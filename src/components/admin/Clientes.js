import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [newCliente, setNewCliente] = useState({
    nombre: '',
    direccion: '', // Nuevo campo
    correo: '',
    telefono: '',
    tarifa_mensual: '',
    actividades: [],
    profesores: [],
  });
  const [editCliente, setEditCliente] = useState(null);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  // Obtener datos iniciales
  useEffect(() => {
    axios.get('http://localhost:3001/actividades')
      .then(response => setActividades(response.data))
      .catch(error => console.error('Error fetching actividades:', error));

    axios.get('http://localhost:3001/profesores')
      .then(response => setProfesores(response.data))
      .catch(error => console.error('Error fetching profesores:', error));

    axios.get('http://localhost:3001/clientes')
      .then(response => setClientes(response.data))
      .catch(error => console.error('Error fetching clientes:', error));
  }, []);

  // Obtener clientes con sus profesores y actividades
  useEffect(() => {
    axios.get('http://localhost:3001/clientes/clientes-con-profesores-y-actividades')
      .then(response => setClientes(response.data))
      .catch(error => console.error('Error fetching clientes:', error));
  }, []);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCliente({ ...newCliente, [name]: value });
  };

  // Manejar cambios en los selects (actividades y profesores)
  const handleSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setNewCliente({ ...newCliente, [name]: selectedValues });
  };

  // Agregar un nuevo cliente
  const handleSubmitNewCliente = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/clientes', newCliente)
      .then(response => {
        setClientes([...clientes, response.data]);
        setNewCliente({
          nombre: '',
          direccion: '', // Reiniciar el campo dirección
          correo: '',
          telefono: '',
          tarifa_mensual: '',
          actividades: [],
          profesores: [],
        });
        setIsModalOpen(false); // Cerrar el modal después de agregar
      })
      .catch(error => {
        console.error('Error al agregar el cliente:', error);
        setError('Hubo un problema al agregar el cliente.');
      });
  };

  // Actualizar un cliente
  const handleUpdateCliente = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/clientes/${editCliente.id}`, editCliente)
      .then(response => {
        setClientes(clientes.map(cliente =>
          cliente.id === editCliente.id ? response.data : cliente
        ));
        setEditCliente(null);
      })
      .catch(error => {
        console.error('Error al actualizar el cliente:', error);
        setError('Hubo un problema al actualizar el cliente.');
      });
  };

  if (error) {
    return <div className="p-4 bg-red-500 text-white">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8 animate-bounce">Clientes</h1>

      {/* Botón para abrir el modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mb-8"
      >
        Agregar Cliente
      </button>

      {/* Modal para agregar un nuevo cliente */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4">Agregar Cliente</h2>
            <form onSubmit={handleSubmitNewCliente}>
              <div className="mb-4">
                <label className="block text-gray-700">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={newCliente.nombre}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Nombre del cliente"
                  required
                />
              </div>

              {/* Campo de dirección */}
              <div className="mb-4">
                <label className="block text-gray-700">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={newCliente.direccion}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Dirección del cliente"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Correo</label>
                <input
                  type="email"
                  name="correo"
                  value={newCliente.correo}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Correo del cliente"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={newCliente.telefono}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Teléfono del cliente"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Tarifa Mensual</label>
                <input
                  type="number"
                  name="tarifa_mensual"
                  value={newCliente.tarifa_mensual}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Tarifa mensual"
                  required
                />
              </div>

              {/* Selección de Actividades */}
              <div className="mb-4">
                <label className="block text-gray-700">Actividades</label>
                <select
                  name="actividades"
                  value={newCliente.actividades}
                  onChange={handleSelectChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  multiple
                  required
                >
                  {actividades.map(actividad => (
                    <option key={actividad.id} value={actividad.id}>
                      {actividad.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selección de Profesores */}
              <div className="mb-4">
                <label className="block text-gray-700">Profesores</label>
                <select
                  name="profesores"
                  value={newCliente.profesores}
                  onChange={handleSelectChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  multiple
                  required
                >
                  {profesores.map(profesor => (
                    <option key={profesor.id} value={profesor.id}>
                      {profesor.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  Agregar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de clientes */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Lista de Clientes</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Dirección</th>
                <th className="px-4 py-2">Correo</th>
                <th className="px-4 py-2">Teléfono</th>
                <th className="px-4 py-2">Tarifa Mensual</th>
                <th className="px-4 py-2">Profesores</th>
                <th className="px-4 py-2">Actividades</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => (
                <tr key={cliente.cliente_id} className="border-b hover:bg-gray-50 transition duration-300">
                  <td className="px-4 py-2">{cliente.cliente_id}</td>
                  <td className="px-4 py-2">{cliente.cliente_nombre}</td>
                  <td className="px-4 py-2">{cliente.direccion}</td>
                  <td className="px-4 py-2">{cliente.correo}</td>
                  <td className="px-4 py-2">{cliente.telefono}</td>
                  <td className="px-4 py-2">{cliente.tarifa_mensual}</td>
                  <td className="px-4 py-2">{cliente.nombreProfe}</td>
                  <td className="px-4 py-2">{cliente.actividades}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Clientes;