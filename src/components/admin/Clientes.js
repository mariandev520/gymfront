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
  const [selectedActividad, setSelectedActividad] = useState(null);
  const axiosInstance = axios.create({
    baseURL:  "https://5ac6-2802-8012-2930-a901-6197-9b85-2698-663a.ngrok-free.app"
    ,
    headers: { "ngrok-skip-browser-warning": "true" },
  });
  
  // Obtener actividades y profesores al cargar el componente
  useEffect(() => {
    axios.get('https://5ac6-2802-8012-2930-a901-6197-9b85-2698-663a.ngrok-free.app/actividades')
      .then(response => setActividades(response.data))
      .catch(error => console.error('Error fetching actividades:', error));
axiosInstance('/profesores')
      .then(response => setProfesores(response.data))
      .catch(error => console.error('Error fetching profesores:', error));

    fetchClientes();
  }, []);

  // Obtener la lista de clientes
  const fetchClientes = () => {
    axiosInstance('/clientes/clientes-con-profesores-y-actividades')
      .then(response => setClientes(response.data))
      .catch(error => console.error('Error fetching clientes:', error));
  };

  // Manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCliente({ ...newCliente, [name]: value });
  };

  // Manejar cambios en los selects del formulario
  const handleSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setNewCliente({ ...newCliente, [name]: selectedValues });
  };

  // Enviar el nuevo cliente al backend
  const handleSubmitNewCliente = (e) => {
    e.preventDefault();
     
    axios.post('https://5ac6-2802-8012-2930-a901-6197-9b85-2698-663a.ngrok-free.app/clientes', newCliente)
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

  // Filtrar clientes por actividad
  const handleFilterByActividad = (actividad) => {
    if (actividad === "Mostrar Todos") {
      fetchClientes();
      setSelectedActividad(null);
    } else {
      axiosInstance(`https://5ac6-2802-8012-2930-a901-6197-9b85-2698-663a.ngrok-free.app/clientes/filtrar-por-actividad/${actividad}`)
        .then(response => setClientes(response.data))
        .catch(error => console.error('Error filtrando clientes por actividad:', error));
      setSelectedActividad(actividad);
    }
  };

  // Lista de actividades para filtrar
  const actividadesList = ["Pilates", "Spinning", "Yoga", "Mostrar Todos"];

  return (
    <div className="container bg-black p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">Clientes</h1>

      {/* Botón para abrir el modal de agregar cliente */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mb-8"
      >
        Agregar Cliente
      </button>

      {/* Filtros por actividad */}
      <div className="mb-8 text-white">
        {actividadesList.map((actividad) => (
          <span
            key={actividad}
            onClick={() => handleFilterByActividad(actividad)}
            className={`cursor-pointer px-4 py-2 rounded transition duration-300 mr-4 mb-2 inline-block ${
              selectedActividad === actividad
                ? 'bg-blue-200 text-white'
                : 'hover:bg-green'
            }`}
          >
            {actividad}
          </span>
        ))}
      </div>

      {/* Modal para agregar cliente */}
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
                    <option key={actividad._id} value={actividad._id}>
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
                    <option key={profesor._id} value={profesor._id}>
                      {profesor.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-8 py-4 rounded hover:bg-gray-500 transition duration-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-400 text-white px-4 py-2 rounded hover:bg-black transition duration-300"
                >
                  Agregar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mostrar errores */}
      {error && <div className="p-4 bg-red-500 text-white">{error}</div>}

      {/* Tabla de clientes */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">Lista de Clientes</h2>
        <div className="bg-gray-900 p-6 rounded-lg shadow-md overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Actividad</th>
                <th className="hidden sm:table-cell px-4 py-2">Dirección</th>
                <th className="hidden sm:table-cell px-4 py-2">Teléfono</th>
                <th className="hidden sm:table-cell px-4 py-2">Correo</th>
                <th className="hidden sm:table-cell px-4 py-2">Tarifa Mensual</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => {
                // Convertir IDs de actividades a nombres
                const actividadesNombres = cliente.actividades.map(id => {
                  const actividad = actividades.find(a => a._id === id);
                  return actividad ? actividad.nombre : "Desconocido";
                }).join(', ');

                // Convertir IDs de profesores a nombres
                const profesoresNombres = cliente.profesores.map(id => {
                  const profesor = profesores.find(p => p._id === id);
                  return profesor ? profesor.nombre : "Desconocido";
                }).join(', ');

                return (
                  <React.Fragment key={cliente._id}>
                    {/* Fila principal (Nombre y Actividad) */}
                    <tr className="border-4 border-gray-700 rounded hover:bg-gray-900 text-white transition duration-300">
                      <td className="px-4 bg-gray-900 text-gray-300 py-2">{cliente.nombre}</td>
                      <td className="px-4 bg-gray-900 text-gray-300 py-2">{actividadesNombres}</td>
                      {/* Columnas ocultas en móviles */}
                      <td className="hidden sm:table-cell px-4 bg-gray-900 text-gray-300 py-2">{cliente.direccion}</td>
                      <td className="hidden sm:table-cell px-4 bg-gray-900 text-gray-300 py-2">{cliente.telefono}</td>
                      <td className="hidden sm:table-cell px-4 bg-gray-900 text-gray-300 py-2">{cliente.correo}</td>
                      <td className="hidden sm:table-cell px-4 bg-gray-900 text-gray-300 py-2">{cliente.tarifa_mensual}</td>
                    </tr>
                    {/* Fila adicional para móviles (detalles) */}
                    <tr className="sm:hidden">
                      <td colSpan="2" className="px-4 bg-gray-900 text-gray-300 py-2">
                        <div className="flex flex-col space-y-2">
                          <p><span className="font-bold">Dirección:</span> {cliente.direccion}</p>
                          <p><span className="font-bold">Teléfono:</span> {cliente.telefono}</p>
                          <p><span className="font-bold">Correo:</span> {cliente.correo}</p>
                          <p><span className="font-bold">Tarifa Mensual:</span> {cliente.tarifa_mensual}</p>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Clientes;