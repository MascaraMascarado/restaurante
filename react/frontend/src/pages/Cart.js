import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Cart({ cartItems, onRemoveFromCart, onUpdateQuantity }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <h1 className="page-title">🛒 Shopping Cart</h1>
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Start adding items to your order!</p>
          <Link to="/menu">
            <button className="btn-primary">Continue Shopping</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">🛒 Shopping Cart</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {cartItems.map(item => (
          <div
            key={item.id}
            className="card"
            style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', padding: '15px' }}
          >
            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: '5px' }}>{item.name}</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>${item.price.toFixed(2)}</p>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                style={{ padding: '5px 10px', width: '40px' }}
              >
                −
              </button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                style={{ width: '50px', textAlign: 'center' }}
                min="1"
              />
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                style={{ padding: '5px 10px', width: '40px' }}
              >
                +
              </button>
              <span style={{ width: '80px', textAlign: 'right', fontWeight: 'bold' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => onRemoveFromCart(item.id)}
                className="btn-secondary"
                style={{ padding: '5px 10px' }}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        <div className="card" style={{ padding: '20px', marginTop: '20px', textAlign: 'right' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>
            Total: ${total.toFixed(2)}
          </h2>
          <Link to="/checkout">
            <button className="btn-primary" style={{ fontSize: '18px', padding: '15px 40px', width: '100%' }}>
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
