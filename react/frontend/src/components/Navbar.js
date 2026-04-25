import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ cartCount, user }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🍽️ Restaurant
        </Link>
        <div className="nav-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/menu" className="nav-link">
            Menu
          </Link>
          <Link to="/orders" className="nav-link">
            Orders
          </Link>
          <Link to="/admin" className="nav-link">
            Admin
          </Link>
          <Link to="/cart" className="nav-link cart-link">
            🛒 Cart ({cartCount})
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
