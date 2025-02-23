// server/routes/actividades.js
const express = require('express');
const router = express.Router();
const actividadesController = require('../controllers/actividadesController');

// Crear una nueva actividad
router.post('/', actividadesController.createActividad);

// Obtener todas las actividades
router.get('/', actividadesController.getActividades);

// Obtener una actividad por ID
router.get('/:id', actividadesController.getActividadById);

// Actualizar una actividad
router.put('/:id', actividadesController.updateActividad);

// Eliminar una actividad
router.delete('/:id', actividadesController.deleteActividad);

module.exports = router;
