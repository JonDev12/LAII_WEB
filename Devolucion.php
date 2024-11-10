<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Devolución de Productos</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <div class="container mt-5">
        <h1 class="text-center">Devolución de Productos</h1>
        <br/>

        <!-- Contenedor para mensajes de éxito o error -->
        <div id="mensaje" class="alert d-none" role="alert"></div>

        <form id="devolucionForm">
            <div class="form-row">
                <div class="form-group col-md-2">
                    <label for="orderNumber">Codigo de Producto</label>
                    <input type="text" class="form-control" id="orderNumber" name="orderNumber" required>
                </div>
                <div class="form-group col-md-4">
                    <label for="productName">Nombre del Producto</label>
                    <input type="text" class="form-control" id="productName" name="productName" required readonly>
                </div>
                <div class="form-group col-md-2">
                    <label for="quantity">Cantidad de Devolución</label>
                    <input type="number" class="form-control" id="quantity" name="quantity" required>
                </div>
                <div class="col-md-2">
                    <div class="form-group mt-2">
                        <button type="button" class="btn btn-primary mt-4" id="buscarProducto">Buscar Producto</button>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group mt-2">
                        <button type="submit" class="btn btn-success mt-4">Enviar Devolución</button>
                    </div>
                </div>
            </div>
        </form>
        
        <br/>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">Codigo de Producto</th>
                    <th scope="col">Nombre del Producto</th>
                    <th scope="col">Cantidad de Devolución</th>
                    <th scope="col">Fecha de Devolución</th>
                </tr>
            </thead>
            <tbody>
                <!-- Aquí se pueden agregar filas dinámicamente con PHP o JavaScript -->
                <tr>
                    <td>12345</td>
                    <td>Producto Ejemplo</td>
                    <td>2</td>
                    <td>2023-10-01</td>
                </tr>
            </tbody>
        </table>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="devolutions.js"></script>
</body>

</html>
