const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const examResultSchema = new Schema({
  grade: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  studentID: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  gradeReceived: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("examResults", examResultSchema);
