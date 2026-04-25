import React from 'react';
import './MenuItem.css';

function MenuItem({ item, onAddToCart }) {
  return (
    <div className="menu-item card">
      <div className="card-image">🍔 {item.name}</div>
      <div className="card-body">
        <h3 className="card-title">{item.name}</h3>
        <p className="card-description">{item.description}</p>
        <div className="card-price">${item.price.toFixed(2)}</div>
        <button
          className="btn-primary"
          onClick={() => onAddToCart(item)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default MenuItem;
