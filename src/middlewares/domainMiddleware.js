const validateDomain = (req, res, next) => {
    const domain = req.header("Domain");
    if (!domain) {
      return res.status(400).json({ message: "Error: El dominio es requerido en el header." });
    }
    req.domain = domain; // Guardamos el dominio en req para usarlo en los controladores
    next();
  };
  
  module.exports = validateDomain;
  