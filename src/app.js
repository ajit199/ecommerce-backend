require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const hpp = require("hpp");

const authRoutes = require("./routes/user.route");
const categoryRoutes = require("./routes/category.route");

const app = express();

//Enable CORS
app.use(
  cors({
    origin: "*",
  })
);

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// request logging
app.use(morgan("dev"));

// Prevent http param pollution
app.use(hpp());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);

module.exports = app;
