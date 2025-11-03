const SERVER_URL = "http://localhost:3000"; // tu backend

// Obtener parámetro de URL
const params = new URLSearchParams(window.location.search);
const usuarioId = params.get("usuario");

if (!usuarioId) {
  alert("Usuario no especificado");
  location.href = "admin.html";
}

// Cargar datos del usuario en el formulario
async function cargarUsuario() {
  try {
    console.log("Usuario ID desde URL:", usuarioId);
    const res = await fetch(`${SERVER_URL}/usuarios/${usuarioId}`);
    if (!res.ok) throw new Error("No se pudo cargar el usuario");

    const usuario = await res.json();

    document.getElementById("nombre").value = usuario.nombre || "";
    document.getElementById("apellido").value = usuario.apellido || "";
    document.getElementById("correo").value = usuario.correo || "";
    document.getElementById("rol").value = usuario.rol || "cliente";

  } catch (err) {
    console.error(err);
    alert("Error cargando datos del usuario");
    location.href = "admin.html";
  }
}

cargarUsuario();

// Guardar cambios
document.getElementById("update-user-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const datos = {
    usuario: usuarioId,
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    correo: document.getElementById("correo").value,
    rol: document.getElementById("rol").value,
  };

  try {
    const res = await fetch(`${SERVER_URL}/usuarios/${usuarioId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    if (!res.ok) throw new Error("Error al actualizar");

    alert("Usuario actualizado con éxito");
    location.href = "admin.html";

  } catch (err) {
    console.error(err);
    alert("No se pudo actualizar el usuario");
  }
});

// Logout
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "login.html";
});
