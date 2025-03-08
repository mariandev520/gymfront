const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI; // Obtén la URI desde tu archivo .env
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
        return client.db("tu_base"); // Cambia "tu_base" por el nombre de tu base de datos
    } catch (error) {
        console.error("❌ Error al conectar a MongoDB:", error);
        process.exit(1);
    }
}

// Funciones de base de datos para interactuar con MongoDB
const find = (database, filter) => {
    return database.collection("clientes").find(filter).toArray();
};

const findOne = (database, filter) => {
    return database.collection("clientes").findOne(filter);
};

const deleteOne = (database, filter) => {
    return database.collection("clientes").deleteOne(filter);
};

const insertOne = (database, data) => {
    return database.collection("clientes").insertOne(data);
};

const updateOne = (database, filter, updateDoc) => {
    return database.collection("clientes").updateOne(filter, updateDoc);
};

module.exports = {
    connectDB,
    find,
    findOne,
    deleteOne,
    insertOne,
    updateOne,
};
