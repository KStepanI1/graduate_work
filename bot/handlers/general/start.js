const api = require("../../api");
const bot = require("../../app");
const keyboards = require("../../keyboards");

bot.onText(/\/start/, async (msg) => {
    const { id, username, first_name, last_name } = msg.from;
    const dbUser = await api.users.get({ telegramId: id });

    console.log(dbUser);

    if (!dbUser) {
        await api.users.create({
            telegramId: id,
            telegramChatId: msg.chat.id,
            username,
            firstName: first_name,
            lastName: last_name,
        });

        bot.sendMessage(
            msg.chat.id,
            `Добро пожаловать, ${first_name}`,
            keyboards.default.HelpKeyboard
        );
    } else {
        await api.users.update(dbUser.id, {
            username,
            firstName: first_name,
            lastName: last_name,
        });

        bot.sendMessage(
            msg.chat.id,
            `Мы рады Вас видеть вновь, ${first_name}`,
            keyboards.default.HelpKeyboard
        );
    }
});
