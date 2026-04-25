import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
  return (
    <div className="container">
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#333' }}>
          🍽️ Welcome to Our Restaurant
        </h1>
        <p style={{ fontSize: '20px', color: '#666', marginBottom: '30px' }}>
          Order your favorite dishes online and enjoy fast delivery!
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/menu">
            <button className="btn-primary" style={{ fontSize: '18px', padding: '15px 40px' }}>
              📋 View Menu
            </button>
          </Link>
          <Link to="/orders">
            <button className="btn-secondary" style={{ fontSize: '18px', padding: '15px 40px' }}>
              📦 Track Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
