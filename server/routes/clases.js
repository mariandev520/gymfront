// server/routes/clases.js
const express = require('express');
const router = express.Router();
const clasesController = require('../controllers/clasesController');

// Crear una nueva clase
router.post('/', clasesController.createClase);

// Obtener todas las clases
router.get('/', clasesController.getClases);

// Obtener una clase por ID
router.get('/:id', clasesController.getClaseById);

// Actualizar una clase
router.put('/:id', clasesController.updateClase);

// Eliminar una clase
router.delete('/:id', clasesController.deleteClase);

module.exports = router;
