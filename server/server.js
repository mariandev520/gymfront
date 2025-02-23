const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const clientesRoutes = require('./routes/clientes');
const actividadesRoutes = require('./routes/actividades');
const profesoresRoutes = require('./routes/profesores');
const clasesRoutes = require('./routes/clases');

const app = express();
const port = 3001; // Puerto diferente al del frontend

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/clientes', clientesRoutes);
app.use('/actividades', actividadesRoutes);
app.use('/profesores', profesoresRoutes);
app.use('/clases', clasesRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
