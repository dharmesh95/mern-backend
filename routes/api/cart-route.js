const express = require("express");
const Cart = require("../../models/Cart");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const CartDb = await Cart.find();
    res.send(CartDb);
  } catch (err) {
    res.status(500).send("Server errror");
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const cart = new Cart(req.body);
    const savedCart = await cart.save();
    res.send(savedCart);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
