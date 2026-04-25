import React, { useState } from 'react';
import apiService from '../services/apiService';
import '../App.css';

function Checkout({ cartItems, onCheckout }) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    address: '',
    paymentMethod: 'cash'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        ...formData,
        items: cartItems,
        total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      };
      await apiService.createOrder(orderData);
      setMessage({ type: 'success', text: 'Order placed successfully!' });
      onCheckout();
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        address: '',
        paymentMethod: 'cash'
      });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to place order. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h1 className="page-title">💳 Checkout</h1>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {message && (
          <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="card" style={{ padding: '30px' }}>
          <h2 style={{ marginBottom: '20px' }}>Delivery Information</h2>

          <div style={{ marginBottom: '15px' }}>
            <label>Full Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              required
              style={{ width: '100%', display: 'block', marginTop: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Email</label>
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleInputChange}
              required
              style={{ width: '100%', display: 'block', marginTop: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Phone Number</label>
            <input
              type="tel"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleInputChange}
              required
              style={{ width: '100%', display: 'block', marginTop: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Delivery Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              style={{ width: '100%', display: 'block', marginTop: '5px', minHeight: '100px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              style={{ width: '100%', display: 'block', marginTop: '5px' }}
            >
              <option value="cash">Cash on Delivery</option>
              <option value="card">Credit Card</option>
              <option value="online">Online Payment</option>
            </select>
          </div>

          <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
            <h3>Order Summary</h3>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #ddd', paddingTop: '10px', marginTop: '10px', fontWeight: 'bold', fontSize: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading || cartItems.length === 0}
            style={{ width: '100%', padding: '15px', fontSize: '18px', fontWeight: 'bold' }}
          >
            {loading ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
