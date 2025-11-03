const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
const SERVER_URL = "http://localhost:3000";

// Si no hay usuario guardado, redirigir al login
if (!usuario) {
  alert("Debes iniciar sesión primero");
  window.location.href = "login.html";
} 
// Si el usuario existe pero no es admin se manda a profile para que compre después
else if (usuario.rol !== "admin") {
  alert("Acceso no autorizado");
  window.location.href = "profile.html";
} 
// Si es admin se deja acceder
else {
  console.log("Bienvenido al panel de administración, " + usuario.usuario);
}


// Función para cargar estadísticas del dashboard
async function cargarDashboard() {
  try {
    const res = await fetch("http://localhost:3000/estadisticas");
    const data = await res.json();

    // Mostrar totales
    document.getElementById("clientes-total").textContent = data.clientes.total;
    document.getElementById("clientes-promedio").textContent = data.clientes.promedioPorDia;
    document.getElementById("cliente-frecuente").textContent = data.clientes.masFrecuente;

    // Mostrar ingresos por producto
    const lista = document.getElementById("lista-ventas");
    data.ventas.forEach(v => {
      const li = document.createElement("li");
      li.textContent = `${v.producto}: ₡${v.ingresos}`;
      lista.appendChild(li);
    });
  } catch (err) {
    console.error("Error cargando estadísticas:", err);
  }
}

cargarDashboard();


// Función para cerrar sesión
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "index.html";
});

//Cargar lista de usuarios
async function cargarUsuarios() {
  try {
    const res = await fetch(`${SERVER_URL}/usuarios`);
    const usuarios = await res.json();

    const tbody = document.querySelector("#tablaUsuarios tbody");
    tbody.innerHTML = "";

    usuarios.forEach(u => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${u.usuario}</td>
        <td>${u.nombre ?? "-"}</td>
        <td>${u.apellido ?? "-"}</td>
        <td>${u.correo ?? "-"}</td>
        <td>${u.rol}</td>
        <td>
          <button onclick="location.href='updateUser.html?usuario=${u.usuario}'">Editar</button>
          <button onclick="eliminarUsuario('${u.usuario}')">Eliminar</button>
        </td>
      `;

      tbody.appendChild(row);
    });

  } catch (err) {
    console.error("Error cargando usuarios:", err);
  }
}

cargarUsuarios();

// Función para eliminar usuario
async function eliminarUsuario(usuario) {
  const confirmar = confirm(`¿Eliminar usuario ${usuario}?`);

  if (!confirmar) return;

  try {
    const res = await fetch(`${SERVER_URL}/usuarios`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario })
    });

    if (!res.ok) throw new Error("Error eliminando usuario");

    alert("Usuario eliminado");
    cargarUsuarios();

  } catch (err) {
    console.error(err);
    alert("No se pudo eliminar el usuario");
  }
}

