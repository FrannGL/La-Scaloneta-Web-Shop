// DECLARACION DE VARIABLES Y LLAMADO DE PRODUCTOS DESDE EL LOCALSTORAGE

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

// FUNCION PARA TRAER EL ARRAY DE PRODUCTOS DESDE EL LOCALSTORAGE Y MOSTRARLOS EN EL DOM

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
                div.innerHTML = `<img class="carrito-producto-imagen" src="../${producto.url}" alt="${producto.nombre}">
                                <div class="carrito-producto-titulo">
                                    <small>Titulo</small>
                                    <h3>${producto.nombre}</h3>
                                </div>
                                <div>
                                    <small>Cantidad</small>
                                    <div class="carrito-producto-cantidad">
                                        <p id="cantidad">${producto.cantidad}</p>
                                        <div class="carrito-producto-operacion">
                                            <button id="sumarProducto-${producto.id}"><i class="fa-solid fa-plus"></i></button>
                                            <button id="restarProducto-${producto.id}"><i class="fa-solid fa-minus "></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="carrito-producto-precio">
                                    <small>Precio</small>
                                    <p id="precio">${producto.precio}</p>
                                </div>
                                <div class="carrito-producto-subtotal">
                                    <small>Subtotal</small>
                                    <p id="subtotal">${producto.precio * producto.cantidad}</p>
                                </div>
                                <button class="carrito-producto-eliminar" onClick="eliminarDelCarrito(${producto.id})"><i class="fa-solid fa-trash"></i></button>`;
                contenedorCarritoProductos.append(div);
                const botonSuma = document.getElementById(`sumarProducto-${producto.id}`);
                const botonResta = document.getElementById(`restarProducto-${producto.id}`);
                botonSuma.addEventListener("click", () => {
                    aumentarCantidad(producto.id,cantidad)
                });
            })
            
        
            
        
        } else {
            contenedorCarritoVacio.classList.remove("disabled");
            contenedorCarritoProductos.classList.add("disabled");
            contenedorCarritoAcciones.classList.add("disabled");
            contenedorCarritoComprado.classList.add("disabled");
        }
    }
    actualizarTotal();
    actualizarNumerito();
}

cargarProductosCarrito();

// FUNCION PARA ELIMINAR PRODUCTOS DEL CARRITO

function eliminarDelCarrito(id) {
    Swal.fire({
        title: "¿Estás seguro de eliminar el producto?",
        icon: "info",
        width: 350,
        confirmTextButton: "Aceptar",
        confirmButtonColor: "#0088b6",
        showCancelButton: "Cancelar",
        CancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            const producto = productosEnCarrito.find((producto) => producto.id === id);
            productosEnCarrito.splice(productosEnCarrito.indexOf(producto), 1);
            cargarProductosCarrito();
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        }
    })
}

// FUNCION PARA VACIAR TODO EL CARRITO

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    Swal.fire({
        title: "¿Estás seguro de vaciar el Carrito?",
        icon: "error",
        width: 350,
        confirmTextButton: "Aceptar",
        confirmButtonColor: "#0088b6",
        showCancelButton: "Cancelar",
        CancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
    })
}


// FUNCION PARA ACTUALIZAR EL TOTAL DE LA COMPRA

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    contenedorTotal.innerText = `$ ${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);


// FUNCION QUE SE EJECUTA AL HACER CLICK EN COMPRAR

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


// FUNCION SUMAR-RESTAR CANTIDADES DEL CARRITO

let productoCantidad = document.getElementById("cantidad");
let productoPrecio = document.getElementById("precio");

const aumentarCantidad = (id, productoCantidad) => {
    const productoEnCarrito = productosEnCarrito.find((producto) => producto.id === id);
    let total = document.getElementById("subtotal").innerHTML;
    let productoTotal = document.getElementById("subtotal");
    productoEnCarrito.cantidad++;
    productoCantidad.innerHTML = productoEnCarrito.cantidad;
    productoTotal.innerHTML = total;
    actualizarTotal();
    console.log(productosEnCarrito);
};


const disminuirCantidad = () => {

    let precio = document.getElementById("precio").innerHTML;
    let total = document.getElementById("subtotal").innerHTML;

    if (productoCantidad <= 1) {
        const producto = productosEnCarrito.find((producto) => producto.id === id);
        productosEnCarrito.splice(productosEnCarrito.indexOf(producto), 1);
        cargarProductosCarrito();
        localStorage.setItem("productos-en-carrito", JSON.stringi(productosEnCarrito));
    } else {
        contador--;
        total = precio * contador;
        productoCantidad.innerHTML = contador;
        productoTotal.innerHTML = total;
    }
}


