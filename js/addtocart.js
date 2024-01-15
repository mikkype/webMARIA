console.log("segundo js cargado")

// Función para añadir un producto al carrito de compras
function addToCart(product) {
    // Obtener el contador del carrito de compras
    var counter = document.querySelector(".quantity-cart-nav");
    // Obtener el valor actual del contador
    var quantity = parseInt(counter.textContent);
    // Incrementar el valor del contador en uno
    quantity++;
    // Actualizar el texto del contador
    counter.textContent = quantity;
    // Guardar el producto en el localStorage
    localStorage.setItem("product" + quantity, JSON.stringify(product));
    // Actualizar el total de la compra
    updateTotal();
}


// Función para obtener los botones de comprar de las tarjetas
function getBuyButtons() {
    // Obtener todos los botones de comprar
    var buttons = document.querySelectorAll(".add-cart-btn");
    // Recorrer los botones y agregar un evento de click a cada uno
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            // Obtener la tarjeta que contiene el botón
            var card = button.closest(".card");
            // Obtener los datos del producto de la tarjeta
            var product = {
                id: card.querySelector(".card-title").textContent,
                name: card.querySelector(".card-text").textContent,
                price: card.querySelector(".card-price").textContent,
                image: card.querySelector(".img-fit").src,
            };
            // Añadir el producto al carrito de compras
            addToCart(product);
            // Mostrar el producto en el shopping cart
            showProduct(product);
        });
    });
}


// Función para mostrar un producto en el shopping cart
function showProduct(product) {
    // Obtener el contenedor del shopping cart
    var container = document.querySelector("#lista-cart");
    // Crear el código HTML para la tarjeta del producto
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
    // Añadir la tarjeta al contenedor
    container.insertAdjacentHTML("beforeend", cardHtml);
    // Agregar los eventos de los botones de la tarjeta
    addCardEvents();
}

// Función para agregar los eventos de los botones de la tarjeta
function addCardEvents() {
    // Obtener todos los botones de decremento
    var decButtons = document.querySelectorAll(".decremento-sc");
    // Recorrer los botones y agregar un evento de click a cada uno
    decButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            // Obtener el input de la cantidad
            var input = button.nextElementSibling;
            // Obtener el valor actual de la cantidad
            var quantity = parseInt(input.value);
            // Si la cantidad es mayor que uno, decrementarla en uno
            if (quantity > 1) {
                quantity--;
                // Actualizar el valor del input
                input.value = quantity;
                // Actualizar el subtotal del producto
                updateSubtotal(button);
                // Actualizar el total de la compra
                updateTotal();
            }
        });
    });
    // Obtener todos los botones de incremento
    var incButtons = document.querySelectorAll(".incremento-sc");
    // Recorrer los botones y agregar un evento de click a cada uno
    incButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            // Obtener el input de la cantidad
            var input = button.previousElementSibling;
            // Obtener el valor actual de la cantidad
            var quantity = parseInt(input.value);
            // Incrementar la cantidad en uno
            quantity++;
            // Actualizar el valor del input
            input.value = quantity;
            // Actualizar el subtotal del producto
            updateSubtotal(button);
            // Actualizar el total de la compra
            updateTotal();
        });
    });
    // Obtener todos los botones de eliminar
    var delButtons = document.querySelectorAll(".eliminar-sc");
    // Recorrer los botones y agregar un evento de click a cada uno
    delButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            // Obtener la tarjeta que contiene el botón
            var card = button.closest(".card");
            // Eliminar la tarjeta del contenedor
            card.parentNode.removeChild(card);
            // Actualizar el contador del carrito de compras
            updateCounter();
            // Actualizar el total de la compra
            updateTotal();
        });
    });
}

// Función para actualizar el subtotal del producto
function updateSubtotal(button) {
    // Obtener el precio del producto
    var price = parseFloat(button.closest(".card").querySelector(".precio-sc-span").textContent);
    // Obtener la cantidad del producto
    var quantity = parseInt(button.closest(".card").querySelector(".input-sc").value);
    // Calcular el subtotal del producto
    var subtotal = price * quantity;
    // Obtener el elemento que muestra el subtotal del producto
    var subtotalElement = button.closest(".card").querySelector(".subtotal-sc");
    // Actualizar el texto del elemento
    subtotalElement.textContent = subtotal + "€";
}

// Función para actualizar el total de la compra
function updateTotal() {
    // Obtener todos los elementos que muestran los subtotales de los productos
    var subtotals = document.querySelectorAll(".subtotal-sc");
    // Inicializar el total de la compra
    var total = 0;
    // Recorrer los elementos y sumar los subtotales al total
    subtotals.forEach(function (element) {
        total += parseFloat(element.textContent);
    });
    // Obtener los elementos que muestran el subtotal y el total de la compra
    var subtotalElement = document.querySelector(".precio-subtotal-lista");
    var totalElement = document.querySelector(".precio-total-lista");
    // Actualizar el texto de los elementos
    subtotalElement.textContent = total + " €";
    totalElement.textContent = total + " €";
}


// Función para actualizar el contador del carrito de compras
function updateCounter() {
    // Obtener el contador del carrito de compras
    var counter = document.querySelector(".quantity-cart-nav");
    // Obtener el valor actual del contador
    var quantity = parseInt(counter.textContent);
    // Decrementar el valor del contador en uno
    quantity--;
    // Actualizar el texto del contador
    counter.textContent = quantity;
}