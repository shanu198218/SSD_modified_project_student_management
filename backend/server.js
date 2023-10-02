const app = require("./app");
const { default: mongoose } = require("mongoose");
require("dotenv").config({ path: "config/config.env" });
const express = require('express');
const helmet = require('helmet');

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/config.env" });
}

// Use Helmet middleware these middleware help to mitigate cross site scripting 
app.use(helmet());

//use helmet middleware for specific headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'trusted-scripts.com'],
        styleSrc: ["style-src"],
      },
    },
  })
);

//move to database url to config.env then hide hardcoded database connection string
const DB_URL = process.env.DB_URL;

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

//implement the function for hode sensitive information as hardcode db url
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log("DB connection error", err));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
}
