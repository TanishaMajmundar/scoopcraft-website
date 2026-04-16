import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Auth.css';

export default function Register() {
  const { register } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    try {
      await register(form);
      navigate('/products');
    } catch (err) {
      const errs = err.response?.data?.errors?.map(e => e.msg) || [err.response?.data?.error || 'Registration failed'];
      setErrors(errs);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-header">
          <div className="auth-logo">🎉</div>
          <h1>Join Mithas!</h1>
          <p>Create your account and enjoy sweet deals</p>
        </div>

        {errors.map((e, i) => (
          <div key={i} className="auth-error">{e}</div>
        ))}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Priya Sharma" required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Min. 6 characters" minLength={6} required />
          </div>

          <button className="btn-primary auth-btn" type="submit" disabled={loading}>
            {loading ? '🍦 Creating account...' : 'Create Account 🎉'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}
