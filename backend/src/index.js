const express = require("express");
const app = express();
const sensorRoutes = require("./routes/sensor");

app.use(express.json());

app.use("/api", sensorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
