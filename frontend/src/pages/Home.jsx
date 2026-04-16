import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const highlights = [
  { emoji: '🌟', title: 'Pure Desi Flavours', desc: 'Kesar, paan, sitaphal & more' },
  { emoji: '🥛', title: 'Farm Fresh Milk', desc: 'Sourced from local dairies daily' },
  { emoji: '🚀', title: 'Quick Delivery', desc: 'Hot (cold!) in 30 minutes' },
  { emoji: '💳', title: 'UPI Payments', desc: 'PhonePe, GPay, Paytm accepted' },
];

const featuredFlavours = [
  { emoji: '🥭', name: 'Mango Malai', price: 79, tag: 'Season Fav' },
  { emoji: '🌟', name: 'Kesar Pista Kulfi', price: 89, tag: 'Bestseller' },
  { emoji: '🌹', name: 'Rose Gulkand', price: 99, tag: 'Unique' },
  { emoji: '👑', name: 'Anjeer Badam Royale', price: 149, tag: 'Premium' },
];

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-circles">
          <div className="circle c1" />
          <div className="circle c2" />
          <div className="circle c3" />
        </div>

        <div className="container hero-content">
          <div className="hero-text">
            <div className="hero-badge">🇮🇳 India's Most Loved Ice Cream</div>
            <h1 className="hero-title">
              Taste the <span>Sweet Joy</span><br />
              of <em>Mithas</em>
            </h1>
            <p className="hero-subtitle">
              Handcrafted Indian ice creams made with the finest ingredients —
              from creamy Alphonso mango kulfi to saffron-kissed pista royale.
              <strong> Shudh. Swadisht. Desi.</strong>
            </p>
            <div className="hero-actions">
              <Link to="/products">
                <button className="btn-primary hero-cta">Explore Flavours 🍦</button>
              </Link>
              <div className="hero-stats">
                <div className="stat"><strong>50+</strong><span>Flavours</span></div>
                <div className="stat-divider" />
                <div className="stat"><strong>10k+</strong><span>Happy Customers</span></div>
                <div className="stat-divider" />
                <div className="stat"><strong>4.9⭐</strong><span>Rated</span></div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="ice-cream-display">
              <div className="ice-cream-big">🍦</div>
              <div className="floating-tag t1">Kesar Kulfi 🌟</div>
              <div className="floating-tag t2">₹89 only!</div>
              <div className="floating-tag t3">Mango Special 🥭</div>
              <div className="deco-ring" />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="highlights">
        <div className="container highlights-grid">
          {highlights.map((h, i) => (
            <div key={i} className="highlight-card">
              <span className="highlight-emoji">{h.emoji}</span>
              <h3>{h.title}</h3>
              <p>{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Flavours */}
      <section className="featured container">
        <div className="section-header">
          <h2 className="section-title">Today's <span>Specials</span></h2>
          <p className="section-sub">Curated just for you — our most-loved creations</p>
        </div>

        <div className="featured-grid">
          {featuredFlavours.map((f, i) => (
            <Link to="/products" key={i} className="featured-card card">
              <div className="featured-emoji">{f.emoji}</div>
              <div className="featured-info">
                <span className="badge">{f.tag}</span>
                <h3>{f.name}</h3>
                <div className="featured-price">₹{f.price}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="featured-cta">
          <Link to="/products">
            <button className="btn-primary">View Full Menu →</button>
          </Link>
        </div>
      </section>

      {/* Promo banner */}
      <section className="promo-banner">
        <div className="container promo-inner">
          <div className="promo-text">
            <h2>🎉 First Order Special!</h2>
            <p>Get <strong>₹50 off</strong> on your first order. Use code: <strong>MITHAS50</strong></p>
          </div>
          <Link to="/register">
            <button className="btn-primary">Claim Offer 🍦</button>
          </Link>
        </div>
      </section>

      {/* Indian festival section */}
      <section className="festivals container">
        <div className="section-header">
          <h2 className="section-title">Har Tyohar <span>Special</span></h2>
          <p className="section-sub">Celebrate every festival with the sweetness of Mithas</p>
        </div>
        <div className="festival-grid">
          {[
            { fest: 'Holi', emoji: '🎆', special: 'Thandai Kulfi' },
            { fest: 'Diwali', emoji: '✨', special: 'Kaju Katli Ice Cream' },
            { fest: 'Navratri', emoji: '🌺', special: 'Fasting Special Kulfi' },
            { fest: 'Eid', emoji: '🌙', special: 'Shahi Tukda Ice Cream' },
          ].map((f, i) => (
            <div key={i} className="festival-card">
              <div className="fest-emoji">{f.emoji}</div>
              <h4>{f.fest}</h4>
              <p>{f.special}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
