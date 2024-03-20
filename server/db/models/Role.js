const { DataTypes } = require("sequelize");
const { db } = require("../core");

const Role = db.define("role", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

module.exports = Role;
