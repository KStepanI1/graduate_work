const { DataTypes } = require("sequelize");
const { db } = require("../core");

const BasketProduct = db.define("basket_product", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

module.exports = BasketProduct;
