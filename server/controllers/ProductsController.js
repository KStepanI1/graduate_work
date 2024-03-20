const { models } = require("../db");
const { ApiError } = require("../error/ApiError");
const getProductInclude = require("../helpers/getProductsInclude");
const validate = require("../utils/validate");
const multiparty = require("multiparty");
const path = require("path");
const { Op } = require("sequelize");

class ProductsController {
    async getAll(req, res, next) {
        try {
            const {
                limit,
                offset,
                subCategoryId,
                includeAll = false,
                search = "",
            } = req.query;

            let products;

            const searchWhere = search
                ? {
                      description: {
                          [Op.like]: search,
                      },
                      name: {
                          [Op.like]: search,
                      },
                  }
                : [];

            const options = {
                include: getProductInclude({ includeAll }),
                distinct: true,
                limit,
                offset,
                order: [["id", "desc"]],
            };

            if (subCategoryId) {
                products = await models.product.findAndCountAll({
                    ...options,
                    where: { ...searchWhere, subCategoryId },
                });
            }

            products = await models.product.findAndCountAll({
                ...options,
                where: { ...searchWhere },
            });

            return res.status(200).json(products);
        } catch (err) {
            console.log(err);
            return next(ApiError.badRequest());
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const product = await models.product.findOne({
                where: { id },
                include: getProductInclude({ includeAll: true }),
            });
            return res.status(200).json(product);
        } catch (err) {
            return next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            await models.product.destroy({
                where: { id },
            });

            return res.status(200).json();
        } catch (err) {
            return next(err);
        }
    }

    async create(req, res, next) {
        try {
            const form = new multiparty.Form({
                encoding: "utf8",
                uploadDir: path.resolve(__dirname, "..", "static", "media"),
            });

            form.parse(req, async (err, fields, files) => {
                const body = Object.fromEntries(
                    Object.entries(fields).map(([key, value]) => [
                        key,
                        Array.isArray(value) ? value[0] : value,
                    ])
                );
                const media = files.media;

                const {
                    name,
                    price,
                    subCategoryId,
                    description = null,
                    info,
                } = body ?? {};

                validate(
                    {
                        name: !!name,
                        price: !!price,
                        subCategoryId: !!subCategoryId,
                    },
                    next
                );

                const product = await models.product.create({
                    name: name.toString(),
                    price: price.toString(),
                    subCategoryId: subCategoryId.toString(),
                    description: description?.toString(),
                });

                if (info) {
                    let parsedInfo;
                    try {
                        parsedInfo = JSON.parse(info.replaceAll("\\", ""));
                    } catch (e) {
                        next(ApiError.badRequest());
                    }

                    parsedInfo.forEach((i) =>
                        models.productInfo.create({
                            title: i.title,
                            description: i.description,
                            productId: product.id,
                        })
                    );
                }

                if (!!media?.length && media?.length !== 0) {
                    const parsedImages = media.map((img) => ({
                        path: "/static/media/" + path.basename(img.path),
                        filename: path.basename(img.path),
                        size: img.size,
                    }));

                    parsedImages.forEach(async (img) => {
                        const fileDB = await models.file.create({
                            name: img.filename,
                            link: img.path,
                            size: img.size,
                        });

                        if (product) {
                            await models.productFiles.create({
                                productId: product.id,
                                fileId: fileDB.dataValues.id,
                            });
                        }
                    });
                }

                return res.status(200).send(product);
            });
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new ProductsController();
