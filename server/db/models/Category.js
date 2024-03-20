const { DataTypes } = require("sequelize");
const { db } = require("../core");

const Category = db.define("category", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Category;
