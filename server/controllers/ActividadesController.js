// controllers/actividadesController.js
const connection = require('../db');

// Crear una actividad
exports.createActividad = (req, res) => {
  const { nombre } = req.body;  // Obtener los datos del cuerpo de la solicitud
  const query = 'INSERT INTO actividades (nombre) VALUES (?)';  // Query para agregar la actividad

  connection.query(query, [nombre], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al agregar actividad', error: err });
    } else {
      res.status(201).json({ message: 'Actividad agregada con éxito', id: result.insertId });
    }
  });
};

// Obtener todas las actividades
exports.getActividades = (req, res) => {
  const query = 'SELECT * FROM actividades';
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener actividades', error: err });
    } else {
      res.status(200).json(results);
    }
  });
};

// Obtener una actividad por ID
exports.getActividadById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM actividades WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener la actividad', error: err });
    } else if (result.length === 0) {
      res.status(404).json({ message: 'Actividad no encontrada' });
    } else {
      res.status(200).json(result[0]);
    }
  });
};

// Actualizar una actividad
exports.updateActividad = (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const query = 'UPDATE actividades SET nombre = ? WHERE id = ?';
  connection.query(query, [nombre, id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al actualizar actividad', error: err });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Actividad no encontrada' });
    } else {
      res.status(200).json({ message: 'Actividad actualizada con éxito' });
    }
  });
};

// Eliminar una actividad
exports.deleteActividad = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM actividades WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al eliminar actividad', error: err });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Actividad no encontrada' });
    } else {
      res.status(200).json({ message: 'Actividad eliminada con éxito' });
    }
  });
};
