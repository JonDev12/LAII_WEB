<?php

require_once 'Connection.php';

class TableProducts
{

    private $con;

    public function __construct()
    {
        $this->con = new Connection();
    }

    public function getAllProducts(): string
    {
        $conn = $this->con->getConnection();
        $sql = "SELECT * FROM products";
        $result = $conn->query($sql);

        if ($result === false) {
            die("Error: {$conn->error}");
        } else {
            $html = "";
            while ($row = $result->fetch_assoc()) {
                $html .= "<tr>";
                $html .= "<th scope='row' class='text-center'>{$row['IdProduct']}</th>";
                $html .= "<td class='text-center'>{$row['Bar_code']}</td>";
                $html .= "<td class='text-center'>{$row['name']}</td>";
                $html .= "<td class='text-center'>{$row['Quantity']}</td>";
                $html .= "<td class='text-center'>{$row['Provider']}</td>";
                $html .= "<td class='text-center'>{$row['expire_date']}</td>";
                $html .= "<td class='text-center'>{$row['prov_price']}</td>";
                $html .= "<td class='text-center'>{$row['sell_price']}</td>";
                $html .= "<td class='text-center'>
                            
                            <a class='btn btn-primary btn-sm' 
                                data-bs-toggle='modal' 
                                data-bs-target='#editProductModal'
                                onclick='GetProduct(this)'
                                data-id='{$row['IdProduct']}'
                                data-bar_code='{$row['Bar_code']}'
                                data-name='{$row['name']}'
                                data-quantity='{$row['Quantity']}'
                                data-provider='{$row['Provider']}'
                                data-expire_date='{$row['expire_date']}'
                                data-prov_price='{$row['prov_price']}'
                                data-sell_price='{$row['sell_price']}'>Editar</a>
                            <a class='btn btn-danger btn-sm'
                                onclick='DeleteProduct(this)' 
                                data-bs-toggle='modal' 
                                data-bs-target='#deleteProductModal'
                                data-id='{$row['IdProduct']}'
                                >Eliminar</a>
                        </td>";
                $html .= "</tr>";
            }
            $conn->close();
            return $html;
        }
    }
}
