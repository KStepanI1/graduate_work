const { Router } = require("express");
const usersRouter = require("./usersRouter");
const categoriesRouter = require("./categoriesRouter");
const productsRouter = require("./productsRouter");
const subCategoriesRouter = require("./subCategoriesRouter");
const filesRouter = require("./filesRouter");
const authRouter = require("./authRouter");
const basketRouter = require("./basketRouter");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const router = Router();

router.use("/users", AuthMiddleware, usersRouter);
router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/subCategories", subCategoriesRouter);
router.use("/files", filesRouter);
router.use("/auth", authRouter);
router.use("/basket", basketRouter);

module.exports = router;
