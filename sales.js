function goToSales(button) {
    button = document.getElementById('sales')
    button.addEventListener('click', function() {
        window.location.href = 'ventas.php'
    })
}