import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import API from '../api';
import './Orders.css';

const STATUS_COLOR = {
  pending: { bg: '#FFF3CD', color: '#856404', icon: '⏳' },
  confirmed: { bg: '#D1E7DD', color: '#0F5132', icon: '✅' },
  delivered: { bg: '#CFF4FC', color: '#055160', icon: '🚀' },
  cancelled: { bg: '#F8D7DA', color: '#842029', icon: '❌' },
};

export default function Orders() {
  const { user } = useApp();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    API.get('/orders/my')
      .then(({ data }) => setOrders(data.reverse()))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (loading) return <div className="loader"><div className="loader-emoji">🍦</div><p>Loading orders...</p></div>;

  return (
    <div className="orders-page">
      <div className="container">
        <h1 className="orders-title">My <span>Orders</span> 📦</h1>

        {orders.length === 0 ? (
          <div className="no-orders">
            <div style={{ fontSize: '4rem' }}>📭</div>
            <h3>No orders yet!</h3>
            <p>Go on, treat yourself to some ice cream 🍦</p>
            <button className="btn-primary" onClick={() => navigate('/products')}>Order Now</button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => {
              const s = STATUS_COLOR[order.status] || STATUS_COLOR.pending;
              return (
                <div key={order.id} className="order-card card">
                  <div className="order-header">
                    <div>
                      <div className="order-id">{order.id}</div>
                      <div className="order-date">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                    <div className="order-status" style={{ background: s.bg, color: s.color }}>
                      {s.icon} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                  </div>

                  <div className="order-items">
                    {order.items?.map(item => (
                      <div key={item.id} className="order-item">
                        <span>{item.emoji}</span>
                        <span>{item.name}</span>
                        <span>×{item.qty}</span>
                        <span>₹{item.price * item.qty}</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-footer">
                    <div className="order-info">
                      <span>📍 {order.address?.city}, {order.address?.state}</span>
                      <span>💳 {order.paymentMethod?.toUpperCase()}</span>
                    </div>
                    <div className="order-total">Total: ₹{order.totalAmount}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
