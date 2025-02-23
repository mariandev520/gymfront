// server/controllers/profesoresController.js
const connection = require('../db');

// Crear un nuevo profesor
exports.createProfesor = (req, res) => {
  const { nombre } = req.body;
  const query = 'INSERT INTO profesores (nombre) VALUES (?)';
  connection.query(query, [nombre], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al agregar profesor', error: err });
    } else {
      res.status(201).json({ message: 'Profesor agregado con éxito', id: result.insertId });
    }
  });
};

// Obtener todos los profesores
exports.getProfesores = (req, res) => {
  const query = 'SELECT * FROM profesores';
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener profesores', error: err });
    } else {
      res.status(200).json(results);
    }
  });
};

// Obtener un profesor por ID
exports.getProfesorById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM profesores WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener el profesor', error: err });
    } else if (result.length === 0) {
      res.status(404).json({ message: 'Profesor no encontrado' });
    } else {
      res.status(200).json(result[0]);
    }
  });
};

// Actualizar un profesor
exports.updateProfesor = (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const query = 'UPDATE profesores SET nombre = ? WHERE id = ?';
  connection.query(query, [nombre, id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al actualizar profesor', error: err });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Profesor no encontrado' });
    } else {
      res.status(200).json({ message: 'Profesor actualizado con éxito' });
    }
  });
};

// Eliminar un profesor
exports.deleteProfesor = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM profesores WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al eliminar profesor', error: err });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Profesor no encontrado' });
    } else {
      res.status(200).json({ message: 'Profesor eliminado con éxito' });
    }
  });
};
