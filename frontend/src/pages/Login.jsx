import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Auth.css';

export default function Login() {
  const { login, showToast } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    try {
      await login(form.email, form.password);
      navigate('/products');
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || 'Login failed';
      setErrors([msg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-header">
          <div className="auth-logo">🍦</div>
          <h1>Swagat Hai!</h1>
          <p>Login to your Mithas account</p>
        </div>

        {errors.map((e, i) => (
          <div key={i} className="auth-error">{e}</div>
        ))}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Your password" required />
          </div>

          <button className="btn-primary auth-btn" type="submit" disabled={loading}>
            {loading ? '🍦 Logging in...' : 'Login →'}
          </button>
        </form>

        <p className="auth-switch">
          New to Mithas? <Link to="/register">Create an account</Link>
        </p>

        {/* Demo credentials */}
        <div className="demo-hint">
          <strong>Demo:</strong> Register first, then login with your credentials.
        </div>
      </div>
    </div>
  );
}
