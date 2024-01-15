$(document).ready(() => {

  console.log("codigojQuery de copia web cargado")


  $.ajax({
    url: '../json/testproductos.json',
    dataType: 'json',
    success: function (data) {
      mostrarListaProductos(data.jbl);
      manejarCompras(data);

    },
    error: function (error) {
      console.log('Error al cargar el archivo JSON:', error);
    }
  });
});

//muestra la lista de productos
function mostrarListaProductos(lista) {

  $.each(lista, (index, producto) => {

    var listaProductos = $(`
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                    <img class="img-fit" src="${producto.imagen}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <div class="text-container flex-grow-1">
                            <p class="card-text">${producto.tipo}</p>
                            <ul class="list-group list-unstyled">
                            ${producto.descripcion.map(desc => `<li>${desc}</li>`).join('')} 
                            </ul>
                            </div>
                            <div class="btn-container mx-auto pt-4 d-flex align-items-center">
                            <h5 class="card-price m-3">${producto.precio}<span>€</span></h5>
                            <button type="button" class="btn btn-success add-cart-btn bg-black text-white m-auto text-capitalize" data-productid="${producto.id}">comprar</button>

                            </div>
                        </div>
                    </div>
                </div>
            `
    );

    $("#listaProductos2").append(listaProductos);
  })
}


//manajo de la compra
function manejarCompras(data) {
  var carrito = [];

  //logica agregar la carrito 
  function agregarAlCarrito(productoId) {
    // Verificar si el producto ya está en el carrito
    var productoExistente = carrito.find(item => item.id === productoId);

    if (!productoExistente) {
      // Buscar el producto por su id en el conjunto de datos
      var producto = data.jbl.find(item => item.id === productoId);

      if (producto) {
        // Si existe, agregarlo al carrito
        carrito.push(producto);
        console.log("pruducto agregado");

        actualizarCarrito();

      } else {
        console.log('Producto no encontrado en el conjunto de datos.');

      }
    } else {
      console.log('El producto ya está en el carrito.');


      actualizarCarrito();

    }
  }
  ////////////

  //evento pulsar comprar
  $(".add-cart-btn").click(function () {
    var productoId = $(this).data("productid");
    console.log("click al botn comprar")
    agregarAlCarrito(productoId);
  });

  //pruducto seleccionado agregado al carrito
  function actualizarCarrito() {
    //limpiar el contenido
    $("#actualizarCarrito2").empty();

    $.each(carrito, function (index, producto) {
      var itemAddCart = $(`
        <div id="card-shopping-cart" class="card card-shopping-cart">
          <div id="card-body-shopping-cart" class="card-body h-100 card-body-shopping-cart">
            <div id="card-body-row" class="row d-flex align-items-center justify-content-center">
              <div id="imagen-col" class="col-md-7 col-lg-4">
                <div class="imagen-shopping-cart">
                  <img src="${producto.imagen}" alt="" class="img-fluid img-sc">
                </div>
              </div>
              <div id="descripcion-col" class="col-md-5 col-lg-3">
                <div class="descripcion-shopping-cart">
                  <div class="descripcion-sc">
                    <h5>${producto.nombre}</h5>
                  </div>
                  <div class="precio-sc">
                    <span class="precio-sc-span">${producto.precio}</span>
                  </div>
                </div>
              </div>
              <div id="cantidad-col" class="col-md-4 col-lg-2">
                <div class="cantidad-shopping-cart">
                  <div class="btn-group btn-group-sm cantidad-sc-btn" role="group"
                    aria-label="Small button group">
                    <button type="button" class="btn btn-outline-primary decremento-sc">-</button>
                    <input type="text" class="form-control input-sc" aria-label="Input group"
                      aria-describedby="btnGroupAddon" value="1">
                    <button type="button" class="btn btn-outline-primary incremento-sc">+</button>
                  </div>
                </div>
              </div>
              <div id="subtotal" class="col-md-4 col-lg-2">
                <div class="subtotal-shopping-cart">
                  <h5 class="subtotal-sc text-sm-center">${producto.precio}<span class="euros">€</span></h5>
                </div>
              </div>
              <div id="eliminar-col" class="col-md-4 col-lg-1 d-flex align-items-center justify-content-center">
                <div class="eliminar-item ">
                  <button type="button" class="btn">
                    <img src="img/remove.png" class="anular-compra" >
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="totalContainer" class="card total-shopping-cart-container">
                <div id="" class="card-body h-100 card-total-container">

                    <div id="" class="row row-total container-top">
                        <div id="" class="col-12 titulo-total-container">
                            <h5>cantidad total</h5>
                        </div>
                    </div>

                    <div id="" class="row row-total container-lista">
                        <div id="" class="col-12 subtotal-lista">
                            <div class="row row-subtotal-lista">
                                <div class="col-6">
                                    <h5 class="subtotal-lista">subtotal</h5>
                                </div>
                                <div class="col-6">
                                    <h5 class="precio-subtotal-lista"><span>€</span></h5>
                                </div>
                            </div>
                        </div>

                        <div id="" class="col-12 total-lista">
                            <div class="row row-total-lista">
                                <div class="col-6">
                                    <h5 class="total-lista">total</h5>
                                </div>
                                <div class="col-6">
                                    <h5 class="precio-total-lista"><span>€</span></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          </div>

      `);

      $("#actualizarCarrito2").append(itemAddCart);

    });


  }

}

// Función para restar la cantidad de un producto
function restarCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        actualizarSubtotal(index);
        actualizarCarrito();
    }
}

$(".decremento-sc").click(function () {
      var index = $(this).closest(".col-md-4").index();
      restarCantidad(index);
    });

    $(".incremento-sc").click(function () {
      var index = $(this).closest(".col-md-4").index();
      sumarCantidad(index);
    });

    // Añade un evento para eliminar un producto
    $(".eliminar-sc").click(function () {
      var index = $(this).closest(".col-md-4").index();
      eliminarProducto(index);
    });

// Función para sumar la cantidad de un producto
function sumarCantidad(index) {
    carrito[index].cantidad++;
    actualizarSubtotal(index);
    actualizarCarrito();
}

// Función para actualizar el subtotal de un producto
function actualizarSubtotal(index) {
    carrito[index].subtotal = carrito[index].precio * carrito[index].cantidad;
}


function restarCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        carrito[index].subtotal = carrito[index].precio * carrito[index].cantidad; // Actualiza el subtotal
        actualizarTotales();
        actualizarCarrito();
    }
}

function sumarCantidad(index) {
    carrito[index].cantidad++;
    carrito[index].subtotal = carrito[index].precio * carrito[index].cantidad; // Actualiza el subtotal
    actualizarTotales();
    actualizarCarrito();
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    actualizarTotales();
    actualizarCarrito();
}



function actualizarTotales() {
    var subtotal = 0;

    $.each(carrito, function (index, producto) {
        subtotal += producto.subtotal;
    });

    var total = subtotal;

    $(".precio-subtotal-lista").text(subtotal.toFixed(2) + " €");
    $(".precio-total-lista").text(total.toFixed(2) + " €");
}



