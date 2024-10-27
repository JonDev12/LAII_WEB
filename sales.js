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
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // data es un objeto con la propiedad 'name'
            if (data) {
                const { name } = data; // Cambiar 'Name' por 'name' para que coincida con la respuesta de la API
                document.getElementById('productName').value = name; // Asigna el nombre al campo de entrada
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos del producto:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    geTProductByBarcode();
});