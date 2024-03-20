const { DataTypes } = require("sequelize");
const { db } = require("../core");

const Rating = db.define("rating", {
    fileId: { type: DataTypes.INTEGER, primaryKey: true },
});

module.exports = Rating;
