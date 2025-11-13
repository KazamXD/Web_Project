// Validación de sesión
const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuario) {
  alert("Debes iniciar sesión primero");
  window.location.href = "login.html";
}
// Si el usuario es admin, enviarlo al panel admin
else if (usuario.rol === "admin") {
  window.location.href = "admin.html";
}
// Si no es cliente, bloquear
else if (usuario.rol !== "cliente") {
  alert("Acceso no autorizado");
  window.location.href = "index.html";
}
console.log("usuarioActivo:", usuario);

// URL de tu servidor Node
const SERVER_URL = "http://localhost:3000";

// Elementos del DOM

const perfil = document.getElementById("perfil-contenido");
const sinSesion = document.getElementById("sin-sesion");

const logoutBtn = document.getElementById("logout");
const eliminarBtn = document.getElementById("eliminar-perfil");

// Campos de perfil
const nombreInput = document.getElementById("nombre");
const correoInput = document.getElementById("correo");
const nombreText = document.getElementById("nombre-text");
const correoText = document.getElementById("correo-text");
const fechaText = document.getElementById("fecha");

const editBtn = document.querySelector("button:not(#logout):not(#eliminar-perfil)");
const saveBtn = document.getElementById("guardar-perfil");

const avatarImg = document.getElementById("avatar-img");
const avatarInput = document.getElementById("avatar-input");

// Si el usuario ya tiene avatar guardado, cargarlo
if (usuario.avatar) {
  avatarImg.src = usuario.avatar;
}

// Mostrar datos del usuario
if (usuario) {
  perfil.classList.remove("hidden");

  nombreText.textContent = usuario.nombre;
  correoText.textContent = usuario.correo;
  nombreInput.value = usuario.nombre;
  correoInput.value = usuario.correo;
  fechaText.textContent = "Octubre 2025";

  document.getElementById("usuario").textContent = usuario.usuario;
} else {
  sinSesion.classList.remove("hidden");
}

// ---- EDITAR PERFIL ----
editBtn.addEventListener("click", () => {
  // Mostrar inputs, ocultar textos
  nombreText.classList.add("hidden");
  correoText.classList.add("hidden");

  nombreInput.classList.remove("hidden");
  correoInput.classList.remove("hidden");

  editBtn.classList.add("hidden");
  saveBtn.classList.remove("hidden");
});

// ---- GUARDAR PERFIL ----
saveBtn.addEventListener("click", async () => {
  const dataActualizada = {
    ...usuario,
    nombre: nombreInput.value,
    correo: correoInput.value
  };

  // Evitar mandar avatar base64 en el PUT (causa 413)
  const { avatar, ...sinAvatar } = dataActualizada;

  try {
    const res = await fetch(`${SERVER_URL}/usuarios/${usuario.usuario}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sinAvatar)
  });

    if (!res.ok) {
      const text = await res.text(); // ver mensaje real
      throw new Error(text || "No se pudo actualizar el perfil");
    }

    // Guardar localmente con avatar intacto
    localStorage.setItem("usuarioActivo", JSON.stringify(dataActualizada));

    alert("Perfil actualizado");
    location.reload();

  } catch (err) {
    console.error("ERROR PUT /usuarios:", err);
    alert("Error al actualizar: " + err.message);
  }
});


// ---- CAMBIAR AVATAR ----
avatarInput.addEventListener("change", () => {
  const file = avatarInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    avatarImg.src = reader.result; // vista previa inmediata

    // Guardar avatar en localStorage
    const actualizado = { ...usuario, avatar: reader.result };
    localStorage.setItem("usuarioActivo", JSON.stringify(actualizado));

    alert("Avatar actualizado ✅");
  };

  reader.readAsDataURL(file); // convierte a base64
});

// ---- CERRAR SESIÓN ----
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "index.html";
});

// ---- ELIMINAR CUENTA ----
eliminarBtn.addEventListener("click", async () => {
  const confirmar = confirm("¿Seguro quieres eliminar tu cuenta?");

  if (!confirmar) return;

  try {
    const res = await fetch(`${SERVER_URL}/usuarios`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario: usuario.usuario })
    });

    if (!res.ok) throw new Error("No se pudo eliminar el usuario");

    alert("Cuenta eliminada");
    localStorage.removeItem("usuarioActivo");
    window.location.href = "index.html";

  } catch (err) {
    console.error(err);
    alert("Error al eliminar");
  }
});
