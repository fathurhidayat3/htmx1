const pgp = require("pg-promise")();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = process.env.DB_PORT || 5432;

const table = "htmx1";

const db = pgp(
  `postgres://${dbUser}:${dbPassword}@localhost:${dbPort}/${table}`
);

module.exports = db;
