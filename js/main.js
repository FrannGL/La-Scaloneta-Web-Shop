// CLASE DE PRODUCTOS

// class Productos {
//     constructor (id, nombre, precio, url, categoria) {
//         this.id = id;
//         this.nombre = nombre;
//         this.precio = precio;
//         this.url = url;
//         this.categoria = categoria;
//         // this.cantidad = 1;
//     }
// }

// DECLARACION DE PRODUCTOS

// const producto1 = new Productos (1, "CAMISETA TITULAR", 12000, "./images/camiseta-titular.jpg", "camisetas");
// const producto2 = new Productos (2, "CAMISETA SUPLENTE", 10000, "./images/camiseta-suplente.jpg", "camisetas");
// const producto3 = new Productos (3, "SHORT TITULAR BLANCO", 8000, "./images/shot-titular.jpg", "pantalones");
// const producto4 = new Productos (4, "SHORT TITULAR NEGRO", 7000, "./images/short-titular2.png", "pantalones")
// const producto5 = new Productos (5, "SHORT SUPLENTE", 7000, "./images/short-suplente.jpg", "pantalones");
// const producto6 = new Productos (6, "CAMISETA PRE-MATCH (1)", 8500, "./images/camiseta-prepartido.jpg", "camisetas");
// const producto7 = new Productos (7, "CAMISETA PRE-MATCH (2)", 8000, "./images/camiseta-prepartido2.jpg", "camisetas");
// const producto8 = new Productos (8, "CAMISETA PRE-MATCH (3)", 8000, "./images/camiseta-prepartido3.jpg", "camisetas");
// const producto9 = new Productos (9, "BOTINES X LEYENDA", 75000, "./images/accesorios-botines1.jpg", "accesorios");
// const producto10 = new Productos (10, "BOTINES X SPEEDPORTAL", 50000, "./images/accesorios-botines2.jpg", "accesorios");
// const producto11 = new Productos (11, "BOTINES PREDATOR", 30000, "./images/accesorios-botines3.jpg", "accesorios");
// const producto12 = new Productos (12, "BOTINES PREDATOR 3", 30000, "./images/accesorios-botines4.jpg", "accesorios");
// const producto13 = new Productos (13, "CAMPERA ANTHEM", 35000, "./images/accesorios-campera.jpg", "accesorios");
// const producto14 = new Productos (14, "MEDIAS SUPLENTES 1", 5000, "./images/accesorios-medias-suplente.jpg", "accesorios");
// const producto15 = new Productos (15, "MEDIAS SUPLENTES 2", 5000, "./images/accesorios-medias-suplente2.jpg", "accesorios");
// const producto16 = new Productos (16, "MEDIAS TITULARES", 7000, "./images/accesorios-medias-titular.jpg", "accesorios");
// const producto17 = new Productos (17, "PELOTA AL RIHLA", 50000, "./images/accesorios-pelota.jpg", "accesorios")
// const producto18 = new Productos (18, "CAMISETA CAMPEON 2022", 20000, "./images/camiseta-argentina-campeon.jpg", "camisetas");
// const producto19 = new Productos (19, "PELOTA ARGENTINA", 25000, "./images/accesorios-pelota2.jpg", "accesorios");
// const producto20 = new Productos (20, "CAMISETA ARQUERO SUPLENTE", 12000, "./images/camiseta-arquero-suplente.jpg", "camisetas");
// const producto21 = new Productos (21, "CAMISETA ARQUERO TITULAR", 15000, "./images/camiseta-arquero-titular.jpg", "camisetas");
// const producto22 = new Productos (22, "CHOMBA CUERPO TECNICO", 10000, "./images/camiseta-chomba-dt.jpg", "camisetas");
// const producto23 = new Productos (23, "CAMISETA ENTRENAMIENTO", 8000, "./images/camiseta-entrenamiento.jpg", "camisetas");
// const producto24 = new Productos (24, "CAMISETA DE VIAJE", 8000, "./images/camiseta-viaje.jpg", "camisetas");
// const producto25 = new Productos (25, "PANTALON DE ENTRENAMIENTO", 12000, "./images/pantalon-entrenamiento.jpg", "pantalones");
// const producto26 = new Productos (26, "PANTALON DE VIAJE", 10000, "./images/pantalon-viaje.jpg", "pantalones");
// const producto27 = new Productos (27, "CAMISETA ARGENTINA 2021", 15000, "./images/camiseta-argentina-2021.jpg", "camisetas");


// ARRAY DE PRODUCTOS

// const productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12, producto13, producto14, producto15, producto16, producto17, producto18, producto19, producto20, producto21, producto22, producto23, producto24, producto25, producto26, producto27];

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
const productosURL = './json/productos.json';


// FUNCION MOSTRAR PRODUCTOS

const mostrarProductos = (todosLosProductos) => {
    coleccion.innerHTML = "";
    todosLosProductos.forEach( producto => {
        const card = document.createElement("div");
        card.innerHTML = `<div class="card">
                            <img src="${producto.url}" class="card-img-top imgProductos" alt="${producto.nombre}">
                            <div class="card-body">
                                <h5 class="text-center">${producto.nombre}</h5>
                                <p class="text-center">$ ${producto.precio}</p>
                                <button class="btn btn-primary ms-5 agregarProducto" id="${producto.id}">Agregar al Carrito</button>
                            </div>
                        </div>`
        coleccion.appendChild(card);
    })
};

fetch(productosURL)
    .then(respuesta => respuesta.json())
    .then(datos => {

        // RENDERIZAMOS EL DOM CON LOS PRODUCTOS
        mostrarProductos(datos)

        const productos = datos;

        // FUNCION PARA FILTRAR POR CATEGORIA

        botonCategorias.forEach(boton => {
            boton.addEventListener("click", (e) => {
                if (e.currentTarget.id != "todos") {
                    const productoCategoria = productos.find(producto => producto.categoria === e.currentTarget.id);
                    tituloPrincipal.innerText = productoCategoria.categoria.toUpperCase();
                    const productosSeleccionados = productos.filter(producto => producto.categoria === e.currentTarget.id);
                    mostrarProductos(productosSeleccionados);
                } else {
                    tituloPrincipal.innerText = "NUESTROS PRODUCTOS";
                    mostrarProductos(productos);
                }

            })
        })

        // FUNCION BUSCADOR DE PRODUCTOS

        const buscador = () => {
            const botonBusqueda = document.getElementById("buscador__icono");
            const inputTexto = document.getElementById("buscador__input");
            inputTexto.addEventListener('change', () => {
                let buscador = inputTexto.value;
                console.log(buscador);
                let prodFiltrados = productos.filter((prod) =>
                    prod.nombre.includes(buscador.toUpperCase()));
                //   console.log(prodFiltrados)
                coleccion.innerHTML = "";
                prodFiltrados.forEach(producto => {
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
                })
            })
            botonBusqueda.addEventListener("click", () => {
                inputTexto.classList.toggle("ocultar");
            });
        }
        buscador();

        // FUNCION PARA ACTUALIZAR BOTONES AGREGAR

        function actualizarBotonesAgregar() {
            agregarProducto = document.querySelectorAll(".agregarProducto");
            agregarProducto.forEach(boton => {
                boton.addEventListener("click", agregarAlCarrito)
            })
        }

        actualizarBotonesAgregar()

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
            if (productosEnCarrito.some(producto => producto.id === parseInt(idBoton))) {
                const index = productosEnCarrito.findIndex(producto => producto.id === parseInt(idBoton));
                productosEnCarrito[index].cantidad++;
            } else {
                productoAgregado.cantidad = 1;
                productosEnCarrito.push(productoAgregado);
                Toastify({
                    text: "Producto agregado al Carrito",
                    duration: 2000,
                    gravity: "bottom",
                    position: "right",
                    style: {
                        background: "linear-gradient(to right, #00384b, #0088b6)",
                    },
                }).showToast();
            }
            actualizarNumerito();
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        }


        // FUNCION ACTUALIZAR NUMERO DE CARRITO

        function actualizarNumerito() {
            let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
            numerito.innerText = nuevoNumero;
        }


    })
    .catch(error => console.log(error))
    .finally(() => console.log("Proceso Finalizado"));