const express = require("express");
const router = express.Router();
const sensorController = require('../controllers/sensorController')

router.get("/datos", sensorController.getDatos);

module.exports = router;
