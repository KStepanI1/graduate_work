const { DataTypes } = require("sequelize");
const { db } = require("../core");

const File = db.define("file", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  link: { type: DataTypes.STRING, allowNull: true },
  size: { type: DataTypes.INTEGER },
});

module.exports = File;
