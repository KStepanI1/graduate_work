const getKeyboard = (
    product = {},
    key = "/product"
    // isPhotosShowed = false
) => {
    const generateKey = (name) => `/${key}/customize_${name}`;
    return {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: product.name
                            ? `Изменить название`
                            : "Добавить название",
                        callback_data: generateKey(`name`),
                    },
                    {
                        text: product.description
                            ? "Изменить описание"
                            : "Добавить описание",
                        callback_data: generateKey(`description`),
                    },
                ],
                [
                    {
                        text: product.photoLink
                            ? "Изменить фотографии"
                            : "Добавить фотографии",
                        callback_data: generateKey("photo"),
                    },
                    {
                        text: product.price ? "Изменить цену" : "Добавить цену",
                        callback_data: generateKey("price"),
                    },
                ],
                // [
                //   {
                //     text: isPhotosShowed ? "Скрыть фотографии" : "Показать фотографии",
                //     callback_data: isPhotosShowed
                //       ? generateKey("hide_photos")
                //       : generateKey("show_photos"),
                //   },
                // ],
                [
                    {
                        text: "Сохранить изменения",
                        callback_data: generateKey("approve"),
                    },
                    {
                        text: "Отменить изменения",
                        callback_data: generateKey("cancel"),
                    },
                ],
            ],
        },
    };
};

module.exports = getKeyboard;
