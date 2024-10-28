function InsertUser(event) {
    event.preventDefault();  // Evita que el formulario se envíe de manera predeterminada

    const saveButton = document.getElementById('saveData');
    saveButton.disabled = true;  // Deshabilita el botón para evitar múltiples envíos

    // Captura los datos de los campos
    const name = document.getElementById('userName').value.trim();
    const lastName = document.getElementById('userLastName').value.trim();
    const clue = document.getElementById('userClue').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    const email = document.getElementById('userEmail').value.trim();

    if (name && lastName && clue && phone && email) {
        console.log('Enviando datos:', { name, lastName, clue, phone, email });

        // Aquí iría el código para hacer la solicitud al servidor
        fetch(`http://localhost:5000/api/users2`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: name, 
                LastName: lastName, // Corrección aquí
                clue: clue, 
                phone: phone, 
                email: email
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Usuario actualizado:', data);
            location.reload();  // Recarga la página después de la actualización
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
            saveButton.disabled = false;  // Reactivar el botón en caso de error
        });

        // Cerrar el modal si todo es exitoso
        const modal = new bootstrap.Modal(document.getElementById('addUserModal'));
        modal.hide();
    } else {
        console.log('Campos vacíos');
        saveButton.disabled = false;  // Reactivar el botón en caso de error
    }
}

function GetInfo(button){
    console.log('Recibiendo datos');
    var id = button.getAttribute('data-id');
    var name = button.getAttribute('data-name');
    var lastname = button.getAttribute('data-lastname');
    var clue = button.getAttribute('data-clue');
    var phone = button.getAttribute('data-phone');
    var email = button.getAttribute('data-email');
    console.log( id, name, lastname, clue, phone, email);

    console.log('Seteando datos');
    document.getElementById('editUserId').value = id;
    document.getElementById('editUserName').value = name;
    document.getElementById('editUserLastName').value = lastname;
    document.getElementById('editUserClue').value = clue;
    document.getElementById('editUserPhone').value = phone;
    document.getElementById('editUserEmail').value = email;
    
    var updateuser = document.getElementById('EditUserBtn').addEventListener('click', function(){
        console.log('Actualizando datos de usuario con id', id);
        var id = document.getElementById('editUserId').value;
        var name = document.getElementById('editUserName').value;
        var lastname = document.getElementById('editUserLastName').value;
        var clue = document.getElementById('editUserClue').value;
        var phone = document.getElementById('editUserPhone').value;
        var email = document.getElementById('editUserEmail').value;

        fetch(`http://localhost:5000/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({Name: name, LastName: lastname, clue: clue, phone: phone, email: email})
        })
        .then(response => response.json())
        .then(data => {
            console.log('Usuario actualizado:', data);
            location.reload();
        })
    });
}

function DeleteUser(button){
    console.log('Recibiendo datos');
    var id = button.getAttribute('data-id');
    var confirmdelete = document.getElementById('confirmDeleteUserBtn').addEventListener('click', function(){
        console.log('Eliminando datos de usuario con id', id)
        fetch(`http://localhost:5000/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Usuario eliminado:', data);
            location.reload();
        })
    }
)};

function fetchUser() {
    document.getElementById('btnLogin').addEventListener('click', function() {
        var user = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        fetch(`http://localhost:5000/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: user, password: password })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Login successful:', data);
            // Aquí puedes agregar lógica adicional después de un inicio de sesión exitoso
        })
        .catch(error => {
            console.error('Error during login:', error);
        });
    });
}