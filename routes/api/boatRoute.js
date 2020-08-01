const express = require("express");
const router1 = express.Router();
let Boats = require("../models/Boat");
const auth = require("../middleware/auth");

router1.get("/", async (req, res) => {
  try {
    const boatDb = await Boats.find();
    console.log(boatDb);
    res.send(boatDb);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router1.get("/:id", async (req, res) => {
  try {
    const boat = await Boats.findById(req.params.id);
    if (!boat) {
      res.status(404).send("boat not found");
    }
    res.send(boat);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router1.post("/", auth, async (req, res) => {
  try {
    const boat = new Boat({
      user: req.user.id,
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      status: req.body.status,
    });
    const savedboat = await boat.save();
    res.send(savedboat);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router1.delete("/", auth, async (req, res) => {
  try {
    if (req.body.user === req.user.id) {
      await Boat.findByIdAndRemove({ _id: req.body.id });

      res.json({ msg: "boat deleted" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router1;
