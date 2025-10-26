// Cargar el menú de productos desde un archivo JSON -----> products.json
async function cargarMenu() {
    try {
        const respuesta = await fetch('data/products.json');
        const productos = await respuesta.json();

        const contenedor = document.getElementById('menu-container');

        productos.forEach(p => {
            const card = document.createElement('div');
            card.classList.add('producto');
            card.innerHTML = `
                <img src="${p.imagen}" alt="${p.nombre}">
                <h3>${p.nombre}</h3>
                <p>₡${p.precio}</p>
                <button>Agregar</button>
            `;
            contenedor.appendChild(card);
        });

    } catch (error) {
        console.error("Error al cargar el menú:", error);
    }
}

cargarMenu();

// Manejo del formulario de contacto
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("¡Gracias por contactarnos! Te responderemos pronto ☕");
    e.target.reset();
  });
}

// Rotador automático de imágenes tipo slider
function rotateImages() {


  const slides = document.querySelectorAll('.slide');
  if (slides.length === 0) return;

  let current = 0;

  setInterval(() => {
    slides[current].classList.remove('active');

    current = (current + 1) % slides.length;

    slides[current].classList.add('active');
  }, 4000);
}

rotateImages();

// Boton de perfil de usuario, cambia de registrarse/entrar a nombre de usuario si hay usuario activo
const userLink = document.getElementById("user-link");
const usuario = localStorage.getItem("usuarioActivo");

if (userLink) {
  if (usuario) {
    userLink.textContent = "Perfil";
    userLink.href = "profile.html";
  } else {
    userLink.textContent = "Registrarse/Entrar";
    userLink.href = "login.html";
  }
}