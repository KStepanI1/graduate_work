const { DataTypes } = require("sequelize");
const { db } = require("../core");

const OrderProduct = db.define("order_product", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

module.exports = OrderProduct;
