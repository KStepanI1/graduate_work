const { Router } = require("express");
const ProductsController = require("../controllers/ProductsController");

const router = Router();

router.get("/", ProductsController.getAll);
router.get("/:id", ProductsController.getOne);
router.post("/", ProductsController.create);
router.delete("/:id", ProductsController.delete);

module.exports = router;
