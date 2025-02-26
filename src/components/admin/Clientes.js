import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [editCliente, setEditCliente] = useState(null);
  const [error, setError] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/actividades')
      .then(response => setActividades(response.data))
      .catch(error => console.error('Error fetching actividades:', error));

    axios.get('http://localhost:3001/profesores')
      .then(response => setProfesores(response.data))
      .catch(error => console.error('Error fetching profesores:', error));

    axios.get('http://localhost:3001/clientes/clientes-con-profesores-y-actividades')
      .then(response => setClientes(response.data))
      .catch(error => console.error('Error fetching clientes:', error));
  }, []);

  const handleEditClick = (cliente) => {
    setEditCliente(cliente);
    setIsEditModalOpen(true);
  };

  const handleUpdateCliente = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/clientes/${editCliente.id}`, editCliente)
      .then(response => {
        setClientes(clientes.map(cliente =>
          cliente.id === editCliente.id ? response.data : cliente
        ));
        setEditCliente(null);
        setIsEditModalOpen(false);
      })
      .catch(error => {
        console.error('Error al actualizar el cliente:', error);
        setError('Hubo un problema al actualizar el cliente.');
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditCliente({ ...editCliente, [name]: value });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Clientes</h1>

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
                
          
                    <button
                      onClick={() => handleEditClick(cliente)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-sm hover:bg-yellow-600"
                    >
                      Editar
                    </button>
               </tr>
              ))}
              </tbody>
            </table>
        </div>
      </section>

      {isEditModalOpen && editCliente && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Editar Cliente</h2>
            <form onSubmit={handleUpdateCliente}>
              <div className="mb-4">
                <label className="block text-gray-700">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={editCliente.nombre}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={editCliente.direccion}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Correo</label>
                <input
                  type="email"
                  name="correo"
                  value={editCliente.correo}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={editCliente.telefono}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;
