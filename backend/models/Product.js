const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  category: { type: String, enum: ["kulfi", "scoop", "sundae"], default: "scoop" },
  image: { type: String, default: null },
  emoji: { type: String, default: "🍦" },
  rating: { type: Number, default: 4.5 },
  reviews: { type: Number, default: 0 },
  tags: [{ type: String }],
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
