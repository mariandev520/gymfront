const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Obtener clientes con sus profesores y actividades
router.get('/clientes-con-profesores-y-actividades', clientesController.getClientesConProfesoresYActividades);

// Filtrar clientes por actividad (usando la columna actividad)
router.get('/filtrar-por-actividad/:actividades', clientesController.getClientesByActividad);

// Obtener todos los clientes
router.get('/', clientesController.getClientes);

// Crear un nuevo cliente
router.post('/', clientesController.createCliente);

// Obtener un cliente por ID
router.get('/:id', clientesController.getClienteById);

// Actualizar un cliente
router.put('/:id', clientesController.updateCliente);

// Eliminar un cliente
router.delete('/:id', clientesController.deleteCliente);

router.post('/clientes', (req, res) => {
    const { nombre, apellido } = req.body;
  
    const query = 'SELECT * FROM clientes WHERE nombre = ? ';
    connection.query(query, [nombre, apellido], (err, results) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }
  
      if (results.length > 0) {
        res.json({ inscrito: true, cliente: results[0] });
      } else {
        res.json({ inscrito: false });
      }
    });
  });
  

module.exports = router;