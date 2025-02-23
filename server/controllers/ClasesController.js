// server/controllers/clasesController.js
const connection = require('../db');

// Crear una nueva clase
exports.createClase = (req, res) => {
  const { cliente_id, actividad_id, profesor_id, fecha } = req.body;
  const query = 'INSERT INTO clases (cliente_id, actividad_id, profesor_id, fecha) VALUES (?, ?, ?, ?)';
  connection.query(query, [cliente_id, actividad_id, profesor_id, fecha], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al agregar clase', error: err });
    } else {
      res.status(201).json({ message: 'Clase agregada con éxito', id: result.insertId });
    }
  });
};

// Obtener todas las clases
exports.getClases = (req, res) => {
  const query = 'SELECT * FROM clases';
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener clases', error: err });
    } else {
      res.status(200).json(results);
    }
  });
};

// Obtener una clase por ID
exports.getClaseById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM clases WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener la clase', error: err });
    } else if (result.length === 0) {
      res.status(404).json({ message: 'Clase no encontrada' });
    } else {
      res.status(200).json(result[0]);
    }
  });
};

// Crear un cliente
exports.createCliente = (req, res) => {
  const { nombre, correo, telefono, tarifa_mensual } = req.body;
  const query = 'INSERT INTO clientes (nombre, correo, telefono, tarifa_mensual) VALUES (?, ?, ?, ?)';
  connection.query(query, [nombre, correo, telefono, tarifa_mensual], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al agregar cliente', error: err });
    } else {
      res.status(201).json({ message: 'Cliente agregado con éxito', id: result.insertId });
    }
  });
};

// Actualizar una clase
exports.updateClase = (req, res) => {
  const { id } = req.params;
  const { cliente_id, actividad_id, profesor_id, fecha } = req.body;
  const query = 'UPDATE clases SET cliente_id = ?, actividad_id = ?, profesor_id = ?, fecha = ? WHERE id = ?';
  connection.query(query, [cliente_id, actividad_id, profesor_id, fecha, id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al actualizar clase', error: err });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Clase no encontrada' });
    } else {
      res.status(200).json({ message: 'Clase actualizada con éxito' });
    }
  });
};

// Eliminar una clase
exports.deleteClase = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM clases WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al eliminar clase', error: err });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Clase no encontrada' });
    } else {
      res.status(200).json({ message: 'Clase eliminada con éxito' });
    }
  });
};

// Actualizar un cliente
exports.updateCliente = (req, res) => {
  const { id } = req.params;
  const { nombre, correo, telefono, tarifa_mensual } = req.body;
  const query = 'UPDATE clientes SET nombre = ?, correo = ?, telefono = ?, tarifa_mensual = ? WHERE id = ?';
  connection.query(query, [nombre, correo, telefono, tarifa_mensual, id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al actualizar cliente', error: err });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Cliente no encontrado' });
    } else {
      res.status(200).json({ message: 'Cliente actualizado con éxito' });
    }
  });
};

// Eliminar un cliente
exports.deleteCliente = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM clientes WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al eliminar cliente', error: err });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Cliente no encontrado' });
    } else {
      res.status(200).json({ message: 'Cliente eliminado con éxito' });
    }
  });
};