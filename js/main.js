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
document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  alert("¡Gracias por contactarnos! Te responderemos pronto ☕");
  e.target.reset();
});

// Rotador automático de imágenes tipo slider
function rotateImages() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    let current = 0;

    setInterval(() => {
    slides[current].classList.remove('opacity-100', 'active');
    slides[current].classList.add('opacity-0');

    current = (current + 1) % slides.length;

    slides[current].classList.remove('opacity-0');
    slides[current].classList.add('opacity-100', 'active');
    }, 2500); // esto cambia la imagen cada 2,5 segundos, tipo el pirata jkanime


}

rotateImages();