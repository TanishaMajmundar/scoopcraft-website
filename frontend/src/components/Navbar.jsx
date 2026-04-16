import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout, cartCount } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-brand">
          <span className="brand-emoji">🍦</span>
          <span className="brand-name">Mithas</span>
          <span className="brand-tagline">मिठास</span>
        </Link>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/products" className={location.pathname === '/products' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Menu</Link>
          {user && <Link to="/orders" className={location.pathname === '/orders' ? 'active' : ''} onClick={() => setMenuOpen(false)}>My Orders</Link>}
        </div>

        <div className="navbar-right">
          <Link to="/cart" className="cart-btn">
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {user ? (
            <div className="user-menu">
              <span className="user-greeting">Namaste, {user.name.split(' ')[0]}! 🙏</span>
              <button className="btn-secondary" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login"><button className="btn-secondary">Login</button></Link>
              <Link to="/register"><button className="btn-primary">Join Us</button></Link>
            </div>
          )}

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </nav>
  );
}
