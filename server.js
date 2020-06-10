// requiring dotenv
require("dotenv").config();

// importing node packages
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const app = express();

// port
const PORT = process.env.PORT || 8000;

// parser middleware
app.use(logger("dev"));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static folder
app.use(express.static("public"));

// routes
app.use(require("./routes/api.js"));

// connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/under-control",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
  }
);

// listener
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
