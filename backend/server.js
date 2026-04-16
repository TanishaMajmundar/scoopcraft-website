const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orders');
const paymentRoutes = require('./routes/payment');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// Seed default products if DB is empty
const Product = require('./models/Product');
const seedProducts = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany([
      { name: 'Kesar Pista Kulfi', description: 'Traditional Indian kulfi with saffron and pistachios.', price: 89, category: 'kulfi', emoji: '🌟', rating: 4.9, reviews: 342, tags: ['bestseller', 'traditional'] },
      { name: 'Mango Malai', description: 'Alphonso mango blended with thick malai cream.', price: 79, category: 'sundae', emoji: '🥭', rating: 4.8, reviews: 289, tags: ['seasonal', 'popular'] },
      { name: 'Rose Gulkand Scoop', description: 'Delicate rose petals and gulkand in velvety vanilla ice cream.', price: 99, category: 'scoop', emoji: '🌹', rating: 4.7, reviews: 198, tags: ['floral', 'unique'] },
      { name: 'Sitaphal Special', description: 'Custard apple ice cream made with fresh sitaphal pulp.', price: 109, category: 'scoop', emoji: '💚', rating: 4.8, reviews: 156, tags: ['regional', 'seasonal'] },
      { name: 'Choco Rabri Blast', description: 'Belgian chocolate meets Indian rabri in this indulgent fusion dessert.', price: 129, category: 'sundae', emoji: '🍫', rating: 4.6, reviews: 211, tags: ['fusion', 'indulgent'] },
      { name: 'Paan Ice Cream', description: 'The iconic betel leaf flavour with mukhwas.', price: 89, category: 'scoop', emoji: '🌿', rating: 4.5, reviews: 134, tags: ['quirky', 'desi'] },
      { name: 'Thandai Kulfi Bar', description: 'Holi-special thandai flavour with cardamom and rose water.', price: 69, category: 'kulfi', emoji: '🎆', rating: 4.7, reviews: 167, tags: ['festive', 'traditional'] },
      { name: 'Anjeer Badam Royale', description: 'Fig and almond ice cream swirled with saffron strands.', price: 149, category: 'sundae', emoji: '👑', rating: 4.9, reviews: 98, tags: ['premium', 'luxury'] }
    ]);
    console.log('🍦 Default products seeded!');
  }
};

mongoose.connection.once('open', seedProducts);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

// Mock Payment (lab manual Step 10 exact code)
app.post('/api/payment/simple', (req, res) => {
  const { amount } = req.body;
  if (amount > 0) {
    res.json({ status: 'success' });
  } else {
    res.status(400).json({ status: 'failed' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: '🍦 Mithas Ice Cream API is running!', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🍦 Server running on port ${PORT}`);
});
