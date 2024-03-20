const getKeyboard = (
    product = {},
    key = "/product"
    // isPhotosShowed = false
) => {
    const generateKey = (name) => `/${key}/purchase_${name}`;
    return {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Добавить в корзину",
                        callback_data: generateKey(`add_to_basket`),
                    },
                ],
            ],
        },
    };
};

module.exports = getKeyboard;
