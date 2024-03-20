const api = require("../api");
const bot = require("../app");

module.exports = async (chatId, id, messageText) => {
  const getCategoriesKey = (id) => `category_${id}`;

  const categories = await api.categories.getAll();

  const categoriesKeyboard = keyboards.inline.CategoriesKeyboad(
    categories,
    getCategoriesKey(id)
  );

  return await bot.editMessageText(messageText, {
    chat_id: chatId,
    message_id: id,
    ...categoriesKeyboard,
  });
};
