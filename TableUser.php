<?php

require_once 'Connection.php';

class TableUser
{

    private $con;
    private $API = "";
    private $id;
    private $name;
    private $lastname;
    private $clue;
    private $phone;
    private $email;

    public function __construct()
    {
        $this->con = new Connection();
        $this->API = "http://localhost:5000/"; 
        $this->id = "";
        $this->name = "";
        $this->lastname = "";
        $this->clue = "";
        $this->phone = "";
        $this->email = "";
    }

    public function getAllUsers(): string
    {
        $conn = $this->con->getConnection();
        $sql = "SELECT * FROM users";
        $result = $conn->query($sql);

        if ($result === false) {
            die("Error: {$conn->error}");
        } else {
            $html = "";
            while ($row = $result->fetch_assoc()) {
                $html .= "<tr>";
                $html .= "<th scope='row' class='text-center'>{$row['IdUsers']}</th>";
                $html .= "<td class='text-center'>{$row['Name']}</td>";
                $html .= "<td class='text-center'>{$row['LastName']}</td>";
                $html .= "<td class='text-center'>{$row['clue']}</td>";
                $html .= "<td class='text-center'>{$row['phone']}</td>";
                $html .= "<td class='text-center'>{$row['email']}</td>";;
                $html .= "<td class='text-center'>
                            <!--href='delete_user.php?id={$row['IdUsers']}'-->
                            <a class='btn btn-primary btn-sm'
                                onclick='GetInfo(this)' 
                                data-bs-toggle='modal' 
                                data-bs-target='#editUserModal'
                                data-id='{$row['IdUsers']}'
                                data-name='{$row['Name']}'
                                data-lastname='{$row['LastName']}'
                                data-clue='{$row['clue']}'
                                data-phone='{$row['phone']}'
                                data-email='{$row['email']}'>
                                Editar
                                </a>
                            <a class='btn btn-danger btn-sm'
                                onclick='DeleteUser(this)'
                                data-bs-toggle='modal' 
                                data-bs-target='#deleteUserModal'
                                data-id='{$row['IdUsers']}'>Eliminar</a>
                        </td>";
                $html .= "</tr>";
            }
            $conn->close();
            return $html;
        }
    }

    public function InsertUser(){
        if($_SERVER["REQUEST_METHOD"] == "POST"){
            $this->API = "http://localhost:5000/api/users2";

            $data = array(
                'Name' => $_POST['nameUser'],
                'LastName' => $_POST['lastName'],
                'clue' => $_POST['clueUser'],
                'phone' => $_POST['phoneUser'],
                'email' => $_POST['emailUser']
            );

            $json_data = json_encode($data);
            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, $this->API);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            $response = curl_exec($ch);
            // Verifica si hay errores en la solicitud
            if (curl_errno($ch)) {
                echo 'Error en cURL: ' . curl_error($ch);
            } else {
                // Procesa la respuesta (si es JSON, decodifícalo)
                $data = json_decode($response, true);
                print_r($data); // Muestra la respuesta de la API
            }
        
            // Cierra la sesión de cURL
            curl_close($ch);
        }
    }
}
