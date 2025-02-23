import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profes= () => {
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProfesor, setNewProfesor] = useState({ nombre: '' });
  const [editProfesor, setEditProfesor] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/profesores')
      .then(response => {
        setProfesores(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los profesores:', error);
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
      });
  };

  const handleDeleteProfesor = (id) => {
    axios.delete(`http://localhost:3001/profesores/${id}`)
      .then(response => {
        setProfesores(profesores.filter(profesor => profesor.id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar el profesor:', error);
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
      });
  };

  if (loading) {
    return <div>Cargando profesores...</div>;
  }

  return (
    <div>
      <h1>Profesores</h1>

      {/* Formulario para agregar un nuevo profesor */}
      <h2>Agregar Profesor</h2>
      <form onSubmit={handleSubmitNewProfesor}>
        <input
          type="text"
          name="nombre"
          value={newProfesor.nombre}
          onChange={handleInputChange}
          placeholder="Nombre del profesor"
          required
        />
        <button type="submit">Agregar Profesor</button>
      </form>

      {/* Formulario para actualizar un profesor */}
      {editProfesor && (
        <div>
          <h2>Actualizar Profesor</h2>
          <form onSubmit={handleUpdateProfesor}>
            <input
              type="text"
              name="nombre"
              value={editProfesor.nombre}
              onChange={e => setEditProfesor({ ...editProfesor, nombre: e.target.value })}
              required
            />
            <button type="submit">Actualizar Profesor</button>
          </form>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {profesores.map(profesor => (
            <tr key={profesor.id}>
              <td>{profesor.id}</td>
              <td>{profesor.nombre}</td>
              <td>
                <button onClick={() => handleEditProfesor(profesor)}>Editar</button>
                <button onClick={() => handleDeleteProfesor(profesor.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Profes;
