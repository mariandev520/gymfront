const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Importar rutas
const clientesRoutes = require("./routes/clientes");
const actividadesRoutes = require("./routes/actividades");
const profesoresRoutes = require("./routes/profesores");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({ origin: '*' }));

// 🔹 Conectar a MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/basediego";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("🔥 Conectado a MongoDB"))
  .catch((error) => {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  });

// Configurar CORS
const allowedOrigins = [
  "http://localhost:3002",
  "https://gymfront.vercel.app/",
  "http://gymfront-git-conmogose-mariandev520s-projects.vercel.app",
  "http://192.168.1.41:3002",
  "https://42f6-201-178-206-232.ngrok-free.app/", // Agregar la URL de ngrok
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origen no permitido por CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Middleware
app.use(express.json());

// Rutas
app.use("/clientes", clientesRoutes);
app.use("/actividades", actividadesRoutes);
app.use("/profesores", profesoresRoutes);

// 🔹 Ruta principal de prueba
app.get("/", (req, res) => {
  res.send("🔥 API funcionando correctamente!");
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ message: "Error interno del servidor" });
});

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Iniciar el servidor
app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Servidor ejecutándose en http://localhost:${port}`);
});