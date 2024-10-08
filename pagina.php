<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página con Captcha</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body text-center">
                        <h1 class="card-title mb-4">¡Completa el Captcha!</h1>
                        <img id="captchaImg" src="" alt="Captcha" class="img-fluid mb-3">
                        <div class="mb-3">
                            <input type="text" id="captchaInput" class="form-control" placeholder="Ingresa el captcha">
                        </div>
                        <button id="submitCaptcha" class="btn btn-primary">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Custom JS -->
    <script src="./captcha.js"></script>
</body>
</html>
