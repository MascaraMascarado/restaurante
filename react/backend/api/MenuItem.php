<?php
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/Response.php';

class MenuItem {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function getAll() {
        $sql = "SELECT * FROM menu_items WHERE is_active = 1 ORDER BY created_at DESC";
        $result = $this->conn->query($sql);
        
        $items = [];
        while ($row = $result->fetch_assoc()) {
            $items[] = $row;
        }
        return $items;
    }

    public function getById($id) {
        $sql = "SELECT * FROM menu_items WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function create($data) {
        $sql = "INSERT INTO menu_items (name, description, price, category, is_active) 
                VALUES (?, ?, ?, ?, 1)";
        $stmt = $this->conn->prepare($sql);
        
        if (!$stmt) {
            sendError("SQL Error: " . $this->conn->error);
        }

        $stmt->bind_param(
            "ssds",
            $data['name'],
            $data['description'],
            $data['price'],
            $data['category']
        );

        if ($stmt->execute()) {
            return $this->conn->insert_id;
        }
        sendError("Failed to create menu item");
    }

    public function update($id, $data) {
        $sql = "UPDATE menu_items SET name = ?, description = ?, price = ?, category = ? 
                WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        
        if (!$stmt) {
            sendError("SQL Error: " . $this->conn->error);
        }

        $stmt->bind_param(
            "ssdsi",
            $data['name'],
            $data['description'],
            $data['price'],
            $data['category'],
            $id
        );

        return $stmt->execute();
    }

    public function delete($id) {
        $sql = "UPDATE menu_items SET is_active = 0 WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
}
