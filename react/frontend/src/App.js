import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateCartQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  return (
    <Router>
      <Navbar cartCount={cart.length} user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu onAddToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cart}
              onRemoveFromCart={removeFromCart}
              onUpdateQuantity={updateCartQuantity}
            />
          }
        />
        <Route
          path="/checkout"
          element={<Checkout cartItems={cart} onCheckout={() => setCart([])} />}
        />
        <Route path="/orders" element={<Orders user={user} />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
