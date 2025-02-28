import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCliente, setNewCliente] = useState({
    nombre: '',
    direccion: '',
    correo: '',
    telefono: '',
    tarifa_mensual: '',
    actividades: [],
    profesores: [],
  });
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://e550-201-178-213-122.ngrok-free.app/1/actividades')
      .then(response => setActividades(response.data))
      .catch(error => console.error('Error fetching actividades:', error));

    axios.get('http://localhost:3001/profesores')
      .then(response => setProfesores(response.data))
      .catch(error => console.error('Error fetching profesores:', error));

    fetchClientes();
  }, []);

  const fetchClientes = () => {
    axios.get('http://localhost:3001/clientes/clientes-con-profesores-y-actividades')
      .then(response => setClientes(response.data))
      .catch(error => console.error('Error fetching clientes:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCliente({ ...newCliente, [name]: value });
  };

  const handleSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setNewCliente({ ...newCliente, [name]: selectedValues });
  };

  const handleSubmitNewCliente = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/clientes', newCliente)
      .then(response => {
        setClientes([...clientes, response.data]);
        setNewCliente({
          nombre: '',
          direccion: '',
          correo: '',
          telefono: '',
          tarifa_mensual: '',
          actividades: [],
          profesores: [],
        });
        setIsModalOpen(false);
      })
      .catch(error => {
        console.error('Error al agregar el cliente:', error);
        setError('Hubo un problema al agregar el cliente.');
      });
  };
  const handleFilterByActividad = (actividades) => {
    axios.get(`http://localhost:3001/clientes/filtrar-por-actividad/${actividades}`)
        .then(response => setClientes(response.data))
        .catch(error => console.error('Error filtrando clientes por actividad:', error));
};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Clientes</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mb-8"
      >
        Agregar Cliente
      </button>

      <div className="flex space-x-4 mb-8">
    <button
        onClick={() => handleFilterByActividad("Pilates")}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
    >
        Pilates
    </button>
    <button
        onClick={() => handleFilterByActividad("Spinning")}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300"
    >
        Spinning
    </button>
    <button
        onClick={() => handleFilterByActividad("Yoga")}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
    >
        Yoga
    </button>
    <button
        onClick={fetchClientes} // Botón para mostrar todos los clientes
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
    >
        Mostrar Todos
    </button>
</div>

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

      {error && <div className="p-4 bg-red-500 text-white">{error}</div>}

      <section>
        <h2 className="text-2xl font-semibold mb-4">Lista de Clientes</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Dirección</th>
                <th className="px-4 py-2">Correo</th>
                <th className="px-4 py-2">Teléfono</th>
                <th className="px-4 py-2">Tarifa Mensual</th>
                <th className="px-4 py-2">Actividades</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => (
                <tr key={cliente.cliente_id} className="border-b hover:bg-gray-50 transition duration-300">
                  <td className="px-4 py-2">{cliente.cliente_nombre}</td>
                  <td className="px-4 py-2">{cliente.direccion}</td>
                  <td className="px-4 py-2">{cliente.correo}</td>
                  <td className="px-4 py-2">{cliente.telefono}</td>
                  <td className="px-4 py-2">{cliente.tarifa_mensual}</td>
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