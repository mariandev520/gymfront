// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const clientesRoutes = require('./routes/clientes'); 
const actividadesRoutes = require('./routes/actividades'); 
const profesoresRoutes = require('./routes/profesores'); // Asegúrate de que esta importación sea correcta

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Usar las rutas de clientes
app.use('/clientes', clientesRoutes);
app.use('/actividades', actividadesRoutes);
app.use('/profesores', profesoresRoutes);  // Esto usa el router importado de routes/clientes

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://201.178.213.122:${port}`);
});