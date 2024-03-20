const { models } = require("../db");
const paginate = require("../helpers/paginate");
const validate = require("../utils/validate");

class SubCategoriesController {
    async getAll(req, res, next) {
        try {
            const { categoryId, limit, offset } = req.query;

            let subCategories = await models.subCategory.findAll(
                categoryId ? { where: { categoryId } } : undefined
            );

            if (limit || offset)
                subCategories = paginate(subCategories, limit, offset);

            return res.status(200).json(subCategories);
        } catch (err) {
            return next(err);
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const subCategory = await models.subCategory.findOne({
                where: { id },
            });
            return res.status(200).json(subCategory);
        } catch (err) {
            return next(err);
        }
    }
    async create(req, res, next) {
        try {
            const { name, categoryId } = req.body || {};

            validate(
                {
                    categoryId: !!categoryId,
                    name: !!name,
                },
                next
            );

            await models.subCategory.create({ name, categoryId });

            return res.status(200).send("Подкатегория успешно создана");
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new SubCategoriesController();
