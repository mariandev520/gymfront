const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/ClientesController');

// Obtener clientes con sus profesores y actividades
router.get('/clientes-con-profesores-y-actividades', clientesController.getClientesConProfesoresYActividades);

// Filtrar clientes por actividad
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

// Verificar si el cliente está inscrito
router.post('/verificar-inscripcion', clientesController.verificarInscripcion);

// Obtener un cliente por tarifa_mensual (que se usa como DNI)
router.get('/tarifa_mensual/:dni', clientesController.getClienteByTarifa);

module.exports = router;
