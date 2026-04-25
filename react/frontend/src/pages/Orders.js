import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import '../App.css';

function Orders({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await apiService.getOrders();
      setOrders(data);
    } catch (err) {
      setError('Failed to load orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container"><div className="loading">Loading orders...</div></div>;

  return (
    <div className="container">
      <h1 className="page-title">📦 My Orders</h1>
      {error && <div className="error-message">{error}</div>}
      {orders.length === 0 ? (
        <div className="empty-state">
          <h2>No orders yet</h2>
          <p>Start ordering from our menu!</p>
        </div>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order.id} className="card" style={{ marginBottom: '20px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <div>
                  <h3>Order #{order.id}</h3>
                  <p style={{ color: '#666', fontSize: '14px' }}>
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      backgroundColor: order.status === 'delivered' ? '#efe' : '#ffd',
                      color: order.status === 'delivered' ? '#3c3' : '#996',
                      padding: '5px 15px',
                      borderRadius: '20px',
                      fontWeight: 'bold'
                    }}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <div style={{ marginBottom: '15px' }}>
                {order.items && order.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '14px', marginBottom: '5px' }}>
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid #eee', paddingTop: '15px', textAlign: 'right' }}>
                <strong style={{ fontSize: '18px' }}>Total: ${order.total.toFixed(2)}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
