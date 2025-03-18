const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const moduleRoutes = require("./routes/moduleRoutes");

const app = express();
const PORT = process.env.PORT || 5200;

app.use(express.json());
app.use(cors());

// Conectar a la base de datos
connectDB();

console.log("📌 Variables de entorno cargadas:");
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Configurada" : "❌ No configurada");
console.log("NODE_ENV:", process.env.NODE_ENV || "development");
console.log("CUSTOM_VARIABLE:", process.env.CUSTOM_VARIABLE || "No definida");


// Rutas
app.use("/modules", moduleRoutes);

app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
