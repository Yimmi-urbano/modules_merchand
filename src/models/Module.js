const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema({
  domain: { type: String, required: true },
  nameId: { type: String, required: true },
  version: { type: String, required: true }

}, { timestamps: true });

ModuleSchema.index({ domain: 1, nameId: 1 }, { unique: true });

module.exports = mongoose.model("Installed_Module", ModuleSchema);
