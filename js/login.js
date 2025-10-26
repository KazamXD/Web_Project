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
  labelRegistro.classList.add("text-[#4e342e]");
  labelLogin.classList.add("text-[#4e342e]/70");
});

labelLogin.addEventListener("click", () => {
  formLogin.classList.remove("hidden");
  formRegistro.classList.add("hidden"); 
  labelLogin.classList.add("text-[#4e342e]");
  labelRegistro.classList.add("text-[#4e342e]/70");
});

// Manejo del formulario de login
const loginForm = document.querySelector(".form-login form");
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const user = e.target.querySelector('input[placeholder="Usuario*"]').value;
    const pass = e.target.querySelector('input[placeholder="Contraseña*"]').value;

  if (login(user, pass)) {
    alert("Inicio de sesión exitoso");
    window.location.href = "index.html";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
  });
}

// Manejo del formulario de registro (funcional con localStorage)
const registroForm = document.querySelector(".form-registro form");
if (registroForm) {
  registroForm.addEventListener("submit", e => {
    e.preventDefault();

    const inputs = e.target.querySelectorAll("input");
    const nuevoUsuario = {
      nombre: inputs[0].value,
      apellido: inputs[1].value,
      correo: inputs[2].value,
      usuario: inputs[3].value,
      password: inputs[4].value
    };

    // Llamar a la función que guarda
    const exito = registrarUsuario(nuevoUsuario);

    if (exito) {
      alert("Registro exitoso, bienvenido " + nuevoUsuario.usuario);
      localStorage.setItem("usuarioActivo", nuevoUsuario.usuario);
      e.target.reset();
      window.location.href = "index.html";
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

// Al iniciar sesión
function login(user, pass) {
  const usuarios = JSON.parse(localStorage.getItem("user")) || [];
  const valido = usuarios.find(u => u.usuario === user && u.password === pass);

  if (valido) {
    localStorage.setItem("usuarioActivo", user);
    return true;
  } else {
    return false;
  }
}
