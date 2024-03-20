const Api = require("./Api");

class FilesApi extends Api {
  async upload(link, productId) {
    this._post({
      url: "files/uploadFromTelegram",
      body: { link, productId },
    });
  }
}

module.exports = { FilesApi: new FilesApi() };
