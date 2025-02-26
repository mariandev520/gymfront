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

module.exports = router;