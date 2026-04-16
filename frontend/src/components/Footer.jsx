import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">🍦 Mithas</span>
          <p>India ka sabse pyaara ice cream! Made with love and fresh ingredients.</p>
          <div className="social-links">
            <span>📸 Instagram</span>
            <span>📘 Facebook</span>
            <span>🐦 Twitter</span>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/products">Our Menu</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>📞 +91 98765 43210</p>
          <p>✉️ hello@mithasicecream.in</p>
          <p>📍 123, MG Road, Mumbai, Maharashtra</p>
          <div className="payment-icons">
            <span className="pay-icon">UPI</span>
            <span className="pay-icon">PhonePe</span>
            <span className="pay-icon">GPay</span>
            <span className="pay-icon">Paytm</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Mithas Ice Cream Pvt. Ltd. | Made with 💕 in India 🇮🇳</p>
        <p>FSSAI License: 12345678901234</p>
      </div>
    </footer>
  );
}
