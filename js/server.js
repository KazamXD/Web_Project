const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 📄 Ruta para obtener todos los usuarios
app.get("/usuarios", (req, res) => {
  const data = fs.readFileSync("data/user.json", "utf8");
  res.json(JSON.parse(data));
});

// ➕ Ruta para registrar un nuevo usuario
app.post("/usuarios", (req, res) => {
  const nuevoUsuario = req.body;
  const data = JSON.parse(fs.readFileSync("data/user.json", "utf8"));

  // Verificar si ya existe
  if (data.some(u => u.usuario === nuevoUsuario.usuario)) {
    return res.status(400).json({ mensaje: "El usuario ya existe" });
  }

  data.push(nuevoUsuario);
  fs.writeFileSync("data/user.json", JSON.stringify(data, null, 2));
  res.json({ mensaje: "Usuario agregado con éxito" });
});

// 🚀 Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
