const config = require("./assets/dbConfig");
const { db, client } = require("./core");
const models = require("./models");

async function createDB() {
  const { DB_NAME } = config;

  console.log(config);

  try {
    await client.connect();

    await client.query(`CREATE DATABASE ${DB_NAME}`);

    await client.end();
  } catch (err) {
    console.error("ОШИБКА ПРИ СОЗДАНИИ БАЗЫ ДАННЫХ");
  }
}

async function startDB() {
  await createDB();
  //   await db.drop();
  await db.authenticate();
  await db.sync({ alter: true });
}

module.exports = {
  models,
  client,
  db,
  startDB,
};
