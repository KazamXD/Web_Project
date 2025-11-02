// Inicializar productos desde JSON si no existen en localStorage
async function inicializarProductos() {
  if (!localStorage.getItem("productos")) {
    const res = await fetch("data/products.json");
    const data = await res.json();
    localStorage.setItem("productos", JSON.stringify(data));
  }
}
inicializarProductos();

// Obtener productos
let productos = JSON.parse(localStorage.getItem("productos")) || [];

// Cargar productos en tabla
function cargarProductos() {
  productos = JSON.parse(localStorage.getItem("productos")) || [];
  const tabla = document.getElementById("tabla-productos");
  tabla.innerHTML = "";

  productos.forEach((p, index) => {
    const fila = `
      <tr class="border-b">
        <td class="p-3">${p.nombre}</td>
        <td class="p-3">₡${p.precio}</td>
        <td class="p-3">
          <img src="${p.imagen}" class="w-16 h-16 object-cover rounded border">
        </td>
        <td class="p-3 flex gap-2">
          <button onclick="editarProducto(${index})"
            class="bg-blue-500 hover:bg-blue-400 text-white px-2 py-1 rounded">Editar</button>

          <button onclick="eliminarProducto(${index})"
            class="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
        </td>
      </tr>
    `;
    tabla.innerHTML += fila;
  });
}

cargarProductos();

// Guardar producto
document.getElementById("formProducto").addEventListener("submit", (e) => {
  e.preventDefault();

  const id = document.getElementById("idProducto").value;
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const imagen = document.getElementById("imagen").value;

  if (!nombre || !precio) {
    return alert("Complete todos los campos obligatorios");
  }

  const producto = { nombre, precio, imagen };

  if (id !== "") {
    productos[id] = producto;
    alert("Producto actualizado");
  } else {
    productos.push(producto);
    alert("Producto guardado");
  }

  localStorage.setItem("productos", JSON.stringify(productos));
  cargarProductos();
  document.getElementById("formProducto").reset();
  document.getElementById("idProducto").value = "";
});

// Editar
function editarProducto(i) {
  const p = productos[i];
  document.getElementById("idProducto").value = i;
  document.getElementById("nombre").value = p.nombre;
  document.getElementById("precio").value = p.precio;
  document.getElementById("imagen").value = p.imagen;
}

// Eliminar
function eliminarProducto(i) {
  if (!confirm("¿Seguro que quieres eliminar este producto?")) return;

  productos.splice(i, 1);
  localStorage.setItem("productos", JSON.stringify(productos));
  cargarProductos();
  alert("Producto eliminado");
}

window.editarProducto = editarProducto;
window.eliminarProducto = eliminarProducto;
