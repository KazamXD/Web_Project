const usuarios = [
  { usuario: "admin", password: "1234" },
  { usuario: "kevin", password: "cafe2025" }
];

document.querySelector(".form-login form").addEventListener("submit", e => {
  e.preventDefault();
  const user = e.target.querySelector('input[placeholder="Usuario*"]').value;
  const pass = e.target.querySelector('input[placeholder="Contraseña*"]').value;

  const valido = usuarios.find(u => u.usuario === user && u.password === pass);

  if (valido) {
    alert("Inicio de sesión exitoso");
    localStorage.setItem("usuarioActivo", user);
    window.location.href = "admin.html";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});
