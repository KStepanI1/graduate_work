const Api = require("./Api");

class SubCategoriesApi extends Api {
    async getAll(categoryId) {
        return this._get({
            url: `subCategories${this._buildQuery({ categoryId })}`,
        });
    }

    async create(body) {
        return this._post({ url: "subCategories", body });
    }

    async getById(id) {
        return this._post({ url: `subCategories/${id}` });
    }
}

module.exports = { SubCategoriesApi: new SubCategoriesApi() };
