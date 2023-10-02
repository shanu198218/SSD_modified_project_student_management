const ErrorHandler = require("../utils/errorhander");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //mongoose duplicate error
  if (err.code === 11000) {
    const message = `duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  //wrong JWT error
  if (err.name === "JasonWebTokenError") {
    const message = `Json web Token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  //JWT Expire error
  if (err.code === "TokenExpiredError") {
    const message = `Json web Token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
