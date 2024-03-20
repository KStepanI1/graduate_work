const { DataTypes } = require("sequelize");
const { db } = require("../core");

const Order = db.define("order", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    number: { type: DataTypes.INTEGER, allowNull: false, unique: true },
});

module.exports = Order;
