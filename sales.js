function goToSales() {
    // Function to get the username from the URL
    function getUsernameFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('user');
    }

    const user = getUsernameFromURL(); // Obtener el nombre de usuario de la URL

    // Redirigir a ventas.php, pasando el nombre de usuario como parámetro
    if (user) {
        window.location.href = "ventas.php?user=" + encodeURIComponent(user);
    } else {
        console.error('Usuario no encontrado en la URL');
        // Manejar el caso en que no hay un usuario
        alert('Error: Usuario no encontrado');
    }
}
