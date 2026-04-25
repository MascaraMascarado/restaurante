<?php
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/Response.php';

class Order {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function getAll() {
        $sql = "SELECT * FROM orders ORDER BY created_at DESC LIMIT 100";
        $result = $this->conn->query($sql);
        
        $orders = [];
        while ($row = $result->fetch_assoc()) {
            $row['items'] = $this->getOrderItems($row['id']);
            $orders[] = $row;
        }
        return $orders;
    }

    public function getById($id) {
        $sql = "SELECT * FROM orders WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        
        $order = $stmt->get_result()->fetch_assoc();
        if ($order) {
            $order['items'] = $this->getOrderItems($id);
        }
        return $order;
    }

    public function create($data) {
        $sql = "INSERT INTO orders (customer_name, customer_email, customer_phone, address, payment_method, total, status) 
                VALUES (?, ?, ?, ?, ?, ?, 'pending')";
        $stmt = $this->conn->prepare($sql);
        
        if (!$stmt) {
            sendError("SQL Error: " . $this->conn->error);
        }

        $stmt->bind_param(
            "sssssd",
            $data['customerName'],
            $data['customerEmail'],
            $data['customerPhone'],
            $data['address'],
            $data['paymentMethod'],
            $data['total']
        );

        if ($stmt->execute()) {
            $orderId = $this->conn->insert_id;
            
            // Save order items
            if (isset($data['items']) && is_array($data['items'])) {
                foreach ($data['items'] as $item) {
                    $this->addOrderItem($orderId, $item);
                }
            }
            
            return $orderId;
        }
        sendError("Failed to create order");
    }

    public function addOrderItem($orderId, $item) {
        $sql = "INSERT INTO order_items (order_id, item_id, name, price, quantity) 
                VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        
        $quantity = isset($item['quantity']) ? $item['quantity'] : 1;
        $stmt->bind_param(
            "iisdi",
            $orderId,
            $item['id'],
            $item['name'],
            $item['price'],
            $quantity
        );
        
        return $stmt->execute();
    }

    public function getOrderItems($orderId) {
        $sql = "SELECT * FROM order_items WHERE order_id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $orderId);
        $stmt->execute();
        
        $items = [];
        $result = $stmt->get_result();
        while ($row = $result->fetch_assoc()) {
            $items[] = $row;
        }
        return $items;
    }

    public function updateStatus($id, $status) {
        $sql = "UPDATE orders SET status = ? WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("si", $status, $id);
        return $stmt->execute();
    }
}
