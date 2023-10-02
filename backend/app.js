const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const csrf = require("csurf");
const helmet = require("helmet");

const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/config.env" });
}

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(helmet());

// Use helmet middleware to disable the "X-Powered-By" header
app.use(bodyParser.urlencoded({ extended: true }));

// Set up rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(
  csrf({
    cookie: true,
  })
);

app.use(function (req, res, next) {
  res.removeHeader("X-Powered-By");
  next();
});

//route imports
const user = require("./routes/userRoute");
const users = require("./controllers/usersController");

const studentpayment = require("./routes/student_pay_R.js");
const teachSal = require("./routes/teacher_sal_route.js");

const router = require("./routes/examTimeTable_routes");
const result = require("./routes/examResults_routes");

const postClass = require("./routes/classRoutes");
const postNotice = require("./routes/noticeRoutes");

app.use("/api/v1", user);
app.use("/api/v1", users);
app.use(studentpayment, limiter);
app.use(teachSal, limiter);
app.use("/api/v1", limiter);

app.use("/timetables", router);
app.use(result);

app.use(postClass);
app.use(postNotice);

app.use(limiter);
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//middleware for errors
app.use(errorMiddleware);

module.exports = app;
