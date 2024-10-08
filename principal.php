<?php
require_once 'TableProducts.php';
require_once 'TableUser.php';
$t = new TableUser();
$p = new TableProducts();


?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Productos y Usuarios</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>

<body>
    <div class="container mt-5">
        <!-- Tabla de Productos -->
        <h2>Tabla de Productos</h2>
        <button class="btn btn-primary mb-3" data-toggle="modal" data-target="#addProductModal">Añadir Producto</button>
        <table class="table table-bordered table-responsive-md">
            <thead class="thead-dark">
                <tr>
                    <th>Id</th>
                    <th>Bar Code</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Proveedor</th>
                    <th>Fecha Expiración</th>
                    <th>Precio Proveedor</th>
                    <th>Precio Venta</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <!-- Aquí irían las filas dinámicamente cargadas desde la base de datos -->
                <?php echo $p->getAllProducts(); ?>
            </tbody>
        </table>

        <!-- Modal para Añadir Producto -->
        <div class="modal fade" id="addProductModal" tabindex="-1" role="dialog" aria-labelledby="addProductModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addProductModalLabel">Añadir Producto</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="addProductForm" onsubmit="InsertProduct(event)">
                            <div class="form-group">
                                <label for="barCode">Código de Barras</label>
                                <input type="text" class="form-control" id="barCode" required>
                            </div>
                            <div class="form-group">
                                <label for="productName">Nombre</label>
                                <input type="text" class="form-control" id="productName" required>
                            </div>
                            <div class="form-group">
                                <label for="quantity">Cantidad</label>
                                <input type="number" class="form-control" id="quantity" min="1" required>
                            </div>
                            <div class="form-group">
                                <label for="provider">Proveedor</label>
                                <input type="text" class="form-control" id="provider" required>
                            </div>
                            <div class="form-group">
                                <label for="expirationDate">Fecha de Expiración</label>
                                <input type="datetime-local" class="form-control" id="expirationDate" required>
                            </div>
                            <div class="form-group">
                                <label for="providerPrice">Precio Proveedor</label>
                                <input type="number" class="form-control" id="providerPrice" min="0.01" step="0.01" required>
                            </div>
                            <div class="form-group">
                                <label for="salePrice">Precio Venta</label>
                                <input type="number" class="form-control" id="salePrice" min="0.01" step="0.01" required>
                            </div>
                            <button type="submit" id="saveProduct" class="btn btn-success">Guardar</button>
                            <div id="error-message" style="color: red; display: none;">Por favor, complete todos los campos correctamente.</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


        <!-- Modal para Editar Producto -->
        <div class="modal fade" id="editProductModal" tabindex="-1" role="dialog" aria-labelledby="editProductModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editProductModalLabel">Editar Producto</h5>
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Cerrar">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="editProductForm">
                            <input type="hidden" id="editProductId">
                            <div class="form-group">
                                <label for="editBarCode">Bar Code</label>
                                <input type="text" class="form-control" id="editBarCode" required>
                            </div>
                            <div class="form-group">
                                <label for="editProductName">Nombre</label>
                                <input type="text" class="form-control" id="editProductName" required>
                            </div>
                            <div class="form-group">
                                <label for="editQuantity">Cantidad</label>
                                <input type="number" class="form-control" id="editQuantity" required>
                            </div>
                            <div class="form-group
                                <label for=" editProvider">Proveedor</label>
                                <input type="text" class="form-control" id="editProvider" required>
                            </div>
                            <div class="form-group">
                                <label for="editExpirationDate">Fecha de expiración</label>
                                <input type="date" class="form-control" id="editExpirationDate" required>
                            </div>
                            <div class="form-group">
                                <label for="editProviderPrice">Precio Proveedor</label>
                                <input type="number" class="form-control" id="editProviderPrice" required>
                            </div>
                            <div class="form-group">
                                <label for="editSalePrice">Precio Venta</label>
                                <input type="number" class="form-control" id="editSalePrice" required>
                            </div>
                            <button type="submit" id="EditProductBtn" class="btn btn-success">Actualizar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal para Confirmar Eliminación de Producto -->
        <div class="modal fade" id="deleteProductModal" tabindex="-1" role="dialog" aria-labelledby="deleteProductModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteProductModalLabel">Eliminar Producto</h5>
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Cerrar">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>¿Estás seguro de que deseas eliminar este producto?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary">Cancelar</button>
                        <button type="button" class="btn btn-danger" id="confirmDeleteProductBtn">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tabla de Usuarios -->
        <h2 class="mt-5">Tabla de Usuarios</h2>
        <button class="btn btn-primary mb-3" id="datos" data-toggle="modal" data-target="#addUserModal">Añadir Usuario</button>
        <table class="table table-bordered table-responsive-md" id="usersTable">
            <thead class="thead-dark">
                <tr>
                    <th class="text-center">Id</th>
                    <th class="text-center">Nombre</th>
                    <th class="text-center">Apellido</th>
                    <th class="text-center">Clave</th>
                    <th class="text-center">Teléfono</th>
                    <th class="text-center">Email</th>
                    <th class="text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <!-- Aquí irían las filas dinámicamente cargadas desde la base de datos -->
                <?php echo $t->getAllUsers(); ?>
            </tbody>
        </table>

        <!-- Modal para Añadir Usuario -->
        <div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="addUserModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addUserModalLabel">Añadir Usuario</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <form id="addUserForm" onsubmit="InsertUser(event)">
                            <div class="mb-3">
                                <label for="userName" class="form-label">Nombre</label>
                                <input type="text" class="form-control" name="nameUser" id="userName" required minlength="2" maxlength="20" placeholder="Ingrese nombre del usuario">
                            </div>
                            <div class="mb-3">
                                <label for="userLastName" class="form-label">Apellido</label>
                                <input type="text" class="form-control" name="lastName" id="userLastName" required minlength="2" maxlength="45" placeholder="Ingrese apellido del usuario">
                            </div>
                            <div class="mb-3">
                                <label for="userClue" class="form-label">Clave</label>
                                <input type="text" class="form-control" name="clueUser" id="userClue" required maxlength="45" placeholder="Ingrese la clave del usuario">
                            </div>
                            <div class="mb-3">
                                <label for="userPhone" class="form-label">Teléfono</label>
                                <input type="tel" class="form-control" name="phoneUser" id="userPhone" required pattern="[0-9]{10}" placeholder="Ingrese número de teléfono (10 dígitos)">
                            </div>
                            <div class="mb-3">
                                <label for="userEmail" class="form-label">Email</label>
                                <input type="email" class="form-control" name="emailUser" id="userEmail" required placeholder="Ingrese correo electrónico">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="submit" id="saveData" class="btn btn-success">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal para Editar Usuario -->
        <div class="modal fade" id="editUserModal" tabindex="-1" role="dialog" aria-labelledby="editUserModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editUserModalLabel">Editar Usuario</h5>
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Cerrar">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="editUserForm">
                            <input type="hidden" id="editUserId">
                            <div class="form-group">
                                <label for="editUserName">Nombre</label>
                                <input type="text" class="form-control" id="editUserName" required>
                            </div>
                            <div class="form-group">
                                <label for="editUserLastName">Apellido</label>
                                <input type="text" class="form-control" id="editUserLastName" required>
                            </div>
                            <div class="form-group">
                                <label for="editUserClue">Clave</label>
                                <input type="text" class="form-control" id="editUserClue" required>
                            </div>
                            <div class="form-group">
                                <label for="editUserPhone">Teléfono</label>
                                <input type="tel" class="form-control" id="editUserPhone" required>
                            </div>
                            <div class="form-group">
                                <label for="editUserEmail">Email</label>
                                <input type="email" class="form-control" id="editUserEmail" required>
                            </div>
                            <button type="submit" id="EditUserBtn" class="btn btn-success">Actualizar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal para Confirmar Eliminación de Usuario -->
        <div class="modal fade" id="deleteUserModal" tabindex="-1" role="dialog" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteUserModalLabel">Eliminar Usuario</h5>
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Cerrar">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>¿Estás seguro de que deseas eliminar este usuario?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-danger" id="confirmDeleteUserBtn">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts de Bootstrap y jQuery -->
    <script src="/user.js"></script>
    <script src="/product.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>

</html>