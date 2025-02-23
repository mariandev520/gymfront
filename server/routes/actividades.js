// routes/actividades.js
const express = require('express');
const router = express.Router();
const actividadesController = require('../controllers/actividadesController');

// Obtener todas las actividades
router.get('/', actividadesController.getActividades);

// Crear una nueva actividad
router.post('/', actividadesController.createActividad);  // Verifica esta ruta

// Obtener una actividad por ID
router.get('/:id', actividadesController.getActividadById);

// Actualizar una actividad
router.put('/:id', actividadesController.updateActividad);

// Eliminar una actividad
router.delete('/:id', actividadesController.deleteActividad);

module.exports = router;
