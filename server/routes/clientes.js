// routes/clientes.js
const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Crear un cliente
router.post('/', clientesController.createCliente);

// Obtener todos los clientes
router.get('/', clientesController.getClientes);

// Obtener un cliente por ID
router.get('/:id', clientesController.getClienteById);

// Actualizar un cliente
router.put('/:id', clientesController.updateCliente);

// Eliminar un cliente
router.delete('/:id', clientesController.deleteCliente);

module.exports = router;
