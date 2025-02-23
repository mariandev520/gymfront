// routes/clientes.js
const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/ClientesController');  // Verifica esta importación

// Obtener todos los clientes
router.get('/', clientesController.getClientes);  // Asegúrate de que la función esté definida en el controlador

module.exports = router;
