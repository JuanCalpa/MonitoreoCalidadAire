const mysql = require("mysql2");

// Configuración de la conexión
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "admin", 
  database: "usuariosPlataforma", 
  port: 3306
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conexión exitosa a la base de datos SQL.");
});

module.exports = connection;