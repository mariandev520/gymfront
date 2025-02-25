import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profesores = () => {
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProfesor, setNewProfesor] = useState({ nombre: '' });
  const [editProfesor, setEditProfesor] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfesores();
  }, []);

  const fetchProfesores = async () => {
    try {
      const response = await axios.get('http://localhost:3001/profesores');
      setProfesores(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error al obtener los profesores:', err);
      setError('Hubo un problema al obtener los profesores.');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfesor({ ...newProfesor, [name]: value });
  };

  const handleSubmitNewProfesor = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/profesores', newProfesor);
      setProfesores([...profesores, response.data]);
      setNewProfesor({ nombre: '' });
    } catch (err) {
      console.error('Error al agregar el profesor:', err);
      setError('Hubo un problema al agregar el profesor.');
    }
  };

  const handleDeleteProfesor = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/profesores/${id}`);
      setProfesores(profesores.filter(profesor => profesor.id !== id));
    } catch (err) {
      console.error('Error al eliminar el profesor:', err);
      setError('Hubo un problema al eliminar el profesor.');
    }
  };

  const handleEditProfesor = (profesor) => {
    setEditProfesor(profesor);
  };

  const handleUpdateProfesor = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/profesores/${editProfesor.id}`, editProfesor);
      setProfesores(profesores.map(profesor =>
        profesor.id === editProfesor.id ? response.data : profesor
      ));
      setEditProfesor(null);
    } catch (err) {
      console.error('Error al actualizar el profesor:', err);
      setError('Hubo un problema al actualizar el profesor.');
    }
  };

  if (loading) {
    return <div className="text-center py-8 animate-pulse">Cargando profesores...</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-8 animate-fade-down">Profesores</h1>

      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-6 animate-bounce">
          {error}
        </div>
      )}

      <section className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Agregar Profesor</h2>
        <form onSubmit={handleSubmitNewProfesor} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={newProfesor.nombre}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre del profesor"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 focus:ring-2 focus:ring-blue-300"
          >
            Agregar Profesor
          </button>
        </form>
      </section>

      {editProfesor && (
        <section className="mb-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Actualizar Profesor</h2>
          <form onSubmit={handleUpdateProfesor} className="space-y-4">
            <div>
              <label className="block text-gray-700">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={editProfesor.nombre}
                onChange={e => setEditProfesor({ ...editProfesor, nombre: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300 focus:ring-2 focus:ring-green-300"
            >
              Actualizar Profesor
            </button>
          </form>
        </section>
      )}

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Lista de Profesores</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {profesores.map(profesor => (
              <tr key={profesor.id} className="border-b hover:bg-gray-50 transition duration-300">
                <td className="px-4 py-2 text-center">{profesor.id}</td>
                <td className="px-4 py-2">{profesor.nombre}</td>
                <td className="px-4 py-2">
                  <div className="flex justify-center space-x-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300 focus:ring-2 focus:ring-blue-300"
                      onClick={() => handleEditProfesor(profesor)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300 focus:ring-2 focus:ring-red-300"
                      onClick={() => handleDeleteProfesor(profesor.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Profesores;