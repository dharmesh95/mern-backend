const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model("Cart", CartSchema);
