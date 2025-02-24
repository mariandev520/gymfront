import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Actividades = () => {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newActividad, setNewActividad] = useState({ nombre: '' });
  const [editActividad, setEditActividad] = useState(null);
  const [error, setError] = useState(''); // Estado para almacenar mensajes de error

  // Obtener las actividades desde la API
  useEffect(() => {
    axios.get('http://localhost:3001/actividades')
      .then(response => {
        setActividades(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener las actividades:', error);
        setError('Hubo un problema al obtener las actividades.'); // Mostrar mensaje de error
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
        setError('Hubo un problema al agregar la actividad.'); // Mostrar mensaje de error
      });
  };

  const handleDeleteActividad = (id) => {
    axios.delete(`http://localhost:3001/actividades/${id}`)
      .then(response => {
        setActividades(actividades.filter(actividad => actividad.id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar la actividad:', error);
        setError('Hubo un problema al eliminar la actividad.'); // Mostrar mensaje de error
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
        setError('Hubo un problema al actualizar la actividad.'); // Mostrar mensaje de error
      });
  };

  if (loading) {
    return <div className="has-text-centered">Cargando actividades...</div>;
  }

  return (
    <div className="container">
      <h1 className="title is-2 has-text-centered">Actividades</h1>

      {/* Mensaje de error */}
      {error && <div className="notification is-danger">{error}</div>}

      {/* Formulario para agregar una nueva actividad */}
      <section className="section">
        <h2 className="subtitle">Agregar Actividad</h2>
        <form onSubmit={handleSubmitNewActividad} className="box">
          <div className="field">
            <label className="label">Nombre</label>
            <div className="control">
              <input
                type="text"
                name="nombre"
                value={newActividad.nombre}
                onChange={handleInputChange}
                className="input"
                placeholder="Nombre de la actividad"
                required
              />
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-link is-fullwidth">Agregar Actividad</button>
          </div>
        </form>
      </section>

      {/* Formulario para actualizar una actividad */}
      {editActividad && (
        <section className="section">
          <h2 className="subtitle">Actualizar Actividad</h2>
          <form onSubmit={handleUpdateActividad} className="box">
            <div className="field">
              <label className="label">Nombre</label>
              <div className="control">
                <input
                  type="text"
                  name="nombre"
                  value={editActividad.nombre}
                  onChange={e => setEditActividad({ ...editActividad, nombre: e.target.value })}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-info is-fullwidth">Actualizar Actividad</button>
            </div>
          </form>
        </section>
      )}

      {/* Lista de actividades */}
      <section className="section">
        <h2 className="subtitle">Lista de Actividades</h2>
        <div className="box">
          <ul>
            {actividades.map(actividad => (
              <li key={actividad.id} className="box">
                <div className="columns is-mobile is-vcentered">
                  <div className="column">
                    <span>{actividad.nombre}</span>
                  </div>
                  <div className="column is-narrow">
                    <button
                      className="button is-small is-info is-outlined"
                      onClick={() => handleEditActividad(actividad)}
                    >
                      Editar
                    </button>
                    <button
                      className="button is-small is-danger is-outlined ml-2"
                      onClick={() => handleDeleteActividad(actividad.id)}
                    >
                      Eliminar
                    </button>
                  </div>
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
