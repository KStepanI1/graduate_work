const { models } = require("../db");
const { ApiError } = require("../error/ApiError");
const paginate = require("../helpers/paginate");

class CategoriesController {
    async getAll(req, res, next) {
        try {
            const { limit, offset } = req.query;

            let categories = await models.category.findAll();

            if (limit || offset)
                categories = paginate(categories, limit, offset);

            return res.status(200).json(categories);
        } catch (err) {
            return next(err);
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const category = await models.category.findOne({ where: { id } });
            return res.status(200).json(category);
        } catch (err) {
            return next(err);
        }
    }
    async create(req, res, next) {
        try {
            const { name } = req.body;

            if (!name) {
                return next(
                    ApiError.badRequest(
                        "Поле 'name' является обязательным для категории"
                    )
                );
            }

            await models.category.create({ name });
            return res.status(200).send("Категория успешно создана");
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new CategoriesController();
