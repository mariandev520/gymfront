// models/Actividad.js
const mongoose = require('mongoose');

const ActividadSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true }, // Nombre de la actividad
});

module.exports = mongoose.model('Actividad', ActividadSchema);