// controllers/actividadesController.js
const Actividad = require('../models/Actividad'); // Importar el modelo de Actividad

// Crear una actividad
exports.createActividad = async (req, res) => {
  const { nombre } = req.body;

  try {
    const nuevaActividad = new Actividad({ nombre });
    await nuevaActividad.save();
    res.status(201).json({ message: 'Actividad creada con éxito', id: nuevaActividad._id });
  } catch (error) {
    if (error.code === 11000) { // Error de duplicado (nombre único)
      res.status(400).json({ message: 'El nombre de la actividad ya existe' });
    } else {
      res.status(500).json({ message: 'Error al crear la actividad', error: error.message });
    }
  }
};

// Obtener todas las actividades
exports.getActividades = async (req, res) => {
  try {
    const actividades = await Actividad.find();
    res.status(200).json(actividades);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener actividades', error: error.message });
  }
};

// Obtener una actividad por ID
exports.getActividadById = async (req, res) => {
  const { id } = req.params;

  try {
    const actividad = await Actividad.findById(id);
    if (!actividad) {
      return res.status(404).json({ message: 'Actividad no encontrada' });
    }
    res.status(200).json(actividad);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la actividad', error: error.message });
  }
};

// Actualizar una actividad
exports.updateActividad = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    const actividad = await Actividad.findByIdAndUpdate(
      id,
      { nombre },
      { new: true, runValidators: true } // Retorna el documento actualizado y valida los campos
    );

    if (!actividad) {
      return res.status(404).json({ message: 'Actividad no encontrada' });
    }
    res.status(200).json({ message: 'Actividad actualizada con éxito', actividad });
  } catch (error) {
    if (error.code === 11000) { // Error de duplicado (nombre único)
      res.status(400).json({ message: 'El nombre de la actividad ya existe' });
    } else {
      res.status(500).json({ message: 'Error al actualizar la actividad', error: error.message });
    }
  }
};

// Eliminar una actividad
exports.deleteActividad = async (req, res) => {
  const { id } = req.params;

  try {
    const actividad = await Actividad.findByIdAndDelete(id);
    if (!actividad) {
      return res.status(404).json({ message: 'Actividad no encontrada' });
    }
    res.status(200).json({ message: 'Actividad eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la actividad', error: error.message });
  }
};