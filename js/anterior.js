$(document).ready(() => {

    console.log("codigojQuery de copia web cargado")
});

$(document).ready(function () {
    $.ajax({
        url: 'test.json',
        dataType: 'json',
        success: function (data) {
            // Lógica para manejar los datos después de la carga
            console.log(data);
            // Puedes llamar a una función para procesar los datos aquí
            renderTarjetas(data.jbl)
            // Llamar a la función para agregar productos al carrito
      agregarProductosAlCarrito();


        },
        error: function (error) {
            console.log('Error al cargar el archivo JSON:', error);
        }
    });
});

function renderTarjetas(productos) {
    var container = $('#cardContainerShow');

    
    productos.forEach(function (producto) {
        var cardShowHtml = `
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
              `;

        container.append(cardShowHtml);
    });
}

//agregar productos al carrito


function agregarProductosAlCarrito() {
    
    // Manejar clic en los botones de agregar al carrito
    $('.link-btn-cart').click(function () {
      
      
      var quantity =$('.quantity-cart-nav').text();
      // Incrementar el valor del contador en uno
      quantity++;
      
      // Actualizar el texto del contador
      $('.quantity-cart-nav').text(quantity);

      // Guardar el producto en el localStorage
      localStorage.setItem("product" + quantity, JSON.stringify(product));
      // Actualizar el total de la compra
      
    });
  }

  

