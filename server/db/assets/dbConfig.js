require("dotenv").config();
const POSTGRES = "postgres";
const DEFAULT_HOST = "localhost";
const DEFAULT_PORT = 5432;

module.exports = {
    DB_NAME: process.env.POSTGRES_DB,
    DB_USER: process.env.POSTGRES_USER || POSTGRES,
    DB_PASSWORD: process.env.POSTGRES_PASSWORD || POSTGRES,
    HOST: process.env.DB_HOST || DEFAULT_HOST,
    PORT: Number(process.env.DB_PORT) || DEFAULT_PORT,
};
