const express = require("express");
let Event = require("../../models/Event");
const router = express.Router();

const { check, validationResult } = require("express-validator");

/* list all */
router.get("/", async (req, res) => {
  try {
    const eventDb = await Event.find();
    res.send(eventDb);
  } catch (err) {
    res.status(500).send("Server errror");
  }
});

/* insert */
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("detail", "Detail is required").not().isEmpty(),
    check("category", "Category is required").not().isEmpty(),
    check("date", "Date is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const newevent = new Event({
        name: req.body.name,
        detail: req.body.detail,
        category: req.body.category,
        date: req.body.date,
      });
      const ne = await newevent.save();
      res.send(ne);
    } catch (err) {
      res.status(500).send("Server errror");
    }
  }
);

module.exports = router;
