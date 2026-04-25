import React, { useState, useEffect } from 'react';
import MenuItem from '../components/MenuItem';
import apiService from '../services/apiService';
import '../App.css';

function Menu({ onAddToCart }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const data = await apiService.getMenuItems();
      setItems(data);
    } catch (err) {
      setError('Failed to load menu items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container"><div className="loading">Loading menu...</div></div>;
  if (error) return <div className="container"><div className="error-message">{error}</div></div>;

  return (
    <div className="container">
      <h1 className="page-title">📋 Menu</h1>
      {items.length === 0 ? (
        <div className="empty-state">
          <h2>No items available</h2>
          <p>Please check back later!</p>
        </div>
      ) : (
        <div className="grid">
          {items.map(item => (
            <MenuItem
              key={item.id}
              item={item}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
