const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Obtener clientes con sus profesores y actividades
router.get('/clientes-con-profesores-y-actividades', clientesController.getClientesConProfesoresYActividades);

// Filtrar clientes por actividad (usando la columna actividad)
router.get('/filtrar-por-actividad/:actividades', clientesController.getClientesByActividad);

// Obtener todos los clientes
router.get('/', clientesController.getClientes);

// Crear un nuevo cliente
router.post('/', clientesController.createCliente);

// Obtener un cliente por ID
router.get('/:id', clientesController.getClienteById);

// Actualizar un cliente
router.put('/:id', clientesController.updateCliente);

// Eliminar un cliente
router.delete('/:id', clientesController.deleteCliente);

// Nuevo código: Verificar si el cliente está inscrito usando MongoDB
router.post('/clientes', async (req, res) => {
  const { nombre, apellido } = req.body;

  try {
    const database = await connectDB(); // Conexión a la base de datos MongoDB
    const cliente = await database.collection("clientes").findOne({ nombre, apellido });

    if (cliente) {
      res.json({ inscrito: true, cliente });
    } else {
      res.json({ inscrito: false });
    }
  } catch (error) {
    console.error("Error al consultar MongoDB:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
