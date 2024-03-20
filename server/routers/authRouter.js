const { Router } = require("express");
const AuthController = require("../controllers/AuthController");
const { body } = require("express-validator");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const router = Router();

router.post("/login", AuthController.login);
router.post(
    "/registration",
    body("phoneNumber").isMobilePhone("ru-RU"),
    AuthController.registration
);
router.post("/logout", AuthController.logout);
router.get("/refresh", AuthMiddleware, AuthController.refresh);

module.exports = router;
