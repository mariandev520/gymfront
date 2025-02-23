import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Actividades = () => {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newActividad, setNewActividad] = useState({ nombre: '' });
  const [editActividad, setEditActividad] = useState(null);

  // Obtener las actividades desde la API
  useEffect(() => {
    axios.get('http://localhost:3001/actividades')
      .then(response => {
        setActividades(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener las actividades:', error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActividad({ ...newActividad, [name]: value });
  };

  const handleSubmitNewActividad = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/actividades', newActividad)
      .then(response => {
        setActividades([...actividades, response.data]);
        setNewActividad({ nombre: '' });
      })
      .catch(error => {
        console.error('Error al agregar la actividad:', error);
      });
  };

  const handleDeleteActividad = (id) => {
    axios.delete(`http://localhost:3001/actividades/${id}`)
      .then(response => {
        setActividades(actividades.filter(actividad => actividad.id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar la actividad:', error);
      });
  };

  const handleEditActividad = (actividad) => {
    setEditActividad(actividad);
  };

  const handleUpdateActividad = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/actividades/${editActividad.id}`, editActividad)
      .then(response => {
        setActividades(actividades.map(actividad =>
          actividad.id === editActividad.id ? response.data : actividad
        ));
        setEditActividad(null);
      })
      .catch(error => {
        console.error('Error al actualizar la actividad:', error);
      });
  };

  if (loading) {
    return <div>Cargando actividades...</div>;
  }

  return (
    <div>
      <h1>Actividades</h1>

      {/* Formulario para agregar una nueva actividad */}
      <h2>Agregar Actividad</h2>
      <form onSubmit={handleSubmitNewActividad}>
        <input
          type="text"
          name="nombre"
          value={newActividad.nombre}
          onChange={handleInputChange}
          placeholder="Nombre de la actividad"
          required
        />
        <button type="submit">Agregar Actividad</button>
      </form>

      {/* Formulario para actualizar una actividad */}
      {editActividad && (
        <div>
          <h2>Actualizar Actividad</h2>
          <form onSubmit={handleUpdateActividad}>
            <input
              type="text"
              name="nombre"
              value={editActividad.nombre}
              onChange={e => setEditActividad({ ...editActividad, nombre: e.target.value })}
              required
            />
            <button type="submit">Actualizar Actividad</button>
          </form>
        </div>
      )}

      <ul>
        {actividades.map(actividad => (
          <li key={actividad.id}>
            <span>{actividad.nombre}</span>
            <button onClick={() => handleEditActividad(actividad)}>Editar</button>
            <button onClick={() => handleDeleteActividad(actividad.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Actividades;
