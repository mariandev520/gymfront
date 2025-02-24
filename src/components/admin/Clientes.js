import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../estilos/Clientes.css'; // Importa el archivo CSS

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [newCliente, setNewCliente] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    tarifa_mensual: '',
    actividades: [],
    profesores: [],
  });
  const [editCliente, setEditCliente] = useState(null);
  const [error, setError] = useState('');

  // Obtener datos iniciales
  useEffect(() => {
    axios.get('http://localhost:3001/actividades')
      .then(response => setActividades(response.data))
      .catch(error => console.error('Error fetching actividades:', error));

    axios.get('http://localhost:3001/profesores')
      .then(response => setProfesores(response.data))
      .catch(error => console.error('Error fetching profesores:', error));

    axios.get('http://localhost:3001/clientes')
      .then(response => setClientes(response.data))
      .catch(error => console.error('Error fetching clientes:', error));
  }, []);

 // Obtener clientes con sus profesores y actividades
 useEffect(() => {
    axios.get('http://localhost:3001/clientes/clientes-con-profesores-y-actividades')
      .then(response => setClientes(response.data))
      .catch(error => console.error('Error fetching clientes:', error));
  }, []);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCliente({ ...newCliente, [name]: value });
  };

  // Manejar cambios en los selects (actividades y profesores)
  const handleSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setNewCliente({ ...newCliente, [name]: selectedValues });
  };

  // Agregar un nuevo cliente
  const handleSubmitNewCliente = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/clientes', newCliente)
      .then(response => {
        setClientes([...clientes, response.data]);
        setNewCliente({
          nombre: '',
          correo: '',
          telefono: '',
          tarifa_mensual: '',
          actividades: [],
          profesores: [],
        });
      })
      .catch(error => {
        console.error('Error al agregar el cliente:', error);
        setError('Hubo un problema al agregar el cliente.');
      });
  };

  // Eliminar un cliente
  const handleDeleteCliente = (id) => {
    axios.delete(`http://localhost:3001/clientes/${id}`)
      .then(() => {
        setClientes(clientes.filter(cliente => cliente.id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar el cliente:', error);
        setError('Hubo un problema al eliminar el cliente.');
      });
  };

  // Editar un cliente
  const handleEditCliente = (cliente) => {
    setEditCliente(cliente);
  };

  // Actualizar un cliente
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
                  <option key={actividad.id} value={actividad.id}>
                    {actividad.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Selección de Profesores */}
          <div className="field">
            <label className="label">Profesores</label>
            <div className="control">
              <select
                name="profesores"
                value={newCliente.profesores}
                onChange={handleSelectChange}
                className="input"
                multiple
                required
              >
                {profesores.map(profesor => (
                  <option key={profesor.id} value={profesor.id}>
                    {profesor.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="control">
            <button type="submit" className="button is-link is-fullwidth">
              Agregar Cliente
            </button>
          </div>
        </form>
      </section>

      {/* Formulario para actualizar un cliente */}
      {editCliente && (
        <section className="section">
          <h2 className="subtitle">Actualizar Cliente</h2>
          <form onSubmit={handleUpdateCliente} className="box">
            {/* Campos similares al formulario de agregar */}
            <div className="control">
              <button type="submit" className="button is-info is-fullwidth">
                Actualizar Cliente
              </button>
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
                <th>Dirección</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Tarifa Mensual</th>
                <th>Profesores</th>
                <th>Actividades</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => (
                <tr key={cliente.cliente_id}>
                  <td>{cliente.cliente_id}</td>
                  <td>{cliente.cliente_nombre}</td>
                  <td>{cliente.direccion}</td>
                  <td>{cliente.correo}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.tarifa_mensual}</td>
                  <td>{cliente.profesores}</td>
                  <td>{cliente.actividades}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Clientes;