const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const moduleRoutes = require("./src/routes/moduleRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));


// Rutas
app.use("/modules", moduleRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));

module.exports = app;
