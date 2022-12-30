let productosEnCarrito = (localStorage.getItem("productos-en-carrito"));
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.getElementById("carrito-vacio");
const contenedorCarritoProductos = document.getElementById("carrito-productos");
const contenedorCarritoAcciones = document.getElementById("carrito-acciones");
const contenedorCarritoComprado = document.getElementById("carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.getElementById("carrito-acciones-vaciar");
const botonComprar = document.getElementById("carrito-acciones-comprar");
const contenedorTotal = document.getElementById("total");

function cargarProductosCarrito() {
    {
        if (productosEnCarrito && productosEnCarrito.length > 0) {

            contenedorCarritoVacio.classList.add("disabled");
            contenedorCarritoProductos.classList.remove("disabled");
            contenedorCarritoAcciones.classList.remove("disabled");
            contenedorCarritoComprado.classList.add("disabled");
        
            contenedorCarritoProductos.innerHTML = "";
        
            productosEnCarrito.forEach(producto => {
                const div = document.createElement("div");
                div.classList.add("carrito-producto");
                div.innerHTML = `<img class="carrito-producto-imagen" src="./${producto.url}" alt="${producto.nombre}">
                                <div class="carrito-producto-titulo">
                                    <small>Titulo</small>
                                    <h3>${producto.nombre}</h3>
                                </div>
                                <div class="carrito-producto-cantidad">
                                    <small>Cantidad</small>
                                    <p>${producto.cantidad}</p>
                                </div>
                                <div class="carrito-producto-precio">
                                    <small>Precio</small>
                                    <p>$ ${producto.precio}</p>
                                </div>
                                <div class="carrito-producto-subtotal">
                                    <small>Subtotal</small>
                                    <p>$ ${producto.precio * producto.cantidad}</p>
                                </div>
                                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="fa-solid fa-trash"></i></button>`;
                contenedorCarritoProductos.append(div);
            })
            
        
            
        
        } else {
            contenedorCarritoVacio.classList.remove("disabled");
            contenedorCarritoProductos.classList.add("disabled");
            contenedorCarritoAcciones.classList.add("disabled");
            contenedorCarritoComprado.classList.add("disabled");
        }
    }

    actualizarBotonesEliminar();
    actualizarTotal();
    actualizarNumerito();
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
};


function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === parseInt(idBoton));
    console.log(index);
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}


botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    contenedorTotal.innerText = `$ ${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");  
    
    actualizarNumerito();
}

// FUNCION ACTUALIZAR NUMERO DE CARRITO

function actualizarNumerito() {
    let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumero;
}