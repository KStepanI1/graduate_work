const { Sequelize } = require("sequelize");
const dbConfig = require("../assets/dbConfig");
const { Client } = require("pg");

const { DB_NAME, DB_PASSWORD, DB_USER, HOST, PORT } = dbConfig;
const dialect = "postgres";

const client = new Client({
    user: DB_USER,
    password: DB_PASSWORD,
    host: HOST,
    port: PORT,
});

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect,
    host: HOST,
    port: PORT,
    define: {
        timestamps: false,
    },
});

module.exports = { db, client };
