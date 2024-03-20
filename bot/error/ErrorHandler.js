const bot = require("../app");

const ErrorHandler = async ({ chatId, errorText }) => {
  const message = await bot.sendMessage(chatId, errorText);

  setTimeout(() => {
    try {
      bot.deleteMessage(message.chat.id, message.message_id);
    } catch (err) {
      console.log("ОШИБКА УДАЛЕНИЯ СООБЩЕНИЯ ОБ ОШИБКЕ");
    }
  }, 5000);
};

module.exports = { ErrorHandler };
