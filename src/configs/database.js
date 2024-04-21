const pg = require("pg");

const db = async () => {
  const client = new pg.Client(process.env.DATABASE_URL);

  await client.connect();

  return client;
};

module.exports = db;
