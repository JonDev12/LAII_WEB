<?php

class Connection{
    private $con;
    
    public function __construct() {
        $this->con = new mysqli('localhost', 'root', 'sixvegas12', 'laii_bd');
        
        if ($this->con->connect_error) {
            die("Connection failed: " . $this->con->connect_error);
        }
    }
    
    public function getConnection() {
        return $this->con;
    }
}

