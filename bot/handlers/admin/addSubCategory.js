// const { models } = require("../../../db");
const api = require("../../api");
const bot = require("../../app");
const { ErrorHandler } = require("../../error/ErrorHandler");
const keyboards = require("../../keyboards");

bot.onText(/\/add_subcategory/, async (msg) => {
  const chatId = msg.chat.id;

  const categories = await api.categories.getAll();

  const CATEGORIES_KEY = `add_sc_cat_${msg.message_id}`;

  let mainMessage = await bot.sendMessage(
    chatId,
    "Выберите категорию",
    keyboards.inline.CategoriesKeyboad(categories, CATEGORIES_KEY)
  );

  bot.on("callback_query", async (query) => {
    const data = query.data;

    if (!data.startsWith(CATEGORIES_KEY)) return;

    const categoryId = +data.split(":")[1];
    const category = await api.categories
      .getById(categoryId)
      .catch((err) => console.log(err));

    bot.editMessageText(
      `Введите название подкатегории для категории ${category.name}`,
      {
        chat_id: mainMessage.chat.id,
        message_id: mainMessage.message_id,
      }
    );

    bot.on("message", async (msg) => {
      const categoryName = msg.text;

      await api.subCategories
        .create({ name: categoryName, categoryId })
        .catch((err) => {
          ErrorHandler({
            chatId: msg.chat.id,
            errorText: err?.message || "Ошибка создания категории",
          });
        });
      bot.removeListener("message");
    });
  });
});
