function InsertProduct(event) {
    event.preventDefault();  // Evita el envío predeterminado del formulario

    const saveButton = document.getElementById('saveProduct');
    saveButton.disabled = true;  // Deshabilita el botón para evitar múltiples envíos

    // Captura los datos de los campos
    const barCode = document.getElementById('barCode').value.trim();
    const productName = document.getElementById('productName').value.trim();
    const quantity = parseInt(document.getElementById('quantity').value);
    const provider = document.getElementById('provider').value.trim();
    const expirationDate = document.getElementById('expirationDate').value.trim();
    const providerPrice = parseFloat(document.getElementById('providerPrice').value);
    const salePrice = parseFloat(document.getElementById('salePrice').value);

    // Validación más específica
    if (!barCode || !productName || !quantity || !provider || !expirationDate || !providerPrice || !salePrice || quantity < 1 || providerPrice <= 0 || salePrice <= 0) {
        document.getElementById('error-message').style.display = 'block';
        saveButton.disabled = false;  // Reactivar el botón
        return;
    } else {
        document.getElementById('error-message').style.display = 'none';
    }

    console.log('Enviando datos del producto:', { barCode, productName, quantity, provider, expirationDate, providerPrice, salePrice });

    // Realizar la solicitud al servidor
    fetch(`http://localhost:5000/api/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Bar_code: barCode,
            name: productName,
            Quantity: quantity,
            Provider: provider,
            expire_date: expirationDate,
            prov_price: providerPrice,
            sell_price: salePrice
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Producto agregado:', data);
        location.reload();  // Recargar la página después de agregar el producto
    })
    .catch(error => {
        console.error('Error al agregar el producto:', error);
        saveButton.disabled = false;  // Reactivar el botón en caso de error
    });

    // Cerrar el modal si todo es exitoso
    const modal = new bootstrap.Modal(document.getElementById('addProductModal'));
    modal.hide();
}

function GetProduct(button) {
    console.log('Recibiendo datos');
    var id = button.getAttribute('data-id');
    var barcode = button.getAttribute('data-bar_code');
    var name = button.getAttribute('data-name');
    var quantity = button.getAttribute('data-quantity');
    var provider = button.getAttribute('data-provider');
    var expire_date = button.getAttribute('data-expire_date');
    var prov_price = button.getAttribute('data-prov_price');
    var sell_price = button.getAttribute('data-sell_price');

    console.log(id, barcode, name, quantity, provider, expire_date, prov_price, sell_price);

    document.getElementById('editProductId').value = id;
    document.getElementById('editBarCode').value = barcode;
    document.getElementById('editProductName').value = name;
    document.getElementById('editQuantity').value = quantity;
    document.getElementById('editProvider').value = provider;
    document.getElementById('editProviderPrice').value = prov_price;
    document.getElementById('editSalePrice').value = sell_price;

    console.log('Actualizando datos de producto con id', id);

    var updateproduct = document.getElementById('EditProductBtn').addEventListener('click', function () {
        var id = document.getElementById('editProductId').value;
        var barcode = document.getElementById('editBarCode').value;
        var name = document.getElementById('editProductName').value;
        var quantity = document.getElementById('editQuantity').value;
        var provider = document.getElementById('editProvider').value;
        //var expire_date = document.getElementById('editExpireDate').value;
        var prov_price = document.getElementById('editProviderPrice').value;
        var sell_price = document.getElementById('editSalePrice').value;

        fetch(`http://localhost:5000/api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Bar_code: barcode, name: name, Quantity: quantity, Provider: provider, expire_date: expire_date, prov_price: prov_price, sell_price: sell_price })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Producto actualizado:', data);
                location.reload();
            })
    });
}

function DeleteProduct(button) {
    console.log('Recibiendo datos');
    var id = button.getAttribute('data-id');
    var confirmdelete = document.getElementById('confirmDeleteProductBtn').addEventListener('click', function () {
        console.log('Eliminando datos de producto con id', id)
        fetch(`http://localhost:5000/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Producto eliminado:', data);
                location.reload();
            })
    }
    )
}