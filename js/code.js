$(document).ready(() => {

  console.log("jQuery cargado")
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
    },
    error: function (error) {
      console.log('Error al cargar el archivo JSON:', error);
    }
  });
});

function renderTarjetas(productos) {
  var container = $('#cardContainerShow');

  // Recorre los productos y agrega una tarjeta por cada uno
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
