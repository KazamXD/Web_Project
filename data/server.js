const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();

// ---- Middlewares (una sola vez, arriba) ----
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type"
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ---- Rutas ----

// Obtener todos los usuarios
app.get("/usuarios/:usuario", (req, res) => {
  const usuarioId = req.params.usuario;
  const data = JSON.parse(fs.readFileSync("./user.json", "utf8"));

  const usuario = data.find(u => u.usuario === usuarioId);

  if (!usuario) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  res.json(usuario);
});

// Registrar nuevo usuario
app.post("/usuarios", (req, res) => {
  const nuevoUsuario = req.body;
  const data = JSON.parse(fs.readFileSync("./user.json", "utf8"));

  if (data.some(u => u.usuario === nuevoUsuario.usuario)) {
    return res.status(400).json({ mensaje: "El usuario ya existe" });
  }

  data.push(nuevoUsuario);
  fs.writeFileSync("./user.json", JSON.stringify(data, null, 2));
  res.json({ mensaje: "Usuario agregado con éxito" });
});

// Eliminar usuario
app.delete("/usuarios", (req, res) => {
  const { usuario } = req.body;
  const data = JSON.parse(fs.readFileSync("./user.json", "utf8"));
  const index = data.findIndex(u => u.usuario === usuario);

  if (index === -1) return res.status(404).json({ mensaje: "Usuario no encontrado" });

  data.splice(index, 1);
  fs.writeFileSync("./user.json", JSON.stringify(data, null, 2));
  res.json({ mensaje: "Usuario eliminado con éxito" });
});

// Estadísticas
app.get("/estadisticas", (req, res) => {
  const data = fs.readFileSync("./statistics.json", "utf8");
  res.json(JSON.parse(data));
});

// Actualizar usuario
// Actualizar usuario
app.put("/usuarios/:usuario", (req, res) => {
  try {
    const usuarioId = req.params.usuario;
    const nuevosDatos = req.body;

    const usuarios = JSON.parse(fs.readFileSync("./user.json", "utf8"));
    const index = usuarios.findIndex(u => u.usuario === usuarioId);

    if (index === -1) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Mezclar datos anteriores con nuevos
    usuarios[index] = { ...usuarios[index], ...nuevosDatos };

    fs.writeFileSync("./user.json", JSON.stringify(usuarios, null, 2));

    res.json({ mensaje: "Usuario actualizado con éxito" });
  } catch (e) {
    console.error("Error en PUT /usuarios/:usuario:", e);
    res.status(500).send("Error interno al actualizar usuario");
  }
});


// Archivos estáticos (si los necesitas)
app.use(express.static(__dirname));

// Iniciar
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
