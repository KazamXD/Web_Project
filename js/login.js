// Usuarios simulados
const usuarios = [
  { usuario: "admin", password: "1234" },
  { usuario: "kevin", password: "cafe2025" }
];

// Alternar entre registro y login
const formRegistro = document.getElementById("formRegistro");
const formLogin = document.getElementById("formLogin");
const labelRegistro = document.getElementById("label-registro");
const labelLogin = document.getElementById("label-login");

labelRegistro.addEventListener("click", () => {
  formRegistro.classList.remove("hidden");
  formLogin.classList.add("hidden");
  labelRegistro.classList.remove("text-[#4e342e]/70");
  labelLogin.classList.remove("text-[#4e342e]");
  labelRegistro.classList.add("text-[#4e342e]");
  labelLogin.classList.add("text-[#4e342e]/70");
});

labelLogin.addEventListener("click", () => {
  formLogin.classList.remove("hidden");
  formRegistro.classList.add("hidden");
  labelLogin.classList.remove("text-[#4e342e]/70");
  labelRegistro.classList.remove("text-[#4e342e]");
  labelLogin.classList.add("text-[#4e342e]");
  labelRegistro.classList.add("text-[#4e342e]/70");
});

// Manejo del formulario de registro (funcional con localStorage)
const registroForm = document.querySelector(".form-registro form");
if (registroForm) {
  registroForm.addEventListener("submit", async e => {
    e.preventDefault();

    const inputs = e.target.querySelectorAll("input");
    const nuevoUsuario = {
      nombre: inputs[0].value,
      apellido: inputs[1].value,
      correo: inputs[2].value,
      usuario: inputs[3].value,
      password: inputs[4].value
    };

    try {
      const res = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario)
      });

      if (!res.ok) throw new Error("El usuario ya existe o hubo un error");
      const data = await res.json();
      alert(data.mensaje);

      localStorage.setItem("usuarioActivo", nuevoUsuario.usuario);
      e.target.reset();
      window.location.href = "http://127.0.0.1:5500/Web_Project/index.html";
    } catch (err) {
      alert(err.message);
    }
  });
}
//probar guardar usuarios
// Al registrar un nuevo usuario
function registrarUsuario(nuevoUsuario) {
  // Traer la lista de usuarios existente o crear una vacía
  const usuarios = JSON.parse(localStorage.getItem("user")) || [];

  // Chequear si el usuario ya existe
  const existe = usuarios.some(u => u.usuario === nuevoUsuario.usuario);
  if (existe) {
    alert("El usuario ya existe");
    return false;
  }

  // Agregar usuario nuevo y guardar
  usuarios.push(nuevoUsuario);
  localStorage.setItem("user", JSON.stringify(usuarios));
  return true;
}


// La parte del login ----> si es admin redirige a admin.html
const loginForm = document.querySelector(".form-login form");

if (loginForm) {
  loginForm.addEventListener("submit", async e => {
    e.preventDefault();
    const user = e.target.querySelector('input[placeholder="Usuario*"]').value.trim();
    const pass = e.target.querySelector('input[placeholder="Contraseña*"]').value.trim();
    try {
      const res = await fetch("http://localhost:3000/usuarios");
      const usuarios = await res.json();

      // Buscar si el usuario existe y la contraseña coincide
      const valido = usuarios.find(u => u.usuario === user && u.password === pass);

      if (valido) {
        localStorage.setItem("usuarioActivo", JSON.stringify(valido));

        alert("Inicio de sesión exitoso");

        if (valido.rol === "admin") {
          window.location.href = "admin.html";
        } else {
          window.location.href = "profile.html";
        }

      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      alert("Error al conectarse al servidor");
      console.error(err);
    }
  });
}


