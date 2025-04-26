const db = require("../firebase");

const getDatos = async (req, res) => {
    try {
      const ref = db.ref("/historial/2025-04-25/20-09-37"); // Ajusta "sensores" si tu ruta cambia
      ref.once("value", (snapshot) => {
        const datos = snapshot.val();
        res.json(datos);
      });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los datos" });
    }
  };

  module.exports = {
    getDatos
  }