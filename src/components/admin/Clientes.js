import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCliente, setNewCliente] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    tarifa_mensual: ''
  });
  const [editCliente, setEditCliente] = useState(null);

  // Obtener los clientes desde la API
  useEffect(() => {
    axios.get('http://localhost:3001/clientes')
      .then(response => {
        setClientes(response.data);
        setLoading(false);  // Detener el indicador de carga cuando los datos estén listos
      })
      .catch(error => {
        console.error('Error al obtener los clientes:', error);
        setLoading(false);  // Detener el indicador de carga incluso si hay un error
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCliente({
      ...newCliente,
      [name]: value
    });
  };

  const handleSubmitNewCliente = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/clientes', newCliente)
      .then(response => {
        setClientes([...clientes, response.data]); // Añadir cliente a la lista
        setNewCliente({ nombre: '', correo: '', telefono: '', tarifa_mensual: '' });
      })
      .catch(error => {
        console.error('Error al agregar el cliente:', error);
      });
  };

  const handleDeleteCliente = (id) => {
    axios.delete(`http://localhost:3001/clientes/${id}`)
      .then(response => {
        setClientes(clientes.filter(cliente => cliente.id !== id)); // Filtra el cliente eliminado
      })
      .catch(error => {
        console.error('Error al eliminar el cliente:', error);
      });
  };

  const handleEditCliente = (cliente) => {
    setEditCliente(cliente); // Establece el cliente a editar
  };

  const handleUpdateCliente = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/clientes/${editCliente.id}`, editCliente)
      .then(response => {
        setClientes(clientes.map(cliente =>
          cliente.id === editCliente.id ? response.data : cliente
        ));
        setEditCliente(null); // Limpiar el formulario de edición
      })
      .catch(error => {
        console.error('Error al actualizar el cliente:', error);
      });
  };

  if (loading) {
    return (
      <div className="section">
        <h1 className="title">Cargando Clientes...</h1>
        <div className="spinner">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <h1 className="title">Clientes</h1>
      
      {/* Formulario para agregar un nuevo cliente */}
      <h2 className="subtitle">Agregar Cliente</h2>
      <form onSubmit={handleSubmitNewCliente}>
        <input
          type="text"
          name="nombre"
          value={newCliente.nombre}
          onChange={handleInputChange}
          placeholder="Nombre"
          required
        />
        <input
          type="email"
          name="correo"
          value={newCliente.correo}
          onChange={handleInputChange}
          placeholder="Correo"
          required
        />
        <input
          type="text"
          name="telefono"
          value={newCliente.telefono}
          onChange={handleInputChange}
          placeholder="Teléfono"
          required
        />
        <input
          type="number"
          name="tarifa_mensual"
          value={newCliente.tarifa_mensual}
          onChange={handleInputChange}
          placeholder="Tarifa mensual"
          required
        />
        <button type="submit">Agregar Cliente</button>
      </form>

      {/* Formulario para actualizar un cliente */}
      {editCliente && (
        <div>
          <h2 className="subtitle">Actualizar Cliente</h2>
          <form onSubmit={handleUpdateCliente}>
            <input
              type="text"
              name="nombre"
              value={editCliente.nombre}
              onChange={e => setEditCliente({ ...editCliente, nombre: e.target.value })}
              required
            />
            <input
              type="email"
              name="correo"
              value={editCliente.correo}
              onChange={e => setEditCliente({ ...editCliente, correo: e.target.value })}
              required
            />
            <input
              type="text"
              name="telefono"
              value={editCliente.telefono}
              onChange={e => setEditCliente({ ...editCliente, telefono: e.target.value })}
              required
            />
            <input
              type="number"
              name="tarifa_mensual"
              value={editCliente.tarifa_mensual}
              onChange={e => setEditCliente({ ...editCliente, tarifa_mensual: e.target.value })}
              required
            />
            <button type="submit">Actualizar Cliente</button>
          </form>
        </div>
      )}

      <table className="table is-striped is-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Tarifa Mensual</th>
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
                <td>
                  <button onClick={() => handleEditCliente(cliente)}>Editar</button>
                  <button onClick={() => handleDeleteCliente(cliente.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay clientes registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Clientes;
