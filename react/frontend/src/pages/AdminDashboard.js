import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import '../App.css';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: 'main'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const ordersData = await apiService.getOrders();
      const itemsData = await apiService.getMenuItems();
      setOrders(ordersData);
      setMenuItems(itemsData);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    try {
      await apiService.addMenuItem(newItem);
      setNewItem({ name: '', description: '', price: '', category: 'main' });
      fetchData();
    } catch (err) {
      alert('Failed to add menu item');
    }
  };

  const handleDeleteMenuItem = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await apiService.deleteMenuItem(id);
        fetchData();
      } catch (err) {
        alert('Failed to delete menu item');
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await apiService.updateOrderStatus(orderId, newStatus);
      fetchData();
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  if (loading) return <div className="container"><div className="loading">Loading admin dashboard...</div></div>;

  return (
    <div className="container">
      <h1 className="page-title">⚙️ Admin Dashboard</h1>

      <div style={{ marginBottom: '20px', borderBottom: '2px solid #ff6b35' }}>
        <button
          onClick={() => setActiveTab('orders')}
          style={{
            background: activeTab === 'orders' ? '#ff6b35' : 'transparent',
            color: activeTab === 'orders' ? 'white' : '#333',
            border: 'none',
            padding: '12px 24px',
            cursor: 'pointer',
            fontSize: '16px',
            marginRight: '10px'
          }}
        >
          📦 Orders
        </button>
        <button
          onClick={() => setActiveTab('menu')}
          style={{
            background: activeTab === 'menu' ? '#ff6b35' : 'transparent',
            color: activeTab === 'menu' ? 'white' : '#333',
            border: 'none',
            padding: '12px 24px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          📋 Menu
        </button>
      </div>

      {activeTab === 'orders' && (
        <div>
          <h2>Recent Orders</h2>
          {orders.length === 0 ? (
            <p style={{ color: '#666' }}>No orders</p>
          ) : (
            <div>
              {orders.map(order => (
                <div key={order.id} className="card" style={{ marginBottom: '15px', padding: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div>
                      <strong>Order #{order.id}</strong>
                      <p style={{ color: '#666', fontSize: '14px' }}>
                        Customer: {order.customer_name} | Phone: {order.customer_phone}
                      </p>
                    </div>
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                      style={{ padding: '8px' }}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="preparing">Preparing</option>
                      <option value="ready">Ready</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <p style={{ color: '#666', fontSize: '14px' }}>
                    <strong>Total:</strong> ${order.total.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'menu' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            <div>
              <h2>Add Menu Item</h2>
              <form onSubmit={handleAddMenuItem} className="card" style={{ padding: '20px' }}>
                <div style={{ marginBottom: '15px' }}>
                  <label>Item Name</label>
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    required
                    style={{ width: '100%', display: 'block', marginTop: '5px' }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label>Description</label>
                  <textarea
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    required
                    style={{ width: '100%', display: 'block', marginTop: '5px', minHeight: '80px' }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label>Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    required
                    style={{ width: '100%', display: 'block', marginTop: '5px' }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label>Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    style={{ width: '100%', display: 'block', marginTop: '5px' }}
                  >
                    <option value="main">Main Course</option>
                    <option value="appetizer">Appetizer</option>
                    <option value="dessert">Dessert</option>
                    <option value="beverage">Beverage</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                  Add Item
                </button>
              </form>
            </div>

            <div>
              <h2>Menu Items</h2>
              {menuItems.map(item => (
                <div key={item.id} className="card" style={{ marginBottom: '15px', padding: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <h4>{item.name}</h4>
                      <p style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>
                        {item.description}
                      </p>
                      <p style={{ fontWeight: 'bold', color: '#ff6b35' }}>
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteMenuItem(item.id)}
                      className="btn-secondary"
                      style={{ padding: '5px 10px' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
