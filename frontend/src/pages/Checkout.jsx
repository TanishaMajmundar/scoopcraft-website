import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import API from '../api';
import './Checkout.css';

const STEPS = ['Address', 'Payment', 'Confirm'];

export default function Checkout() {
  const { cart, cartTotal, user, clearCart, showToast } = useApp();
  const navigate = useNavigate();

  const delivery = cartTotal >= 299 ? 0 : 40;
  const gst = Math.round(cartTotal * 0.05);
  const grandTotal = cartTotal + delivery + gst;

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [txnRef, setTxnRef] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const [address, setAddress] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    line1: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [upiId, setUpiId] = useState('');
  const [upiInitiated, setUpiInitiated] = useState(false);

  const handleAddress = (e) => setAddress(a => ({ ...a, [e.target.name]: e.target.value }));

  const placeOrder = async () => {
    setLoading(true);
    try {
      const { data } = await API.post('/orders', {
        items: cart,
        address,
        paymentMethod,
        totalAmount: grandTotal
      });
      setOrderId(data.id);
      setStep(1);
    } catch (err) {
      showToast('Failed to place order. Try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const initiateUPI = async () => {
    if (!upiId.includes('@')) return showToast('Enter a valid UPI ID (e.g. name@upi)', 'error');
    setLoading(true);
    try {
      const { data } = await API.post('/payment/upi/initiate', {
        orderId, amount: grandTotal, upiId
      });
      setTxnRef(data.transactionRef);
      setUpiInitiated(true);
      showToast('UPI request sent! Approve in your app 📱');
    } catch {
      showToast('UPI initiation failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async () => {
    setLoading(true);
    try {
      await API.post('/payment/verify', { transactionRef: txnRef, orderId });
      clearCart();
      setStep(2);
      showToast('Payment successful! 🎉 Your ice cream is coming!');
    } catch (err) {
      showToast(err.response?.data?.message || 'Payment failed. Try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const confirmCOD = async () => {
    setLoading(true);
    try {
      await API.post('/payment/cod/confirm', { orderId });
      clearCart();
      setStep(2);
      showToast('Order confirmed! Pay on delivery 🏠');
    } catch {
      showToast('Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="container co-inner">
        <h1 className="co-title">Checkout 🍦</h1>

        {/* Steps */}
        <div className="steps-bar">
          {STEPS.map((s, i) => (
            <div key={s} className={`step ${i <= step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
              <div className="step-circle">{i < step ? '✓' : i + 1}</div>
              <span>{s}</span>
              {i < STEPS.length - 1 && <div className="step-line" />}
            </div>
          ))}
        </div>

        <div className="co-grid">
          <div className="co-main">

            {/* Step 0: Address */}
            {step === 0 && (
              <div className="co-card card">
                <h2>📍 Delivery Address</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input name="name" value={address.name} onChange={handleAddress} placeholder="Ravi Kumar" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input name="phone" value={address.phone} onChange={handleAddress} placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Address Line</label>
                  <input name="line1" value={address.line1} onChange={handleAddress} placeholder="Flat no, Building, Street" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input name="city" value={address.city} onChange={handleAddress} placeholder="Mumbai" />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input name="state" value={address.state} onChange={handleAddress} placeholder="Maharashtra" />
                  </div>
                  <div className="form-group">
                    <label>Pincode</label>
                    <input name="pincode" value={address.pincode} onChange={handleAddress} placeholder="400001" />
                  </div>
                </div>
                <button
                  className="btn-primary"
                  onClick={placeOrder}
                  disabled={loading || !address.name || !address.line1 || !address.city || !address.pincode}
                >
                  {loading ? 'Placing Order...' : 'Continue to Payment →'}
                </button>
              </div>
            )}

            {/* Step 1: Payment */}
            {step === 1 && (
              <div className="co-card card">
                <h2>💳 Payment Method</h2>

                <div className="payment-tabs">
                  <button className={`pay-tab ${paymentMethod === 'upi' ? 'active' : ''}`} onClick={() => setPaymentMethod('upi')}>
                    📱 UPI / QR
                  </button>
                  <button className={`pay-tab ${paymentMethod === 'cod' ? 'active' : ''}`} onClick={() => setPaymentMethod('cod')}>
                    🏠 Cash on Delivery
                  </button>
                </div>

                {paymentMethod === 'upi' && (
                  <div className="upi-section">
                    <div className="upi-logos">
                      <span>PhonePe</span><span>GPay</span><span>Paytm</span><span>BHIM</span>
                    </div>

                    {!upiInitiated ? (
                      <>
                        <div className="form-group">
                          <label>Your UPI ID</label>
                          <input
                            value={upiId}
                            onChange={e => setUpiId(e.target.value)}
                            placeholder="yourname@upi or yourname@paytm"
                          />
                        </div>
                        <button className="btn-primary" onClick={initiateUPI} disabled={loading || !upiId}>
                          {loading ? 'Sending Request...' : '📱 Send UPI Request'}
                        </button>
                      </>
                    ) : (
                      <div className="upi-confirm">
                        <div className="upi-pending-icon">⏳</div>
                        <h3>UPI Request Sent!</h3>
                        <p>Ref: <code>{txnRef}</code></p>
                        <p className="upi-instruction">Approve the payment in your UPI app, then click verify.</p>
                        <button className="btn-primary" onClick={verifyPayment} disabled={loading}>
                          {loading ? 'Verifying...' : '✅ Verify Payment'}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="cod-section">
                    <div className="cod-icon">🏠</div>
                    <h3>Pay at your doorstep</h3>
                    <p>Keep exact change ready — our delivery person will collect ₹{grandTotal}.</p>
                    <button className="btn-primary" onClick={confirmCOD} disabled={loading}>
                      {loading ? 'Confirming...' : '✅ Confirm Order (COD)'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Success */}
            {step === 2 && (
              <div className="co-card card success-card">
                <div className="success-emoji">🎉</div>
                <h2>Order Confirmed!</h2>
                <p className="order-id">Order ID: <strong>{orderId}</strong></p>
                <p>Your ice cream is being prepared with love! Expected delivery in 30–45 minutes.</p>
                <div className="success-actions">
                  <button className="btn-primary" onClick={() => navigate('/orders')}>View My Orders</button>
                  <button className="btn-secondary" onClick={() => navigate('/products')}>Order More 🍦</button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          {step < 2 && (
            <div className="co-summary card">
              <h3>Order Summary</h3>
              <div className="co-items">
                {cart.map(item => (
                  <div key={item.id} className="co-item">
                    <span className="co-item-emoji">{item.emoji}</span>
                    <span className="co-item-name">{item.name} × {item.qty}</span>
                    <span className="co-item-price">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="co-summary-lines">
                <div className="co-sum-line"><span>Subtotal</span><span>₹{cartTotal}</span></div>
                <div className="co-sum-line"><span>Delivery</span><span>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span></div>
                <div className="co-sum-line"><span>GST (5%)</span><span>₹{gst}</span></div>
                <div className="co-sum-line co-total"><span>Grand Total</span><span>₹{grandTotal}</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
