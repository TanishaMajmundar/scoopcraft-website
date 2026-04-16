import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import { useApp } from '../context/AppContext';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useApp();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch(() => navigate('/products'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
  };

  if (loading) return (
    <div className="loader"><div className="loader-emoji">🍦</div><p>Loading...</p></div>
  );

  if (!product) return null;

  return (
    <div className="pd-page">
      <div className="container pd-inner">
        <button className="back-btn" onClick={() => navigate('/products')}>← Back to Menu</button>

        <div className="pd-grid">
          {/* Image */}
          <div className="pd-image-area">
            <div className="pd-img-wrapper">
              {product.image ? (
                <img src={`http://localhost:5000${product.image}`} alt={product.name} />
              ) : (
                <div className="pd-emoji">{product.emoji}</div>
              )}
            </div>
            <div className="pd-badge-row">
              {product.tags?.map(tag => (
                <span key={tag} className="badge">{tag}</span>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="pd-info">
            <div className="pd-category">{product.category}</div>
            <h1 className="pd-title">{product.name}</h1>

            <div className="pd-rating">
              <span className="stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
              <span className="pd-rating-num">{product.rating}</span>
              <span className="pd-reviews">({product.reviews} reviews)</span>
            </div>

            <p className="pd-description">{product.description}</p>

            <div className="pd-price-row">
              <span className="pd-price">₹{product.price}</span>
              <span className="pd-per">per serving</span>
            </div>

            <div className="pd-qty-row">
              <div className="qty-control">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <span className="qty-total">Total: ₹{product.price * qty}</span>
            </div>

            <div className="pd-actions">
              <button
                className="btn-primary pd-add-btn"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? `🛒 Add ${qty > 1 ? qty + 'x ' : ''}to Cart` : 'Out of Stock'}
              </button>
              <button className="btn-secondary" onClick={() => { handleAddToCart(); navigate('/cart'); }}>
                Buy Now ⚡
              </button>
            </div>

            {/* Highlights */}
            <div className="pd-highlights">
              <div className="pd-highlight"><span>🥛</span><span>Pure dairy, no artificial flavours</span></div>
              <div className="pd-highlight"><span>🏠</span><span>Made fresh daily in our kitchen</span></div>
              <div className="pd-highlight"><span>🚀</span><span>Delivered in insulated packs</span></div>
              <div className="pd-highlight"><span>♻️</span><span>Eco-friendly packaging</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
