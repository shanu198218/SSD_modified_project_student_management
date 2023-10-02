const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxlength: [30, "Name cannot exceed 30 characters"],
    minlength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Ender Your Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Ender Your Password"],
    minlength: [8, "Password should containe more than 8 characters"],
    select: false,
  },
  dob: {
    type: String,
    required: [true, "Please Ender Your Date of Birth"],
    select: false,
  },
  idNumber: {
    type: String,
    required: [true, "Please Enter Your  user ID"],
    minlength: [8, "Registration No should containe more than 8 characters"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Please Enter Your  username"],
    minlength: [5, "Username No should containe more than 8 characters"],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "Please Enter Your  address"],
    minlength: [8, "Address should containe more than 8 characters"],
  },
  contactno: {
    type: String,
    required: [true, "Please Enter Your  Contact Number"],
    minlength: [9, "Contact Number should containe more than 9 characters"],
    maxlength: [ 11, "Contact Number should contain less than 11 characters"],
  },
  role: {
    type: String,
    default: "student",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Users", postSchema);
