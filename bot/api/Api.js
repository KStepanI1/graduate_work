const { BASE_URL } = require("../assets/config");
const axios = require("axios");

const api = axios.create({
    baseURL: BASE_URL + "/api/",
    headers: {},
    withCredentials: true,
});

class Api {
    #_api = api;
    #_abortController = new AbortController();
    #_defaultConfig = {};

    _getCustomConfig(config) {
        return Object.assign(
            {},
            { signal: this.#_abortController.signal },
            config,
            this.#_defaultConfig
        );
    }

    _buildQuery(args) {
        const queryParams = Object.fromEntries(
            Object.entries(args).filter(
                ([, value]) => value !== undefined && value !== null
            )
        );
        let query = "";

        if (Object.keys(queryParams).length > 0) {
            query =
                "?" +
                Object.entries(queryParams)
                    .map(([key, value]) => `${key}=${value}`)
                    .join("&");
        }

        return query;
    }

    async _get({ url, config }) {
        return this.#_api
            .get(url, this._getCustomConfig(config))
            .then((res) => res.data)
            .catch(console.log);
    }

    async _post({ url, body, config }) {
        return this.#_api
            .post(url, body, this._getCustomConfig(config))
            .catch(console.log);
    }

    async _put({ url, body, config }) {
        return this.#_api
            .put(url, body, this._getCustomConfig(config))
            .catch(console.log);
    }

    async _patch({ url, body, config }) {
        return this.#_api
            .patch(url, body, this._getCustomConfig(config))
            .catch(console.log);
    }

    async _delete({ url, config }) {
        return this.#_api
            .delete(url, this._getCustomConfig(config))
            .catch(console.log);
    }

    async cancelRequests() {
        if (this.#_abortController) this.#_abortController.abort();
        this.#_abortController = new AbortController();
    }
}

module.exports = Api;
