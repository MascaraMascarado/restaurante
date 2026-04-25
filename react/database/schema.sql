-- Restaurant Management System Database Schema

CREATE DATABASE IF NOT EXISTS restaurant_db;
USE restaurant_db;

-- Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'main',
    is_active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Order Items Table (Line Items)
CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    item_id INT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample Data
INSERT INTO menu_items (name, description, price, category) VALUES
('Margherita Pizza', 'Classic pizza with tomato, mozzarella, and basil', 12.99, 'main'),
('Caesar Salad', 'Fresh greens with parmesan and croutons', 8.99, 'appetizer'),
('Spaghetti Carbonara', 'Pasta with bacon, eggs, and cheese', 13.99, 'main'),
('Chocolate Cake', 'Rich chocolate dessert with ganache', 6.99, 'dessert'),
('Iced Tea', 'Refreshing cold iced tea', 2.99, 'beverage'),
('Garlic Bread', 'Crispy bread with garlic butter', 4.99, 'appetizer'),
('Grilled Chicken Breast', 'Tender chicken with herbs', 14.99, 'main'),
('Tiramisu', 'Classic Italian tiramisu', 7.99, 'dessert');

-- Create Indexes for better performance
CREATE INDEX idx_order_status ON orders(status);
CREATE INDEX idx_order_created_at ON orders(created_at);
CREATE INDEX idx_menu_category ON menu_items(category);
CREATE INDEX idx_menu_active ON menu_items(is_active);
