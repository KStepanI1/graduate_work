const { DataTypes } = require("sequelize");
const { db } = require("../core");

const Product = db.define("product", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT("long") },
    price: { type: DataTypes.BIGINT, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
});

module.exports = Product;
