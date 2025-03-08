// models/Cliente.js
const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: { type: String },
  correo: { type: String, required: true, unique: true },
  telefono: { type: String },
  tarifa_mensual: { type: Number },
  actividades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actividad' }], // Referencia a Actividad
  profesores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profesor' }], // Referencia a Profesor
});

module.exports = mongoose.model('Cliente', ClienteSchema);