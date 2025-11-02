// Cargar el menú de productos desde un archivo JSON -----> products.json
async function cargarMenu() {
    let productos = JSON.parse(localStorage.getItem("productos"));

    // Si no hay productos en localStorage, cargar el JSON
    if (!productos) {
        const respuesta = await fetch("data/products.json");
        productos = await respuesta.json();

        // Guardarlos en localStorage para mantener sincronía
        localStorage.setItem("productos", JSON.stringify(productos));
    }

    const contenedor = document.getElementById('menu-container');
    contenedor.innerHTML = "";

    productos.forEach((p, index) => {
        const card = document.createElement('div');
        card.classList.add('producto');
        card.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>₡${p.precio}</p>
            <button class="agregar-btn" data-index="${index}">Agregar</button>  
        `;
        contenedor.appendChild(card);
    });

    // evento para botón agregar
    document.addEventListener("click", function(e) {
      if (e.target.classList.contains("agregar-btn")) {
          const index = e.target.dataset.index;
          agregarAlCarrito(productos[index]);
      }
});
}

cargarMenu();

// Manejo del formulario de contacto
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("¡Gracias por contactarnos! Te responderemos pronto");
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

//Contador del carrito en el icono
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalItems = carrito.reduce((sum, p) => sum + p.cantidad, 0);
    const countEl = document.getElementById("cart-count");
    if (countEl) countEl.textContent = totalItems;
}
actualizarContadorCarrito();

//Agregar al carrito
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Buscar si ya existe para sumar cantidad
    const existe = carrito.find(p => p.nombre === producto.nombre);
    if (existe) {
        existe.cantidad++;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
    alert(`${producto.nombre} agregado al carrito`);
}