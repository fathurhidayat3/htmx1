const pgp = require("pg-promise")();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = process.env.DB_PORT || 5432;
const dbName = process.env.DB_NAME;

const db = pgp(
  `postgres://${dbUser}:${dbPassword}@localhost:${dbPort}/${dbName}`
);

module.exports = db;
