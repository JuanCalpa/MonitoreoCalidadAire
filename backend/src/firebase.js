const admin = require("firebase-admin");
const serviceAccount = require("./clavePrivadaFirebase/credenciales.json"); // tu archivo descargado

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://esp32-a5441-default-rtdb.firebaseio.com"
});

const db = admin.database(); // Realtime Database
module.exports = db;
