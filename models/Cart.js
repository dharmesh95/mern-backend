const mongoose = require("mongoose");

//schema
const CartItemSchema = new mongoose.Schema({
  id: Number,
  imageUrl: String,
  name: String,
  price: Number,
  quantity: Number,
});
const CartSchema = new mongoose.Schema({
  name: [CartItemSchema],
});

module.exports = mongoose.model("Cart", CartSchema);
