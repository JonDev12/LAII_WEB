function goToCart() {
    // Obtener el nombre de usuario de la URL
    function getUsernameFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('user');
    }

    const user = getUsernameFromURL();

    // Redirigir a carrito.php pasando el nombre de usuario como parámetro en la URL
    if (user) {
        window.location.href = "carrito.php?user=" + encodeURIComponent(user);
    } else {
        console.error('Usuario no encontrado en la URL');
        alert('Error: Usuario no encontrado');
    }
}

function getProductByBarcode() {
    const inputCode = document.getElementById('barcode');
    inputCode.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const barcode = event.target.value.trim();
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
                if (response.status === 404) {
                    productNameInput.value = 'El producto no existe';
                    productPriceInput.value = '';
                    productNameInput.style.backgroundColor = '#ffcccb';
                    productPriceInput.style.backgroundColor = '#ffcccb';
                }
                throw new Error('Error en la red: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.name && data.sell_price) {
                const { name, sell_price } = data;
                productNameInput.value = name;
                productPriceInput.value = sell_price;
                productNameInput.style.backgroundColor = '#90ee90';
                productPriceInput.style.backgroundColor = '#90ee90';

                // Agregar el producto a la lista de productos en el carrito
                stackProduct(data);
            } else {
                productNameInput.value = 'El producto no existe';
                productPriceInput.value = '';
                productNameInput.style.backgroundColor = '#ffcccb';
                productPriceInput.style.backgroundColor = '#ffcccb';
            }  
        })
        .catch(error => {
            console.error('Error al obtener los datos del producto:', error);
        });
}

function stackProduct(product) {
    const productList = document.querySelector('.list-group');
    const productHTML = `
        <div class="list-group-item">
            <div class="row">
                <div class="col-md-3">
                    <img src="https://via.placeholder.com/150" class="img-fluid" alt="Imagen del Producto">
                </div>
                <div class="col-md-6">
                    <h5>${product.name}</h5>
                    <p>Cantidad</p>
                    <div class="input-group ">
                        <div class="input-group-prepend">
                            <button class="btn btn-outline-secondary" type="button" onclick="decreaseQuantity(this)">-</button>
                        </div>
                        <input type="text" class="form-control quantity-input" value="1" readonly>
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button" onclick="increaseQuantity(this)">+</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 text-right">
                    <h5>Precio Unitario: $<span class="unit-price">${product.sell_price}</span></h5>
                    <h6>Total: $<span class="total-price">${product.sell_price}</span></h6>
                    <button class="btn btn-danger btn-sm mt-2" onclick="removeProduct(this)">Eliminar</button>
                </div>
            </div>
        </div>
    `;

    productList.insertAdjacentHTML('beforeend', productHTML);
    updateCartTotal();  // Actualizar el total cada vez que se agrega un producto
}

function increaseQuantity(button) {
    const quantityInput = button.parentElement.previousElementSibling;
    let quantity = parseInt(quantityInput.value);
    quantityInput.value = quantity + 1;
    updateTotal(button, quantity + 1);
}

function decreaseQuantity(button) {
    const quantityInput = button.parentElement.nextElementSibling;
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantityInput.value = quantity - 1;
        updateTotal(button, quantity - 1);
    }
}

function updateTotal(button, quantity) {
    const productItem = button.closest('.list-group-item');
    const unitPrice = parseFloat(productItem.querySelector('.unit-price').textContent);
    const totalPrice = productItem.querySelector('.total-price');
    totalPrice.textContent = (unitPrice * quantity).toFixed(2);

    updateCartTotal();  // Actualizar el total del carrito
}

function removeProduct(button) {
    const productItem = button.closest('.list-group-item');
    productItem.remove();
    updateCartTotal();  // Actualizar el total después de eliminar un producto
}

// Obtener y establecer el usuario en el campo 'seller' si está disponible en la URL
function setUserFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user');
    const sellerInput = document.getElementById('seller');
    if (user && sellerInput) {
        sellerInput.value = user;
    } else {
        console.error('Usuario no encontrado en la URL');
    }
}

function addProductToCart() {
    const barcode = document.getElementById('barcode').value;
    if (barcode) {
        fetchData(barcode);
    } else {
        alert('Ingrese un código de barras válido');
    }
}

function updateCartTotal() {
    const productItems = document.querySelectorAll('.list-group-item');
    let total = 0;
    productItems.forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity-input').value);
        const unitPrice = parseFloat(item.querySelector('.unit-price').textContent);
        total += quantity * unitPrice;
    });
    document.getElementById('totalPrice').textContent = total.toFixed(2);
    const totalPriceInput = document.getElementById('total');
    if (totalPriceInput) {
        totalPriceInput.value = total.toFixed(2);
    }
}

// Ejecutar las funciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    getProductByBarcode();
    setUserFromURL();
    document.querySelector('.btn-primary.mt-4').addEventListener('click', addProductToCart);
});
