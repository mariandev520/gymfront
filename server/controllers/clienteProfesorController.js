const connection = require('../db');

// Asociar un profesor a un cliente
exports.asociarProfesorACliente = (req, res) => {
  const { cliente_id, profesor_id } = req.body;
  const query = 'INSERT INTO cliente_profesor (cliente_id, profesor_id) VALUES (?, ?)';
  connection.query(query, [cliente_id, profesor_id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al asociar profesor a cliente', error: err });
    } else {
      res.status(201).json({ message: 'Profesor asociado con éxito' });
    }
  });
};

// Obtener todos los profesores asociados a un cliente
exports.getProfesoresByClienteId = (req, res) => {
  const { clienteId } = req.params;
  const query = `
    SELECT p.* 
    FROM profesores p
    INNER JOIN cliente_profesor cp ON p.id = cp.profesor_id
    WHERE cp.cliente_id = ?
  `;
  connection.query(query, [clienteId], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener profesores', error: err });
    } else {
      res.status(200).json(results);
    }
  });
};

// Obtener todos los clientes asociados a un profesor
exports.getClientesByProfesorId = (req, res) => {
  const { profesorId } = req.params;
  const query = `
    SELECT c.* 
    FROM clientes c
    INNER JOIN cliente_profesor cp ON c.id = cp.cliente_id
    WHERE cp.profesor_id = ?
  `;
  connection.query(query, [profesorId], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener clientes', error: err });
    } else {
      res.status(200).json(results);
    }
  });
};

// Eliminar una asociación entre cliente y profesor
exports.eliminarAsociacion = (req, res) => {
  const { cliente_id, profesor_id } = req.body;
  const query = 'DELETE FROM cliente_profesor WHERE cliente_id = ? AND profesor_id = ?';
  connection.query(query, [cliente_id, profesor_id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error al eliminar asociación', error: err });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Asociación no encontrada' });
    } else {
      res.status(200).json({ message: 'Asociación eliminada con éxito' });
    }
  });
};