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

// FUNCION PARA ACTAULIZAR BOTONES DEL CARRITO

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", () => {
            Swal.fire ({
                title: "¿Estás seguro de eliminar?",
                icon: "warning",
                confirmButtonText: "Aceptar",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if(result.isConfirmed) {
                    eliminarDelCarrito();
                }
            })
        })
        // boton.addEventListener("click", eliminarDelCarrito)
    });
};


// FUNCION PARA ELIMINAR PRODUCTOS DEL CARRITO

function eliminarDelCarrito(e) {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === parseInt(idBoton));
    console.log(index);
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}


// FUNCION PARA VACIAR TODO EL CARRITO

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
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