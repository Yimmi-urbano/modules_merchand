const Module = require("../models/Module");
const CentralModule = require("../models/CentralModule"); // Asegúrate de importar el modelo correcto

// 📌 Listar módulos por dominio

// 📌 Listar módulos por dominio con merge de datos desde central_modules
exports.getModules = async (req, res) => {
  try {
    // Obtener los módulos específicos del dominio
    const modules = await Module.find({ domain: req.domain });

    // Obtener los módulos centrales con los mismos nameId
    const nameIds = modules.map(mod => mod.nameId);
    const centralModules = await CentralModule.find({ nameId: { $in: nameIds } });

    // Crear un mapa de los módulos centrales por nameId
    const centralMap = centralModules.reduce((acc, mod) => {
      acc[mod.nameId] = mod;
      return acc;
    }, {});

    // Fusionar los datos del módulo del dominio con el módulo central
    const mergedModules = modules.map(mod => ({
      ...mod.toObject(),
      logo: centralMap[mod.nameId]?.logo,
      title_module:  centralMap[mod.nameId]?.title_module,
      description: centralMap[mod.nameId]?.description,
    }));

    res.json(mergedModules);
  } catch (error) {
    res.status(500).json({ message: `Error al obtener módulos: ${error.message}` });
  }
};

// 📌 Crear un módulo
exports.createModule = async (req, res) => {
  try {
    const { nameId, version } = req.body;
    
    if (!version || !nameId ) {
      return res.status(400).json({ message: "Error: Todos los campos son obligatorios." });
    }

    // Verificar si ya existe en ese dominio
    const existingModule = await Module.findOne({ domain: req.domain, nameId });
    if (existingModule) {
      return res.status(400).json({ message: `Error: Ya existe un módulo con nameId '${nameId}' en el dominio '${req.domain}'.` });
    }

    const newModule = new Module({ domain: req.domain, nameId, version  });
    await newModule.save();

    res.status(201).json({ message: "Éxito: Módulo creado correctamente.", module: newModule });
  } catch (error) {
    res.status(500).json({ message: `Error al crear módulo: ${error.message}` });
  }
};

// 📌 Actualizar un módulo
exports.updateModule = async (req, res) => {
  try {
    const { nameId, version } = req.body;

    if (!version || !nameId ) {
      return res.status(400).json({ message: "Error: Todos los campos son obligatorios." });
    }

    // Verificar si el nameId ya está en otro módulo del mismo dominio
    const existingModule = await Module.findOne({ domain: req.domain, nameId, _id: { $ne: req.params.id } });
    if (existingModule) {
      return res.status(400).json({ message: `Error: Ya existe otro módulo con nameId '${nameId}' en el dominio '${req.domain}'.` });
    }

    const updatedModule = await Module.findOneAndUpdate(
      { _id: req.params.id, domain: req.domain },
      { version, nameId },
      { new: true }
    );

    if (!updatedModule) return res.status(404).json({ message: "Error: Módulo no encontrado o no pertenece al dominio." });

    res.json({ message: "Éxito: Módulo actualizado correctamente.", module: updatedModule });
  } catch (error) {
    res.status(500).json({ message: `Error al actualizar módulo: ${error.message}` });
  }
};

// 📌 Eliminar un módulo
exports.deleteModule = async (req, res) => {
  try {
    const deletedModule = await Module.findOneAndDelete({ _id: req.params.id, domain: req.domain });

    if (!deletedModule) return res.status(404).json({ message: "Error: Módulo no encontrado o no pertenece al dominio." });

    res.json({ message: "Éxito: Módulo eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ message: `Error al eliminar módulo: ${error.message}` });
  }
};
