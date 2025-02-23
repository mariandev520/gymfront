// server/routes/profesores.js
const express = require('express');
const router = express.Router();
const profesoresController = require('../controllers/profesoresController');

// Crear un nuevo profesor
router.post('/', profesoresController.createProfesor);

// Obtener todos los profesores
router.get('/', profesoresController.getProfesores);

// Obtener un profesor por ID
router.get('/:id', profesoresController.getProfesorById);

// Actualizar un profesor
router.put('/:id', profesoresController.updateProfesor);

// Eliminar un profesor
router.delete('/:id', profesoresController.deleteProfesor);

module.exports = router;
