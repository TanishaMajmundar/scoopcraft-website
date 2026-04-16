const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  emoji: String,
  price: Number,
  qty: Number
}, { _id: false });

const addressSchema = new mongoose.Schema({
  name: String,
  phone: String,
  line1: String,
  city: String,
  state: String,
  pincode: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: String,
  items: [orderItemSchema],
  address: addressSchema,
  paymentMethod: { type: String, enum: ["upi", "cod"], default: "cod" },
  totalAmount: Number,
  status: {
    type: String,
    enum: ["pending", "confirmed", "delivered", "cancelled"],
    default: "pending"
  },
  transactionRef: String
}, { timestamps: true });

// Auto-generate orderId before saving
orderSchema.pre("save", function(next) {
  if (!this.orderId) {
    this.orderId = "ORD" + Date.now().toString();
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
