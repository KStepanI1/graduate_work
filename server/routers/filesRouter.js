const { Router } = require("express");
const FileController = require("../controllers/FileController");

const router = Router();

router.get("/", FileController.getAll);
router.get("/:id", FileController.getOne);
router.post("/", FileController.create);
router.post("/uploadFromTelegram", FileController.uploadFromTelegram);

module.exports = router;
