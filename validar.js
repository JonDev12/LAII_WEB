document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');
    let attempts = 0;
    const maxAttempts = 3;

    document.getElementById('btnLogin').addEventListener('click', function(event) {
        event.preventDefault();
        errorMessage.textContent = '';

        const user = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (user === '' || password === '') {
            errorMessage.textContent = 'Both fields are required.';
            return;
        }

        if (password.length < 8) {
            errorMessage.textContent = 'Password must be at least 8 characters long.';
            return;
        }

        if (!/[A-Z]/.test(password)) {
            errorMessage.textContent = 'Password must contain at least one uppercase letter.';
            return;
        }

        attempts++;
        if (attempts >= maxAttempts) {
            errorMessage.textContent = 'Maximum login attempts exceeded.';
            document.getElementById('btnLogin').disabled = true;
            return;
        }

        fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: user, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Login successful:', data);
                //window.location.href = './principal.php?user=' + encodeURIComponent(user);
                window.location.href = './captchalogin.php?user=' + encodeURIComponent(user);
            } else {
                errorMessage.textContent = data.message; // Mostrar mensaje de error recibido del servidor
            }
        })
        .catch(error => {
            errorMessage.textContent = 'An error occurred during login. Please try again.';
            console.error('Error during login:', error);
        });
    });
});
