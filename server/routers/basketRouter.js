const { Router } = require("express");
const { query } = require("express-validator");
const BasketController = require("../controllers/BasketController");

const router = Router();

router.post(
    "/add",
    query("productId").isNumeric(),
    query("userId").isNumeric(),
    BasketController.addProduct
);

router.get("/", query("userId").isNumeric(), BasketController.get);
router.post("/clear", query("userId").isNumeric(), BasketController.clear);
router.delete(
    "/",
    query("productId").isNumeric(),
    query("userId").isNumeric(),
    BasketController.deletePosition
);

router.get("/amount", query("userId").isNumeric(), BasketController.getAmount);

module.exports = router;
