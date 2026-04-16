const express = require('express');
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// GET all products
router.get('/', (req, res) => {
  let products = Product.getAll();
  const { category, search } = req.query;
  if (category && category !== 'all') products = products.filter(p => p.category === category);
  if (search) products = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );
  res.json(products);
});

// GET single product
router.get('/:id', (req, res) => {
  const product = Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// POST create product with image (protected)
router.post('/', authMiddleware, upload.single('image'), [
  body('name').notEmpty(),
  body('price').isNumeric(),
  body('category').notEmpty()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  const product = Product.create({ ...req.body, image: imageUrl });
  res.status(201).json(product);
});

// PUT update product (protected)
router.put('/:id', authMiddleware, upload.single('image'), (req, res) => {
  const data = { ...req.body };
  if (req.file) data.image = `/uploads/${req.file.filename}`;
  const product = Product.update(req.params.id, data);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// DELETE product (protected)
router.delete('/:id', authMiddleware, (req, res) => {
  const deleted = Product.delete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Product not found' });
  res.json({ message: 'Product deleted' });
});

module.exports = router;
