const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/ClientesController');


// Obtener clientes con sus profesores y actividades
router.get('/clientes-con-profesores-y-actividades', clientesController.getClientesConProfesoresYActividades);

// Obtener todos los clientes
router.get('/', clientesController.getClientes);

// Crear un nuevo cliente
router.post('/', clientesController.createCliente);

// Obtener un cliente por ID
router.get('/:id', clientesController.getClienteById);

// Actualizar un cliente
router.put('/:id', clientesController.updateCliente);

// Eliminar un cliente
router.delete('/:id', clientesController.deleteCliente);  // Asegúrate de que esta ruta esté correctamente configurada

module.exports = router;
