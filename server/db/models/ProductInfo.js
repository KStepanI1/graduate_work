const { DataTypes } = require("sequelize");
const { db } = require("../core");

const ProdcutInfo = db.define("product_info", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
});

module.exports = ProdcutInfo;
