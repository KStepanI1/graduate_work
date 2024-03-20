const api = require("../api");
const bot = require("../app");
const keyboards = require("../keyboards");

module.exports = async (categoryId, chatId, id, messageText) => {
    const getSubCategoriesKey = (id) => `subcategory_${id}`;

    const subCategories = await api.subCategories.getAll(categoryId);

    const subCategoriesKeyboard = keyboards.inline.SubCategoriesKeyboard(
        subCategories,
        getSubCategoriesKey(id)
    );

    return {
        message: await bot.editMessageText(messageText, {
            chat_id: chatId,
            message_id: id,
            ...subCategoriesKeyboard,
        }),
        key: getSubCategoriesKey(id),
    };
};
