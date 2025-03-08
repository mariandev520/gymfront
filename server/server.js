const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config(); // Cargar variables de entorno

// Importar rutas
const clientesRoutes = require("./routes/clientes");
const actividadesRoutes = require("./routes/actividades");
const profesoresRoutes = require("./routes/profesores");

const app = express();
const port = process.env.PORT || 3001;

// 🔹 Conectar a MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/basediego";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("🔥 Conectado a MongoDB"))
  .catch((error) => {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/clientes", clientesRoutes);
app.use("/actividades", actividadesRoutes);
app.use("/profesores", profesoresRoutes);

// 🔹 Ruta principal de prueba
app.get("/", (req, res) => {
  res.send("🔥 API funcionando correctamente!");
});

// Iniciar el servidor
app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Servidor ejecutándose en http://192.168.1.41:${port}`);
});
