const Cliente = require('../models/Cliente'); // Importar el modelo de Cliente
const Actividad = require('../models/Actividad'); // Importar el modelo de Actividad
const Profesor = require('../models/Profesor'); // Importar el modelo de Profesor

// Obtener clientes con sus profesores y actividades
exports.getClientesConProfesoresYActividades = async (req, res) => {
  try {
    const clientes = await Cliente.aggregate([
      {
        $lookup: {
          from: 'profesores', // Colección de profesores
          localField: 'profesores', // Campo en Cliente que referencia a Profesor
          foreignField: '_id',
          as: 'profesores',
        },
      },
      {
        $lookup: {
          from: 'actividades', // Colección de actividades
          localField: 'actividades', // Campo en Cliente que referencia a Actividad
          foreignField: '_id',
          as: 'actividades',
        },
      },
      {
        $project: {
          nombre: 1,
          direccion: 1,
          correo: 1,
          telefono: 1,
          tarifa_mensual: 1,
          profesores: { $map: { input: '$profesores', as: 'prof', in: '$$prof.nombre' } },
          actividades: { $map: { input: '$actividades', as: 'act', in: '$$act.nombre' } },
        },
      },
    ]);
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener clientes', error: error.message });
  }
};

// Filtrar clientes por actividad
exports.getClientesByActividad = async (req, res) => {
  const { actividades } = req.params;
  try {
    const clientes = await Cliente.find({ actividades: actividades });
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Error al filtrar clientes por actividad', error: error.message });
  }
};

// Obtener todos los clientes
exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener clientes', error: error.message });
  }
};

// Crear un nuevo cliente
exports.createCliente = async (req, res) => {
  const { nombre, correo, telefono, tarifa_mensual, actividades } = req.body;
  try {
    const nuevoCliente = new Cliente({ nombre, correo, telefono, tarifa_mensual, actividades });
    await nuevoCliente.save();
    res.status(201).json({ message: 'Cliente creado con éxito', id: nuevoCliente._id });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear cliente', error: error.message });
  }
};

// Obtener un cliente por ID
exports.getClienteById = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findById(id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cliente', error: error.message });
  }
};

// Actualizar un cliente
exports.updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, telefono, tarifa_mensual, actividades } = req.body;
  try {
    const cliente = await Cliente.findByIdAndUpdate(
      id,
      { nombre, correo, telefono, tarifa_mensual, actividades },
      { new: true }
    );
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.status(200).json({ message: 'Cliente actualizado con éxito', cliente });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar cliente', error: error.message });
  }
};

// Eliminar un cliente
exports.deleteCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByIdAndDelete(id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.status(200).json({ message: 'Cliente eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar cliente', error: error.message });
  }
};

// Verificar si el cliente está inscrito (por nombre y apellido)
exports.verificarInscripcion = async (req, res) => {
  const { nombre, apellido } = req.body;
  try {
    const cliente = await Cliente.findOne({ nombre, apellido });
    if (cliente) {
      res.json({ inscrito: true, cliente });
    } else {
      res.json({ inscrito: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al verificar inscripción', error: error.message });
  }
};

// Obtener un cliente por tarifa_mensual (usado como DNI)
exports.getClienteByTarifa = async (req, res) => {
  const { dni } = req.params; // En este caso, "dni" se interpreta como tarifa_mensual
  try {
    const cliente = await Cliente.findOne({ tarifa_mensual: dni });
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener cliente", error: error.message });
  }
};
