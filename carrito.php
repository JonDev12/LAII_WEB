<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carrito de Compras</title>
    <!-- Bootstrap CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome CSS for shopping cart icon -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>
    <div class="container mt-5">
        <h3 class="mb-4">Carrito de Compras</h3>

        <!-- Formulario para agregar productos -->
        <div class="row mb-4">
            <div class="col-md-2">
                <div class="form-group">
                    <label for="barcode">Código de Barras</label>
                    <input type="text" class="form-control" id="barcode" placeholder="#####">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="productName">Nombre del Producto</label>
                    <input type="text" class="form-control" id="productName" placeholder="Ingrese el nombre del producto" readonly>
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                    <label for="price">Precio</label>
                    <input type="number" class="form-control" id="price" placeholder="0.00" readonly>
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group mt-2">
                    <button type="button" class="btn btn-primary mt-4">Agregar Producto</button>
                </div>
            </div>
        </div>

        <!-- Lista de productos y resumen del carrito -->
        <div class="row">
            <div class="col-md-8">
                <div class="list-group">
                    <!-- Los productos se agregarán aquí dinámicamente -->
                </div>
            </div>

            <!-- Resumen del carrito -->
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Resumen del Carrito</h5>
                        <p class="card-text">Total: $<span id="totalPrice">0.00</span></p>
                        <button class="btn btn-primary btn-block" data-toggle="modal" data-target="#checkoutModal">
                            <i class="fas fa-shopping-cart"></i> Comprar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de Finalizar Compra -->
    <div class="modal fade" id="checkoutModal" tabindex="-1" role="dialog" aria-labelledby="checkoutModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="checkoutModalLabel">Finalizar Compra</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="paymentMethod">Método de Pago</label>
                            <select class="form-control" id="paymentMethod">
                                <option value="efectivo">Efectivo</option>
                                <option value="tarjeta">Tarjeta</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="amountPaid">Cantidad Pagada</label>
                            <input type="number" class="form-control" id="amountPaid" placeholder="Ingrese la cantidad con la que paga">
                        </div>
                        <div class="form-group">
                            <label for="change">Cambio</label>
                            <input type="text" class="form-control" id="change" readonly>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" onclick="calculateChange()">Finalizar Compra</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Archivos de JavaScript -->
    <script src="cart.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
