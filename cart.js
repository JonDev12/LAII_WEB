function geTProductByBarcode() {
    const inputCode = document.getElementById('barcode');
    inputCode.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const barcode = event.target.value.trim(); // Elimina espacios en blanco
            if (barcode) {
                fetchData(barcode);
            } else {
                console.error('El código de barras no puede estar vacío');
            }
        }
    });
}

function fetchData(barcode) {
    const url = `http://localhost:5000/api/products/${barcode}`;
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('price');

    fetch(url)
        .then(response => {
            if (!response.ok) {
                // Manejo de errores basado en el código de estado
                if (response.status === 404) {
                    productNameInput.value = 'El producto no existe'; // Mensaje de error
                    productPriceInput.value = ''; // Limpiar el campo de precio
                    productNameInput.style.backgroundColor = '#ffcccb'; // Rojo claro
                    productPriceInput.style.backgroundColor = '#ffcccb'; // Rojo claro
                }
                throw new Error('Error en la red: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Asegúrate de que `data` tenga contenido válido
            if (data && data.name && data.sell_price) {
                const { name, sell_price } = data;
                productNameInput.value = name;
                productPriceInput.value = sell_price;

                // Cambiar el color de fondo a verde
                productNameInput.style.backgroundColor = '#90ee90'; // Verde claro
                productPriceInput.style.backgroundColor = '#90ee90'; // Verde claro

                // Agregar el producto a la lista de productos en el carrito
                stackProduct(data);
            } else {
                productNameInput.value = 'El producto no existe'; // Cambiar el valor del input
                productPriceInput.value = ''; // Limpiar el campo de precio
                productNameInput.style.backgroundColor = '#ffcccb'; // Rojo claro
                productPriceInput.style.backgroundColor = '#ffcccb'; // Rojo claro
            }  
        })
        .catch(error => {
            console.error('Error al obtener los datos del producto:', error);
        });
}
    

function stackProduct(product) {
    const productList = document.querySelector('.list-group'); // Lista de productos en el carrito

    // Crear el HTML para el producto
    const productHTML = `
        <div class="list-group-item">
            <div class="row">
                <div class="col-md-3">
                    <img src="https://via.placeholder.com/150" class="img-fluid" alt="Imagen del Producto">
                </div>
                <div class="col-md-6">
                    <h5>${product.name}</h5>
                    <p>Precio: $${product.sell_price}</p>
                </div>
                <div class="col-md-3 text-right">
                    <h5>$${product.sell_price}</h5>
                    <button class="btn btn-danger btn-sm" onclick="removeProduct(this)">Eliminar</button>
                </div>
            </div>
        </div>
    `;

    // Insertar el producto en la lista
    productList.insertAdjacentHTML('beforeend', productHTML);
}

function removeProduct(button) {
    // Remueve el producto correspondiente del DOM
    const productItem = button.closest('.list-group-item');
    productItem.remove();
}

// Ejecutar la función cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    geTProductByBarcode();
});
