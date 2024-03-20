const api = require("../../api");
const bot = require("../../app");
const getProductMessageText = require("../../helpers/getProductMessageText");
const sendSubcategoriesMessage = require("../../helpers/sendSubcategoriesMessage");
const keyboards = require("../../keyboards");

bot.onText(/\/catalog/, async (msg) => {
    const categories = await api.categories.getAll();
    const CategoriesKeyboardKey = `category_${msg.message_id}`;

    const categoriesKeyboard = keyboards.inline.CategoriesKeyboad(
        categories,
        CategoriesKeyboardKey
    );

    let mainMessage = await bot.sendMessage(
        msg.chat.id,
        "Список категорий",
        categoriesKeyboard
    );

    bot.on("callback_query", async (query) => {
        const data = query.data;

        if (!data.startsWith(CategoriesKeyboardKey)) return;

        const categoryId = +data.split(":")[1];
        const { message, key } = await sendSubcategoriesMessage(
            categoryId,
            mainMessage.chat.id,
            mainMessage.message_id,
            "Список подкатегорий"
        );

        bot.on("callback_query", async (query) => {
            const data = query.data;

            if (!data.startsWith(key)) return;

            const subcategoryId = +data.split(":")[1];
            const products = await api.products.getAll(subcategoryId);

            products.forEach((product) => {
                if (product.files?.length > 0) {
                    bot.sendPhoto(
                        query.message.chat.id,
                        product.files[0].link,
                        {
                            caption: getProductMessageText(product),
                            ...keyboards.inline.ProductPurchaseKeyboard(
                                product
                            ),
                            parse_mode: "Markdown",
                        }
                    );
                } else {
                    bot.sendMessage(
                        query.message.chat.id,
                        getProductMessageText(product),
                        {
                            parse_mode: "Markdown",
                            ...keyboards.inline.ProductPurchaseKeyboard(
                                product
                            ),
                        }
                    );
                }
            });
        });
    });
});
