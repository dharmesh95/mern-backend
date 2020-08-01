const express = require("express");
const router = express.Router();
const config = require("config");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });
    const val = await bcrypt.compare(req.body.password, findUser.password);
    if (val) {
      console.log(findUser)
      findUser.token = jwt.sign(req.body.email, config.get("jwtsecret"));
      console.log(findUser)
      res.send(findUser);
    } else res.status(500).send("Invalid email or password");
  } catch (err) {
    console.log(err)
    res.status(500).send("Server error");
  }
});

module.exports = router;
