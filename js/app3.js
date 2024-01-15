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

    $("").append(listaProductos);
  })
}



//menajo de la compra
function manejarCompras(data) {

  var carrito = [];

  //logica agregar la carrito 
  function addCartId(productoId) {
    // Verificar si el producto ya está en el carrito
    var productoExistente = carrito.find(item => item.id === productoId);

    if (!productoExistente) {
      // Buscar el producto por su id en el conjunto de datos
      var producto = data.jbl.find(item => item.id === productoId);

      if (producto) {
        // Si existe, agregarlo al carrito
        carrito.push(producto);
        addCart();
        console.log("pruducto agregado");

      } else {
        console.log('Producto no encontrado en el conjunto de datos.');

      }
    } else {
      console.log('El producto ya está en el carrito.');

    }
  }
  ////////////

  //evento pulsar comprar
  $(".add-cart-btn").click(function () {
    var productoId = $(this).data("productid");
    console.log("click al botn comprar")
    addCartId(productoId);
  });

  //pruducto seleccionado agregado al carrito
  function addCart() {
    //limpiar el contenido
    $("").empty();

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

              <div class="col-md-4 col-lg-2">
                <div id="cantidad-shopping-cart">

                  <div class="btn-group btn-group-sm" role="group"
                    aria-label="Small button group">
                    <button id="decrementoBtn" type="button" class="btn btn-outline-primary">-</button>

                    <input type="text" class="form-control input-addCart" aria-label="Input group"
                      aria-describedby="btnGroupAddon" value="1">

                    <button id="incrementoBtn" type="button" class="btn btn-outline-primary">+</button>

                  </div>
                </div>
              </div>


              <div id="subtotal" class="col-md-4 col-lg-2">
                <div class="subtota-shopping-cart">
                  <h5 id="subtotalPrice" class="text-sm-center">${producto.precio}<span class="euros">€</span></h5>
                </div>
              </div>

              <div id="eliminar-col"
                class="col-md-4 col-lg-1 d-flex align-items-center justify-content-center">

                <div class="eliminar-shopping-cart ">
                  <button id="eliminarItem" type="button" class="btn">
                    <img src="img/remove.png" alt="" class="img-fluid">
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="totalcart" class="row row-total container-top">
    <div id="" class="col-12 titulo-total-container">
        <h5>cantidad total</h5>
    </div>
</div>

<div id="" class="row row-total container-lista">
    <div id="" class="col-12 titulo-subtotal-lista">
        <div class="row row-subtotal-lista">
            <div class="col-6">
                <h5 id="subtotal-lista">subtotal</h5>
            </div>
            <div class="col-6">
                <h5 id="precio-subtotal-lista"><span>€</span></h5>
            </div>
        </div>
    </div>

    <div id="" class="col-12 titulo-total-lista">
        <div class="row row-total-lista">
            <div class="col-6">
                <h5 id="total-lista">total</h5>
            </div>
            <div class="col-6">
                <h5 class="precio-total-lista"><span>€</span></h5>
            </div>
        </div>
    </div>
</div>


      `);

      $("").append(itemAddCart);

    });
  }

}

/*$(document).ready(() => {

    console.log("codigo jQuery de copia web cargado");

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


    // Muestra la lista de productos
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
        `);

            $("#listaProductos").append(listaProductos);
        });
    }



    // Manejo de la compra
    function manejarCompras(data) {
        var carrito = [];

        // Logica agregar al carrito 
        function agregarAlCarrito(productoId) {
            var productoExistente = carrito.find(item => item.id === productoId);

            if (!productoExistente) {
                var producto = data.jbl.find(item => item.id === productoId);

                if (producto) {
                    carrito.push({ ...producto, cantidad: 1 });
                    console.log("pruducto agregado");
                    console.log(carrito);
                    actualizarCarrito();
                } else {
                    console.log('Producto no encontrado en el conjunto de datos.');
                }
            } else {
                productoExistente.cantidad++;
                console.log('El producto ya está en el carrito.');
                actualizarCarrito();
            }

            // Incrementar la cantidad de un producto en el carrito
            function incrementarCantidad(productoId) {
                var producto = carrito.find(item => item.id === productoId);
                if (producto) {
                    producto.cantidad++;
                    console.log("producto incrementado")
                    actualizarCarrito();
                }
            }

            // Manejar el evenbotón de incremento
            $(".incremento-sc").click(function () {
                var productoId = $(this).closest(".card-shopping-cart").find(".add-cart-btn").data("productid");
                console.log("boton incremento")
                incrementarCantidad(productoId);
            });

            // Manejar el evento de hacer clic en el botón de decremento
            $(".decremento-sc").click(function () {
                var productoId = $(this).closest(".card-shopping-cart").find(".add-cart-btn").data("productid");
                
                decrementarCantidad(productoId);
            });

            // Decrementar la cantidad de un producto en el carrito
            function decrementarCantidad(productoId) {
                var producto = carrito.find(item => item.id === productoId);
                if (producto && producto.cantidad > 1) {
                    producto.cantidad--;
                    console.log("producto decrementado")
                    actualizarCarrito();
                }
            }

            // Manejar el evento de hacer clic en el botón de eliminar
            


            

        }


        $(".eliminar-item button").click(function () {
            var productoId = $(this).closest(".card-shopping-cart").find(".add-cart-btn").data("productid");
            eliminarProducto(productoId);
        })

        // Eliminar un producto del carrito
        function eliminarProducto(productoId) {
            carrito = carrito.filter(item => item.id !== productoId);
            onsole.log("producto eliminado")
            actualizarCarrito();
        };



        //botón de comprar
        $(".add-cart-btn").click(function () {
            var productoId = $(this).data("productid");
            agregarAlCarrito(productoId);
        });
        
        
        
        // Actualizar la visualización del carrito
        function actualizarCarrito() {
            $("#actualizarCarrito").empty();
            console.log("carrito limpio")

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
        
        `);

            $("#actualizarCarrito").append(itemAddCart);
                console.log("carrito actualiazado")
            });

            // Calcular el subtotal y el total
            var subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
            var total = subtotal; // Puedes agregar lógica adicional si hay impuestos, envío, etc.

            // Mostrar el subtotal y el total en la interfaz
            $(".precio-subtotal-lista").text(subtotal.toFixed(2) + '€');
            $(".precio-total-lista").text(total.toFixed(2) + '€')*/
