import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Actividades = () => {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newActividad, setNewActividad] = useState({ nombre: '' });
  const [editActividad, setEditActividad] = useState(null);
  const [error, setError] = useState('');

  // Obtener actividades al cargar el componente
  useEffect(() => {
    axios.get('https://gymfront-git-conmogose-mariandev520s-projects.vercel.app?_vercel_share=jSx59GdtUZDvIxrRG6hxWWGSeele7Xgq/actividades')
      .then(response => {
        setActividades(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener las actividades:', error);
        setError('Hubo un problema al obtener las actividades.');
        setLoading(false);
      });
  }, []);

  // Manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActividad({ ...newActividad, [name]: value });
  };

  // Agregar una nueva actividad
  const handleSubmitNewActividad = (e) => {
    e.preventDefault();
    axios.post('https://gymfront-git-conmogose-mariandev520s-projects.vercel.app?_vercel_share=jSx59GdtUZDvIxrRG6hxWWGSeele7Xgq/actividades', newActividad)
      .then(response => {
        setActividades([...actividades, response.data]);
        setNewActividad({ nombre: '' });
      })
      .catch(error => {
        console.error('Error al agregar la actividad:', error);
        setError('Hubo un problema al agregar la actividad.');
      });
  };

  // Eliminar una actividad
  const handleDeleteActividad = (id) => {
    axios.delete(`https://gymfront-git-conmogose-mariandev520s-projects.vercel.app?_vercel_share=jSx59GdtUZDvIxrRG6hxWWGSeele7Xgq/actividades/${id}`)
      .then(() => {
        setActividades(actividades.filter(actividad => actividad._id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar la actividad:', error);
        setError('Hubo un problema al eliminar la actividad.');
      });
  };

  // Editar una actividad
  const handleEditActividad = (actividad) => {
    setEditActividad(actividad);
  };

  // Actualizar una actividad
  const handleUpdateActividad = (e) => {
    e.preventDefault();
    axios.put(`https://gymfront-git-conmogose-mariandev520s-projects.vercel.app?_vercel_share=jSx59GdtUZDvIxrRG6hxWWGSeele7Xgq/actividades/${editActividad._id}`, editActividad)
      .then(response => {
        setActividades(actividades.map(actividad =>
          actividad._id === editActividad._id ? response.data : actividad
        ));
        setEditActividad(null);
      })
      .catch(error => {
        console.error('Error al actualizar la actividad:', error);
        setError('Hubo un problema al actualizar la actividad.');
      });
  };

  // Mostrar mensaje de carga
  if (loading) {
    return <div className="text-center py-8 text-white">Cargando actividades...</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center mb-8">Actividades</h1>
      {error && <div className="bg-red-500 text-white p-4 rounded-lg mb-6">{error}</div>}

      {/* Formulario para agregar una nueva actividad */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Agregar Actividad</h2>
        <form onSubmit={handleSubmitNewActividad} className="bg-gray-900 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-white">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={newActividad.nombre}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-700 rounded mt-1 bg-gray-800 text-white"
              placeholder="Nombre de la actividad"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">
            Agregar Actividad
          </button>
        </form>
      </section>

      {/* Formulario para actualizar una actividad */}
      {editActividad && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Actualizar Actividad</h2>
          <form onSubmit={handleUpdateActividad} className="bg-gray-900 p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-white">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={editActividad.nombre}
                onChange={e => setEditActividad({ ...editActividad, nombre: e.target.value })}
                className="w-full p-2 border border-gray-700 rounded mt-1 bg-gray-800 text-white"
                required
              />
            </div>
            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300">
              Actualizar Actividad
            </button>
          </form>
        </section>
      )}

      {/* Lista de actividades */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Lista de Actividades</h2>
        <div className="bg-gray-900 p-6 rounded-lg shadow-md">
          <ul className="space-y-4">
            {actividades.map(actividad => (
              <li key={actividad._id} className="bg-gray-800 p-4 rounded-lg shadow-sm flex justify-between items-center">
                <span className="text-lg text-white">{actividad.nombre}</span>
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300"
                    onClick={() => handleEditActividad(actividad)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                    onClick={() => handleDeleteActividad(actividad._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Actividades;