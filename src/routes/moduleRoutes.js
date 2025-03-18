const express = require("express");
const router = express.Router();
const { getModules, createModule, updateModule, deleteModule } = require("../controllers/moduleController");
const validateDomain = require("../middlewares/domainMiddleware");

router.get("/", validateDomain, getModules);
router.post("/", validateDomain, createModule);
router.put("/:id", validateDomain, updateModule);
router.delete("/:id", validateDomain, deleteModule);

module.exports = router;
