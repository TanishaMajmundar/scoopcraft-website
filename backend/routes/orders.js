const express = require('express');
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// GET user's orders (protected)
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single order (protected)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    if (order.userId.toString() !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create order (protected)
router.post('/', authMiddleware, async (req, res) => {
  const { items, address, paymentMethod, totalAmount } = req.body;
  if (!items || !items.length) return res.status(400).json({ error: 'Cart is empty' });
  try {
    const order = new Order({
      userId: req.user.id,
      userName: req.user.name || address?.name,
      items,
      address,
      paymentMethod,
      totalAmount
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH update order status (protected)
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.id },
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
