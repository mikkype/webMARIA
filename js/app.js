$(document).ready(() => {

    console.log("codigojQuery de copia web cargado")
});
$(document).ready(function () {
    $.ajax({
        url: '../json/testproductos.json',
        dataType: 'json',
        success: function (data) {
            mostrarListaProductos(data.jbl);
            
        },
        error: function (error) {
            console.log('Error al cargar el archivo JSON:', error);
        }
    });
});

//muestra la lista de productos
function mostrarListaProductos(lista){
  
  $.each(lista,(index,producto)=>{
      
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
                            <button type="button" class="btn btn-success add-cart-btn bg-black text-white m-auto text-capitalize">comprar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
      );
     
      $("#cardContainerShow").append(listaProductos);
  })
}

//
// ...

$(document).ready(function () {
  var carrito = [];  // Nuevo array para almacenar productos en el carrito

  // Función para agregar un producto al carrito
  function agregarAlCarrito(producto) {
      carrito.push(producto);
      actualizarCarrito();  // Llama a la función para actualizar la visualización del carrito
  }

  // Asigna la función de agregarAlCarrito al clic del botón "comprar"
  $("#cardContainerShow").on("click", ".add-cart-btn", function () {
      var index = $(this).closest(".col-md-4").index();
      agregarAlCarrito(data.jbl[index]);  // Agrega el producto correspondiente al carrito
  });

  // Función para actualizar la visualización del carrito
  function actualizarCarrito() {
      // Limpiar el contenedor del carrito
      $("#shopping-cart-3").empty();

      // Iterar sobre los productos en el carrito y mostrarlos en el contenedor
      $.each(carrito, function (index, producto) {
          var itemCarrito = $(`
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
                              <button type="button" class="btn btn-success add-cart-btn bg-black text-white m-auto text-capitalize">comprar</button>
                          </div>
                      </div>
                  </div>
              </div>
          `);

          $("#shopping-cart").append(itemCarrito);
      });
  }
});


var cardHtml = `
    <div id="card-shopping-cart" class="card card-shopping-cart">
      <div id="card-body-shopping-cart" class="card-body h-100 card-body-shopping-cart">
        <div id="card-body-row" class="row d-flex align-items-center justify-content-center">
          <div id="imagen-col" class="col-md-7 col-lg-4">
            <div class="imagen-shopping-cart">
              <img src="${product.image}" alt="" class="img-fluid img-sc">
            </div>
          </div>
          <div id="descripcion-col" class="col-md-5 col-lg-3">
            <div class="descripcion-shopping-cart">
              <div class="descripcion-sc">
                <h5>${product.name}</h5>
              </div>
              <div class="precio-sc">
                <span class="precio-sc-span">${product.price}</span>
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
              <h5 class="subtotal-sc text-sm-center">${product.price}<span class="euros">€</span></h5>
            </div>
          </div>
          <div id="eliminar-col"
            class="col-md-4 col-lg-1 d-flex align-items-center justify-content-center">
            <div class="eliminar-shopping-cart ">
              <button type="button" class="btn">
                <img src="img/remove.png" alt="" class="img-fluid eliminar-sc">
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;