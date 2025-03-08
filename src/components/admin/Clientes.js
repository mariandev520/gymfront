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

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/actividades`)
      .then(response => setActividades(response.data))
      .catch(error => console.error('Error fetching actividades:', error));

    axios.get(`${apiUrl}/profesores`)
      .then(response => setProfesores(response.data))
      .catch(error => console.error('Error fetching profesores:', error));

    fetchClientes();
  }, [apiUrl]);

  const fetchClientes = () => {
    axios.get(`${apiUrl}/clientes/clientes-con-profesores-y-actividades`)
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
    axios.post(`${apiUrl}/clientes`, newCliente)
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

  const handleFilterByActividad = (actividad) => {
    if (actividad === "Mostrar Todos") {
      fetchClientes();
      setSelectedActividad(null);
    } else {
      axios.get(`${apiUrl}/clientes/filtrar-por-actividad/${actividad}`)
        .then(response => setClientes(response.data))
        .catch(error => console.error('Error filtrando clientes por actividad:', error));
      setSelectedActividad(actividad);
    }
  };

  const actividadesList = ["Pilates", "Spinning", "Yoga", "Mostrar Todos"];

  return (
    <div className="container bg-black p-4">
      {/* ... (resto del código del modal y filtros) ... */}

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
                const actividadesNombres = Array.isArray(cliente.actividades)
                  ? cliente.actividades.map((id) => {
                      const actividad = actividades.find((a) => a._id === id);
                      return actividad ? actividad.nombre : "Desconocido";
                    }).join(", ")
                  : "No hay actividades";

                const profesoresNombres = Array.isArray(cliente.profesores)
                  ? cliente.profesores.map((id) => {
                      const profesor = profesores.find((p) => p._id === id);
                      return profesor ? profesor.nombre : "Desconocido";
                    }).join(", ")
                  : "No hay profesores";

                return (
                  <React.Fragment key={cliente._id}>
                    <tr className="border-4 border-gray-700 rounded hover:bg-gray-900 text-white transition duration-300">
                      <td className="px-4 bg-gray-900 text-gray-300 py-2">{cliente.nombre}</td>
                      <td className="px-4 bg-gray-900 text-gray-300 py-2">{actividadesNombres}</td>
                      <td className="hidden sm:table-cell px-4 bg-gray-900 text-gray-300 py-2">{cliente.direccion}</td>
                      <td className="hidden sm:table-cell px-4 bg-gray-900 text-gray-300 py-2">{cliente.telefono}</td>
                      <td className="hidden sm:table-cell px-4 bg-gray-900 text-gray-300 py-2">{cliente.correo}</td>
                      <td className="hidden sm:table-cell px-4 bg-gray-900 text-gray-300 py-2">{cliente.tarifa_mensual}</td>
                    </tr>
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