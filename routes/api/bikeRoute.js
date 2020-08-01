const express = require("express");
const router1 = express.Router();
let Bikes = require("../models/Bike");
const auth = require("../middleware/auth");

router1.get("/", async (req, res) => {
  try {
    const bikeDb = await Bikes.find();
    console.log(bikeDb);
    res.send(bikeDb);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router1.get("/:id", async (req, res) => {
  try {
    const bike = await Bikes.findById(req.params.id);
    if (!bike) {
      res.status(404).send("bike not found");
    }
    res.send(bike);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router1.post("/", auth, async (req, res) => {
  try {
    const bike = new Bike({
      user: req.user.id,
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      status: req.body.status,
    });
    const savedbike = await bike.save();
    res.send(savedbike);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router1.delete("/", auth, async (req, res) => {
  try {
    if (req.body.user === req.user.id) {
      await Bike.findByIdAndRemove({ _id: req.body.id });

      res.json({ msg: "bike deleted" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router1;
