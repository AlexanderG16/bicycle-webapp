const session = require("express-session");
require("dotenv").config(); // Load environment variables

const sessionConfig = {
  secret: process.env.SESSION_SECRET, // Use the session secret from environment variables
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Set to true if using HTTPS
    maxAge: 300 * 1000, // Session expiration time in milliseconds (e.g., 300 seconds)
  },
};

module.exports = sessionConfig;
