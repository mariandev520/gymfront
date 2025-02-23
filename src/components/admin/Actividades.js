// src/components/admin/Actividades.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Actividades = () => {
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/actividades')
      .then(response => {
        setActividades(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las actividades:', error);
      });
  }, []);

  return (
    <div className="section">
      <h1 className="title">Actividades</h1>
      <ul>
        {actividades.map(actividad => (
          <li key={actividad.id}>{actividad.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Actividades;
