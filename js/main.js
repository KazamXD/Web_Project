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

document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  alert("¡Gracias por contactarnos! Te responderemos pronto ☕");
  e.target.reset();
});
