const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const examTimeTableSchema = new Schema({
  grade: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  examHall: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("examTimeTable", examTimeTableSchema);

