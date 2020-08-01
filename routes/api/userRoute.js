const express = require("express");
const router1 = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
let User = require("../models/Info");
router1.post(
  "/",
  [
    check("name", "name is not empty").not().isEmpty(),
    check("email", "email is not empty").not().isEmpty(),
    check("password", " password length should be greater than 4").isLength({
      min: 3,
    }),
    // check("confirmPassword", " password Should Match").equals(
    // "req.body.password"
    //),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const hashedpass = await bcrypt.hash(req.body.password, 12);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedpass,
        confrimPassword: hashedpass,
      });
      await newUser.save();
      const payload = {
        user: {
          id: newUser.id,
          name: newUser.name,
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
      // res.json({ user: newUser });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

module.exports = router1;
