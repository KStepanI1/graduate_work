const Api = require("./Api");

class CategoriesApi extends Api {
    async getAll(limit, offset = 0) {
        return this._get({
            url: `categories${this._buildQuery({ limit, offset })}`,
        });
    }

    async create(body) {
        return this._post({ url: "categories", body });
    }

    async getById(id) {
        return this._get({ url: `categories/${id}` });
    }
}

module.exports = { CategoriesApi: new CategoriesApi() };
