const express = require("express");
const routerauth = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/Info");
const auth = require("../middleware/auth");

//get
//auth middleware
routerauth.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

routerauth.post(
  "/",
  [
    check("email", "email is not empty").not().isEmpty(),
    check("password", " password length should be greater than 4").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(422)
          .json({ errors: [{ msg: "invalid credentails" }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(422)
          .json({ errors: [{ msg: "invalid credentails" }] });
      }
      // get user info
      const payload = {
        user: {
          id: user.id,
          name: user.name,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtsecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      // res.json({ user: newUser });
      res.status(500).send(err.message);
    }
  }
);
module.exports = routerauth;
