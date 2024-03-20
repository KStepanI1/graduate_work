// const { models } = require("../../../db");
const api = require("../../api");
const bot = require("../../app");
const { ErrorHandler } = require("../../error/ErrorHandler");

bot.onText(/\/add_category/, (msg) => {
  bot.sendMessage(msg.chat.id, "Введи название категории");
  bot.on("message", async (msg) => {
    const categoryName = msg.text;

    await api.categories.create({ name: categoryName }).catch((err) => {
      ErrorHandler({
        chatId: msg.chat.id,
        errorText: err?.message || "Ошибка создания категории",
      });
    });
    bot.removeListener("message");
  });
});
