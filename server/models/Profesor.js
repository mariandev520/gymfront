// models/Profesor.js
const mongoose = require('mongoose');

const ProfesorSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true }, // Nombre del profesor
});

module.exports = mongoose.model('Profesor', ProfesorSchema);