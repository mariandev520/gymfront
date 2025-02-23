// src/components/admin/Clientes.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/clientes')
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los clientes:', error);
      });
  }, []);

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
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.correo}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.tarifa_mensual}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clientes;
