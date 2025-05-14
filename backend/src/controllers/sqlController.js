const connection = require("../sqlConnection");

// Método para crear un nuevo usuario
const createUser = (req, res) => {
  const { nombre, correo, contraseña, tipo, institucion, cargo, biografia } = req.body;

  // Validar los campos obligatorios para todos los usuarios
  if (!nombre || !correo || !contraseña || !tipo) {
    return res.status(400).send("Faltan campos obligatorios.");
  }

  // Validar campos adicionales si el tipo es "investigador"
  if (tipo === "investigador" && (!institucion || !cargo)) {
    return res.status(400).send("Faltan campos obligatorios para el investigador (institución y cargo).");
  }

  // Iniciar una transacción para garantizar consistencia
  connection.beginTransaction((err) => {
    if (err) {
      console.error("Error al iniciar la transacción:", err);
      return res.status(500).send("Error al crear el usuario.");
    }

    // Insertar en la tabla usuarios
    const userQuery = `
      INSERT INTO usuarios (nombre, correo, contraseña, tipo)
      VALUES (?, ?, ?, ?)
    `;
    connection.query(userQuery, [nombre, correo, contraseña, tipo], (err, userResult) => {
      if (err) {
        console.error("Error al insertar en usuarios:", err);
        connection.rollback(() => {
          res.status(500).send("Error al crear el usuario.");
        });
        return;
      }

      // Si el tipo es "investigador", insertar en la tabla investigadores
      if (tipo === "investigador") {
        const investigadorQuery = `
          INSERT INTO investigadores (usuario_id, institucion, cargo, biografia)
          VALUES (?, ?, ?, ?)
        `;
        connection.query(
          investigadorQuery,
          [userResult.insertId, institucion, cargo, biografia || null],
          (err) => {
            if (err) {
              console.error("Error al insertar en investigadores:", err);
              connection.rollback(() => {
                res.status(500).send("Error al crear el investigador.");
              });
              return;
            }

            // Confirmar la transacción
            connection.commit((err) => {
              if (err) {
                console.error("Error al confirmar la transacción:", err);
                connection.rollback(() => {
                  res.status(500).send("Error al crear el usuario.");
                });
                return;
              }
              res.status(201).send("Usuario e investigador creados correctamente.");
            });
          }
        );
      } else {
        // Confirmar la transacción si no es investigador
        connection.commit((err) => {
          if (err) {
            console.error("Error al confirmar la transacción:", err);
            connection.rollback(() => {
              res.status(500).send("Error al crear el usuario.");
            });
            return;
          }
          res.status(201).send("Usuario creado correctamente.");
        });
      }
    });
  });
};

const loginUser = (req, res) => {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res.status(400).send({ success: false, error: "Faltan campos obligatorios." });
  }

  const query = `SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?`;
  connection.query(query, [correo, contraseña], (err, results) => {
    if (err) {
      console.error("Error al validar el usuario:", err);
      return res.status(500).send({ success: false, error: "Error al validar el usuario." });
    }

    if (results.length === 0) {
      return res.status(401).send({ success: false, error: "Credenciales inválidas." });
    }

    const user = results[0];
    res.status(200).send({
      success: true,
      user: {
        id: user.id,
        nombre: user.nombre,
        tipo: user.tipo,
      },
    });
  });
};

// Exportar los métodos
module.exports = {
  createUser,
  loginUser,
};