const { Router } = require("express");
const UsersController = require("../controllers/UsersController");

const router = Router();

router.get("/", UsersController.getAll);
router.get("/custom", UsersController.getCustom);
router.get("/:id", UsersController.getOne);
router.post("/", UsersController.create);
router.patch("/:id", UsersController.update);

module.exports = router;
