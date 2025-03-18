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

// Rutas
app.use("/modules", moduleRoutes);

app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
