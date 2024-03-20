const path = require("path");
const { models } = require("../../../db");
const bot = require("../../app");
const config = require("../../../server/assets/config");
const keyboards = require("../../keyboards");
const fs = require("fs");
const uniqid = require("uniqid");

bot.onText(/\/add_product/, async (msg) => {
  const categories = await models.category
    .findAll()
    .then((res) => res.map((category) => category.dataValues));

  const CategoriesKeyboardKey = `category_add_product_${uniqid()}`;

  const categoriesKeyboard = keyboards.inline.CategoriesKeyboad(
    categories,
    CategoriesKeyboardKey
  );

  bot.sendMessage(
    msg.chat.id,
    "Выберите категорию для которой хотите добавить товар",
    categoriesKeyboard
  );

  bot.on("callback_query", async (query) => {
    const categoryId = +query.data.split(":")[1];
    const categoriesMessage = query.message;

    if (!query.data.startsWith("/" + CategoriesKeyboardKey)) return;

    if (categoryId) {
      const category = await models.category.findOne({
        where: { id: categoryId },
      });

      let product = { id: uniqid(), categoryId: categoryId };
      let productPhotos = [];
      let showedPhotos = [];

      const productText = (product) =>
        `
Фотографии: ${productPhotos.length}
Название: ${product.name || "Не задано"}
Описание: ${product.description || "Не задано"},
Цена: ${product.price || "Не задана"}
`;
      const mainMessageText = (product) => `
Создание товара для ${category.dataValues.name}
${productText(product)}
`;

      const getProductCustomizeKeyboard = (isPhotosShowed = false) =>
        keyboards.inline.ProductCustomizeKeyboard(
          product,
          `add_product_${uniqid()}`,
          isPhotosShowed
        );

      const mainMessage = await bot.sendMessage(
        query.message.chat.id,
        mainMessageText(product),
        getProductCustomizeKeyboard()
      );

      const resendMainMessage = async (sendedMessage, userMessages) => {
        bot.deleteMessage(sendedMessage.chat.id, sendedMessage.message_id);
        if (userMessages && Array.isArray(userMessages)) {
          userMessages.forEach((msg) =>
            bot.deleteMessage(msg.chat.id, msg.message_id)
          );
        } else if (userMessages) {
          bot.deleteMessage(userMessages.chat.id, userMessages.message_id);
        }

        bot.removeListener("message");
        bot.editMessageText(mainMessageText(product), {
          ...getProductCustomizeKeyboard(),
          chat_id: mainMessage.chat.id,
          message_id: mainMessage.message_id,
        });
      };
    }
  });
});
