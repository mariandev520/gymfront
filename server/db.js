const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config(); // Cargar variables de entorno

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/basediego";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();
    console.log("🔥 Conectado a MongoDB Atlas");
    return client.db("basediego"); // Cambia "tu_base" por el nombre real de tu DB
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  }
}


module.exports = connectDB;
