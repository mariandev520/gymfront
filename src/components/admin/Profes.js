import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profes = () => {
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProfesor, setNewProfesor] = useState({ nombre: '' });
  const [editProfesor, setEditProfesor] = useState(null);
  const [error, setError] = useState(''); // Para manejar errores

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
    return <div>Cargando profesores...</div>;
  }

  return (
    <div className="container">
      <h1 className="title is-2 has-text-centered">Profesores</h1>

      {/* Mensaje de error */}
      {error && <div className="notification is-danger">{error}</div>}

      {/* Formulario para agregar un nuevo profesor */}
      <section className="section">
        <h2 className="subtitle">Agregar Profesor</h2>
        <form onSubmit={handleSubmitNewProfesor} className="box">
          <div className="field">
            <label className="label">Nombre</label>
            <div className="control">
              <input
                type="text"
                name="nombre"
                value={newProfesor.nombre}
                onChange={handleInputChange}
                className="input"
                placeholder="Nombre del profesor"
                required
              />
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-link is-fullwidth">Agregar Profesor</button>
          </div>
        </form>
      </section>

      {/* Formulario para actualizar un profesor */}
      {editProfesor && (
        <section className="section">
          <h2 className="subtitle">Actualizar Profesor</h2>
          <form onSubmit={handleUpdateProfesor} className="box">
            <div className="field">
              <label className="label">Nombre</label>
              <div className="control">
                <input
                  type="text"
                  name="nombre"
                  value={editProfesor.nombre}
                  onChange={e => setEditProfesor({ ...editProfesor, nombre: e.target.value })}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-info is-fullwidth">Actualizar Profesor</button>
            </div>
          </form>
        </section>
      )}

      {/* Lista de profesores */}
      <section className="section">
        <h2 className="subtitle">Lista de Profesores</h2>
        <div className="box">
          <ul>
            {profesores.map(profesor => (
              <li key={profesor.id} className="box">
                <div className="columns is-mobile is-vcentered">
                  <div className="column">
                    <span>{profesor.nombre}</span>
                  </div>
                  <div className="column is-narrow">
                    <button
                      className="button is-small is-info is-outlined"
                      onClick={() => handleEditProfesor(profesor)}
                    >
                      Editar
                    </button>
                    <button
                      className="button is-small is-danger is-outlined ml-2"
                      onClick={() => handleDeleteProfesor(profesor.id)}
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

export default Profes;
