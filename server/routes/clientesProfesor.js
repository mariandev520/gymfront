const express = require('express');
const router = express.Router();
const clienteProfesorController = require('../controllers/clienteProfesorController');

// Asociar un profesor a un cliente
router.post('/', clienteProfesorController.asociarProfesorACliente);

// Obtener todos los profesores asociados a un cliente
router.get('/cliente/:clienteId', clienteProfesorController.getProfesoresByClienteId);

// Obtener todos los clientes asociados a un profesor
router.get('/profesor/:profesorId', clienteProfesorController.getClientesByProfesorId);

// Eliminar una asociación entre cliente y profesor
router.delete('/', clienteProfesorController.eliminarAsociacion);

module.exports = router;