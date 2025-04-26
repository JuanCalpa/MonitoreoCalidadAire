const db = require("../firebase");

const getDatos = async (req, res) => {
    try {
      const ref = db.ref("20-09-37"); // Ajusta "sensores" si tu ruta cambia
      ref.once("value", (snapshot) => {
        const datos = snapshot.val();
        res.json(datos);
      });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los datos" });
    }
  };

  const getUltimoDato = async (req, res) => {
    try {
        const ref = db.ref("/historial");

        ref.once("value", (snapshot) => {
            const historial = snapshot.val();
            if (!historial) {
                return res.status(404).json({ error: "No se encontró historial" });
            }

            // Obtener la lista de días, ordenarlos y tomar el más reciente
            const dias = Object.keys(historial).sort();
            const ultimoDia = dias[dias.length - 1];

            // Obtener las horas del último día
            const horas = Object.keys(historial[ultimoDia]).sort();
            const ultimaHora = horas[horas.length - 1];

            // Ahora, dentro de la última hora, tomar la medición
            const mediciones = historial[ultimoDia][ultimaHora];
            const [id, datosMedicion] = Object.entries(mediciones)[0]; // id es como -OOjd8CoNgYQ-KBnW51p

            res.json({
                dia: ultimoDia,
                hora: ultimaHora,
                ...datosMedicion
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el último dato" });
    }
};

  module.exports = {
    getDatos,
    getUltimoDato
  }