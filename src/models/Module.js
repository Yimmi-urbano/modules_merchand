const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema({
  domain: { type: String, required: true },
  title_module: { type: String, required: true },
  nameId: { type: String, required: true },
  type_module: { type: String, required: true },
  type_active: { type: String, required: true },
  logo: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

// 📌 Índice compuesto para evitar duplicados de nameId en un mismo dominio
ModuleSchema.index({ domain: 1, nameId: 1 }, { unique: true });

module.exports = mongoose.model("Module", ModuleSchema);
