let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarCarrito() {
    const tabla = document.getElementById("tabla-carrito");
    let html = `
        <tr class="bg-gray-200">
            <th class="p-3">Producto</th>
            <th class="p-3">Precio</th>
            <th class="p-3">Cantidad</th>
            <th class="p-3">Subtotal</th>
            <th class="p-3">Acción</th>
        </tr>
    `;

    carrito.forEach((p,i) => {
        html += `
        <tr class="border-b">
            <td class="p-3">${p.nombre}</td>
            <td class="p-3">₡${p.precio}</td>
            <td class="p-3">${p.cantidad}</td>
            <td class="p-3">₡${p.precio * p.cantidad}</td>
            <td class="p-3">
                <button onclick="eliminar(${i})" class="bg-red-500 text-white px-2 py-1 rounded">X</button>
            </td>
        </tr>`;
    });

    tabla.innerHTML = html;
    document.getElementById("total").textContent =
      carrito.reduce((sum,p) => sum + p.precio * p.cantidad, 0);
}

function eliminar(i) {
    carrito.splice(i,1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

document.getElementById("vaciar").addEventListener("click", () => {
    localStorage.removeItem("carrito");
    carrito = [];
    mostrarCarrito();
});

mostrarCarrito();
