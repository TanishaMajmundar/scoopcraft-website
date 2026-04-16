import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import { useApp } from '../context/AppContext';
import './ProductList.css';

const CATEGORIES = ['all', 'kulfi', 'scoop', 'sundae'];

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const { addToCart } = useApp();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = {};
        if (category !== 'all') params.category = category;
        if (search) params.search = search;
        const { data } = await API.get('/products', { params });
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, search]);

  return (
    <div className="product-list-page">
      {/* Header */}
      <div className="pl-header">
        <div className="container">
          <h1>Our <span>Flavours</span> 🍦</h1>
          <p>Handcrafted with love — choose your favourite!</p>
        </div>
      </div>

      <div className="container pl-body">
        {/* Filters */}
        <div className="pl-filters">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search flavours..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="category-tabs">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`cat-tab ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat === 'all' ? '🍦 All' : cat === 'kulfi' ? '🧊 Kulfi' : cat === 'scoop' ? '🥄 Scoops' : '🍨 Sundaes'}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="loader">
            <div className="loader-emoji">🍦</div>
            <p style={{ color: 'var(--text-light)' }}>Loading deliciousness...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: '4rem' }}>😔</div>
            <h3>No flavours found</h3>
            <p>Try a different search or category</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product, i) => (
              <div key={product.id} className="product-card card animate-fade-up" style={{ animationDelay: `${i * 0.07}s` }}>
                <Link to={`/products/${product.id}`} className="product-card-link">
                  <div className="product-img-area">
                    {product.image ? (
                      <img src={`http://localhost:5000${product.image}`} alt={product.name} />
                    ) : (
                      <div className="product-emoji-placeholder">{product.emoji}</div>
                    )}
                    {product.tags?.map(tag => (
                      <span key={tag} className={`product-tag ${tag === 'bestseller' ? 'badge' : tag === 'premium' ? 'badge-premium' : 'badge badge-pink'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="product-info">
                    <div className="product-meta">
                      <span className="product-category">{product.category}</span>
                      <div className="product-rating">
                        <span className="stars">★</span>
                        <span>{product.rating}</span>
                        <span className="review-count">({product.reviews})</span>
                      </div>
                    </div>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-desc">{product.description}</p>
                  </div>
                </Link>

                <div className="product-footer">
                  <span className="price">{product.price}</span>
                  <button
                    className="btn-primary add-btn"
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? '+ Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
