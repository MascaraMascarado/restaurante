<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/Response.php';
require_once __DIR__ . '/MenuItem.php';
require_once __DIR__ . '/Order.php';

$config = include __DIR__ . '/../config/config.php';
$database = new Database($config);
$conn = $database->connect();

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$pathParts = explode('/', trim($path, '/'));

// Extract endpoint from URL
$endpoint = isset($pathParts[4]) ? $pathParts[4] : '';
$resource = isset($pathParts[5]) ? $pathParts[5] : '';
$id = isset($pathParts[6]) ? $pathParts[6] : null;

// Get request body
$input = json_decode(file_get_contents('php://input'), true);

// Route requests
switch ($endpoint) {
    case 'menu':
        handleMenuRequests($conn, $method, $id, $input);
        break;
    case 'orders':
        handleOrderRequests($conn, $method, $id, $input);
        break;
    default:
        sendError('Endpoint not found', 404);
}

function handleMenuRequests($conn, $method, $id, $input) {
    $menu = new MenuItem($conn);
    
    switch ($method) {
        case 'GET':
            if ($id) {
                $item = $menu->getById($id);
                if ($item) {
                    sendResponse(true, $item);
                } else {
                    sendError('Menu item not found', 404);
                }
            } else {
                $items = $menu->getAll();
                sendResponse(true, $items);
            }
            break;
            
        case 'POST':
            if (!isset($input['name']) || !isset($input['price'])) {
                sendError('Missing required fields: name, price');
            }
            $itemId = $menu->create($input);
            sendResponse(true, ['id' => $itemId], 'Menu item created successfully');
            break;
            
        case 'PUT':
            if (!$id) {
                sendError('ID is required for update');
            }
            $menu->update($id, $input);
            sendResponse(true, null, 'Menu item updated successfully');
            break;
            
        case 'DELETE':
            if (!$id) {
                sendError('ID is required for delete');
            }
            $menu->delete($id);
            sendResponse(true, null, 'Menu item deleted successfully');
            break;
            
        default:
            sendError('Method not allowed', 405);
    }
}

function handleOrderRequests($conn, $method, $id, $input) {
    $order = new Order($conn);
    
    switch ($method) {
        case 'GET':
            if ($id) {
                $orderData = $order->getById($id);
                if ($orderData) {
                    sendResponse(true, $orderData);
                } else {
                    sendError('Order not found', 404);
                }
            } else {
                $orders = $order->getAll();
                sendResponse(true, $orders);
            }
            break;
            
        case 'POST':
            if (!isset($input['customerName']) || !isset($input['address'])) {
                sendError('Missing required fields');
            }
            $orderId = $order->create($input);
            sendResponse(true, ['id' => $orderId], 'Order created successfully');
            break;
            
        case 'PUT':
            if (!$id) {
                sendError('ID is required for update');
            }
            if (isset($input['status'])) {
                $order->updateStatus($id, $input['status']);
                sendResponse(true, null, 'Order status updated successfully');
            } else {
                sendError('Status is required');
            }
            break;
            
        default:
            sendError('Method not allowed', 405);
    }
}
