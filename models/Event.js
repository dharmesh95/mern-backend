const mongoose = require("mongoose");

//schema
const EventSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  detail: {
    type: String,
  },
  category: {
    type: String,
  },
  date: {
    type: String,
  },
});

module.exports = mongoose.model("event", EventSchema);
