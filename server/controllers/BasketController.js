const { models } = require("../db");
const { ApiError } = require("../error/ApiError");
const { validationResult } = require("express-validator");
const getProductInclude = require("../helpers/getProductsInclude");

class BasketController {
    async get(req, res, next) {
        try {
            const validation = validationResult(req);

            if (!!validation.errors?.length) {
                return next(ApiError.badRequest(undefined, validation.errors));
            }

            const { userId } = req.query;

            const basket = await models.basket.findAll({
                where: { userId },
                include: {
                    model: models.basketProduct,
                    include: {
                        model: models.product,
                        include: getProductInclude({
                            includeAll: true,
                            includeInfo: false,
                        }),
                    },
                },
            });

            return res.status(200).json(basket);
        } catch (e) {
            next(e);
        }
    }

    async getAmount(req, res, next) {
        try {
            const validation = validationResult(req);

            if (!!validation.errors?.length) {
                return next(ApiError.badRequest(undefined, validation.errors));
            }

            const { userId } = req.query;

            let result = 0;

            const basket = await models.basket.findOne({
                where: { userId },
            });

            if (basket) {
                const basketProducts =
                    await models.basketProduct.findAndCountAll({
                        where: { basketId: basket.id },
                    });

                result = basketProducts?.count || 0;
            }

            console.log(basket);
            return res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }

    async deletePosition(req, res, next) {
        try {
            const validation = validationResult(req);

            if (!!validation.errors?.length) {
                return next(ApiError.badRequest(undefined, validation.errors));
            }

            const { userId, productId } = req.query;
            const basket = await models.basket.findOne({ where: { userId } });

            if (basket) {
                await models.basketProduct.destroy({
                    where: { productId },
                });
            }

            return res.status(200).json();
        } catch (e) {
            next(e);
        }
    }

    async clear(req, res, next) {
        try {
            const validation = validationResult(req);

            if (!!validation.errors?.length) {
                return next(ApiError.badRequest(undefined, validation.errors));
            }

            const { userId } = req.query;
            const basket = await models.basket.findOne({ where: { userId } });

            if (basket) {
                await models.basketProduct.destroy({
                    where: { basketId: basket.id },
                });
            }

            return res.status(200).json();
        } catch (e) {
            next(e);
        }
    }

    async addProduct(req, res, next) {
        try {
            const validation = validationResult(req);

            if (!!validation.errors?.length) {
                return next(ApiError.badRequest(undefined, validation.errors));
            }

            const { userId, productId } = req.query;

            let basket = await models.basket.findOne({ where: { userId } });

            if (!basket) {
                basket = await models.basket.create({ userId });
            }

            await models.basketProduct.create({
                basketId: basket.id,
                productId,
            });

            return res.status(200).json();
        } catch (e) {
            next(e);
        }
    }

    async synchronization(req, res, next) {
        try {
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new BasketController();
