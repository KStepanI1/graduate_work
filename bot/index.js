require("dotenv").config();
const bot = require("./app");
const startHandlers = require("./handlers");

async function startBot() {
  startHandlers();
}

module.exports = startBot;
