// src/components/admin/Clientes.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="section">
        <h1 className="title">Cargando Clientes...</h1>
        <div className="spinner">
          <i className="fas fa-spinner fa-spin"></i> {/* Mostrar un ícono de carga */}
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <h1 className="title">Clientes</h1>
      <table className="table is-striped is-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Tarifa Mensual</th>
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay clientes registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Clientes;
