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
        <h2 class="mb-4">Carrito de Compras</h2>
        <div class="row">
            <div class="col-md-8">
                <div class="list-group">
                    <div class="list-group-item">
                        <div class="row">
                            <div class="col-md-3">
                                <img src="https://via.placeholder.com/150" class="img-fluid" alt="Imagen del Producto">
                            </div>
                            <div class="col-md-6">
                                <h5>Nombre del Producto</h5>
                                <p>Descripción del producto aquí.</p>
                            </div>
                            <div class="col-md-3 text-right">
                                <h5>$10.00</h5>
                                <button class="btn btn-danger btn-sm">Eliminar</button>
                            </div>
                        </div>
                    </div>
                    <div class="list-group-item">
                        <div class="row">
                            <div class="col-md-3">
                                <img src="https://via.placeholder.com/150" class="img-fluid" alt="Imagen del Producto">
                            </div>
                            <div class="col-md-6">
                                <h5>Nombre del Producto</h5>
                                <p>Descripción del producto aquí.</p>
                            </div>
                            <div class="col-md-3 text-right">
                                <h5>$20.00</h5>
                                <button class="btn btn-danger btn-sm">Eliminar</button>
                            </div>
                        </div>
                    </div>
                    <!-- Agrega más productos según sea necesario -->
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Resumen del Carrito</h5>
                        <p class="card-text">Total: $30.00</p>
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

    <!-- jQuery, Popper.js, and Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    
    <!-- Script para calcular el cambio -->
    <script>
        function calculateChange() {
            const total = 30.00; // Cambia esto al valor total real
            const amountPaid = parseFloat(document.getElementById('amountPaid').value);
            const paymentMethod = document.getElementById('paymentMethod').value;
            const changeField = document.getElementById('change');
            
            if (paymentMethod === 'efectivo' && amountPaid >= total) {
                const change = amountPaid - total;
                changeField.value = `$${change.toFixed(2)}`;
            } else if (paymentMethod === 'tarjeta') {
                changeField.value = "$0.00"; // No hay cambio para tarjeta
            } else {
                alert("La cantidad pagada es insuficiente.");
                changeField.value = "";
            }
        }
    </script>
</body>
</html>