<?php
class Database {
    private $db_host;
    private $db_name;
    private $db_user;
    private $db_password;
    private $conn;

    public function __construct($config) {
        $this->db_host = $config['db_host'];
        $this->db_name = $config['db_name'];
        $this->db_user = $config['db_user'];
        $this->db_password = $config['db_password'];
    }

    public function connect() {
        $this->conn = new mysqli(
            $this->db_host,
            $this->db_user,
            $this->db_password,
            $this->db_name
        );

        if ($this->conn->connect_error) {
            die('Database connection failed: ' . $this->conn->connect_error);
        }

        return $this->conn;
    }

    public function query($sql) {
        return $this->conn->query($sql);
    }

    public function prepare($sql) {
        return $this->conn->prepare($sql);
    }

    public function getLastId() {
        return $this->conn->insert_id;
    }
}
