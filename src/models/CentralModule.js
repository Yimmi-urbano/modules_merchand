const mongoose = require("mongoose");

const ModuleCentralSchema = new mongoose.Schema({
    domain: { type: String, required: true },
    title_module: { type: String, required: true },
    nameId: { type: String, required: true },
    type_module: { type: String, required: true },
    type_active: { type: String, required: true },
    logo: { type: String, required: true },
    description: { type: String, required: true },
    version: { type: String, required: true }
  
  });

  ModuleCentralSchema.index({ nameId: 1 }, { unique: true });
  
  module.exports = mongoose.model("Central_Modules", ModuleCentralSchema);