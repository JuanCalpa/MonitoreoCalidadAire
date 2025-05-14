const admin = require("firebase-admin");
require("dotenv").config({ path: "d:/Repositorio/MonitoreoCalidadAire/backend/.env" });

// Verifica si las variables de entorno se están cargando correctamente
console.log("FIREBASE_PROJECT_ID:", process.env.FIREBASE_PROJECT_ID);
console.log("FIREBASE_PRIVATE_KEY:", process.env.FIREBASE_PRIVATE_KEY ? "Cargada correctamente" : "No definida");
console.log("FIREBASE_CLIENT_EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);
console.log("FIREBASE_DATABASE_URL:", process.env.FIREBASE_DATABASE_URL);

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.database(); // Realtime Database
module.exports = db;