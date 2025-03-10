const dotenvFlow = require("dotenv-flow");

// Load environment variables
dotenvFlow.config();

// Creating a configuration module
const config = {
  ENV: process.env.ENV || "development",
  PORT: process.env.PORT || 3000,
  SERVER_URL: process.env.SERVER_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
};

module.exports = config;
