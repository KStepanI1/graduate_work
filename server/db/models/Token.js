const { DataTypes } = require("sequelize");
const { db } = require("../core");

const Token = db.define("token", {
    refreshToken: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Token;
