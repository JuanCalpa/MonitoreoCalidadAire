const express = require("express");
const app = express();
const sensorRoutes = require("./routes/sensor");
const sqlUsersRoutes = require("./routes/sqlUsers"); // Importar las rutas de usuarios

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use("/api", sensorRoutes);
app.use("/api/sql", sqlUsersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
