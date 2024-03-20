const TelegramApi = require("node-telegram-bot-api");
const config = require("../assets/config");
const commands = require("../assets/commands");

console.log(config);

const bot = new TelegramApi(config.BOT_TOKEN, { polling: true });

bot.setMyCommands(commands);

bot.on("polling_error", console.log);

module.exports = bot;
