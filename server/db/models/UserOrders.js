const { db } = require("../core");

const UserOrders = db.define("user_orders", {});

module.exports = UserOrders;
