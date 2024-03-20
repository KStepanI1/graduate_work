const { DataTypes } = require("sequelize");
const { db } = require("../core");

const User = db.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  phoneNumber: { type: DataTypes.STRING, unique: true },
  role: { type: DataTypes.STRING, defaultValue: "ADMIN" },
  firstName: { type: DataTypes.STRING },
});

module.exports = User;
