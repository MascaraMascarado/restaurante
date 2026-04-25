# Online Restaurant System

A complete full-stack application for managing an online restaurant with menu ordering, shopping cart, and order management.

## Project Structure

```
restaurant/
├── frontend/          # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── App.js
│   └── package.json
├── backend/           # PHP backend API
│   ├── api/           # API endpoints and models
│   ├── config/        # Database configuration
│   └── index.php
└── database/          # Database schema
    └── schema.sql
```

## Features

### Frontend (React)
- 🏠 Home page with restaurant branding
- 📋 Menu browsing with categories
- 🛒 Shopping cart management
- 💳 Checkout with customer information
- 📦 Order tracking
- ⚙️ Admin dashboard for managing menu and orders

### Backend (PHP)
- RESTful API endpoints
- MySQL database integration
- Menu management (CRUD operations)
- Order management with status tracking
- Order items tracking

## Installation

### Prerequisites
- Node.js and npm (for frontend)
- PHP 7.4+ (for backend)
- MySQL 5.7+ (for database)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Update the database configuration in `backend/config/config.php`:
```php
'db_host' => 'localhost',
'db_name' => 'restaurant_db',
'db_user' => 'root',
'db_password' => 'your_password',
```

2. Create the database and import the schema:
```bash
mysql -u root -p < database/schema.sql
```

3. Start a PHP server:
```bash
cd backend
php -S localhost:8000
```

The API will be available at `http://localhost:8000/api`

## API Endpoints

### Menu Endpoints
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get a specific menu item
- `POST /api/menu` - Create a new menu item (admin)
- `PUT /api/menu/:id` - Update a menu item (admin)
- `DELETE /api/menu/:id` - Delete a menu item (admin)

### Order Endpoints
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get a specific order
- `POST /api/orders` - Create a new order
- `PUT /api/orders/:id` - Update order status (admin)

## Usage

1. **Browsing Menu**: Navigate to the Menu page to see all available dishes
2. **Adding to Cart**: Click "Add to Cart" on any menu item
3. **Checkout**: Go to the Cart page and click "Proceed to Checkout"
4. **Placing Order**: Fill in delivery information and place the order
5. **Tracking Orders**: Visit the Orders page to see your orders
6. **Admin Management**: Access the Admin Dashboard to manage menu items and order statuses

## Technologies Used

### Frontend
- React 18
- React Router DOM
- Axios (HTTP client)
- CSS3

### Backend
- PHP 7.4+
- MySQL/MySQLi
- RESTful API design

## Configuration

Update `backend/config/config.php` to match your environment:

```php
'db_host' => 'localhost',        // Database host
'db_name' => 'restaurant_db',    // Database name
'db_user' => 'root',             // Database user
'db_password' => '',             // Database password
'api_url' => 'http://localhost:8000'  // API URL
```

Update the API URL in `frontend/src/services/apiService.js` if needed:

```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

## Security Notes

- Use HTTPS in production
- Implement proper authentication and authorization
- Sanitize all user inputs
- Use environment variables for sensitive configuration
- Add CSRF protection
- Implement rate limiting
- Add input validation on both frontend and backend

## Future Enhancements

- User authentication and registration
- Payment gateway integration
- Email notifications
- Review and ratings system
- Delivery tracking with GPS
- Mobile app
- Multi-language support
- Advanced analytics

## License

MIT License

## Support

For support, please create an issue in the repository.
