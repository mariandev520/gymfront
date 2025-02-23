// controllers/clientesController.js
const connection = require('../db');

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
