const { DataTypes } = require("sequelize");
const { db } = require("../core");

const SubCategory = db.define("sub_category", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = SubCategory;
