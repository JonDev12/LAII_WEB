function goToDev() {
    window.location.href = "Devolucion.php";
}

// Función para buscar el producto por código de barras
function fetchData(barcode) {
    const url = `http://localhost:5000/api/products/${barcode}`;
    const productNameInput = document.getElementById('productName');

    fetch(url)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    productNameInput.value = 'El producto no existe';
                    productNameInput.style.backgroundColor = '#ffcccb';
                    mostrarMensaje('El producto no existe', 'danger');
                }
                throw new Error('Error en la red: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.name) {
                productNameInput.value = data.name;
                productNameInput.style.backgroundColor = '#90ee90';
                mostrarMensaje('Producto encontrado', 'success');
            } else {
                productNameInput.value = 'El producto no existe';
                productNameInput.style.backgroundColor = '#ffcccb';
                mostrarMensaje('El producto no existe', 'danger');
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos del producto:', error);
            mostrarMensaje('Error al obtener los datos del producto', 'danger');
        });
}

// Función para enviar la devolución de productos
async function enviarDevolucion(code, Qty) {
    try {
        const response = await fetch('http://localhost:5000/api/devolution', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code, Qty })
        });

        if (!response.ok) {
            const errorData = await response.json();
            mostrarMensaje(errorData.error || 'Error al realizar la devolución', 'danger');
            throw new Error(errorData.error || 'Error al realizar la devolución');
        }

        const data = await response.json();
        console.log('Devolución realizada correctamente:', data.message);
        mostrarMensaje('Devolución realizada correctamente', 'success');
        return data;
    } catch (error) {
        console.error('Error en la devolución:', error.message);
        mostrarMensaje(error.message, 'danger');
        return null;
    }
}

// Función para mostrar mensajes en el contenedor de mensajes
function mostrarMensaje(texto, tipo) {
    const mensaje = document.getElementById('mensaje');
    mensaje.textContent = texto;
    mensaje.className = `alert ${tipo === 'success' ? 'alert-success' : 'alert-danger'}`;
    mensaje.classList.remove('d-none');
    setTimeout(() => {
        mensaje.classList.add('d-none');
    }, 3000); // Oculta el mensaje después de 3 segundos
}

// Evento DOMContentLoaded para asignar eventos a los botones
document.addEventListener('DOMContentLoaded', function() {
    // Botón para buscar producto
    document.getElementById('buscarProducto').addEventListener('click', function() {
        const barcode = document.getElementById('orderNumber').value.trim();
        if (barcode) {
            fetchData(barcode);
        } else {
            mostrarMensaje('El código de producto no puede estar vacío', 'danger');
            console.error('El código de producto no puede estar vacío');
        }
    });

    // Evento submit del formulario para enviar la devolución
    document.getElementById('devolucionForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const codigoProducto = document.getElementById('orderNumber').value.trim();
        const cantidadDevolucion = parseInt(document.getElementById('quantity').value.trim(), 10);

        if (codigoProducto && cantidadDevolucion > 0) {
            const data = await enviarDevolucion(codigoProducto, cantidadDevolucion);
            if (data) {
                console.log('Detalles de la devolución:', data.result);
                mostrarMensaje('Devolución realizada correctamente', 'success');
            }
        } else {
            mostrarMensaje('Por favor, ingrese un código de producto válido y una cantidad mayor a 0', 'danger');
        }
    });
});
