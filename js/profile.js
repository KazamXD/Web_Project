// Leer el usuario activo del localStorage
    const usuario = localStorage.getItem("usuarioActivo");

    const perfil = document.getElementById("perfil-contenido");
    const sinSesion = document.getElementById("sin-sesion");

    if (usuario) {
      // Mostrar el perfil
      perfil.classList.remove("hidden");
      document.getElementById("nombre").textContent = usuario.charAt(0).toUpperCase() + usuario.slice(1);
      document.getElementById("usuario").textContent = usuario;
      document.getElementById("correo").textContent = usuario + "@example.com";
      document.getElementById("fecha").textContent = "Octubre 2025";
    } else {
      // Si no hay sesión activa
      sinSesion.classList.remove("hidden");
    }

    // Cerrar sesión
    const logoutBtn = document.getElementById("logout");
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("usuarioActivo");
      window.location.href = "index.html";
    });