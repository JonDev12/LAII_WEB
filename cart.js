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
    //sendData(product);
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

function checkInternetConnection() {
    const paymentMethodSelect = document.getElementById('paymentMethod');
    const tarjetaOption = document.getElementById('tarjetaOption');
    const amountPaidGroup = document.getElementById('amountPaidGroup');
    const bankTypeGroup = document.getElementById('bankTypeGroup');
    const cardNumberGroup = document.getElementById('cardNumberGroup');
    
    paymentMethodSelect.disabled = false; // Permitir seleccionar método de pago siempre que haya opciones

    if (navigator.onLine) {
        tarjetaOption.disabled = false;       // Habilitar opción de tarjeta si hay conexión
    } else {
        paymentMethodSelect.value = "efectivo"; // Cambiar a efectivo si no hay conexión
        tarjetaOption.disabled = true;         // Deshabilitar opción de tarjeta
        cardNumberGroup.style.display = 'none'; // Ocultar número de tarjeta
        bankTypeGroup.style.display = 'none';   // Ocultar tipo de banco
        amountPaidGroup.style.display = 'block'; // Mostrar cantidad pagada
        alert('No hay conexión a internet. El método de tarjeta no está disponible.');
    }
}

function HidePayment() {
    const paymentMethodSelect = document.getElementById('paymentMethod');
    const cardNumberGroup = document.getElementById('cardNumberGroup');
    const amountPaidGroup = document.getElementById('amountPaidGroup');
    const bankTypeGroup = document.getElementById('bankTypeGroup');

    paymentMethodSelect.addEventListener('change', () => {
        const selectedValue = paymentMethodSelect.value;

        // Ocultar todos los campos al inicio
        cardNumberGroup.style.display = 'none';
        amountPaidGroup.style.display = 'none';
        bankTypeGroup.style.display = 'none';

        // Mostrar los campos correspondientes según la selección
        if (selectedValue === 'tarjeta') {
            cardNumberGroup.style.display = 'block'; // Mostrar número de tarjeta
            bankTypeGroup.style.display = 'block';    // Mostrar tipo de banco
        } else if (selectedValue === 'efectivo') {
            amountPaidGroup.style.display = 'block'; // Mostrar cantidad pagada
        }
    });
}

async function ticket() {
    const productList = document.querySelector('.list-group');
    const productItems = document.querySelectorAll('.list-group-item');
    const seller = document.getElementById('seller').value;

    // Obtener el valor del cliente frecuente
    const clientSelect = document.getElementById('frecClient');
    const client = clientSelect.value !== 'sel' ? clientSelect.options[clientSelect.selectedIndex].text : 'No especificado';
    
    const paymentMethod = document.getElementById('paymentMethod').value;
    let total = 0;
    let products = [];
    let description = '';

    // Recolecta los productos y calcula el total
    productItems.forEach(item => {
        const product = {
            name: item.querySelector('h5').textContent,
            quantity: parseInt(item.querySelector('.quantity-input').value),
            unit_price: parseFloat(item.querySelector('.unit-price').textContent),
            total_price: parseFloat(item.querySelector('.total-price').textContent)
        };
        total += product.total_price;
        products.push(product);
        description += `${product.name} x ${product.quantity}\n`;
    });

    // Actualizamos el total en el input de total
    document.getElementById('total').value = total.toFixed(2);

    let change = 0;
    if (paymentMethod === 'tarjeta') {
        const cardNumberInput = document.getElementById('cardNumber');
        const cardNumber = cardNumberInput.value;
        const bankTypeSelect = document.getElementById('bankType');

        // Validación del número de tarjeta y selección del banco
        const cardType = detectCardType(cardNumber);
        if (cardType) {
            bankTypeSelect.value = cardType;
        } else {
            console.log('Número de tarjeta inválido');
            return;
        }
    } else {
        const amountPaid = parseFloat(document.getElementById('amountPaid').value) || 0;
        change = calculateChange(total, amountPaid);
    }

    // Preparamos la fecha actual en formato YYYY-MM-DD
    const date = new Date().toISOString().split('T')[0];

    // Preparar los datos para enviar a la API
    const saleData = {
        Descripcion: description.trim(),
        Cliente: client,
        Productos: products.length,
        Total: total.toFixed(2),
        Pago: paymentMethod,
        Cambio: change.toFixed(2),
        Fecha: date
    };

    // Enviar los datos a la API usando fetch
    try {
        const response = await fetch('http://localhost:5000/api/sales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(saleData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Venta creada con éxito:', data);

            // Crear el ticket como archivo .txt
            generateTicketTxt(date, seller, client, description, total, paymentMethod, change);
        } else {
            console.log('Error al crear la venta:', response.statusText);
        }
    } catch (error) {
        console.log('Error de red:', error.message);
    }
}

// Función para generar el archivo .txt con el ticket
function generateTicketTxt(date, seller, client, description, total, paymentMethod, change) {
    // Crear el contenido del ticket
    let ticketContent = `
        ------------------------------
        TICKET DE VENTA
        ------------------------------
        Fecha: ${date}
        Vendedor: ${seller}
        Cliente: ${client}

        Productos:
        ------------------------------
        ${description}

        Total: $${total.toFixed(2)}
        Método de pago: ${paymentMethod}
        Cambio: $${change.toFixed(2)}

        ------------------------------
        Gracias por su compra!
    `;

    // Crear un Blob con el contenido del ticket
    const blob = new Blob([ticketContent], { type: 'text/plain' });

    // Crear un enlace de descarga para el archivo .txt
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ticket_${date}.txt`;
    link.click(); // Inicia la descarga
}


function calculateChange(total, amountPaid) {
    const change = amountPaid - total;
    document.getElementById('change').value = change.toFixed(2);
    return change;
}

function Cards() {
    return {
        visa: {
            validate: function(cardNumber) {
                return /^4[0-9]{12}(?:[0-9]{3})?$/.test(cardNumber);
            }
        },
        mastercard: {
            validate: function(cardNumber) {
                return /^5[1-5][0-9]{14}$/.test(cardNumber);
            }
        },
        amex: {
            validate: function(cardNumber) {
                return /^3[47][0-9]{13}$/.test(cardNumber);
            }
        },
        discover: {
            validate: function(cardNumber) {
                return /^6(?:011|5[0-9]{2})[0-9]{12}$/.test(cardNumber);
            }
        },
        diners: {
            validate: function(cardNumber) {
                return /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(cardNumber);
            }
        }
    };
}


// Detecta el tipo de tarjeta basado en el número ingresado
function detectCardType(cardNumber) {
    const cardTypes = Cards();
    for (const type in cardTypes) {
        if (cardTypes[type].validate(cardNumber)) {
            return type; // Devuelve el tipo de tarjeta si es válida
        }
    }
    return null; // Si no coincide, devuelve null
}

// Detectar automáticamente el banco al ingresar el número de tarjeta
document.getElementById('cardNumber').addEventListener('input', function() {
    const cardType = detectCardType(this.value);
    const bankTypeSelect = document.getElementById('bankType');
    
    if (cardType) {
        bankTypeSelect.value = cardType;
    } else {
        bankTypeSelect.value = ''; // Limpia el valor si no es un número válido
    }
});

// Actualizar el cambio cada vez que se ingresa una cantidad en amountPaid
document.getElementById('amountPaid').addEventListener('input', function() {
    const total = parseFloat(document.getElementById('total').value) || 0;
    const amountPaid = parseFloat(this.value) || 0;
    calculateChange(total, amountPaid);
});

// Ejecutar las funciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    getProductByBarcode();
    setUserFromURL();
    document.querySelector('.btn-primary.mt-4').addEventListener('click', addProductToCart);
    HidePayment();
    checkInternetConnection();
});

// Escuchar cambios en el estado de la conexión
window.addEventListener('online', checkInternetConnection);
window.addEventListener('offline', checkInternetConnection);
