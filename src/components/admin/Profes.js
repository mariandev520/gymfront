import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profes = () => {
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProfesor, setNewProfesor] = useState({ nombre: '' });
  const [editProfesor, setEditProfesor] = useState(null);
  const [error, setError] = useState('');

  // Obtener los profesores desde la API
  useEffect(() => {
    axios.get('http://localhost:3001/profesores')
      .then(response => {
        setProfesores(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los profesores:', error);
        setError('Hubo un problema al obtener los profesores.');
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfesor({ ...newProfesor, [name]: value });
  };

  const handleSubmitNewProfesor = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/profesores', newProfesor)
      .then(response => {
        setProfesores([...profesores, response.data]);
        setNewProfesor({ nombre: '' });
      })
      .catch(error => {
        console.error('Error al agregar el profesor:', error);
        setError('Hubo un problema al agregar el profesor.');
      });
  };

  const handleDeleteProfesor = (id) => {
    axios.delete(`http://localhost:3001/profesores/${id}`)
      .then(response => {
        setProfesores(profesores.filter(profesor => profesor.id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar el profesor:', error);
        setError('Hubo un problema al eliminar el profesor.');
      });
  };

  const handleEditProfesor = (profesor) => {
    setEditProfesor(profesor);
  };

  const handleUpdateProfesor = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/profesores/${editProfesor.id}`, editProfesor)
      .then(response => {
        setProfesores(profesores.map(profesor =>
          profesor.id === editProfesor.id ? response.data : profesor
        ));
        setEditProfesor(null);
      })
      .catch(error => {
        console.error('Error al actualizar el profesor:', error);
        setError('Hubo un problema al actualizar el profesor.');
      });
  };

  if (loading) {
    return <div className="text-center py-8">Cargando profesores...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Profesores</h1>

      {/* Mensaje de error */}
      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Formulario para agregar un nuevo profesor */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Agregar Profesor</h2>
        <form onSubmit={handleSubmitNewProfesor} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={newProfesor.nombre}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Nombre del profesor"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Agregar Profesor
          </button>
        </form>
      </section>

      {/* Formulario para actualizar un profesor */}
      {editProfesor && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Actualizar Profesor</h2>
          <form onSubmit={handleUpdateProfesor} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={editProfesor.nombre}
                onChange={e => setEditProfesor({ ...editProfesor, nombre: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300"
            >
              Actualizar Profesor
            </button>
          </form>
        </section>
      )}

      {/* Lista de profesores */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Lista de Profesores</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
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
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300"
                        onClick={() => handleEditProfesor(profesor)}
                      >
                        Editar
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
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
        </div>
      </section>
    </div>
  );
};

export default Profes;