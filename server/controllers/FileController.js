const { models } = require("../db");
const https = require("https");
const validate = require("../utils/validate");
const fs = require("fs");
const path = require("path");
const config = require("../assets/config");

class FilesController {
    async getAll(req, res, next) {
        try {
            const { productId } = req.params;

            const files = await models.file.findAll(
                productId ? { where: { productId } } : undefined
            );
            return res.status(200).json(files);
        } catch (err) {
            return next(err);
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const file = await models.file.findOne({ where: { id } });
            return res.status(200).json(file);
        } catch (err) {
            return next(err);
        }
    }
    async create(req, res, next) {
        try {
            const file = req.file;
            const { productId } = req.query;

            if (!file) return res.status(400).send("Файл не был получен");

            const fileDB = await models.file.create({
                name: file.fieldname,
                link: file.path,
                size: file.size,
            });

            if (productId) {
                await models.productFiles.create({
                    productId,
                    fileId: fileDB.dataValues.id,
                });
            }

            return res.status(200).send("Файл загружен успешно");
        } catch (err) {
            return next(err);
        }
    }

    async createFew(req, res, next) {}

    async uploadFromTelegram(req, res, next) {
        try {
            const { link, productId } = req.body;

            validate(
                {
                    link: !!link,
                },
                next
            );

            const fileName = path.basename(link);
            const currentDateValue = new Date().valueOf();
            const dest = path.resolve(
                config.STATIC_DIR,
                "media",
                `${currentDateValue}_${fileName}`
            );
            const fileStream = fs.createWriteStream(dest);

            https.get(link, (res) => {
                res.pipe(fileStream);

                fileStream
                    .on("finish", () => {
                        fileStream.close();
                        console.log("Download finished");
                    })
                    .on("error", function (err) {
                        fs.unlink(dest);
                        if (cb) cb(err.message);
                    });
            });

            const fileDB = await models.file.create({
                name: fileName,
                link: "/static/media/" + `${currentDateValue}_${fileName}`,
                size: fileStream.bytesWritten,
            });

            if (productId) {
                await models.productFiles.create({
                    productId,
                    fileId: fileDB.dataValues.id,
                });
            }

            return res.status(200).send("Файл загружен успешно");
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new FilesController();
