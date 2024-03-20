const startBot = require("./bot");
const { startDB } = require("./db");

startDB();
startBot();
