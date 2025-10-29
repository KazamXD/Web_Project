const user = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!user) {
  alert("Debes iniciar sesión primero");
  window.location.href = "login.html";
} else if (user.rol !== "cliente") {
  alert("Solo los clientes pueden acceder a su perfil");
  window.location.href = "index.html";
}

// URL de tu servidor Node
const SERVER_URL = "http://localhost:3000";

// Leer el usuario activo del localStorage
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    const perfil = document.getElementById("perfil-contenido");
    const sinSesion = document.getElementById("sin-sesion");

    if (usuario) {
      // Mostrar el perfil
      perfil.classList.remove("hidden");
      document.getElementById("nombre").textContent = `${usuario.nombre} ${usuario.apellido}`;
      document.getElementById("usuario").textContent = usuario.usuario;
      document.getElementById("correo").textContent = usuario.correo;
      document.getElementById("fecha").textContent = "Octubre 2025";
    } else {
      // Si no hay sesión activa
      sinSesion.classList.remove("hidden");
    }

    // Cerrar sesión
    const logoutBtn = document.getElementById("logout");
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("usuarioActivo");
      window.location.href = "http://127.0.0.1:5500/Web_Project/index.html";
    });

//Eliminar usuario
const eliminarBtn = document.getElementById("eliminar-perfil");
if (eliminarBtn) {
  eliminarBtn.addEventListener("click", async () => {
    const confirmar = confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.");
    if (!confirmar) return;

    try {
      const res = await fetch(`${SERVER_URL}/usuarios`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: usuario.usuario })

      });

      if (!res.ok) throw new Error("No se pudo eliminar el usuario");

      alert("Cuenta eliminada correctamente");
      localStorage.removeItem("usuarioActivo");
      window.location.href = "http://127.0.0.1:5500/Web_Project/index.html";

    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  });
}
