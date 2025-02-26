// controllers/clientesController.js
const connection = require('../db');


exports.createCliente = (req, res) => {
    const { nombre, correo, telefono, tarifa_mensual, actividades } = req.body; // Ahora recibe un array de actividades

    // Insertar el cliente en la base de datos
    const queryCliente = 'INSERT INTO clientes (nombre, correo, telefono, tarifa_mensual) VALUES (?, ?, ?, ?)';

    connection.query(queryCliente, [nombre, correo, telefono, tarifa_mensual], (err, result) => {
        if (err) {
            console.error('Error al insertar cliente:', err);
            return res.status(500).json({ message: 'Error al agregar cliente', error: err });
        }

        const clienteId = result.insertId; // Obtener el ID del cliente insertado

        // Insertar las actividades asociadas en la tabla cliente_actividad
        if (actividades && actividades.length > 0) {
            const queryActividades = 'INSERT INTO cliente_actividad (cliente_id, actividad_id) VALUES ?';
            const values = actividades.map(actividadId => [clienteId, actividadId]);

            connection.query(queryActividades, [values], (err) => {
                if (err) {
                    console.error('Error al asociar actividades al cliente:', err);
                    return res.status(500).json({ message: 'Error al asociar actividades', error: err });
                }

                res.status(201).json({ message: 'Cliente y actividades agregados con éxito', id: clienteId });
            });
        } else {
            res.status(201).json({ message: 'Cliente agregado sin actividades', id: clienteId });
        }
    });
};

exports.getClientesConProfesoresYActividades = (req, res) => {
    const query = `
      SELECT 
        c.id AS cliente_id,
        c.nombre AS cliente_nombre,
        c.direccion,
        c.correo,
        c.telefono,
        c.tarifa_mensual,
        GROUP_CONCAT(p.nombre) AS profesores,
        GROUP_CONCAT(a.nombre) AS actividades
      FROM 
        clientes c
      LEFT JOIN 
        cliente_profesor cp ON c.id = cp.cliente_id
      LEFT JOIN 
        profesores p ON cp.profesor_id = p.id
      LEFT JOIN 
        cliente_actividad ca ON c.id = ca.cliente_id
      LEFT JOIN 
        actividades a ON ca.actividad_id = a.id
      GROUP BY 
        c.id;
    `;
    connection.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Error al obtener clientes', error: err });
      } else {
        res.status(200).json(results);
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
// Filtrar clientes por actividad (usando la columna actividad en la tabla clientes)
exports.getClientesByActividad = (req, res) => {
    const { actividades } = req.params; // Cambia actividadId por actividad

    const query = `
        SELECT 
            id AS cliente_id,
            nombre AS cliente_nombre,
            direccion,
            correo,
            telefono,
            tarifa_mensual,
            actividades
        FROM 
            clientes
        WHERE 
            actividades = ?;
    `;

    connection.query(query, [actividades], (err, results) => {
        if (err) {
            console.error('Error al filtrar clientes por actividad:', err);
            res.status(500).json({ message: 'Error al filtrar clientes por actividad', error: err });
        } else {
            res.status(200).json(results);
        }
    });
};