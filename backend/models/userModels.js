const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
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
    validate: [validator.isEmail, "Please Enter a valid Email"],
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
  username: {
    type: String,
    required: [true, "Please Enter Your  username"],
    minlength: [5, "Username should containe more than 8 characters"],
    unique: true,
  },
  idNumber: {
    type: String,
    required: [true, "Please Enter Your  user ID"],
    minlength: [8, "Registration No should containe more than 8 characters"],
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
    maxlength: [11, "Contact Number should contain less than 11 characters"],
  },
  role: {
    type: String,
    default: "student",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  try {
    // Generate a random salt with 10 rounds
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the generated salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

//JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
