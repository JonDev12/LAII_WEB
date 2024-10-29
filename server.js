const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sixvegas12',
    database: 'laii_bd'
});

// Verificar conexión a la base de datos
connection.connect(error => {
    if (error) {
        console.error('Error de conexión a la base de datos:', error);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta genérica home
app.get('/', (req, res) => {
    try {
        // Aquí puedes agregar lógica si necesitas interactuar con la base de datos o realizar algún proceso.
        console.log('Home obtenido');
        res.json({ message: 'Bienvenido a la página de inicio' });
    } catch (error) {
        console.error('Error al obtener home:', error.message);
        res.status(500).json({ message: 'Error al obtener home', error: error.message });
    }
});

// Ruta para obtener productos
app.get('/api/products', (req, res) => {
    console.log('Recibiendo solicitud para obtener productos');
    connection.query('SELECT * FROM products', (error, results) => {
        if (error) {
            console.log('Error al obtener productos:', error.message);
            return res.status(500).send(error.message);
        }
        console.log('Productos obtenidos:', results);
        res.json(results);
    });
});

// Ruta para crear un producto
app.post('/api/products', (req, res) => {
    console.log('Recibiendo solicitud para crear un producto:', req.body);
    const { Bar_code, name, Quantity, Provider, expire_date, prov_price, sell_price } = req.body;
    const query = `INSERT INTO products (Bar_code, name, Quantity, Provider, expire_date, prov_price, sell_price) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    connection.query(query, [Bar_code, name, Quantity, Provider, expire_date, prov_price, sell_price], (error, results) => {
        if (error) {
            console.error('Error al crear producto:', error.message);
            return res.status(500).send(error.message);
        }
        console.log('Producto creado:', results);
        res.json({ message: 'Producto creado', id: results.insertId });
    });
});

// Ruta para actualizar un producto
app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    console.log(`Recibiendo solicitud para actualizar el producto con id: ${id}`, req.body);
    const { Bar_code, name, Quantity, Provider, expire_date, prov_price, sell_price } = req.body;
    const query = `UPDATE products SET Bar_code = ?, name = ?, Quantity = ?, Provider = ?, expire_date = ?, prov_price = ?, sell_price = ? WHERE IdProduct = ?`;

    connection.query(query, [Bar_code, name, Quantity, Provider, expire_date, prov_price, sell_price, id], (error) => {
        if (error) {
            console.log('Error al actualizar producto:', error.message);
            return res.status(500).send(error.message);
        }
        console.log(`Producto con id ${id} actualizado`);
        res.json({ message: 'Producto actualizado' });
    });
});

// Ruta para eliminar un producto
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    console.log(`Recibiendo solicitud para eliminar el producto con id: ${id}`);
    connection.query('DELETE FROM products WHERE IdProduct = ?', [id], (error) => {
        if (error) {
            console.log('Error al eliminar producto:', error.message);
            return res.status(500).send(error.message);
        }
        console.log(`Producto con id ${id} eliminado`);
        res.json({ message: 'Producto eliminado' });
    });
});

//Funcion para obtener un producto por su codigo de barras
app.get('/api/products/:barcode', (req, res) => {
    const { barcode } = req.params;
    console.log(`Recibiendo solicitud para obtener el producto con código de barras: ${barcode}`);

    connection.query('SELECT * FROM products WHERE Bar_code = ?', [barcode], (error, results) => {
        if (error) {
            console.log('Error al obtener producto:', error.message);
            return res.status(500).send(error.message);
        }

        if (results.length === 0) {
            console.log('No se encontró ningún producto con el código de barras:', barcode);
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        console.log('Producto obtenido:', results[0]);
        res.json({ 
            name: results[0].name,
            sell_price: results[0].sell_price
        });
    });
});


// CRUD para la tabla users

// Ruta para obtener usuarios
app.get('/api/users', (req, res) => {
    console.log('Recibiendo solicitud para obtener usuarios');
    connection.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.log('Error al obtener usuarios:', error.message);
            return res.status(500).send(error.message);
        }
        console.log('Usuarios obtenidos:', results);
        res.json(results);
    });
});

// Ruta para crear un usuario
app.post('/api/users2', (req, res) => {
    console.log('Recibiendo solicitud para crear un usuario:', req.body);
    const { Name, LastName, clue, phone, email } = req.body;
    const query = `INSERT INTO users (Name, LastName, clue, phone, email) VALUES (?, ?, ?, ?, ?)`;

    connection.query(query, [Name, LastName, clue, phone, email], (error, results) => {
        if (error) {
            console.log('Error al crear usuario:', error.message);
            return res.status(500).send(error.message);
        }
        console.log('Usuario creado:', results);
        res.json({ message: 'Usuario creado', id: results.insertId });
    });
});

// Ruta para actualizar un usuario
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    console.log(`Recibiendo solicitud para actualizar el usuario con id: ${id}`, req.body);
    const { Name, LastName, clue, phone, email } = req.body;
    const query = `UPDATE users SET Name = ?, LastName = ?, clue = ?, phone = ?, email = ? WHERE IdUsers = ?`;

    connection.query(query, [Name, LastName, clue, phone, email, id], (error) => {
        if (error) {
            console.log('Error al actualizar usuario:', error.message);
            return res.status(500).send(error.message);
        }
        console.log(`Usuario con id ${id} actualizado`);
        res.json({ message: 'Usuario actualizado' });
    });
});

// Ruta para eliminar un usuario
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    console.log(`Recibiendo solicitud para eliminar el usuario con id: ${id}`);
    connection.query('DELETE FROM users WHERE IdUsers = ?', [id], (error) => {
        if (error) {
            console.log('Error al eliminar usuario:', error.message);
            return res.status(500).send(error.message);
        }
        console.log(`Usuario con id ${id} eliminado`);
        res.json({ message: 'Usuario eliminado' });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// CRUD de Verificacion de login de usuario

// Ruta de verificacion de login de usuario
app.post('/api/login', (req, res) => {
    console.log('Recibiendo solicitud para verificar login de usuario:', req.body);
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ success: false, message: 'Missing username or password' });
    }

    const query = `SELECT * FROM users WHERE Name = ? AND Password = ?`; // Asegúrate de que los nombres de las columnas son correctos

    connection.query(query, [name, password], (error, results) => {
        if (error) {
            console.log('Error al verificar login de usuario:', error.message);
            return res.status(500).send(error.message);
        }

        if (results.length === 0) {
            console.log('Usuario o contraseña incorrectos');
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        console.log('Usuario encontrado:', results[0]);
        res.json({ success: true, message: 'Login successful', user: results[0] });
    });
});
