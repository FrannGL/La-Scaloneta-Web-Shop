// CLASE DE PRODUCTOS

class Productos {
    constructor (id, nombre, precio, url, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.url = url;
        this.categoria = categoria;
        // this.cantidad = 1;
    }
}

// DECLARACION DE PRODUCTOS

const producto1 = new Productos (1, "Camiseta Titular", 12000, "./images/camiseta-titular.jpg", "Camisetas");
const producto2 = new Productos (2, "Camiseta Suplente", 10000, "./images/camiseta-suplente.jpg", "Camisetas");
const producto3 = new Productos (3, "Short Titular Blanco", 8000, "./images/shot-titular.jpg", "Pantalones");
const producto4 = new Productos (4, "Short Titular Negro", 7000, "./images/short-titular2.png", "Pantalones")
const producto5 = new Productos (5, "Short Suplente", 7000, "./images/short-suplente.jpg", "Pantalones");
const producto6 = new Productos (6, "Camiseta Pre-Match (1)", 8500, "./images/camiseta-prepartido.jpg", "Camisetas");
const producto7 = new Productos (7, "Camiseta Pre-Match (2)", 8000, "./images/camiseta-prepartido2.jpg", "Camisetas");
const producto8 = new Productos (8, "Camiseta Pre-Match (3)", 8000, "./images/camiseta-prepartido3.jpg", "Camisetas");
const producto9 = new Productos (9, "Botines X Leyenda", 75000, "./images/accesorios-botines1.jpg", "Accesorios");
const producto10 = new Productos (10, "Botines X Speedportal", 50000, "./images/accesorios-botines2.jpg", "Accesorios");
const producto11 = new Productos (11, "Botines Predator", 30000, "./images/accesorios-botines3.jpg", "Accesorios");
const producto12 = new Productos (12, "Botines Predator 3", 30000, "./images/accesorios-botines4.jpg", "Accesorios");
const producto13 = new Productos (13, "Campera Anthem", 35000, "./images/accesorios-campera.jpg", "Accesorios");
const producto14 = new Productos (14, "Medias Suplentes 1", 5000, "./images/accesorios-medias-suplente.jpg", "Accesorios");
const producto15 = new Productos (15, "Medias Suplentes 2", 5000, "./images/accesorios-medias-suplente2.jpg", "Accesorios");
const producto16 = new Productos (16, "Medias Titulares", 7000, "./images/accesorios-medias-titular.jpg", "Accesorios");
const producto17 = new Productos (17, "Pelota Al Rihla", 50000, "./images/accesorios-pelota.jpg", "Accesorios")
const producto18 = new Productos (18, "Camiseta Campeon 2022", 20000, "./images/camiseta-argentina-campeon.jpg", "Camisetas");
const producto19 = new Productos (19, "Pelota Argentina", 25000, "./images/accesorios-pelota2.jpg", "Accesorios");
const producto20 = new Productos (20, "Camiseta Arquero Suplente", 12000, "./images/camiseta-arquero-suplente.jpg", "Camisetas");
const producto21 = new Productos (21, "Camiseta Arquero Titular", 15000, "./images/camiseta-arquero-titular.jpg", "Camisetas");
const producto22 = new Productos (22, "Chomba Cuerpo Técnico", 10000, "./images/camiseta-chomba-dt.jpg", "Camisetas");
const producto23 = new Productos (23, "Camiseta Entrenamiento", 8000, "./images/camiseta-entrenamiento.jpg", "Camisetas");
const producto24 = new Productos (24, "Camiseta de Viaje", 8000, "./images/camiseta-viaje.jpg", "Camisetas");
const producto25 = new Productos (25, "Pantalon Entrenamiento", 12000, "./images/pantalon-entrenamiento.jpg", "Pantalones");
const producto26 = new Productos (26, "Pantalon de Viaje", 10000, "./images/pantalon-viaje.jpg", "Pantalones");
const producto27 = new Productos (27, "Camiseta Argentina 2021", 15000, "./images/camiseta-argentina-2021.jpg", "Camisetas");


// ARRAY DE PRODUCTOS

const productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12, producto13, producto14, producto15, producto16, producto17, producto18, producto19, producto20, producto21, producto22, producto23, producto24, producto25, producto26, producto27];


// DECLARACION DE VARIABLES

const coleccion = document.getElementById("coleccion");
const botonCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
const containerCarrito = document.getElementById("containerCarrito");
const verCarrito = document.getElementById("verCarrito");
const vaciarCarrito = document.getElementById("vaciarCarrito");
const total = document.getElementById("total");
let agregarProducto = document.querySelectorAll(".agregarProducto");
const numerito = document.getElementById("numerito");


// FUNCION MOSTRAR PRODUCTOS

const mostrarProductos = (todosLosProductos) => {
    coleccion.innerHTML = "";
    todosLosProductos.forEach( producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-2", "col-xs-12");
        card.innerHTML = `<div class="card">
                            <img src="${producto.url}" class="card-img-top imgProductos" alt="${producto.nombre}">
                            <div class="card-body">
                                <h5 class="text-center">${producto.nombre}</h5>
                                <p class="text-center">$ ${producto.precio}</p>
                                <button class="btn btn-primary ms-5 agregarProducto" id="${producto.id}">Agregar al Carrito</button>
                            </div>
                        </div>`
        coleccion.appendChild(card);
        actualizarBotonesAgregar();
    })
}

mostrarProductos(productos);


// FUNCION PARA FILTRAR POR CATEGORIA

botonCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        if(e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria;
            const productosSeleccionados = productos.filter(producto => producto.categoria === e.currentTarget.id);
        mostrarProductos(productosSeleccionados);
        } else {
            tituloPrincipal.innerText = "Nuestros Productos";
            mostrarProductos(productos);
        }
        
    })
})

// FUNCION BUSCADOR DE PRODUCTOS

const botonBusqueda = document.getElementById("buscador__icono");
const buscador = document.getElementById("buscador__input");
const resultadoBusqueda = document.getElementById("buscador__resultado")

botonBusqueda.addEventListener("click", () => {
    buscador.classList.toggle("ocultar");
    buscador.addEventListener("keyup", (e) => {
        let texto = e.target.value;
        let busqueda = productos.filter(producto => producto.nombre === texto);
        mostrarProductos(busqueda);
    })
});


// FUNCION PARA ACTUALIZAR BOTONES AGREGAR

function actualizarBotonesAgregar() {
    agregarProducto = document.querySelectorAll(".agregarProducto");
    agregarProducto.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
        boton.addEventListener("click", () => {
            Toastify({
                text: "Producto agregado al carrito",
                duration: 2000,
                gravity: "bottom",
                position: "right"
            }).showToast();
            // Swal.fire({
            //     title: "¡Todo Listo!",
            //     text: "Producto agregado al carrito",
            //     icon: "success",
            //     confirmButtonText: "Aceptar",
            // });
        });
        
    })
}


// FUNCION PARA VER LOS PRODUCTOS AGREGADOS AL CARRITO

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

let productosEnCarrito;

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === parseInt(idBoton));
    if(productosEnCarrito.some(producto => producto.id === parseInt(idBoton))) {
        const index = productosEnCarrito.findIndex(producto => producto.id === parseInt(idBoton));
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}


// FUNCION ACTUALIZAR NUMERO DE CARRITO

function actualizarNumerito() {
    let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumero;
}


