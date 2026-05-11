const API_URL = "/api/productos";

const productoForm = document.getElementById("producto-form");
const editForm = document.getElementById("edit-form");
const productosContainer = document.getElementById("productos-container");
const mensajeElemento = document.getElementById("mensaje");
const recargarBtn = document.getElementById("recargar-btn");
const editModal = document.getElementById("edit-modal");
const cerrarModalBtn = document.getElementById("cerrar-modal");
const cancelarEdicionBtn = document.getElementById("cancelar-edicion");

let productoEnEdicionId = null;
let timeoutMensaje = null;

const ESTADOS_VALIDOS = ["Disponible", "Agotado", "Descontinuado"];

const obtenerPayloadDesdeFormulario = (formulario) => {
  const payload = {
    nombre: formulario.nombre.value.trim(),
    descripcion: formulario.descripcion.value.trim(),
    precio: Number(formulario.precio.value),
    categoria: formulario.categoria.value.trim(),
    stock: Number(formulario.stock.value),
    estado: formulario.estado.value
  };

  if (!ESTADOS_VALIDOS.includes(payload.estado)) {
    throw new Error("Estado invalido");
  }

  if (Number.isNaN(payload.precio) || payload.precio < 0) {
    throw new Error("El precio debe ser mayor o igual a 0");
  }

  if (!Number.isInteger(payload.stock) || payload.stock < 0) {
    throw new Error("El stock debe ser un numero entero mayor o igual a 0");
  }

  return payload;
};

const mostrarMensaje = (mensaje, tipo = "success") => {
  mensajeElemento.textContent = mensaje;
  mensajeElemento.className = `mensaje visible ${tipo}`;

  clearTimeout(timeoutMensaje);
  timeoutMensaje = setTimeout(() => {
    mensajeElemento.className = "mensaje";
    mensajeElemento.textContent = "";
  }, 3500);
};

const limpiarFormulario = () => {
  productoForm.reset();
  productoForm.estado.value = "Disponible";
};

const abrirModal = () => {
  editModal.classList.remove("hidden");
};

const cerrarModal = () => {
  editModal.classList.add("hidden");
  productoEnEdicionId = null;
  editForm.reset();
};

const renderizarProductos = (productos) => {
  if (!Array.isArray(productos) || productos.length === 0) {
    productosContainer.innerHTML = `
      <article class="empty-state">
        <h3>No hay productos registrados</h3>
        <p>Agrega un producto desde el formulario para comenzar.</p>
      </article>
    `;
    return;
  }

  productosContainer.innerHTML = productos
    .map((producto) => {
      const estadoClass = producto.estado.toLowerCase();
      const creado = producto.createdAt
        ? new Date(producto.createdAt).toLocaleString("es-CO")
        : "N/D";
      const actualizado = producto.updatedAt
        ? new Date(producto.updatedAt).toLocaleString("es-CO")
        : "N/D";

      return `
        <article class="product-card">
          <h3>${producto.nombre}</h3>
          <p class="product-meta">${producto.descripcion}</p>
          <p class="product-meta"><strong>Categoria:</strong> ${producto.categoria}</p>
          <p class="product-meta"><strong>Precio:</strong> $${Number(producto.precio).toFixed(2)}</p>
          <p class="product-meta"><strong>Stock:</strong> ${producto.stock}</p>
          <p class="product-meta"><strong>Creado:</strong> ${creado}</p>
          <p class="product-meta"><strong>Actualizado:</strong> ${actualizado}</p>
          <span class="estado ${estadoClass}">${producto.estado}</span>
          <div class="card-actions">
            <button class="btn btn-edit" data-action="edit" data-id="${producto._id}" type="button">Editar</button>
            <button class="btn btn-delete" data-action="delete" data-id="${producto._id}" type="button">Eliminar</button>
          </div>
        </article>
      `;
    })
    .join("");
};

const obtenerProductos = async () => {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "No fue posible obtener los productos");
    }

    renderizarProductos(result.data);
  } catch (error) {
    renderizarProductos([]);
    mostrarMensaje(error.message, "error");
  }
};

const crearProducto = async () => {
  try {
    const payload = obtenerPayloadDesdeFormulario(productoForm);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "No fue posible crear el producto");
    }

    mostrarMensaje(result.message || "Producto creado correctamente", "success");
    limpiarFormulario();
    await obtenerProductos();
  } catch (error) {
    mostrarMensaje(error.message, "error");
  }
};

const editarProducto = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "No fue posible obtener el producto");
    }

    const producto = result.data;
    productoEnEdicionId = producto._id;

    editForm.nombre.value = producto.nombre;
    editForm.descripcion.value = producto.descripcion;
    editForm.precio.value = producto.precio;
    editForm.categoria.value = producto.categoria;
    editForm.stock.value = producto.stock;
    editForm.estado.value = producto.estado;

    abrirModal();
  } catch (error) {
    mostrarMensaje(error.message, "error");
  }
};

const actualizarProducto = async (id) => {
  try {
    const payload = obtenerPayloadDesdeFormulario(editForm);

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "No fue posible actualizar el producto");
    }

    mostrarMensaje(result.message || "Producto actualizado correctamente", "success");
    cerrarModal();
    await obtenerProductos();
  } catch (error) {
    mostrarMensaje(error.message, "error");
  }
};

const eliminarProducto = async (id) => {
  const confirmar = window.confirm("Deseas eliminar este producto?");
  if (!confirmar) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "No fue posible eliminar el producto");
    }

    mostrarMensaje(result.message || "Producto eliminado correctamente", "success");
    await obtenerProductos();
  } catch (error) {
    mostrarMensaje(error.message, "error");
  }
};

productoForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await crearProducto();
});

editForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!productoEnEdicionId) {
    mostrarMensaje("No hay producto seleccionado para editar", "error");
    return;
  }

  await actualizarProducto(productoEnEdicionId);
});

productosContainer.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const { action, id } = button.dataset;

  if (action === "edit") {
    await editarProducto(id);
    return;
  }

  if (action === "delete") {
    await eliminarProducto(id);
  }
});

recargarBtn.addEventListener("click", async () => {
  await obtenerProductos();
});

cerrarModalBtn.addEventListener("click", cerrarModal);
cancelarEdicionBtn.addEventListener("click", cerrarModal);

editModal.addEventListener("click", (event) => {
  if (event.target === editModal) {
    cerrarModal();
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  await obtenerProductos();
});

window.editarProducto = editarProducto;
window.actualizarProducto = actualizarProducto;
window.eliminarProducto = eliminarProducto;
window.obtenerProductos = obtenerProductos;
window.crearProducto = crearProducto;
window.limpiarFormulario = limpiarFormulario;
window.mostrarMensaje = mostrarMensaje;
window.renderizarProductos = renderizarProductos;

