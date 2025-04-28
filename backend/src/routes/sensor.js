const express = require("express");
const router = express.Router();
const sensorController = require('../controllers/sensorController');

router.get("/datos", sensorController.getDatos);
router.get("/ultimo", sensorController.getUltimoDato); 

module.exports = router;
