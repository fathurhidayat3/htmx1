const pg = require("pg");

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT || 5432;
const database = process.env.DB_NAME;

const db = async () => {
  const client = new pg.Client({
    user,
    password,
    host,
    port,
    database,
  });

  await client.connect();

  return client;
};

module.exports = db;
