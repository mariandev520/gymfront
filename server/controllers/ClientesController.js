// controllers/clientesController.js
const connection = require('../db');

// Crear un cliente
exports.createCliente = (req, res) => {
  const { nombre, correo, telefono, tarifa_mensual } = req.body;
  const query = 'INSERT INTO clientes (nombre, correo, telefono, tarifa_mensual) VALUES (?, ?, ?, ?)';
  connection.query(query, [nombre, correo, telefono, tarifa_mensual], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al agregar cliente', error: err });
      console.error('Error al insertar cliente:', err);
    } else {
      res.status(201).json({ message: 'Cliente agregado con éxito', id: result.insertId });
    }
  });
};

// Obtener todos los clientes
exports.getClientes = (req, res) => {
  const query = 'SELECT * FROM clientes';
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener clientes', error: err });
    } else {
      res.status(200).json(results);
    }
  });
};

// Obtener un cliente por ID
exports.getClienteById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM clientes WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener el cliente', error: err });
    } else if (result.length === 0) {
      res.status(404).json({ message: 'Cliente no encontrado' });
    } else {
      res.status(200).json(result[0]);
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
