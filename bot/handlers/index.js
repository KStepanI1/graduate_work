const start = require("./general/start");
const catalog = require("./user/catalog");
const admin = require("./admin");

module.exports = function startHandlers() {
  start;
  catalog;
  admin;
};
