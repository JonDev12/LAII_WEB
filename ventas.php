<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ventas</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <!-- Bootstrap Icons CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css">
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Ventas</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mr-auto"></ul>
            <!-- Icono de Carrito de Compras -->
            <button class="btn btn-outline-secondary" onclick="goToCart()">
                <i class="bi bi-cart" style="font-size: 1.5rem;"></i>
            </button>
        </div>
    </nav>

    <div class="container mt-4">
        <!-- Tabla de ventas con scroll dinámico usando Bootstrap -->
        <div class="table-responsive" style="max-height: 300px; overflow-y: auto;">
            <table class="table table-striped table-bordered mt-4">
                <thead class="thead-light">
                    <tr>
                        <th>Código de Barras</th>
                        <th>Nombre del Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>

    <script src="cart.js"></script>
    <script src="sales.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
</body>

</html>