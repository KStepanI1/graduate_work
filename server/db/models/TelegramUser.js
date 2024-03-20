const { DataTypes } = require("sequelize");
const { db } = require("../core");

const TelegramUser = db.define("telegram-user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    telegramId: { type: DataTypes.INTEGER },
    telegramChatId: { type: DataTypes.INTEGER },
    username: { type: DataTypes.STRING },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
});

module.exports = TelegramUser;
