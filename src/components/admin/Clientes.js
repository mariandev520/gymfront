import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [actividades, setActividades] = useState([]); // Para las actividades
  const [profesores, setProfesores] = useState([]); // Para los profesores
  const [newCliente, setNewCliente] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    tarifa_mensual: '',
    actividades: [], // Relación con actividades
    profesores: []   // Relación con profesores
  });
  const [editCliente, setEditCliente] = useState(null);
  const [error, setError] = useState(''); // Para manejar mensajes de error

  useEffect(() => {
    // Obtener actividades y profesores
    axios.get('http://localhost:3001/actividades')
      .then(response => {
        setActividades(response.data);
      });
    
    axios.get('http://localhost:3001/profesores')
      .then(response => {
        setProfesores(response.data);
      });

    // Obtener todos los clientes
    axios.get('http://localhost:3001/clientes')
      .then(response => {
        setClientes(response.data);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCliente({
      ...newCliente,
      [name]: value
    });
  };

  const handleSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    
    setNewCliente({
      ...newCliente,
      [name]: selectedValues
    });
  };

  const handleSubmitNewCliente = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/clientes', newCliente)
      .then(response => {
        setClientes([...clientes, response.data]);
        setNewCliente({ nombre: '', correo: '', telefono: '', tarifa_mensual: '', actividades: [], profesores: [] });
      })
      .catch(error => {
        console.error('Error al agregar el cliente:', error);
        setError('Hubo un problema al agregar el cliente.');
      });
  };

  const handleDeleteCliente = (id) => {
    axios.delete(`http://localhost:3001/clientes/${id}`)
      .then(response => {
        setClientes(clientes.filter(cliente => cliente.id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar el cliente:', error);
        setError('Hubo un problema al eliminar el cliente.');
      });
  };

  const handleEditCliente = (cliente) => {
    setEditCliente(cliente);
  };

  const handleUpdateCliente = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/clientes/${editCliente.id}`, editCliente)
      .then(response => {
        setClientes(clientes.map(cliente =>
          cliente.id === editCliente.id ? response.data : cliente
        ));
        setEditCliente(null);
      })
      .catch(error => {
        console.error('Error al actualizar el cliente:', error);
        setError('Hubo un problema al actualizar el cliente.');
      });
  };

  if (error) {
    return <div className="notification is-danger">{error}</div>;
  }

  return (
    <div className="container">
      <h1 className="title is-2 has-text-centered">Clientes</h1>

      {/* Formulario para agregar un nuevo cliente */}
      <section className="section">
        <h2 className="subtitle">Agregar Cliente</h2>
        <form onSubmit={handleSubmitNewCliente} className="box">
          <div className="field">
            <label className="label">Nombre</label>
            <div className="control">
              <input
                type="text"
                name="nombre"
                value={newCliente.nombre}
                onChange={handleInputChange}
                className="input"
                placeholder="Nombre del cliente"
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Correo</label>
            <div className="control">
              <input
                type="email"
                name="correo"
                value={newCliente.correo}
                onChange={handleInputChange}
                className="input"
                placeholder="Correo del cliente"
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Teléfono</label>
            <div className="control">
              <input
                type="text"
                name="telefono"
                value={newCliente.telefono}
                onChange={handleInputChange}
                className="input"
                placeholder="Teléfono del cliente"
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Tarifa Mensual</label>
            <div className="control">
              <input
                type="number"
                name="tarifa_mensual"
                value={newCliente.tarifa_mensual}
                onChange={handleInputChange}
                className="input"
                placeholder="Tarifa mensual"
                required
              />
            </div>
          </div>

          {/* Selección de Actividades */}
          <div className="field">
            <label className="label">Actividades</label>
            <div className="control">
              <select
                name="actividades"
                value={newCliente.actividades}
                onChange={handleSelectChange}
                className="input"
                multiple
                required
              >
                {actividades.map(actividad => (
                  <option key={actividad.id} value={actividad.id}>{actividad.id}</option>
                ))}
              </select>
            </div>
          </div>

        

          <div className="control">
            <button type="submit" className="button is-link is-fullwidth">Agregar Cliente</button>
          </div>
        </form>
      </section>

      {/* Formulario para actualizar un cliente */}
      {editCliente && (
        <section className="section">
          <h2 className="subtitle">Actualizar Cliente</h2>
          <form onSubmit={handleUpdateCliente} className="box">
            {/* Similar a lo anterior, pero con los valores de `editCliente` */}
            {/* ... */}
            <div className="control">
              <button type="submit" className="button is-info is-fullwidth">Actualizar Cliente</button>
            </div>
          </form>
        </section>
      )}

      {/* Lista de clientes */}
      <section className="section">
        <h2 className="subtitle">Lista de Clientes</h2>
        <div className="box">
          <table className="table is-striped is-bordered is-fullwidth">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Tarifa Mensual</th>
                <th>Actividades</th>
                <th>Profesores</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.length > 0 ? (
                clientes.map(cliente => (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.correo}</td>
                    <td>{cliente.telefono}</td>
                    <td>{cliente.tarifa_mensual}</td>

 <td>{ cliente.nombre.actividad}
</td>

                    <td>{cliente.profesores}</td>
                    <td>
                      <button
                        className="button is-small is-info is-outlined"
                        onClick={() => handleEditCliente(cliente)}
                      >
                        Editar
                      </button>
                      <button
                        className="button is-small is-danger is-outlined ml-2"
                        onClick={() => handleDeleteCliente(cliente.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No hay clientes registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Clientes;
