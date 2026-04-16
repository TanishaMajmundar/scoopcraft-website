import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import './index.css';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={
              <div style={{ textAlign: 'center', padding: '100px 20px' }}>
                <div style={{ fontSize: '5rem' }}>🍦</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginTop: '20px' }}>Oops! Page not found</h2>
                <p style={{ color: 'var(--text-light)', marginTop: '10px' }}>Let's go back to the sweet stuff.</p>
                <a href="/" style={{ display: 'inline-block', marginTop: '20px' }}>
                  <button className="btn-primary">Go Home 🏠</button>
                </a>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  );
}
