// controllers/profesoresController.js
const Profesor = require('../models/Profesor'); // Importar el modelo de Profesor

// Crear un nuevo profesor
exports.createProfesor = async (req, res) => {
  const { nombre } = req.body;

  try {
    const nuevoProfesor = new Profesor({ nombre });
    await nuevoProfesor.save();
    res.status(201).json({ message: 'Profesor creado con éxito', id: nuevoProfesor._id });
  } catch (error) {
    if (error.code === 11000) { // Error de duplicado (nombre único)
      res.status(400).json({ message: 'El nombre del profesor ya existe' });
    } else {
      res.status(500).json({ message: 'Error al crear el profesor', error: error.message });
    }
  }
};

// Obtener todos los profesores
exports.getProfesores = async (req, res) => {
  try {
    const profesores = await Profesor.find();
    res.status(200).json(profesores);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener profesores', error: error.message });
  }
};

// Obtener un profesor por ID
exports.getProfesorById = async (req, res) => {
  const { id } = req.params;

  try {
    const profesor = await Profesor.findById(id);
    if (!profesor) {
      return res.status(404).json({ message: 'Profesor no encontrado' });
    }
    res.status(200).json(profesor);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el profesor', error: error.message });
  }
};

// Actualizar un profesor
exports.updateProfesor = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    const profesor = await Profesor.findByIdAndUpdate(
      id,
      { nombre },
      { new: true, runValidators: true } // Retorna el documento actualizado y valida los campos
    );

    if (!profesor) {
      return res.status(404).json({ message: 'Profesor no encontrado' });
    }
    res.status(200).json({ message: 'Profesor actualizado con éxito', profesor });
  } catch (error) {
    if (error.code === 11000) { // Error de duplicado (nombre único)
      res.status(400).json({ message: 'El nombre del profesor ya existe' });
    } else {
      res.status(500).json({ message: 'Error al actualizar el profesor', error: error.message });
    }
  }
};

// Eliminar un profesor
exports.deleteProfesor = async (req, res) => {
  const { id } = req.params;

  try {
    const profesor = await Profesor.findByIdAndDelete(id);
    if (!profesor) {
      return res.status(404).json({ message: 'Profesor no encontrado' });
    }
    res.status(200).json({ message: 'Profesor eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el profesor', error: error.message });
  }
};