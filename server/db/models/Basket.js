const { DataTypes } = require("sequelize");
const { db } = require("../core");

const Basket = db.define("basket", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

module.exports = Basket;
