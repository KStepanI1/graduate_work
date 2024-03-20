const { product } = require("../../../server/db/models");
const api = require("../../api");
const bot = require("../../app");
const getProductMessageText = require("../../helpers/getProductMessageText");
const keyboards = require("../../keyboards/");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 5 });

const getProductKeyboardKey = (product) => `product_customize_${product.id}`;
const getProductMessageKeyboard = (product) =>
    keyboards.inline.ProductCustomizeKeyboard(
        product,
        getProductKeyboardKey(product)
    );

bot.onText(/\/add_product/, async (msg) => {
    const chatId = msg.chat.id;
    const categories = await api.categories.getAll();

    const CATEGORIES_KEY = `add_p_cat_${msg.message_id}`;
    const getSubCategoriesKey = (msgId) => `add_p_subcat_${msgId}`;

    let mainMessage = await bot.sendMessage(
        chatId,
        "Выберите категорию, а затем подкатегорию, в которую хотите добавить товар",
        keyboards.inline.CategoriesKeyboad(categories, CATEGORIES_KEY)
    );

    // ВЫБОР ПОДКАТЕГОРИИ
    bot.on("callback_query", async (query) => {
        const data = query.data;

        if (!data.startsWith(CATEGORIES_KEY)) return;

        const subcategoriesMessageId = query.message.message_id;
        const categoryId = +data.split(":")[1];

        const subCategories = await api.subCategories.getAll(categoryId);

        mainMessage = await bot.editMessageText(
            "Выберите категорию, а затем подкатегорию, в которую хотите добавить товар",
            {
                chat_id: chatId,
                message_id: mainMessage.message_id,
                ...keyboards.inline.SubCategoriesKeyboard(
                    subCategories,
                    getSubCategoriesKey(subcategoriesMessageId)
                ),
            }
        );

        // ПОДКАТЕГОРИЯ ВЫБРАНА
        bot.on("callback_query", async (query) => {
            const data = query.data;

            if (!data.startsWith(getSubCategoriesKey(subcategoriesMessageId))) {
                return;
            }

            const subCategoryId = +data.split(":")[1];

            let product = { id: uid.rnd(), categoryId, subCategoryId };
            let productPhoto;
            let photosShowed = false;

            mainMessage = await bot
                .editMessageText(getProductMessageText(product), {
                    chat_id: mainMessage.chat.id,
                    message_id: mainMessage.message_id,
                    ...getProductMessageKeyboard(product, photosShowed),
                    parse_mode: "Markdown",
                })
                .catch((err) => console.log(err));

            const resendMainMessage = async ({
                sendedMessage,
                userMessages,
            }) => {
                try {
                    bot.deleteMessage(
                        sendedMessage.chat.id,
                        sendedMessage.message_id
                    );
                    if (userMessages && Array.isArray(userMessages)) {
                        userMessages.forEach((msg) =>
                            bot.deleteMessage(msg.chat.id, msg.message_id)
                        );
                    }
                } catch (err) {
                    console.log(err);
                }

                bot.removeListener("message");

                if (!productPhoto) {
                    bot.editMessageText(getProductMessageText(product), {
                        ...getProductMessageKeyboard(product),
                        chat_id: mainMessage.chat.id,
                        message_id: mainMessage.message_id,
                        parse_mode: "Markdown",
                    }).catch((err) => console.log(err));
                } else {
                    if (!mainMessage.photo?.length) {
                        try {
                            bot.deleteMessage(
                                mainMessage.chat.id,
                                message.message_id
                            );
                        } catch (err) {
                            console.log(err);
                        }

                        mainMessage = await bot.sendPhoto(
                            mainMessage.chat.id,
                            productPhoto.id,
                            {
                                caption: getProductMessageText(product),
                                parse_mode: "Markdown",
                                ...getProductMessageKeyboard(product),
                            }
                        );
                    } else {
                        bot.editMessageCaption(getProductMessageText(product), {
                            parse_mode: "Markdown",
                            ...getProductMessageKeyboard(product),
                            chat_id: mainMessage.chat.id,
                            message_id: mainMessage.message_id,
                        });
                    }
                }
            };

            // ИЗМЕНЕНИЯ ПРОДУКТА
            bot.on("callback_query", async (query) => {
                const data = query.data;
                const chat = query.message.chat;

                if (data.endsWith("cancel")) {
                    try {
                        bot.deleteMessage(chat.id, query.message.message_id);
                        bot.deleteMessage(chat.id, mainMessage.message_id);
                        const canceledMsg = await bot.sendMessage(
                            chat.id,
                            "Отменено"
                        );
                        setTimeout(() => {
                            bot.deleteMessage(chat.id, canceledMsg.message_id);
                        }, 2000);
                    } catch (err) {
                        console.log(err);
                    }

                    return;
                }

                if (data.endsWith("approve")) {
                    if (product.name && product.price) {
                        const dbProduct = await api.products.create(product);

                        if (productPhoto) {
                            await api.files.upload(
                                productPhoto.link,
                                dbProduct.data.id
                            );
                        }

                        try {
                            bot.deleteMessage(
                                chat.id,
                                query.message.message_id
                            );
                        } catch (err) {
                            console.error("ОШИБКА УДАЛЕНИЯ ГЛАВНОГО СООБЩЕНИЯ");
                        }

                        const approveMsg = await bot.sendMessage(
                            chat.id,
                            `Товар ${product.name} успешно добавлен в список товаров`
                        );
                        setTimeout(() => {
                            try {
                                bot.deleteMessage(
                                    approveMsg.chat.id,
                                    approveMsg.message_id
                                );
                            } catch (err) {
                                console.log(err);
                            }
                        }, 2000);
                    }
                }

                if (data.endsWith("name")) {
                    const sendedMessage = await bot.sendMessage(
                        chat.id,
                        "Введите название товара"
                    );

                    bot.on("message", async (msg) => {
                        product = { ...product, name: msg.text };
                        await resendMainMessage({
                            sendedMessage,
                            userMessages: [msg],
                        });
                    });
                }

                if (data.endsWith("description")) {
                    const sendedMessage = await bot.sendMessage(
                        chat.id,
                        "Введите описание товара"
                    );

                    bot.on("message", async (msg) => {
                        product = { ...product, description: msg.text };
                        await resendMainMessage({
                            sendedMessage,
                            userMessages: [msg],
                        });
                    });
                }

                if (data.endsWith("price")) {
                    const sendedMessage = await bot.sendMessage(
                        chat.id,
                        "Введите цену товара в рублях"
                    );

                    bot.on("message", async (msg) => {
                        product = { ...product, price: msg.text };
                        await resendMainMessage({
                            sendedMessage,
                            userMessages: msg,
                        });
                    });
                }

                if (data.endsWith("photo")) {
                    const sendedMessage = await bot.sendMessage(
                        chat.id,
                        "Пришлите 1 фотографию"
                    );

                    bot.on("photo", async (msg, meta) => {
                        const photo = msg.photo[3];

                        if (photo) {
                            const fileId = photo.file_id;

                            const fileLink = await bot.getFileLink(fileId);
                            productPhoto = {
                                id: fileId,
                                link: fileLink,
                                value: photo,
                            };
                        }
                        bot.deleteMessage(
                            sendedMessage.chat.id,
                            sendedMessage.message_id
                        );
                    });
                }

                //   if (data.endsWith("hide_photos")) {
                //     // if (!showedPhotos?.length) {
                //     //   const noDataMsg = await bot.sendMessage(
                //     //     msg.chat.id,
                //     //     "Нечего скрывать"
                //     //   );
                //     //   setTimeout(() => {
                //     //     try {
                //     //       bot.deleteMessage(noDataMsg.chat.id, noDataMsg.message_id);
                //     //     } catch (err) {
                //     //       console.log("ОШИБКА УДАЛЕНИЯ CООБЩЕНИЯ: Нечего скрывать");
                //     //     }
                //     //   }, 2000);
                //     //   return;
                //     // }
                //     // showedPhotos.forEach(async (msg) => {
                //     //   try {
                //     //     await bot.deleteMessage(msg.chat.id, msg.message_id);
                //     //   } catch (err) {
                //     //     console.log("ОШИБКА УДАЛЕНИЯ СООБЩЕНИЯ showedPhotos");
                //     //   }
                //     // });
                //     // showedPhotos = [];
                //     // bot.editMessageText(mainMessageText(product), {
                //     //   ...getProductCustomizeKeyboard(false),
                //     //   chat_id: mainMessage.chat.id,
                //     //   message_id: mainMessage.message_id,
                //     // });
                //     // return;
                //   }

                // if (data.endsWith("show_photos")) {
                //     if (!productPhotos?.length) {
                //         const noDataMsg = await bot.sendMessage(
                //             msg.chat.id,
                //             "Фотографии не найдены"
                //         );
                //         setTimeout(() => {
                //             try {
                //                 bot.deleteMessage(
                //                     noDataMsg.chat.id,
                //                     noDataMsg.message_id
                //                 );
                //             } catch (err) {
                //                 console.log(
                //                     "ОШИБКА УДАЛЕНИЯ СООБЩЕНИЯ: Фотографии не найдены"
                //                 );
                //             }
                //         }, 2000);
                //         return;
                //     }

                //     bot.editMessageText("234", {
                //         ...getProductMessageKeyboard(product, true),
                //         chat_id: mainMessage.chat.id,
                //         message_id: mainMessage.message_id,
                //         parse_mode: "Markdown",
                //     });

                //     productPhotos.forEach(async (photo) => {
                //         const msg = await bot.sendPhoto(
                //             query.message.chat.id,
                //             photo.id,
                //             {
                //                 reply_markup: {
                //                     inline_keyboard: [
                //                         [
                //                             {
                //                                 text: "Удалить",
                //                                 callback_data: `delete_photo:${photo.id}`,
                //                             },
                //                         ],
                //                     ],
                //                 },
                //             }
                //         );
                //         showedPhotos.push(msg);
                //     });

                //     bot.on("callback_query", async (query) => {
                //         const data = query.data;

                //         if (!data.startsWith("delete_photo")) return;

                //         const photoId = +data.split(":")[1];

                //         const photo = await models.file.findOne({
                //             where: { id: photoId },
                //         });

                //         try {
                //             await models.file.destroy({
                //                 where: { id: photoId },
                //             });
                //             fs.unlinkSync(photo.dataValues.link);

                //             bot.deleteMessage(
                //                 query.message.chat.id,
                //                 query.message.message_id
                //             );
                //         } catch (err) {
                //             console.log("ОШИБКА УДАЛЕНИЯ product_photo_msg");
                //         }
                //     });
                // }
            });
        });
    });
});
