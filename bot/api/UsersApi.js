const Api = require("./Api");

class UsersApi extends Api {
    async getAll() {
        return this._get({ url: "users" });
    }

    async create(body) {
        return this._post({ url: "users", body });
    }

    async update(id, body) {
        return this._patch({ url: `users/${id}`, body });
    }

    async getById(id) {
        return this._get({ url: `users/${id}` });
    }

    async get(args) {
        return this._get({ url: `users/custom${this._buildQuery(args)}` });
    }
}

module.exports = new UsersApi();
