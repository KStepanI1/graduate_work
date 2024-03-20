const { Router } = require("express");
const SubCategoriesController = require("../controllers/SubCategoriesController");

const router = Router();

router.get("/", SubCategoriesController.getAll);
router.get("/:id", SubCategoriesController.getOne);
router.post("/", SubCategoriesController.create);

module.exports = router;
