const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const bcrypt = require("bcrypt");

router.post(
  "/",
  /* auth, */ async (req, res) => {
    try {
      const findUser = await User.findOne({ email: req.body.email });
      const val = await bcrypt.compare(req.body.password, findUser.password);
      if (val) res.send(findUser);
      else res.status(500).send("Invalid email or password");
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
