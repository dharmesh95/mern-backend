const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/", async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const findUser = await User.findOne({ email: req.body.email });
    if (findUser) {
      res.status(500).send("Email already registered");
      return;
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    const savedUser = await newUser.save();
    savedUser.token = jwt.sign(req.body.email, config.get("jwtsecret"));
    res.send(savedUser);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
