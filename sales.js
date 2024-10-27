function goToSales(button) {
    button = document.getElementById('sales')
    button.addEventListener('click', function() {
        window.location.href = 'ventas.php'
    })
}

function geTProductByBarcode() {
    InputCode = document.getElementById('barcode').addEventListener('keypress', function(event) {
        if(event.key === 'Enter' ){
            var barcode = event.target.value;

            if(barcode){
                fetchData(barcode);
            }
        }
    })
}

