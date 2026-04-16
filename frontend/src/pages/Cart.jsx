import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Cart.css';

export default function Cart() {
  const { cart, cartTotal, updateQty, removeFromCart, user } = useApp();
  const navigate = useNavigate();

  const delivery = cartTotal >= 299 ? 0 : 40;
  const gst = Math.round(cartTotal * 0.05);
  const grandTotal = cartTotal + delivery + gst;

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-inner">
          <div style={{ fontSize: '5rem' }}>🍦</div>
          <h2>Your cart is empty!</h2>
          <p>Kuch toh daalein cart mein 😋</p>
          <Link to="/products"><button className="btn-primary">Explore Flavours</button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container cart-inner">
        <h1 className="cart-title">Your <span>Cart</span> 🛒</h1>

        <div className="cart-grid">
          {/* Items */}
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item card">
                <div className="cart-item-img">
                  {item.image ? (
                    <img src={`http://localhost:5000${item.image}`} alt={item.name} />
                  ) : (
                    <span className="cart-item-emoji">{item.emoji}</span>
                  )}
                </div>

                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="cart-item-category">{item.category}</p>
                  <div className="cart-item-price">₹{item.price} each</div>
                </div>

                <div className="cart-item-controls">
                  <div className="qty-control">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                  <div className="cart-item-subtotal">₹{item.price * item.qty}</div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
                </div>
              </div>
            ))}

            {cartTotal < 299 && (
              <div className="free-delivery-banner">
                🚀 Add ₹{299 - cartTotal} more for <strong>FREE delivery!</strong>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="cart-summary card">
            <h2>Order Summary</h2>

            <div className="summary-lines">
              <div className="summary-line">
                <span>Subtotal</span><span>₹{cartTotal}</span>
              </div>
              <div className="summary-line">
                <span>Delivery</span>
                <span>{delivery === 0 ? <span className="free-tag">FREE 🎉</span> : `₹${delivery}`}</span>
              </div>
              <div className="summary-line">
                <span>GST (5%)</span><span>₹{gst}</span>
              </div>
              <div className="summary-line summary-total">
                <span>Total</span><span>₹{grandTotal}</span>
              </div>
            </div>

            <div className="upi-badge">
              <span>💳 Pay via UPI, GPay, PhonePe & more</span>
            </div>

            <button
              className="btn-primary checkout-btn"
              onClick={() => user ? navigate('/checkout') : navigate('/login')}
            >
              {user ? 'Proceed to Checkout →' : 'Login to Checkout'}
            </button>

            <Link to="/products" className="continue-shopping">← Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
