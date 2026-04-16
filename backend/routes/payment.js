const express = require('express');
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/Order');

const router = express.Router();

// Mock UPI Payment initiation (protected)
router.post('/upi/initiate', authMiddleware, async (req, res) => {
  const { orderId, amount, upiId } = req.body;
  if (!upiId) return res.status(400).json({ error: 'UPI ID is required' });

  const txnRef = 'MITHAS' + uuidv4().replace(/-/g, '').slice(0, 12).toUpperCase();
  const upiLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=MithasIceCream&am=${amount}&tn=Order-${orderId}&tr=${txnRef}`;

  setTimeout(() => {
    res.json({
      success: true,
      transactionRef: txnRef,
      upiLink,
      qrData: upiLink,
      message: 'UPI payment initiated. Scan QR or open UPI app.',
      expiresIn: 300
    });
  }, 500);
});

// Mock payment verification (protected)
router.post('/verify', authMiddleware, async (req, res) => {
  const { transactionRef, orderId } = req.body;
  const success = Math.random() > 0.1; // 90% success

  setTimeout(async () => {
    if (success) {
      await Order.findOneAndUpdate({ orderId }, { status: 'confirmed', transactionRef });
      res.json({
        success: true,
        transactionRef,
        status: 'SUCCESS',
        message: '🎉 Payment successful! Your ice cream is on the way!',
        paidAt: new Date()
      });
    } else {
      res.status(400).json({ success: false, status: 'FAILED', message: 'Payment failed. Please try again.' });
    }
  }, 1500);
});

// COD confirmation (protected)
router.post('/cod/confirm', authMiddleware, async (req, res) => {
  const { orderId } = req.body;
  try {
    await Order.findOneAndUpdate({ orderId }, { status: 'confirmed' });
    res.json({ success: true, status: 'COD_CONFIRMED', message: '🍦 Order confirmed! Pay on delivery.', orderId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
