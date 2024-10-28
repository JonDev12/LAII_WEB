document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('loginForm');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    let attempts = 0;
    const maxAttempts = 3;

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        errorMessage.textContent = '';
        // Validar que los campos no estén vacíos
        if (username.value.trim() === '' || password.value.trim() === '') {
            errorMessage.textContent = 'Both fields are required.';
            return;
        }
        // Validar longitud de la contraseña
        if (password.value.length < 8) {
            errorMessage.textContent = 'Password must be at least 8 characters long.';
            return;
        }
        // Validar que la contraseña contenga al menos una letra mayúscula
        if (!/[A-Z]/.test(password.value)) {
            errorMessage.textContent = 'Password must contain at least one uppercase letter.';
            return;
        }
        // Incrementar intentos de registro
        attempts++;
        if (attempts >= maxAttempts) {
            errorMessage.textContent = 'Maximum login attempts exceeded.';
            form.querySelector('button').disabled = true;
            return;
        }
        // Si pasa todas las validaciones
        errorMessage.textContent = 'Login successful!';
        // Redirigir a otra página
        window.location.href = './pagina.php'; // Cambia 'pagina.html' por la URL de la página a la que deseas redirigir
    });
});
