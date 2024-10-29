<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificación de Captcha</title>
    <!-- Bootstrap CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="container">
    <h1 class="mt-5">Verificación de Captcha</h1>
    <div class="form-group">
        <img id="captchaImg" alt="Captcha Image" class="img-fluid mb-3" />
        <input type="text" id="captchaInput" class="form-control" placeholder="Ingresa el captcha" required />
    </div>
    <button id="submitCaptcha" class="btn btn-primary">Verificar Captcha</button>
    <div id="captchaError" class="text-danger mt-3"></div>

    <!-- Bootstrap JS and dependencies -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <script>
        // Array of captcha image URLs
        const captchaImages = [
            './images/captcha1.jpg',
            './images/captcha2.jpg',
            './images/captcha3.jpg',
            // Add more captcha image URLs here
        ];

        // Function to generate a random captcha image URL
        function getRandomCaptchaImage() {
            const randomIndex = Math.floor(Math.random() * captchaImages.length);
            return captchaImages[randomIndex];
        }

        // Function to load and display the captcha image
        function loadCaptchaImage() {
            const captchaImg = document.getElementById('captchaImg');
            const randomCaptchaImage = getRandomCaptchaImage();
            captchaImg.src = randomCaptchaImage;
        }

        // Function to get the username from the URL
        function getUsernameFromURL() {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('user');
        }

        const user = getUsernameFromURL(); // Retrieve the username from the URL

        // Function to validate the captcha
        function ValidateCaptcha() {
            const capcthavalues = {
                'captcha1.jpg': 'RBSKW',
                'captcha2.jpg': '459CT',
                'captcha3.jpg': '6H3T8',
            };

            const captchaImgSrc = document.getElementById('captchaImg').src;
            const captchaInput = document.getElementById('captchaInput').value;

            // Extract the file name from the captchaImgSrc
            const captchaFileName = captchaImgSrc.substring(captchaImgSrc.lastIndexOf('/') + 1);

            if (capcthavalues[captchaFileName] === captchaInput) {
                // Redirigir a la página principal
                window.location.href = './principal.php?user=' + encodeURIComponent(user);
            } else {
                alert('Captcha incorrecto');
                loadCaptchaImage();
            }
        }

        // Call the loadCaptchaImage function when the page is loaded
        window.addEventListener('DOMContentLoaded', loadCaptchaImage);
        document.getElementById('submitCaptcha').addEventListener('click', ValidateCaptcha);
    </script>
</body>
</html>
