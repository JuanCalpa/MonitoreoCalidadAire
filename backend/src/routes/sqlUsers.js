// filepath: d:\Repositorio\MonitoreoCalidadAire\backend\src\routes\sqlRoutes.js
const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("../controllers/sqlController");

router.post("/user", createUser); // Crear usuario
router.post("/login", loginUser); // Validar inicio de sesión

module.exports = router;