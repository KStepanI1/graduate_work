const Api = require("./Api");

class ProductsApi extends Api {
    async getAll(subCategoryId, limit, offset = 0) {
        return this._get({
            url: `products${this._buildQuery({
                subCategoryId,
                limit,
                offset,
            })}`,
        });
    }

    async create(body) {
        return this._post({ url: "products", body });
    }

    async getById(id) {
        return this._post({ url: `products/${id}` });
    }
}

module.exports = new ProductsApi();
