const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


// Ruta para obtener todos los usuarios
app.get("/usuarios", (req, res) => {
  const data = fs.readFileSync("./user.json", "utf8");
  res.json(JSON.parse(data));
});

// Ruta para registrar un nuevo usuario
app.post("/usuarios", (req, res) => {
  const nuevoUsuario = req.body;
  const data = JSON.parse(fs.readFileSync("./user.json", "utf8"));

  // Verificar si ya existe
  if (data.some(u => u.usuario === nuevoUsuario.usuario)) {
    return res.status(400).json({ mensaje: "El usuario ya existe" });
  }

  data.push(nuevoUsuario);
  fs.writeFileSync("./user.json", JSON.stringify(data, null, 2));
  res.json({ mensaje: "Usuario agregado con éxito" });
});

// Ruta para eliminar un usuario
// Eliminar un usuario por su nombre de usuario
app.delete("/usuarios", (req, res) => {
  const { usuario } = req.body; // <-- recibir usuario desde el body

  const data = JSON.parse(fs.readFileSync("./user.json", "utf8"));
  const index = data.findIndex(u => u.usuario === usuario);

  if (index === -1) return res.status(404).json({ mensaje: "Usuario no encontrado" });

  data.splice(index, 1);
  fs.writeFileSync("./user.json", JSON.stringify(data, null, 2));

  res.json({ mensaje: "Usuario eliminado con éxito" });
});

//Ruta para los datos del dashboard
app.get("/estadisticas", (req, res) => {
  const data = fs.readFileSync("./statistics.json", "utf8");
  res.json(JSON.parse(data));
});

// Servir archivos estáticos al final
app.use(express.static(__dirname));

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});

