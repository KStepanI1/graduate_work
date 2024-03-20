const { DataTypes } = require("sequelize");
const { db } = require("../core");

const ProductFiles = db.define("product_file", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

module.exports = ProductFiles;
