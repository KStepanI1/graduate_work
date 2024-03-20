const { Router } = require("express");
const CategoriesController = require("../controllers/CategoriesController");

const router = Router();

router.get("/", CategoriesController.getAll);
router.get("/:id", CategoriesController.getOne);
router.post("/", CategoriesController.create);

module.exports = router;
