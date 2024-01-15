$(document).ready(() => {
  console.log("Código jQuery de copia web cargado");

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

  function manejarCompras(data) {
    //array donde va estar el contenido de lo que se selecciona al boton comprar
      var carrito = [];

      function agregarAlCarrito(productoId) {
          var productoExistente = carrito.find(item => item.id === productoId);

          if (!productoExistente) {
              var producto = data.jbl.find(item => item.id === productoId);

              if (producto) {
                //metodo para aumentar un itemc cantidad al array carrito
                  carrito.push({ ...producto, cantidad: 1 });
                  console.log("Producto agregado:", producto);
              } else {
                  console.log('Producto no encontrado.');
              }
          } else {
              productoExistente.cantidad++;
              console.log('El producto ya está en el carrito.');
          }

          actualizarCarrito();
      }
      //funcion para incrementar cantidad - incrementa pero solo precio por cantidad al click comprar
      function incrementarCantidad(productoId) {
          var producto = carrito.find(item => item.id === productoId);
          if (producto) {
              producto.cantidad++;
              console.log("Cantidad de producto incrementada:", producto);
              actualizarCarrito();
          }
      }
      //no funciona - falta revisarlo
      function decrementarCantidad(productoId) {
          var producto = carrito.find(item => item.id === productoId);
          if (producto && producto.cantidad > 1) {
              producto.cantidad--;
              console.log("Cantidad de producto decrementada:", producto);
              actualizarCarrito();
          }
      }
      //no funciona - falta revisarlo
      function eliminarProducto(productoId) {
          carrito = carrito.filter(item => item.id !== productoId);
          console.log("Producto eliminado:", productoId);
          actualizarCarrito();
      }
      //funcion donde se carga de manera dimanica los productos seleccionados al comprar agregando al carrito de compras
      function actualizarCarrito() {
          $("#actualizarCarrito").empty();

          $.each(carrito, function (index, producto) {
              var itemAddCart = $(`
              <div id="card-shopping-cart" class="card card-shopping-cart bg-body-secondary">
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
                        aria-describedby="btnGroupAddon" value="0">
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
          });

          // metodo para obtener el subtotal y total al hacer click en comprar el producto
          var subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
          var total = subtotal;

          // me muestra el total de la compra y subtotal en cantidad total
          $(".precio-subtotal-lista").text(subtotal.toFixed(2) + '€');
          $(".precio-total-lista").text(total.toFixed(2) + '€');

          // Asignar eventos a los nuevos elementos del carrito
        
      }
      //
      
      // Manejar el evento de hacer clic en el botón de comprar
      $(".add-cart-btn").click(function () {
          var productoId = $(this).data("productid");
          agregarAlCarrito(productoId);
      });
  }
});











            


            




            






