// Configuration
require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
  },
  test: {
    client: "pg",
    connection: process.env.TEST_DATABASE_URL,
  },
};
